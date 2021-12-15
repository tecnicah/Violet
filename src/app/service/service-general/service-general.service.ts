import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { MessageDto, ChatConversation } from '../../model/chat/MessageDto';
import { NgxPermissionsService } from 'ngx-permissions';
import { DashboardComponent } from 'app/pages-component/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class ServiceGeneralService {

  private url_chat: any = new signalR.HubConnectionBuilder()
    .withUrl(`${environment.images_path}` + 'chatsocket')   // mapping to the chathub as in startup.cs
    .withAutomaticReconnect()
    .build();

  url_api = `${environment.API_URL}`;
  url_images = `${environment.images_path}`;
  headers = new HttpHeaders();

  public chat_test:any;
​
  menu: boolean = true;
  small: boolean = false;
  big:   boolean = true;
  private receivedMessageObject:any = '';
  private sharedObj = new Subject<any>();
​
  constructor(private http: HttpClient, public permissionsService: NgxPermissionsService) {
    this.url_chat.onclose(async () => {
      await this.start();
    });
    this.url_chat.on("ReceiveOne", (user) => { this.mapReceivedMessage( this.chat_test ); });
    this.start();
  }
​
  
  // Strart the connection
  public async start() {
    try {
      console.log("connectedppppppppppp");
      await this.url_chat.start();
      console.log("connected");
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    }
  }
​
  /*private mapReceivedMessage(user: string, message: string): void {
    this.receivedMessageObject.user = user;
    this.receivedMessageObject.msgText = message;
    this.sharedObj.next(this.receivedMessageObject);
  }*/

  private mapReceivedMessage( chat_model:any ): void {
    console.log('El Chat =====> ', chat_model);
    this.sharedObj.next(this.receivedMessageObject);
  }

  public retrieveMappedObject(): Observable<any> {
    return this.sharedObj.asObservable();
  }

  /* Arriba estan los servicios del chat */

  service_general_post_with_url(url, parametros): Observable<any> {
    return this.http.post(this.url_api + url, parametros, { headers: this.headers });
  }

  service_general_post_with_urlnoapi(url, parametros): Observable<any> {
    return this.http.post(this.url_images + url, parametros, { headers: this.headers });
  }

  public service_general_put(url, parametros): Observable<any> {
    return this.http.put(this.url_api + url, parametros, { headers: this.headers });
  }

  public service_general_putnoapi(url, parametros): Observable<any> {
    return this.http.put(this.url_images + url, parametros, { headers: this.headers });
  }

  public service_general_get(url): Observable<any> {
    return this.http.get(this.url_api + url, { headers: this.headers });
  }

  public service_general_get_noapi(url): Observable<any> {
    return this.http.get(this.url_images + url, { headers: this.headers });
  }

  public service_general_delete(url:string):Observable<any> {
    return this.http.delete(this.url_api + url, { headers: this.headers });
  }

  public service_general_deleteparam(url, parametros): Observable<any> { this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8')
    return this.http.delete(this.url_api + url, { headers: this.headers, params: parametros });
  }

  public service_general_deleteno_api(url:string):Observable<any> {
    return this.http.delete(this.url_images + url, { headers: this.headers });
  }

  public service_general_delete_with_url(url): Observable<any> {
    return this.http.delete(this.url_api + url, { headers: this.headers });
  }

  /* Catalogos */
  public getCatalogueFrom(catalogo_selected, params: string = ''): any {
    const query = this.http.get(this.url_api + 'Catalogue/' + catalogo_selected + params, { headers: this.headers }),
      query_on = new Promise((resolve) => {
        query.subscribe((response) => {
          resolve(response);
        }, (error) => {
          resolve(error);
        });
      });
    return query_on.then((result: any) => {
      if (result.success) return result.result;
      else return 'Error al pedir el catalogo.';
    });
  }

  private user_data:any = JSON.parse(localStorage.getItem("userData") );
  public getrol():string[] {
    //let rol: any[] = [localStorage.getItem("rol")];
    const roles:string[] = [this.user_data.role.role];
    //console.log('Rol desde el Sercixio ==> ', this.user_data.role.role);
    //console.log('User ==> ', this.user_data);
    //const roles:string[] = ['Supplier']; // Supplier Coordinator Manager
    //console.log('Roles in (Service/getrol) ====> ', roles);
    //this.permissionsService.loadPermissions( roles );
    return roles;
  }

}
