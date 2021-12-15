import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { AddContentComponent } from '../../dialog/add-content/add-content.component';
import { DialogGeneralMessageComponent } from 'app/pages-component/dialog/general-message/general-message.component';


@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss']
})
export class AddTrainingComponent implements OnInit {

  public userData: any;
  public fecha = new Date();
  public simpleList: any;

  constructor(public router: Router, public _services: ServiceGeneralService, public _dialog: MatDialog, public _routerParams: ActivatedRoute) { }

  //*************************************************************//
  public training_data: any = {
    "contents": []
  };
  public id: any;
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.getCatalogos();
    this.consultaPermisos();
    let id_ = this._routerParams.snapshot.params.id;;
    this.id = id_;
    if (id_ != 0) {
      this._services.service_general_get('Training?key=' + id_).subscribe((data => {
        if (data.success) {
          console.log(data.result);
          this.training_data = data.result;
          if (localStorage.getItem('data_content') != null && localStorage.getItem('data_content') != undefined && localStorage.getItem('data_content') != '') {
            let data_regitro = JSON.parse(localStorage.getItem('data_content'));
            if (data_regitro.index) {
              this.training_data.contents[data_regitro.index] = data_regitro;
              this.simpleList = this.training_data.contents;
              localStorage.removeItem('data_content');
            } else {
              data_regitro.training = this.training_data.id;
              data_regitro.order = this.training_data.contents.length - 1;
              this.training_data.contents.push(data_regitro);
              this.simpleList = this.training_data.contents;
              localStorage.removeItem('data_content');
            }
            this.updateDate();
          } else {
            this.simpleList = this.training_data.contents;
          }
          if (this.training_data.photo != null && this.training_data.photo != '') {
            document.getElementById('lead_client_avatar').setAttribute('src', this._services.url_images + this.training_data.photo);
          }
        }
      }))
    } else {
      console.log("Nuevos registros");
      console.log(JSON.parse(localStorage.getItem('data_content')));
      let data_ = JSON.parse(localStorage.getItem('data_content'));
      if (data_ != undefined && data_ != null) {
        if (localStorage.getItem('training') != null && localStorage.getItem('training') != undefined) {
          this.training_data = JSON.parse(localStorage.getItem('training'));
          this.training_data.contents.push(data_);
          this.simpleList = this.training_data.contents;
          if (this.training_data.photo != null && this.training_data.photo != '') {
            document.getElementById('lead_client_avatar').setAttribute('src', 'data:image/png;base64,'+this.training_data.photo);
          }
        } else {
          this.training_data.contents.push(data_);
          this.simpleList = this.training_data.contents;
          if (this.training_data.photo != null && this.training_data.photo != '') {
            document.getElementById('lead_client_avatar').setAttribute('src', 'data:image/png;base64,'+this.training_data.photo);
          }
        }
      }

      //this.insertData();
    }
  }
  //************************************************************//
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
  //*************************************************************//
  //FUNCION PARA CONSULTA DE CATALOGOS//
  public ca_training_type = [];
  public ca_training_group = [];
  async getCatalogos() {
    this.ca_training_type = await this._services.getCatalogueFrom('GetTrainingType');
    this.ca_training_group = await this._services.getCatalogueFrom('GetTrainingGroup');
  }
  //*************************************************************//
  //FUNCION PARA AGREGAR CONTENIDO//
  addContent() {
    const dialogRef = this._dialog.open(AddContentComponent, {
      width: "20%"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        localStorage.removeItem('content');
        localStorage.setItem('tipo_contenido', result.typeContent);
        localStorage.setItem('training', JSON.stringify(this.training_data));
        this.router.navigateByUrl('/addTraining/Content');
      }
    })
  }
  //*************************************************************//
  //FUNCION PARA EDITAR CONTENIDO//
  editContent(data, i) {
    data.index = i;
    console.log("contenido a editar: ", data);
    localStorage.setItem('content', JSON.stringify(data));
    this.router.navigateByUrl('/addTraining/Content');
  }
  //*************************************************************//
  //FUNCION PARA EDICION DE FOTOGRAFIA//
  img(event) {
    console.log(event);
    const file = event.target.files[0];
    const ext = event.target.files[0].type.split('/');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader);
      let encoded = reader.result.toString().replace(/^data:(.*;base64,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      this.training_data.photo = encoded;
      this.training_data.photoExtension = ext[1];
      console.log(reader)
      document.getElementById('lead_client_avatar').setAttribute('src', '' + reader.result);
    };
  }
  //*************************************************************//
  public removeItem(item: any, list: any[]): void {
    list.splice(list.indexOf(item), 1);
  }
  //*************************************************************//
  save() {
    if (this.id == 0) {
      this.insertData();
    } else {
      this.updateDate();
    }
  }
  //*************************************************************//
  //FUNCION PARA INSERTAR REGISTRO//
  insertData() {
    console.log("entra a actualizar informacion");
    this.training_data.creationDate = new Date();
    this.training_data.updatedBy = this.userData.id;
    this.training_data.createdBy = this.userData.id;
    this.training_data.updatedDate = new Date();
    this._services.service_general_post_with_url('Training', this.training_data).subscribe((data => {
      if (data.success) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Training was saved"
          },
          width: "350px"
        });
        localStorage.removeItem('data_content');
        localStorage.removeItem('content');
        localStorage.removeItem('training');
        this.router.navigateByUrl('/admin-trainig')
      }
    }))
  }
  //*************************************************************//
  //FUNCION PARA ACTUALIZAR REGISTRO//
  updateDate() {
    console.log("entra a actualizar informacion");
    this.training_data.updatedDate = new Date();
    this.training_data.updatedBy = this.userData.id;
    this._services.service_general_put('Training', this.training_data).subscribe((data => {
      if (data.success) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Training was Updated"
          },
          width: "350px"
        });
        localStorage.removeItem('data_content');
        localStorage.removeItem('content');
        localStorage.removeItem('training');
        this.ngOnInit();
      }
    }))
  }
  //*************************************************************//
  //LIMPIEZA DE LOCALSTORAGE//
  ngOnDestroy() {
    console.log("ng on destroy");
    localStorage.removeItem('data_content');
    //localStorage.removeItem('content');
  }
  //*************************************************************//
  //FUNCION PARA REGRESAR//
  goBack() {
    window.history.back();
  }

}
