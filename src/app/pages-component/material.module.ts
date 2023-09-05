import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartistModule } from 'ng-chartist';

import { MaterialRoutes } from './material.routing';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamsComponent } from './Teams/teams.component';
import { NewServiceRecordComponent } from './NewServiceRecord/newServiceRecord.component';
import { DialogBasePruebaComponent } from './dialog/dialog-base-prueba/dialog-base-prueba.component';
import { NewServiceOrderDialog } from './dialog/new-services-record-dialogs/new-service-order.component';
import { DialogSearchProfileComponent } from './dialog/search-profile/search-profile.component';
import { DialogGeneralMessageComponent } from './dialog/general-message/general-message.component';
import { DialogNsrTableDetail } from './dialog/new-services-record-dialogs/nsr-table-detail.component';
import { EditServiceRecordComponent } from './EditServiceRecord/editServiceRecord.component';
import { DialogRequestInformation } from './dialog/edit-service-records/request-information.component';
import { DialogEditServices } from './dialog/edit-service-records/edit-services.component';
import { ServiceRecordAllServicesComponent } from './ServiceRecordsAllServices/ServiceRecordAllServices.component';
import { DialogExportAllServicesComponent } from './dialog/edit-service-records/export-all-services.component';
import { DialogEscalateComponent } from './dialog/edit-service-records/escalate.component';
import { EntryVisaComponent } from './dialog/entry-visa/entry-visa.component';
import { DialogInvoiceEditComponent } from './dialog/edit-service-records/invoice-edit-so.component';
import { RequestInvoiceComponent } from './RequestInvoice/requestInvoice.component'
import { DialogWorkPermitComponent } from './dialog/dialog-work-permit/dialog-work-permit.component';
import { DialogVisaDeregistrationComponent } from './dialog/dialog-visa-deregistration/dialog-visa-deregistration.component';
import { NotificationDialog } from './dialog/notification/notification.component';
import { GeneralConfirmationComponent } from './dialog/general-confirmation/general-confirmation.component';
import { DialogRenewal } from './dialog/renewal/renewal.component';
import { DialogCortporateAssistance } from './dialog/corporate-assistance/corporate-assistance.component';
import { DialogLegalReviewConsultation } from './dialog/legal-review-consultation/legal-review-consultation.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogAddCall } from './dialog/dialog-add-call/addCall.component';
import { DialogAssignTask } from './dialog/dialog-assign-task/assignTask.component';
import { DialogEditTask } from './dialog/dialog-edit-task/editTask.component';
//import { DialogMapit } from './dialog/dialog-mapit/mapit.component';
import { DialogViewEscalation } from './dialog/dialog-view-escalation/viewEscalation.component';
import { DialogEscalationLevels } from './dialog/escalation-levels/escalationLevel.component';

import { DialogLocalDocumentationComponent } from './dialog/dialog-local-documentation/dialog-local-documentation.component';
import { DialogDocumentManagementComponent } from './dialog/dialog-document-management/dialog-document-management.component';

import { DialogResidencyPermitComponent } from './dialog/dialog-residency-permit/dialog-residency-permit.component';
import { DialogAddAppointmentComponent } from './dialog/dialog-add-appointment/dialog-add-appointment.component';
import { DialogExportComponent } from './dialog/dialog-export/dialog-export.component';

import { PreDecisionOrientationComponent } from './dialog/pre-decision-orientation/pre-decision-orientation.component';
import { AreaOrientationComponent } from './dialog/area-orientation/area-orientation.component';
import { HomeFindingComponent } from './dialog/home-finding/home-finding.component';
import { DialogDocumentsComponent } from './dialog/dialog-documents/dialog-documents.component';
import { SettlingInComponent } from './dialog/settling-in/settling-in.component';
import { SchoolSearchComponent } from './dialog/school-search/school-search.component';
import { DialogDepartureComponent } from './dialog/dialog-departure/dialog-departure.component';
import { DialogTemporaryHousingComponent } from './dialog/dialog-temporary-housing/dialog-temporary-housing.component';
import { DialogRentalFurnitureComponent } from './dialog/dialog-rental-furniture/dialog-rental-furniture.component';
import { DialogTransportationComponent } from './dialog/dialog-transportation/dialog-transportation.component';
import { DialogAirportTransportationComponent } from './dialog/dialog-airport-transportation/dialog-airport-transportation.component';
import { DialogCompleteComponent } from './dialog/dialog-complete/dialog-complete.component';
import { DialogEvaluateComponent } from './dialog/dialog-evaluate/dialog-evaluate.component';
import { DialogRequestPaymentComponent } from './dialog/dialog-request-payment/dialog-request-payment.component';
import { DialogTenancyComponent } from './dialog/dialog-tenancy/dialog-tenancy.component';
import { DialogPropertyComponent } from './dialog/dialog-property/dialog-property.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DialogHousingSpecificationsComponent } from './dialog/dialog-housing-specifications/dialog-housing-specifications.component';
import { DialogHomeDetailsComponent } from './dialog/dialog-home-details/dialog-home-details.component';
import { DialogSchoolDetailsComponent } from './dialog/dialog-school-details/dialog-school-details.component';
import { DialogPropertyReportComponent } from './dialog/dialog-property-report/dialog-property-report.component';
import { DialogInventoryComponent } from './dialog/dialog-inventory/dialog-inventory.component';
import { DialogAddchildComponent } from './dialog/dialog-addchild/dialog-addchild.component';
import { DialogAddpaymentComponent } from './dialog/dialog-addpayment/dialog-addpayment.component';
import { DialogIncludedInRentComponent } from './dialog/dialog-included-in-rent/dialog-included-in-rent.component';
import { DialogCostSavingsComponent } from './dialog/dialog-cost-savings/dialog-cost-savings.component';
import { DialogReportDayComponent } from './dialog/dialog-report-day/dialog-report-day.component';
import { DialogRequestAdditionalTimeComponent } from './dialog/dialog-request-additional-time/dialog-request-additional-time.component';
import { DialogGeneralConfirmation } from './dialog/dialog-general-confirmation/dialog-general-confirmation.component';
import { DialogSliderComponent } from './dialog/dialog-slider/dialog-slider.component';
import { DialogChangeStatusComponent } from './dialog/dialog-change-status/dialog-change-status.component';
import { DialogHistoryStatusComponent } from './dialog/dialog-history-status/dialog-history-status.component';
import { DialogCommentHistoryComponent } from './dialog/dialog-comment-history/dialog-comment-history.component';
import { DialogDocumentsView } from './dialog/dialog-documents-view/dialog-documents-view.component';
import { DialogLibraryDocuments } from './dialog/dialog-library-documents/dialog-library-documents.component';
import { DialogCoordinatorsComponent } from './dialog/dialog-coordinators/Coordinators.component';
import { DialogExporthsComponent } from './dialog/dialog-export-hs/dialog-export-hs.component'

