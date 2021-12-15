import { relative } from '@angular-devkit/core';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-dialog-new-chat',
  templateUrl: './dialog-new-chat.component.html',
  styleUrls: ['./dialog-new-chat.component.scss']
})
export class DialogNewChatComponent implements OnInit {

  constructor(public _services: ServiceGeneralService,
              public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  caCountry: any[] = [];
  caUsers: any[] = [];
  userData: any = {};
  filterC: any = { name: '' };
  filterU: any = { user: '' }
  sending: boolean = false;
  contact = {
    user:''
  }

  newMessageToSend = new newMesage;

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.newMessageToSend.userid = this.userData.id;
    this.newMessageToSend.userList = [];
    this.getCatalogs();
  }

  async getCatalogs(){
    this.caCountry = await this._services.getCatalogueFrom('GetCountry');
    let users = [];
    let users_aux = [];
    console.log(this.caCountry);
    for(let i = 0; i < this.caCountry.length; i++){
      users_aux = [];
      this._services.service_general_get('Chat/GetUserList/'+this.userData.id+'/'+this.caCountry[i].id).subscribe(n =>{
        if(n.success){
          users_aux = n.result.value;
          for(let j = 0; j < users_aux.length; j++){
             users.push(users_aux[j]);
          }
          console.log("ESTOS SON LOS USUARIOS FINALES: ", users);
          this.caUsers = users;
        }
      })
    }

  }

  getUsersInvite(idCountry){
    console.log("Entra a usuarios");
    this._services.service_general_get('Chat/GetUserList/'+this.userData.id+'/'+idCountry).subscribe(n =>{
      if(n.success){
        this.caUsers = n.result.value;
      }
    })
  }

  selectUser(id:number){
    this.newMessageToSend.userList.push(id);
  }

  deleteUser(i){
    this.newMessageToSend.userList.splice(i);
  }

  filesUpload(file:string){
    console.log(file)
    document.getElementById(file).click();
  }

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
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


              let ext = droppedFile.relativePath.split(".");

              this.newMessageToSend.fileExtension = ext[1];
              this.newMessageToSend.file = encoded;
              //this.newMessageToSend.message = droppedFile.relativePath;
              //this.send();
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

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  onKey($event){
    if($event.key == "Enter" || $event.keyCode == 13){
      this.send();
    }
  }

  send(){
    this.sending = true;
    this.newMessageToSend.group = this.newMessageToSend.userList.length > 1 ? true  : false;
    if(this.newMessageToSend.message== null || this.newMessageToSend.message== undefined){
      this.newMessageToSend.message = '';
    }
    debugger
    console.log(this.newMessageToSend);
    this._services.service_general_post_with_url('Chat/SentNewMessage', this.newMessageToSend).subscribe(n => {
      console.log(n);
      this.sending = false;
     // document.getElementById('close').click();
     this.dialogRef.close(n.result);
    },err=>{
      this.sending = false;
      document.getElementById('close').click();
    })
  }

  getName(item){
    for (let i = 0; i < this.caUsers.length; i++) {
      const element = this.caUsers[i];
      if(element.id == item){
        return element.user;
      }
    }
  }

}

export class newMesage  {
  userid : number;
  userList: number[];
  groupName: string;
  message: string;
  group: boolean;
  file: string = "";
  fileExtension: string = "";
};
