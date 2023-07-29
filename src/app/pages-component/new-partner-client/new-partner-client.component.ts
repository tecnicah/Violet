import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { DialogContractPricingInfoComponent } from '../dialog/dialog-contract-pricing-info/dialog-contract-pricing-info.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogActivityLogComponent } from '../dialog/dialog-activity-log/dialog-activity-log.component';
import { DialogTermsOfTheDealComponent } from '../dialog/dialog-terms-of-the-deal/dialog-terms-of-the-deal.component';
import { split } from '@angular-devkit/core';
import { DialogOfficeInformationComponent } from '../dialog/dialog-office-information/dialog-office-information.component';
import { DialogAddClientComponent } from '../dialog/dialog-add-client/dialog-add-client.component';
import { LoaderComponent } from 'app/shared/loader';
import { DialogAddServiceComponent } from '../dialog/dialog-add-service/dialog-add-service.component';
import { DialogDocumentsLeadClientComponent } from '../dialog/dialog-documents-lead-client/dialog-documents-lead-client.component';
import { DialogScoreAwadsComponent } from '../dialog/dialog-score-awads/dialog-score-awads.component';
import { DialogExperiensTeamComponent } from '../dialog/dialog-experiens-team/dialog-experiens-team.component';
import { DialogGeneralConfirmation } from '../dialog/dialog-general-confirmation/dialog-general-confirmation.component';
import { GeneralConfirmationComponent } from '../dialog/general-confirmation/general-confirmation.component';
import { DialogGeneralMessageComponent } from '../dialog/general-message/general-message.component';
import { DialogContactsComponent } from '../dialog/dialog-contacts/dialog-contacts.component';
import { DialogCropImageComponent } from '../dialog/dialog-crop-image/dialog-crop-image.component';
import { stringify } from 'querystring';

@Component({
  selector: 'app-new-partner-client',
  templateUrl: './new-partner-client.component.html',
  styleUrls: ['./new-partner-client.component.scss']
})

export class NewPartnerClientComponent implements OnInit {

  public __userlog__: any = JSON.parse(localStorage.getItem('userData'));
  public countriesImm = [];
  public countriesRel = [];
  constructor(private rutaActiva: ActivatedRoute,
    public _services: ServiceGeneralService,
    public dialog: MatDialog,
    public router: Router) {}
  partnert: boolean = false;
  lead: boolean = false;
  caCompanyType: any[] = [];
  caResponsiblePremierOffice: any[] = [];
  caLifeCircle: any[] = [];
  caSuccessProbability: any[] = [];
  caReferrelFee: any[] = [];
  caTypeOffice: any[] = [];
  caCountry: any[] = [];
  ccity;
  caExperienceTeamCatalog: any[] = [];
  caDuration: any[] = [];
  caCurrency: any[] = [];
  relo: any = [];
  immi: any = [];

  reloTemp: any = [];
  immiTemp: any = [];
  caCliente: any = [];
  public service_type_ = 1;

  lead_client: any = {};
  generalContractPricingInfos: any;
  activityLogs: any;
  termsDeals: any;
  officeInformations: any;
  client: any;
  serviceLocations: any;
  serviceLocationsimmi: any;
  serviceLocationsrelo: any;
  serviceScoreAwards: any;
  contacts: any;
  filterC: any = { name: "" };
  catalogService;
  caserviceline;

  // filtros
  public filterAssignedLead: any = { name: '' };
  public filterAssignedPartner: any = { name: '' };
  public filterPricingPartner: any = { currency: '' };

  public dataContacts: any;
  public _url = this.rutaActiva.snapshot.params.id; 
  public _imageLocal = "";


  loader: LoaderComponent = new LoaderComponent();


  cuatro: string[] = ['uno', 'dos', 'tres', 'cuatro'];
  cinco: string[] = ['uno', 'dos', 'tres', 'cuatro', 'cinco'];
  seis: string[] = ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis'];
  siete: string[] = ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete'];
  ocho: string[] = ['uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho'];

  public info_row : any = {};
  viewData(data) {
    this.info_row.country  =  data.countriesName;
  }


  @ViewChild(MatSort) sort: MatSort;


  paises(data){
    console.log(data);
    this.countriesImm = [];
    this.countriesImm = data.serviceLocationCountries;
  }
  paises_(data){
    console.log(data);
    this.countriesImm = [];
    this.countriesImm = data.serviceLocationCountries;
  }


