export class LoaderComponent {

    public loader_component:any = document.getElementById('loader_component');

    public showLoader():void {

        if( this.loader_component != undefined ) {

            this.loader_component.classList.remove('display-none');

        }

    }

    public hideLoader():void {

        if( this.loader_component != undefined ) {

            this.loader_component.classList.add('display-none');

        }

    }

}