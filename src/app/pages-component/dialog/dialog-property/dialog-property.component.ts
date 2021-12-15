import { Component, OnInit } from '@angular/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-dialog-property',
  templateUrl: './dialog-property.component.html',
  styleUrls: ['./dialog-property.component.scss']
})
export class DialogPropertyComponent implements OnInit {

  dataSource:any[] = [];
  displayedColumns: string[] = ['Requested By', 'Authorized By', 'Autho Date', 'Autho Acceptance Date', 'Time'];
  ELEMENT_DATA:   any[] = [
      {uno: 'Lorem Ipsum', dos:'Lorem Ipsum', tres: '20 Sep 2020', cuatro: '20 Sep 2020', cinco: '10'},
      {uno: 'Lorem Ipsum', dos:'Lorem Ipsum', tres: "20 Sep 2020", cuatro: '20 Sep 2020', cinco: '10'}
  ];

  dataSourceBANK:any[] = [];
  displayedColumnsBANK: string[] = ['Beneficiarys Name', 'CLABE', 'Bank', 'Comments', 'Actions'];
  ELEMENT_DATABANK:   any[] = [
      {uno: 'Lorem Ipsum', dos:'Lorem Ipsum', tres: "20 Sep 2020", cuatro: '20 Sep 2020'},
      {uno: 'Lorem Ipsum', dos:'Lorem Ipsum', tres: "20 Sep 2020", cuatro: '20 Sep 2020'}
  ];

  dataSourcePROPERTY:any[] = [];
  displayedColumnsPROPERTY: string[] = ['Section', 'Comments', 'Actions'];
  ELEMENT_DATAPROPERTY:   any[] = [
      {uno: 'Lorem Ipsum', dos:'Lorem Ipsum Lorem Ipsum'},
      {uno: 'Lorem Ipsum', dos:'Lorem Ipsum Lorem Ipsum'}
  ];

  dataSourceREPORT:any[] = [];
  displayedColumnsREPORT: string[] = ['Severity', 'Description','Status', 'Photos', 'Quote Approval', 'Actions'];
  ELEMENT_DATAREPORT:   any[] = [
      {uno: 'Lorem Ipsum', dos:'Lorem Ipsum Lorem Ipsum', tres: 'lorem', cuatro: '10', cinco: 'lorem lorem'},
      {uno: 'Lorem Ipsum', dos:'Lorem Ipsum Lorem Ipsum', tres: 'lorem', cuatro: '10', cinco: 'lorem lorem'}
  ];

  dataSourcePayment:any[] = [];
  ELEMENT_DATA_PAYMENT:   any[] = [
    {uno: 0, dos:'Lorem Ipsum', tres: "20 Sep 2020", cuatro: '20 Sep 2020', cinco: '$1,234.00', seis: 'Request'},
    {uno: 0, dos:'Lorem Ipsum', tres: "20 Sep 2020", cuatro: '20 Sep 2020', cinco: '$1,234.00', seis: 'Paid'},
    {uno: 0, dos:'Lorem Ipsum', tres: "20 Sep 2020", cuatro: '20 Sep 2020', cinco: '$1,234.00', seis: 'Invoiced'},
    {uno: 0, dos:'Lorem Ipsum', tres: "20 Sep 2020", cuatro: '20 Sep 2020', cinco: '$1,234.00', seis: 'Request'},
  ];
  displayedColumnsPayment: string[] = ['Invoice No.', 'Description', 'Invoice Date', 'Due Date', 'Amount', 'Status', 'action'];


  ngOnInit(): void {
    this.dataSource = this.ELEMENT_DATA;
    this.dataSourceBANK = this.ELEMENT_DATABANK;
    this.dataSourcePROPERTY = this.ELEMENT_DATAPROPERTY;
    this.dataSourceREPORT = this.ELEMENT_DATAREPORT;
    this.dataSourcePayment = this.ELEMENT_DATA_PAYMENT;
  }


  //****************************************************************************************//
  //**FUNCIONES PARA CARGA DE ARCHIVOS**//
  public dropped(files: NgxFileDropEntry[]) {
    //this.files = files;
    for (const droppedFile of files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {
 
          // Here you can access the real file
          //console.log(droppedFile.relativePath);
          //console.log(file, this.files);
          
          fileEntry.file(file => {
            reader.readAsDataURL(file);
            reader.onload = () => {
                let imageUrl = reader.result;
                let encoded = imageUrl.toString().replace(/^data:(.*;base64,)?/, '');
                          if ((encoded.length % 4) > 0) {
                            encoded += '='.repeat(4 - (encoded.length % 4));
                          }
                      
              
                  let ext = file.type.split("/");
                /*
                this.temporalDocument.push({
                  fileRequest: encoded,
                  fileExtension: ext[1],
                  entryVisaId: this.entryVisa.id,
                  createdBy: this.user.id,
                  createdDate: new Date(),
                  name: droppedFile.relativePath
                });
                */
            };
        });


        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }

}