  ngAfterViewInit() {
    this.consultaPermisos();
    // this.ServiceLine(1);
    console.log(this.rutaActiva.snapshot.routeConfig.path);
    this.catalogos();

    this.partnert = (this.rutaActiva.snapshot.routeConfig.path == "partner_client/:id") ? true : false;
    this.lead = (this.rutaActiva.snapshot.routeConfig.path == "lead/:id") ? true : false;

    this._services.service_general_get_noapi('GetClientPartnerProfileCatalog').subscribe(r =>{
      if(r.success){
        this.caCliente = r.result.value;
      }
    })

    if (this.rutaActiva.snapshot.params.id == 'new') {

      if (localStorage.getItem('user') == 'userClient' ) {
        this.lead_client.idTypePartnerClientProfile = 2;
        this.lead_client.name = (localStorage.getItem('name'));
        localStorage.removeItem('user');
        localStorage.removeItem('name');

       }


       this.lead_client.idCompanyType = 2; 
       setTimeout(() => {
        this.lead_client.belongsToPartner = parseInt(localStorage.getItem('belongsId'));

       }, 300);

      //  this.lead_client.belongsToPartner = localStorage.getItem('belongsId');

      //  console.log("this.lead_client.belongsToPartner",this.lead_client.belongsToPartner);
 
      //  localStorage.removeItem('belongsId');

      this.lead_client.photo = "";
      this.lead_client.partnerClientSince = new Date();
      this.lead_client.id = 0;
      this.lead_client.generalContractPricingInfos = [];
      this.lead_client.activityLogs = [];
      this.lead_client.termsDeals = [];
      this.lead_client.officeInformations = [];
      this.lead_client.clientPartnerProfileClientIdClientFromNavigations = [];
      this.lead_client.documentClientPartnerProfiles = [];
      this.lead_client.serviceLocations = [];
      this.lead_client.serviceScoreAwards = [];
      this.lead_client.clientPartnerProfileExperienceTeams = [];
    } else {
      this.loader.showLoader();
      this._services.service_general_get_noapi('GetClientPartnerProfileById?id=' + this.rutaActiva.snapshot.params.id).subscribe(r => {
        if (r.success) {
          console.log("get client_partner: ", r);
          for (let i = 0; i < r.result.length; i++) {
            const element = r.result[i];
            if (element.id == this.rutaActiva.snapshot.params.id) {
              this.lead_client = element;
              // this.lead_client.relClientPartnerProfilePricingTypes = [];
              this.lead_client.idPricingType = [];
              for (const iterator of this.lead_client.relClientPartnerProfilePricingTypes) {
                this.lead_client.idPricingType.push(
                   iterator.idPricingType
                );
              }
              console.log('this.lead_client',this.lead_client)
            }
          }
          this._imageLocal = this._services.url_images + this.lead_client.photo;
          this.lead_client.clientPartnerProfileExperienceTeams = [];
          this.lead_client.documentClientPartnerProfiles = [];
          this.lead_client.serviceLocations = [];
          this.generalContractPricingInfos = new MatTableDataSource(this.lead_client.generalContractPricingInfos);
          this.activityLogs = new MatTableDataSource(this.lead_client.activityLogs);
          this.termsDeals = new MatTableDataSource(this.lead_client.termsDeals);
          this.officeInformations = new MatTableDataSource(this.lead_client.officeInformations);
          ;
          this.client = new MatTableDataSource(this.lead_client.client);
          console.log("data lead_cliente: ",this.lead_client);

          // contactos de las oficinas
          let contactos: any[]= [];
          if(this.lead_client.officeInformations){
            this.lead_client.officeInformations.forEach(office => {
              if(office.officeContacts.length != 0){
                office.officeContacts.forEach(contact => {
                  contactos.push(contact);
                });
              }
            });
            this.dataContacts = new MatTableDataSource(contactos);
          }
          console.log('contactos', this.dataContacts);


          if (this.partnert) {
            /*
            if (this.lead_client.serviceLocations.length > 0) {
              this.serviceLocationsimmi = new MatTableDataSource(this.lead_client.service_location[0].immi);
              this.serviceLocationsrelo = new MatTableDataSource(this.lead_client.service_location[0].relo);
            }
            */
            // this.serviceLocationsimmi = new MatTableDataSource(this.lead_client?.serviceLocations_Imm);
            // this.serviceLocationsrelo = new MatTableDataSource(this.lead_client?.serviceLocations_Relo);

            console.log('serviceLocationsimmi', this.serviceLocationsimmi);
            console.log('serviceLocationsrelo', this.serviceLocationsrelo);

          }
          console.log("1");
          this.serviceScoreAwards = new MatTableDataSource(this.lead_client.service_score_awards);
          this.contacts = new MatTableDataSource(this.lead_client.contacts);
          this.contacts.sort = this.sort;
          console.log("2");
            this.relo = this.lead_client.experience_team_relo;
            this.immi = this.lead_client.experience_team_imm;


          console.log(this._services.url_images);
          console.log(this.lead_client);
          this.loader.hideLoader();
        }
      })
    }
  }

  //*********************************************//
	public permission_read : boolean = false;
	public permission_write : boolean = false;
	public permission_delete : boolean = false;
  public pathUrl : string = 'https://my.premierds.com/api-test-premier/';
	public permission_edit : boolean = false;
	consultaPermisos(){
		console.log("CONSULTA PARA PERMISOS DE USUARIO");
		let url = localStorage.getItem('url_permisos');
		this._services.service_general_get('Role/'+url).subscribe(data=>{
			if(data.success){
			   console.log("Permisos: ", data.result.value)
			   this.permission_read = data.result.value[0].reading;
			   this.permission_write = data.result.value[0].writing;
			   this.permission_edit = data.result.value[0].editing;
			   this.permission_delete = data.result.value[0].deleting;
			}
		})
  }
  //*********************************************//

  ngOnInit(): void {
    this.getCAtalogoService();

    setTimeout(() => {
      this._services.service_general_get_noapi('GetServiceLocation?id=' + this.rutaActiva.snapshot.params.id + '&serviceLine=' + 2)
      .subscribe(r => {
        console.log("CCCCCCCCCC",r);
        if (r.success) {
          this.lead_client.serviceLocationsrelo = r.result;
          this.serviceLocationsrelo = new MatTableDataSource(this.lead_client?.serviceLocationsrelo);

          console.log('serviceLocationsimmi', this.serviceLocationsrelo);

         
        }
      });

    }, 300);

    // setTimeout(() => {
    //   this.Line(2);
    // }, 5000);
  }
  goBack() {
    window.history.back();
  }

