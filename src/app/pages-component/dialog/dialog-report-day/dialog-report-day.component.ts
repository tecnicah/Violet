import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogReportOfDayComponent } from '../dialog-report-of-day/dialog-report-of-day.component'
import { GeneralConfirmationComponent } from './../general-confirmation/general-confirmation.component';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { FormControl } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatOption } from '@angular/material/core';
import { DialogAcceptedComponent } from '../dialog-accepted/dialog-accepted.component';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

class serviceReportDays
  {
    id: number = 0;
    reportDayId: number = 0;
    service: number = 0;
    authotime: number = 0;
    time: number = 0;
    timeReminder: number = 0;
    createdBy: number = 0;
    createdDate: Date;
    updateBy: number;
    updatedDate: Date;
  }

@Component({
  selector: 'app-dialog-report-day',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-report-day.component.html',
  styleUrls: ['./dialog-report-day.component.css']
})
export class DialogReportDayComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef < any > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog,
    private _cd : ChangeDetectorRef) {}

  caServiceLine         :any[] = [];
  caService             :any[] = [];
  user                  :any   = {};
  wos                   :any[] = [];
  allUser               :any[] = [];
  userReport            :any   = {};
  sr: any;
  totalReminder: number = 0
  totalTime: number = 0;
  active_time: boolean = false;
  active_supplier: boolean = false;
  catServices: any[] = [];
  supplierReport: any[] = [];
  horasServicio: number = 0;
  itemreport: any = {
    timeReminder : 0
  };
  toppings = new FormControl();
  @ViewChild('allSelected') private allSelected: MatOption;
  @ViewChild('thisSelected') private thisSelected: MatOption;
  
  _serviceReportDays: serviceReportDays[] = [];

  public __loader__: LoaderComponent = new LoaderComponent();

  ngOnInit(): void {
    console.log("Data report of the day: ", this.data);
    this.catServices = this.data.services;
    this.getFolderNumber( this.data.sr );
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("DATAUSER: ", this.user)
    this.sr  = this.data.sr;
debugger;
    if(this.user.role.id != 3){
      this._services.service_general_get('ServiceRecord/ExperienceTeam/' + Number(this.data.sr)).subscribe((dataRe => {
        if (dataRe.success) {
          dataRe.result.value.forEach(element => {
            if(element.type == 'Supplier'){
              this.supplierReport.push(element);
            }
          });
         
          console.log("Suppliers ======================== ",this.supplierReport);
          
        }
      }));
      this.serviceLineName = this.data.serviceLine;
    }
    else
    {
      let _serviceLine: any = {};

      if(this.user.profileUsers[0].immigration){
        _serviceLine = {
          serviceLine: 1
        };
      }

      if(this.user.profileUsers[0].relocation){
        _serviceLine = {
          serviceLine: 2
        };
      }
      
      this.geServiceLine(_serviceLine);
    }

    this._services.service_general_get('User').subscribe(r =>{
      console.log("Usersss-->",r);
      this.allUser = r.result;
    })

    if(this.data.id != 0){
      this.__loader__.showLoader();
      this._services.service_general_get('ReportDay/GetreportDayById?id='+this.data.id).subscribe(r=>{
        if(r.success){
          console.log("YYYYYYYY-->",r.result);
          this.data = r.result;
          this.data.serviceReportDays = [];
          this.data.serviceReportDaysBundle = [];
          console.log('Aqui ===========>', r.result);
          for (let i = 0; i < this.allUser.length; i++) {
            const element = this.allUser[i];
            if(element.id == this.data.reportBy){
              this.userReport = element;
            }
          }
          debugger;
          this.catServices.forEach(element => {
            if(element.tipo == "standalone"){
              this.data.serviceReportDays.push(
                {
                  id            : element.id,
                  reportDayId   : this.data.id,
                  service       : element.id,
                  serviceName: element.service,
                  authotime : element.authoTime == null || element.authoTime == undefined ? 0 : element.authoTime,
                  time          : element.time,
                  timeReminder  : element.timeReminder,
                  createdBy     : this.user.id,
                  createdDate   : new Date(),
                  updateBy      : this.user.id,
                  updatedDate   : new Date()
                }
              )
            }
            if(element.tipo == "bundle"){
              //this.totalTime = obj
              this.data.serviceReportDaysBundle.push(
                {
                  id            : element.id,
                  reportDayId   : this.data.id,
                  service       : element.id,
                  serviceName: element.service,
                  authotime : element.authoTime == null || element.authoTime == undefined ? 0 : element.authoTime,
                  time          : element.time,
                  timeReminder  : element.timeReminder,
                  createdBy     : this.user.id,
                  createdDate   : new Date(),
                  updateBy      : this.user.id,
                  updatedDate   : new Date()
                }
              )
            }
          });

          //this.getWorkOrders();
          //this.getService();
          this.__loader__.hideLoader();
        }
      })
    }else{
      this.data.reportNo          = 0;
      this.data.reportBy          = this.user.id;
      this.data.creationDate = new Date();
      // this.data.reportDate      = new Date();
      this.data.createdBy         = this.user.id;
      this.data.createdDate       = new Date();
      this.data.serviceReportDays = [];
      this.data.serviceReportDaysBundle = [];
      this.userReport = this.user;
    }
    this.catalogos();
  }

  public report_no:number = 0;
  public getFolderNumber( sr_id_in:any ):void {

    const sr_id:any = sr_id_in;

    this._services.service_general_get(`ReportDay/GetReportNo?sr=${ sr_id }`)
        .subscribe( (response:any) => {

          console.log('Res => ', response);

          if( response.success ) {

            this.report_no = response.result;

          }

        }, (error:any) => {

          console.error('Error ===> ', error);

        });

  }

  async catalogos(){
    debugger;
    this.caServiceLine = await this._services.getCatalogueFrom('GetServiceLine');
    console.log('serviceline', this.caServiceLine);
    
    if(this.user.role.Id == 3){
      for (let i = 0; i < this.caServiceLine.length; i++) {
        const element = this.caServiceLine[i];
        
        if(this.user.profileUsers[0].immigration){
          if (element.serviceLine == 'Relocation') {
            this.caServiceLine.splice(i, 1);
    
          }
        }
        
        if(this.user.profileUsers[0].relocation){
          if (element.serviceLine == 'Immigration') {
            this.caServiceLine.splice(i, 1);
    
          }
        }
      } 
    }
 
    // validar si el consultant es tipo immi no puede crear reportes de relocation
    // if ((this.user.role.id == 3) && (this.user.profileUsers[0].supplierType == 3)) {
    //   for (let i = 0; i < this.caServiceLine.length; i++) {
    //     const element = this.caServiceLine[i];

    //     if (element.serviceLine == 'Relocation') {
    //       this.caServiceLine.splice(i, 1);

    //     }
    //   }
    // }


  }

  serviceLineName: string = "";
  geServiceLine(serviceLine)
  {
    debugger;
    this.data.serviceLine = serviceLine.serviceLine;
    if(serviceLine.serviceLine == 1){
      this.serviceLineName = "Immigration";
    }
    if(serviceLine.serviceLine == 2){
      this.serviceLineName = "Relocation";
    }
    setTimeout(() => {
      this.getWorkOrders(serviceLine.serviceLine);
    }, 300);
  }

  getWorkOrders(serviceLine){
    this.__loader__.showLoader();
    // if(this.user.role.id != 3){
    //   this.user.role.id = this.data.reportBy;
    // }
    debugger;
    this._services.service_general_get('Catalogue/GetServiceByServiceLineReports?sr='+this.sr+'&sl='+serviceLine+'&idUser='+this.data.reportBy).subscribe(r=>{
      if(r.success){
        console.log("estas son las WO: ", r.result);
        this.caService = r.result.value;
        this.__loader__.hideLoader();
        if(r.result.length == 0){
          const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Activity Report",
              body: "Make sure you have created relocation services or check if the work order is not closed."
            },
            width: "350px"
          });
          dialogRef.afterClosed().subscribe(result => {
          })
        }
      }
    })
  }

  tosslePerOne(thisSelected, item, i){ 
    debugger;
    console.log(thisSelected._selected);
    if (!thisSelected.selected) {  
     //this.thisSelected.deselect();
      if(item.tipo == "standalone"){
        this.data.serviceReportDays.forEach((element, index) => {
          if(element.service == item.id){
            console.log("ELEMENT",element);
            console.log(index);
            this.data.serviceReportDays.splice(index, 1);
          }
        });
      }
      if(item.tipo == "bundle"){
        this.data.serviceReportDaysBundle.forEach((element, index) => {
          if(element.service == item.id){
            console.log("ELEMENT",element);
            this.data.serviceReportDaysBundle.splice(index, 1);
          }
        });
      }
    }
   if(thisSelected._selected){
    //this.thisSelected.select();
    this.selecTotalTime(item);
   }
    
 }
   toggleAllSelection() {
    debugger;
     if (this.allSelected.selected) {
       this.toppings
         .patchValue([...this.caService.map(item => item.id), 0]);
         
         this.toppings.value.forEach((element,index) => {
           if(element == this.caService[index]?.id)
           {
            this.selecTotalTime(this.caService[index]);
           }
         });
     } else {
       this.toppings.patchValue([]);
       this.data.serviceReportDays = [];
       this.data.serviceReportDaysBundle = [];
     }
   }

   getService() {
    console.log("Entra a consultaar servicos de work order");
    console.log(this.data.workOrder+'idUser='+this.user.id);
    this._services.service_general_get('Catalogue/GetServiceByWorkOrder?wo='+this.data.workOrder+'&idUser='+this.user.id).subscribe(r => {
      console.log(r);
      if(r.success){
        this.caService = r.result.value;
        console.log('servicios', this.caService);
      }
    })
  }
  
  selecTotalTime(obj)
  {
    debugger;
    console.log(this.data.serviceReportDaysBundle);
    this.data.workOrder = obj.workOrderId;
    this.totalTime += obj.totalRemaining;

    if(obj.tipo == "standalone"){
      this.data.serviceReportDays.push(
        {
          id            : 0,
          reportDayId   : this.data.id,
          service       : obj.id,
          serviceName: obj.serviceNumber,
          authotime : obj.totalTime,
          time          : 0,
          timeReminder  : obj.totalRemaining,
          createdBy     : this.user.id,
          createdDate   : new Date(),
          updateBy      : this.user.id,
          updatedDate   : new Date()
        }
      )
    }
    if(obj.tipo == "bundle"){
      //this.totalTime = obj
      this.data.serviceReportDaysBundle.push(
        {
          id            : 0,
          reportDayId   : this.data.id,
          service       : obj.id,
          serviceName: obj.serviceNumber,
          authotime : obj.totalTime,
          time          : 0,
          timeReminder  : obj.totalRemaining,
          createdBy     : this.user.id,
          createdDate   : new Date(),
          updateBy      : this.user.id,
          updatedDate   : new Date()
        }
      )
    }
  } 

  timeRemainingOriginal: any;
  _timelocal: any = 0;
  restaTime(index, service, timeOriginal, timeWorked, tipo){
    debugger;
    console.log(timeOriginal);
    console.log(service);
    console.log("Reminder", parseInt(timeOriginal)-parseInt(timeWorked==null?0:timeWorked));

    this._services.service_general_get('ReportDay/GetTimeRemaindingPublic?service='+service).subscribe(r => {
      
      if(r.success){
        if(tipo == "standalone"){
          this.timeRemainingOriginal = r.result;
          this.data.serviceReportDays[index].timeReminder = r.result;
          setTimeout(() => {
            this.data.serviceReportDays[index].timeReminder = parseFloat(r.result)-parseFloat(timeWorked==null?0:timeWorked);
            this._cd.markForCheck();
          }, 200);
        }
        if(tipo == "bundle"){
          this.timeRemainingOriginal = r.result;
          this._timelocal += parseFloat(timeWorked==null?0:timeWorked);
          this.data.serviceReportDaysBundle[0].timeReminder = r.result;
          setTimeout(() => {
            this.data.serviceReportDaysBundle[0].timeReminder = parseFloat(r.result)-parseFloat(this._timelocal);
            this._cd.markForCheck();
          }, 200);
        }
      }
    })
  }

  public validHour = false;
  // validationHours() {
  //   let horasServicio: number = 0;
  //   console.log('total hour', this.data.totalTime);

  //   for (let t = 0; t < this.data.serviceReportDays.length; t++) {
  //     const horas = this.data.serviceReportDays[t];
  //     horasServicio = horasServicio + horas.time;
  //   }

  //   console.log('Total de horas', horasServicio)
  //   if (horasServicio > this.data.totalTime) {
  //     // si es mayor las horas de servicio al total de horas no se podra guardar y manda alerta
  //     this.validHour = false;
  //     const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
  //       data: {
  //         header: "Warning",
  //         body: `The Time of the service exceeds the Total Time.`
  //       },
  //       width: "350px"
  //       });

  //   }
  //   else {
  //     // si no es mayor  que se guarde el activity report
  //     this.validHour = true;

  //   }
  // }
  //VALIDACIONES//

  active_reportDate: boolean = false;
  active_serviceLine: boolean = false;
  active_workOrder:boolean = false;
  active_startTime: boolean = false;
  active_endTime: boolean = false;
  active_service: boolean = false;
  active_activity: boolean = false;
  active_conclusion: boolean = false;

  // active_serviceTime :boolean = false;


  validtime: boolean = false;
  messageValidTime: string = "";
  validarCampos() {
    // if(this.data.serviceLine == 1){
    //   console.log(this.data.serviceLine);
    //   this.data.startTime = 0;
    //   this.data.endTime = 0;
    // }
    if(this.data.reportBy == undefined){
      this.active_supplier = true;
    }
    if(this.data.reportDate == undefined || this.data.reportDate == ""){
      this.active_reportDate = true;
    }
    if(this.data.serviceLine == undefined){
      this.active_serviceLine = true;
    }
    if(this.data.workOrder == undefined){
      this.active_workOrder = true;
    }
    if(this.data.startTime == undefined && this.data.startTime == null){
      this.active_startTime = true;
    }
    if (this.data.endTime == undefined && this.data.endTime == null) {
      this.active_endTime = true;
    }
    if (this.data.activity == undefined && this.data.activity == null || this.data.activity == "") {
      this.active_activity = true;
    }
    if (this.data.conclusion == undefined && this.data.conclusion == null || this.data.conclusion == "") {
      this.active_conclusion = true;
    }
   
    // checamos si hay mas de un servicio agregado
    debugger;
    if (this.data.serviceReportDays.length == 0 && this.data.serviceReportDaysBundle.length == 0) {
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Service",
          body: "Required service"
        },
        width: "350px"
      });
      this.active_service = true;
    }

    debugger;
    console.log(this.data);
    if (this.data.reportDate != undefined && this.data.serviceLine != undefined && (this.data.startTime != undefined && this.data.startTime != null) && (this.data.endTime != undefined && this.data.endTime != null) 
    && (this.data.serviceReportDays.length != 0 || this.data.serviceReportDaysBundle.length != 0) && this.data.activity  != undefined && this.data.conclusion != undefined) {
      // validar horas
      console.log('total hour', this.data.totalTime);

      if(this.data.serviceReportDays.length != 0){
        for (let t = 0; t < this.data.serviceReportDays.length; t++) {
          const horas = this.data.serviceReportDays[t];
          this.horasServicio = this.horasServicio + horas.time;
        }  
      }
      
      if(this.data.serviceReportDaysBundle.length != 0){
        for (let t = 0; t < this.data.serviceReportDaysBundle.length; t++) {
          const horas = this.data.serviceReportDaysBundle[t];
          this.horasServicio = this.horasServicio + horas.time;
        }  
      }

      if(this.data.serviceLine == 2 && this.data.id == 0){
          console.log('Total de horas', this.horasServicio)
        if (this.horasServicio > this.data.totalTime) {
          // si es mayor las horas de servicio al total de horas no se podra guardar y manda alerta
          this.validHour = false;
          this.validtime = true;
          this.messageValidTime = "Service time exceeds the total time added to the report, the report cannot be saved";
          const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `Service time exceeds the total time added to the report, the report cannot be saved`
            },
            width: "350px"
          });
          dialog2.afterClosed().subscribe(result => {
            // console.log(result);
            // if (result) {
            //   this.validHour = true;
            //   this.validtime = false;
            //   this.save();
            //   }
            this.horasServicio = 0;
            });
          return false;
        }
        if(this.horasServicio < this.data.totalTime){
          this.validHour = false;
          this.validtime = true;
          this.messageValidTime = "The Service Time is less than the total time added to the report";
          const dialog2 = this._dialog.open(DialogConfirmComponent, {
            data: {
              header: "Warning",
              body: `The Service Time is less than the total time added to the report, do you want to continue?`
            },
            width: "350px"
          });
          dialog2.afterClosed().subscribe(result => {
            console.log(result);
            if (result) {
              this.validHour = true;
              this.validtime = false;
              this.save();
              }
            });
          return false;
        }
      }
      else{
        this.validHour = true;
        this.validtime = false;
        this.save();

        return false;
      }
      
      this.validHour = true;
      this.validtime = false;
      this.save();
    }

}

