import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { AddParticipanteComponent } from './dialog/add-participante/add-participante.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl } from '@angular/forms';
import { GeneralConfirmationComponent } from '../dialog/general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';
import { AddGroupComponent } from './dialog/add-group/add-group.component';

@Component({
  selector: 'app-training-admin',
  templateUrl: './training-admin.component.html',
  styleUrls: ['./training-admin.component.css']
})
export class TrainingAdminComponent implements OnInit {

  @ViewChild('Supplier') Supplier: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public range = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl()
  });
  public p:number = 1;
  public c:number = 1;


  constructor(public router: Router, public _services: ServiceGeneralService, public _dialog: MatDialog, public _routerParams: ActivatedRoute) { }
  //********************************************************************//
  public registros_training: any;
  public show_no_registros_individuales: boolean = false;
  public show_no_registros_grupales: boolean = false;
  public userFilter: any = { name: '' };
  public userGroup: any = { name: '' };


  public global_training_individual = [];
  public global_training_grupal = [];
  public filterTraining: any = { type: '' };

  ngOnInit(): void {
    console.log("data");
    this.getCatalogos();
    this.consultaPermisos();
    this._services.service_general_get('Training/GetTrainings').subscribe((data => {
      if (data.success) {
        let registros = data.result;
        console.log(registros);
        this.registros_training = registros;
        let contadorGrupal = 0;
        let contadorIndividual = 0;
        let training_individual = [];
        let training_grupal = [];
        for (let i = 0; i < this.registros_training.length; i++) {
          if (this.registros_training[i].groups == true) {
            contadorGrupal++;
            training_grupal.push(this.registros_training[i]);
          }
          if (this.registros_training[i].groups == false) {
            contadorIndividual++;
            training_individual.push(this.registros_training[i]);
          }
        }

        this.global_training_individual = training_individual;
        //this.global_training_grupal = training_grupal;
        console.log('Este es el training grupal', training_grupal);


          let json_menu = [];
          let contador_aux = 0;
          let posicion_json = 0;
          for (let i = 0; i < training_grupal.length; i++) {
            contador_aux = 0;
            posicion_json = 0;
            for (let j = 0; j < json_menu.length; j++) {
              if (training_grupal[i].groupId == json_menu[j].groupId) {
                contador_aux++;
                posicion_json = j;
              }
            }

            switch (training_grupal[i].groupId) {
              case training_grupal[i].groupId:
                if (contador_aux == 0) {
                  json_menu.push({
                    name: training_grupal[i].groupName,
                    groupId:training_grupal[i].groupId,
                    id:training_grupal[i].id,
                    training: [{
                      "creationDate": training_grupal[i].creationDate,
                      "description": training_grupal[i].description,
                      "groupId": training_grupal[i].groupId,
                      "groupName": training_grupal[i].groupName,
                      "groups": training_grupal[i].groups,
                      "id": training_grupal[i].id,
                      "name": training_grupal[i].name,
                      "type": training_grupal[i].type,
                      "typeId": training_grupal[i].typeId
                    }]
                  })
                } else {
                  json_menu[posicion_json].training.push({
                    "creationDate": training_grupal[i].creationDate,
                    "description": training_grupal[i].description,
                    "groupId": training_grupal[i].groupId,
                    "groupName": training_grupal[i].groupName,
                    "groups": training_grupal[i].groups,
                    "id": training_grupal[i].id,
                    "name": training_grupal[i].name,
                    "type": training_grupal[i].type,
                    "typeId": training_grupal[i].typeId
                  })
                }
                break;
              }
            }

        console.log("Este es el JSON GRUPAL: ", json_menu);
        this.global_training_grupal = json_menu;
        console.log(this.global_training_grupal);


        if (contadorIndividual > 0) {
          this.show_no_registros_individuales = true;
        }

        if (contadorGrupal > 0) {
          this.show_no_registros_grupales = true;
        }
      }
    }))
  }
  //********************************************************************//
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
  //********************************************************************//
  //FUNCION PARA CONSULTA DE CATALOGOS//
  public ca_training_type = [];
  public ca_training_group = [];
  async getCatalogos() {
    this.ca_training_type = await this._services.getCatalogueFrom('GetTrainingType');
    this.ca_training_group = await this._services.getCatalogueFrom('GetTrainingGroup');
  }
  //********************************************************************//
  public show_group: boolean = false;
  showGroups(e) {
    console.log(e);
    if (e.checked) {
      this.show_group = true;
    } else {
      this.show_group = false;
    }
  }
  //********************************************************************//
  //FUNCIONA PARA AGREGAR PARTICIPANTES AL CURSO//
  addParticipante(data_) {
    const dialogRef = this._dialog.open(AddParticipanteComponent, {
      width: "40%",
      data: data_
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.ngOnInit();
    })
  }
  //********************************************************************//
  //FUNCION PARA AGREGAR NUEVO GRUPO//
  addGroup(){
    const dialogRef = this._dialog.open(AddGroupComponent, {
      width: "40%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
  //********************************************************************//
  //FUNCION PARA AGREGAR UN NUEVO TRAINING//
  addTraining() {
    let id = 0;
    this.router.navigateByUrl('/admin-trainig/addTraining/' + id);
  }
  //FUNCION PARA EDITAR TRAINING//
  editTraining(id) {
    this.router.navigateByUrl('/admin-trainig/addTraining/' + id);
    //localStorage.setItem('id_training',id)
  }
  //********************************************************************//
  //VARIABLES PARA BUSCAR//
  public search: any = {
    groups: false
  };
  //METODO PARA BUSQUEDA POR TECLEADO DE FOMRA MANUAL//
  applyFilter(event: Event) {
    //const filterValue = (event.target as HTMLInputElement).value;
    //this.registros_training.filter = filterValue.trim().toLowerCase();
    //console.log(this.registros_training);
  }
  //FUNCION PARA ARMAR LA URL PARA REALIZAR BUSQUEDA DE REGISTROS CON PARAMETROS PERSONALIZADOS//
  searchData() {
    let service_record_params_selected: string = '';;
    let params = '';
    for (let item in this.search) {
      if (this.search[item] != '') {
        service_record_params_selected += `${item}=${this.search[item]}&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    console.log("PARAMETROS DE BUSQUEDA: ", params)
    this.getServiceRecordTableData(params);
  }
  //FUNCION PARA BUSCAR REGISTROS CON PARAMETROS PERSONALIZADOS//
  public getServiceRecordTableData(params: string = ''): void {
    const params_in: string = params == '' ? '' : `?${params}`;
    this._services.service_general_get('Training/GetTrainings' + params_in).subscribe((data: any) => {
      if (data.success) {
        let registros = data.result[0];
        this.registros_training = registros;
        //this.registros_training = new MatTableDataSource(registros);
        //this.registros_training.paginator = this.Supplier;
        //this.registros_training.sort = this.sort;
      }
    });
  }
  //**********************************************************//
  //FUNCION PARA REALIZAAR BUSQUEDA POR RENGO DE FECHA//
  public filteringServiceRecordTable(): void {
    let service_record_params_selected = '';
    let params: string = '';
    if (this.range.value.startDate != null) this.search.startDate = this.filterDate(this.range.value.startDate);
    if (this.range.value.endDate != null) this.search.endDate = this.filterDate(this.range.value.endDate);
    for (let item in this.search) {
      if (this.search[item] != '') {
        service_record_params_selected += `${item}=${this.search[item]}&`;
        params = service_record_params_selected.substring(0, service_record_params_selected.length - 1);
      }
    }
    if (this.range.value.startDate != null && this.range.value.endDate != null) {
      this.getServiceRecordTableData(params);
    }
  }
  //FUNCION PARA DAR FORMATO AL RANGO POR FECHA//
  public filterDate(date_in: any): string {
    return `${date_in.getFullYear()}/${date_in.getMonth() + 1}/${date_in.getDate()}`;
  }
  //*******************************************************************************************//
  //FUNCION PARA ELIMINAR CURSOS//
  deleteCurso(id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Training?"
      },
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        console.log("training eliminado");
        this._services.service_general_delete("Training?key=" + id).subscribe((data => {
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Training was deleted"
              },
              width: "350px"
            });
            this.ngOnInit();
          }
        }))
      }
    });
  }

  //******************************************************************************//
  public filteruno: boolean = false;

  public cleanFilter(): void {
    this.filterTraining = { type: '' };
    this.range.reset({startDate: '', endDate: ''});
    this.search = {
      groups: false
    };
    this.filteruno = true;
    setTimeout(() => {
      this.filteruno = false;
    }, 2000);
    this.ngOnInit();
  }
}
