import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogExportComponent } from 'app/pages-component/dialog/dialog-export/dialog-export.component';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { PdfMakeWrapper, Table, Cell, Columns, Txt } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake

@Component({
  selector: 'app-all-active-services',
  templateUrl: './all-active-services.component.html',
  styleUrls: ['./all-active-services.component.scss']
})
export class AllActiveServicesComponent implements OnInit {

  @ViewChild('immisort') immisort: MatSort;
  @ViewChild('immipag') immipag: MatPaginator;

  constructor(public _service: ServiceGeneralService,
    public dialog: MatDialog,
    public router: Router) { }
  ca_country: any[] = [];

  datasource:any = [];
  filter: any = { country: null };
  public filterCountry: any = { name: '' };


  filterdos:boolean = false;

  displayedColumns: string[] = ['Country', 'Immigration', 'Relocation', 'Total'];

  ngOnInit(): void {
    this.catalogos();
    this.getData();
  }

  getData(){
    this._service.service_general_get('Activity/GetAllActiveServices?country='+this.filter.country).subscribe(r =>{
      if(r.success){
        this.datasource = new MatTableDataSource(r.result.value);
        setTimeout(() => {
          this.datasource.paginator = this.immipag;
          this.datasource.sort = this.immisort;
        }, 10);
      }
    })
  }

  async catalogos(){
    this.ca_country = await this._service.getCatalogueFrom('GetCountry');
  }

  Redirect(name){
    for (let i = 0; i < this.ca_country.length; i++) {
      const element = this.ca_country[i];
      if(element.name == name){
        this.router.navigateByUrl('/reports/'+element.name+'/'+element.id);
      }
    }
  }

  clearFilter() {
    this.filterCountry = { name: '' };
    this.filter ={
      country:  null
    };
    this.filterdos = true;
        setTimeout(() => {
        this.filterdos = false;
    }, 2000);
    this.getData();
  }

  showExportDialog(){
    const dialogRef = this.dialog.open(DialogExportComponent, {
        data: this.datasource.filteredData,
        width: "40%"
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if(result === 1){
            document.getElementById("excel").click();
        }

        if(result === 2){
            let tabla = [['Country', 'Immigration', 'Relocation', 'Total']]
            for (let i = 0; i < this.datasource.filteredData.length; i++) {
                const element = this.datasource.filteredData[i];
                tabla.push([
                    element.name,
                    element.immigration,
                    element.relocation,
                    element.total
                  ])
            }
            console.log(tabla);
              // Set the fonts to use
            PdfMakeWrapper.setFonts(pdfFonts);

            const pdf = new PdfMakeWrapper();

            pdf.pageMargins([50,50,50,50]);
            pdf.pageOrientation('portrait');
            pdf.defaultStyle({
                fontSize: 12,
                alignment: 'center'
            });
            pdf.add(new Table(tabla).layout('lightHorizontalLines').end);
            pdf.create().download('All_active_services_Report.pdf');

        }
    });
  }

}
