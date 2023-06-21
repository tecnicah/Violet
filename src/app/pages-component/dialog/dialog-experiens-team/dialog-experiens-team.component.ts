import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { da } from 'date-fns/locale';

@Component({
  selector: 'app-dialog-experiens-team',
  templateUrl: './dialog-experiens-team.component.html',
  styleUrls: ['./dialog-experiens-team.component.css']
})
export class DialogExperiensTeamComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogExperiensTeamComponent>,
    public _services: ServiceGeneralService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _dialog: MatDialog,
    private rutaActiva: ActivatedRoute) { }

    serviceLine: any[] = [];
    users: any[] = [];
  valueUser;

  ngOnInit(): void {
    this.catalogos();
    console.log(this.data);
  }

  async catalogos() {
    //this.serviceLine = await this._services.getCatalogueFrom('GetServiceLine');
    // GetExperienceTeamCatalog/1?client=130
    this._services.service_general_get_noapi('GetExperienceTeamCatalog/'+ this.data.idServiceLine +'?client=' + this.data.idClientPartnerProfile).subscribe(r =>{
      if(r.success){
        this.users = r.result.value;
      }
    })
    console.log('user', this.users);
  }

  save() {
    console.log('id de user', this.valueUser);
    for (let i = 0; i < this.valueUser.length; i++) {
      const element = this.valueUser[i];
      this.data.userId = element;
      this._services.service_general_putnoapi('AddClientPartnerProfile',this.data).subscribe(r=>{
          console.log(r);
      })
    }
    this.data.listo = true;
    this.dialogRef.close(this.data);
    }
  }

    // if(this.data.ruta == "new"){
    //   this.data.success = true;
    //   this.dialogRef.close(this.data);
    // }else{
    //   this._services.service_general_putnoapi('AddClientPartnerProfile',this.data).subscribe(r=>{
    //     console.log(r);
    //     this.data.listo = true;
    //     this.dialogRef.close(this.data);
    //   })
    // }

