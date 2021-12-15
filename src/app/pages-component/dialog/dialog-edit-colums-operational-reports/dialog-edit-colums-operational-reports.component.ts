import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

@Component({
  selector: 'app-dialog-edit-colums-operational-reports',
  templateUrl: './dialog-edit-colums-operational-reports.component.html',
  styleUrls: ['./dialog-edit-colums-operational-reports.component.scss']
})
export class DialogEditColumsOperationalReportsComponent implements OnInit {

  constructor(public _services: ServiceGeneralService,
              public dialogRef: MatDialogRef < DialogEditColumsOperationalReportsComponent > , 
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  userFilter: any = { name: '' };

  public simpleList:any = [];

  caColumns: any[] = [];

  idEdit: any[] = [];

  ngOnInit(): void {
    console.log(this.data);
    if(this.data.colums != undefined){
      if(this.data.colums.length > 0){
        for (let i = 0; i < this.data.colums.length; i++) {
          const element = this.data.colums[i];
          this.simpleList.push({
            id: element.columns,
            name: element.columnsNavigation.name
          });
          this.idEdit.push(element.id);
        }
      }
    }
    this.catalogos();
  }

  async catalogos(){
    this.caColumns =  await this._services.getCatalogueFrom('GetColumnsReport/1');
  }

  public removeItem(item: any, list: any[]): void {
    list.splice(list.indexOf(item), 1);
  }

  selectColumn($event, item){
    if($event.checked){
      this.simpleList.push(item);
      this.idEdit.push(0);
    }else{
      for (let i = 0; i < this.simpleList.length; i++) {
        const element = this.simpleList[i];
        if(item.id == element.id){
          this.simpleList.splice(i,1);
          this.idEdit.splice(i,1);
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

  save(){
    
    this.dialogRef.close({success:true,data:this.simpleList, id: this.idEdit});
  }

}