import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { MatTimepickerModule } from 'mat-timepicker';
import { ActionItemsComponent } from './ActionItems/ActionsItems.component';
import { SupplierPartnersComponent } from './supplier-partners/supplier-partners.component';
import { NewSupplierComponent } from './dialog/new-supplier/new-supplier.component';
import { DialogNewContactComponent } from './dialog/dialog-new-contact/dialog-new-contact.component';
import { DialogDocumentProfileSupplierComponent } from './dialog/dialog-document-profile-supplier/dialog-document-profile-supplier.component';
import { DialogWireTransferComponent } from './dialog/dialog-wire-transfer/dialog-wire-transfer.component';
import { DialogConsultantComponent } from './dialog/dialog-consultant/dialog-consultant.component';
import { SupplierServicesComponent } from './supplier-services/supplier-services.component';
import { SupplierConsultantComponent } from './supplier-consultant/supplier-consultant.component';
import { DialogAdministrativeContactConsultantComponent } from './dialog/dialog-administrative-contact-consultant/dialog-administrative-contact-consultant.component';
import { DialogConsultantContactConsultantComponent } from './dialog/dialog-consultant-contact-consultant/dialog-consultant-contact-consultant.component';
import { DialogAddVahicleComponent } from './dialog/dialog-add-vahicle/dialog-add-vahicle.component';
import { DialogAddVahicleConsultantComponent } from './dialog/dialog-add-vahicle-consultant/dialog-add-vahicle-consultant.component';
import { DialogCalendarComponent } from './dialog/dialog-calendar/dialog-calendar.component';
import { NgxIconCalendarModule, NgxIconCalendarComponent  } from 'ngx-icon-calendar';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './calendar/calendar.component';
import { DialogFollowingComponent } from './dialog/dialog-following/dialog-following.component';
import { EscalationsComponent } from './escalations/escalations.component';
import { DialogArrivalComponent } from './dialog/dialog-arrival/dialog-arrival.component';
import { DialogCallsComponent } from './dialog/dialog-calls/dialog-calls.component';
import { DialogEditCallComponent } from './dialog/dialog-edit-call/dialog-edit-call.component';
import { DialogDashboardAddCallComponent } from './dialog/dialog-dashboard-add-call/dialog-dashboard-add-call.component';
import { DialogDashboardRemindersComponent } from './dialog/dialog-dashboard-reminders/dialog-dashboard-reminders.component';
import { DialogDashboardAddRemindersComponent } from './dialog/dialog-dashboard-add-reminders/dialog-dashboard-add-reminders.component';
import { PendingAuthorizationsComponent } from './PendingAuthorizations/PendingAuthorizations.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ReportsComponent } from './reports/reports.component';
import { ActivityComponent } from './activity/activity.component';
import { ExperienceSurveysComponent } from './experience-surveys/experience-surveys.component';
import { TrainingComponent } from './training/training.component';
import { FinanceComponent } from './finance/finance.component';
import { AdminCenterComponent } from './admin-center/admin-center.component';
import { PartnerComponent } from './partner/partner.component';
import { DialogAvailabilityCalendarComponent } from './dialog/dialog-availability-calendar/dialog-availability-calendar.component';
import { MatChipsModule } from '@angular/material/chips';
import { DialogAddAvailabilityCalendarComponent } from './dialog/dialog-add-availability-calendar/dialog-add-availability-calendar.component';
import { DialogReportErrorComponent } from './dialog/dialog-report-error/dialog-report-error.component';
import { DialogRequestPaymentNewComponent } from './dialog/dialog-request-payment-new/dialog-request-payment-new.component';
import { DialogDocumentRequestComponent } from './dialog/dialog-document-request/dialog-document-request.component';
import { DialogDocumentRequestRecurrentComponent } from './dialog/dialog-document-request-recurrent/dialog-document-request-recurrent.component';
import { DialogPaymentConceptComponent } from './dialog/dialog-payment-concept/dialog-payment-concept.component';
import { ProfileComponent } from './profile/profile.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HomeComponent } from './home/home.component';
import { DirectoryComponent } from './directory/directory.component';
import { DialogTimeoffrequestComponent } from './dialog/dialog-timeoffrequest/dialog-timeoffrequest.component';
import { NotificationComponent } from './notification/notification.component';
import { MessengerCenterComponent } from './messenger-center/messenger-center.component';
import { DialogNewChatComponent } from './dialog/dialog-new-chat/dialog-new-chat.component';
import { DialogDeletepaymentconceptComponent } from './dialog/dialog-deletepaymentconcept/dialog-deletepaymentconcept.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { DialogInspectionrepairsComponent } from './dialog/dialog-inspectionrepairs/dialog-inspectionrepairs.component';
import { DialogLeaseSummaryComponent } from './dialog/dialog-lease-summary/dialog-lease-summary.component';
import { DialogPropertyExpensesComponent } from './dialog/dialog-property-expenses/dialog-property-expenses.component';
import { DialogPaymentTypeComponent } from './dialog/dialog-payment-type/dialog-payment-type.component';
import { DialogKeyComponent } from './dialog/dialog-key/dialog-key.component';
import { DialogAttendeesComponent } from './dialog/dialog-attendees/dialog-attendees.component';
import { MyTrainingComponent } from './my-training/my-training.component';
import { LeadsComponent } from './leads/leads.component';
import { NewPartnerClientComponent } from './new-partner-client/new-partner-client.component';
import { DialogContractPricingInfoComponent } from './dialog/dialog-contract-pricing-info/dialog-contract-pricing-info.component';
import { DialogDocumentsLeadClientComponent } from './dialog/dialog-documents-lead-client/dialog-documents-lead-client.component';
import { DialogActivityLogComponent } from './dialog/dialog-activity-log/dialog-activity-log.component';
import { DialogTermsOfTheDealComponent } from './dialog/dialog-terms-of-the-deal/dialog-terms-of-the-deal.component';
import { DialogOfficeInformationComponent } from './dialog/dialog-office-information/dialog-office-information.component';
import { DialogContactsComponent } from './dialog/dialog-contacts/dialog-contacts.component';
import { DialogAddClientComponent } from './dialog/dialog-add-client/dialog-add-client.component';
import { DialogAddServiceComponent } from './dialog/dialog-add-service/dialog-add-service.component';
import { DialogAddCuntryComponent } from './dialog/dialog-add-cuntry/dialog-add-cuntry.component';
import { DialogScoreAwadsComponent } from './dialog/dialog-score-awads/dialog-score-awads.component';
import { DialogExperiensTeamComponent } from './dialog/dialog-experiens-team/dialog-experiens-team.component';
import { DialogReportOfDayComponent } from './dialog/dialog-report-of-day/dialog-report-of-day.component';
import { ProfileConsultantComponent } from './profile-consultant/profile-consultant.component';
import { ProfileCoordinatorComponent } from './profile-coordinator/profile-coordinator.component';
import { ProfileManagerComponent } from './profile-manager/profile-manager.component';
import { DialogEmergencyContactComponent } from './dialog/dialog-emergency-contact/dialog-emergency-contact.component';
import { DialogProfileDocumentComponent } from './dialog/dialog-profile-document/dialog-profile-document.component';
import { DialogAddOfficeComponent } from './dialog/dialog-add-office/dialog-add-office.component';
import { DialogAddCountryComponent } from './dialog/dialog-add-country/dialog-add-country.component';
import { DialogAddOperationLeaderComponent } from './dialog/dialog-add-operation-leader/dialog-add-operation-leader.component';
import { DialogAddAssignedTeamComponent } from './dialog/dialog-add-assigned-team/dialog-add-assigned-team.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CountriesComponent } from './countries/countries.component';
import { DialogAdminCenterCountriesComponent } from './dialog/dialog-admin-center-countries/dialog-admin-center-countries.component';
import { DialogAdminCenterAddCityComponent } from './dialog/dialog-admin-center-add-city/dialog-admin-center-add-city.component';
import { DialogAdminCenterAddInfoComponent } from './dialog/dialog-admin-center-add-info/dialog-admin-center-add-info.component';
import { CatalogsComponent } from './catalogs/catalogs.component';
import { ServicesComponent } from './services/services.component';
import { TrainingAdminComponent } from './training-admin/training-admin.component';
import { DialogCatalogCurrenciesComponent } from './dialog/dialog-catalog-currencies/dialog-catalog-currencies.component';
import { DialogCatalogLanguagesComponent } from './dialog/dialog-catalog-languages/dialog-catalog-languages.component';
import { DialogCatalogOfficesComponent } from './dialog/dialog-catalog-offices/dialog-catalog-offices.component';
import { DialogCatalogRolesComponent } from './dialog/dialog-catalog-roles/dialog-catalog-roles.component';
import { DialogCatalogTitlesComponent } from './dialog/dialog-catalog-titles/dialog-catalog-titles.component';
import { DialogCatalogCliclesComponent } from './dialog/dialog-catalog-clicles/dialog-catalog-clicles.component';
import { DialogCatalogUserComponent } from './dialog/dialog-catalog-user/dialog-catalog-user.component';
import { DialogAddCountrySeccionCountryComponent } from './dialog/dialog-add-country-seccion-country/dialog-add-country-seccion-country.component';
import { DialogAddServiceAdminCenterComponent } from './dialog/dialog-add-service-admin-center/dialog-add-service-admin-center.component';
import { DialogAdminCenterDocumentsUploadComponent } from './dialog/dialog-admin-center-documents-upload/dialog-admin-center-documents-upload.component';
import { DialogAdminCenterEmergencyComponent } from './dialog/dialog-admin-center-emergency/dialog-admin-center-emergency.component';
import { DialogPaymentConceptDocumentComponent } from './dialog/dialog-payment-concept-document/dialog-payment-concept-document.component';
import { AllActiveServicesComponent } from './activity/all-active-services/all-active-services.component';
import { RequestCenterComponent } from './request-center/request-center.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { ReportCountryPartnerComponent } from './activity/report-country-partner/report-country-partner.component';
import { ReportByStatusComponent } from './activity/report-by-status/report-by-status.component';
import { ReportsFullSistemContactsComponent } from './reports-full-sistem-contacts/reports-full-sistem-contacts.component';
import { DialogAddTableFullSistemContactComponent } from './dialog/dialog-add-table-full-sistem-contact/dialog-add-table-full-sistem-contact.component';
import { SuplierPartnerComponent } from './activity/suplier-partner/suplier-partner.component';
import { DialogAddFilterFullSistemContactComponent } from './dialog/dialog-add-filter-full-sistem-contact/dialog-add-filter-full-sistem-contact.component';
import { NewTableOperationalReportsComponent } from './dialog/new-table-operational-reports/new-table-operational-reports.component';
import { DndListModule } from 'ngx-drag-and-drop-lists';
import { DialogEditColumsOperationalReportsComponent } from './dialog/dialog-edit-colums-operational-reports/dialog-edit-colums-operational-reports.component';
import { DialogEditFiltersOperationalReportsComponent } from './dialog/dialog-edit-filters-operational-reports/dialog-edit-filters-operational-reports.component';

