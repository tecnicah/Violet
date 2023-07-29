import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { EntryVisaComponent } from '../entry-visa/entry-visa.component';
import { DialogWorkPermitComponent } from '../dialog-work-permit/dialog-work-permit.component';
import { DialogVisaDeregistrationComponent } from '../dialog-visa-deregistration/dialog-visa-deregistration.component';
import { DialogResidencyPermitComponent } from '../dialog-residency-permit/dialog-residency-permit.component';
import { DialogDocumentManagementComponent } from '../dialog-document-management/dialog-document-management.component';
import { DialogLocalDocumentationComponent } from '../dialog-local-documentation/dialog-local-documentation.component';
import { DialogCortporateAssistance } from '../corporate-assistance/corporate-assistance.component';
import { DialogRenewal } from '../renewal/renewal.component';
import { NotificationDialog } from '../notification/notification.component';
import { LegalRenewalComponent } from '../legal-renewal/legal-renewal.component';
import { PreDecisionOrientationComponent } from '../pre-decision-orientation/pre-decision-orientation.component';
import { AreaOrientationComponent } from '../area-orientation/area-orientation.component';
import { SettlingInComponent } from '../settling-in/settling-in.component';
import { SchoolSearchComponent } from '../school-search/school-search.component';
import { departureAssistanceWiths } from '../dialog-departure/departure';
import { DialogTemporaryHousingComponent } from '../dialog-temporary-housing/dialog-temporary-housing.component';
import { DialogDepartureComponent } from '../dialog-departure/dialog-departure.component';
import { DialogRentalFurnitureComponent } from '../dialog-rental-furniture/dialog-rental-furniture.component';
import { DialogTransportationComponent } from '../dialog-transportation/dialog-transportation.component';
import { DialogAirportTransportationComponent } from '../dialog-airport-transportation/dialog-airport-transportation.component';
import { HomeFindingComponent } from '../home-finding/home-finding.component';
import { HomeSaleComponent } from '../home-sale/home-sale.component';
import { HomePurchaseComponent } from '../home-purchase/home-purchase.component';
import { PropertyManagementComponent } from '../property-management/property-management.component';
import { OtherComponent } from '../other/other.component';
import { TenancyManagementComponent } from '../tenancy-management/tenancy-management.component';
import { DialogLegalReviewConsultation } from '../legal-review-consultation/legal-review-consultation.component';
import { OtherImmigrationComponent } from '../other-immigration/other-immigration.component';
import { LoaderComponent } from 'app/shared/loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-bundle',
  templateUrl: './dialog-bundle.component.html',
  styleUrls: ['./dialog-bundle.component.css']
})
export class DialogBundleComponent implements OnInit {

  constructor(public _dialog: MatDialog, public _services: ServiceGeneralService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any ,public _router: Router) { }

    public __loader__:LoaderComponent = new LoaderComponent();
    userData: any;
  public services_bundle = [];
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    console.log("data recibida en el modal", this.data);
    this.__loader__.showLoader();
    //this._services.service_general_get("ServiceOrder//api/ServiceOrder/GetBundledServiceByBundleId?wo=" + this.data.wo).subscribe((data => {
    this._services.service_general_get("ServiceOrder/GetBundledServiceByBundleId?bundle_swo_id=" + this.data.bundled).subscribe((data => {
        console.log("GetBundledServiceByBundleId =====",data);
      if (data.success) {
        for (let i = 0; i < data.result.value.length; i++) {
          const element = data.result.value[i];
          for (let j = 0; j < element.services.length; j++) {
            element.authoTime = new Date(element.services[j].autho);
          }
        }
        this.services_bundle = data.result.value;
        this.__loader__.hideLoader();
        console.log("this.services_bundle ===============",this.services_bundle);
      }
    }), (err) => {
      this.__loader__.hideLoader();
      console.log("error al cargar el bundled: ", err);
    });
  }

  showService(item) {
    console.log("show service item =================== ",item);
    let dialog;
    switch (item.categoryId) {
      case 1:
        dialog = EntryVisaComponent;
        break;
      case 2:
        dialog = DialogWorkPermitComponent;
        break;
      case 3:
        dialog = DialogVisaDeregistrationComponent;
        break;
      case 4:
        dialog = DialogResidencyPermitComponent;
        break;
      case 5:
        dialog = DialogDocumentManagementComponent
        break;
      case 6:
        dialog = DialogLocalDocumentationComponent
        break;
      case 7:
        dialog = DialogCortporateAssistance
        break;
      case 8:
        dialog = DialogRenewal
        break;
      case 9:
        dialog = NotificationDialog
        break;
      case 10:
        dialog = DialogLegalReviewConsultation
      break;
      case 12:
        dialog = PreDecisionOrientationComponent
      break;
      case 13:
        dialog = AreaOrientationComponent
      break;
      case 14:
        dialog = SettlingInComponent
      break;
      case 15:
        dialog = SchoolSearchComponent
      break;
      case 16:
        dialog = DialogDepartureComponent
      break;
      case 17:
        dialog = DialogTemporaryHousingComponent
      break;
      case 18:
        dialog = DialogRentalFurnitureComponent
      break;
      case 19:
        dialog = DialogTransportationComponent
      break;
      case 20:
        dialog = DialogAirportTransportationComponent
      break;
      case 21: // home finding
      debugger;
        this._router.navigate(['homefindingfull/' + item.service[0].id ]);
        this._dialog.closeAll();
       // dialog = HomeFindingComponent
      break;
      case 22:
        dialog = LegalRenewalComponent
      break;
      case 23:
        dialog = HomeSaleComponent
      break;
      case 24:
        dialog = HomePurchaseComponent
      break;
      case 25:
        dialog = PropertyManagementComponent
      break;
      case 26:
        dialog = OtherComponent
      break;
      case 27:
        dialog = TenancyManagementComponent
      break;
      case 28:
        dialog = OtherImmigrationComponent
      break;
      default:
        break;
    }
    item.serviceRecordId = this.data.sr;
    item.sr_id = item.service[0].id;
    item.country_city = this.data.country_city;
    item.app_id = this.data.sr;
    item.sr = this.data.sr;
    item.data = item;
    item.data.country = this.data.country_city.home_contry_name;
    item.data.location =  this.data.country_city.home_city_name;
    item.data.home_host = this.data.home_host;
    item.sr_hcountry = this.data.country_city.home_contry_name;
    item.sr_hcity = this.data.country_city.home_city_name;
    item.hostCountryId = this.data.country_city.country_id;
    item.workOrderId = this.data.workOrderId;
    item.data.workOrderId = this.data.workOrderId;

     if(item.categoryId != 21){ // home finding
      const dialogRef = this._dialog.open(dialog, {
        data: item,
        maxWidth: '95vw',
        maxHeight: '90vh',
        height: '90%',
        width: '95%',
      });
  
      dialogRef.afterClosed().subscribe(result => {
  
      });
     }
    
  }

}
