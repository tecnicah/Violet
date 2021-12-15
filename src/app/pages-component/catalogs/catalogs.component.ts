import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoaderComponent } from 'app/shared/loader';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogCatalogCurrenciesComponent } from '../dialog/dialog-catalog-currencies/dialog-catalog-currencies.component';
import { DialogCatalogLanguagesComponent } from '../dialog/dialog-catalog-languages/dialog-catalog-languages.component';
import { DialogCatalogSexComponent } from './../dialog/dialog-catalog-sex/dialog-catalog-sex.component';
import { DialogCatalogPetTypeComponent } from './../dialog/dialog-catalog-pet-type/dialog-catalog-pet-type.component'
import { DialogCatalogVehicleTypeComponent } from './../dialog/dialog-catalog-vehicle-type/dialog-catalog-vehicle-type.component';
import { DialogCatalogProficiencyComponent } from './../dialog/dialog-catalog-proficiency/dialog-catalog-proficiency.component';
import { DialogCatalogTitlesComponent } from '../dialog/dialog-catalog-titles/dialog-catalog-titles.component';
import { DialogCatalogEducationLevelComponent } from './../dialog/dialog-catalog-education-level/dialog-catalog-education-level.component';
import { DialogCatalogTaxPercentageComponent } from './../dialog/dialog-catalog-tax-percentage/dialog-catalog-tax-percentage.component';
import { DialogCatalogCompanyTypeComponent } from './../dialog/dialog-catalog-company-type/dialog-catalog-company-type.component';
import { DialogCatalogRelationshipComponent } from './../dialog/dialog-catalog-relationship/dialog-catalog-relationship.component';
import { DialogCatalogVisaCategoryComponent } from './../dialog/dialog-catalog-visa-category/dialog-catalog-visa-category.component';
import { DialogGeneralMessageComponent } from './../dialog/general-message/general-message.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GeneralConfirmationComponent } from './../dialog/general-confirmation/general-confirmation.component';
import { Router, Resolve } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DialogCatalogPrivacyComponent } from './../dialog/dialog-catalog-privacy/dialog-catalog-privacy.component';
import { DialogCatalogPolicyComponent } from './../dialog/dialog-catalog-policy/dialog-catalog-policy.component';
import { DialogCatalogPaymentResponsibilityComponent } from './../dialog/dialog-catalog-payment-responsibility/dialog-catalog-payment-responsibility.component';
import { DialogCatalogPartnerStatusComponent } from './../dialog/dialog-catalog-partner-status/dialog-catalog-partner-status.component';
import { DialogCatalogCoverageTypeComponent } from './../dialog/dialog-catalog-coverage-type/dialog-catalog-coverage-type.component';
import { DialogCatalogServiceTypeComponent } from './../dialog/dialog-catalog-service-type/dialog-catalog-service-type.component';
import { DialogCatalogTransportTypeComponent } from './../dialog/dialog-catalog-transport-type/dialog-catalog-transport-type.component';
import { DialogCatalogCoordinatorTypeComponent } from './../dialog/dialog-catalog-coordinator-type/dialog-catalog-coordinator-type.component';
import { DialogCatalogNotificationTypeComponent } from './../dialog/dialog-catalog-notification-type/dialog-catalog-notification-type.component';
import { DialogCatalogDocumentTypeComponent } from './../dialog/dialog-catalog-document-type/dialog-catalog-document-type.component';
import { DialogCatalogContactTypeComponent } from './../dialog/dialog-catalog-contact-type/dialog-catalog-contact-type.component';
import { DialogCatalogSupplierTypeComponent } from './../dialog/dialog-catalog-supplier-type/dialog-catalog-supplier-type.component';
import { DialogCatalogCliclesComponent } from '../dialog/dialog-catalog-clicles/dialog-catalog-clicles.component';
import { DialogCatalogResponsibleComponent } from './../dialog/dialog-catalog-responsible/dialog-catalog-responsible.component';
import { DialogCatalogReferralFeeComponent } from './../dialog/dialog-catalog-referral-fee/dialog-catalog-referral-fee.component';
import { DialogCatalogDesiredPropertyTypeComponent } from './../dialog/dialog-catalog-desired-property-type/dialog-catalog-desired-property-type.component';
import { DialogCatalogContractTypeComponent } from './../dialog/dialog-catalog-contract-type/dialog-catalog-contract-type.component';
import { DialogCatalogEmergecyContactComponent } from './../dialog/dialog-catalog-emergecy-contact/dialog-catalog-emergecy-contact.component';

import{DialogCatalogPricingScheduleComponent} from './../dialog/dialog-catalog-pricing-schedule/dialog-catalog-pricing-schedule.component';

import { DialogAddAccountTypeComponent } from '../dialog/dialog-add-account-type/dialog-add-account-type.component';
import { OfficetypecatalogComponent } from '../dialog/officetypecatalog/officetypecatalog.component';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.css']
})
export class CatalogsComponent implements OnInit {


  // currencies
  @ViewChild('sortcurren') sortcurren: MatSort;
  @ViewChild(MatPaginator) pagcurren: MatPaginator;
  @ViewChild('paginatorElement', {read: ElementRef}) paginatorHtmlElement: ElementRef;
  // languaje
  @ViewChild('sortlang') sortlang: MatSort;
  @ViewChild(MatPaginator) paglang: MatPaginator;
  @ViewChild('paginatorlengElement', {read: ElementRef}) paginatorlengHtmlElement: ElementRef;

  // sex
  @ViewChild('sortSex') sortSex: MatSort;
  @ViewChild(MatPaginator) pagSex: MatPaginator;
  @ViewChild('paginatorsexElement', {read: ElementRef}) paginatorsexHtmlElement: ElementRef;