removeValid(){
  //console.log("yuu",this.validtime);
  this.validtime = false;
}

  save() {
    // this.validarCampos();
    // this.validationHours();
   
    if (this.validHour == true) {
      this.data.updateBy = this.user.id;
      this.data.updatedDate = new Date();
      
      this.__loader__.showLoader();
      console.log(this.data);
      console.log(JSON.stringify(this.data));
      
      
      // if(this.data.serviceReportDays.length == 0){
      //   this.data.serviceReportDays = this.data.serviceReportDaysBundle;
      // }

      let timebundle = 0;
      if(this.data.serviceReportDaysBundle.length > 0){
        this.data.serviceReportDaysBundle.forEach(element => {
          timebundle = timebundle + element.time; 
        });
        
        this.data.serviceReportDaysBundle.forEach(element => {
          this.data.serviceReportDays.push({
            id: element.id,
            reportDayId: element.reportDayId,
            service: element.service,
            serviceName: element.serviceName,
            authotime: element.authotime,
            time: element.time,
            timeReminder: element.timeReminder - timebundle,
            createdBy: element.createdBy,
            createdDate: element.createdDate,
            updateBy: element.updateBy,
            updatedDate: element.updatedDate
          });  
        });
      }

      
      debugger;
      if (this.data.id == 0) {
        this._services.service_general_post_with_url("ReportDay/PostReportDay", this.data).subscribe((data => {
          if (data.success) {
            console.log(data);

            this.__loader__.hideLoader();
            const dialog_ = this._dialog.open(DialogReportOfDayComponent, {
              data: {data: data.result, serviceLine: this.data.serviceLine},
              width: "40%"
            });
            this.__loader__.hideLoader();
            this.dialogRef.close();
            this.ngOnInit();
          }
        }))
      } else {
        debugger
        delete this.data.reportByNavigation;
        this._services.service_general_post_with_url("ReportDay/PostReportDay", this.data).subscribe((data => {
          if (data.success) {
            console.log(data);

            this.__loader__.hideLoader();
            const dialog_ = this._dialog.open(DialogReportOfDayComponent, {
              data: {data: data.result, serviceLine: this.data.serviceLine},
              width: "40%"
            });
            this.__loader__.hideLoader();
            this.dialogRef.close();
            this.ngOnInit();
          }
        }))
      }
    }
    else {

    }

  }

  public getMaxDateTo( years_ago:number = 18 ):Date {

    const today:Date = new Date(),
        today_year:number = today.getFullYear(),
        today_month:number = today.getMonth(),
        today_day:number = today.getDate(),
        new_min_date:Date = new Date( today_year - years_ago, today_month, today_day );

    return new_min_date;

  }

  public end_date_disabled:boolean = false;
  public enableEndDate( hour_in:any ):void {

    hour_in != '' && hour_in != null && hour_in != undefined ?
      this.end_date_disabled = true :
      this.end_date_disabled = false;

  }

  public get_total_hours:number = 0;
  public getHoursDifference() {
    console.log(this.data.service);
    const create_date_one:Date = new Date(),
      create_date_two:Date = new Date();
    debugger;
    if( this.data.startTime != undefined && this.data.endTime != undefined && this.data.service != undefined) {

      create_date_one.setHours(this.data.startTime.split(':')[0], this.data.startTime.split(':')[1]);
      create_date_two.setHours(this.data.endTime.split(':')[0], this.data.endTime.split(':')[1]);

      let get_difference:any = ( create_date_two.getTime() - create_date_one.getTime() ) / 1000;

      get_difference /= (60 * 60);

      this.get_total_hours = Math.abs(get_difference);
      this.data.totalTime = this.get_total_hours;

      if(this.get_total_hours > this.totalTime){
        this.active_time = true;
        console.log(this.active_time);
        this._cd.markForCheck();
        
      }
      else{
        this.active_time = false;
        if(this.get_total_hours < this.totalTime){
          this.active_time = false
          console.log(this.active_time);
          this._cd.markForCheck();
        }
        else{
          this.active_time = false;
        }
      }
    }

  }

}
