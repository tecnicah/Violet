import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';

import { DialogGeneralMessageComponent } from '../general-message/general-message.component';
import { DialogAddConclusionCompletionReportComponent } from './../dialog-add-conclusion-completion-report/dialog-add-conclusion-completion-report.component';
import { GeneralConfirmationComponent } from './../general-confirmation/general-confirmation.component';

@Component({
  selector: 'app-dialog-completion-report-relocation',
  templateUrl: './dialog-completion-report-relocation.component.html',
  styleUrls: ['./dialog-completion-report-relocation.component.css']
})
export class DialogCompletionReportRelocationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef < any > ,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _services: ServiceGeneralService,
    public _dialog: MatDialog) { }
    show: boolean = false;
    loader: LoaderComponent = new LoaderComponent();
    user: any;
    dataCompletionReport: any[] = [];
    generalSummary: any;
    relocationSummary: any[] = [];
    displayedColumnsRelocationSummary: string[] = ['Services', 'Location', 'Status', 'Autho Date', 'End Date', 'Authorized Hours'];
    columnsDetailRelocation: string[] = ['Activity', 'Location', 'Status', 'Autho Date', 'End Date', 'Documents', 'Suppliers'];
    columnsDetailActivity: string[] = ['Activity', 'StartDate', 'completedDate', 'hoursUsed'];

    detailRelocation: any[] = [];
    public image_path: string = this._services.url_images;


  ngOnInit(): void {
    this.loader.showLoader();
    this.user = JSON.parse(localStorage.getItem("userData"));
    console.log("Data que recibe el modal:", this.data);
    this.getCompletionReport();
  }
  getCompletionReport() {
    this._services.service_general_get(`ServiceRecord/CompleteReport?sr=${this.data.sr}&serviceLine=${this.data.serviceLice}`).subscribe(resp => {
      if (resp.success) {
        this.dataCompletionReport = resp.result.value;
        this.generalSummary = resp.result.value.generalSummary[0];
        this.relocationSummary = resp.result.value.relocationSummary;
        this.detailRelocation = resp.result.value.detailRelocation;
        console.log('completion report', this.dataCompletionReport);
        console.log('generalSummary', this.generalSummary);
        console.log('relocationSummary', this.relocationSummary);
        console.log('detailRelocation', this.detailRelocation);

        this.loader.hideLoader();
      }
    });
    // this.getCatalogs();
    this.show = true;
    
  }
  async getCatalogs() {

  }
  addConclution(id) {
    console.log('add conclusion', id);
    const dialogRef = this._dialog.open(DialogAddConclusionCompletionReportComponent, {
      width: "70%",
      data: {id: id },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  deleteDocument(id) {
    console.log('id a borrar', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete Conclusion?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete("ReportDay/Delete/Conclusion?key=" + id).subscribe((data => {
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Conclusion deleted"
              },
              width: "350px"
            });
            this.ngOnInit();
          }
        }))
      }
    })  }
  showDocumentDialogDetails() {

  }
  send() {
    this._services.service_general_post_with_url(`ServiceRecord/CompleteReport/Save?sr=${this.data.sr}&serviceLine=${this.data.serviceLice}`, '').subscribe(resp => {
      let res;
      if (resp.success) {
        res = "Success"
      }
      else {
        res ="Error"
      }
      this.dialogRef.close();
      const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: res,
          body:   res.message
        },
        width: "350px"
      })
      dialogRef.afterClosed().subscribe(result => {
      });

    }, error =>
      {
        console.log(error.error.message);
        this.dialogRef.close();
        const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Error",
            body:   error.error.message
          },
          width: "350px"
        })
      }
    )

  }

}
