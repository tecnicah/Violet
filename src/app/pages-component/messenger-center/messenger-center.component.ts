import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullComponent } from 'app/layouts/full/full.component';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DialogNewChatComponent } from '../dialog/dialog-new-chat/dialog-new-chat.component';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';
import { GeneralConfirmationComponent } from '../dialog/general-confirmation/general-confirmation.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-messenger-center',
  templateUrl: './messenger-center.component.html',
  styleUrls: ['./messenger-center.component.scss']
})
export class MessengerCenterComponent implements OnInit {

    ////Media querys
  
    _noConversation = "";
    _innerHeight = "";
    _chat = "";
    _comment = "";
    _header = "";
    _headerName = "";

  constructor(public _services: ServiceGeneralService,
    public dialog: MatDialog, public router: Router,
    public fullComponent: FullComponent,
    private _ngZone: NgZone,
    public rutaActiva: ActivatedRoute) {
      this.suscribirEventos();
    }
     
  userData: any = {};
  displayedColumns: string[] = ['user'];
  table_contacts: any = [];
  conversationId: number = 0;
  chat: any[] = [];
  temporalDocument: any[] = [];
  actual_user: any = {};
  continuemesage: any = {};
  sending: boolean = false;
  scrollInicial: number = 0;
  isScrollable: boolean = false;
  contact = {
    name: ''
  }

  ngOnInit(): void {
  
    this.userData = JSON.parse(localStorage.getItem('userData'));

    //this.getResient();
    if(this.rutaActiva.snapshot.params.id == 0)
    {
      this.getResient();
    }
    else{
      this.getConversation(this.rutaActiva.snapshot.params.id, 0);
      this._services.service_general_get("Chat/SeeChatsById?user="+this.userData.id+"&conversationId="+ this.rutaActiva.snapshot.params.id)
      .subscribe((data => {
        console.log("AVATAR: ", data);
          if (data.success) {
            console.log("AVATAR: ", data);
            this.header = data.result.value[0];

          }
        }))
    }
    
    this._innerHeight  = window.innerHeight - 190 + "px";
    this._header = (window.innerHeight - (window.innerHeight - 56))  + "px";
    this._headerName = (window.innerHeight - (window.innerHeight - 116))  + "px";
    this._chat = window.innerHeight - 204 + "px";
    this._comment = (window.innerHeight - (window.innerHeight - 60))  + "px";
    this._noConversation = window.innerHeight - 75 + "px";

    window.addEventListener("resize", () => {
      document.getElementById('divUsers').style.height = window.innerHeight - 190 + "px";
      document.getElementById('divHeaderName').style.height = (window.innerHeight - (window.innerHeight - 116))  + "px";
      if(document.getElementById('divHeader') != null){
        document.getElementById('divChat').style.height = window.innerHeight - 204 + "px";
        if(this.temporalDocument.length > 0){
          document.getElementById('divHeader').style.height = (window.innerHeight - (window.innerHeight -26)) + "px"; 
          document.getElementById('divComments').style.height = (window.innerHeight - (window.innerHeight - 90)) + "px";  
        }
        else
        {
          document.getElementById('divHeader').style.height = (window.innerHeight - (window.innerHeight - 56))  + "px";
          document.getElementById('divComments').style.height = (window.innerHeight - (window.innerHeight - 60))  + "px";
        }
       
      }
      else{
        document.getElementById('divNoConversation').style.height = window.innerHeight - 75 + "px";
      }
      
    });
    
    //this.getResient();
    // if (this.conversationId != 0) {
    //     this.getConversation(this.conversationId, 0);
    //   }
  }

  private suscribirEventos() {
    this._services.avisoAdmin.subscribe(data => {
      this._ngZone.run(() => {
        this.getConversation(this.conversationId, 0);
      });
    });
  }

  ngOnDestroy() {
    console.log("remove id");
    localStorage.removeItem('conversationId');
  }

  onScroll(event: any) {

    if (event.target.scrollTop == 0 && !this.isScrollable) {
      this._services.service_general_get('Chat/GetConversationComplete/' + this.conversationId + '/' + this.userData.id).subscribe(n => {
        if (n.success) {
          console.log("scrollHeightInicial", this._chat);
          console.log("scrollHeight", event.target.scrollHeight);
          
          this.chat = n.result.value;
          setTimeout(() => {
            var objDiv = document.getElementById("divChat");
            objDiv.scrollTop = objDiv.scrollHeight - this.scrollInicial;
            this.isScrollable = true;
          }, 100);
        }
      });
    }
  }

