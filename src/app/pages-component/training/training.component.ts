import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  public userData:any;
  public training = [];
  constructor(public router: Router, public _services: ServiceGeneralService, public _dialog: MatDialog, public _routerParams: ActivatedRoute) { }

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
  ngOnInit(): void {
    this.consultaPermisos();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this._services.service_general_get('Training/'+this.userData.id+'/MyTrainings').subscribe((data => {
     if(data.success){
       console.log(data.result.value);
       this.training = data.result.value
     }
    }))
  }
  //*****************************************************************//
  //FUNCION PARA ABRIR CURSO//
  openTraining(item){
    console.log(item);
    this.router.navigateByUrl('/TrainingCursoComponent/'+item.participantId);
  }
  //*****************************************************************//
  editCurso(item){
    this.router.navigateByUrl('/admin-trainig/addTraining/'+item.training);
  }

}
