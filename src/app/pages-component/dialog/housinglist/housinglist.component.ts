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
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DialogHomeDetailsComponent } from '../dialog-home-details/dialog-home-details.component';


@Component({
  selector: 'app-housinglist',
  templateUrl: './housinglist.component.html',
  styleUrls: ['./home-finding-full.component.scss']
})
export class HousinglistComponent implements OnInit {

  constructor(public _dialog: MatDialog, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService) { }


  versions_ir = [];
  ir_service_detail_id;
  loader: LoaderComponent = new LoaderComponent();
  resultado_estatus;
  //TABLE HOUSING//
  dataSourceHousing: any[] = [];
  displayedColumnsHousing: string[] = ['Address', 'Neighborhood', 'Property Type','Price', 'Actions'];
  ////////////////////////////
  user: any = {};


  ngOnInit(): void {
    console.log("data Recivida desde el servicio :", this.data)
    this.GetBasicServiceData();
    this.user = JSON.parse(localStorage.getItem('userData'));
    // this.get_lsf_versions();
  }


  export() {

  }

  no() {
    this.data_return.success = false;
    this.dialogRef.close(this.data_return);

  }

  exportLSF() {
    alert('EXporting');
  }

  data_return = {
    id: 0,
    success: false
  }

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


  //DATA TABLE HOUSING//
  getDataHousing() {

    this._services.service_general_get(`HousingList/GetPermanentHousingList?id_sr=${this.data.sr_id}`).subscribe(data_housing => {
      if (data_housing.success) {

        console.log('DATA CONSULTA HOUSING LIST: ', data_housing);
        this.dataSourceHousing = data_housing.message;
        // this.permanent_homet(this.departure.propertyId);

      }
    });
  }

  setPermanent(ob: MatCheckboxChange, element) {
    
    console.log("checked: " + ob.checked, " id housing: ", element.id);
    
    this.update_permanent_home(element.id, this.atributos_generales.cat_category_id 
                            , this.data.servide_detail_id , this.user.id, this.atributos_generales.wos_id );

  }

  //NEW RECORD//
  HomeDetailsnew() {

    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: {
        id: 0,
        nuevo: true,
        workOrder: this.atributos_generales.wo_id,
        workOrderServicesId: this.data.wos_id,
        numberWorkOrder: this.atributos_generales.wo_number,
        serviceID: this.data.servide_detail_id,
        serviceName: "Add Property",
        service: this.data.sr_id,
        serviceTypeId: this.atributos_generales.type_id,
        sr: this.data.sr_id,
        supplierType: 3,
        no_permanent: false
        , idServiceDetail: this.data.servide_detail_id
        , shared: 1,
        cat_service_id: this.atributos_generales.cat_category_id,
        catCategoryId: this.atributos_generales.cat_category_id
      },
      width: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogRef.close(100);
      this.getDataHousing();
    });
  }

  atributos_generales;

  GetBasicServiceData() {
    this.loader.showLoader();
    this._services.service_general_get(`ServiceRecord/GetBasicServiceDataByWosId?wos_id=${this.data.wos_id}`).subscribe(resp => {
      this.loader.hideLoader();
      if (resp.success) {
        this.atributos_generales = resp.atributos_generales.value[0];
        console.log("atributos generales ================ ", this.atributos_generales)
        this.getDataHousing();
      }
    });
  };

  //EDIT HOUSING//
  editHousing(data) {

    data.supplierType = 3
    data.workOrderServicesId = this.data.wos_id,
    data.sr = this.atributos_generales.sr_id;
    data.numberWorkOrder = this.atributos_generales.wo_number;
    data.serviceID = this.atributos_generales.service_number;
    data.serviceName = "Add Property",
    data.idServiceDetail = this.data.servide_detail_id;
    data.shared = 1;
    data.cat_service_id =  this.atributos_generales.cat_category_id
    data.serviceTypeId= this.atributos_generales.type_id
    data.catCategoryId = this.atributos_generales.cat_category_id
    const dialogRef = this._dialog.open(DialogHomeDetailsComponent, {
      data: data,
      width: "95%"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDataHousing();
    })
  }

  public __loader__: LoaderComponent = new LoaderComponent();

  update_permanent_home(property_id,cat_category_id,service_detail_id,user_id,wos_id ){

    let SetPermanentHomeDto = {
      property_id: property_id
      ,cat_category_id: cat_category_id
      ,service_detail_id: service_detail_id
      ,user_id: user_id
      ,wos_id: wos_id
    }

    this.__loader__.showLoader();
    this._services.service_general_post_with_url('HousingList/SetPermanentHome', SetPermanentHomeDto).subscribe((r => {
      if (r.success) {
        console.log(r)
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Permanent Home Updated"
          },
          width: "350px"
        });
       // this.ngOnInit();
        r.succes = true;
        this.dialogRef.close(r);
        console.log("Valor regresado del permanent nuevo  pop up house pop up: ======================", r.result.id)
        this.__loader__.hideLoader();
        
      }
    }), (err) => {
      this.__loader__.hideLoader();
      console.log("error: ", err);
    })
  }

}