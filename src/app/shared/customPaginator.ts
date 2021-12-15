import { ServiceGeneralService } from '../service/service-general/service-general.service'; 
export class CustomPaginator {

    constructor(
        public _services: ServiceGeneralService
    ) {}

    private paginator_working:any = undefined;
    private ws_url:string = '';
    public data_got_from_ws:any = undefined;
    public page_number:any = '1';
    public page_size:any = '2';
    public total_pages:number = 0;
    public paginator_logic:string = `?pageNumber=${ this.page_number }&Pagesize=${ this.page_size }`;

    public initNewPaginator( id_name:string, web_service_name:string ) {

        this.paginator_working = document.querySelector('[' + id_name  + ']');

        this.ws_url = web_service_name;

        this.initPaginatorActions( this.paginator_working );

    }

    private initPaginatorActions( paginator:any ) {
        
        const number_buttons:any = paginator.querySelectorAll('[number]'),
            holdPageActive = () => {

                number_buttons.forEach( (number:any) => {

                    number.classList.remove('cusomPaginator__number--active');

                    if( this.page_number == number.innerHTML ) {

                        number.classList.add('cusomPaginator__number--active');  

                    }

                });

            };

        let number_selected:string = '1';

        paginator.querySelector('[preview]').addEventListener('click', (event:any) => {
            
            event.preventDefault();
            
            number_buttons.forEach( (number:any) => {

                let current_number:any = number.innerHTML;

                if(
                    number_buttons[0].innerHTML != '1' &&
                    number_buttons[1].innerHTML != '2' &&
                    number_buttons[2].innerHTML != '3' &&
                    number_buttons[3].innerHTML != '4'
                ) {

                    number.innerHTML = Number( current_number ) - 1;
                    paginator.querySelector('[previous]').classList.remove('no-visible');
                    

                }

            });

            if( number_buttons[0].innerHTML == '1' ) {
                number_buttons[0].innerHTML = '1';
                number_buttons[1].innerHTML = '2';
                number_buttons[2].innerHTML = '3';
                number_buttons[3].innerHTML = '4';
                paginator.querySelector('[preview]').classList.add('no-visible');
            }

            holdPageActive();

        });

        paginator.querySelector('[previous]').addEventListener('click', (event:any) => {

            event.preventDefault();
            
            number_buttons.forEach( (number:any) => {

                let current_number:any = number.innerHTML;

                number.innerHTML = Number( current_number ) + 1;

                paginator.querySelector('[preview]').classList.remove('no-visible');

                if( number_buttons[3].innerHTML > this.total_pages ) {

                    number_buttons[3].innerHTML = this.total_pages;
                    number_buttons[2].innerHTML = this.total_pages - 1;
                    number_buttons[1].innerHTML = this.total_pages - 2;
                    number_buttons[0].innerHTML = this.total_pages - 3;
                    paginator.querySelector('[previous]').classList.add('no-visible');

                }

            });
            
            holdPageActive();

        });

        number_buttons.forEach( (number:any) => {

            number.addEventListener('click', (event:any) => {

                number_buttons.forEach( (number:any) => {

                    number.classList.remove('cusomPaginator__number--active');

                });

                event.target.classList.add('cusomPaginator__number--active');

                number_selected = event.target.innerHTML;

                this.page_number = number_selected;

                this.paginator_logic = `?pageNumber=${ this.page_number }&Pagesize=${ this.page_size }`;

                this.requestDataToWS();

                this.paginatorRequest();

            });

        });

        this.requestDataToWS();

    }
    
    private requestDataToWS():void {

        const url:string = this.ws_url + this.paginator_logic;

        this._services.service_general_get(`${ url }`)
            .subscribe( (response:any) => {

                if( response.success ) {

                    this.data_got_from_ws = response;
                    this.total_pages = response.total_record / this.page_size;

                }

            }, (error:any) => {

                console.error('Error Paginador WSRequest => ', error);

            });

    }

    public paginatorRequest():any {

        return this.data_got_from_ws;

    }

}