  // titles
  @ViewChild('sorttitle') sorttitle: MatSort;
  @ViewChild(MatPaginator) pagtitle: MatPaginator;
  @ViewChild('paginatortitleElement', {read: ElementRef}) paginatortitleHtmlElement: ElementRef;

  // cicles
  @ViewChild('sortcicles') sortcicles: MatSort;
  @ViewChild(MatPaginator) pagcicles: MatPaginator;
  @ViewChild('paginatorcicleElement', {read: ElementRef}) paginatorcicleHtmlElement: ElementRef;

  // pet type
  @ViewChild('sortPetType') sortPetType: MatSort;
  @ViewChild(MatPaginator) pagPetType: MatPaginator;
  @ViewChild('paginatorpetElement', {read: ElementRef}) paginatorpetHtmlElement: ElementRef;

  // vehicle
  @ViewChild('sortVehicle') sortVehicle: MatSort;
  @ViewChild(MatPaginator) pagVehicle: MatPaginator;
  @ViewChild('paginatorvehicleElement', {read: ElementRef}) paginatorvehicleHtmlElement: ElementRef;
  // proficiency
  @ViewChild('sortProficiency') sortProficiency: MatSort;
  @ViewChild(MatPaginator) pagProficiency: MatPaginator;
  @ViewChild('paginatorproficiencyElement', {read: ElementRef}) paginatorproficiencyHtmlElement: ElementRef;

  // education
  @ViewChild('sortEducation') sortEducation: MatSort;
  @ViewChild(MatPaginator) pagEducation: MatPaginator;
  @ViewChild('paginatoreducationElement', {read: ElementRef}) paginatoreducationHtmlElement: ElementRef;
  // taxes
  @ViewChild('sortTaxes') sortTaxes: MatSort;
  @ViewChild(MatPaginator) pagTaxes: MatPaginator;
  @ViewChild('paginatortaxesElement', {read: ElementRef}) paginatortaxesHtmlElement: ElementRef;
  // company
  @ViewChild('sortCompanyType') sortCompanyType: MatSort;
  @ViewChild(MatPaginator) pagCompanyType: MatPaginator;
  @ViewChild('paginatorcompanyElement', {read: ElementRef}) paginatorcompanyHtmlElement: ElementRef;
  // relationship
  @ViewChild('sortRelationship') sortRelationship: MatSort;
  @ViewChild(MatPaginator) pagRelationship: MatPaginator;
  @ViewChild('paginatorrelationshipElement', {read: ElementRef}) paginatorrelationshipHtmlElement: ElementRef;
  // visa category
  @ViewChild('sortvisacategory') sortvisacategory: MatSort;
  @ViewChild(MatPaginator) pagvisacategory: MatPaginator;
  @ViewChild('paginatorvisaElement', {read: ElementRef}) paginatorvisaHtmlElement: ElementRef;
  // privacy
  @ViewChild('sortprivacy') sortprivacy: MatSort;
  @ViewChild(MatPaginator) pagprivacy: MatPaginator;
  @ViewChild('paginatorprivacyElement', {read: ElementRef}) paginatorprivacyHtmlElement: ElementRef;
  // policy
  @ViewChild('sortpolicy') sortpolicy: MatSort;
  @ViewChild(MatPaginator) pagpolicy: MatPaginator;
  @ViewChild('paginatorpolicyElement', {read: ElementRef}) paginatorpolicyHtmlElement: ElementRef;
  // payment
  @ViewChild('sortpayment') sortpayment: MatSort;
  @ViewChild(MatPaginator) pagpayment: MatPaginator;
  @ViewChild('paginatorpaymentElement', {read: ElementRef}) paginatorpaymentHtmlElement: ElementRef;
  // partner
  @ViewChild('sortpartner') sortpartner: MatSort;
  @ViewChild(MatPaginator) pagpartner: MatPaginator;
  @ViewChild('paginatorpartnerElement', {read: ElementRef}) paginatorpartnerHtmlElement: ElementRef;
  // coverage
  @ViewChild('sortcoverage') sortcoverage: MatSort;
  @ViewChild(MatPaginator) pagcoverage: MatPaginator;
  @ViewChild('paginatorcoverageElement', {read: ElementRef}) paginatorcoverageHtmlElement: ElementRef;
  // service type
  @ViewChild('sortserviceType') sortserviceType: MatSort;
  @ViewChild(MatPaginator) pagserviceType: MatPaginator;
  @ViewChild('paginatorserviceElement', {read: ElementRef}) paginatorserviceHtmlElement: ElementRef;
  // transport type
  @ViewChild('sorttransporttype') sorttransporttype: MatSort;
  @ViewChild(MatPaginator) pagtransporttype: MatPaginator;
  @ViewChild('paginatortransportElement', {read: ElementRef}) paginatortransportHtmlElement: ElementRef;
  // coordinator type
  @ViewChild('sortcoordinator') sortcoordinator: MatSort;
  @ViewChild(MatPaginator) pagcoordinator: MatPaginator;
  @ViewChild('paginatorcoordinatorElement', {read: ElementRef}) paginatorcoordinatorHtmlElement: ElementRef;
  // notification type
  @ViewChild('sortnotification') sortnotification: MatSort;
  @ViewChild(MatPaginator) pagnotification: MatPaginator;
  @ViewChild('paginatornotificationElement', {read: ElementRef}) paginatornotificationHtmlElement: ElementRef;
  // document type
  @ViewChild('sortdocument') sortdocument: MatSort;
  @ViewChild(MatPaginator) pagdocument: MatPaginator;
  @ViewChild('paginatordocumentElement', {read: ElementRef}) paginatordocumentHtmlElement: ElementRef;
  // contact type
  @ViewChild('sortcontact') sortcontact: MatSort;
  @ViewChild(MatPaginator) pagcontact: MatPaginator;
  @ViewChild('paginatorcontactElement', {read: ElementRef}) paginatorcontactHtmlElement: ElementRef;
  // supplier type
  @ViewChild('sortsupplier') sortsupplier: MatSort;
  @ViewChild(MatPaginator) pagsupplier: MatPaginator;
  @ViewChild('paginatorsupplierElement', {read: ElementRef}) paginatorsupplierHtmlElement: ElementRef;
  //responsible es igual a
  @ViewChild('sortresponsible') sortresponsible: MatSort;
  @ViewChild(MatPaginator) pagresponsible: MatPaginator;
  @ViewChild('paginatorresponsibleElement', {read: ElementRef}) paginatorresponsibleHtmlElement: ElementRef;

