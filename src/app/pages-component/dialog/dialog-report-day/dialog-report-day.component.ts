import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogReportOfDayComponent } from '../dialog-report-of-day/dialog-report-of-day.component'
import { GeneralConfirmationComponent } from './../general-confirmation/general-confirmation.component';

@Component({
  selector: 'app-dialog-report-day',
  templateUrl: './dialog-report-day.component.html',
  styleUrls: ['./dialog-report-day.component.css']
})
export class DialogReportDayComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef < any > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) {}

  caServiceLine         :any[] = [];
  caService             :any[] = [];
  user                  :any   = {};
  wos                   :any[] = [];
  allUser               :any[] = [];
  userReport            :any   = {};
  sr: any;



  public __loader__: LoaderComponent = new LoaderComponent();

  ngOnInit(): void {
    console.log("Data report of the day: ", this.data);
    this.getFolderNumber( this.data.sr );
    this.user = JSON.parse(localStorage.getItem('userData'));
    console.log("DATAUSER: ", this.user)
    this.sr  = this.data.sr;

    this._services.service_general_get('User').subscribe(r =>{
      this.allUser = r.result;
    })

    if(this.data.id != 0){
      this.__loader__.showLoader();
      this._services.service_general_get('ReportDay/GetreportDayById?id='+this.data.id).subscribe(r=>{
        if(r.success){
          this.data = r.result;
          console.log('Aqui ===========>', r.result);
          for (let i = 0; i < this.allUser.length; i++) {
            const element = this.allUser[i];
            if(element.id == this.data.reportBy){
              this.userReport = element;
            }
          }
          this.getWorkOrders();
          this.getService();
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
    this.caServiceLine = await this._services.getCatalogueFrom('GetServiceLine');
    console.log('serviceline', this.caServiceLine);
    // quitar immigration
    for (let i = 0; i < this.caServiceLine.length; i++) {
      const element = this.caServiceLine[i];

      if (element.serviceLine == 'Immigration') {
        this.caServiceLine.splice(i, 1);

      }
    }
    // validar si el consultant es tipo immi no puede crear reportes de relocation
    if ((this.user.role.id == 3) && (this.user.profileUsers[0].supplierType == 3)) {
      for (let i = 0; i < this.caServiceLine.length; i++) {
        const element = this.caServiceLine[i];

        if (element.serviceLine == 'Relocation') {
          this.caServiceLine.splice(i, 1);

        }
      }
    }


  }

  getWorkOrders(){
    this._services.service_general_get('Catalogue/GetWorkOrderByServiceLine?sr='+this.sr+'&sl='+this.data.serviceLine).subscribe(r=>{
      if(r.success){
        console.log("estas son las WO: ", r.result);
        this.wos = r.result;
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

   getService() {
    console.log("Entra a consultaar servicos de work order");
    this._services.service_general_get('Catalogue/GetServiceByWorkOrder?wo='+this.data.workOrder).subscribe(r => {
      if(r.success){
        this.caService = r.result.value;
        console.log('servicios', this.caService);
      }
    })
  }

  addReport() {
    this.data.serviceReportDays.push(
      {
        id            : 0,
        reportDayId   : this.data.id,
        service       : 0,
        time          : null,
        // comments      : "",
        createdBy     : this.user.id,
        createdDate   : new Date(),
        updateBy      : this.user.id,
        updatedDate   : new Date()
      }
    )
    this.getService();
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
  // active_serviceTime :boolean = false;


  validarCampos() {
    if(this.data.reportDate == undefined){
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
    // checamos si hay mas de un servicio agregado
    if (this.data.serviceReportDays.length == 0) {
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Service",
          body: "Required service"
        },
        width: "350px"
      });
      this.active_service = true;
    }


    if (this.data.reportDate != undefined && this.data.serviceLine != undefined && this.data.workOrder && (this.data.startTime != undefined && this.data.startTime != null) && (this.data.endTime != undefined && this.data.endTime != null) && (this.data.serviceReportDays.length != 0)) {
      // validar horas
      let horasServicio: number = 0;
      console.log('total hour', this.data.totalTime);

      for (let t = 0; t < this.data.serviceReportDays.length; t++) {
        const horas = this.data.serviceReportDays[t];
        horasServicio = horasServicio + horas.time;
      }
      console.log('Total de horas', horasServicio)
      if (horasServicio > this.data.totalTime) {
        // si es mayor las horas de servicio al total de horas no se podra guardar y manda alerta
        this.validHour = false;
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Warning",
            body: `The Time of the service exceeds the Total Time.`
          },
          width: "350px"
        });
      }
      else {
        // si no es mayor  que se guarde el activity report
        this.validHour = true;
        this.save();
      }
    }
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
      debugger
      if (this.data.id == 0) {
        this._services.service_general_post_with_url("ReportDay/PostReportDay", this.data).subscribe((data => {
          if (data.success) {
            console.log(data);
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Save Data"
              },
              width: "350px"
            });

            const dialog_ = this._dialog.open(DialogReportOfDayComponent, {
              data: data.result,
              width: "40%"
            });

            this.__loader__.hideLoader();
            this.dialogRef.close();
            this.ngOnInit();

          }
        }))
      } else {
        debugger
        this._services.service_general_put("ReportDay/PutReportDay", this.data).subscribe((data => {
          if (data.success) {
            console.log(data);
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Data Updated"
              },
              width: "350px"
            });
            const dialog_ = this._dialog.open(DialogReportOfDayComponent, {
              data: data.result,
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
  public getHoursDifference():void {

    const create_date_one:Date = new Date(),
      create_date_two:Date = new Date();

    if( this.data.startTime != undefined && this.data.endTime != undefined ) {

      create_date_one.setHours(this.data.startTime.split(':')[0], this.data.startTime.split(':')[1]);
      create_date_two.setHours(this.data.endTime.split(':')[0], this.data.endTime.split(':')[1]);

      let get_difference:any = ( create_date_two.getTime() - create_date_one.getTime() ) / 1000;

      get_difference /= (60 * 60);

      this.get_total_hours = Math.abs( Math.round( get_difference ) );
      this.data.totalTime = this.get_total_hours;

    }

  }

}
