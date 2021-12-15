import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogGeneralMessageComponent } from './../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-change-password',
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['./dialog-change-password.component.css']
})
export class DialogChangePasswordComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogChangePasswordComponent>) { }

  active_password: boolean = false;;
  active_password2: boolean = false;;
  password2;
  regex = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
  hintMessen;
  hintMessen2;
  hintId =  document.getElementById('hintpass');
  hintId2 = document.getElementById('hintpass2');
  passCorrect: boolean = false;

  ngOnInit(): void {
  }
  validarPass() {
    if(this.data.password == undefined && this.data.password != ''){
      this.hintMessen = "Field is required";
      this.hintMessen2 = "Field is required";
      this.active_password = true;
    }if(this.password2 == undefined && this.password2 != ''){
      this.hintMessen = "Field is required";
      this.hintMessen2 = "Field is required";
      this.active_password2 = true;
    }
    if (this.data.password != '' && this.password2 != '') {
      //si las contraseñas no coinciden
      if (this.data.password != this.password2) {
        // const mensaje = '<p class="error"><strong>Error: </strong>¡Do not match password!</p>';
        // console.log('error las contraseñas no coinciden');
        // const resp = document.getElementById('resultado');
        // resp.innerHTML = mensaje;
        this.active_password = true;
        this.active_password2 = true;
        this.hintMessen = "Do not match password";
        this.hintMessen2 = "Do not match password";
      }
      else if (this.data.password == this.password2) {
        //Si todo esta correcto
        if (this.regex.test(this.data.password)) {
          this.active_password = false;
          this.active_password2 = false;
          console.log('correcto las contraseñas coinciden');
          // this.hintMessen = "Valid password";
          // this.hintMessen2 = "Valid password";
          this.passCorrect = true;

        }
        // si no es correcto
        else {
          this.active_password = true;
          this.active_password2 = true;
          this.hintMessen = "Invalid password";
          this.hintMessen2 = "Invalid password";
          // letras mayusculas
          let patronMayus = /[A-Z]/g;
          let letterUpercaseSearch = (this.data.password.match(patronMayus));
          if (letterUpercaseSearch == null) {
            console.log('no hay letras mayus');
            this.hintMessen = "Missing capital letter";
            this.hintMessen2 = "Missing capital letter";
          }
          else {
            console.log('si hay mayusculas');
            console.log(this.data.password.match(patronMayus));
          }
          // buscar numeros
          let patronnumber = /[1-9]/g;
          let numberSearch = (this.data.password.match(patronnumber));
          if (numberSearch == null) {
            console.log('no hay numeros');
            this.hintMessen = "Missing number";
            this.hintMessen2 = "Missing number";
          }
          else {
            console.log('si hay numeros');
            console.log(this.data.password.match(patronnumber));
          }
          // mayor a 8 caracteres
          if (this.data.password.length < 8) {
            this.hintMessen = "8 characters minimum";
            this.hintMessen2 = "8 characters minimum";
          }
        }
      }
    }
    else {
      // const mensajeemp = '<p class="error"><strong>Error: </strong>¡Empty password!</p>';
      // const respemp = document.getElementById('resultado');
      // respemp.innerHTML = mensajeemp;
      this.active_password = true;
      this.active_password2 = true;
      this.hintMessen = "Empty password";
      this.hintMessen2 = "Empty password";
    }
  }
  validarForm() {
    if (this.passCorrect == true) {
      this.save();
    }
    else {
      this.active_password = true;
      this.active_password2 = true;
      // const mensajeemp = '<p class="error"><strong>Error: </strong>¡Invalid password!</p>';
      // const respemp = document.getElementById('resultado');
      // respemp.innerHTML = mensajeemp;
      this.hintMessen = "Invalid password";
      this.hintMessen2 = "Invalid password";
    }
  }


  save() {
    this.__loader__.showLoader();
    // User/Change_password
    // User/Change_password?email=AS%40AS.COM&password=Admin123
    this._services.service_general_put('User/Change_password?email=' + this.data.email + '&password=' + this.data.password, '').subscribe(r => {
      if (r.success) {
        console.log('respuesta de update', r);
        this.__loader__.hideLoader();
        this.dialogRef.close(1);
      }
      else {
        this.__loader__.hideLoader();
        this.dialogRef.close(2);
       }
    })
  }

}