  refresh(id){
    this.router.navigate(['/partner_client/' + id])
    .then(() => {
      window.location.reload();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.contacts.filter = filterValue.trim().toLowerCase();
  }

  public ca_industry = [];
  public ca_contactType = [];
  public caCity = [];
  public ca_Service = [];
  public caParicingType = [];

  public _assigned = [];
  async catalogos() {
    this.caCompanyType = await this._services.getCatalogueFrom('GetCompanyType');
    this.caResponsiblePremierOffice = await this._services.getCatalogueFrom('GetResponsiblePremierOffice');
    this.caLifeCircle = await this._services.getCatalogueFrom('GetLifeCircle');
    this.caSuccessProbability = await this._services.getCatalogueFrom('GetSuccessProbabilityRepository');
    this.caReferrelFee = await this._services.getCatalogueFrom('GetReferrelFee');
    this.caTypeOffice = await this._services.getCatalogueFrom('GetTypeOffice');
    this.caCountry = await this._services.getCatalogueFrom('GetCountry');
    this.caDuration = await this._services.getCatalogueFrom('GetPaymentRecurrence');
    this.caCurrency = await this._services.getCatalogueFrom('GetCurrency');
    ;
    this.caParicingType = await this._services.getCatalogueFrom('GetPricingType','');
    // this.caCity = await this._services.getCatalogueFrom('GetCity');
    console.log(this.caParicingType );

    this.catalogService = await this._services.getCatalogueFrom(`GetCataegoryByServiceLineId?serviceLineId=1`);
    this.ca_contactType = await this._services.getCatalogueFrom('GetContactType?id=2');

    this.caserviceline = await this._services.getCatalogueFrom('GetServiceLine');
    // this.caExperienceTeamCatalog = await this._services.getCatalogueFrom('GetExperienceTeamCatalog/1');
    //this.ca_industry = await this._services.getCatalogueFrom('GetIndustries');
    this._services.service_general_get_noapi('GetExperienceTeamCatalog/1').subscribe(r => {
      if (r.success) {
        this.caExperienceTeamCatalog = r.result.value;
      }
    })

    this._services.service_general_get('Catalogue/GetIndustry').subscribe(r => {
      if (r.success) {
        this.ca_industry = r.result;
      }
    })

    this._services.service_general_get('Catalog/GetAllUsers?role=5').subscribe(r => {
      if (r.success) {
        this._assigned = r.result.value;
        console.log('to assigned', this._assigned);

      }
    });
    // this.getcity();


  }


  // getcity() {
  //   this._services.service_general_get("Catalogue/Generic/Cities/" + this.lead_client.officeInformations[0].officeContacts[0].idCity).subscribe((data => {
  //     if (data.success) {
  //       this.caCity = data.result;
  //       console.log('catalogo city', this.ccity);
  //     }
  //   }))
  // }

  //  public assignedTo = [];
  // cataState(id: number) {
  //   console.log('id state', id );
  //   this.ccity = this._services.service_general_get(`Catalogue/GetState?country=${id}`);
  //   console.log('catalogo state', this.ccity)
  // }


  // getcity(idc: number) {
  //   // console.log('id city', idc);
  //   for (let i = 0; i < this.ccity.length; i++) {
  //     if (this.ccity[i].id == idc) {
  //       return this.ccity[i].GetCountry;
  //     }
  //   }
  // }

  getCountry(id) {
    for (let i = 0; i < this.caCountry.length; i++) {
      if (this.caCountry[i].id == id) {
        return this.caCountry[i].referralFee1;
      }
    }
  }
  ReferrelFee(id:number) {
    for (let i = 0; i < this.caReferrelFee.length; i++) {
      if (this.caReferrelFee[i].id == id) {
        return this.caReferrelFee[i].referralFee1;
      }
    }
  }
  ServiceLine(id) {
    for (let i = 0; i < this.catalogService.length; i++) {
      if (this.catalogService[i].id == id) {
        return this.catalogService[i].category;
      }
    }
  }
  serScoreType(id) {
    for (let i = 0; i < this.caserviceline.length; i++) {
      if (this.caserviceline[i].id == id) {
        return this.caserviceline[i].serviceLine;
      }
    }
  }
  officeType(id) {
    for (let i = 0; i < this.caTypeOffice.length; i++) {
      if (this.caTypeOffice[i].id == id) {
        return this.caTypeOffice[i].type;
      }
    }
  }
  getName(id){
    for (let i = 0; i < this.caExperienceTeamCatalog.length; i++) {
      // const element = this.caExperienceTeamCatalog[i];
      if(this.caExperienceTeamCatalog[i].id == id){
        return this.caExperienceTeamCatalog[i].name;
      }
    }
  }

  get_contacType(id){
    for (let i = 0; i < this.ca_contactType.length; i++) {
      // const element = this.ca_contactType[i];
      if(this.ca_contactType[i].id == id){
        return this.ca_contactType[i].type;
      }
    }
  }
  get_nameCity(id){
    for (let i = 0; i < this.caCity.length; i++) {
      if(this.caCity[i].id == id){
        return this.caCity[i].name;
      }
    }
  }
  get_nameService(id){
    for (let i = 0; i < this.ca_Service.length; i++) {
      if(this.ca_Service[i].service1 == id){
        return this.ca_Service[i].service;
      }
    }
  }
  getCAtalogoService() {
    this._services.service_general_get(`AdminCenter/Services/ClientPartner/${this.service_type_}`).subscribe((data => {
      if (data.result) {
        this.ca_Service = data.result;
        console.log('service immi', this.ca_Service);
      }
    }));
  }






  //////////////////////////////////////////////////////////////////////////////////////
  //Activitie log
  activityLogDialog(data: any, i) {
    console.log(data, i);
    if (data == null) {
      data = {
        id: 0,
        action: "new"
      };
    } else {
      data.action = i;
    }
    const dialogRef = this.dialog.open(DialogActivityLogComponent, {
      data: data,
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {


      if (result.success) {
        if (result.action == "new") {
          result.idClientPartnerProfile = this.lead_client.id;
          this.lead_client.activityLogs.push(result);
        } else {
          this.lead_client.activityLogs[result.action] = result;
        }
        console.log(this.lead_client.activityLogs);
        this.activityLogs = new MatTableDataSource(this.lead_client.activityLogs);
      }

    });
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //contracts
  contractDialog(data: any, i) {
    console.log(data, i);
    if (data == null) {
      data = {
        id: 0,
        action: "new"
      };
    } else {
      data.action = i;
    }
    const dialogRef = this.dialog.open(DialogContractPricingInfoComponent, {
      data: data,
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result.success) {
        result.idClientPartnerProfile = this.lead_client.id;
        if (result.action == "new") {
          if (this.lead_client.id == 0) {
            this.lead_client.generalContractPricingInfos.push(result);
          } else {
            console.log(result);
            this.loader.showLoader();
            this._services.service_general_putnoapi('AddGeneralContractPricingInfo', result).subscribe(r => {
              if (r.success) {
                this.loader.hideLoader();
                const dialog = this.dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "Inserted data"
                  },
                  width: "350px"
                });
                this.ngAfterViewInit();
                console.log(this.lead_client.generalContractPricingInfos);
                this.generalContractPricingInfos = new MatTableDataSource(this.lead_client.generalContractPricingInfos);
              }
              // this.ngAfterViewInit();
            });
          }
        }
        else {
          if (this.lead_client == 0) {
            this.lead_client.generalContractPricingInfos[result.action] = result;
            this.ngAfterViewInit();
          }
          else {
            this.loader.showLoader();
            this._services.service_general_putnoapi('UpdateGeneralContractPricingInfo', result).subscribe(r => {
              if (r.success) {
                
                const dialog = this.dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "Updated data"
                  },
                  width: "350px"
                });
                this.ngAfterViewInit();
                console.log(this.lead_client.generalContractPricingInfos);
                this.generalContractPricingInfos = new MatTableDataSource(this.lead_client.generalContractPricingInfos);
                this.loader.hideLoader();
              }
            })
          }
        }

      }
      else
      {
        this.ngAfterViewInit();
      }
    });
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //terms of the deal
  dealogTermsoftheDeal(data: any, i) {
    console.log(data, i);
    if (data == null) {
      data = {
        id: 0,
        action: "new"
      };
    } else {
      data.action = i;
    }
    const dialogRef = this.dialog.open(DialogTermsOfTheDealComponent, {
      data: data,
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {


      if (result.success) {
        if (result.action == "new") {
          result.idClientPartnerProfile = this.lead_client.id;
          this.lead_client.termsDeals.push(result);
        } else {
          this.lead_client.termsDeals[result.action] = result;
        }
        console.log(this.lead_client.termsDeals);
        this.termsDeals = new MatTableDataSource(this.lead_client.termsDeals);
      }

    });

  }


  //////////////////////////////////////////////////////////////////////////////////////
  //edit contacts

  editcontact(data) {
    const dialogRef = this.dialog.open(DialogContactsComponent, {
      data: data,
      width: '90%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result.success) {
        this.loader.showLoader();
        this._services.service_general_putnoapi('UpdateOfficeContact', result).subscribe(r => {
          console.log(r);
          if (r.success) {
            this.loader.hideLoader();
            const dialog = this.dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: "Update data"
              },
              width: "350px"
            });
            this.ngAfterViewInit();
          }
        })
      }
    })
  }
  getstate(id) {
    this.ccity = [];
    this._services.service_general_get(`Catalogue/GetState?country=${id}`).subscribe(data => {
      if (data.success) {
        this.ccity = data.result;
        console.log(`catalogo de city ${this.ccity}`);
        for (let i = 0; i < this.ccity.length; i++) {
          if (this.ccity[i].id == id) {
            let city = this.ccity[i].city;
            this.lead_client.officeInformations[0]["city"] = city;
            // this.lead_client.officeInformations.push(city);
            console.log('push city', this.lead_client.officeInformations);
          }
        }

      }
    })
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //office information
  dialogOfficeInformation(data, i) {

    console.log(data, i);
    if (data == null) {
      data = {
        id: 0,
        action: "new"
      };
    } else {
      data.action = i;
    }
    const dialogRef = this.dialog.open(DialogOfficeInformationComponent, {
      data: data,
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {


      if (result.success) {
        // console.log('resp office', result);
        result.idClientPartnerProfile = this.lead_client.id;
        if (result.action == "new") {
          if (this.lead_client.id == 0) {
            this.lead_client.officeInformations.push(result);
            this.getstate(this.lead_client.officeInformations[0].idCity);
            console.log('inf oficina', this.lead_client.officeInformations);

          } else {
            console.log(JSON.stringify(result));
            this.loader.showLoader();
            this._services.service_general_putnoapi('AddOfficeInformation', result).subscribe(r => {
              if (r.success) {
                console.log("REGISTRO GUARDADO: ", r);
                this.loader.hideLoader();
                const dialog = this.dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "Inserted data"
                  },
                  width: "350px"
                });
                this.ngAfterViewInit();
              }
            })
          }

        } else {
          if (this.lead_client.id == 0) {
            this.lead_client.officeInformations[i] = result;
          } else {
            this.loader.showLoader();
            this._services.service_general_putnoapi('UpdateOfficeInformation', result).subscribe(r => {
              if (r.success) {
                console.log("REGISTRO ACTUALIZADO OFFICE: ", r);
                this.loader.hideLoader();
                const dialog = this.dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "Update data"
                  },
                  width: "350px"
                });
                this.ngAfterViewInit();
              }
            })
          }
        }
        // console.log(this.lead_client.officeInformations);
        this.officeInformations = new MatTableDataSource(this.lead_client.officeInformations);
        // this.cataState(this.officeInformations.data[0].idCountry);
        console.log(this.officeInformations);
      }

    });

  }
  //////////////////////////////////////////////////////////////////////////////////////
  //Documents
  DialogDocumentsLeadClientComponent(data) {
    if (data == null) {
      data = {
        id: 0
      };
    }

    // data.status = true;
    const dialogRef = this.dialog.open(DialogDocumentsLeadClientComponent, {
      data: data,
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.success) {
        result.comments = "";
        result.description = result.description;
        result.id = 0;
        result.uploadDate = result.updateDate;
        result.idClientPartnerProfile = this.lead_client.id;
        if (this.rutaActiva.snapshot.params.id == "new") {
          result.updateDate = new Date();
          console.log(result);
          this.lead_client.documentClientPartnerProfiles.push(result);
        } else {
          this.loader.showLoader();
          this._services.service_general_putnoapi('AddDocumentClientPartnerProfile', result).subscribe(r => {
            if (r.success) {
              this.loader.hideLoader();
              const dialog = this.dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "Inserted data"
                },
                width: "350px"
              });
              this.ngAfterViewInit();
            }
          })
        }
      }

    });
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //delete client
  deleteDocument(id, i) {
    const dialogRef = this.dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Do you want to delete this document?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        if (id == 0) {
          this.lead_client.documentClientPartnerProfiles.splice(i, 1);
        } else {
          this.loader.showLoader();
          this._services.service_general_deleteno_api("DeleteDocumentClientPartnerProfile?id=" + id).subscribe((data => {
            if (data.success) {
              this.loader.hideLoader();
              const dialog = this.dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "Client document"
                },
                width: "350px"
              });
              this.ngAfterViewInit();
            }
          }))
        }
      }
    })
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //score awards
  DialogScoreAwards(data: any, i) {
    console.log(data, i);
    if (data == null) {
      data = {
        id: 0,
        action: "new"
      };
    } else {
      data.action = i;
    }
    const dialogRef = this.dialog.open(DialogScoreAwadsComponent, {
      data: data,
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {


      if (result.success) {

        result.idClientPartnerProfile = this.lead_client.id;
        if (result.action == "new") {
          if (this.lead_client.id == 0) {
            this.lead_client.serviceScoreAwards.push(result);
          } else {
            this.loader.showLoader();
            this._services.service_general_putnoapi('AddServiceScoreAward', result).subscribe(r => {
              if (r.success) {
                const dialog = this.dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "Inserted data"
                  },
                  width: "350px"
                });
                this.loader.hideLoader();
                this.ngAfterViewInit();
              }
            })
          }

        } else {
          if (this.lead_client.id == 0) {
            this.lead_client.serviceScoreAwards[result.action] = result;
          } else {
            this.loader.showLoader();
            this._services.service_general_putnoapi('UpdateServiceScoreAward', result).subscribe(r => {
              if (r.success) {
                const dialog = this.dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "Update data"
                  },
                  width: "350px"
                });
                this.loader.hideLoader();
                this.ngAfterViewInit();
              }
            })
          }

        }
        console.log(this.lead_client.serviceScoreAwards);
        this.serviceScoreAwards = new MatTableDataSource(this.lead_client.serviceScoreAwards);
      }

    });

  }

  Line(param){
    console.log('param',param);
    if(param.index == 0){
      this.service_type_ = 1;
    }else{
      this.service_type_ = 2;
    }
    this.service_type_ = 2;
    this._services.service_general_get_noapi('GetServiceLocation?id=' + this.rutaActiva.snapshot.params.id + '&serviceLine=' + this.service_type_)
    .subscribe(r => {
      //console.log(r);
      if (r.success) {
        //console.log(r);
        if(this.service_type_ == 1){
          this.lead_client.serviceLocations_Imm = r.result;
          this.serviceLocationsimmi = new MatTableDataSource(this.lead_client?.serviceLocations_Imm);

          console.log('serviceLocationsimmi', this.serviceLocationsimmi);
        }
        if(this.service_type_ == 2){

          this.lead_client.serviceLocations_Relo = r.result;
          this.serviceLocationsrelo = new MatTableDataSource(this.lead_client?.serviceLocations_Relo);

          console.log('serviceLocationsrelo', this.serviceLocationsrelo);
        }
      }
    });

    this.getCAtalogoService();
        //this.service_type_ = param;
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //office information
  _lead_client_table: any = [];
  dialogService(data, i) {
;
    let services: any[]= [{
      action: Number,
      country_total: Number,
      id: Number,
      idClientPartnerProfile: Number,
      idService: Number,
      idServiceLine: Number,
      nickName: String,
      servicesName: String  
    }]; 

    // if(this.service_type_ == 1){

    //   services = this.serviceLocationsimmi?.data;
    // }
    // if(this.service_type_ == 2){

    //   services = this.serviceLocationsrelo?.data;
    // }

    services = this.serviceLocationsrelo?.data;

    console.log(data, i);
    if (data == null) {
      data = {
        id: 0,
        sl: 2,
        action: "new",
        services: services,
        servicelocationcountries: [],
        partnerId: this.rutaActiva.snapshot.params.id
      };
    } else {
      data.service = [];
      data.sl = 2,
      data.action = i;
      services.forEach(element => {
        data.service.push({
          action: 0,
          country_total: element.country_total,
          id: element.id,
          idClientPartnerProfile: element.idClientPartnerProfile,
          idService: element.idService,
          idServiceLine: element.idServiceLine,
          nickName: element.nickName,
          servicesName: element.servicesName,
          servicelocationcountries: element.servicelocationcountries
        });
      });
      data.partnerId = this.rutaActiva.snapshot.params.id
    }
    const dialogRef = this.dialog.open(DialogAddServiceComponent, {
      data: data,
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {

      ;
      // serviceLocationCountries
      // serviceLocationCountries
      if (result.success) {
        console.log('data a guardar', result);
        result.idServiceLine = result.sl;
        result.idClientPartnerProfile = this.lead_client.id;
        if (result.action == "new") {
          if (this.lead_client.id == 0) {
             // cambiar el idService a 0 y services  va con el arreglo
            result.services = result.idService;
            result.idService = 0;
           
            result.services.forEach(element => {
              result.catalogServices.forEach(item => {
                if(element == item.service1){
                  this._lead_client_table.push({
                    id: result.id,
                    servicesName: item.service,
                    nickName: result.nickName,
                    servicelocationcountries: result.servicelocationcountries,
                    obj_guardar: result
                  })
                }
              });              
            });
            this.lead_client.serviceLocations.push(result);
            console.log("AdDDD");

            this.serviceLocationsrelo = new MatTableDataSource(this._lead_client_table);
          }
          else {
            this.loader.showLoader();
            result.services = result.idService;
            result.idService = 0;
            
            console.log(JSON.stringify(result))
            this._services.service_general_putnoapi('AddServiceLocation', result).subscribe(r => {
              if (r.success) {
                console.log(r)
                setTimeout(() => {
                  this._services.service_general_get_noapi('GetServiceLocation?id=' + this.rutaActiva.snapshot.params.id + '&serviceLine=' + 2)
                  .subscribe(r => {
                    //console.log(r);
                    if (r.success) {
                      this.lead_client.serviceLocations_Relo = r.result;
                      this.serviceLocationsrelo = new MatTableDataSource(this.lead_client?.serviceLocations_Relo);
            
                      console.log('serviceLocationsrelo', this.serviceLocationsrelo);
                      // if(this.service_type_ == 1){
                      //   this.lead_client.serviceLocations_Imm = r.result;
                      //   this.serviceLocationsimmi = new MatTableDataSource(this.lead_client?.serviceLocations_Imm);
              
                      //   console.log('serviceLocationsimmi', this.serviceLocationsimmi);
                      // }
                      // if(this.service_type_ == 2){
              
                      //   this.lead_client.serviceLocations_Relo = r.result;
                      //   this.serviceLocationsrelo = new MatTableDataSource(this.lead_client?.serviceLocations_Relo);
              
                      //   console.log('serviceLocationsrelo', this.serviceLocationsrelo);

 
                      // }
                    }
                  });
            
                }, 300);
                const dialog = this.dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "Inserted data"
                  },
                  width: "350px"
                });
                this.loader.hideLoader();
                this.ngAfterViewInit();
              }
            })
          }
        }
        else {
          if (this.lead_client.id == 0) {
            this.lead_client.serviceLocations[result.action] = result;
          } else {
            this.loader.showLoader();
            this.lead_client.services = [];
            if(result.servicelocationcountries){
              for (const iterator of result.servicelocationcountries) {
                //iterator.idCountry = iterator.idCountry[0];
                result.serviceLocationCountries.push(iterator);
              }
              delete result.servicelocationcountries;
            }

            console.log("DATA A ACTUALIZAR: ", result);
            // result.service = [];
            console.log(JSON.stringify(result));
            this._services.service_general_putnoapi('UpdateServiceLocation', result).subscribe(r => {
              if (r.success) {
                console.log(r);
                setTimeout(() => {
                  this.Line(2);
                }, 3000);
                // setTimeout(() => {
                //   this._services.service_general_get_noapi('GetServiceLocation?id=' + this.rutaActiva.snapshot.params.id + '&serviceLine=' + this.service_type_)
                //   .subscribe(r => {
                //     if (r.success) {
                //       if(this.service_type_ == 1){
                //         this.lead_client.serviceLocations_Imm = r.result;
                //         this.serviceLocationsimmi = new MatTableDataSource(this.lead_client?.serviceLocations_Imm);
              
                //         console.log('serviceLocationsimmi', this.serviceLocationsimmi);
                //       }
                //       if(this.service_type_ == 2){
              
                //         this.lead_client.serviceLocations_Relo = r.result;
                //         this.serviceLocationsrelo = new MatTableDataSource(this.lead_client?.serviceLocations_Relo);
              
                //         console.log('serviceLocationsrelo', this.serviceLocationsrelo);
                //       }
                //     }
                //   });
            
                // }, 200);
                const dialog = this.dialog.open(DialogGeneralMessageComponent, {
                  data: {
                    header: "Success",
                    body: "Update data"
                  },
                  width: "350px"
                });
                this.loader.hideLoader();
                this.ngAfterViewInit();
              }
            })
          }

        }
   
        // aqui diferenciamos los servicios dependiendo de la SL
      //   console.log(this.lead_client.serviceLocations);
      //   let immi = [];
      //   let immiRegistro = [];
      //   let relo = [];
      //   let reloRegistro = [];

      //   for (let i = 0; i < this.lead_client.serviceLocations.length; i++)
      //   {
      //     const element = this.lead_client.serviceLocations[i];
      //     if (element.idServiceLine == 1) {
      //       immi.push(element);
      //     } else {
      //       relo.push(element);
      //     }
      //   }
      //   immi.forEach(element => {
      //     for (let o = 0; o < element.services.length; o++) {
      //       let elementS = element.services[o];
      //       element.idPrueba = elementS;
      //       console.log(element);
      //       immiRegistro.push( {
      //       action: element.action,
      //       id: element.id,
      //       idClientPartnerProfile: element.idClientPartnerProfile,
      //       idService: elementS,
      //       idServiceLine: element.idServiceLine,
      //       nickName: element.nickName,
      //       servicelocationcountries: element.servicelocationcountries,
      //       services: element.services,
      //       sl: element.sl,
      //       success: element.success,
      //       });
      //     }
      //   });
      //   relo.forEach(element => {
      //     for (let o = 0; o < element.services.length; o++) {
      //       let elementS = element.services[o];
      //       element.idPrueba = elementS;
      //       console.log(element);
      //       reloRegistro.push( {
      //       action: element.action,
      //       id: element.id,
      //       idClientPartnerProfile: element.idClientPartnerProfile,
      //       idService: elementS,
      //       idServiceLine: element.idServiceLine,
      //       nickName: element.nickName,
      //       servicelocationcountries: element.servicelocationcountries,
      //       services: element.services,
      //       sl: element.sl,
      //       success: element.success,
      //       });
      //     }
      //   });

      //   console.log(immi);
      //   console.log(relo);

      //   console.log('immiRegistro', immiRegistro);
      //   console.log('reloRegistro', reloRegistro);


      //   this.serviceLocationsimmi = new MatTableDataSource(immiRegistro);
      //   this.serviceLocationsrelo = new MatTableDataSource(reloRegistro);
      //   this.serviceLocations = new MatTableDataSource(this.lead_client.serviceLocations);
      // }

    //});
      }
    });

  }


  //////////////////////////////////////////////////////////////////////////////////////
  //client
  dialogExperienceTeam(serviceLine) {

    const dialogRef = this.dialog.open(DialogExperiensTeamComponent, {
      data: {
        id: 0,
        idServiceLine: serviceLine,
        idClientPartnerProfile: this.lead_client.id,
        ruta: this.rutaActiva.snapshot.params.id
      },
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {


      if (result.success) {
        result.idClientPartnerProfile = this.lead_client.id;
        //this.lead_client.clientPartnerProfileExperienceTeams.push(result);
        if(result.idServiceLine == 1){
          this.immiTemp.push(result);
        }else{
          this.reloTemp.push(result);
        }
        console.log(this.reloTemp);
        console.log(this.immiTemp);
      }

      if (result.listo) {
        this.ngAfterViewInit();
      }

    });
  }
  //////////////////////////////////////////////////////////////////////////////////////
  //client
  dialogaddClient() {

    localStorage.setItem('belongsId', this.lead_client.id);

    window.open(window.location.origin + '/demo/partner_client/new', '_blank');


    // this.router.navigate(['/partner_client/new']);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 100);
    // enviar company type

    // const dialogRef = this.dialog.open(DialogAddClientComponent, {
    //   width: '350px'
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('result de client', result);
    //   if (result.success) {
    //     result.id = 0;
    //     result.idClientFrom = this.lead_client.id;
    //     if (this.rutaActiva.snapshot.params.id == "new") {
    //        // valores para pintar en tabla client
    //       for (let i = 0; i < this.caCliente.length; i++) {
    //         const element = this.caCliente[i];
    //         if (element.id == result.idClientTo) {
    //           result.name = element.name;
    //         }
    //       }
    //       this.lead_client.clientPartnerProfileClientIdClientFromNavigations.push(result);
    //       console.log(this.lead_client.clientPartnerProfileClientIdClientFromNavigations);
    //     } else {
    //       this.loader.showLoader();
    //       this._services.service_general_putnoapi('AddClientPartnerProfileClient', result).subscribe(r => {
    //         if (r.success) {
    //           this.loader.hideLoader();
    //           const dialog = this.dialog.open(DialogGeneralMessageComponent, {
    //             data: {
    //               header: "Success",
    //               body: "Inserted data"
    //             },
    //             width: "350px"
    //           });
    //           this.ngAfterViewInit();
    //         }
    //       })
    //     }
    //     // this.caCliente
    //     this.client = new MatTableDataSource(this.lead_client.clientPartnerProfileClientIdClientFromNavigations);
    //   }

    // });

  }
  //////////////////////////////////////////////////////////////////////////////////////
  //delete client
  deletecliente(id, i) {
    const dialogRef = this.dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Do you want to delete this client?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        if (id == 0) {
          this.lead_client.clientPartnerProfileClientIdClientFromNavigations.splice(i, 1);
        } else {
          this._services.service_general_deleteno_api("DeleteClientPartnerProfileClient?id=" + id).subscribe((data => {
            if (data.success) {
              const dialog = this.dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "Client deleted"
                },
                width: "350px"
              });
              this.ngAfterViewInit();
            }
          }))
        }
      }
    })
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //image

  public previewSelectedPhoto(event: any, field_to_display: string, fill_model: string = ''): void {

    const dialogRef = this.dialog.open(DialogCropImageComponent, {
      data: { image: "", name: "" },
      width: "70%",
      height: "95%"
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      if (result != undefined) {
        const base64: any = result;

        this._imageLocal = base64;
        this.lead_client.photo = base64.split(',')[1];
        this.lead_client.photoExtension = 'png';
       
      }
    });
  }
  //////////////////////////////////////////////////////////////////////////////////////
  //Delete experience team

  deletExperienceTeam(id, i, sl) {
    const dialogRef = this.dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Do you want to delete this user experience team?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        if (id == 0) {
          if(sl == 1){
            this.immiTemp.splice(i, 1);
          }else{
            this.reloTemp.splice(i, 1);
          }
        } else {
          this._services.service_general_deleteno_api("DeleteClientPartnerProfile?id=" + id).subscribe((data => {
            if (data.success) {
              const dialog = this.dialog.open(DialogGeneralMessageComponent, {
                data: {
                  header: "Success",
                  body: "User experience team deleted"
                },
                width: "350px"
              });
              this.ngAfterViewInit();
            }
          }))
        }
      }
    })

  }

  changeModel(){
    console.log(this.lead_client.idPricingType)
    this.lead_client.relClientPartnerProfilePricingTypes = [];
    for (const iterator of this.lead_client.idPricingType) {
      this.lead_client.relClientPartnerProfilePricingTypes.push(
        {
          "id": 0,
          "idClientPartnerProfile": 0,
          "idPricingType": iterator
        }
      );
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //Save
  type: boolean = false;
  office: boolean = false;
  name: boolean = false;
  comType: boolean = false;
  belongs: boolean = false;
  save() {
    this.lead_client.idTypePartnerClientProfile = this.lead_client.idCompanyType;

    if (this.lead_client.idTypePartnerClientProfile == undefined ||
      this.lead_client.idTypePartnerClientProfile == '' ||
      this.lead_client.idTypePartnerClientProfile == null) {
      this.type = true;
    }
    else{
      this.type = false;
    }

    if (this.lead_client.name == undefined ||
      this.lead_client.name == '' ||
      this.lead_client.name == null) {
      this.name = true;
    }
    else{
      this.name = false;
    }

    if (this.lead_client.idCompanyType == undefined ||
      this.lead_client.idCompanyType == '' ||
      this.lead_client.idCompanyType == null) {
      this.comType = true;
    }
    else{
      this.comType = false;

    }


    // if (this.lead_client.idCompanyType == 2) {

    //   if ( this.lead_client.belongsToPartner == undefined ) {
    //     this.belongs = true;
    //     console.log(this.type, this.name, this.comType, this.office);
    //     window.scrollTo(0, 0);
    //     return false;
    //   }
    //   else{
    //     this.belongs = false;

    //   }
    // }

    if (this.lead_client.officeInformations.length == 0) {
      window.scrollTo(0, 350);
      this.office = true;
      const dialog = this.dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Office",
          body: "Required a office"
        },
        width: "350px"
      });
      return false;
    } else {
      this.office = false
    }

    if (this.comType || this.name || this.type ) {
      console.log(this.type, this.name, this.comType, this.office);
      window.scrollTo(0, 0);
      return false;
    }

    if (this.partnert && this.rutaActiva.snapshot.params.id == "new") {
      console.log('nuevo partner');

      for (let i = 0; i < this.immiTemp.length; i++) {
        const element = this.immiTemp[i];
        this.lead_client.clientPartnerProfileExperienceTeams.push(element);
      }

      for (let i = 0; i < this.reloTemp.length; i++) {
        const element = this.reloTemp[i];
        this.lead_client.clientPartnerProfileExperienceTeams.push(element);
      }
      this.loader.showLoader();
      this.lead_client.idLifeCircle = 4;


      console.log(JSON.stringify(this.lead_client));

      const pricing = this.lead_client.idPricingType;
      this.lead_client.idPricingType = null;
      this._services.service_general_post_with_urlnoapi('AddClientPartnerProfile', this.lead_client).subscribe(r => {
        console.log(r);
        if (r.success) {
          console.log("REGISTRO GUARDADO PARTNER PROFILE: ", r);
          this.loader.hideLoader();
          //this.router.navigateByUrl('/partner_client/' + r.result.id);
          this.router.navigateByUrl('/partner');
          const dialog = this.dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Inserted data"
            },
            width: "350px"
          })
          //this.ngOnInit();
        }
      })
    } else if (this.partnert && this.rutaActiva.snapshot.params.id != "new") {
      console.log('edit partner');

      this.lead_client.idLifeCircle = 4;

      this._services.service_general_putnoapi('UpdateClientPartnerProfile', this.lead_client).subscribe(r => {
        console.log(r);
        if (r.success) {
          console.log("REGISTRO ACTUALIZADO PARTNER PROFILE: ", r);
          this.loader.hideLoader();
          setTimeout(() => {
            this.ngOnInit();
          }, 500);
          
          const dialog = this.dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Updated data"
            },
            width: "350px"
          });

          
        }
      })
    } else if (this.lead && this.rutaActiva.snapshot.params.id == 'new') {
      this._services.service_general_post_with_urlnoapi('AddClientPartnerProfile', this.lead_client).subscribe(r => {
        console.log(r);
        if (r.success) {
          console.log("REGISTRO GUARDADO PARTNER PROFILE: ", r);
          this.loader.hideLoader();
          const dialog = this.dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Inserted data"
            },
            width: "350px"
          });
          this.router.navigateByUrl('/leads');
        }
      })
    } else if (this.lead && this.rutaActiva.snapshot.params.id != 'new') {
      console.log('edit lead');
      this._services.service_general_putnoapi('UpdateClientPartnerProfile', this.lead_client).subscribe(r => {
        console.log("REGISTRO ACTUALIZADO PARTNER PROFILE: ", r);
        if (r.success) {
          this.loader.hideLoader();
          setTimeout(() => {
            this.ngOnInit();
          }, 500);
          const dialog = this.dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Success",
              body: "Update data"
            },
            width: "350px"
          });         
        }
      })
    }

    console.log((this.lead_client));
  }
  // aqui direcciona el perfil

  openProfile(item){
    console.log(item);
    // en el perfil consultant se abriran todos los roles
    if(item.title != "Coordinator" && item.title != "Manager"){
      this.router.navigateByUrl('profileconsultant/'+item.profileId);
    }
    if(item.title == "Coordinator"){
      this.router.navigateByUrl('profilecoordinator/'+item.profileId);
    }
    if(item.title == "Manager"){
      this.router.navigateByUrl('profilemanager/'+item.profileId);
    }

  }

}
