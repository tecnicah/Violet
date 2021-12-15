import { HtmlParser } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from '../general-message/general-message.component';

@Component({
  selector: 'app-dialog-evaluate',
  templateUrl: './dialog-evaluate.component.html',
  styleUrls: ['./dialog-evaluate.component.css']
})
export class DialogEvaluateComponent implements OnInit {

  rating: any[] = [];
  p: number = 1;
  boton: string = "Continue";

  constructor(public dialogRef: MatDialogRef < any > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) {}

  suplierData: any[] = [];

  user:        any   = {};

  dataSend: any = {};
  today = new Date();

  public __loader__: LoaderComponent = new LoaderComponent();
  ngOnInit(): void {
    console.log('data que recibe', this.data);
    this.user = JSON.parse(localStorage.getItem("userData"));
    this.dataSend = {
      id: 0,
      serviceRecord: this.data.sr,
      workOrderServicesId:  null,
      serviceLine: this.data.sl,
      completeServiceRecord: true,
      completedDate: this.today,
      name: this.user.name+" "+this.user.lastName+" "+this.user.motherLastName,
      createdBy: this.user.id,
      createdDate: new Date(),
      updatedBy: this.user.id,
      updatedDate: new Date(),
      experienceSurveySuppliers: []
    }

    // get que trae la informacion del suplier correspondiente a la sl

    this._services.service_general_get(`ServiceRecord/SupplierServiceConsultant/${this.data.sr}`)
    .subscribe((response: any) => {
      if (response.success) {
        this.suplierData = response.result.value;
        console.log('supplier', this.suplierData);
        for (let i = 0; i < this.suplierData.length; i++) {
          const element = this.suplierData[i];
          // esta es la data para pintar html
          this.dataSend.experienceSurveySuppliers.push({
            id: 0,
            experienceSurveyId: this.dataSend.id,
            supplierService: 0,
            supplierConsultant: element.supplierId,
            supplier: element.name, //nombre
            // supplierType: element.supplierType,
            general: 0,
            serviceQuality: 0,
            punctuality: 0,
            attention: 0,
            professionalism: 0,
            price: 0,
            responseTime: 0,

            createdBy: this.user.id,
            createdDate: new Date(),
            updatedBy: this.user.id,
            updatedDate: new Date()
          })
        }

        if(this.suplierData.length < 3){
          this.boton = "Save";
        }
      }
    })

  }



  name(id){
    for (let i = 0; i < this.suplierData.length; i++) {
      const element = this.suplierData[i];
      if(element.id == id){
        return element.supplier+" / "+element.supplierType;
      }
    }
  }

  continue(){
    let next = document.getElementsByClassName("pagination-next ng-star-inserted disabled");
    console.log(next.length);


    if(next.length == 1){
      this.__loader__.showLoader();
      this.dataSend.completeServiceRecord = true;
      console.log(this.dataSend);
      this._services.service_general_post_with_url('ExperienceSurvey/CreateExperienceSurvey',this.dataSend).subscribe((r =>{
        if(r.success){
          this.__loader__.hideLoader();
          this.dialogRef.close();
          const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body:   "Experience Survey updated"
            },
            width: "350px"
          })


          dialogRef.afterClosed().subscribe(result => {
            //console.log('The dialog was closed');
          });
        }
      }))
    }else{
      this.p = this.p+1;
    }

    setTimeout( () =>{
      next = document.getElementsByClassName("pagination-next ng-star-inserted disabled");
      console.log(next.length);
      if(next.length == 1){
        this.boton = "Save";
      }
    },1)
  }

}
