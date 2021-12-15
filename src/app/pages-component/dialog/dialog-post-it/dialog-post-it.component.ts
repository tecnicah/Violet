import { Component, OnInit } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from './../general-message/general-message.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-post-it',
  templateUrl: './dialog-post-it.component.html',
  styleUrls: ['./dialog-post-it.component.css']
})
export class DialogPostItComponent implements OnInit {
  user: any;
  stick: any[] = [];
  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog,) { }
  public __loader__: LoaderComponent = new LoaderComponent();

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this._services.service_general_get(`PostIt/All/${this.user.id}`).subscribe(resp => {
      // console.log('stick', resp);
      if (resp.success) {
        this.stick = resp.result;
        this.stick.forEach( function( nota ){
          let check = false;
          nota.check = check;
        });

        console.log('stick', this.stick);
      }
    });
  }
  addNote() {
    this.stick.push({
      id: 0, post: '', color: '', createdBy: this.user.id,
      createdDate: new Date, updatedBy: this.user.id, updatedDate: new Date
    });
  };
  // detecta ue el usiuatio hizo click en textarea
  palomaDeUpdate(data) {
    // console.log('data que recibe', data);
    data.check = true;
  }
  deleteNote(data) {
    console.log('delete', data);
    if (data.id == 0) {
      this.stick.splice(data);
      this.ngOnInit();
    } else {
      this._services.service_general_delete(`PostIt?key=${data.id}`).subscribe(resp => {
        if (resp.success) {
          console.log('borrar stick', resp);
          this.ngOnInit();
        }
      });
    }
  }
  updateStick(data) {
    if (data.id == 0) {
      if (data.post == '') {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "warning",
            body: "Write a note"
          },
          width: "350px"
        });
      }
      else {
        this.__loader__.showLoader();
        this._services.service_general_post_with_url("PostIt", {
          id: 0,
          post: data.post,
          color: '',
          createdBy: this.user.id,
          createdDate: new Date(),
          updatedBy: this.user.id,
          updatedDate: new Date()
        }).subscribe(r => {
          console.log(r);
          if (r.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Insert sticky note"
              },
              width: "350px"
            });
            // this.ngOnInit();
          }
          this.__loader__.hideLoader();
        })
      }
    }
    else {
      console.log('update', data);
      data.updatedBy = this.user.id;
      data.updatedDate = new Date();
      this._services.service_general_put('PostIt', data).subscribe(resp => {
        if (resp.success) {
          console.log('actualizado stick', resp);
          // this.ngOnInit();
          this.stick.forEach(function (nota) {
            if (nota.id == data.id) {

              let check = false;
              nota.check = check;
            }
          });

          console.log('stick', this.stick);
        }
      });
    }
  }

}