  //referral fee
  @ViewChild('sortreferral') sortreferral: MatSort;
  @ViewChild(MatPaginator) pagreferral: MatPaginator;
  @ViewChild('paginatorreferralElement', {read: ElementRef}) paginatorreferralHtmlElement: ElementRef;
  //contract type
  @ViewChild('sortcontract') sortcontract: MatSort;
  @ViewChild(MatPaginator) pagcontract: MatPaginator;
  @ViewChild('paginatorcontractElement', {read: ElementRef}) paginatorcontractHtmlElement: ElementRef;
  // desired
  @ViewChild('sortdesired') sortdesired: MatSort;
  @ViewChild(MatPaginator) pagdesired: MatPaginator;
  @ViewChild('paginatordesiredElement', {read: ElementRef}) paginatordesiredHtmlElement: ElementRef;

  // emergencycontact
  @ViewChild('sortemergencycontact') sortemergencycontact: MatSort;
  @ViewChild(MatPaginator) pagemergencycontact: MatPaginator;
  @ViewChild('paginatoremergencycontactElement', {read: ElementRef}) paginatoremergencycontactHtmlElement: ElementRef;

  // pricing
  @ViewChild('sortpricing') sortpricing: MatSort;
  @ViewChild(MatPaginator) pagpricing: MatPaginator;
  @ViewChild('paginatorpricingElement', {read: ElementRef}) paginatorpricingHtmlElement: ElementRef;

   // account type
   @ViewChild('sortaccounttype') sortaccounttype: MatSort;
   @ViewChild(MatPaginator) pagaccounttype: MatPaginator;
   @ViewChild('paginatoraccounttypeElement', {read: ElementRef}) paginatoraccounttypeHtmlElement: ElementRef;


  // variables
  tableCatalog;
  // value table columns
  dataCurrencies: any;
  dataLanguages: any;
  dataCatalogSex: any;
  dataTitles: any;
  dataCicles: any;
  dataCatalogPetType: any;
  dataCatalogVehicle: any;
  dataCatalogProficiency: any;
  dataCatalogEducation: any;
  dataCatalogTaxes: any;
  dataCompanyType: any;
  dataRelationship: any;
  dataVisaCategory: any;
  dataPrivacy: any;
  dataPolicy: any;
  dataPayment: any;
  dataPartner: any;
  dataCoverage: any;
  dataServiceType: any;
  dataTransportType: any;
  dataCoordinator: any;
  dataNotification: any;
  dataDocument: any;
  dataContact: any;
  dataSupplier: any;
  dataREsponsible: any;
  dataReferral: any;
  dataContract: any;
  dataDesired: any;
  dataEmergencyContact: any;
  dataPricing: any;
  dataAccountType: any;




  classCard;
  search;
  typeDoc: any;
  // dataSourceUser: any = []

  displayedColumnsCurrencies: string[] = ['Currency', 'Abbreviation', 'Symbol', 'Action'];
  displayedColumnsLanguages: string[] = ['Language', 'Abbreviation', 'Action'];
  displayedColumnsSex: string[] = ['Sex', 'Action'];
  displayedColumnsTitles: string[] = ['Office', 'Section', 'Job Title', 'Action'];
  displayedColumnsCicles: string[] = ['Life Cicle', 'Action'];
  displayedColumnsPetType: string[] = ['petType', 'Action'];
  displayedColumnsVehicle: string[] = ['Type', 'Action'];
  displayedColumnsProficiency: string[] = ['Proficiency', 'Action'];
  displayedColumnsEducation: string[] = ['Education level', 'Action'];
  displayedColumnsTaxes: string[] = ['Taxe', 'Action'];
  displayedColumnsCompanyType: string[] = ['Company Type', 'Action'];
  displayedColumnsRelationship: string[] = ['Relationship', 'Action'];
  displayedColumnsVisa: string[] = ['Visa Category', 'Action'];
  displayedColumnsPrivacy: string[] = ['Privacy type', 'Action'];
  displayedColumnsPolicy: string[] = ['Policy type', 'Action'];
  displayedColumnsPayment: string[] = ['Responsible Payment', 'Action'];
  displayedColumnsPartner: string[] = ['Partner status', 'Action'];
  displayedColumnsCoverage: string[] = ['Coverage type', 'Action'];
  displayedColumnsServiceType: string[] = ['Service', 'Action'];
  displayedColumnsTransportType: string[] = ['Transport type', 'Action'];
  displayedColumnsCoordinator: string[] = ['Coordinator type', 'Action'];
  displayedColumnsNotification: string[] = ['Notification type', 'Action'];
  displayedColumnsDocument: string[] = ['Document type', 'Type', 'Action'];
  displayedColumnsContact: string[] = ['Contact type', 'Action'];
  displayedColumnsSupplier: string[] = ['Supplier type', 'Action'];
  displayedColumnsResponsible: string[] = ['Responsible', 'Action'];
  displayedColumnsReferral: string[] = ['Referral fee', 'Action'];
  displayedColumnsContractType: string[] = ['Contract type', 'Action'];
  displayedColumnsDesired: string[] = ['Desired property type', 'Action'];
  displayedColumnsEmergencyContact: string[] = ['Relationship Contact', 'Action'];
  displayedColumnsPricing: string[] = ['Pricing Schedule', 'Action'];
  displayedColumnsAccountType: string[] = ['Account Type', 'Action'];
  displayedContactType: string[] = ['Office Type', 'Action'];





