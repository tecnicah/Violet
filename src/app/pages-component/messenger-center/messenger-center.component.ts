import { relative } from '@angular-devkit/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullComponent } from 'app/layouts/full/full.component';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DialogNewChatComponent } from '../dialog/dialog-new-chat/dialog-new-chat.component';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';
import { GeneralConfirmationComponent } from '../dialog/general-confirmation/general-confirmation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messenger-center',
  templateUrl: './messenger-center.component.html',
  styleUrls: ['./messenger-center.component.scss']
})
export class MessengerCenterComponent implements OnInit {

  constructor(public _services: ServiceGeneralService,
    public dialog: MatDialog, public router: Router,
    public fullComponent: FullComponent) { }
  userData: any = {};
  displayedColumns: string[] = ['user'];
  table_contacts: any = [];
  conversationId: number = 0;
  chat: any[] = [];
  temporalDocument: any[] = [];
  actual_user: any = {};
  continuemesage: any = {};
  sending: boolean = false;
  contact = {
    name: ''
  }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.conversationId = Number(localStorage.getItem('conversationId'));
    console.log(this.conversationId, "con");

    this._services.retrieveMappedObject().subscribe((receivedObj: any) => {
      console.log(receivedObj);
      this.getResient();
      if (this.conversationId != 0) {
        this.getConversation(this.conversationId, 0);
      }
    });
    this.getResient();
    if (this.conversationId != 0) {
      this.getConversation(this.conversationId, 0);
    }
  }

  ngOnDestroy() {
    console.log("remove id");
    localStorage.removeItem('conversationId');
  }

  getResient() {
    this._services.service_general_get('Chat/SeeChats?user=' + this.userData.id).subscribe(n => {
      if (n.success) {
        this.table_contacts = n.result.value;
        console.log(this.table_contacts);
        if (this.conversationId != 0) {
          for (let i = 0; i < this.table_contacts.length; i++) {
            const element = this.table_contacts[i];
            if (element.conversationId == this.conversationId) {
              this.actual_user = element;
              console.log(this.actual_user);
            }
          }
        }
      }
    })
  }

  getConversation(id, element) {
    this.conversationId = id;
    this._services.service_general_get('Chat/GetConversation/' + id + '/' + this.userData.id).subscribe(n => {
      if (n.success) {
        this.fullComponent.ngAfterViewInit();
        this.chat = n.result.value;
        let chats = n.result.value;
        let new_array = chats.splice(chats.length - element);
        console.log("MENSAJES NO LEIDOS: ", new_array)
        
        for (let j = 0; j < new_array.length; j++) {
        this._services.service_general_put("Chat/Check/"+new_array[j].id+"/"+this.userData.id,'').subscribe((data => {
          if (data.success) {
            console.log("MENSAJE MARCADO COMO LEIDO: ", data);
          }
          }))
        }
        this.getResient();
        

        console.log(this.chat);
        setTimeout(() => {
          var objDiv = document.getElementById("texting");
          objDiv.scrollTop = objDiv.scrollHeight;
          console.log(objDiv);
        }, 1000);
        
      }
    })
  }

  newMessage() {
    const dialogRef = this.dialog.open(DialogNewChatComponent, {
      data: {},
      width: "60%"
    });

    dialogRef.afterClosed().subscribe((so_added: any) => {
      console.log(so_added);
      this.getConversation(so_added[0].id, 0);
      this.getResient();
    });
  }

  filesUpload(file: string) {
    console.log(file)
    document.getElementById(file).click();
  }

  onKey($event) {
    if ($event.key == "Enter" || $event.keyCode == 13) {
      this.sendMessage();
    }
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
              this.temporalDocument.push({
                "id": 0,
                "message": this.conversationId,
                "filePath": encoded,
                "fileExtension": ext[1],
                "date": new Date(),
                "status": true
              })
              //this.continuemesage.message = droppedFile.relativePath;
              //this.sendMessage();
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

  pat(src_path) {
    let result: string = '';

    const kind_of_file: string = src_path.split('.')[1];

    switch (kind_of_file) {

      case 'gif':
      case 'jpg':
      case 'png':
      case 'svg':
      case 'jpeg':
        result = this._services.url_images + src_path;
        break;

      default:
        result = 'https://cdn.onlinewebfonts.com/svg/img_560325.png';
        break;

    }

    return result;

  }


  sendMessage() {
    this.sending = true;
    this.continuemesage = {
      "id": 0,
      "conversation": this.conversationId,
      "userId": this.userData.id,
      "message1": this.continuemesage.message,
      "time": new Date(),
      "status": false,
      "documentMessages": this.temporalDocument
    }
    if (this.continuemesage.message1 == null || this.continuemesage.message1 == undefined) {
      this.continuemesage.message1 = '';
    }
    console.log(this.continuemesage);

    this._services.service_general_post_with_url('Chat/SentMessage', this.continuemesage).subscribe(n => {
      console.log(n);
      this.temporalDocument = [];
      this.continuemesage = {
        "id": 0,
        "conversation": 0,
        "userId": this.userData.id,
        "message1": "",
        "time": "",
        "status": true,
      }
      this.sending = false;
    })
  }

  deleteConversation(data) {
    console.log("data a eliminar: ", data);
    const dialogRef = this.dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete Conversation?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete('Chat/DeleteConversation/' + data.conversationId).subscribe(n => {
          if (n.success) {
            const dialog = this.dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Conversation was deleted"
              },
              width: "350px"
            });
            this.ngOnInit();
          }
        })
      }
    })
  }

  deleteMenssage(data) {
    console.log("data a eliminar: ", data);
    const dialogRef = this.dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete Message?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete('Chat/DeleteMessage/' + data.id).subscribe(n => {
          if (n.success) {
            const dialog = this.dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Message was deleted"
              },
              width: "350px"
            });
            this.getConversation(data.conversationId, 0);
          }
        })
      }
    })
  }


  openProfile(actual_user){
    console.log(actual_user);
    if(actual_user.profile.role != 'Coordinator' && actual_user.profile.role != 'Manager'){
      this.router.navigateByUrl('/profileconsultant/'+actual_user.profile.id);
   }

   if(actual_user.profile.role == 'Coordinator'){
     this.router.navigateByUrl('/profilecoordinator/'+actual_user.profile.id);
   }

   if(actual_user.profile.role == 'Manager' || actual_user.profile.role == 'Super Admin'){
     this.router.navigateByUrl('/profilemanager/'+actual_user.profile.id);
   }
  }

}
