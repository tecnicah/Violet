import { ConstantPool } from '@angular/compiler';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { IrMoveinComponent } from '../ir-movein/ir-movein.component';
import { IrMoveoutComponent } from '../ir-moveout/ir-moveout.component';
import { IrIrComponent } from '../ir-ir/ir-ir.component';
import { GeneralConfirmationComponent } from '../general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { LoaderComponent } from 'app/shared/loader';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-ir-select',
  templateUrl: './ir-select.component.html',
  styleUrls: ['./home-finding-full.component.scss']
})
export class IrSelectComponent implements OnInit {

  constructor(public _dialog: MatDialog, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService) { }


  versions_ir = [];
  ir_service_detail_id;
  loader: LoaderComponent = new LoaderComponent();
  resultado_estatus;
  images_path = `${environment.images_path}`;
  ////////////////////////////

  ngOnInit(): void {
    console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:", this.data)
    this.get_lsf_versions();
  }


  export() {

  }

  no() {
    this.data_return.success = false;
    this.dialogRef.close(this.data_return);

  }


  exportIR(option) {
    alert('Export coming soon...');
    // this.loader.showLoader();
    // this._services.service_general_get('HousingList/GetInspRepBySectionPrint?key='+this.data.ph_id+'&servide_detail_id='+this.data.servide_detail_id +'&section='+ option)
    // .subscribe((data => {
    //   this.loader.hideLoader();
    //   if (data.success) {
    //     const linkSource = this.images_path + data.message;
    //     const downloadLink = document.createElement('a');
    //     const fileName = 'lSF.pdf';

    //     downloadLink.href = linkSource;
    //     downloadLink.target = "_blank"
    //     downloadLink.download = fileName;
    //     downloadLink.click();
    //   }
    // }));
  };

    ///api/HousingList/GetInspRepBySectionPrint?key='+this.dataJson.ph+'&servide_detail_id='+this.dataJson.id+'&section='+this.roption
  

  data_return = {
    id: 0,
    success: false
  }


  get_lsf_versions() {
    this.loader.showLoader();
    this._services.service_general_get('HousingList/GetLeaseInspectionsVersions?id_service_detail=' + this.data.servide_detail_id + "&id_catCategoryId="+ this.data.cat_category_id +"&housing_list_id=" + this.data.ph_id,).subscribe(versiones => {
      this.loader.hideLoader();
      if (versiones.success) {

        this.versions_ir = versiones.result.ins_rep_versions;
        this.ir_service_detail_id = this.data.servide_detail_id;
        console.log(' this.ir_service_detail_id  ===========================: ', this.ir_service_detail_id );
        this.GetStatusIR();
        console.log('DATA GetLeaseInspectionsVersions ===========================: ', this.versions_ir);

      }
      else {
        alert('error las versiones')
      }
    }), (err) => {
      this.loader.hideLoader();
      console.log("error al cargar los estatus de I&R: ", err);
    };
  };

  GetStatusIR() {
    this.loader.showLoader();
    // ir_service_detail_id es lo que se selecciono en el select de versiones, this.data.ph_id es el id de la propedad 
    this._services.service_general_get('HousingList/GetStatusIR?servide_detail_id=' + this.ir_service_detail_id + "&key=" + this.data.ph_id,).subscribe(res => {
      this.loader.hideLoader();
      if (res.success) {

        this.resultado_estatus = res.result.value;

        console.log('DATA GetStatusIR ===========================: ', this.resultado_estatus);

      }
      else {
        alert('error las versiones')
      }
    });
  };



  validate_move_in_out(status, type) {
    let pop_up ;
    if(type == 1)
    {
      pop_up = IrMoveinComponent
    }
    else if( type == 2)
    {
      pop_up = IrMoveoutComponent
    }
    else{
      pop_up = IrIrComponent
    }

     if(status == 1 || status == null){
      const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
        data: {
          header: "Start confirmation",
          body: "Are you sure to srtart this Process?"
        },
        width: "350px"
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if (result) {
          this.start_process(type,pop_up);
        }
        else{
        }
      });
     }
     else
     {
        this.open_section(pop_up);
     }
  };


  open_section(pop_up){

    let edicion = false;
    if (this.data.servide_detail_id == this.ir_service_detail_id) {
      edicion = true;
    }

    const dialogRef = this._dialog.open(pop_up, {
      data: {
        ph_id: this.data.ph_id,
        servide_detail_id: this.ir_service_detail_id
        , edicion
        , sr_id: this.data.sr_id
        ,wos_id : this.data.wos_id
      },
      width: "100%",

    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      if (result.success) {
        console.log("po pup de LSF cerrado succes true");
       // this.ngOnInit();
      }
      else {
        console.log("po pup de LSF cerrado succes false");
      }
    });
  }


  start_process(type, pop_up) {
   
    //el objeto lo creas con el 2 hardcodeado, en id_permanent_home pones el id de la casa y en id_service_detail el valor de la selección del 
    //select de versiones, en type pones (1 Move in , 2 move out, 3 Inspections & Repairs)
      let req_ = { status_id: 2, id_permanent_home: this.data.ph_id, id_service_detail: this.ir_service_detail_id, type: type }
      this._services.service_general_post_with_url('HousingList/save_ir_statusbyhousingid', req_).subscribe(r => {
        if (r.success) {
          this.open_section(pop_up);
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Process has ben started"
            },
            width: "350px"
          });
        }
        else {
          console.log("Error actualziando estatus de el ir: ", r);
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Error",
              body: "Updated status Error"
            },
            width: "350px"
          });
        }
      })

  };

}
