import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';


@Component({
  selector: 'app-dialog-request-additional-time',
  templateUrl: './dialog-request-additional-time.component.html',
  styleUrls: ['./dialog-request-additional-time.component.css']
})
export class DialogRequestAdditionalTimeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef < any > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) {}
    public __loader__: LoaderComponent = new LoaderComponent();

  caServiceLine         :any[] = [];
  caService             :any[] = [];
  user                  :any   = {};
  wos                   :any[] = [];
  allUser               :any[] = [];
  userReport            :any   = {};
  sr                    :any;
  caNumbers             :any[] = [];
  requestData           :any[] = [];

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.getWorkOrders();
    for (let i = 1; i < 49; i++) {
      this.caNumbers.push(i);      
    }
  }

  getWorkOrders(){
    console.log("ENTRA A WORK ORDERS");
    this._services.service_general_get('Catalogue/GetWorkOrderByServiceLine?sr='+Number(this.data.sr)+'&sl=2').subscribe(r=>{
      if(r.success){
        console.log(r.result); 
          this.wos = r.result;
          if(this.wos.length == 0){ this.message(); }
          if(this.requestData.length == 0){
            this.addRequest();
          }
        }
      })
    }

  message(){
    const dialog = this._dialog.open(DialogGeneralMessageComponent, {
      data: {
        header: "Attention",
        body: "To request additional time it is necessary to have relocation services available"
      },
      width: "350px"
    });

    setTimeout(() => {
      this.dialogRef.close();
    }, 3000);
  }


  getService(i){
    this._services.service_general_get('Catalogue/GetServiceByWorkOrder?wo='+this.requestData[i].workOrder+'&idUser='+this.user.id).subscribe(r=>{
      console.log(r);
      if(r.success){
        this.caService[i] = r.result.value;
        if(r.result.value.length == 0){
          const dialog = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Pending to accept",
              body: "The supplier has not accepted the assigned services"
            },
            width: "350px"
          });
         }
      }
    });
  }

  addRequest(){
    this.requestData.push(
      {
        id:           0,
        workOrder:    null,
        service:      null,
        requestTime:  null,
        comments:     null,
        createdBy:    this.user.id,
        createdDate:  new Date(),
        updateBy:     this.user.id,
        updatedDate:  new Date(),
      }
    )
  }

  delete(i){
    this.requestData.splice(i,1);
  }

  save(){
    
    console.log("SAVE REQUEST TIME: ",this.requestData);
   
   let contador = 0;
   this.requestData.forEach(E => {
     if(E.comments == null || E.requestTime == null || E.service == null || E.workOrder == null){
       contador ++;
     }
   });
    
   console.log("Data final: ", JSON.stringify(this.requestData));
   if(contador == 0){
    this.__loader__.showLoader();
    this._services.service_general_post_with_url("RequestAdditionalTime/PostRequestAdditionalTime", this.requestData).subscribe((data => {
      if(data.success){
        console.log(data);
         const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Save Data"
              },
              width: "350px"
            });
            this.__loader__.hideLoader();
            this.ngOnInit();
      }
    }))
   }else{
    const dialog = this._dialog.open(DialogGeneralMessageComponent, {
      data: {
        header: "Attention",
        body: "All fields are required"
      },
      width: "350px"
    });
     console.log("la informacion es requerida");
     return true;
   }


  }

}
