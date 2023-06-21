import { Routes } from '@angular/router';

//import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamsComponent } from './Teams/teams.component';
import { NewServiceRecordComponent } from './NewServiceRecord/newServiceRecord.component';
import { EditServiceRecordComponent } from './EditServiceRecord/editServiceRecord.component';
import { ServiceRecordAllServicesComponent } from './ServiceRecordsAllServices/ServiceRecordAllServices.component';
import { AppointmentAllApointmentComponent } from './appointment-all-apointment/appointment-all-apointment.component';
import { RequestInvoiceComponent } from './RequestInvoice/requestInvoice.component';
import { ActionItemsComponent } from './ActionItems/ActionsItems.component';
import { SupplierPartnersComponent } from './supplier-partners/supplier-partners.component';
import { SupplierServicesComponent } from './supplier-services/supplier-services.component';
import { SupplierConsultantComponent } from './supplier-consultant/supplier-consultant.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EscalationsComponent } from './escalations/escalations.component';
import { PendingAuthorizationsComponent } from './PendingAuthorizations/PendingAuthorizations.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ReportsComponent } from './reports/reports.component';
import { ActivityComponent } from './activity/activity.component';
import { ExperienceSurveysComponent } from './experience-surveys/experience-surveys.component';
import { TrainingComponent } from './training/training.component';
import { PartnerComponent } from './partner/partner.component';
import { MyInvoicesComponent } from './my-invoices/my-invoices.component';
import { RequestCenterComponent } from './request-center/request-center.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoicesServiceComponent } from './invoices-service/invoices-service.component';
import { InvoicesSupplierComponent } from './invoices-supplier/invoices-supplier.component';
import { ThirdPartyExpensesComponent } from './third-party-expenses/third-party-expenses.component';
import { AdminCenterComponent } from './admin-center/admin-center.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileConsultantComponent } from './profile-consultant/profile-consultant.component';
import { ProfileCoordinatorComponent } from './profile-coordinator/profile-coordinator.component';
import { ProfileManagerComponent } from './profile-manager/profile-manager.component';
import { HomeComponent } from './home/home.component';
import { DirectoryComponent } from './directory/directory.component';
import { NotificationComponent } from './notification/notification.component';
import { MessengerCenterComponent } from './messenger-center/messenger-center.component';
import { MyTrainingComponent } from './my-training/my-training.component';
import { LeadsComponent } from './leads/leads.component';
import { NewPartnerClientComponent } from './new-partner-client/new-partner-client.component';
import { CountriesComponent } from './countries/countries.component';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { ServicesComponent } from './services/services.component';
import { TrainingAdminComponent } from './training-admin/training-admin.component';
import { AllActiveServicesComponent } from './activity/all-active-services/all-active-services.component';
import { ReportCountryPartnerComponent } from './activity/report-country-partner/report-country-partner.component';
import { ReportByStatusComponent } from './activity/report-by-status/report-by-status.component';
import { ReportsFullSistemContactsComponent } from './reports-full-sistem-contacts/reports-full-sistem-contacts.component';
import { SuplierPartnerComponent } from './activity/suplier-partner/suplier-partner.component';
import { AddTrainingComponent } from './training-admin/page/add-training/add-training.component';
import { ContentComponent } from './training-admin/page/content/content.component';
import { TrainingCursoComponent } from './training/page/training-curso/training-curso.component';
import { TrainingFinishedComponent } from './training/page/training-finished/training-finished.component'
import { PreviewComponent } from './training-admin/page/preview/preview.component';
// importaciones lu
import { CatalogsCurrenciesComponent } from './catalogs-currencies/catalogs-currencies.component';
import { CatalogsJobTitlesComponent } from './catalogs-job-titles/catalogs-job-titles.component';
import { CatalogsLanguagesComponent } from './catalogs-languages/catalogs-languages.component';
import { CatalogsLifeCiclesComponent } from './catalogs-life-cicles/catalogs-life-cicles.component';
import { CatalogsPremierOfficesComponent } from './catalogs-premier-offices/catalogs-premier-offices.component';
import { CatalogsRolesComponent } from './catalogs-roles/catalogs-roles.component';
import { CatalogsUsersComponent } from './catalogs-users/catalogs-users.component';
import { CatalogsSexComponent } from './catalogs-sex/catalogs-sex.component';
import { CatalogsMaritalStatusComponent } from './catalogs-marital-status/catalogs-marital-status.component';
import { CatalogsNationalityComponent } from './catalogs-nationality/catalogs-nationality.component';
import { CatalogsWeightMeasureComponent } from './catalogs-weight-measure/catalogs-weight-measure.component';
import { CatalogsPetTypeComponent } from './catalogs-pet-type/catalogs-pet-type.component';
import { CatalogsVehicleTypeComponent } from './catalogs-vehicle-type/catalogs-vehicle-type.component';
import { CatalogsProficiencyComponent } from './catalogs-proficiency/catalogs-proficiency.component';
import { CatalogsEducationLevelComponent } from './catalogs-education-level/catalogs-education-level.component';
import { CatalogsTaxPercentageComponent } from './catalogs-tax-percentage/catalogs-tax-percentage.component';
import { CatalogsCompanyTypeComponent } from './catalogs-company-type/catalogs-company-type.component';
// nuevo diseño admin center
import { AdminCenterUsersComponent } from './admin-center-users/admin-center-users.component';
import { AdminCenterSystemConfigurationComponent } from './admin-center-system-configuration/admin-center-system-configuration.component';
import { ViewAllReportsComponent } from './view-all-reports/view-all-reports.component';
import { HomeFindingFullComponent } from './home-finding-full/home-finding-full.component';