  selectCatalogs = [
    {value: 'currencies',name: 'Currencies'},
    {
      value: 'languajes',
      name: 'Languages'
    },
    {
      value: 'sex',
      name: 'Sex'
    },
    {
      value: 'jobTitles',
      name: 'Job Titles'
    },
    {
      value: 'lifeCicles',
      name: 'Life Cicles'
    },
    {
      value: 'Pet type',
      name: 'Pet type'
    },
    {
      value: 'Vehicle type',
      name: 'Vehicle type'
    },
    {
      value: 'proficiency',
      name: 'Proficiency'
    },
    {
      value: 'Education level',
      name: 'Education level'
    },
    {
      value: 'Tax percentage',
      name: 'Tax Percentage'
    },
    // {
    //   value: 'Company type',
    //   name: 'Company Type'
    // },
    {
      value: 'relationship',
      name: 'Relationship'
    },
    {
      value: 'privacy',
      name: 'Privacy type'
    },
    {
      value: 'Policy type',
      name: 'Policy type'
    },
    {
      value: 'Payment Responsibility',
      name: 'Responsible Payment'
    },
    {
      value: 'Partner status',
      name: 'Partner status'
    },
    {
      value: 'Coverage type',
      name: 'Coverage type'
    },
    {
      value: 'Transport Type',
      name: 'Transport Type'
    },
    {
      value: 'Coordinator Type',
      name: 'Coordinator type'
    },
    {
      value: 'Notification Type',
      name: 'Notification type'
    },
    {
      value: 'Document Type',
      name: 'Document Type'
    },
    {
      value: 'Contact Type',
      name: 'Contact Type'
    },
    {value: 'Supplier Type',name: 'Supplier Type'},
    {value: 'Responsible', name: 'Responsible Premier Office'},
    {value: 'Referral', name: 'Referral fee'},
    {value: 'Contract', name: 'Contract type'},
    {value: 'Desired', name: 'Desired property type'},
    {value: 'Emergency Contact', name: 'Emergency Contact'},
    {value: 'Pricing', name: 'Pricing Schedule'},
    {value: 'Account', name: 'Account Type'},
    {value: 'Office type', name: 'Office type'},
  ];

  // loader
  public __loader__: LoaderComponent = new LoaderComponent();


  constructor(public _services: ServiceGeneralService, public _dialog: MatDialog, public _router: Router) { }
  public filterCatalog: any = { name: '' };


  ngOnInit(): void {
    this.__loader__.showLoader();
    this.tableCatalog = 'currencies';
    // this.selectCatalog();
    this.get_catalogos();
    this.consultaPermisos();
    this.__loader__.hideLoader();
  }

  //*********************************************//
	public permission_read : boolean = false;
	public permission_write : boolean = false;
	public permission_delete : boolean = false;
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
  // scroll
  animateToTop(e) {
    e.preventDefault();
    var scrollToTop = window.setInterval(function() {
        var pos = window.pageYOffset;
        if ( pos > 0 ) {
            window.scrollTo( 0, pos - 20 );
        } else {
            window.clearInterval( scrollToTop );
        }
    }, 10);
}