import { DialogRequestInvoiceComponent } from './dialog/dialog-request-invoice/dialog-request-invoice.component';
import { DialogDocumentInvoiceComponent } from './dialog/dialog-document-invoice/dialog-document-invoice.component';
import { DialogConfirmComponent } from './dialog/dialog-confirm/dialog-confirm.component';
import { DialogSupplierpartnerinvoiceComponent } from './dialog/dialog-supplierpartnerinvoice/dialog-supplierpartnerinvoice.component';
import { DialogAddColumnsFullSistemContactComponent } from './dialog/dialog-add-columns-full-sistem-contact/dialog-add-columns-full-sistem-contact.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { StickynoteComponent } from './stickynote/stickynote.component';
import { DialogStickynoteComponent } from './dialog/dialog-stickynote/dialog-stickynote.component';
import { ThirdPartyExpensesComponent } from './third-party-expenses/third-party-expenses.component';
import { InvoicesSupplierComponent } from './invoices-supplier/invoices-supplier.component';
import { InvoicesServiceComponent } from './invoices-service/invoices-service.component';
import { MyInvoicesComponent } from './my-invoices/my-invoices.component';
import { DialogAdditionalExpensesComponent } from './dialog/dialog-additional-expenses/dialog-additional-expenses.component';
import { DialogRequestedInvoiceComponent } from './dialog/dialog-requested-invoice/dialog-requested-invoice.component';
import { DialogRequestedInvoicesDocumentComponent } from './dialog/dialog-requested-invoices-document/dialog-requested-invoices-document.component';
import { AddParticipanteComponent } from './training-admin/dialog/add-participante/add-participante.component';
import { AddTrainingComponent } from './training-admin/page/add-training/add-training.component';
import { AddContentComponent } from './training-admin/dialog/add-content/add-content.component';
import { ContentComponent } from './training-admin/page/content/content.component';
import { AddElementComponent } from './training-admin/dialog/add-element/add-element.component';
import { TrainingCursoComponent } from './training/page/training-curso/training-curso.component';
import { TrainingFinishedComponent } from './training/page/training-finished/training-finished.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { PreviewComponent } from './training-admin/page/preview/preview.component';