export const MaterialRoutes: Routes = [
  {
    path: 'teams',
    component: TeamsComponent,
    //canActivate: [NgxPermissionsGuard],
    //data: {
    //  permissions: {
    //    only: ['ADMIN', 'MODERATOR'],
    //    redirectTo: ''
    //  }
    //}
  },
  {path: 'serviceRecord', component: NewServiceRecordComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'editServiceRecord/:id/:tipo', component: EditServiceRecordComponent},
  {path: 'editServiceRecord/:id', component: EditServiceRecordComponent},
  {path: 'editServiceRecord', component: EditServiceRecordComponent},
  {path: 'serviceRecordAllServices/:id', component: ServiceRecordAllServicesComponent},
  {path: 'Allappointment/:id', component: AppointmentAllApointmentComponent},
  {path: 'requestInvoice', component: RequestInvoiceComponent},
  {path: 'actionItems', component: ActionItemsComponent},
  {path: 'serviceCalendar', component: CalendarComponent},
  {path: 'escalations', component: EscalationsComponent},
  {path: 'supplierPartners', component: SupplierPartnersComponent},
  {path: 'supplierServices/:id', component: SupplierServicesComponent},
  {path: 'supplierConsultant/:id', component: SupplierConsultantComponent},
  {path: 'PendingAuthorizations', component: PendingAuthorizationsComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'activity', component: ActivityComponent},
  {path: 'experienceSurveys', component: ExperienceSurveysComponent},
  {path: 'training', component: TrainingComponent},
  {path: 'TrainingCursoComponent/:id', component: TrainingCursoComponent},
  {path: 'partner', component: PartnerComponent},
  {path: 'admin', component: AdminCenterComponent},
  {path: 'myprofile', component: ProfileComponent},
  {path: 'home', component: HomeComponent },
  {path: 'directory', component: DirectoryComponent },
  {path: 'notification', component: NotificationComponent },
  {path: 'messenger-center/:id', component: MessengerCenterComponent},
  {path: 'my-training', component: MyTrainingComponent},
  {path: 'leads', component: LeadsComponent},
  {path: 'partner_client/:id', component: NewPartnerClientComponent},
  {path: 'lead/:id', component: NewPartnerClientComponent},
  {path: 'profileconsultant/:id', component: ProfileConsultantComponent},
  {path: 'profilecoordinator/:id', component: ProfileCoordinatorComponent},
  {path: 'profilemanager/:id', component: ProfileManagerComponent},
  {path: 'countries', component: CountriesComponent},
  {path: 'catalogs', component: CatalogsComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'admin-trainig', component: TrainingAdminComponent},
  {path: 'activity/all-active-services', component: AllActiveServicesComponent},
  {path: 'requestcenter', component: RequestCenterComponent },
  {path: 'invoicelist', component: MyInvoicesComponent},
  {path: 'invoicesService', component: InvoicesServiceComponent},
  {path: 'invoicesSupplier', component: InvoicesSupplierComponent},
  {path: 'thirdPartyExpenses', component: ThirdPartyExpensesComponent},
  {path: 'myInvoices', component: MyInvoicesComponent},
  {path: 'reports/all-active-services', component: AllActiveServicesComponent},
  {path: 'reports/:country/:idcountry', component: ReportCountryPartnerComponent},
  {path: 'reports/:country/:idcountry/:partner/:idparner', component: ReportCountryPartnerComponent},
  {path: 'reportsBystatus/:idStatus/:statusName', component: ReportByStatusComponent},
  {path: 'admin-trainig', component: TrainingAdminComponent },
  {path: 'full-sistem-contacts', component: ReportsFullSistemContactsComponent},
  {path: 'reportsBySuplier/:id/:name', component: SuplierPartnerComponent},
  {path: 'admin-trainig/addTraining/:id', component: AddTrainingComponent},
  {path: 'addTraining/Content', component: ContentComponent},
  {path: 'trainingFinish/:id', component: TrainingFinishedComponent },
  {path: 'PreviewComponent', component: PreviewComponent},
  {path: 'reportsBySuplier/:id/:name', component: SuplierPartnerComponent },
  // rutas lu
  { path: 'catalogs/currencies', component: CatalogsCurrenciesComponent },
  { path: 'catalogs/job-titles', component: CatalogsJobTitlesComponent },
  { path: 'catalogs/languages', component: CatalogsLanguagesComponent },
  { path: 'catalogs/life-cicles', component: CatalogsLifeCiclesComponent },
  { path: 'catalogs/offices', component: CatalogsPremierOfficesComponent },
  { path: 'catalogs/roles', component: CatalogsRolesComponent },
  { path: 'catalogs/user', component: CatalogsUsersComponent },

  { path: 'catalogs/sex', component: CatalogsSexComponent },
  { path: 'catalogs/marital-status', component: CatalogsMaritalStatusComponent },
  { path: 'catalogs/nationality', component: CatalogsNationalityComponent },
  { path: 'catalogs/weight-measure', component: CatalogsWeightMeasureComponent },
  { path: 'catalogs/pet-type', component: CatalogsPetTypeComponent },
  { path: 'catalogs/vehicle-type', component: CatalogsVehicleTypeComponent },
  { path: 'catalogs/proficiency', component: CatalogsProficiencyComponent },
  { path: 'catalogs/education-level', component: CatalogsEducationLevelComponent },
  { path: 'catalogs/tax-percentage', component: CatalogsTaxPercentageComponent },
  { path: 'catalogs/company-type', component: CatalogsCompanyTypeComponent },
  { path: 'viewAllReport/:id', component: ViewAllReportsComponent },
  // nuevo diseño de admin center
  { path: 'admin-center/users', component: AdminCenterUsersComponent },
  { path: 'admin-center/system-configuration', component: AdminCenterSystemConfigurationComponent }
  ,{path: 'homefindingfull/:id',component: HomeFindingFullComponent }
];
