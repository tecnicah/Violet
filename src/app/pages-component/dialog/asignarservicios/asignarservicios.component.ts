import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from '../../../../app/shared/loader';


@Component({
  selector: 'app-asignarservicios',
  templateUrl: './asignarservicios.component.html',
  styleUrls: ['./asignarservicios.component.css']
})
export class AsignarserviciosComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any, public _services: ServiceGeneralService) { }
  public __loader__: LoaderComponent = new LoaderComponent();
  ca_estatus = [];
  home_finding = { statusId: 0 }
  ngOnInit(): void {
    console.log("DATA RECIBIDA:", this.data)

    this._services.service_general_get("Catalogue/GetStatusServicebyRol?category=" + this.data.category + "&rol=" + this.data.rol).subscribe((res => {
      console.log("roles cargados en el pop up = ===============================", res);
      if (res.success) {
        this.ca_estatus = res.result;
      }
    }));

  }

  datos = [];

  public addordeleteservicesRelocation(event, id, id_siplier, service) {
    // debugger;
    if (event.checked) {
      let dato = {
        "relocationSupplierPartnerId": id_siplier,
        "serviceOrderServicesId": id,
        "service": service
      }

      this.datos.push(dato);
    }
    else {
      this.datos = this.datos.filter(function (item) {
        return item.serviceOrderServicesId !== id;
      });
    }



    console.log("arreglo a enviar=============================: ", this.datos)
  }

  public addordeleteservicesRelocation_send(event, id, id_siplier, service) {
    debugger;


    let datos = [{
      "relocationSupplierPartnerId": id_siplier,
      "serviceOrderServicesId": id,
      "service": service
    }]

    if (event.checked) {

      this._services.service_general_post_with_url("Relocation/AddAssignedRelocation", datos).subscribe((data => {
        if (data.success) {
          this.ngOnInit();
          document.getElementById('services_supplier_relocation').scrollIntoView();
        }
      }))
    } else {
      this._services.service_general_delete_with_url("Immigration/DeleteAssignedImmigration?id=" + id).subscribe((data => {
        this.ngOnInit();
        document.getElementById('services_supplier_relocation').scrollIntoView();
      }))
    }
  }


  consultores; 
  regreso = {consultores: null, success: true}

  yes() {
    let _ids = this.data.idsupplier;
    for (var n = 0; n < this.data.assigned_services.length; n++) {
      this.data.assigned_services[1].idsuplier = _ids;
    }

    console.log("data.assigned_services ======================:", this.data.assigned_services)

    let obj = { lista: this.data.assigned_services, srid: this.data.srid }
    this.__loader__.showLoader();
    this._services.service_general_post_with_url("Relocation/AddMultiAssignedRelocation", obj).subscribe(data => {
      this.__loader__.hideLoader();
      debugger;
      console.log("Relocation/AddMultiAssignedRelocation =======================:", data)
      if (data.success) {
        debugger;
        this.regreso.consultores  = data.result.value;
        this.regreso.success = true;
        console.log("Relocation/AddMultiAssignedRelocation =======================:", data)
      }
      this.dialogRef.close(this.regreso);
    }, (error: any) => {
      this.__loader__.hideLoader();
      console.error('[CP455] ServiceRecord/GetServices ==> ', error);
      this.dialogRef.close(this.regreso);
    });


    
  }

  data_return = {
    id: 0,
    success: false
  }

  no() {
    this.data_return.success = false;
    this.dialogRef.close(this.data_return);

  }

}

