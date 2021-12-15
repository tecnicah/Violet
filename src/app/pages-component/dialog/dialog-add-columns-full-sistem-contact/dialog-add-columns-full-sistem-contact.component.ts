import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';

@Component({
  selector: 'app-dialog-add-columns-full-sistem-contact',
  templateUrl: './dialog-add-columns-full-sistem-contact.component.html',
  styleUrls: ['./dialog-add-columns-full-sistem-contact.component.css']
})
export class DialogAddColumnsFullSistemContactComponent implements OnInit {
  public __loader__: LoaderComponent = new LoaderComponent();

  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DialogAddColumnsFullSistemContactComponent>) { }

  dataColumns: any[] = [];
  userFilter: any = { name: '' }; //variable para filtrar columns
  public simpleList:any = []; //variable para las columnas de tabla
  caColumns: any[] = []; //aqui se guarda el get de columnas
  editColumn: any[] = [];


  ngOnInit(): void {
    console.log('data que recibe dialog-filter', this.data);
    this.catalogos();
    if (this.data.colums != undefined) {
      if (this.data.colums.length > 0) {
        console.log('este reporte tiene columnas');
        for (let i = 0; i < this.data.colums.length; i++) {
          const element = this.data.colums[i];
          this.simpleList.push({
            id: element.columns,
            name: element.columnsNavigation.name
          });
          this.editColumn.push(element.id);
          console.log('id colum', element.id);
          // this.caColumns.push(this.data.colums[i].columns);
        }
      }
    }
    console.log('columns de data', this.simpleList );
    this.catalogos();
  }


  async catalogos() {
    this.caColumns = await this._services.getCatalogueFrom('GetColumnsReport/2');
    console.log('columnas', this.caColumns);
  }

  public removeItem(item: any, list: any[]): void {
    list.splice(list.indexOf(item), 1);
  }

  selectColumn($event, item){
    if($event.checked){
      this.simpleList.push(item);
      this.editColumn.push(0);
    }else{
      for (let i = 0; i < this.simpleList.length; i++) {
        const element = this.simpleList[i];
        if(item.id == element.id){
          this.simpleList.splice(i, 1);
          this.editColumn.splice(i,1);
        }
      }
    }
  }
  verify(item){
    for (let i = 0; i < this.simpleList.length; i++) {
      const element = this.simpleList[i];
      if(item.id == element.id){
        return true;
      }
    }
  }
  delete(item){
    for (let i = 0; i < this.simpleList.length; i++) {
      const element = this.simpleList[i];
      if(item.id == element.id){
        this.simpleList.splice(i,1);
      }
    }
  }
  save() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    console.log('data', this.simpleList);
    let columnas = [];
    let back = [];
    for (let i = 0; i < this.simpleList.length; i++) {
      const value = this.simpleList[i];
      columnas.push(value.name);
      back.push({
        'id': 0,
        'report': this.data.report,
        'columns': value.id,
        'order': i,
        'createdBy': userData.id,
        'createdDate': new Date(),
        'updatedBy': userData.id,
        'updatedDate': new Date()
      });
    }
      this._services.service_general_post_with_url(`Report/EditColumns/${this.data.report}`, back).subscribe(r => {
        console.log('respuesta de creacion de columnas', r);
        this.dialogRef.close(r);
      })
  }
}
// /api/Report/EditColumns/{report}
// "id": 0,
// "report": 0,
// "columns": 0,
// "orden": 0,
// "createdBy": 0,
// "createdDate": "2021-01-20T22:53:46.360Z",
// "updatedBy": 0,
// "updatedDate": "2021-01-20T22:53:46.360Z"