  getResient() {
    this._services.service_general_get('Chat/SeeChats?user=' + this.userData.id).subscribe(n => {
      if (n.success) {
        this.table_contacts = n.result.value;
        console.log("table_contacts", this.table_contacts);
      //   if (this.conversationId != 0) {
      //     for (let i = 0; i < this.table_contacts.length; i++) {
      //       const element = this.table_contacts[i];
      //       if (element.conversationId == this.conversationId) {
      //         this.actual_user = element;
      //         console.log(this.actual_user);
      //       }
      //     }
      //   }
       }
    })
  }

  header: any;
  getAvatar(element){
    console.log(element);
    this.header = element;
  }

  getConversation(id, element, user?) {
    this.conversationId = id;
    this._services.service_general_get('Chat/GetConversation/' + id + '/' + this.userData.id).subscribe(n => {
      if (n.success) {        
        this.chat = n.result.value;
        this.getResient();
        let chats = n.result.value.filter(x => x.unreadMessages == 0 && x.userId != this.userData.id);
        //let new_array = chats.splice(chats.length - element);
        console.log("MENSAJES NO LEIDOS: ", chats)
        
        let _user = user == null || undefined ? 0 : user;
        for (let j = 0; j < chats.length; j++) {
          //1760/1752?conversationId=119&userReciver=279
          this._services.service_general_put("Chat/Check/"+chats[j].id+"/"+this.userData.id +"?conversationId=" + id + "&userReciver="+ _user,'')
          .subscribe((data => {
            if (data.success) {
              console.log("MENSAJE MARCADO COMO LEIDO: ", data);
            }
            }));
        }

        setTimeout(() => {
          var objDiv = document.getElementById("divChat");
          objDiv.scrollTop = objDiv.scrollHeight;
          this.scrollInicial = objDiv.scrollHeight;
        }, 200);
        
        
        //this.fullComponent.ngAfterViewInit();
        //this.getResient();
        
      }
    })
  }

  newMessage() {
    const dialogRef = this.dialog.open(DialogNewChatComponent, {
      data: {},
      width: "20%",
      height: "80%"
    });

    dialogRef.afterClosed().subscribe((so_added: any) => {
      debugger;
      console.log(so_added);
      this._services.service_general_get("Chat/SeeChatsById?user="+this.userData.id+"&conversationId="+ so_added[0].id)
      .subscribe((data => {
        console.log("AVATAR: ", data);
          if (data.success) {
            console.log("AVATAR: ", data);
            this.header = data.result.value[0];

          }
        }))
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
                "name": droppedFile.relativePath,
                "message": this.conversationId,
                "filePath": encoded,
                "fileExtension": ext[1],
                "date": new Date(),
                "status": true
              });
              if(this.temporalDocument.length > 0){
                document.getElementById('divHeader').style.height = (window.innerHeight - (window.innerHeight - 26)) + "px"; 
                document.getElementById('divComments').style.height = (window.innerHeight - (window.innerHeight - 90)) + "px";  
              }
              
              console.log("Envio archivo");
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
    
    if(this.temporalDocument.length > 0){
      this.sending = true;
      console.log(this.temporalDocument);
      this.continuemesage = {
        "id": 0,
        "conversation": this.conversationId,
        "userId": this.userData.id,
        "message1": (this.continuemesage.message == null || this.continuemesage.message == undefined 
          ? '' 
          : this.continuemesage.message) == '' ? this.temporalDocument[0].name : this.continuemesage.message,
        "time": new Date(),
        "status": false,
        "documentMessages": this.temporalDocument
      }
    }
    else
    {
      this.continuemesage = {
        "id": 0,
        "conversation": this.conversationId,
        "userId": this.userData.id,
        "message1": this.continuemesage.message == null || this.continuemesage.message == undefined ? '' : this.continuemesage.message,
        "time": new Date(),
        "status": false,
        "documentMessages": this.temporalDocument
      }
    }
   
    // if (this.continuemesage.message1 == null || this.continuemesage.message1 == undefined) {
    //   this.continuemesage.message1 = '';
    // }
    console.log(this.continuemesage);

    this._services.service_general_post_with_url('Chat/SentMessage', this.continuemesage)
    .subscribe(n => {
      console.log(n);
      
      this.continuemesage = {
        "id": 0,
        "conversation": 0,
        "userId": this.userData.id,
        "message1": "",
        "time": "",
        "status": true,
      }
      if(this.temporalDocument.length > 0){
        this.sending = false;
        this.temporalDocument = [];
        document.getElementById('divHeader').style.height = (window.innerHeight - (window.innerHeight - 56))  + "px";
        document.getElementById('divComments').style.height = (window.innerHeight - (window.innerHeight - 60))  + "px";
      }
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
