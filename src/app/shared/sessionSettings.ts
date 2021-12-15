import { Router } from '@angular/router';
import { LoaderComponent } from './loader';
export class SessionSettings {

    public local_time_data:any = JSON.parse( localStorage.getItem('user_expiration') );
    public __loader__:LoaderComponent = new LoaderComponent();

    constructor(
        public _router:Router
    ) {}

    public canContinueInMySession():any {

        if( this.local_time_data == null || this.local_time_data == undefined ) {

           this.__loader__.showLoader();

           setTimeout( () => {

            this.notMoreSessionTime();

           }, 1077);

        } else {

            const date_in:Date = new Date( this.local_time_data.date ),
                actual_date:Date = new Date(),
                day_in:number = date_in.getDate(),
                day_out:number = actual_date.getDate();

            if( day_in != day_out ) {

                this.notMoreSessionTime();

            } 

        }

    }

    public notMoreSessionTime():void {

        this.__loader__.hideLoader();
        localStorage.removeItem('userData');
        this._router.navigateByUrl('');

    }

}