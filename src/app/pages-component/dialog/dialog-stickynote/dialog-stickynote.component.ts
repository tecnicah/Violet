import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { LoaderComponent } from 'app/shared/loader';
import { DialogGeneralMessageComponent } from './../general-message/general-message.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-stickynote',
  templateUrl: './dialog-stickynote.component.html',
  styleUrls: ['./dialog-stickynote.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class DialogStickynoteComponent implements OnInit {
  notes = [];
  recognition: any;
  user: any;
  stick: any[] = [];

  constructor(private el: ElementRef, public _services: ServiceGeneralService, public _dialog: MatDialog,) {
  }
  public __loader__: LoaderComponent = new LoaderComponent();

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this._services.service_general_get(`PostIt/All/${this.user.id}`).subscribe(resp => {
      console.log('stick', resp);
      if (resp.success) {
        this.stick = resp.result;
        // this.addNote();
      }
    });
  }
  // getAllStick()

  updateAllNotes() {
    console.log(document.querySelectorAll('app-stickynote'));
    let notes = document.querySelectorAll('app-stickynote');

    notes.forEach((note, index)=>{
         console.log(note.querySelector('.content').innerHTML)
         this.notes[note.id].content = note.querySelector('.content').innerHTML;
    });

    localStorage.setItem('notes', JSON.stringify(this.notes));

  }
  addNote() {
    this.stick.push({
      id: 0, post: '', color: '', createdBy: this.user.id,
      createdDate: new Date, updatedBy: this.user.id, updatedDate: new Date
    });
    // this.stick.push({ id: this.stick.length + 1,content:'' });
    // this.stick= this.stick.sort((a,b)=>{ return b.id-a.id});
    // localStorage.setItem('stick', JSON.stringify(this.stick));
  };

  saveNote(event){
    const id = event.srcElement.parentElement.parentElement.getAttribute('id');
    const content = event.target.innerText;
    event.target.innerText = content;
    const json = {
      'id':id,
      'content':content
    }
    this.updateNote(json);
    localStorage.setItem('notes', JSON.stringify(this.notes));
    console.log("********* updating note *********")
  }

  updateNote(newValue){
    this.notes.forEach((note, index)=>{
      if(note.id== newValue.id) {
        this.notes[index].content = newValue.content;
      }
    });
  }

  deleteNote(id) {
    console.log('delete', id);
    if (id == 0 ) {
      this.stick.splice(id);
      this.ngOnInit();
    } else {
      this._services.service_general_delete(`PostIt?key=${id}`).subscribe(resp => {
      if (resp.success) {
        console.log('borrar stick', resp);
        // this.ngOnInit();
      }
    });
    }

    //  const id = event.srcElement.parentElement.parentElement.parentElement.getAttribute('id');
    //  this.notes.forEach((note, index)=>{
    //   if(note.id== id) {
    //     this.notes.splice(index,1);
    //     localStorage.setItem('notes', JSON.stringify(this.notes));
    //     console.log("********* deleting note *********")
    //     return;
    //   }
    // });
  }
  updateStick(data) {
    if (data.id == 0) {
      if (data.post == '') {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "warning",
            body: "Write a note"
          },
          width: "350px"
        });
      }
      else {
        this.__loader__.showLoader();
        this._services.service_general_post_with_url("PostIt", {
          id: 0,
          post: data.post,
          color: '',
          createdBy: this.user.id,
          createdDate: new Date(),
          updatedBy: this.user.id,
          updatedDate: new Date()
        }).subscribe(r => {
          console.log(r);
          if (r.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Insert sticky note"
              },
              width: "350px"
            });
            this.ngOnInit();
          }
        })
      }
    }
    else {
      console.log('update', data);
      data.updatedBy = this.user.id;
      data.updatedDate = new Date();
      this._services.service_general_put('PostIt', data).subscribe(resp => {
        if (resp.success) {
          console.log('actualizado stick', resp);
          // this.ngOnInit();
        }
      });
    }
  }

   record(event) {
    this.recognition.start();
    this.addNote();
  }




}
export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}

