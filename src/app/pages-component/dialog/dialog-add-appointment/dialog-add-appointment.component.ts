import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceGeneralService } from '../../../service/service-general/service-general.service';
import { LoaderComponent } from '../../../shared/loader';
import { Resolve } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { I } from '@angular/cdk/keycodes';
import { ConfirmationCalendarComponent } from '../confirmation-calendar/confirmation-calendar.component';
import { MatOption } from '@angular/material/core';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { Item } from 'pdfmake-wrapper';

interface _documentAppointments {
  id: number,
  fileName: string,
  fileExtension: string,
  fileRequest: string,
  createdBy: number,
  createdDate: Date,
  appointmentId: number
}

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

  //TABLE HOUSING//
  dataSourceHousing: any[] = [];
  displayedColumnsHousing: string[] = ['Property Type', 'Address', 'Neighborhood', 'Price', 'Currency', 'Housing Status'];

  //TABLE SCHOOL INFORMATION//
  dataSourceSchool: any[] = [];
  displayedColumnsSchool: string[] = ['School Name', 'School No.', 'Dependent', 'Schooling Status'];

  public loader: LoaderComponent = new LoaderComponent();
  appointment: any[] = [];
  public object_valid: any[] = [{
    "valid_to": true,
    "valida_servicios": true,
    "valid_date": true,
    "valid_stat": true,
    "valid_end": true,
    "valid_desc": true
  }];
  data_check: any[] = [];
  user: any;
  data_work: any;
  date = new Date();
  profileCunsultant = false;
  supplier_select: any;
  status_appointment: any[] = [];
  _setSchoolByAddSchool: any[] = [];
  public serviceSelect = new FormControl();
  @ViewChild('allSelected') private allSelected: MatOption;
  @ViewChild('thisSelected') private thisSelected: MatOption;

  _documentAppointments: _documentAppointments[] = [];

  constructor(public _dialog: MatDialog, public dialogRef: MatDialogRef<DialogAddAppointmentComponent>, public _services: ServiceGeneralService, private formBuilder: FormBuilder, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  //******************************************************************************************************************//
  public image_path: string = this._services.url_images;

  ngOnInit() {
    const minValue = new Date();
    this._minValue = minValue;
    const maxValue = new Date();
    this._maxValue = maxValue;
    
    this.user = JSON.parse(localStorage.getItem('userData'));
   // console.log("DATAUSER: ", this.user)
    this.getCatalogo();
   // console.log("DATA RECIBIDA EN MODAL APPOINTMENT: ", this.data);
    this.sr = Number(this.data.sr);

    if (this.user.role.id == 3) {
      this.profileCunsultant = true;
      console.log('se loggeo un profile consultant');
    }

    let immigration;
    let relocation;
    let data_final = [];

    if (this.data.appointmentId != 0) {
      this._services.service_general_get('Appointment/GetAppointmentById?id=' + Number(this.data.appointmentId)).subscribe((data => {
        console.log("appointment by id; ", data);
        for (let i = 0; i < data.result.value.length; i++) {
          data.result.value[i].ended = this.data.ended;
          data.result.value[i].start = this.data.start;
          data.result.value[i].report = this.data.report;
        }
        debugger;
        for (let i = 0; i < data.result.value[0].services.length; i++) {
          if (data.result.value[0].services[i].homeFindingId != 0) {
            this.trae_casas_a_visitar(data.result.value[0].services[i].workOrderServiceId, data.result.value[0].date, i);
          }
        }


        for (let i = 0; i < data.result.value[0].services.length; i++) {
          if (data.result.value[0].services[i].schoollingId != 0) {
            this.getDataSchoolList(data.result.value[0].services[i].workOrder, data.result.value[0].services[i].schoollingId, data.result.value[0].date);
          }
        }

        this.appointment = data.result.value;
        this._services.service_general_get('Catalogue/GetServiceByServiceLineReports?sr=' + this.sr + '&sl=' + this.appointment[0].service_line + '&idUser=' + this.appointment[0].to).subscribe(r => {
          if (r.success) {
            this.caService = r.result.value;
            const service_selected: any[] = this.appointment[0].appointmentWorkOrderServices;

            let service_pre_selected: number[] = [];

            service_selected.forEach((service: any) => {
              service_pre_selected.push(service.workOrderServiceId);
            });

            this.appointment[0].services = [];
            this.appointment[0].services = service_pre_selected;
          }
          else {
            this.loader.hideLoader();
          }
        });

      }))
    } else {
      this._services.service_general_get('Catalogue/GetworkOrderBySR?service_record_Id=' + Number(this.data.sr) + '&service_line_id=' + 1).subscribe((dataIm => {
        if (dataIm.success) {
          console.log("DATA CATALOGO ADD POINTMENT im: ", dataIm);
          immigration = dataIm.result.value;
          this._services.service_general_get('Catalogue/GetworkOrderBySR?service_record_Id=' + Number(this.data.sr) + '&service_line_id=' + 2).subscribe((dataRe => {
            if (dataRe.success) {
              console.log("DATA CATALOGO ADD POINTMENT re: ", dataRe);
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

      //this.getServices();
      setTimeout(() => {
        this.addAppointment();
      }, 500);

    }
  }

  getDataHousingList(home_finding_id, i) {
    this._services.service_general_get(`HousingList/GetHomeFindingHousingList?id_service_detail=${home_finding_id}`).subscribe(data_housing => {
      // debugger;
      if (data_housing.success) {
        console.log('DATA CONSULTA HOUSING LIST =========================== NUEVOOOOOOOOOOOOOO: ', data_housing);
        this.dataSourceHousing[i] = data_housing.message;
      }
    });
  }

  getDataSchoolList(workOrder_id, school_id, dateVisit) {
    debugger;
    console.log(this.data);
    let _dateVisit;
    let date = new Date(dateVisit.toString());
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    _dateVisit = m + '/' + d + "/" + y
    console.log(date.toLocaleDateString());
    this._services.service_general_get('SchoolsList/GetAllSchoolByWoId?wo_id=' + workOrder_id + "&school_search_id=" + school_id + "&dateViste=" + _dateVisit + "&status=8").subscribe(data_schooling_list => {
      //  //console.log('DATA CONSULTA SCHOOLING LIST: ', data_schooling_list);
      if (data_schooling_list.success) {

        this.dataSourceSchool[0] = data_schooling_list.message;
        console.log('DATA CONSULTA SCHOOLING LIST: ', this.dataSourceSchool[0]);
      }
    });
  }

  deleteAppointment() {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to cancel this appointment?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      this.loader.showLoader();
      if (result) {
        this._services.service_general_delete("Appointment?key=" + this.data.appointmentId).subscribe((data => {
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: 'Appointment canceled successful'
              },
              width: "350px"
            });
            this.loader.hideLoader();
            this.ngOnInit();
          }
        }))
      }
    });
  }

  addHouse(event, idHousing) {
    console.log(event.checked);
    this._services.service_general_post_with_url("Appointment/AddAppointmentHousing?appointmentId=" + Number(this.data.appointmentId) + "&housingId=" + idHousing + "&action=" + event.checked, "").subscribe((data => {
      debugger;
      if (data.success) {
        //console.log('DATA CONSULTA HOUSING LIST =========================== NUEVOOOOOOOOOOOOOO: ', data_housing);
        //this.dataSourceHousing = data_housing.message;
      }
    }));
  }

  addSchool(event, idSchool, idAppointment) {
    console.log(event.checked);
    this._services.service_general_post_with_url("Appointment/AddAppointmentSchooling?appointmentId=" + Number(idAppointment) + "&schoolingId=" + idSchool + "&action=" + event, "").subscribe((data => {
      debugger;
      if (data.success) {
        //console.log('DATA CONSULTA HOUSING LIST =========================== NUEVOOOOOOOOOOOOOO: ', data_housing);
        //this.dataSourceHousing = data_housing.message;
      }
    }));
  }

  setSchoolByAddSchool(event, idSchool, i) {
    if (event.checked) {
      this._setSchoolByAddSchool.push(idSchool);
    }
    else {
      this._setSchoolByAddSchool.splice(i, 1);
    }
  }

  public horainicio;
  public horafin;
  isConsultant: boolean = false;
  available: [];
  NoAvailable: [];
  tiempo: any[] = [];

  getavailabitily(i) {
    let user_type;
    this.available = [];
    this.NoAvailable = [];
    this.tiempo = [];
    this.isConsultant = false;
    this.appointment[i].services = [];

    this.get_sl_from_supp(i); // setea la SL
    this.getWorkOrders(i); // trae los servicios 
  }

  get_sl_from_supp(i) {
    debugger;
    var id_sup = this.appointment[i].to;
    var supp_selected: any[] = this.ca_supplier.filter(s => s.userId == id_sup);
    this.app_sl = supp_selected[0].serviceLine;

  }


  //******************************************************************************************************************//
  ca_supplier = [];
  eventos = [];

  async getCatalogo() {
    this.get_servicesby_suppliers();
    this.fill_sl_by_user();
    this.get_status_appointment()
  }

  get_status_appointment() {
    this._services.service_general_get('Catalogue/GetStatusAppointment')
      .subscribe((status => {
        console.log("ESTATUS", status);
        this.status_appointment = status.result;
      }));
  }

  get_servicesby_suppliers() {
    let filter_supplier: any;
    this._services.service_general_get('ServiceRecord/ExperienceTeam/' + Number(this.data.sr)).subscribe((dataRe => {
      if (dataRe.success) {
        let supplier = dataRe.result.value;
        /*
        for (let i = 0; i < supplier.length; i++) {
         if(supplier[i].type = "Consultant"){
           filter_supplier.push(supplier[i]);
          }
        }
        */
        debugger;
        if (this.user.role.id == 3) {
          // for (let i = 0; i < supplier.length; i++) {
          //   const element = supplier[i];
          //     if (element.userId != this.user.id ) {
          //       supplier.splice(i, 1);
          //     }

          // }

          supplier = supplier.filter(sup => sup.userId == this.user.id);


        }
        else {
          // for (let i = 0; i < supplier.length; i++) {
          //   const element = supplier[i];
          //     if (element.type == 'Coordinator') {
          //       supplier.splice(i, 1);
          //     }

          // }

          supplier = supplier.filter(sup => sup.type != 'Coordinator');


        }


        this.ca_supplier = supplier;
        console.log("Suppliers ======================== ", this.ca_supplier);
      }
    }));
  }

  //******************************************************************************************************************//
  toggleAllSelection(i) {
    debugger;
    if (this.allSelected.selected) {
      console.log(this.caService);
      this.serviceSelect
        .patchValue([...this.caService.map(item => item.service), 0]);

      this.serviceSelect.value.forEach((element, index) => {
        this.appointment[0].appointmentWorkOrderServices.push({
          "id": 0,
          "appointmentId": this.appointment[0].id,
          "workOrderServiceId": element
        })
      });
    } else {
      this.serviceSelect.patchValue([]);
      this.appointment[0].appointmentWorkOrderServices = [];
    }
  }



  pushCheckbox(i, j, thisSelected, data) {

    let school_id = 0;
    let workOrder_id = 0;
    let es_escuela = false;
    let homef_id = 0;
    let workOrder_home_id = 0;

    this.caService.forEach(element => {

      if (element.service == data.id) { // encuentra al servicio chequeado
        if (element.category == 15) // es escuela 
        {
          school_id = element.school_id;
          workOrder_id = element.workOrderId;
          es_escuela = true
        }
        if (element.category == 21) // es homef 
        {
          workOrder_home_id = element.workOrderServiceId;
        }
      }
    });


    if (thisSelected.selected) {

      this.appointment[i].appointmentWorkOrderServices.push({
        "id": 0,
        "appointmentId": this.appointment[i].id,
        "workOrderServiceId": data.id
      });

      let _dateVisit;
      let date = new Date(this.appointment[i].date.toString());
      var d = date.getDate();
      var m = date.getMonth() + 1;
      var y = date.getFullYear();
      _dateVisit = m + '/' + d + "/" + y
      //console.log(date.toLocaleDateString());

      if (es_escuela) {
        this.trae_escuelas_a_visitar(workOrder_id, school_id, _dateVisit, i);
      }

      if (workOrder_home_id > 0) {
        this.trae_casas_a_visitar(workOrder_home_id, _dateVisit, i);
      }

    }
    else {
      this.appointment[i].appointmentWorkOrderServices.forEach((element, index) => {
        if (data.id == element.workOrderServiceId) {
          this.appointment[i].appointmentWorkOrderServices.splice(index, 1);
        }
      });

      if (this.appointment[i].appointmentWorkOrderServices.length > 0) {
        this.object_valid[i].valida_servicios = true
      }

      if (es_escuela) {
        this.dataSourceSchool[i] = [];
        this._setSchoolByAddSchool = [];
      }
    }
  }

  pushCheckboxUpdate(i, j, thisSelected, data) {
    debugger;

    let school_id = 0;
    let workOrder_id = 0;
    let es_escuela = false;
    let workOrder_home_id = 0;

    this.caService.forEach(element => {

      if (element.service == data.service) { // encuentra al servicio chequeado
        if (element.category == 15) // es escuela 
        {
          school_id = element.school_id;
          workOrder_id = element.workOrderId;
          es_escuela = true
        }
        if (element.category == 21) // es homef 
        {
          workOrder_home_id = element.workOrderServiceId;
        }
      }
    });

    let _dateVisit;
    let date = new Date(this.appointment[i].date.toString());
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    _dateVisit = m + '/' + d + "/" + y
    // console.log(date.toLocaleDateString());

    if (thisSelected.selected) {
      this.appointment[i].appointmentWorkOrderServices.push({
        "id": 0,
        "appointmentId": this.appointment[i].id,
        "workOrderServiceId": data.service
      });

      if (es_escuela) {


        this._services.service_general_get('SchoolsList/GetAllSchoolByWoId?wo_id=' + workOrder_id + "&school_search_id=" + school_id + "&dateViste=" + _dateVisit + "&status=8").subscribe((data_schooling_list => {

          if (data_schooling_list.success) {

            this.dataSourceSchool[i] = data_schooling_list.message;
            console.log('DATA CONSULTA SCHOOLING LIST: ', this.dataSourceSchool[i]);
          }
        }));
      }
      if (workOrder_home_id > 0) {
        this.trae_casas_a_visitar(workOrder_home_id, _dateVisit, i);
      }

    } else {

      this.appointment[i].appointmentWorkOrderServices.forEach((element, index) => {
        if (data.workOrderServiceId == element.workOrderServiceId) {
          this.appointment[i].appointmentWorkOrderServices.splice(index, 1);
        }
      });

      if (this.appointment[i].appointmentWorkOrderServices.length > 0)
        this.object_valid[i].valida_servicios = true

      if (es_escuela) {
        this.dataSourceSchool[i] = [];
        this._setSchoolByAddSchool = [];
      }

      if (workOrder_home_id > 0) {
        this.dataSourceHousing[i] = [];
      }

    }
  }

  trae_escuelas_a_visitar(workOrder_id, school_id, _dateVisit, i) {
    this._services.service_general_get('SchoolsList/GetAllSchoolByWoId?wo_id=' + workOrder_id + "&school_search_id=" + school_id + "&dateViste=" + _dateVisit + "&status=8").subscribe((data_schooling_list => {
      if (data_schooling_list.success) {
        this.dataSourceSchool[i] = data_schooling_list.message;
        console.log('DATA CONSULTA SCHOOLING LIST: ', this.dataSourceSchool[i]);
      }
    }));
  }

  trae_casas_a_visitar(workOrder_id, _dateVisit, i) {
    this._services.service_general_get('HousingList/GetHomestovist?wosid=' + workOrder_id + "&dateViste=" + _dateVisit).subscribe(data_housing => {
      // debugger;
      if (data_housing.success) {

        this.dataSourceHousing[i] = data_housing.custom.value;

        console.log('DATA CONSULTA HOUSING LIST this.dataSourceHousing ===========================  : ', this.dataSourceHousing[i], data_housing);
      }
    });
  }

  validar_si_hay_escuelas(i) {

    debugger;
    let school_id = 0;
    let workOrder_id = 0;
    let es_escuela = false;

    let escuelas_srv;
    let eschoolings_srv;

    eschoolings_srv = this.caService.filter(E => { // contiene los servicios de escuelas
      return E.category == 15;
    })

    if (eschoolings_srv.length > 0) {
      escuelas_srv = this.appointment[i].appointmentWorkOrderServices.filter(E => { //solo sirve para el primer sericio de escuela si hay mas de uno peud efallar
        return E.workOrderServiceId == eschoolings_srv[0].service;
      })


      if (escuelas_srv.length < 1) { //si no hay servicios de escuelas seleccionadas
        this.dataSourceSchool[i] = [];
        this._setSchoolByAddSchool = [];
      }
      else {
        school_id = eschoolings_srv[0].school_id;
        workOrder_id = eschoolings_srv[0].workOrderId;

        let _dateVisit;
        let date = new Date(this.appointment[i].date.toString());
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        _dateVisit = m + '/' + d + "/" + y
        console.log(date.toLocaleDateString());

        this._services.service_general_get('SchoolsList/GetAllSchoolByWoId?wo_id=' + workOrder_id + "&school_search_id=" + school_id + "&dateViste=" + _dateVisit + "&status=8").subscribe((data_schooling_list => {

          if (data_schooling_list.success) {

            this.dataSourceSchool[i] = data_schooling_list.message;
            console.log('DATA CONSULTA SCHOOLING LIST: ', this.dataSourceSchool[i]);
          }
        }));

      }
    }
    else {
      this.dataSourceSchool[i] = [];
      this._setSchoolByAddSchool = [];
    }

  }


  validar_si_hay_casas(i) {

    let school_id = 0;
    let workOrder_id = 0;
    let es_escuela = false;

    let escuelas_srv;
    let eschoolings_srv;

    eschoolings_srv = this.caService.filter(E => { // contiene los servicios de schooling
      return E.category == 21;
    })

    if (eschoolings_srv.length > 0) {
      escuelas_srv = this.appointment[i].appointmentWorkOrderServices.filter(E => { //solo sirve para el primer sericio de escuela si hay mas de uno peud efallar
        return E.workOrderServiceId == eschoolings_srv[0].service;
      })


      if (escuelas_srv.length < 1) { //si no hay servicios de escuelas seleccionadas
        this.dataSourceHousing[i] = [];
      }
      else {
        school_id = eschoolings_srv[0].service;

        let _dateVisit;
        let date = new Date(this.appointment[i].date.toString());
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        _dateVisit = m + '/' + d + "/" + y
        console.log(date.toLocaleDateString());

        this.trae_casas_a_visitar(school_id, _dateVisit, i);

      }
    }
    else {
      this.dataSourceHousing[i] = [];
    }

  }


  //******************************************************************************************************************//
  lessAppointment(i) {
    this.appointment.splice(i, 1);
  }

  addAppointment() {
    let to = '';
    if (this.user.role.id == 3) {
      to = this.user.id;
      //this.getavailabitily(0);
    }

    this.appointment.push({
      "id": 0,
      "serviceRecordId": Number(this.data.sr),
      "date": null,
      "startTime": null,
      "startTimeMeridian": null,
      "endTime": null,
      "endTimeMeridian": null,
      "description": null,
      "commentCancel": "",
      "createdBy": this.user.id,
      "createdDate": new Date(),
      "updateBy": this.user.id,
      "updatedDate": new Date(),
      "to": to,
      "from": this.user.id,
      "status": 1,
      "appointmentWorkOrderServices": [

      ],
      "documentAppointments": [

      ],
      "services": this.data_check
    });

    if (this.user.role.id == 3) {
      this.getavailabitily(0);
    }

    this.object_valid.push({
      "valid_to": true,
      "valida_servicios": true,
      "valid_date": true,
      "valid_stat": true,
      "valid_end": true,
      "valid_desc": true
    });
    console.log(this.appointment.length);
    //document.getElementById('txt-1').focus();
  }
  //******************************************************************************************************************//
  getServices() {
    let sl = 0;
    if (this.user.role.id == 19) { sl = 3; }
    if (this.user.profileUsers[0].immigration == true && this.user.profileUsers[0].relocation == true) { sl = 3; }
    if (this.user.profileUsers[0].immigration == true && this.user.profileUsers[0].relocation == false) { sl = 1; }
    if (this.user.profileUsers[0].immigration == false && this.user.profileUsers[0].relocation == true) { sl = 2; }

    console.log("ENTRA A CONSULTAR");
    this._services.service_general_get('Appointment/All/AllServicesServiceLine?sr=' + Number(this.data.sr) + '&sl=' + this.app_sl).subscribe(r => {
      console.log(r)
      if (r.success) {
        //  this.data_check = r.result.value;
        // this.addAppointment();
        console.log("(ORIGINAL) this.data_check =====================", r.result.value);
        //  this.appointment[0].services = this.data_check;
      }
    })
  }
  //******************************************************************************************************************//
  public files: NgxFileDropEntry[] = [];
  //**FUNCIONES DE CARGA DE DOCUMENTO***//
  public dropped(files: NgxFileDropEntry[], i) {
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
                "appointmentId": this.appointment[i].id
              })

              if (this.appointment[i].id != 0) {
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
  addDocument() {
    document.getElementById('documento').click();
  }
  //******************************************************************************************************************//
  deleteDocument(i, k) {
    this.appointment[i].documentAppointments.splice(k, 1);
  }
  //******************************************************************************************************************//


  public valid_to = true;
  public valida_servicios = true;
  public valid_date = true;
  public valid_stat = true;
  public valid_end = true;
  public valid_desc = true;
  public valida_servicios_e = true;

  validate_fields(i): boolean {
    //debugger;
    console.log(this.appointment);
    let _valid = true;

    if ((this.appointment[i].to == "") || (this.appointment[i].to == null)) {
      this.object_valid[i].valid_to = false;
      _valid = false;
    }
    else
      this.object_valid[i].valid_to = true;

    if (this.appointment[i].appointmentWorkOrderServices.length == 0) {
      this.object_valid[i].valida_servicios = false;
      _valid = false;
      // const dialog = this._dialog.open(DialogGeneralMessageComponent, {
      //   data: {
      //     header: "Warning",
      //     body: "You must complete the fields and select a service to be able to create the appointment"
      //   },
      //   width: "350px"
      // });
      // this.loader.hideLoader();
      // return true;
    }
    else
      this.object_valid[i].valida_servicios = true;

    if ((this.appointment[i].startTime == "") || (this.appointment[i].startTime == null)) {
      this.object_valid[i].valid_stat = false;
      _valid = false;
    }
    else
      this.object_valid[i].valid_stat = true;

    if ((this.appointment[i].endTime == "") || (this.appointment[i].endTime == null)) {
      debugger;
      this.object_valid[i].valid_end = false;
      _valid = false;
    }
    else
      this.object_valid[i].valid_end = true

    if ((this.appointment[i].description == "") || (this.appointment[i].description == null)) {
      this.object_valid[i].valid_desc = false
      _valid = false;
    }
    else
      this.object_valid[i].valid_desc = true;

    if ((this.appointment[i].date == "") || (this.appointment[i].date == null)) {
      this.object_valid[i].valid_date = false
      _valid = false;
    }
    else
      this.object_valid[i].valid_date = true;

    debugger;
    if ((this.appointment[i].startTime != "") &&
      (this.appointment[i].startTime != null) &&
      (this.appointment[i].endTime != "") &&
      (this.appointment[i].endTime != null)) {
      if (this.appointment[i].startTime >= this.appointment[i].endTime) {
        _valid = false;
        this.object_valid[i].valid_end = false;
      }
      else {
        var srtar_t = this.validate_starttime(i, this.appointment[i]);
        if (!srtar_t) {
          _valid = false;
          this.object_valid[i].valid_stat = false;
        }
      }
    }

    return _valid;
  }

  validate_fields_edit(): boolean {

    let _valid = true;

    if ((this.appointment[0].startTime == "") || (this.appointment[0].startTime == null)) {
      this.valid_stat = false;
      _valid = false;
    }
    else
      this.valid_stat = true;

    if ((this.appointment[0].endTime == "") || (this.appointment[0].endTime == null)) {
      this.valid_end = false;
      _valid = false;
    }
    else
      this.valid_end = true

      if (this.appointment[0].appointmentWorkOrderServices.length == 0) {
        this.valida_servicios_e = false;
        _valid = false;
      }
      else
        this.valida_servicios_e = true;

    if ((this.appointment[0].startTime != "") &&
      (this.appointment[0].startTime != null) &&
      (this.appointment[0].endTime != "") &&
      (this.appointment[0].endTime != null)) {
      if (this.appointment[0].startTime >= this.appointment[0].endTime) {
        _valid = false;
        this.valid_end = false;
      }
    }

    return _valid;
  }

  resetend(i) {

    this.appointment[0].endTime = null;
    this.validate_fields(i);
  }

  timeMeridian(startTime) {
    var timeStartSplit = startTime.toString().split(':'),
      hours,
      minutes,
      meridian;
    hours = timeStartSplit[0];
    minutes = timeStartSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }

    return meridian
  }

  save() {
    this.loader.showLoader();
    console.log("SAVE DATA: ", this.appointment);
    console.log("SAVE DATA: ", JSON.stringify(this.appointment));
    this._documentAppointments = [];
    this.appointment.forEach(element => {
      this._documentAppointments.push(element.documentAppointments);
    });

    let valid_form = true;

    this.appointment.forEach((element, index) => {
      debugger;
      valid_form = this.validate_fields(index);
      if (element.startTime != null) {
        this.appointment[index].startTimeMeridian = this.timeMeridian(element.startTime);
      }
      if (element.endTime != null) {
        this.appointment[index].endTimeMeridian = this.timeMeridian(element.endTime);
      }

      if (element.documentAppointments.length > 0) {
        this.appointment[index].documentAppointments = [];
        this._documentAppointments.forEach(doc => {
          this.appointment[index].documentAppointments.push({
            id: doc[0]?.id,
            fileName: doc[0]?.fileName,
            fileExtension: doc[0]?.fileExtension,
            fileRequest: doc[0]?.fileRequest,
            createdBy: doc[0]?.createdBy,
            createdDate: doc[0]?.createdDate,
            appointmentId: doc[0]?.appointmentId
          });
        });
      }
      else {
        this.appointment[index].documentAppointments = [];
      }

    });
    debugger;
    if (valid_form) {
      this._services.service_general_post_with_url("Appointment/CreateAppointment", this.appointment).subscribe((data => {
        if (data.success) {
          console.log("Respuesta CreateAppointment ====================== ", data);
          this.loader.hideLoader();
          const dialogRefA = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Data saved"
            },
            width: "350px"
          });
          dialogRefA.afterClosed().subscribe(result => {

            this.dialogRef.close();
            // debugger;
            // this._setSchoolByAddSchool.forEach(element => {
            //   this.addSchool(true, element, data.result[0].id)
            // });

          })
        }
      }), (err) => {
        console.log("Error CreateAppointment ===================", err);
        this.loader.hideLoader();
      })
    }
    else {
      this.loader.hideLoader();
    }
  }


  //******************************************************************************************************************//
  update() {
    let data_doc = [];
    if (this.validate_fields_edit()) {
      for (let i = 0; i < this.appointment.length; i++) {
        let document = this.appointment[i].documentAppointments;
        for (let j = 0; j < document.length; j++) {
          if (document[j].id == 0) {
            data_doc.push(document[j])
          }
        }
      }

      for (let i = 0; i < this.appointment.length; i++) {
        this.appointment[i].documentAppointments = data_doc;
      }
      debugger;
      this.appointment.forEach((element, index) => {
        if (element.startTime != null) {
          this.appointment[index].startTimeMeridian = this.timeMeridian(element.startTime);
        }
        if (element.endTime != null) {
          this.appointment[index].endTimeMeridian = this.timeMeridian(element.endTime);
        }
      });

      console.log("informacion a ser actualizada: ", this.appointment);
      console.log("informacion a ser actualizada: ", JSON.stringify(this.appointment));
      debugger
      this.loader.showLoader();

      this._services.service_general_post_with_url("Appointment/UpdateAppointment", this.appointment).subscribe((data => {
        if (data.success) {
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
        this.dialogRef.close();
        this.loader.hideLoader();
      }), (err) => {
        console.log(err);
        this.loader.hideLoader();
      })
    }
    else {
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Warning",
          body: "You must complete the fields and select a service to be able to create the appointment"
        },
        width: "350px"
      });
      this.loader.hideLoader();
      return true;
    }

  }


  SR_WO: any;
  consulta(element) {
    let WO = [];
    this.SR_WO = [];
    this._services.service_general_get('ServiceRecord/GetServices/' + element.serviceRecordId + '?type=1').subscribe((response: any) => {
      response.map.value.home.forEach(E => {
        WO.push(E);
      });
      response.map.value.host.forEach(E => {
        WO.push(E);
      });
      this._services.service_general_get('ServiceRecord/GetServices/' + element.serviceRecordId + '?type=2').subscribe((response: any) => {
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
    let fecha_actual_mes = new Date().getMonth() + 1;
    let fecha_actual_year = new Date().getFullYear();
    let date_appointment = new Date(split_mes_dia[0], split_mes_dia[1] - 1, split_mes_dia[2]);

    if (Number(date_appointment.getFullYear()) == fecha_actual_year) {
      if (Number(date_appointment.getMonth() + 1) == fecha_actual_mes) {
        if (Number(date_appointment.getDate()) == fecha_actual_dia) {
          console.log("Se inicia el appointment");
          this.iniciarAppointment(appoi);
        }
        else {
          console.log("No se inicia el appointment")
          this.messageAppointment();
        }
      } else {
        console.log("No se inicia el appointment");
        this.messageAppointment();
      }
    } else {
      console.log("No se inicia el appointment");
      this.messageAppointment();
    }
  }

  async messageAppointment() {
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

  async iniciarAppointment(appoi) {
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

  _appointment_: any;

  public getAppointment() {

    this._services.service_general_get('Appointment/GetAppointmentByServiceRecordId?id=' + this.data.sr)
      .subscribe((response: any) => {
        if (response.success) {
          //debugger;
          console.log("APPOINT: ", response);
          this._appointment_ = response.result.value;
          for (let i = 0; i < this._appointment_.length; i++) {
            if (this._appointment_[i].id == this.data.appointmentId) {
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

  dia_appointment: any;
  minstart: any;
  maxstart: any;
  getDay(i, date) {
    this.selected_day = date.value;
    this.appointment[i].date = date.value;
    console.log(this.appointment[i].date);
    var dias = ["[RRule.SU]", "[RRule.MO]", "[RRule.TU]", "[RRule.WE]", "[RRule.TH]", "[RRule.FR]", "[RRule.SA]"];
    var Xmas95 = new Date(this.appointment[i].date);
    // setTimeout(() => {
    var weekday_ = Xmas95.getDay();
    this.dia_appointment = dias[weekday_];
    console.log(this.dia_appointment); // 1
    // }, 2000);
    //this.validate_fields();
    this.validar_si_hay_escuelas(i);
    this.validar_si_hay_casas(i);
  }

  ////////////////////////NUEVA FUNCIONALIDAD MARZO 2022 ///////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  caServiceLine: any[] = [];
  caService: any[] = [];
  //user                  :any   = {};
  wos: any[] = [];
  allUser: any[] = [];
  sr: number = 0;
  app_sl: number = 0;
  active_serviceLine: boolean = false;
  /////////////////// FIN NUEVAS VARIABLES

  getWorkOrders(i) {
    this.loader.showLoader();
    // if(this.user.role.id != 3){
    //   this.user.role.id = this.data.reportBy;
    // }
    this.caService = [];
    this.appointment[i].services = [];
    this.data_check = [];
    console.log("appointment============================", this.appointment)
    console.log("this.appointment[0].to", this.appointment[0].to, "this.sr", this.sr, "this.app_sl", this.app_sl)

    this._services.service_general_get('Catalogue/GetServiceByServiceLineReports?sr=' + this.sr + '&sl=' + this.app_sl + '&idUser=' + this.appointment[i].to).subscribe(r => {

      // console.log("(NUEVO) this.appointment ================================= : ", this.appointment);
      if (r.success) {
        debugger;
        this.caService = r.result.value;
        console.log("(NUEVO) this.caService ================================= : ", r.result.value);
        //this.data_check = r.result.value;
        //this.appointment[0].services = this.data_check;
        this.loader.hideLoader();
        for (var s = 0; s < r.result.value.length; s++) {
          var obj_s = { "id": r.result.value[s].service, "serviceNumber": r.result.value[s].serviceNumber };
          this.data_check.push(obj_s)
        }
        debugger;
        console.log(this.appointment[i].services);
        //this.data_check = r.result.value;
        this.appointment[i].services = this.data_check;
        console.log("(NUEVO) this.appointment2 ================================= : ", this.appointment);
        // this.getServices();
        // if (r.result.length == 0) {
        //   const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        //     data: {
        //       header: "Activity Report",
        //       body: "Make sure you have created relocation services or check if the work order is not closed."
        //     },
        //     width: "350px"
        //   });
        //   dialogRef.afterClosed().subscribe(result => {
        //   })
        // }
      }
      else {
        this.loader.hideLoader();

      }
    })

  }

  async fill_sl_by_user() {
    this.caServiceLine = await this._services.getCatalogueFrom('GetServiceLine');
    console.log('serviceline', this.caServiceLine);
    // quitar immigration
    if (this.user.role.Id == 3) {
      for (let i = 0; i < this.caServiceLine.length; i++) {
        const element = this.caServiceLine[i];

        if (this.user.profileUsers[0].immigration) {
          if (element.serviceLine == 'Relocation') {
            this.caServiceLine.splice(i, 1);

          }
        }

        if (this.user.profileUsers[0].relocation) {
          if (element.serviceLine == 'Immigration') {
            this.caServiceLine.splice(i, 1);

          }
        }
      }
    }
  };

  validate_endtime(i, item) {
    debugger;

    if (this.appointment[i].date) {

      var arrtime_start = item.startTime.split(':');
      var hora_start = Number(arrtime_start[0]);
      var min_start = Number(arrtime_start[1]);
      var arrtime_end = item.endTime.split(':');
      var hora_end = Number(arrtime_end[0]);
      var min_end = Number(arrtime_end[1]);

      if (hora_end < hora_start) {
        this.object_valid[i].valid_stat = false
      }
      else if (hora_end == hora_start) {
        if (min_end >= min_start)
          this.object_valid[i].valid_end = true
        else
          this.object_valid[i].valid_end = false

      }
      else if (hora_end > hora_start) {
        this.object_valid[i].valid_end = true
      }
    }

    return this.object_valid[i].valid_end;

  }

  validate_starttime(i, item) {
    debugger;
    let tod = new Date();
    let igual = false;

    if (this.appointment[i].date && item.startTime) {

      var arrtime_start = item.startTime.split(':');
      var hora_start = Number(arrtime_start[0]);
      var min_start = Number(arrtime_start[1]);

      if (tod.getMonth() == this.appointment[i].date.getMonth()) {
        if (tod.getDay() == this.appointment[i].date.getDay()) {
          igual = true;
        }
      }

      let sss = tod.getHours();

      if (igual) {
        if (tod.getHours() < hora_start) {
          this.object_valid[i].valid_stat = true
        }
        else if (tod.getHours() == hora_start) {
          if (tod.getMinutes() > min_start) {
            this.object_valid[i].valid_stat = false
          }
          else {
            this.object_valid[i].valid_stat = true
          }
        }
        else {
          this.object_valid[i].valid_stat = false
        }
      }
      else {
        this.object_valid[i].valid_stat = true
      }

    }

    if (item.endTime && this.object_valid[i].valid_stat && item.startTime) {
      var arrtime_end = item.endTime.split(':');
      var hora_end = Number(arrtime_end[0]);
      var min_end = Number(arrtime_end[1]);

      if (hora_end < hora_start) {
        this.object_valid[i].valid_stat = false
      }
      else if (hora_end == hora_start) {
        if (min_end >= min_start)
          this.object_valid[i].valid_stat = true
        else
          this.object_valid[i].valid_stat = false

      }
      else if (hora_end > hora_start) {
        this.object_valid[i].valid_stat = true
      }
    }


    return this.object_valid[i].valid_stat;
  };


}

