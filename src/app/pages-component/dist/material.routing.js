"use strict";
exports.__esModule = true;
exports.MaterialRoutes = void 0;
//import { LoginComponent } from './login/login.component';
var dashboard_component_1 = require("./dashboard/dashboard.component");
var teams_component_1 = require("./Teams/teams.component");
var newServiceRecord_component_1 = require("./NewServiceRecord/newServiceRecord.component");
var editServiceRecord_component_1 = require("./EditServiceRecord/editServiceRecord.component");
var ServiceRecordAllServices_component_1 = require("./ServiceRecordsAllServices/ServiceRecordAllServices.component");
var requestInvoice_component_1 = require("./RequestInvoice/requestInvoice.component");
var ActionsItems_component_1 = require("./ActionItems/ActionsItems.component");
var supplier_partners_component_1 = require("./supplier-partners/supplier-partners.component");
var supplier_services_component_1 = require("./supplier-services/supplier-services.component");
var supplier_consultant_component_1 = require("./supplier-consultant/supplier-consultant.component");
var calendar_component_1 = require("./calendar/calendar.component");
var escalations_component_1 = require("./escalations/escalations.component");
var PendingAuthorizations_component_1 = require("./PendingAuthorizations/PendingAuthorizations.component");
var reports_component_1 = require("./reports/reports.component");
var activity_component_1 = require("./activity/activity.component");
var experience_surveys_component_1 = require("./experience-surveys/experience-surveys.component");
var training_component_1 = require("./training/training.component");
var partner_component_1 = require("./partner/partner.component");
var my_invoices_component_1 = require("./my-invoices/my-invoices.component");
var request_center_component_1 = require("./request-center/request-center.component");
var invoices_service_component_1 = require("./invoices-service/invoices-service.component");
var invoices_supplier_component_1 = require("./invoices-supplier/invoices-supplier.component");
var third_party_expenses_component_1 = require("./third-party-expenses/third-party-expenses.component");
var admin_center_component_1 = require("./admin-center/admin-center.component");
var profile_component_1 = require("./profile/profile.component");
var profile_consultant_component_1 = require("./profile-consultant/profile-consultant.component");
var profile_coordinator_component_1 = require("./profile-coordinator/profile-coordinator.component");
var profile_manager_component_1 = require("./profile-manager/profile-manager.component");
var home_component_1 = require("./home/home.component");
var directory_component_1 = require("./directory/directory.component");
var notification_component_1 = require("./notification/notification.component");
var messenger_center_component_1 = require("./messenger-center/messenger-center.component");
var my_training_component_1 = require("./my-training/my-training.component");
var leads_component_1 = require("./leads/leads.component");
var new_partner_client_component_1 = require("./new-partner-client/new-partner-client.component");
var countries_component_1 = require("./countries/countries.component");
var catalogs_component_1 = require("./catalogs/catalogs.component");
var services_component_1 = require("./services/services.component");
var training_admin_component_1 = require("./training-admin/training-admin.component");
var all_active_services_component_1 = require("./activity/all-active-services/all-active-services.component");
var report_country_partner_component_1 = require("./activity/report-country-partner/report-country-partner.component");
var report_by_status_component_1 = require("./activity/report-by-status/report-by-status.component");
var reports_full_sistem_contacts_component_1 = require("./reports-full-sistem-contacts/reports-full-sistem-contacts.component");
var suplier_partner_component_1 = require("./activity/suplier-partner/suplier-partner.component");
var add_training_component_1 = require("./training-admin/page/add-training/add-training.component");
var content_component_1 = require("./training-admin/page/content/content.component");
var training_curso_component_1 = require("./training/page/training-curso/training-curso.component");
var training_finished_component_1 = require("./training/page/training-finished/training-finished.component");
var preview_component_1 = require("./training-admin/page/preview/preview.component");
// importaciones lu
var catalogs_currencies_component_1 = require("./catalogs-currencies/catalogs-currencies.component");
var catalogs_job_titles_component_1 = require("./catalogs-job-titles/catalogs-job-titles.component");
var catalogs_languages_component_1 = require("./catalogs-languages/catalogs-languages.component");
var catalogs_life_cicles_component_1 = require("./catalogs-life-cicles/catalogs-life-cicles.component");
var catalogs_premier_offices_component_1 = require("./catalogs-premier-offices/catalogs-premier-offices.component");
var catalogs_roles_component_1 = require("./catalogs-roles/catalogs-roles.component");
var catalogs_users_component_1 = require("./catalogs-users/catalogs-users.component");
var catalogs_sex_component_1 = require("./catalogs-sex/catalogs-sex.component");
var catalogs_marital_status_component_1 = require("./catalogs-marital-status/catalogs-marital-status.component");
var catalogs_nationality_component_1 = require("./catalogs-nationality/catalogs-nationality.component");
var catalogs_weight_measure_component_1 = require("./catalogs-weight-measure/catalogs-weight-measure.component");
var catalogs_pet_type_component_1 = require("./catalogs-pet-type/catalogs-pet-type.component");
var catalogs_vehicle_type_component_1 = require("./catalogs-vehicle-type/catalogs-vehicle-type.component");
var catalogs_proficiency_component_1 = require("./catalogs-proficiency/catalogs-proficiency.component");
var catalogs_education_level_component_1 = require("./catalogs-education-level/catalogs-education-level.component");
var catalogs_tax_percentage_component_1 = require("./catalogs-tax-percentage/catalogs-tax-percentage.component");
var catalogs_company_type_component_1 = require("./catalogs-company-type/catalogs-company-type.component");
// nuevo diseño admin center
var admin_center_users_component_1 = require("./admin-center-users/admin-center-users.component");
var admin_center_system_configuration_component_1 = require("./admin-center-system-configuration/admin-center-system-configuration.component");
var view_all_reports_component_1 = require("./view-all-reports/view-all-reports.component");
exports.MaterialRoutes = [
    {
        path: 'teams',
        component: teams_component_1.TeamsComponent
    },
    { path: 'serviceRecord', component: newServiceRecord_component_1.NewServiceRecordComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'editServiceRecord/:id', component: editServiceRecord_component_1.EditServiceRecordComponent },
    { path: 'editServiceRecord', component: editServiceRecord_component_1.EditServiceRecordComponent },
    { path: 'serviceRecordAllServices/:id', component: ServiceRecordAllServices_component_1.ServiceRecordAllServicesComponent },
    { path: 'requestInvoice', component: requestInvoice_component_1.RequestInvoiceComponent },
    { path: 'actionItems', component: ActionsItems_component_1.ActionItemsComponent },
    { path: 'serviceCalendar', component: calendar_component_1.CalendarComponent },
    { path: 'escalations', component: escalations_component_1.EscalationsComponent },
    { path: 'supplierPartners', component: supplier_partners_component_1.SupplierPartnersComponent },
    { path: 'supplierServices/:id', component: supplier_services_component_1.SupplierServicesComponent },
    { path: 'supplierConsultant/:id', component: supplier_consultant_component_1.SupplierConsultantComponent },
    { path: 'PendingAuthorizations', component: PendingAuthorizations_component_1.PendingAuthorizationsComponent },
    { path: 'reports', component: reports_component_1.ReportsComponent },
    { path: 'activity', component: activity_component_1.ActivityComponent },
    { path: 'experienceSurveys', component: experience_surveys_component_1.ExperienceSurveysComponent },
    { path: 'training', component: training_component_1.TrainingComponent },
    { path: 'TrainingCursoComponent/:id', component: training_curso_component_1.TrainingCursoComponent },
    { path: 'partner', component: partner_component_1.PartnerComponent },
    { path: 'admin', component: admin_center_component_1.AdminCenterComponent },
    { path: 'myprofile', component: profile_component_1.ProfileComponent },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'directory', component: directory_component_1.DirectoryComponent },
    { path: 'notification', component: notification_component_1.NotificationComponent },
    { path: 'messenger-center', component: messenger_center_component_1.MessengerCenterComponent },
    { path: 'my-training', component: my_training_component_1.MyTrainingComponent },
    { path: 'leads', component: leads_component_1.LeadsComponent },
    { path: 'partner_client/:id', component: new_partner_client_component_1.NewPartnerClientComponent },
    { path: 'lead/:id', component: new_partner_client_component_1.NewPartnerClientComponent },
    { path: 'profileconsultant/:id', component: profile_consultant_component_1.ProfileConsultantComponent },
    { path: 'profilecoordinator/:id', component: profile_coordinator_component_1.ProfileCoordinatorComponent },
    { path: 'profilemanager/:id', component: profile_manager_component_1.ProfileManagerComponent },
    { path: 'countries', component: countries_component_1.CountriesComponent },
    { path: 'catalogs', component: catalogs_component_1.CatalogsComponent },
    { path: 'services', component: services_component_1.ServicesComponent },
    { path: 'admin-trainig', component: training_admin_component_1.TrainingAdminComponent },
    { path: 'activity/all-active-services', component: all_active_services_component_1.AllActiveServicesComponent },
    { path: 'requestcenter', component: request_center_component_1.RequestCenterComponent },
    { path: 'invoicelist', component: my_invoices_component_1.MyInvoicesComponent },
    { path: 'invoicesService', component: invoices_service_component_1.InvoicesServiceComponent },
    { path: 'invoicesSupplier', component: invoices_supplier_component_1.InvoicesSupplierComponent },
    { path: 'thirdPartyExpenses', component: third_party_expenses_component_1.ThirdPartyExpensesComponent },
    { path: 'myInvoices', component: my_invoices_component_1.MyInvoicesComponent },
    { path: 'reports/all-active-services', component: all_active_services_component_1.AllActiveServicesComponent },
    { path: 'reports/:country/:idcountry', component: report_country_partner_component_1.ReportCountryPartnerComponent },
    { path: 'reports/:country/:idcountry/:partner/:idparner', component: report_country_partner_component_1.ReportCountryPartnerComponent },
    { path: 'reportsBystatus/:idStatus/:statusName', component: report_by_status_component_1.ReportByStatusComponent },
    { path: 'admin-trainig', component: training_admin_component_1.TrainingAdminComponent },
    { path: 'full-sistem-contacts', component: reports_full_sistem_contacts_component_1.ReportsFullSistemContactsComponent },
    { path: 'reportsBySuplier/:id/:name', component: suplier_partner_component_1.SuplierPartnerComponent },
    { path: 'admin-trainig/addTraining/:id', component: add_training_component_1.AddTrainingComponent },
    { path: 'addTraining/Content', component: content_component_1.ContentComponent },
    { path: 'trainingFinish/:id', component: training_finished_component_1.TrainingFinishedComponent },
    { path: 'PreviewComponent', component: preview_component_1.PreviewComponent },
    { path: 'reportsBySuplier/:id/:name', component: suplier_partner_component_1.SuplierPartnerComponent },
    // rutas lu
    { path: 'catalogs/currencies', component: catalogs_currencies_component_1.CatalogsCurrenciesComponent },
    { path: 'catalogs/job-titles', component: catalogs_job_titles_component_1.CatalogsJobTitlesComponent },
    { path: 'catalogs/languages', component: catalogs_languages_component_1.CatalogsLanguagesComponent },
    { path: 'catalogs/life-cicles', component: catalogs_life_cicles_component_1.CatalogsLifeCiclesComponent },
    { path: 'catalogs/offices', component: catalogs_premier_offices_component_1.CatalogsPremierOfficesComponent },
    { path: 'catalogs/roles', component: catalogs_roles_component_1.CatalogsRolesComponent },
    { path: 'catalogs/user', component: catalogs_users_component_1.CatalogsUsersComponent },
    { path: 'catalogs/sex', component: catalogs_sex_component_1.CatalogsSexComponent },
    { path: 'catalogs/marital-status', component: catalogs_marital_status_component_1.CatalogsMaritalStatusComponent },
    { path: 'catalogs/nationality', component: catalogs_nationality_component_1.CatalogsNationalityComponent },
    { path: 'catalogs/weight-measure', component: catalogs_weight_measure_component_1.CatalogsWeightMeasureComponent },
    { path: 'catalogs/pet-type', component: catalogs_pet_type_component_1.CatalogsPetTypeComponent },
    { path: 'catalogs/vehicle-type', component: catalogs_vehicle_type_component_1.CatalogsVehicleTypeComponent },
    { path: 'catalogs/proficiency', component: catalogs_proficiency_component_1.CatalogsProficiencyComponent },
    { path: 'catalogs/education-level', component: catalogs_education_level_component_1.CatalogsEducationLevelComponent },
    { path: 'catalogs/tax-percentage', component: catalogs_tax_percentage_component_1.CatalogsTaxPercentageComponent },
    { path: 'catalogs/company-type', component: catalogs_company_type_component_1.CatalogsCompanyTypeComponent },
    { path: 'viewAllReport/:id', component: view_all_reports_component_1.ViewAllReportsComponent },
    // nuevo diseño de admin center
    { path: 'admin-center/users', component: admin_center_users_component_1.AdminCenterUsersComponent },
    { path: 'admin-center/system-configuration', component: admin_center_system_configuration_component_1.AdminCenterSystemConfigurationComponent }
];