import { CatalogsCurrenciesComponent } from './catalogs-currencies/catalogs-currencies.component';
import { CatalogsLanguagesComponent } from './catalogs-languages/catalogs-languages.component';
import { CatalogsPremierOfficesComponent } from './catalogs-premier-offices/catalogs-premier-offices.component';
import { CatalogsRolesComponent } from './catalogs-roles/catalogs-roles.component';
import { CatalogsJobTitlesComponent } from './catalogs-job-titles/catalogs-job-titles.component';
import { CatalogsLifeCiclesComponent } from './catalogs-life-cicles/catalogs-life-cicles.component';
import { CatalogsUsersComponent } from './catalogs-users/catalogs-users.component';
import { CatalogsSexComponent } from './catalogs-sex/catalogs-sex.component';
import { CatalogsMaritalStatusComponent } from './catalogs-marital-status/catalogs-marital-status.component';
import { CatalogsNationalityComponent } from './catalogs-nationality/catalogs-nationality.component';
import { CatalogsWeightMeasureComponent } from './catalogs-weight-measure/catalogs-weight-measure.component';
import { CatalogsPetTypeComponent } from './catalogs-pet-type/catalogs-pet-type.component';
import { CatalogsVehicleTypeComponent } from './catalogs-vehicle-type/catalogs-vehicle-type.component';
import { CatalogsTaxPercentageComponent } from './catalogs-tax-percentage/catalogs-tax-percentage.component';
import { CatalogsProficiencyComponent } from './catalogs-proficiency/catalogs-proficiency.component';
import { CatalogsEducationLevelComponent } from './catalogs-education-level/catalogs-education-level.component';
import { CatalogsCompanyTypeComponent } from './catalogs-company-type/catalogs-company-type.component';
import { DialogCatalogSexComponent } from './dialog/dialog-catalog-sex/dialog-catalog-sex.component';
import { DialogCatalogPetTypeComponent } from './dialog/dialog-catalog-pet-type/dialog-catalog-pet-type.component';
import { DialogCatalogVehicleTypeComponent } from './dialog/dialog-catalog-vehicle-type/dialog-catalog-vehicle-type.component';
import { DialogCatalogTaxPercentageComponent } from './dialog/dialog-catalog-tax-percentage/dialog-catalog-tax-percentage.component';
import { DialogCatalogCompanyTypeComponent } from './dialog/dialog-catalog-company-type/dialog-catalog-company-type.component';
import { DialogCatalogProficiencyComponent } from './dialog/dialog-catalog-proficiency/dialog-catalog-proficiency.component';
import { DialogCatalogEducationLevelComponent } from './dialog/dialog-catalog-education-level/dialog-catalog-education-level.component';
import { AdminCenterUsersComponent } from './admin-center-users/admin-center-users.component';
import { AdminCenterSystemConfigurationComponent } from './admin-center-system-configuration/admin-center-system-configuration.component';
import { DialogCatalogRelationshipComponent } from './dialog/dialog-catalog-relationship/dialog-catalog-relationship.component';
import { DialogCatalogVisaCategoryComponent } from './dialog/dialog-catalog-visa-category/dialog-catalog-visa-category.component';
import { DialogCatalogPrivacyComponent } from './dialog/dialog-catalog-privacy/dialog-catalog-privacy.component';
import { DialogInactiveUserComponent } from './dialog/dialog-inactive-user/dialog-inactive-user.component';
import { DialogAddLeaderComponent } from './dialog/dialog-add-leader/dialog-add-leader.component';
import { DialogCatalogPolicyComponent } from './dialog/dialog-catalog-policy/dialog-catalog-policy.component';
import { DialogCatalogPaymentResponsibilityComponent } from './dialog/dialog-catalog-payment-responsibility/dialog-catalog-payment-responsibility.component';
import { DialogCatalogPartnerStatusComponent } from './dialog/dialog-catalog-partner-status/dialog-catalog-partner-status.component';
import { DialogCatalogCoverageTypeComponent } from './dialog/dialog-catalog-coverage-type/dialog-catalog-coverage-type.component';
import { DialogCatalogServiceTypeComponent } from './dialog/dialog-catalog-service-type/dialog-catalog-service-type.component';
import { DialogCatalogTransportTypeComponent } from './dialog/dialog-catalog-transport-type/dialog-catalog-transport-type.component';
import { DialogCatalogCoordinatorTypeComponent } from './dialog/dialog-catalog-coordinator-type/dialog-catalog-coordinator-type.component';
import { DialogCatalogNotificationTypeComponent } from './dialog/dialog-catalog-notification-type/dialog-catalog-notification-type.component';
import { DialogCatalogDocumentTypeComponent } from './dialog/dialog-catalog-document-type/dialog-catalog-document-type.component';
import { DialogCatalogContactTypeComponent } from './dialog/dialog-catalog-contact-type/dialog-catalog-contact-type.component';
import { DialogCatalogSupplierTypeComponent } from './dialog/dialog-catalog-supplier-type/dialog-catalog-supplier-type.component';
import { DialogCatalogBreedComponent } from './dialog/dialog-catalog-breed/dialog-catalog-breed.component';
import { DialogChangePasswordComponent } from './dialog/dialog-change-password/dialog-change-password.component';
import { LegalRenewalComponent } from './dialog/legal-renewal/legal-renewal.component';
import { DialogCatalogStatusComponent } from './dialog/dialog-catalog-status/dialog-catalog-status.component';
import { AddGroupComponent } from './training-admin/dialog/add-group/add-group.component';
import { HomeSaleComponent } from './dialog/home-sale/home-sale.component';
import { HomePurchaseComponent } from './dialog/home-purchase/home-purchase.component';
import { OtherComponent } from './dialog/other/other.component';
import { PropertyManagementComponent } from './dialog/property-management/property-management.component';
import { DialogAddVisitComponent } from './dialog/dialog-add-visit/dialog-add-visit.component';
import { DialogAddUpcomingComponent } from './dialog/dialog-add-upcoming/dialog-add-upcoming.component';
import { DialogAddSlideHomeComponent } from './dialog/dialog-add-slide-home/dialog-add-slide-home.component';
import { DialogPostItComponent } from './dialog/dialog-post-it/dialog-post-it.component';
import { DialogCompletionReportImmigrationComponent } from './dialog/dialog-completion-report-immigration/dialog-completion-report-immigration.component';
import { ViewAllReportsComponent } from './view-all-reports/view-all-reports.component';
import { DialogCompletionReportRelocationComponent } from './dialog/dialog-completion-report-relocation/dialog-completion-report-relocation.component';
import { OrderModule } from 'ngx-order-pipe';
import { TenancyManagementComponent } from './dialog/tenancy-management/tenancy-management.component';
import { DialogAddEventTenancyComponent } from './dialog/dialog-add-event-tenancy/dialog-add-event-tenancy.component';
import { DialogAddConclusionCompletionReportComponent } from './dialog/dialog-add-conclusion-completion-report/dialog-add-conclusion-completion-report.component';
import { DialogDocumentsRelocationComponent } from './dialog/dialog-documents-relocation/dialog-documents-relocation.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EditorModule } from '@progress/kendo-angular-editor';
import { NgxMaskModule } from 'ngx-mask';
import { DialogBundleComponent } from './dialog/dialog-bundle/dialog-bundle.component';
//import { DialogCampusComponent } from './dialog/dialog-campus/dialog-campus.component';
import { DialogInHoldComponent } from './dialog/dialog-in-hold/dialog-in-hold.component';
import { DialogCatalogResponsibleComponent } from './dialog/dialog-catalog-responsible/dialog-catalog-responsible.component';
import { OtherImmigrationComponent } from './dialog/other-immigration/other-immigration.component';
import { CalendarDaysComponent } from './dialog/calendar-days/calendar-days.component';
import { ConfirmationCalendarComponent } from './dialog/confirmation-calendar/confirmation-calendar.component';
import { DialogCatalogReferralFeeComponent } from './dialog/dialog-catalog-referral-fee/dialog-catalog-referral-fee.component';
import { DialogAssignTaskEDRComponent } from './dialog/dialog-assign-task-edr/dialog-assign-task-edr.component';
import { DialogDocumentsAdminCenterServicesComponent } from './dialog/dialog-documents-admin-center-services/dialog-documents-admin-center-services.component';
import { DialogCatalogContractTypeComponent } from './dialog/dialog-catalog-contract-type/dialog-catalog-contract-type.component';
import { DialogCatalogDesiredPropertyTypeComponent } from './dialog/dialog-catalog-desired-property-type/dialog-catalog-desired-property-type.component';
import { DialogCatalogEmergecyContactComponent } from './dialog/dialog-catalog-emergecy-contact/dialog-catalog-emergecy-contact.component';
import { DialogCatalogPricingScheduleComponent } from './dialog/dialog-catalog-pricing-schedule/dialog-catalog-pricing-schedule.component';
import { DialogAddAccountTypeComponent } from './dialog/dialog-add-account-type/dialog-add-account-type.component';
import { StartAppointmentComponent } from './dialog/start-appointment/start-appointment.component';
import { DialogApplyAllScopeComponent } from './dialog/dialog-apply-all-scope/dialog-apply-all-scope.component';
import { OfficetypecatalogComponent } from './dialog/officetypecatalog/officetypecatalog.component';
import { ScopeservicesallComponent } from './dialog/scopeservicesall/scopeservicesall.component';
import { DialogConfirmServiceComponent } from './dialog/dialog-confirm-service/dialog-confirm-service.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DialogCropImageComponent } from './dialog/dialog-crop-image/dialog-crop-image.component';
import { DialogAcceptedComponent } from './dialog/dialog-accepted/dialog-accepted.component';
import { QuillModule } from 'ngx-quill';
import { DialogPaymentSchoolingComponent } from './dialog/dialog-payment-schooling/dialog-payment-schooling.component';
import { DialogPaymentRentalComponent } from './dialog/dialog-payment-rental/dialog-payment-rental.component';
import  {MatCurrencyFormatModule} from 'mat-currency-format';
import { DialogStatusDetailComponent } from './dialog/dialog-status-detail/dialog-status-detail.component';
import { DialoglLandlordBankDetailComponent } from './dialog/dialogl-landlord-bank-detail/dialogl-landlord-bank-detail.component';
import { AppointmentAllApointmentComponent } from './appointment-all-apointment/appointment-all-apointment.component';
import { DialogAttendeesInspecComponent } from './dialog/dialog-attendees-inspec/dialog-attendees-inspec.component';
import { PrintLsfComponent } from './dialog/print-lsf/print-lsf.component';
import { DialogAddPaymenentInformationComponent } from './dialog/dialog-add-paymenent-information/dialog-add-paymenent-information.component';
import { PrintLdComponent } from './dialog/print-ld/print-ld.component';
import { PrintIrComponent } from './dialog/print-ir/print-ir.component';
import { AsignarserviciosComponent } from './dialog/asignarservicios/asignarservicios.component';
import { DialogDasboardServiceComponent } from './dialog/dialog-dasboard-service/dialog-dasboard-service.component';
import { LsfComponent } from './dialog/home-finding/lsf/lsf.component';
import { IrComponent } from './dialog/home-finding/ir/ir.component';
import { HomeFindingFullComponent } from './home-finding-full/home-finding-full.component';
import { DialogClientSdComponent } from './dialog/dialog-client-sd/dialog-client-sd.component';
import { DialogClientDocuComponent } from './dialog/dialog-client-docu/dialog-client-docu.component';
import { LsfSelectComponent } from './dialog/lsf-select/lsf-select.component';
import { LsfContractComponent } from './dialog/lsf-contract/lsf-contract.component';
import { LsfPaymentsComponent } from './dialog/lsf-payments/lsf-payments.component';
import { LsfCostComponent } from './dialog/lsf-cost/lsf-cost.component';
import { LsfRenewalComponent } from './dialog/lsf-renewal/lsf-renewal.component';
import { LsfDepartureComponent } from './dialog/lsf-departure/lsf-departure.component';
import { LsfLandlordComponent } from './dialog/lsf-landlord/lsf-landlord.component';
import { IrSelectComponent } from './dialog/ir-select/ir-select.component';
import { IrMoveinComponent } from './dialog/ir-movein/ir-movein.component';
import { IrMoveoutComponent } from './dialog/ir-moveout/ir-moveout.component';
import { IrIrComponent } from './dialog/ir-ir/ir-ir.component';
import { IrMoveinDetailComponent } from './dialog/ir-movein-detail/ir-movein-detail.component';
import { IrInspectionDetailComponent } from './dialog/ir-inspection-detail/ir-inspection-detail.component';
import { IrRepairDetailComponent } from './dialog/ir-repair-detail/ir-repair-detail.component';
import { ChatAssignamentComponent } from './messenger-center/chat-assignament/chat-assignament.component';
import { DialogDocumnetsServiceDetailComponent } from './dialog/dialog-documnets-service-detail/dialog-documnets-service-detail.component';
import { DialogAddDocumentsDetailComponent } from './dialog/dialog-add-documents-detail/dialog-add-documents-detail.component';
import { DialogCommentsServiceDetailComponent } from './dialog/dialog-comments-service-detail/dialog-comments-service-detail.component';
import { DialogRemindersServiceDetailComponent } from './dialog/dialog-reminders-service-detail/dialog-reminders-service-detail.component';
import { DialogAddReminderDetailComponent } from './dialog/dialog-add-reminder-detail/dialog-add-reminder-detail.component';
import { DialogAddCommentrDetailComponent } from './dialog/dialog-add-commentr-detail/dialog-add-commentr-detail.component';
import { HousinglistComponent } from './dialog/housinglist/housinglist.component';
import { CardServiceDetaillComponent } from './home-finding-full/card-service-detaill/card-service-detaill.component';
import { DialogPaymentProcessComponent } from './dialog/dialog-payment-process/dialog-payment-process.component';
import { DialogConfirmHistoryContractComponent } from './dialog/dialog-confirm-history-contract/dialog-confirm-history-contract.component';
import { ImgFallbackModule } from 'ngx-img-fallback';
import { BankingDetailsComponent } from './dialog/dialog-catalog-offices/banking-details/banking-details.component';
import { DocumentComponent } from './dialog/dialog-catalog-offices/document/document.component';
import { DialogTimeExtensionsComponent } from './dialog/dialog-time-extensions/dialog-time-extensions.component';
import { DialogRelatedPaymentsComponent } from './dialog/dialog-related-payments/dialog-related-payments.component';
import { DialogPaymentsMethodsComponent } from './dialog/dialog-payments-methods/dialog-payments-methods.component';
import { ModalBankingDetailsComponent } from './dialog/dialog-payments-methods/modal-banking-details/modal-banking-details.component';
import { DialogWireTransferProfileComponent } from './dialog/dialog-wire-transfer-profile/dialog-wire-transfer-profile.component';
import { LsfSpecialcComponent } from './dialog/lsf-specialc/lsf-specialc.component';
import { DialogConsiderationComponent } from './dialog/dialog-consideration/dialog-consideration.component';
import { SenRequestComponent } from './dialog/dialog-rental-furniture/sen-request/sen-request.component';

