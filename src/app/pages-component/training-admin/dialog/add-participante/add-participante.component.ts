import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { FormControl } from '@angular/forms';
import { DialogGeneralMessageComponent } from 'app/pages-component/dialog/general-message/general-message.component';

@Component({
  selector: 'app-add-participante',
  templateUrl: './add-participante.component.html',
  styleUrls: ['./add-participante.component.css']
})
export class AddParticipanteComponent implements OnInit {

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public filterC : any = { name: '' };
  ngOnInit(): void {
    console.log(this.data)
    this.getContactos();
  }
  //*********************************************//
  public ca_user = [];
  getContactos(){
     this._services.service_general_get('Training/ParticipantList').subscribe(response => {
      // if(response.success){
         this.ca_user =  response.result.value;
         console.log(this.ca_user);
      // }
     })   
  }
  //*********************************************//
  public usuarios = [];
  public toppings = new FormControl();
  public data_usuarios;
  save(){
    console.log(this.data_usuarios);
    this._services.service_general_post_with_url('Training/AddParticipants?training='+this.data.id+'&groups='+this.data.groupId,this.data_usuarios).subscribe(response => {
      if(response.success){
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Users Added"
          },
          width: "350px"
        });
        this.dialogRef.close();
      }
    }) 
  }
}
