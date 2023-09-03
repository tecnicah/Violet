import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from '../../general-message/general-message.component';

@Component({
  selector: 'app-sen-request',
  templateUrl: './sen-request.component.html',
  styleUrls: ['./sen-request.component.css']
})
export class SenRequestComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();
  fecha: Date = new Date();
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog,
    private change: ChangeDetectorRef) { }
  email: string = ''
  cotizacion: string = ''
  comment: string = ''
  ngOnInit(): void {
    console.log("DATA RECIBIDA:", this.data)
  }
  public nso_ainfo_fields: any = {
    no_email: false,
    no_email_val: false,
    no_cotizacion: false,
    no_cotizacion_val: false,
    no_comment: false
  }
  public validEmailFinance(email: string): void {
    if (email != '') {
      !this.validateEmail(email) ? this.nso_ainfo_fields.no_email_val = true : this.nso_ainfo_fields.no_email_val = false;
      if (this.nso_ainfo_fields.no_email_val) {
        this.nso_ainfo_fields.no_email = false
        this.change.markForCheck()
        this.change.detectChanges()
      }
    } else {
      this.nso_ainfo_fields.no_email = true
      this.nso_ainfo_fields.no_email_val = false
      this.change.markForCheck()
      this.change.detectChanges()
    }
  }
  public validEmailCoti(email: string): void {
    if (email != '') {
      !this.validateEmail(email) ? this.nso_ainfo_fields.no_cotizacion_val = true : this.nso_ainfo_fields.no_cotizacion_val = false;
      if (this.nso_ainfo_fields.no_cotizacion_val) {
        this.nso_ainfo_fields.no_cotizacion = false
        this.change.markForCheck()
        this.change.detectChanges()
      }
    } else {
      this.nso_ainfo_fields.no_cotizacion = true
      this.nso_ainfo_fields.no_cotizacion_val = false
      this.change.markForCheck()
      this.change.detectChanges()
    }
  }

  public emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  public validateEmail(email_in: string): boolean {
    let result: boolean = true;
    const validating_email = this.emailPattern.test(email_in);
    if (!validating_email) result = false;
    return result;
  }
  valida_form() {
    const valid = ['email', 'cotizacion', 'comment'];

    for (const property of valid) {
      const valor = this[property];
      if (valor === '') {
        this.nso_ainfo_fields['no_' + property] = true;
      } else {
        this.nso_ainfo_fields['no_' + property] = false;
      }
    }
    if (this.email != '' && this.cotizacion != '' && this.comment != '') {
      if (!this.nso_ainfo_fields.no_email_val && !this.nso_ainfo_fields.no_cotizacion_val) {
        this.__loader__.showLoader()
        console.log('puedes continuar');
        const fechaFormateada = this.fecha.toISOString();
        const post = {
          id: 0,
          sentTo: this.email,
          sentsTo: [],
          comment: this.comment,
          emailReturn: this.cotizacion,
          proveedorId: this.data.supplier,
          date: fechaFormateada
        }
        console.log(post);
        this._services.service_general_post_with_url('RequestInformation/PostSendRequestService', post).subscribe(ele => {
          this.email = ''
          this.comment = ''
          this.cotizacion = ''
          this.__loader__.hideLoader()
          this.viewMensajeComponente('sended', 'email sent successfully')
          this.dialogRef.close();

        })

      }
    }

  }
  viewMensajeComponente(header: string, msg: string) {
    window.scrollTo(0, 0);
    const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
      data: {
        header: header,
        body: msg
      },
      width: "350px"
    });
  }
}
