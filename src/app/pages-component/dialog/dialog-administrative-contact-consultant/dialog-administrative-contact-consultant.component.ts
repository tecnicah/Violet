import { Component, OnInit, Inject } from '@angular/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { DialogDocumentProfileSupplierComponent } from '../dialog-document-profile-supplier/dialog-document-profile-supplier.component';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-administrative-contact-consultant',
  templateUrl: './dialog-administrative-contact-consultant.component.html',
  styleUrls: ['./dialog-administrative-contact-consultant.component.css']
})
export class DialogAdministrativeContactConsultantComponent implements OnInit {

  ca_contactType:any[]=[];
  ca_city: any[] =[];
  ca_privacy:any[]=[];
  ca_documentType:any[]=[];
  administrativeContactsConsultants:any = {
    "documentAdministrativeContactsConsultants":[],
  };
  user: any;
  date:any;
  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog,public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  validaNumericos(event){
    console.log("valid");
    if(event.key == '0' || event.key == '1' || event.key == '2' || event.key == '3' || event.key == '4' || 
       event.key == '5' || event.key == '6' || event.key == '7' || event.key == '8' || event.key == '9' ||
       event.key == 'Backspace' ){
       return true;
    }
  
     return false;
  }
  
  //*********************************************//
	public permission_read : boolean = false;
	public permission_write : boolean = false;
	public permission_delete : boolean = false;
	public permission_edit : boolean = false;
	consultaPermisos(){
		console.log("CONSULTA PARA PERMISOS DE USUARIO");
		let url = localStorage.getItem('url_permisos');
		this._services.service_general_get('Role/'+url).subscribe(data=>{
			if(data.success){
			   console.log("Permisos: ", data.result.value)
			   this.permission_read = data.result.value[0].reading;
			   this.permission_write = data.result.value[0].writing;
			   this.permission_edit = data.result.value[0].editing;
			   this.permission_delete = data.result.value[0].deleting;
			}
		})
  }
  //*********************************************//
  ngOnInit(){
    this.consultaPermisos();
    console.log("data recibida: ", this.data);
    if(this.data != null){
      this.administrativeContactsConsultants = this.data;
      if(!this.administrativeContactsConsultants.documentAdministrativeContactsConsultants){
        this.administrativeContactsConsultants.photo = '';
        this.administrativeContactsConsultants.id = 0;
        this.administrativeContactsConsultants.documentAdministrativeContactsConsultants = [];
      }
    }

    this._services.service_general_get('Catalogue/GetState?country='+this.data.country).subscribe((data => {
      if (data.success) {
        this.ca_city = data.result;
      }
    })) 
    this.catalogos();
    this.date = new Date();
    this.user = JSON.parse(localStorage.getItem('userData'));
  }
  //***********************************//
  async catalogos(){
    //this.ca_documentType  = await this._services.getCatalogueFrom('GetDocumentType');
    this._services.service_general_get('Catalogue/GetDocumentType/3').subscribe((data => {
      if (data.success) {
        this.ca_documentType = data.result; 
        console.log(this.ca_documentType);
      }
    })) 
    this.ca_contactType   = await this._services.getCatalogueFrom('GetContactType');
    this.ca_privacy  = await this._services.getCatalogueFrom('GetPrivacy');
  }
  //***********************************//
  addDocument(){
    if(this.administrativeContactsConsultants.city ==null ||
      this.administrativeContactsConsultants.city == undefined ||
      this.administrativeContactsConsultants.city == ''
     ){

      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Warning",
          body: "To add documents it is necessary to fill the city"
        },
        width: "350px"
      });
  
      dialogRef.afterClosed().subscribe(result => {
      
      })

      return;

  }
    const dialogRef = this._dialog.open(DialogDocumentProfileSupplierComponent, {
      width: "90%",
      data: {
        country: this.administrativeContactsConsultants.country,
        city: this.administrativeContactsConsultants.city
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.success){
        this.activeDocumentos = false;
        this.administrativeContactsConsultants.documentAdministrativeContactsConsultants.push(result);
      }
    });
  }
  //*************************************************************//
  editPhoto(){
    document.getElementById('photoCont').click();
  }
  //*************************************************************//
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


              let ext = file.type.split("/");

              this.administrativeContactsConsultants.photo = encoded;
              this.administrativeContactsConsultants.photoExtension = ext[1];
              this.administrativeContactsConsultants.b64 = imageUrl;
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
  //*************************************************************//
  public fileOver(event) {
    console.log(event);
  }
  //*************************************************************//
  public fileLeave(event) {
    console.log(event);
  }
  //*************************************************************//
  nameDocument(id){
    for (let i = 0; i < this.ca_documentType.length; i++) {
      if(this.ca_documentType[i].id == id){
        return this.ca_documentType[i].documentType;
      }
    }
  }
  //************************************************************//
  namePrivacy(id){
    for (let i = 0; i < this.ca_privacy.length; i++) {
      if(this.ca_privacy[i].id == id){
        return this.ca_privacy[i].privacy;
      }
    }
  }
  //************************************************************//
  nameCity(id){
    for (let i = 0; i < this.ca_city.length; i++) {
      if(this.ca_city[i].id == id){
        return this.ca_city[i].city;
      }
    }
  }
  //************************************************************//
  save(){
    this.administrativeContactsConsultants.success=true;
    this.dialogRef.close(this.administrativeContactsConsultants);
  }
  //*************************************************************//
   deleteDocument(id, i){
    console.log("Entra a eliminar documento: ", i);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete the document"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        console.log("entra a eliminar documentos")
        if(id != 0){
          this._services.service_general_delete("Profile/documentAdministrativeContacts?id=" + id).subscribe((data => {
            if (data.success) {
              const dialog = this._dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "Document deleted"
                },
                width: "350px"
              });
              this.administrativeContactsConsultants.documentAdministrativeContactsConsultants.splice(i,1);
              //this.ngOnInit();
            }
          }), (err)=>{
            console.log("Error: ", err);
          })
        }else{
          this.administrativeContactsConsultants.documentAdministrativeContactsConsultants.splice(i,1);
        }
      }
    })
  }

  //*************************************************************//
  public __serverPath__:string = this._services.url_images;

  public openFileOnWindow( url_in:string ):void {
    const server_url:string = this.__serverPath__ + url_in;
    window.open( server_url );
  }

  downloadPdf(base64String, fileName,  ext) {
    const source = 'data:application/'+ext+';base64,'+base64String;
    const link = document.createElement("a");
    link.href = source;
    link.download = fileName+'.'+ext;
    link.click();
  }
  onClickDownloadPdf(b64, ext){
    let base64String = b64;
  
    this.downloadPdf(base64String,"archivo", ext);
  }

  //*********************************************//
  activeContactType: boolean = false;
  activeContactName: boolean = false;
  activeTitle: boolean = false;
  activePhoneNumber: boolean = false;
  activeEmail: boolean = false;
  activeCity: boolean = false;
  activeComents: boolean = false;
  activeDocumentos: boolean = false;
  activeNumberLongitud: boolean = false;
  contador = 0;
  validForm(){
    if(this.administrativeContactsConsultants.contactType == undefined || this.administrativeContactsConsultants.contactType == null || this.administrativeContactsConsultants.contactType == ''){
      this.activeContactType = true;
      this.contador++;
    }
    if(this.administrativeContactsConsultants.contactName == undefined || this.administrativeContactsConsultants.contactName == null || this.administrativeContactsConsultants.contactName == ''){
      this.activeContactName = true;
      this.contador++;
    }
    if(this.administrativeContactsConsultants.title == undefined || this.administrativeContactsConsultants.title == null || this.administrativeContactsConsultants.title == ''){
      this.activeTitle = true;
      this.contador++;
    }
    if(this.administrativeContactsConsultants.phoneNumber == undefined || this.administrativeContactsConsultants.phoneNumber == null || this.administrativeContactsConsultants.phoneNumber == ''){
      this.activePhoneNumber = true;
      this.contador++;
    }
    
    if(this.administrativeContactsConsultants.email == undefined || this.administrativeContactsConsultants.email == null || this.administrativeContactsConsultants.email == ''){
      this.activeEmail = true;
      this.contador++;
    }
    if(this.administrativeContactsConsultants.city == undefined || this.administrativeContactsConsultants.city == null || this.administrativeContactsConsultants.city == ''){
      this.activeCity = true;
      this.contador++;
    }
    if(this.administrativeContactsConsultants.comments == undefined || this.administrativeContactsConsultants.comments == null || this.administrativeContactsConsultants.comments == ''){
      this.activeComents = true;
    }
    if(this.administrativeContactsConsultants.documentAdministrativeContactsConsultants.length == 0){
      //this.activeDocumentos = true;
      //this.contador++;
    }
  
    let aux_number = this.administrativeContactsConsultants.phoneNumber;
    if(aux_number != undefined){
      let n = aux_number.toString();
      console.log(n);
      if(n.length > 20){
        this.activeNumberLongitud = true;
        this.contador++;
      }
    }
    

    if(this.contador == 0){
       this.save();
    }else{
      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Warning",
          body: "To save it is necessary to fill in all the requested fields"
        },
        width: "350px"
      });
  
      dialogRef.afterClosed().subscribe(result => {
      
      })
      this.contador = 0;
      return;
    }
  }

  validateEmail(){
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      if (emailRegex.test(this.administrativeContactsConsultants.email)) {
        this.contador = 0;
      }else{
        this.contador++;
        this.activeEmail = true;
        this.administrativeContactsConsultants.email = '';
        const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Warning",
            body: "Wrong email format"
          },
          width: "350px"
        });
    
        dialogRef.afterClosed().subscribe(result => {
        
        })
      }
  }

  FalseVar(){
    this.activePhoneNumber = false;
    this.activeNumberLongitud = false;
  }

}