@NgModule({
  imports: [
    EditorModule,
    AngularEditorModule,
    NgxMaskModule.forChild (),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    MatChipsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    ChartistModule,
    FormsModule,
    MatSnackBarModule,
    NgxPaginationModule,

    GooglePlaceModule,
    MatTimepickerModule,
    NgxIconCalendarModule,
    NgxPermissionsModule.forRoot(),
    MatProgressBarModule,
    FilterPipeModule,
    CarouselModule,
    DndListModule,
    MatTableExporterModule,
    OrderModule,
    ImageCropperModule,
    ImgFallbackModule,
    QuillModule.forRoot()
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-US'},],
  entryComponents: [
    DialogBasePruebaComponent,
    NewServiceOrderDialog,
    DialogSearchProfileComponent,
    DialogGeneralMessageComponent,
    DialogNsrTableDetail,
    DialogRequestInformation,
    DialogEditServices,
    DialogExportAllServicesComponent,
    DialogEscalateComponent,
    DialogInvoiceEditComponent,
    NotificationDialog,
    DialogRenewal,
    DialogAddCall,
    DialogAssignTask,
    DialogEditTask,
    //DialogMapit,
    DialogViewEscalation,
    DialogEscalationLevels,
    DialogCortporateAssistance,
    DialogLegalReviewConsultation,
    DialogGeneralConfirmation,
    DialogSliderComponent,
    DialogCatalogCurrenciesComponent,
    DialogCatalogLanguagesComponent,
    DialogCatalogOfficesComponent,
    DialogCatalogRolesComponent,
    DialogCatalogTitlesComponent,
    DialogCatalogCliclesComponent,
    DialogCatalogUserComponent
  ],
  declarations: [
    LoginComponent,
    DashboardComponent,
    TeamsComponent,
    EditServiceRecordComponent,
    NewServiceRecordComponent,
    ActionItemsComponent,
    PendingAuthorizationsComponent,
    DialogBasePruebaComponent,
    NewServiceOrderDialog,
    ServiceRecordAllServicesComponent,
    DialogSearchProfileComponent,
    DialogGeneralMessageComponent,
    DialogNsrTableDetail,
    DialogRequestInformation,
    DialogEditServices,
    DialogExportAllServicesComponent,
    DialogEscalateComponent,
    EntryVisaComponent,
    DialogInvoiceEditComponent,
    RequestInvoiceComponent,
    DialogWorkPermitComponent,
    DialogResidencyPermitComponent,
    DialogVisaDeregistrationComponent,
    GeneralConfirmationComponent,
    NotificationDialog,
    DialogRenewal,
    DialogAddCall,
    DialogAssignTask,
    DialogEditTask,
    //DialogMapit,
    DialogViewEscalation,
    DialogEscalationLevels,
    DialogCortporateAssistance,
    DialogLegalReviewConsultation,
    DialogDocumentManagementComponent,
    DialogLocalDocumentationComponent,
    GeneralConfirmationComponent,
    DialogLocalDocumentationComponent,
    DialogVisaDeregistrationComponent,
    DialogAddAppointmentComponent,
    DialogExportComponent,
    PreDecisionOrientationComponent,
    AreaOrientationComponent,
    HomeFindingComponent,
    DialogDocumentsComponent,
    SettlingInComponent,
    SchoolSearchComponent,
    DialogDepartureComponent,
    DialogTemporaryHousingComponent,
    DialogRentalFurnitureComponent,
    DialogTransportationComponent,
    DialogAirportTransportationComponent,
    DialogCompleteComponent,
    DialogEvaluateComponent,
    DialogRequestPaymentComponent,
    DialogTenancyComponent,
    DialogPropertyComponent,
    DialogHousingSpecificationsComponent,
    DialogHomeDetailsComponent,
    DialogSchoolDetailsComponent,
    DialogPropertyReportComponent,
    DialogInventoryComponent,
    DialogAddchildComponent,
    DialogAddpaymentComponent,
    DialogIncludedInRentComponent,
    DialogCostSavingsComponent,
    DialogReportDayComponent,
    DialogRequestAdditionalTimeComponent,
    DialogGeneralConfirmation,
    DialogSliderComponent,
    DialogChangeStatusComponent,
    DialogHistoryStatusComponent,
    DialogCommentHistoryComponent,
    DialogDocumentsView,
    DialogLibraryDocuments,
    SupplierPartnersComponent,
    NewSupplierComponent,
    DialogNewContactComponent,
    DialogDocumentProfileSupplierComponent,
    DialogWireTransferComponent,
    DialogConsultantComponent,
    SupplierServicesComponent,
    SupplierConsultantComponent,
    DialogAdministrativeContactConsultantComponent,
    DialogConsultantContactConsultantComponent,
    DialogAddVahicleComponent,
    DialogAddVahicleConsultantComponent,
    DialogCalendarComponent,
    CalendarComponent,
    DialogCoordinatorsComponent,
    DialogExporthsComponent,
    DialogFollowingComponent,
    EscalationsComponent,
    DialogArrivalComponent,
    DialogCallsComponent,
    DialogEditCallComponent,
    DialogDashboardAddCallComponent,
    DialogDashboardRemindersComponent,
    DialogDashboardAddRemindersComponent,
    ReportsComponent,
    ActivityComponent,
    ExperienceSurveysComponent,
    TrainingComponent,
    FinanceComponent,
    AdminCenterComponent,
    PartnerComponent,
    DialogAvailabilityCalendarComponent,
    DialogAddAvailabilityCalendarComponent,
    DialogReportErrorComponent,
    DialogRequestPaymentNewComponent,
    DialogDocumentRequestComponent,
    DialogDocumentRequestRecurrentComponent,
    DialogPaymentConceptComponent,
    ProfileComponent,
    HomeComponent,
    DirectoryComponent,
    DialogTimeoffrequestComponent,
    NotificationComponent,
    MessengerCenterComponent,
    DialogNewChatComponent,
    DialogDeletepaymentconceptComponent,
    DialogInspectionrepairsComponent,
    DialogLeaseSummaryComponent,
    DialogPropertyExpensesComponent,
    DialogPaymentTypeComponent,
    DialogKeyComponent,
    DialogAttendeesComponent,
    DialogAttendeesComponent,
    MyTrainingComponent,
    LeadsComponent,
    NewPartnerClientComponent,
    DialogContractPricingInfoComponent,
    DialogDocumentsLeadClientComponent,
    DialogActivityLogComponent,
    DialogTermsOfTheDealComponent,
    DialogOfficeInformationComponent,
    DialogContactsComponent,
    DialogAddClientComponent,
    DialogAddServiceComponent,
    DialogAddCuntryComponent,
    DialogScoreAwadsComponent,
    DialogExperiensTeamComponent,
    DialogReportOfDayComponent,
    ProfileConsultantComponent,
    ProfileCoordinatorComponent,
    ProfileManagerComponent,
    DialogEmergencyContactComponent,
    DialogProfileDocumentComponent,
    DialogAddOfficeComponent,
    DialogAddCountryComponent,
    DialogAddOperationLeaderComponent,
    DialogAddAssignedTeamComponent,
    CountriesComponent,
    DialogAdminCenterCountriesComponent,
    DialogAdminCenterAddCityComponent,
    DialogAdminCenterAddInfoComponent,
    CatalogsComponent,
    ServicesComponent,
    TrainingAdminComponent,
    DialogAddCountrySeccionCountryComponent,
    DialogAdminCenterDocumentsUploadComponent,
    DialogAdminCenterEmergencyComponent,
    DialogAddServiceAdminCenterComponent,
    DialogAddServiceAdminCenterComponent,
    DialogAdminCenterDocumentsUploadComponent,
    DialogAdminCenterEmergencyComponent,
    DialogPaymentConceptDocumentComponent,
    AllActiveServicesComponent,
    DialogCatalogCurrenciesComponent,
    DialogCatalogLanguagesComponent,
    DialogCatalogOfficesComponent,
    DialogCatalogRolesComponent,
    DialogCatalogTitlesComponent,
    DialogCatalogCliclesComponent,
    DialogCatalogUserComponent,
    DialogAddCountrySeccionCountryComponent,
    RequestCenterComponent,
    InvoiceListComponent,
    ReportCountryPartnerComponent,
    ReportByStatusComponent,
    ReportsFullSistemContactsComponent,
    DialogAddTableFullSistemContactComponent,
    SuplierPartnerComponent,
    DialogAddFilterFullSistemContactComponent,
    DialogRequestInvoiceComponent,
    DialogDocumentInvoiceComponent,
    DialogConfirmComponent,
    DialogSupplierpartnerinvoiceComponent,
    NewTableOperationalReportsComponent,
    DialogEditColumsOperationalReportsComponent,
    DialogEditFiltersOperationalReportsComponent,
    DialogRequestInvoiceComponent,
    DialogAddColumnsFullSistemContactComponent,
    StickynoteComponent,
    DialogStickynoteComponent,
    ThirdPartyExpensesComponent,
    InvoicesSupplierComponent,
    InvoicesServiceComponent,
    MyInvoicesComponent,
    DialogAdditionalExpensesComponent,
    DialogRequestedInvoiceComponent,
    DialogRequestedInvoicesDocumentComponent,
    AddParticipanteComponent,
    AddTrainingComponent,
    AddContentComponent,
    ContentComponent,
    AddElementComponent,
    TrainingCursoComponent,
    TrainingFinishedComponent,
    PreviewComponent,
    CatalogsCurrenciesComponent,
    CatalogsLanguagesComponent,
    CatalogsPremierOfficesComponent,
    CatalogsRolesComponent,
    CatalogsJobTitlesComponent,
    CatalogsLifeCiclesComponent,
    CatalogsUsersComponent,
    CatalogsSexComponent,
    CatalogsMaritalStatusComponent,
    CatalogsNationalityComponent,
    CatalogsWeightMeasureComponent,
    CatalogsPetTypeComponent,
    CatalogsVehicleTypeComponent,
    CatalogsTaxPercentageComponent,
    CatalogsProficiencyComponent,
    CatalogsEducationLevelComponent,
    CatalogsCompanyTypeComponent,
    DialogCatalogSexComponent,
    DialogCatalogPetTypeComponent,
    DialogCatalogVehicleTypeComponent,
    DialogCatalogTaxPercentageComponent,
    DialogCatalogCompanyTypeComponent,
    DialogCatalogProficiencyComponent,
    DialogCatalogEducationLevelComponent,
    AdminCenterUsersComponent,
    AdminCenterSystemConfigurationComponent,
    DialogCatalogRelationshipComponent,
    DialogCatalogVisaCategoryComponent,
    DialogCatalogPrivacyComponent,
    DialogInactiveUserComponent,
    DialogAddLeaderComponent,
    DialogCatalogPolicyComponent,
    DialogCatalogPaymentResponsibilityComponent,
    DialogCatalogPartnerStatusComponent,
    DialogCatalogCoverageTypeComponent,
    DialogCatalogServiceTypeComponent,
    DialogCatalogTransportTypeComponent,
    DialogCatalogCoordinatorTypeComponent,
    DialogCatalogNotificationTypeComponent,
    DialogCatalogDocumentTypeComponent,
    DialogCatalogContactTypeComponent,
    DialogCatalogSupplierTypeComponent,
    DialogCatalogBreedComponent,
    DialogChangePasswordComponent,
    LegalRenewalComponent,
    DialogCatalogStatusComponent,
    AddGroupComponent,
    HomeSaleComponent,
    HomePurchaseComponent,
    OtherComponent,
    PropertyManagementComponent,
    DialogAddVisitComponent,
    DialogAddUpcomingComponent,
    DialogAddSlideHomeComponent,
    DialogPostItComponent,
    DialogCompletionReportImmigrationComponent,
    ViewAllReportsComponent,
    DialogCompletionReportRelocationComponent,
    TenancyManagementComponent,
    DialogAddEventTenancyComponent,
    DialogAddConclusionCompletionReportComponent,
    DialogDocumentsRelocationComponent,
    DialogBundleComponent,
    //DialogCampusComponent,
    DialogInHoldComponent,
    DialogCatalogResponsibleComponent,
    OtherImmigrationComponent,
    CalendarDaysComponent,
    ConfirmationCalendarComponent,
    DialogCatalogReferralFeeComponent,
    DialogAssignTaskEDRComponent,
    DialogDocumentsAdminCenterServicesComponent,
    DialogCatalogContractTypeComponent,
    DialogCatalogDesiredPropertyTypeComponent,
    DialogCatalogEmergecyContactComponent,
    DialogCatalogPricingScheduleComponent,
    DialogAddAccountTypeComponent,
    StartAppointmentComponent,
    DialogApplyAllScopeComponent,
    OfficetypecatalogComponent,
    ScopeservicesallComponent,
    DialogConfirmServiceComponent,
    DialogCropImageComponent,
    DialogAcceptedComponent,
    DialogPaymentSchoolingComponent,
    DialogPaymentRentalComponent,
    DialogStatusDetailComponent,
    DialoglLandlordBankDetailComponent,
    AppointmentAllApointmentComponent,
    DialogAttendeesInspecComponent,
    PrintLsfComponent,
    DialogAddPaymenentInformationComponent,
    PrintLdComponent,
    PrintIrComponent,
    AsignarserviciosComponent,
    DialogDasboardServiceComponent,
    LsfComponent,
    IrComponent,
    HomeFindingFullComponent,
    DialogClientSdComponent,
    DialogClientDocuComponent,
    LsfSelectComponent,
    LsfContractComponent,
    LsfPaymentsComponent,
    LsfCostComponent,
    LsfRenewalComponent,
    LsfDepartureComponent,
    LsfLandlordComponent,
    IrSelectComponent,
    IrMoveinComponent,
    IrMoveoutComponent,
    IrIrComponent,
    IrMoveinDetailComponent,
    IrInspectionDetailComponent,
    IrRepairDetailComponent,
    ChatAssignamentComponent,
    DialogDocumnetsServiceDetailComponent,
    DialogAddDocumentsDetailComponent,
    DialogCommentsServiceDetailComponent,
    DialogRemindersServiceDetailComponent,
    DialogAddReminderDetailComponent,
    DialogAddCommentrDetailComponent,
    HousinglistComponent,
    CardServiceDetaillComponent,
    DialogPaymentProcessComponent,
    DialogConfirmHistoryContractComponent,
    BankingDetailsComponent,
    DocumentComponent,
    DialogTimeExtensionsComponent,
    DialogRelatedPaymentsComponent,
    DialogPaymentsMethodsComponent,
    ModalBankingDetailsComponent,
    DialogWireTransferProfileComponent,
    LsfSpecialcComponent,
    DialogConsiderationComponent,
    SenRequestComponent,
  ]
})
export class MaterialComponentsModule {}
