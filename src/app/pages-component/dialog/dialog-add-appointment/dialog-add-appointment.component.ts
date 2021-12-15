import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceGeneralService } from '../../../service/service-general/service-general.service';
import { LoaderComponent } from '../../../shared/loader';
import { Resolve } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { I } from '@angular/cdk/keycodes';
import { ConfirmationCalendarComponent } from '../confirmation-calendar/confirmation-calendar.component';

@Component({
  selector: 'app-dialog-add-appointment',
  templateUrl: './dialog-add-appointment.component.html',
  styleUrls: ['./dialog-add-appointment.component.css']
})
export class DialogAddAppointmentComponent implements OnInit {

    //timepicker
  public _minValue: Date;
  public _maxValue: Date;
  public _defaultValue: Date;
  public selected_day: Date;

  public loader: LoaderComponent = new LoaderComponent();
  appointment:any[] = [];
  data_check:any[]=[];
  user:any;
  data_work:any;
  date = new Date();
  profileCunsultant = false;
  supplier_select: any;


  constructor(public _dialog: MatDialog, public dialogRef: MatDialogRef<DialogAddAppointmentComponent>, public _services: ServiceGeneralService, private formBuilder: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  //******************************************************************************************************************//
  public image_path: string = this._services.url_images;

  ngOnInit() {
      //timepicker
  const minValue = new Date();
  minValue.setHours(6);
  minValue.setMinutes(10);
  this._minValue = minValue;

  const maxValue = new Date();
  maxValue.setHours(18);
  maxValue.setMinutes(10);
  this._maxValue = maxValue;

      // [disabled]="profileCunsultant == true"
      this.user = JSON.parse(localStorage.getItem('userData'));
      console.log("DATAUSER: ", this.user)
    this.getCatalogo();
    console.log("DATA RECIBIDA EN MODAL APPOINTMENT: ", this.data);
    
    if (this.user.role.id == 3) {
      this.profileCunsultant = true;
      console.log('se loggeo un profile consultant');
    }

    let immigration;
    let relocation;
    let data_final = [];

    if(this.data.appointmentId != 0){
      this._services.service_general_get('Appointment/GetAppointmentById?id='+Number(this.data.appointmentId)).subscribe((data => {
       console.log("appointment by id; ", data);
       for (let i = 0; i < data.result.value.length; i++) {
        data.result.value[i].ended = this.data.ended;
        data.result.value[i].start = this.data.start;
        data.result.value[i].report = this.data.report;
       }
       this.appointment = data.result.value;
      }))
    }else{
      this._services.service_general_get('Catalogue/GetworkOrderBySR?service_record_Id='+Number(this.data.sr)+'&service_line_id='+1).subscribe((dataIm => {
        if (dataIm.success) {
          console.log("DATA CATALOGO ADD POINTMENT im: ",dataIm);
          immigration = dataIm.result.value;
          this._services.service_general_get('Catalogue/GetworkOrderBySR?service_record_Id='+Number(this.data.sr)+'&service_line_id='+2).subscribe((dataRe => {
            if (dataRe.success) {
              console.log("DATA CATALOGO ADD POINTMENT re: ",dataRe);
              relocation = dataRe.result.value;
              immigration.forEach(E => {
                data_final.push(E);
              });
              relocation.forEach(E => {
                data_final.push(E);
              });
              console.log('Data final: ', data_final);
              this.data_work = data_final
             }
          }));
         }
      }));
      this.getServices();
      //this.addAppointment();
    }
  }

  isConsultant:boolean = false;
  available:[];
  NoAvailable:[];
  tiempo:any[]=[];

  getavailabitily(i){
    //console.log(this.supplier_select);
    let user_type;
    this.available = [];
    this.NoAvailable = [];
    this.tiempo = [];
    this.isConsultant = false;
    console.log(this.ca_supplier);
    this.ca_supplier.forEach(E => {
      if(E.userId == this.appointment[i].to){
           user_type = E;
         if(E.type == "Supplier"){
          this.isConsultant = true;
         }
      }
    });
    if(this.isConsultant){
      this._services.service_general_get('MyDashboard/GetCalendar/' + this.appointment[i].to).subscribe((data: any) => {
        if (data.success) {
          console.log(data);
          
          data.array.forEach(element => {
            if(element.map.value.scheduleUser == this.selected_day){

            }
            else
            {
              const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
                     data: {
                       header: 'Appointment',
                       body: 'The consultant is not available on the selected day'
                     }
                   });
              
                   dialogRef.afterClosed().subscribe(result => {
              
                  });
            }
          });

          // if(this.available.length == 0){
          //   const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
          //     data: {
          //       header: 'Appointment',
          //       body: 'The consultant is not available on the selected day'
          //     }
          //   });
        
          //   dialogRef.afterClosed().subscribe(result => {
        
          //   });
          // }
          let eventos_ = data.map.value.scheduleUser;
          this.available = eventos_.filter(function(E) {
             if(E.title == "Available"){
                if(E.rrule.byweekday == '[RRule.MO]'){
                   E.dia = 'Monday';
                }
                if(E.rrule.byweekday == '[RRule.TU]'){
                  E.dia = ' Tuesday';
                }
                if(E.rrule.byweekday == '[RRule.WE]'){
                  E.dia = 'Wednesday';
                }
                if(E.rrule.byweekday == '[RRule.TH]'){
                  E.dia = 'Thuesday';
                }
                if(E.rrule.byweekday == '[RRule.FR]'){
                  E.dia = 'Friday';
                }
                if(E.rrule.byweekday == '[RRule.SA]'){
                  E.dia = 'Saturday';
                }
                if(E.rrule.byweekday == '[RRule.SU]'){
                  E.dia = 'Sunday';
                }
                return E;
             }
          })
          this.NoAvailable = eventos_.filter(function(E) {
            if(E.title == "No Available"){
              if(E.rrule.byweekday == '[RRule.MO]'){
                E.dia = 'Monday';
             }
             if(E.rrule.byweekday == '[RRule.TU]'){
               E.dia = ' Tuesday';
             }
             if(E.rrule.byweekday == '[RRule.WE]'){
               E.dia = 'Wednesday';
             }
             if(E.rrule.byweekday == '[RRule.TH]'){
               E.dia = 'Thuesday';
             }
             if(E.rrule.byweekday == '[RRule.FR]'){
               E.dia = 'Friday';
             }
             if(E.rrule.byweekday == '[RRule.SA]'){
               E.dia = 'Saturday';
             }
             if(E.rrule.byweekday == '[RRule.SU]'){
               E.dia = 'Sunday';
             }
               return E;
            }
         })
          console.log("availability : ", this.available);

          this.available.forEach((E:any) => {
            if(E.rrule.byweekday == this.dia_appointment){
              this.minstart = E.startTime;
              this.maxstart = E.endTime;
              console.log(this.minstart, this.maxstart);

              let inicio = this.minstart.split(':');
              let inicio_hora = inicio[0];
              let final = this.maxstart.split(':');
    
              if(inicio_hora < 10){
                inicio_hora = '0'+inicio_hora;
              }
    
              console.log(inicio_hora);
              let j_;
              for (let i = 1; i <= Number(final[0]); i++) {
                for (let j = 0; j <= 59; j++) {
                  if(j<10){
                     j_='0'+j;
                  }
                  if(j>9){
                    j_=j;
                  }
                  this.tiempo.push(inicio_hora+':'+j_)
                  if(j==59){
                    inicio_hora++;
                  }
                  if(inicio_hora >= Number(final[0])){
                     return 
                  }
                }
                
              }
    
              console.log(this.tiempo)
           }
          });
        }
      })
    }
  }
  //******************************************************************************************************************//
  ca_supplier = [];
  eventos = [];
  async getCatalogo(){
    let filter_supplier:any;
    this._services.service_general_get('ServiceRecord/ExperienceTeam/'+Number(this.data.sr)).subscribe((dataRe => {
      if (dataRe.success) {
         let supplier = dataRe.result.value;
             /*
             for (let i = 0; i < supplier.length; i++) {
              if(supplier[i].type = "Consultant"){
                filter_supplier.push(supplier[i]);
               }
             }
             */

             this.ca_supplier = supplier;
             console.log(this.ca_supplier);
       }
    }));
    
   
  }
  //******************************************************************************************************************//
  pushCheckbox(i,j, event, data){
    if(event.checked){
      this.appointment[i].appointmentWorkOrderServices.push({
        "id": 0,
        "appointmentId": this.appointment[i].id,
        "workOrderServiceId": data.id
      })
    }else{
      this.appointment[i].appointmentWorkOrderServices.splice(j,1);
    }
  }
  //******************************************************************************************************************//
  addAppointment(){
    this.appointment.push({
        "id": 0,
        "serviceRecordId": Number(this.data.sr),
        "date": null,
        "startTime": null,
        "endTime": null,
        "description": null,
        "createdBy": this.user.id,
        "createdDate": new Date(),
        "updateBy": this.user.id,
        "updatedDate": null,
        "to":'',
        "from":this.user.id,
        "status": true,
        "appointmentWorkOrderServices": [

        ],
        "documentAppointments": [

        ],
        "services": this.data_check
    });
  }
  //******************************************************************************************************************//
  getServices(){
    let sl = 0;
    if(this.user.role.id == 19){ sl = 3; }
    if(this.user.profileUsers[0].immigration == true && this.user.profileUsers[0].relocation == true){ sl = 3; }
    if(this.user.profileUsers[0].immigration == true && this.user.profileUsers[0].relocation == false){ sl = 1; }
    if(this.user.profileUsers[0].immigration == false && this.user.profileUsers[0].relocation == true){ sl = 2; }
   
    console.log("ENTRA A CONSULTAR");
    this._services.service_general_get('Appointment/All/AllServicesServiceLine?sr='+Number(this.data.sr)+'&sl='+sl).subscribe(r=>{
      console.log(r)
      if(r.success){
        this.data_check = r.result.value;
        this.addAppointment();
        console.log(this.data_check);
      }
    })
  }
  //******************************************************************************************************************//
  public files: NgxFileDropEntry[] = [];
  //**FUNCIONES DE CARGA DE DOCUMENTO***//
  public dropped(files: NgxFileDropEntry[],i) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath);
          console.log(file, this.files);

          fileEntry.file(file => {
            reader.readAsDataURL(file);
            reader.onload = () => {
              let imageUrl = reader.result;
              let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
              if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
              }

              //let ext = file.type.split("/");
              let ext = droppedFile.relativePath.split(".");

              this.appointment[i].documentAppointments.push({
                    "id": 0,
                    "fileName": droppedFile.relativePath,
                    "fileExtension": ext[ext.length - 1],
                    "fileRequest": encoded,
                    "createdBy": this.user.id,
                    "createdDate": new Date(),
                    "appointmentId":  this.appointment[i].id
              })

              if( this.appointment[i].id != 0){
                this.update();
              }
            };
          });


        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  //**FUNCIONES DE CARGA DE DOCUMENTO***//
  public fileOver(event) {
    console.log(event);
  }
  //**FUNCIONES DE CARGA DE DOCUMENTO***//
  public fileLeave(event) {
    console.log(event);
  }
  //******************************************************************************************************************//
  addDocument(){
    document.getElementById('documento').click();
  }
  //******************************************************************************************************************//
  deleteDocument(i,k){
    this.appointment[i].documentAppointments.splice(k,1);
  }
  //******************************************************************************************************************//
  save(){
    this.loader.showLoader();
    console.log("SAVE DATA: ", this.appointment);
    console.log("SAVE DATA: ", JSON.stringify(this.appointment));

    let valida_servicios = 0;
    for (let i = 0; i < this.appointment.length; i++) {
      if(this.appointment[i].appointmentWorkOrderServices.length == 0){
        valida_servicios++;
      }
    }
    if(valida_servicios != 0){
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Warning",
          body: "You must select a service to be able to create the appointment"
        },
        width: "350px"
      });
      this.loader.hideLoader();
      return true;
    }
    debugger
    this._services.service_general_post_with_url("Appointment/CreateAppointment", this.appointment).subscribe((data => {
      if(data.success){
        console.log(data);
         const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Data saved"
              },
              width: "350px"
            });
            this.loader.hideLoader();
            this.dialogRef.close();
      }
    }),(err) =>{
      console.log(err);
      this.loader.hideLoader();
    })
  }
  //******************************************************************************************************************//
  update(){
    let data_doc = [];

    for (let i = 0; i < this.appointment.length; i++) {
      let document = this.appointment[i].documentAppointments;
      for (let j = 0; j < document.length; j++) {
        if(document[j].id == 0){
          data_doc.push(document[j])
        }
      }
    }

    for (let i = 0; i < this.appointment.length; i++) {
      this.appointment[i].documentAppointments = data_doc;
    }



    console.log("informacion a ser actualizada: ", this.appointment);
    console.log("informacion a ser actualizada: ", JSON.stringify(this.appointment));
   debugger
    this.loader.showLoader();
    this._services.service_general_post_with_url("Appointment/UpdateAppointment", this.appointment).subscribe((data => {
      if(data.success){
        console.log(data);
         const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Update Data"
              },
              width: "350px"
            });
      }
      this.ngOnInit();
      this.loader.hideLoader();
    }),(err) =>{
      console.log(err);
      this.loader.hideLoader();
    })
  }


  SR_WO :any;
  consulta(element){
      let WO = [];
      this.SR_WO = [];
      this._services.service_general_get('ServiceRecord/GetServices/'+element.serviceRecordId+'?type=1').subscribe((response: any) => {
          response.map.value.home.forEach(E => {
              WO.push(E);
          });
          response.map.value.host.forEach(E => {
              WO.push(E);
          });
          this._services.service_general_get('ServiceRecord/GetServices/'+element.serviceRecordId+'?type=2').subscribe((response: any) => {
              response.map.value.home.forEach(E => {
                  WO.push(E);
              });
              response.map.value.host.forEach(E => {
                  WO.push(E);
              });

              console.log("ESTAS SON LAS WO", WO)
              this.SR_WO = WO;
          })
      })
  }

  async startAppoitment(appoi) {
    // console.log('modal', i);
    console.log('modal', appoi);

    let split_fecha = appoi.date.split("T");
    let fecha = split_fecha[0];
    let split_mes_dia = fecha.split("-");
    let fecha_actual_dia = new Date().getDate();
    let fecha_actual_mes = new Date().getMonth()+1;
    let fecha_actual_year = new Date().getFullYear();
    let date_appointment = new Date(split_mes_dia[0], split_mes_dia[1]-1, split_mes_dia[2]);

    if(Number(date_appointment.getFullYear()) == fecha_actual_year){
      if(Number(date_appointment.getMonth()+1) == fecha_actual_mes){
        if(Number(date_appointment.getDate()) == fecha_actual_dia){
           console.log("Se inicia el appointment");
           this.iniciarAppointment(appoi);
        }
        else{
          console.log("No se inicia el appointment")
          this.messageAppointment();
        }
      }else{
        console.log("No se inicia el appointment");
        this.messageAppointment();
      }
    }else{
      console.log("No se inicia el appointment");
      this.messageAppointment();
    }
  }

  async messageAppointment(){
    const dialogRef = this._dialog.open(ConfirmationCalendarComponent, {
      data: {
        header: "Start Appointment",
        body: "Unable to start appointment"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
     this.getAppointment();
      }
    })
  }

  async iniciarAppointment(appoi){
    const dialogRef = this._dialog.open(ConfirmationCalendarComponent, {
      data: {
        header: "Start Appointment",
        body: "Are you sure you want to start the appoitment?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_post_with_url('Appointment/App/Start/' + appoi.id + '/' + this.user.id, '').subscribe(r => {
          if (r.success) {
            console.log(r);
            this.getAppointment();
          }
        })
      }
    })
  }

  async endAppoitment(endAppoi) {
    // /api/Appointment/App/End/{report}/{appointment}/{user}
    console.log('modal', endAppoi);
    const dialogRef = this._dialog.open(ConfirmationCalendarComponent, {
      data: {
        header: "End Appointment",
        body: "Are you sure you want to end the appoitment?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(data_ => {
      console.log(data_);
      if (data_) {
        this._services.service_general_put('Appointment/App/End/' + endAppoi.report + '/' + endAppoi.id + '/' + this.user.id, '').subscribe(r => {
          if (r.success) {
            console.log(r);
            this.getAppointment();
          }
        })
      }
    })
  }

  _appointment_ : any;

  public getAppointment() {

    this._services.service_general_get('Appointment/GetAppointmentByServiceRecordId?id=' + this.data.sr)
      .subscribe((response: any) => {
        if (response.success) {
          console.log("APPOINT: ", response);
          this._appointment_ = response.result.value;
          for(let i = 0; i < this._appointment_.length; i++){
            if(this._appointment_[i].id == this.data.appointmentId){
                this.data.ended = this._appointment_[i].ended;
                this.data.start = this._appointment_[i].start;
                this.data.report = this._appointment_[i].report;
                this.ngOnInit();
                break;
            }
          }
        }
      })
  }


  dia_appointment:any;
  minstart:any;
  maxstart:any;
  getDay(i,date){
    this.selected_day= date.value;
    this.appointment[i].date = date.value;
    console.log(this.appointment[i].date);
    var dias=["[RRule.SU]", "[RRule.MO]", "[RRule.TU]", "[RRule.WE]", "[RRule.TH]", "[RRule.FR]","[RRule.SA]"];
    var Xmas95 = new Date(this.appointment[i].date);
   // setTimeout(() => {
      var weekday_ = Xmas95.getDay();
      this.dia_appointment = dias[weekday_];
      console.log(this.dia_appointment); // 1
   // }, 2000);
   
  }

}