  selectCatalog() {
    // this.tableCatalog = catalog;
    this.get_catalogos();
  }
 public dataofficetype: any;
  get_catalogos() {
    console.log('se eligio el catalogo', this.tableCatalog);
    if (this.tableCatalog == 'Office type') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/Office-Type').subscribe(r => {
        console.log('catalogo Currency', r);
        if (r.success) {
          // this.dataCurrencies = r.result;
          this.dataofficetype = new  MatTableDataSource(r.result);
          this.dataofficetype.paginator = this.pagcurren;
          this.dataofficetype.sort = this.sortcurren;
          // ++
  
          this.search = '';
          }
        });
        this.__loader__.hideLoader();
      }
    if (this.tableCatalog == 'currencies') {
    this.__loader__.showLoader();
    this._services.service_general_get('Catalog/GetAllCurrency').subscribe(r => {
      console.log('catalogo Currency', r);
      if (r.success) {
        // this.dataCurrencies = r.result;
        this.dataCurrencies = new  MatTableDataSource(r.result);
        this.dataCurrencies.paginator = this.pagcurren;
        this.dataCurrencies.sort = this.sortcurren;
        // ++

        this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'languajes') {
      this.__loader__.showLoader();
      this._services.service_general_get('Catalog/GetAllLanguages').subscribe(rlenguage => {
        console.log('catalogo language', rlenguage);
        if (rlenguage.success) {
          // this.dataLanguages = rlenguage.result;
          this.dataLanguages = new  MatTableDataSource(rlenguage.result);
          this.dataLanguages.paginator = this.paglang;
          this.dataLanguages.sort = this.sortlang;
          // ++

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'sex') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetSex').subscribe(rs => {
        console.log('catalogo sex', rs);
        if (rs.success) {
          console.log('get sex', rs);
          this.dataCatalogSex = new MatTableDataSource(rs.result);
          this.dataCatalogSex.paginator = this.pagSex;
          this.dataCatalogSex.sort = this.sortSex;

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'jobTitles') {
      this.__loader__.showLoader();
      this._services.service_general_get('Catalog/GetAllTitle').subscribe(rTitle => {
        console.log('catalogo Title', rTitle);
        if (rTitle.success) {
          // this.dataTitles = rTitle.result;
          this.dataTitles = new  MatTableDataSource(rTitle.result);
          this.dataTitles.paginator = this.pagtitle;
          this.dataTitles.sort = this.sorttitle;

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'lifeCicles') {
      this.__loader__.showLoader();
      this._services.service_general_get('Catalog/GetAllLifeCricle').subscribe(rCircle => {
        console.log('catalogo circle', rCircle);
        if (rCircle.success) {
          // this.dataCicles = rCircle.result;
          this.dataCicles = new  MatTableDataSource(rCircle.result);
          this.dataCicles.paginator = this.pagcicles;
          this.dataCicles.sort = this.sortcicles;

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Pet type') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetPetType').subscribe(rpet => {
        console.log('catalogo office', rpet);
        if (rpet.success) {
          // this.dataOffices = rpet.result;
          this.dataCatalogPetType = new MatTableDataSource(rpet.result);
          this.dataCatalogPetType.paginator = this.pagPetType;
          this.dataCatalogPetType.sort = this.sortPetType;


          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Vehicle type') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetVehicleType').subscribe(rve => {
        console.log('catalogo vehicle', rve);
        if (rve.success) {
          console.log('get vehicle', rve);
          this.dataCatalogVehicle = new MatTableDataSource(rve.result);
          this.dataCatalogVehicle.paginator = this.pagVehicle;
          this.dataCatalogVehicle.sort = this.sortVehicle;

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'proficiency') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetProficiency').subscribe(rprofi => {
        console.log('catalogo circle', rprofi);
        if (rprofi.success) {
          console.log('get Proficiency', rprofi);
          this.dataCatalogProficiency = new MatTableDataSource(rprofi.result);
          this.dataCatalogProficiency.paginator = this.pagProficiency;
          this.dataCatalogProficiency.sort = this.sortProficiency;


          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Education level') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetEducationLevel').subscribe(redu => {
        console.log('catalogo education', redu);
        if (redu.success) {
          console.log('get Education', redu);
          this.dataCatalogEducation = new MatTableDataSource(redu.result);
          this.dataCatalogEducation.paginator = this.pagEducation;
          this.dataCatalogEducation.sort = this.sortEducation;
          // ++

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Tax percentage') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetTaxesPercentage').subscribe(rtax => {
        console.log('catalogo education', rtax);
        if (rtax.success) {
          console.log('get Education', rtax);
          this.dataCatalogTaxes = new MatTableDataSource(rtax.result);
          this.dataCatalogTaxes.paginator = this.pagTaxes;
          this.dataCatalogTaxes.sort = this.sortTaxes;
          // ++

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Company type') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetCompanyType').subscribe(rcompa => {
        console.log('catalogo company', rcompa);
        if (rcompa.success) {
          console.log('get company', rcompa);
          this.dataCompanyType = new MatTableDataSource(rcompa.result);
          this.dataCompanyType.paginator = this.pagCompanyType;
          this.dataCompanyType.sort = this.sortCompanyType;
          // ++


          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'relationship') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetRelationship').subscribe(rrelation => {
        console.log('catalogo relation', rrelation);
        if (rrelation.success) {
          console.log('get relation', rrelation);
          this.dataRelationship = new MatTableDataSource(rrelation.result);
          this.dataRelationship.paginator = this.pagRelationship;
          this.dataRelationship.sort = this.sortRelationship;
          // ++


          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'privacy') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetPrivacy').subscribe(rprivacy => {
        if (rprivacy.success) {
          console.log('get privacy', rprivacy);
          this.dataPrivacy = new MatTableDataSource(rprivacy.result);
          this.dataPrivacy.paginator = this.pagprivacy;
          this.dataPrivacy.sort = this.sortprivacy;
          // ++

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Policy type') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetPolicyType').subscribe(rpolicy => {
        if (rpolicy.success) {
          console.log('get policy', rpolicy);
          this.dataPolicy = new MatTableDataSource(rpolicy.result);
          this.dataPolicy.paginator = this.pagpolicy;
          this.dataPolicy.sort = this.sortpolicy;
          // ++


          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Payment Responsibility') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetPaymentResponsibility').subscribe(rpayment => {
        if (rpayment.success) {
          console.log('get payment', rpayment);
          this.dataPayment = new MatTableDataSource(rpayment.result);
          this.dataPayment.paginator = this.pagpayment;
          this.dataPayment.sort = this.sortpayment;
          // ++

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Partner status') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetPartnerStatus').subscribe(rpartner => {
        if (rpartner.success) {
          console.log('get partner', rpartner);
          this.dataPartner = new MatTableDataSource(rpartner.result);
          this.dataPartner.paginator = this.pagpartner;
          this.dataPartner.sort = this.sortpartner;
          // ++

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Coverage type') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetCoverageType').subscribe(rcoverage => {
        if (rcoverage.success) {
          console.log('get coverage', rcoverage);
          this.dataCoverage = new MatTableDataSource(rcoverage.result);
          this.dataCoverage.paginator = this.pagcoverage;
          this.dataCoverage.sort = this.sortcoverage;
          // ++

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Transport Type') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetTransportType').subscribe(rtransport => {
        if (rtransport.success) {
          console.log('get transport', rtransport);
          this.dataTransportType = new MatTableDataSource(rtransport.result);
          this.dataTransportType.paginator = this.pagtransporttype;
          this.dataTransportType.sort = this.sorttransporttype;
          // ++

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Coordinator Type') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetCoordinatorType').subscribe(rcoordinator => {
        if (rcoordinator.success) {
          console.log('get coordinator', rcoordinator);
          this.dataCoordinator = new MatTableDataSource(rcoordinator.result);
          this.dataCoordinator.paginator = this.pagcoordinator;
          this.dataCoordinator.sort = this.sortcoordinator;
          // ++

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Notification Type') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetNotificationType').subscribe(rnotification => {
        if (rnotification.success) {
          console.log('get notification', rnotification);
          this.dataNotification = new MatTableDataSource(rnotification.result);
          this.dataNotification.paginator = this.pagnotification;
          this.dataNotification.sort = this.sortnotification;
          // ++

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Document Type') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetDocumentType').subscribe(rdocument => {
        if (rdocument.success) {
          console.log('get document', rdocument);
          this.dataDocument = new MatTableDataSource(rdocument.result);
          this.dataDocument.paginator = this.pagdocument;
          this.dataDocument.sort = this.sortdocument;
          // ++

          this.search = '';
        }
      });
      this._services.service_general_get('AdminCenter/GetTypeDocuments').subscribe(rtype => {
        if (rtype.success) {
          this.typeDoc = rtype.result
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Contact Type') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetContactType').subscribe(rcontact => {
        if (rcontact.success) {
          console.log('get contact', rcontact);
          this.dataContact = new MatTableDataSource(rcontact.result);
          this.dataContact.paginator = this.pagcontact;
          this.dataContact.sort = this.sortcontact;
          // ++

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Supplier Type') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetSupplierType').subscribe(rsupplier => {
        if (rsupplier.success) {
          console.log('get supplier', rsupplier);
          this.dataSupplier = new MatTableDataSource(rsupplier.result);
          this.dataSupplier.paginator = this.pagsupplier;
          this.dataSupplier.sort = this.sortsupplier;
          // ++

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Responsible') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/Responsible/All').subscribe(resp => {
        if (resp.success) {
          console.log('get responsible', resp);
          this.dataREsponsible = new MatTableDataSource(resp.result);
          this.dataREsponsible.paginator = this.pagresponsible;
          this.dataREsponsible.sort = this.sortresponsible;
          // ++

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Referral') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/ReferralFee/All').subscribe(resp => {
        if (resp.success) {
          console.log('get referral', resp);
          this.dataReferral = new MatTableDataSource(resp.result);
          this.dataReferral.paginator = this.pagreferral;
          this.dataReferral.sort = this.sortreferral;
          // ++

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Contract') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/ContractType/All').subscribe(resp => {
        if (resp.success) {
          console.log('get contract', resp);
          this.dataContract = new MatTableDataSource(resp.result);
          this.dataContract.paginator = this.pagcontract;
          this.dataContract.sort = this.sortcontract;
          // ++

          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Desired') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/PropertyType/All').subscribe(resp => {
        if (resp.success) {
          console.log('get desired', resp);
          this.dataDesired = new MatTableDataSource(resp.result);
          this.dataDesired.paginator = this.pagdesired;
          this.dataDesired.sort = this.sortdesired;
          // ++
          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Emergency Contact') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/GetRelationshipContact').subscribe(resp => {
        if (resp.success) {
          console.log('get emergency contact', resp);
          this.dataEmergencyContact = new MatTableDataSource(resp.result);
          this.dataEmergencyContact.paginator = this.pagemergencycontact;
          this.dataEmergencyContact.sort = this.sortemergencycontact;
          // ++
          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Pricing') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/PricingSchedule').subscribe(resp => {
        if (resp.success) {
          console.log('get pricing', resp);
          this.dataPricing = new MatTableDataSource(resp.result);
          this.dataPricing.paginator = this.pagpricing;
          this.dataPricing.sort = this.sortpricing;
          // ++
          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }
    if (this.tableCatalog == 'Account') {
      this.__loader__.showLoader();
      this._services.service_general_get('AdminCenter/Bank-Account-Type').subscribe(resp => {
        if (resp.success) {
          console.log('get account type', resp);
          this.dataAccountType = new MatTableDataSource(resp.result);
          this.dataAccountType.paginator = this.pagaccounttype;
          this.dataAccountType.sort = this.sortaccounttype;
          // ++
          this.search = '';
        }
      });
      this.__loader__.hideLoader();
    }

  }

  applyFilter(event: Event) {
    console.log(event, 'estas buscando');
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.tableCatalog == 'currencies') {
      this.dataCurrencies.filter = filterValue.trim().toLowerCase();
    }
    else if(this.tableCatalog == 'languajes'){
      this.dataLanguages.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'sex'){
      this.dataCatalogSex.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'jobTitles'){
      this.dataTitles.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'lifeCicles'){
      this.dataCicles.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Pet type'){
      this.dataCatalogPetType.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Vehicle type'){
      this.dataCatalogVehicle.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'proficiency'){
      this.dataCatalogProficiency.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Education level'){
      this.dataCatalogEducation.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Tax percentage'){
      this.dataCatalogTaxes.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Company type'){
      this.dataCompanyType.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'relationship'){
      this.dataRelationship.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Visa category'){
      this.dataVisaCategory.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'privacy'){
      this.dataPrivacy.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Policy type'){
      this.dataPolicy.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Payment Responsibility'){
      this.dataPayment.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Partner status'){
      this.dataPartner.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Coverage type'){
      this.dataCoverage.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Service type'){
      this.dataServiceType.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Transport Type'){
      this.dataTransportType.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Coordinator Type'){
      this.dataCoordinator.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Notification Type'){
      this.dataNotification.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Document Type'){
      this.dataDocument.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Contact Type'){
      this.dataContact.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Supplier Type'){
      this.dataSupplier.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Responsible'){
      this.dataREsponsible.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Referral'){
      this.dataReferral.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Contract'){
      this.dataContract.filter = filterValue.trim().toLowerCase();
    }else if(this.tableCatalog == 'Desired'){
      this.dataDesired.filter = filterValue.trim().toLowerCase();
    }
    else if(this.tableCatalog == 'Emergency Contact'){
      this.dataEmergencyContact.filter = filterValue.trim().toLowerCase();
    }
    else if(this.tableCatalog == 'Pricing'){
      this.dataPricing.filter = filterValue.trim().toLowerCase();
    }
    else if(this.tableCatalog == 'Account'){
      this.dataAccountType.filter = filterValue.trim().toLowerCase();
    }

  }
  // Add cataloge currencies
  addCurrencies(id) {
    console.log('abrir modal currencies');
    const dialogRef = this._dialog.open(DialogCatalogCurrenciesComponent, {
      data: {id: id},
      width: "30%",
      // data: this.data
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if(result === 2){
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Updated data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    })
  }
  // eliminar currency
  deleteCurrency(id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Currency?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete(`Catalog/DeleteCurrency/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: ` Deleted ${ data.result.currency }`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The currency is in use by other records`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
// add y update lenguage
  addLenguage(id) {
    console.log('abrir modal lenguage');
    const dialogRef = this._dialog.open(DialogCatalogLanguagesComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  // delete lenguage
  deleteLenguage(id) {
    console.log('lenguaje', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Language?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete(`Catalog/DeleteLanguage/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted ${data.result.name}`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The lenguage is in use by other records`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // sex
  addSex(id : number) {
    console.log('abrir modal lenguage');
    const dialogRef = this._dialog.open(DialogCatalogSexComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteSex(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this sex?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/Sex/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted sex`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The sex is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });

  }
   // add title
  addTitle(id) {
    const dialogRef = this._dialog.open(DialogCatalogTitlesComponent, {
      data: {id: id},
      width: "30%",
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if(result === 2){
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Updated data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    })
  }
  // delete title
  deleteTitle(id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Title?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete(`Catalog/DeleteTitle/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted title`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The Title is in use `
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });

  }
  addCicles(id) {
    console.log('abrir modal currencies');
    const dialogRef = this._dialog.open(DialogCatalogCliclesComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if(result === 2){
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Updated data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    })
  }
  deleteCicles(id) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Cicle?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this._services.service_general_delete(`Catalog/DeleteLifeCircle/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted cicles`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The cicles is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // pet type
  addPet(id : number) {
    const dialogRef = this._dialog.open(DialogCatalogPetTypeComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deletePet( id : number) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this pet type?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/PetType/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted pet`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The pet type is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // vehicle
  addVehicle(id : number) {
    const dialogRef = this._dialog.open(DialogCatalogVehicleTypeComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteVehicle(id : number) {
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Vehicle type?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/VehicleType/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted Vehicle type`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The vehicle is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });

  }
  // proficiency
  addProficiency(id : number) {
    console.log('abrir modal proficiency');
    const dialogRef = this._dialog.open(DialogCatalogProficiencyComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteProficiency(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Proficiency?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/Proficiency/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted Proficiency`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The Proficiency is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });

  }
  // education
  addEducation(id : number) {
    console.log('abrir modal education');
    const dialogRef = this._dialog.open(DialogCatalogEducationLevelComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteEducation(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Education?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/EducationLevel/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted Education`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The Education is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });

  }
  // taxes
  addTaxPercentage(id : number) {
    console.log('abrir modal taxes');
    const dialogRef = this._dialog.open(DialogCatalogTaxPercentageComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteTaxPercentage(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this taxes?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/TaxesPercentage/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted taxe percentage`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The taxe is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });

  }
  // company
  addCompanyType(id : number) {
    console.log('abrir modal company');
    const dialogRef = this._dialog.open(DialogCatalogCompanyTypeComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteCompanyType(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Company?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/CompanyType/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted Company type`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The Company Type is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });

  }
  // add relationship
  addRelationship(id: number) {
    console.log('abrir modal relationship');
    const dialogRef = this._dialog.open(DialogCatalogRelationshipComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  // delete relationship
  deleteRelationship(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Relationship?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/Relationship/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted Relationship`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The Relationship is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });

  }
  // add visa category
  addVisaCategory(id: number) {
    console.log('abrir modal visa');
    const dialogRef = this._dialog.open(DialogCatalogVisaCategoryComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteVisaCAtegory(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this visa?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/VisaCategory/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted visa catagory`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The Visa category is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
   // add privacy
  addPrivacy(id: number) {
  console.log('abrir modal privacy');
  const dialogRef = this._dialog.open(DialogCatalogPrivacyComponent, {
    data: {id: id},
    width: "30%",
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 1) {
      const dialog = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "success",
          body: "Inserted data"
        },
        width: "350px"
      });
      this.get_catalogos();
    }
    if (result === 2) {
      const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
        data: {
          header: "Success",
          body: "Update data"
        },
        width: "350px"
      });
      this.get_catalogos();
    }
  });
  }
  deletePrivacy(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this privacy?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/Privacy/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted privacy`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The Privacy is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // policy type
  addPolicy(id: number) {
    console.log('abrir modal policy');
    const dialogRef = this._dialog.open(DialogCatalogPolicyComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deletePolicy(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this policy?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/PolicyType/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted privacy`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The Privacy is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // payment responsibility
  addPayment(id: number) {
    console.log('abrir modal payment');
    const dialogRef = this._dialog.open(DialogCatalogPaymentResponsibilityComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deletePayment(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this payment?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/PaymentResponsibility/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted payment`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The Payment is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // partner
  addPartner(id: number) {
    console.log('abrir modal payment');
    const dialogRef = this._dialog.open(DialogCatalogPartnerStatusComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deletePartner(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this partner?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/PartnerStatus/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted partner`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The partner is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // Coverage type
  addCoverage(id: number) {
    console.log('abrir modal coverage');
    const dialogRef = this._dialog.open(DialogCatalogCoverageTypeComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteCoverage(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Coverage?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/CoverageType/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted coverage`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The coverage is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // service type
  addServiceType(id: number) {
    console.log('abrir modal service');
    const dialogRef = this._dialog.open(DialogCatalogServiceTypeComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteServiceType(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this service type?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/ServiceType/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted service`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The service is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // transport
  addTransport(id: number) {
    console.log('abrir modal transport');
    const dialogRef = this._dialog.open(DialogCatalogTransportTypeComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteTransport(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this transport type?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/TransportType/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted transport`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The transport is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // Coordinator
  addCoordinator(id: number) {
    console.log('abrir modal coordinator');
    const dialogRef = this._dialog.open(DialogCatalogCoordinatorTypeComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteCoordinator(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this coordinator type?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/CoordinatorType/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted coordinator`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The coordinator is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // Notification
  addNotification(id: number) {
    console.log('abrir modal notification');
    const dialogRef = this._dialog.open(DialogCatalogNotificationTypeComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteNotification(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this notification type?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/NotificationType/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted notification`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The notification is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // Document
  addDocument(id: number) {
    console.log('abrir modal document');
    const dialogRef = this._dialog.open(DialogCatalogDocumentTypeComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteDocument(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this document type?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/DocumentType/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted document`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The document is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  nameType(id: number) {
    for (let i = 0; i < this.typeDoc.length; i++) {
      const element = this.typeDoc[i];
      if (element.id == id) {
        return element.name
      }
    }
  }
  // Contact
  addContact(id: number) {
    console.log('abrir modal contact');
    const dialogRef = this._dialog.open(DialogCatalogContactTypeComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteContact(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this contact type?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/ContactType/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted contact`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The contact is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // Supplier
  addSupplier(id: number) {
    console.log('abrir modal supplier');
    const dialogRef = this._dialog.open(DialogCatalogSupplierTypeComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteSupplier(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this supplier type?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/SupplierType/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted supplier`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The supplier is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // partner responsibility
  addResponsibility(id: number) {
    console.log('abrir modal Responsibility');
    const dialogRef = this._dialog.open(DialogCatalogResponsibleComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteResponsibility(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Responsible?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/Delete/Responsible/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted Responsible`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The Responsible is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // referral
  addReferral(id: number) {
    console.log('abrir modal Referral');
    const dialogRef = this._dialog.open(DialogCatalogReferralFeeComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteReferral(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Referral?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/Delete/ReferralFee/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted Referral`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The Referral is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }

  // Contract
  addContract(id: number) {
    console.log('abrir modal Contract');
    const dialogRef = this._dialog.open(DialogCatalogContractTypeComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteContract(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Contract type?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/Delete/ContractType/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted Contract`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The Contract is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // Desired Property type
  addDesired(id: number) {
    console.log('abrir modal Desired');
    const dialogRef = this._dialog.open(DialogCatalogDesiredPropertyTypeComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteDesired(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Desired Property type?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/Delete/PropertyType/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted Desired Property type`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The Desired property type is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }
  // Emergency Contact
  addEmergencyContact(id: number) {
    console.log('abrir modal Emergency contact');
    const dialogRef = this._dialog.open(DialogCatalogEmergecyContactComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteEmergencyContact(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Emergency Contact?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/RelationshipContact/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted Emergency Contact`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The Emergency contact is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }

  // Pricing
  addPricing(id: number) {
    console.log('abrir modal Pricing');
    const dialogRef = this._dialog.open(DialogCatalogPricingScheduleComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deletePricing(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Pricing Schedule?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/PricingSchedule/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted Pricing Schedule`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The Pricing Schedule is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }

  // Account Type
  addAccount(id: number) {
    console.log('abrir modal Account');
    const dialogRef = this._dialog.open(DialogAddAccountTypeComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }
  deleteAccount(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Account Type?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/Bank-Account-Type/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted Account Type`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The Account Type is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }

  addOffice(id: number) {
    console.log('abrir modal Account');
    const dialogRef = this._dialog.open(OfficetypecatalogComponent, {
      data: {id: id},
      width: "30%",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const dialog = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "success",
            body: "Inserted data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
      if (result === 2) {
        const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: "Success",
            body: "Update data"
          },
          width: "350px"
        });
        this.get_catalogos();
      }
    });
  }


  deleteOfficeType(id: number) {
    console.log('delete', id);
    const dialogRef = this._dialog.open(GeneralConfirmationComponent, {
      data: {
        header: "Delete confirmation",
        body: "Are you sure to delete this Account Type?"
      },
      width: "350px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._services.service_general_delete(`AdminCenter/Office-Type/${id}`).subscribe((data) =>{
          console.log('respuesta de eliminacion', data);
          if (data.success) {
            const dialog = this._dialog.open(DialogGeneralMessageComponent, {
              data: {
                header: "Success",
                body: `Deleted office Type`
              },
              width: "350px"
            });
            this.get_catalogos();
          }
        }, (error) => {
            console.error('error con el delete', error);
            const dialog2 = this._dialog.open(DialogGeneralMessageComponent, {
            data: {
              header: "Warning",
              body: `The Office Type is in use`
            },
            width: "350px"
            });
            this.get_catalogos();
        })
      }
    });
  }


  public dateWorker(date: string): string {
    let result: string = '';
    if (date != null) {
      const date_to_work: string = date,
        date_remove_time: string = date_to_work.split('T')[0];
      result = date_remove_time;
    } else {
      result = 'No Date';

    }
    return result;

  }



}
