import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogEvaluateComponent } from '../dialog-evaluate/dialog-evaluate.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogCompletionReportImmigrationComponent } from './../dialog-completion-report-immigration/dialog-completion-report-immigration.component';
import { DialogCompletionReportRelocationComponent } from './../dialog-completion-report-relocation/dialog-completion-report-relocation.component';
import { LoaderComponent } from './../../../shared/loader';
import { NgxPermissionsService } from 'ngx-permissions';




@Component({
  selector: 'app-dialog-complete',
  templateUrl: './dialog-complete.component.html',
  styleUrls: ['./dialog-complete.component.css']
})
export class DialogCompleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef < any > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog,
    private _permissions: NgxPermissionsService
    ) { }
    public __loader__: LoaderComponent = new LoaderComponent();
    public __userlog__: any = JSON.parse(localStorage.getItem('userData'));


    today = new Date();
    public dataCompleteReport;
  ngOnInit(): void {
    this.__loader__.showLoader();
    console.log("MODAL COMPLETE: ", this.data);
    this.compleateReport();
    const user_rol: string[] = [this.__userlog__.role.id];
    console.log("userData ", this.__userlog__);
    this._permissions.loadPermissions(user_rol);
    this.consultaPermisos();
  }
  public permission_read: boolean = false;
  public permission_write: boolean = false;
  public permission_delete: boolean = false;
  public permission_edit: boolean = false;
  consultaPermisos() {
    console.log("CONSULTA PARA PERMISOS DE USUARIO");
    let url = localStorage.getItem('url_permisos');
    this._services.service_general_get('Role/' + url).subscribe(data => {
      if (data.success) {
        console.log("Permisos: ", data.result.value)
        this.permission_read = data.result.value[0].reading;
        this.permission_write = data.result.value[0].writing;
        this.permission_edit = data.result.value[0].editing;
        this.permission_delete = data.result.value[0].deleting;
      }
    })
  }
  compleateReport() {
    // ServiceRecord/See/CompleteReport?sr=432
    this._services.service_general_get(`ServiceRecord/See/CompleteReport?sr=${this.data.id}`).subscribe(resp => {
      if (resp.success) {
        this.dataCompleteReport = resp.result.value;
        console.log('complete report', this.dataCompleteReport);
      }
    });
    this.__loader__.hideLoader();

  }

  evaluate(sl){
    const dialogRef = this._dialog.open(DialogEvaluateComponent, {
      data: {sl : sl, sr: this.data.id},
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

  complete(sl){
    this._services.service_general_put(`ServiceRecord/CompleteServiceRecord?sr=${this.data.sr}&serviceLine=${sl}`,'').subscribe(r => {
      let h;
      if(r.success){
        h = "Success";
      }else{
        h = "Error";
      }
      this.dialogRef.close();

      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: h,
          body:   r.message
        },
        width: "350px"
      })


      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();

        //console.log('The dialog was closed');
      });
    },error=>{
      console.log(error.error.message);
      this.dialogRef.close();
      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Error",
          body:   error.error.message
        },
        width: "350px"
      })
    })
  }
  generateCRImmi() {
    const dialogRef = this._dialog.open(DialogCompletionReportImmigrationComponent, {
      data: {
        sr: this.data.id,
        serviceLice: 1,
        // user_id: this.USERDATA.id,
        // status: this.edit_sr_model
      }, width: "90%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();

    })
  }
  generateCRRelo() {
    const dialogRef = this._dialog.open(DialogCompletionReportRelocationComponent, {
      data: {
        sr: this.data.id,
        serviceLice: 2,
        // user_id: this.USERDATA.id,
        // status: this.edit_sr_model
      }, width: "90%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();

    })
  }
}
