"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MaterialComponentsModule = void 0;
require("hammerjs");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var common_1 = require("@angular/common");
var demo_material_module_1 = require("../demo-material-module");
var table_1 = require("@angular/cdk/table");
var forms_1 = require("@angular/forms");
var flex_layout_1 = require("@angular/flex-layout");
var ng_chartist_1 = require("ng-chartist");
var material_routing_1 = require("./material.routing");
var login_component_1 = require("./login/login.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var teams_component_1 = require("./Teams/teams.component");
var newServiceRecord_component_1 = require("./NewServiceRecord/newServiceRecord.component");
var dialog_base_prueba_component_1 = require("./dialog/dialog-base-prueba/dialog-base-prueba.component");
var new_service_order_component_1 = require("./dialog/new-services-record-dialogs/new-service-order.component");
var search_profile_component_1 = require("./dialog/search-profile/search-profile.component");
var general_message_component_1 = require("./dialog/general-message/general-message.component");
var nsr_table_detail_component_1 = require("./dialog/new-services-record-dialogs/nsr-table-detail.component");
var editServiceRecord_component_1 = require("./EditServiceRecord/editServiceRecord.component");
var request_information_component_1 = require("./dialog/edit-service-records/request-information.component");
var edit_services_component_1 = require("./dialog/edit-service-records/edit-services.component");
var ServiceRecordAllServices_component_1 = require("./ServiceRecordsAllServices/ServiceRecordAllServices.component");
var export_all_services_component_1 = require("./dialog/edit-service-records/export-all-services.component");
var escalate_component_1 = require("./dialog/edit-service-records/escalate.component");
var entry_visa_component_1 = require("./dialog/entry-visa/entry-visa.component");
var invoice_edit_so_component_1 = require("./dialog/edit-service-records/invoice-edit-so.component");
var requestInvoice_component_1 = require("./RequestInvoice/requestInvoice.component");
var dialog_work_permit_component_1 = require("./dialog/dialog-work-permit/dialog-work-permit.component");
var dialog_visa_deregistration_component_1 = require("./dialog/dialog-visa-deregistration/dialog-visa-deregistration.component");
var notification_component_1 = require("./dialog/notification/notification.component");
var general_confirmation_component_1 = require("./dialog/general-confirmation/general-confirmation.component");
var renewal_component_1 = require("./dialog/renewal/renewal.component");
var corporate_assistance_component_1 = require("./dialog/corporate-assistance/corporate-assistance.component");
var legal_review_consultation_component_1 = require("./dialog/legal-review-consultation/legal-review-consultation.component");
var snack_bar_1 = require("@angular/material/snack-bar");
var addCall_component_1 = require("./dialog/dialog-add-call/addCall.component");
var assignTask_component_1 = require("./dialog/dialog-assign-task/assignTask.component");
var editTask_component_1 = require("./dialog/dialog-edit-task/editTask.component");
var mapit_component_1 = require("./dialog/dialog-mapit/mapit.component");
var viewEscalation_component_1 = require("./dialog/dialog-view-escalation/viewEscalation.component");
var escalationLevel_component_1 = require("./dialog/escalation-levels/escalationLevel.component");
var dialog_local_documentation_component_1 = require("./dialog/dialog-local-documentation/dialog-local-documentation.component");
var dialog_document_management_component_1 = require("./dialog/dialog-document-management/dialog-document-management.component");
var dialog_residency_permit_component_1 = require("./dialog/dialog-residency-permit/dialog-residency-permit.component");
var dialog_add_appointment_component_1 = require("./dialog/dialog-add-appointment/dialog-add-appointment.component");
var dialog_export_component_1 = require("./dialog/dialog-export/dialog-export.component");
var ngx_export_as_1 = require("ngx-export-as");
var pre_decision_orientation_component_1 = require("./dialog/pre-decision-orientation/pre-decision-orientation.component");
var area_orientation_component_1 = require("./dialog/area-orientation/area-orientation.component");
var home_finding_component_1 = require("./dialog/home-finding/home-finding.component");
var dialog_documents_component_1 = require("./dialog/dialog-documents/dialog-documents.component");
var settling_in_component_1 = require("./dialog/settling-in/settling-in.component");
var school_search_component_1 = require("./dialog/school-search/school-search.component");
var dialog_departure_component_1 = require("./dialog/dialog-departure/dialog-departure.component");
var dialog_temporary_housing_component_1 = require("./dialog/dialog-temporary-housing/dialog-temporary-housing.component");
var dialog_rental_furniture_component_1 = require("./dialog/dialog-rental-furniture/dialog-rental-furniture.component");
var dialog_transportation_component_1 = require("./dialog/dialog-transportation/dialog-transportation.component");
var dialog_airport_transportation_component_1 = require("./dialog/dialog-airport-transportation/dialog-airport-transportation.component");
var dialog_complete_component_1 = require("./dialog/dialog-complete/dialog-complete.component");
var dialog_evaluate_component_1 = require("./dialog/dialog-evaluate/dialog-evaluate.component");
var ngx_bar_rating_1 = require("ngx-bar-rating");
var dialog_request_payment_component_1 = require("./dialog/dialog-request-payment/dialog-request-payment.component");
var dialog_tenancy_component_1 = require("./dialog/dialog-tenancy/dialog-tenancy.component");
var dialog_property_component_1 = require("./dialog/dialog-property/dialog-property.component");
var core_2 = require("@angular/material/core");
var dialog_housing_specifications_component_1 = require("./dialog/dialog-housing-specifications/dialog-housing-specifications.component");
var dialog_home_details_component_1 = require("./dialog/dialog-home-details/dialog-home-details.component");
var dialog_school_details_component_1 = require("./dialog/dialog-school-details/dialog-school-details.component");
var dialog_property_report_component_1 = require("./dialog/dialog-property-report/dialog-property-report.component");
var dialog_inventory_component_1 = require("./dialog/dialog-inventory/dialog-inventory.component");
var dialog_addchild_component_1 = require("./dialog/dialog-addchild/dialog-addchild.component");
var dialog_addpayment_component_1 = require("./dialog/dialog-addpayment/dialog-addpayment.component");
var dialog_included_in_rent_component_1 = require("./dialog/dialog-included-in-rent/dialog-included-in-rent.component");
var dialog_cost_savings_component_1 = require("./dialog/dialog-cost-savings/dialog-cost-savings.component");
var dialog_report_day_component_1 = require("./dialog/dialog-report-day/dialog-report-day.component");
var dialog_request_additional_time_component_1 = require("./dialog/dialog-request-additional-time/dialog-request-additional-time.component");
var dialog_general_confirmation_component_1 = require("./dialog/dialog-general-confirmation/dialog-general-confirmation.component");
var dialog_slider_component_1 = require("./dialog/dialog-slider/dialog-slider.component");
var dialog_change_status_component_1 = require("./dialog/dialog-change-status/dialog-change-status.component");
var dialog_history_status_component_1 = require("./dialog/dialog-history-status/dialog-history-status.component");
var dialog_comment_history_component_1 = require("./dialog/dialog-comment-history/dialog-comment-history.component");
var dialog_documents_view_component_1 = require("./dialog/dialog-documents-view/dialog-documents-view.component");
var dialog_library_documents_component_1 = require("./dialog/dialog-library-documents/dialog-library-documents.component");
var Coordinators_component_1 = require("./dialog/dialog-coordinators/Coordinators.component");
var core_3 = require("@agm/core");
var ngx_google_places_autocomplete_1 = require("ngx-google-places-autocomplete");
var ActionsItems_component_1 = require("./ActionItems/ActionsItems.component");
var supplier_partners_component_1 = require("./supplier-partners/supplier-partners.component");
var new_supplier_component_1 = require("./dialog/new-supplier/new-supplier.component");
var dialog_new_contact_component_1 = require("./dialog/dialog-new-contact/dialog-new-contact.component");
var dialog_document_profile_supplier_component_1 = require("./dialog/dialog-document-profile-supplier/dialog-document-profile-supplier.component");
var dialog_wire_transfer_component_1 = require("./dialog/dialog-wire-transfer/dialog-wire-transfer.component");
var dialog_consultant_component_1 = require("./dialog/dialog-consultant/dialog-consultant.component");
var supplier_services_component_1 = require("./supplier-services/supplier-services.component");
var supplier_consultant_component_1 = require("./supplier-consultant/supplier-consultant.component");
var dialog_administrative_contact_consultant_component_1 = require("./dialog/dialog-administrative-contact-consultant/dialog-administrative-contact-consultant.component");
var dialog_consultant_contact_consultant_component_1 = require("./dialog/dialog-consultant-contact-consultant/dialog-consultant-contact-consultant.component");
var dialog_add_vahicle_component_1 = require("./dialog/dialog-add-vahicle/dialog-add-vahicle.component");
var dialog_add_vahicle_consultant_component_1 = require("./dialog/dialog-add-vahicle-consultant/dialog-add-vahicle-consultant.component");
var dialog_calendar_component_1 = require("./dialog/dialog-calendar/dialog-calendar.component");
var ngx_icon_calendar_1 = require("ngx-icon-calendar");
var angular_calendar_1 = require("angular-calendar");
var date_fns_1 = require("angular-calendar/date-adapters/date-fns");
var calendar_component_1 = require("./calendar/calendar.component");
var dialog_following_component_1 = require("./dialog/dialog-following/dialog-following.component");
var escalations_component_1 = require("./escalations/escalations.component");
var dialog_arrival_component_1 = require("./dialog/dialog-arrival/dialog-arrival.component");
var dialog_calls_component_1 = require("./dialog/dialog-calls/dialog-calls.component");
var dialog_edit_call_component_1 = require("./dialog/dialog-edit-call/dialog-edit-call.component");
var dialog_dashboard_add_call_component_1 = require("./dialog/dialog-dashboard-add-call/dialog-dashboard-add-call.component");
var dialog_dashboard_reminders_component_1 = require("./dialog/dialog-dashboard-reminders/dialog-dashboard-reminders.component");
var dialog_dashboard_add_reminders_component_1 = require("./dialog/dialog-dashboard-add-reminders/dialog-dashboard-add-reminders.component");
var PendingAuthorizations_component_1 = require("./PendingAuthorizations/PendingAuthorizations.component");
var ngx_permissions_1 = require("ngx-permissions");
var reports_component_1 = require("./reports/reports.component");
var activity_component_1 = require("./activity/activity.component");
var experience_surveys_component_1 = require("./experience-surveys/experience-surveys.component");
var training_component_1 = require("./training/training.component");
var finance_component_1 = require("./finance/finance.component");
var admin_center_component_1 = require("./admin-center/admin-center.component");
var partner_component_1 = require("./partner/partner.component");
var dialog_availability_calendar_component_1 = require("./dialog/dialog-availability-calendar/dialog-availability-calendar.component");
var chips_1 = require("@angular/material/chips");
var dialog_add_availability_calendar_component_1 = require("./dialog/dialog-add-availability-calendar/dialog-add-availability-calendar.component");
var dialog_report_error_component_1 = require("./dialog/dialog-report-error/dialog-report-error.component");
var dialog_request_payment_new_component_1 = require("./dialog/dialog-request-payment-new/dialog-request-payment-new.component");
var dialog_document_request_component_1 = require("./dialog/dialog-document-request/dialog-document-request.component");
var dialog_document_request_recurrent_component_1 = require("./dialog/dialog-document-request-recurrent/dialog-document-request-recurrent.component");
var dialog_payment_concept_component_1 = require("./dialog/dialog-payment-concept/dialog-payment-concept.component");
var profile_component_1 = require("./profile/profile.component");
var progress_bar_1 = require("@angular/material/progress-bar");
var home_component_1 = require("./home/home.component");
var directory_component_1 = require("./directory/directory.component");
var dialog_timeoffrequest_component_1 = require("./dialog/dialog-timeoffrequest/dialog-timeoffrequest.component");
var notification_component_2 = require("./notification/notification.component");
var messenger_center_component_1 = require("./messenger-center/messenger-center.component");
var dialog_new_chat_component_1 = require("./dialog/dialog-new-chat/dialog-new-chat.component");
var dialog_deletepaymentconcept_component_1 = require("./dialog/dialog-deletepaymentconcept/dialog-deletepaymentconcept.component");
var ngx_filter_pipe_1 = require("ngx-filter-pipe");
var dialog_property_expenses_component_1 = require("./dialog/dialog-property-expenses/dialog-property-expenses.component");
var dialog_payment_type_component_1 = require("./dialog/dialog-payment-type/dialog-payment-type.component");
var dialog_key_component_1 = require("./dialog/dialog-key/dialog-key.component");
var dialog_attendees_component_1 = require("./dialog/dialog-attendees/dialog-attendees.component");
var my_training_component_1 = require("./my-training/my-training.component");
var leads_component_1 = require("./leads/leads.component");
var new_partner_client_component_1 = require("./new-partner-client/new-partner-client.component");
var dialog_contract_pricing_info_component_1 = require("./dialog/dialog-contract-pricing-info/dialog-contract-pricing-info.component");
var dialog_documents_lead_client_component_1 = require("./dialog/dialog-documents-lead-client/dialog-documents-lead-client.component");
var dialog_activity_log_component_1 = require("./dialog/dialog-activity-log/dialog-activity-log.component");
var dialog_terms_of_the_deal_component_1 = require("./dialog/dialog-terms-of-the-deal/dialog-terms-of-the-deal.component");
var dialog_office_information_component_1 = require("./dialog/dialog-office-information/dialog-office-information.component");
var dialog_contacts_component_1 = require("./dialog/dialog-contacts/dialog-contacts.component");
var dialog_add_client_component_1 = require("./dialog/dialog-add-client/dialog-add-client.component");
var dialog_add_service_component_1 = require("./dialog/dialog-add-service/dialog-add-service.component");
var dialog_add_cuntry_component_1 = require("./dialog/dialog-add-cuntry/dialog-add-cuntry.component");
var dialog_score_awads_component_1 = require("./dialog/dialog-score-awads/dialog-score-awads.component");
var dialog_experiens_team_component_1 = require("./dialog/dialog-experiens-team/dialog-experiens-team.component");
var dialog_report_of_day_component_1 = require("./dialog/dialog-report-of-day/dialog-report-of-day.component");
var profile_consultant_component_1 = require("./profile-consultant/profile-consultant.component");
var profile_coordinator_component_1 = require("./profile-coordinator/profile-coordinator.component");
var profile_manager_component_1 = require("./profile-manager/profile-manager.component");
var dialog_emergency_contact_component_1 = require("./dialog/dialog-emergency-contact/dialog-emergency-contact.component");
var dialog_profile_document_component_1 = require("./dialog/dialog-profile-document/dialog-profile-document.component");
var dialog_add_office_component_1 = require("./dialog/dialog-add-office/dialog-add-office.component");
var dialog_add_country_component_1 = require("./dialog/dialog-add-country/dialog-add-country.component");
var dialog_add_operation_leader_component_1 = require("./dialog/dialog-add-operation-leader/dialog-add-operation-leader.component");
var dialog_add_assigned_team_component_1 = require("./dialog/dialog-add-assigned-team/dialog-add-assigned-team.component");
var ngx_owl_carousel_o_1 = require("ngx-owl-carousel-o");
var countries_component_1 = require("./countries/countries.component");
var dialog_admin_center_countries_component_1 = require("./dialog/dialog-admin-center-countries/dialog-admin-center-countries.component");
var dialog_admin_center_add_city_component_1 = require("./dialog/dialog-admin-center-add-city/dialog-admin-center-add-city.component");
var dialog_admin_center_add_info_component_1 = require("./dialog/dialog-admin-center-add-info/dialog-admin-center-add-info.component");
var catalogs_component_1 = require("./catalogs/catalogs.component");
var services_component_1 = require("./services/services.component");
var training_admin_component_1 = require("./training-admin/training-admin.component");
var dialog_catalog_currencies_component_1 = require("./dialog/dialog-catalog-currencies/dialog-catalog-currencies.component");
var dialog_catalog_languages_component_1 = require("./dialog/dialog-catalog-languages/dialog-catalog-languages.component");
var dialog_catalog_offices_component_1 = require("./dialog/dialog-catalog-offices/dialog-catalog-offices.component");
var dialog_catalog_roles_component_1 = require("./dialog/dialog-catalog-roles/dialog-catalog-roles.component");
var dialog_catalog_titles_component_1 = require("./dialog/dialog-catalog-titles/dialog-catalog-titles.component");
var dialog_catalog_clicles_component_1 = require("./dialog/dialog-catalog-clicles/dialog-catalog-clicles.component");
var dialog_catalog_user_component_1 = require("./dialog/dialog-catalog-user/dialog-catalog-user.component");
var dialog_add_country_seccion_country_component_1 = require("./dialog/dialog-add-country-seccion-country/dialog-add-country-seccion-country.component");
var dialog_add_service_admin_center_component_1 = require("./dialog/dialog-add-service-admin-center/dialog-add-service-admin-center.component");
var dialog_admin_center_documents_upload_component_1 = require("./dialog/dialog-admin-center-documents-upload/dialog-admin-center-documents-upload.component");
var dialog_admin_center_emergency_component_1 = require("./dialog/dialog-admin-center-emergency/dialog-admin-center-emergency.component");
var dialog_payment_concept_document_component_1 = require("./dialog/dialog-payment-concept-document/dialog-payment-concept-document.component");
var all_active_services_component_1 = require("./activity/all-active-services/all-active-services.component");
var request_center_component_1 = require("./request-center/request-center.component");
var invoice_list_component_1 = require("./invoice-list/invoice-list.component");
var report_country_partner_component_1 = require("./activity/report-country-partner/report-country-partner.component");
var report_by_status_component_1 = require("./activity/report-by-status/report-by-status.component");
var reports_full_sistem_contacts_component_1 = require("./reports-full-sistem-contacts/reports-full-sistem-contacts.component");
var dialog_add_table_full_sistem_contact_component_1 = require("./dialog/dialog-add-table-full-sistem-contact/dialog-add-table-full-sistem-contact.component");
var suplier_partner_component_1 = require("./activity/suplier-partner/suplier-partner.component");
var dialog_add_filter_full_sistem_contact_component_1 = require("./dialog/dialog-add-filter-full-sistem-contact/dialog-add-filter-full-sistem-contact.component");
var new_table_operational_reports_component_1 = require("./dialog/new-table-operational-reports/new-table-operational-reports.component");
var ngx_drag_and_drop_lists_1 = require("ngx-drag-and-drop-lists");
var dialog_edit_colums_operational_reports_component_1 = require("./dialog/dialog-edit-colums-operational-reports/dialog-edit-colums-operational-reports.component");
var dialog_edit_filters_operational_reports_component_1 = require("./dialog/dialog-edit-filters-operational-reports/dialog-edit-filters-operational-reports.component");
var dialog_request_invoice_component_1 = require("./dialog/dialog-request-invoice/dialog-request-invoice.component");
var dialog_document_invoice_component_1 = require("./dialog/dialog-document-invoice/dialog-document-invoice.component");
var dialog_confirm_component_1 = require("./dialog/dialog-confirm/dialog-confirm.component");
var dialog_supplierpartnerinvoice_component_1 = require("./dialog/dialog-supplierpartnerinvoice/dialog-supplierpartnerinvoice.component");
var dialog_add_columns_full_sistem_contact_component_1 = require("./dialog/dialog-add-columns-full-sistem-contact/dialog-add-columns-full-sistem-contact.component");
var mat_table_exporter_1 = require("mat-table-exporter");
var stickynote_component_1 = require("./stickynote/stickynote.component");
var dialog_stickynote_component_1 = require("./dialog/dialog-stickynote/dialog-stickynote.component");
var third_party_expenses_component_1 = require("./third-party-expenses/third-party-expenses.component");
var invoices_supplier_component_1 = require("./invoices-supplier/invoices-supplier.component");
var invoices_service_component_1 = require("./invoices-service/invoices-service.component");
var my_invoices_component_1 = require("./my-invoices/my-invoices.component");
var dialog_additional_expenses_component_1 = require("./dialog/dialog-additional-expenses/dialog-additional-expenses.component");
var dialog_requested_invoice_component_1 = require("./dialog/dialog-requested-invoice/dialog-requested-invoice.component");
var dialog_requested_invoices_document_component_1 = require("./dialog/dialog-requested-invoices-document/dialog-requested-invoices-document.component");
var add_participante_component_1 = require("./training-admin/dialog/add-participante/add-participante.component");
var add_training_component_1 = require("./training-admin/page/add-training/add-training.component");
var add_content_component_1 = require("./training-admin/dialog/add-content/add-content.component");
var content_component_1 = require("./training-admin/page/content/content.component");
var add_element_component_1 = require("./training-admin/dialog/add-element/add-element.component");
var training_curso_component_1 = require("./training/page/training-curso/training-curso.component");
var training_finished_component_1 = require("./training/page/training-finished/training-finished.component");
var ngx_pagination_1 = require("ngx-pagination");
var preview_component_1 = require("./training-admin/page/preview/preview.component");
var catalogs_currencies_component_1 = require("./catalogs-currencies/catalogs-currencies.component");
var catalogs_languages_component_1 = require("./catalogs-languages/catalogs-languages.component");
var catalogs_premier_offices_component_1 = require("./catalogs-premier-offices/catalogs-premier-offices.component");
var catalogs_roles_component_1 = require("./catalogs-roles/catalogs-roles.component");
var catalogs_job_titles_component_1 = require("./catalogs-job-titles/catalogs-job-titles.component");
var catalogs_life_cicles_component_1 = require("./catalogs-life-cicles/catalogs-life-cicles.component");
var catalogs_users_component_1 = require("./catalogs-users/catalogs-users.component");
var catalogs_sex_component_1 = require("./catalogs-sex/catalogs-sex.component");
var catalogs_marital_status_component_1 = require("./catalogs-marital-status/catalogs-marital-status.component");
var catalogs_nationality_component_1 = require("./catalogs-nationality/catalogs-nationality.component");
var catalogs_weight_measure_component_1 = require("./catalogs-weight-measure/catalogs-weight-measure.component");
var catalogs_pet_type_component_1 = require("./catalogs-pet-type/catalogs-pet-type.component");
var catalogs_vehicle_type_component_1 = require("./catalogs-vehicle-type/catalogs-vehicle-type.component");
var catalogs_tax_percentage_component_1 = require("./catalogs-tax-percentage/catalogs-tax-percentage.component");
var catalogs_proficiency_component_1 = require("./catalogs-proficiency/catalogs-proficiency.component");
var catalogs_education_level_component_1 = require("./catalogs-education-level/catalogs-education-level.component");
var catalogs_company_type_component_1 = require("./catalogs-company-type/catalogs-company-type.component");
var dialog_catalog_sex_component_1 = require("./dialog/dialog-catalog-sex/dialog-catalog-sex.component");
var dialog_catalog_pet_type_component_1 = require("./dialog/dialog-catalog-pet-type/dialog-catalog-pet-type.component");
var dialog_catalog_vehicle_type_component_1 = require("./dialog/dialog-catalog-vehicle-type/dialog-catalog-vehicle-type.component");
var dialog_catalog_tax_percentage_component_1 = require("./dialog/dialog-catalog-tax-percentage/dialog-catalog-tax-percentage.component");
var dialog_catalog_company_type_component_1 = require("./dialog/dialog-catalog-company-type/dialog-catalog-company-type.component");
var dialog_catalog_proficiency_component_1 = require("./dialog/dialog-catalog-proficiency/dialog-catalog-proficiency.component");
var dialog_catalog_education_level_component_1 = require("./dialog/dialog-catalog-education-level/dialog-catalog-education-level.component");
var admin_center_users_component_1 = require("./admin-center-users/admin-center-users.component");
var admin_center_system_configuration_component_1 = require("./admin-center-system-configuration/admin-center-system-configuration.component");
var dialog_catalog_relationship_component_1 = require("./dialog/dialog-catalog-relationship/dialog-catalog-relationship.component");
var dialog_catalog_visa_category_component_1 = require("./dialog/dialog-catalog-visa-category/dialog-catalog-visa-category.component");
var dialog_catalog_privacy_component_1 = require("./dialog/dialog-catalog-privacy/dialog-catalog-privacy.component");
var dialog_inactive_user_component_1 = require("./dialog/dialog-inactive-user/dialog-inactive-user.component");
var dialog_add_leader_component_1 = require("./dialog/dialog-add-leader/dialog-add-leader.component");
var dialog_catalog_policy_component_1 = require("./dialog/dialog-catalog-policy/dialog-catalog-policy.component");
var dialog_catalog_payment_responsibility_component_1 = require("./dialog/dialog-catalog-payment-responsibility/dialog-catalog-payment-responsibility.component");
var dialog_catalog_partner_status_component_1 = require("./dialog/dialog-catalog-partner-status/dialog-catalog-partner-status.component");
var dialog_catalog_coverage_type_component_1 = require("./dialog/dialog-catalog-coverage-type/dialog-catalog-coverage-type.component");
var dialog_catalog_service_type_component_1 = require("./dialog/dialog-catalog-service-type/dialog-catalog-service-type.component");
var dialog_catalog_transport_type_component_1 = require("./dialog/dialog-catalog-transport-type/dialog-catalog-transport-type.component");
var dialog_catalog_coordinator_type_component_1 = require("./dialog/dialog-catalog-coordinator-type/dialog-catalog-coordinator-type.component");
var dialog_catalog_notification_type_component_1 = require("./dialog/dialog-catalog-notification-type/dialog-catalog-notification-type.component");
var dialog_catalog_document_type_component_1 = require("./dialog/dialog-catalog-document-type/dialog-catalog-document-type.component");
var dialog_catalog_contact_type_component_1 = require("./dialog/dialog-catalog-contact-type/dialog-catalog-contact-type.component");
var dialog_catalog_supplier_type_component_1 = require("./dialog/dialog-catalog-supplier-type/dialog-catalog-supplier-type.component");
var dialog_catalog_breed_component_1 = require("./dialog/dialog-catalog-breed/dialog-catalog-breed.component");
var dialog_change_password_component_1 = require("./dialog/dialog-change-password/dialog-change-password.component");
var legal_renewal_component_1 = require("./dialog/legal-renewal/legal-renewal.component");
var dialog_catalog_status_component_1 = require("./dialog/dialog-catalog-status/dialog-catalog-status.component");
var add_group_component_1 = require("./training-admin/dialog/add-group/add-group.component");
var home_sale_component_1 = require("./dialog/home-sale/home-sale.component");
var home_purchase_component_1 = require("./dialog/home-purchase/home-purchase.component");
var other_component_1 = require("./dialog/other/other.component");
var property_management_component_1 = require("./dialog/property-management/property-management.component");
var dialog_add_visit_component_1 = require("./dialog/dialog-add-visit/dialog-add-visit.component");
var dialog_add_upcoming_component_1 = require("./dialog/dialog-add-upcoming/dialog-add-upcoming.component");
var dialog_add_slide_home_component_1 = require("./dialog/dialog-add-slide-home/dialog-add-slide-home.component");
var dialog_post_it_component_1 = require("./dialog/dialog-post-it/dialog-post-it.component");
var dialog_completion_report_immigration_component_1 = require("./dialog/dialog-completion-report-immigration/dialog-completion-report-immigration.component");
var view_all_reports_component_1 = require("./view-all-reports/view-all-reports.component");
var dialog_completion_report_relocation_component_1 = require("./dialog/dialog-completion-report-relocation/dialog-completion-report-relocation.component");
var ngx_order_pipe_1 = require("ngx-order-pipe");
var tenancy_management_component_1 = require("./dialog/tenancy-management/tenancy-management.component");
var dialog_add_event_tenancy_component_1 = require("./dialog/dialog-add-event-tenancy/dialog-add-event-tenancy.component");
var dialog_add_conclusion_completion_report_component_1 = require("./dialog/dialog-add-conclusion-completion-report/dialog-add-conclusion-completion-report.component");
var dialog_documents_relocation_component_1 = require("./dialog/dialog-documents-relocation/dialog-documents-relocation.component");
var angular_editor_1 = require("@kolkov/angular-editor");
var kendo_angular_editor_1 = require("@progress/kendo-angular-editor");
var ngx_mask_1 = require("ngx-mask");
var MaterialComponentsModule = /** @class */ (function () {
    function MaterialComponentsModule() {
    }
    MaterialComponentsModule = __decorate([
        core_1.NgModule({
            imports: [
                kendo_angular_editor_1.EditorModule,
                angular_editor_1.AngularEditorModule,
                ngx_mask_1.NgxMaskModule.forChild(),
                angular_calendar_1.CalendarModule.forRoot({
                    provide: angular_calendar_1.DateAdapter,
                    useFactory: date_fns_1.adapterFactory
                }),
                common_1.CommonModule,
                router_1.RouterModule.forChild(material_routing_1.MaterialRoutes),
                demo_material_module_1.DemoMaterialModule,
                chips_1.MatChipsModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                flex_layout_1.FlexLayoutModule,
                table_1.CdkTableModule,
                ng_chartist_1.ChartistModule,
                forms_1.FormsModule,
                ngx_export_as_1.ExportAsModule,
                snack_bar_1.MatSnackBarModule,
                ngx_bar_rating_1.BarRatingModule,
                ngx_pagination_1.NgxPaginationModule,
                core_3.AgmCoreModule.forRoot({
                    // please get your own API key here:
                    // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
                    apiKey: 'AIzaSyBF-AEeoIsOV8elnHA3zQ5h5lgFMp5TaF4',
                    libraries: ["places"]
                }),
                ngx_google_places_autocomplete_1.GooglePlaceModule,
                ngx_icon_calendar_1.NgxIconCalendarModule,
                ngx_permissions_1.NgxPermissionsModule.forRoot(),
                progress_bar_1.MatProgressBarModule,
                ngx_filter_pipe_1.FilterPipeModule,
                ngx_owl_carousel_o_1.CarouselModule,
                ngx_drag_and_drop_lists_1.DndListModule,
                mat_table_exporter_1.MatTableExporterModule,
                ngx_order_pipe_1.OrderModule
            ],
            providers: [{ provide: core_2.MAT_DATE_LOCALE, useValue: 'en-US' },],
            entryComponents: [
                dialog_base_prueba_component_1.DialogBasePruebaComponent,
                new_service_order_component_1.NewServiceOrderDialog,
                search_profile_component_1.DialogSearchProfileComponent,
                general_message_component_1.DialogGeneralMessageComponent,
                nsr_table_detail_component_1.DialogNsrTableDetail,
                request_information_component_1.DialogRequestInformation,
                edit_services_component_1.DialogEditServices,
                export_all_services_component_1.DialogExportAllServicesComponent,
                escalate_component_1.DialogEscalateComponent,
                invoice_edit_so_component_1.DialogInvoiceEditComponent,
                notification_component_1.NotificationDialog,
                renewal_component_1.DialogRenewal,
                addCall_component_1.DialogAddCall,
                assignTask_component_1.DialogAssignTask,
                editTask_component_1.DialogEditTask,
                mapit_component_1.DialogMapit,
                viewEscalation_component_1.DialogViewEscalation,
                escalationLevel_component_1.DialogEscalationLevels,
                corporate_assistance_component_1.DialogCortporateAssistance,
                legal_review_consultation_component_1.DialogLegalReviewConsultation,
                dialog_general_confirmation_component_1.DialogGeneralConfirmation,
                dialog_slider_component_1.DialogSliderComponent,
                dialog_catalog_currencies_component_1.DialogCatalogCurrenciesComponent,
                dialog_catalog_languages_component_1.DialogCatalogLanguagesComponent,
                dialog_catalog_offices_component_1.DialogCatalogOfficesComponent,
                dialog_catalog_roles_component_1.DialogCatalogRolesComponent,
                dialog_catalog_titles_component_1.DialogCatalogTitlesComponent,
                dialog_catalog_clicles_component_1.DialogCatalogCliclesComponent,
                dialog_catalog_user_component_1.DialogCatalogUserComponent
            ],
            declarations: [
                login_component_1.LoginComponent,
                dashboard_component_1.DashboardComponent,
                teams_component_1.TeamsComponent,
                editServiceRecord_component_1.EditServiceRecordComponent,
                newServiceRecord_component_1.NewServiceRecordComponent,
                ActionsItems_component_1.ActionItemsComponent,
                PendingAuthorizations_component_1.PendingAuthorizationsComponent,
                dialog_base_prueba_component_1.DialogBasePruebaComponent,
                new_service_order_component_1.NewServiceOrderDialog,
                ServiceRecordAllServices_component_1.ServiceRecordAllServicesComponent,
                search_profile_component_1.DialogSearchProfileComponent,
                general_message_component_1.DialogGeneralMessageComponent,
                nsr_table_detail_component_1.DialogNsrTableDetail,
                request_information_component_1.DialogRequestInformation,
                edit_services_component_1.DialogEditServices,
                export_all_services_component_1.DialogExportAllServicesComponent,
                escalate_component_1.DialogEscalateComponent,
                entry_visa_component_1.EntryVisaComponent,
                invoice_edit_so_component_1.DialogInvoiceEditComponent,
                requestInvoice_component_1.RequestInvoiceComponent,
                dialog_work_permit_component_1.DialogWorkPermitComponent,
                dialog_residency_permit_component_1.DialogResidencyPermitComponent,
                dialog_visa_deregistration_component_1.DialogVisaDeregistrationComponent,
                general_confirmation_component_1.GeneralConfirmationComponent,
                notification_component_1.NotificationDialog,
                renewal_component_1.DialogRenewal,
                addCall_component_1.DialogAddCall,
                assignTask_component_1.DialogAssignTask,
                editTask_component_1.DialogEditTask,
                mapit_component_1.DialogMapit,
                viewEscalation_component_1.DialogViewEscalation,
                escalationLevel_component_1.DialogEscalationLevels,
                corporate_assistance_component_1.DialogCortporateAssistance,
                legal_review_consultation_component_1.DialogLegalReviewConsultation,
                dialog_document_management_component_1.DialogDocumentManagementComponent,
                dialog_local_documentation_component_1.DialogLocalDocumentationComponent,
                general_confirmation_component_1.GeneralConfirmationComponent,
                dialog_local_documentation_component_1.DialogLocalDocumentationComponent,
                dialog_visa_deregistration_component_1.DialogVisaDeregistrationComponent,
                dialog_add_appointment_component_1.DialogAddAppointmentComponent,
                dialog_export_component_1.DialogExportComponent,
                pre_decision_orientation_component_1.PreDecisionOrientationComponent,
                area_orientation_component_1.AreaOrientationComponent,
                home_finding_component_1.HomeFindingComponent,
                dialog_documents_component_1.DialogDocumentsComponent,
                settling_in_component_1.SettlingInComponent,
                school_search_component_1.SchoolSearchComponent,
                dialog_departure_component_1.DialogDepartureComponent,
                dialog_temporary_housing_component_1.DialogTemporaryHousingComponent,
                dialog_rental_furniture_component_1.DialogRentalFurnitureComponent,
                dialog_transportation_component_1.DialogTransportationComponent,
                dialog_airport_transportation_component_1.DialogAirportTransportationComponent,
                dialog_complete_component_1.DialogCompleteComponent,
                dialog_evaluate_component_1.DialogEvaluateComponent,
                dialog_request_payment_component_1.DialogRequestPaymentComponent,
                dialog_tenancy_component_1.DialogTenancyComponent,
                dialog_property_component_1.DialogPropertyComponent,
                dialog_housing_specifications_component_1.DialogHousingSpecificationsComponent,
                dialog_home_details_component_1.DialogHomeDetailsComponent,
                dialog_school_details_component_1.DialogSchoolDetailsComponent,
                dialog_property_report_component_1.DialogPropertyReportComponent,
                dialog_inventory_component_1.DialogInventoryComponent,
                dialog_addchild_component_1.DialogAddchildComponent,
                dialog_addpayment_component_1.DialogAddpaymentComponent,
                dialog_included_in_rent_component_1.DialogIncludedInRentComponent,
                dialog_cost_savings_component_1.DialogCostSavingsComponent,
                dialog_report_day_component_1.DialogReportDayComponent,
                dialog_request_additional_time_component_1.DialogRequestAdditionalTimeComponent,
                dialog_general_confirmation_component_1.DialogGeneralConfirmation,
                dialog_slider_component_1.DialogSliderComponent,
                dialog_change_status_component_1.DialogChangeStatusComponent,
                dialog_history_status_component_1.DialogHistoryStatusComponent,
                dialog_comment_history_component_1.DialogCommentHistoryComponent,
                dialog_documents_view_component_1.DialogDocumentsView,
                dialog_library_documents_component_1.DialogLibraryDocuments,
                supplier_partners_component_1.SupplierPartnersComponent,
                new_supplier_component_1.NewSupplierComponent,
                dialog_new_contact_component_1.DialogNewContactComponent,
                dialog_document_profile_supplier_component_1.DialogDocumentProfileSupplierComponent,
                dialog_wire_transfer_component_1.DialogWireTransferComponent,
                dialog_consultant_component_1.DialogConsultantComponent,
                supplier_services_component_1.SupplierServicesComponent,
                supplier_consultant_component_1.SupplierConsultantComponent,
                dialog_administrative_contact_consultant_component_1.DialogAdministrativeContactConsultantComponent,
                dialog_consultant_contact_consultant_component_1.DialogConsultantContactConsultantComponent,
                dialog_add_vahicle_component_1.DialogAddVahicleComponent,
                dialog_add_vahicle_consultant_component_1.DialogAddVahicleConsultantComponent,
                dialog_calendar_component_1.DialogCalendarComponent,
                calendar_component_1.CalendarComponent,
                Coordinators_component_1.DialogCoordinatorsComponent,
                dialog_following_component_1.DialogFollowingComponent,
                escalations_component_1.EscalationsComponent,
                dialog_arrival_component_1.DialogArrivalComponent,
                dialog_calls_component_1.DialogCallsComponent,
                dialog_edit_call_component_1.DialogEditCallComponent,
                dialog_dashboard_add_call_component_1.DialogDashboardAddCallComponent,
                dialog_dashboard_reminders_component_1.DialogDashboardRemindersComponent,
                dialog_dashboard_add_reminders_component_1.DialogDashboardAddRemindersComponent,
                reports_component_1.ReportsComponent,
                activity_component_1.ActivityComponent,
                experience_surveys_component_1.ExperienceSurveysComponent,
                training_component_1.TrainingComponent,
                finance_component_1.FinanceComponent,
                admin_center_component_1.AdminCenterComponent,
                partner_component_1.PartnerComponent,
                dialog_availability_calendar_component_1.DialogAvailabilityCalendarComponent,
                dialog_add_availability_calendar_component_1.DialogAddAvailabilityCalendarComponent,
                dialog_report_error_component_1.DialogReportErrorComponent,
                dialog_request_payment_new_component_1.DialogRequestPaymentNewComponent,
                dialog_document_request_component_1.DialogDocumentRequestComponent,
                dialog_document_request_recurrent_component_1.DialogDocumentRequestRecurrentComponent,
                dialog_payment_concept_component_1.DialogPaymentConceptComponent,
                profile_component_1.ProfileComponent,
                home_component_1.HomeComponent,
                directory_component_1.DirectoryComponent,
                dialog_timeoffrequest_component_1.DialogTimeoffrequestComponent,
                notification_component_2.NotificationComponent,
                messenger_center_component_1.MessengerCenterComponent,
                dialog_new_chat_component_1.DialogNewChatComponent,
                dialog_deletepaymentconcept_component_1.DialogDeletepaymentconceptComponent,
                dialog_inspectionrepairs_component_1.DialogInspectionrepairsComponent,
                dialog_lease_summary_component_1.DialogLeaseSummaryComponent,
                dialog_property_expenses_component_1.DialogPropertyExpensesComponent,
                dialog_payment_type_component_1.DialogPaymentTypeComponent,
                dialog_key_component_1.DialogKeyComponent,
                dialog_attendees_component_1.DialogAttendeesComponent,
                dialog_attendees_component_1.DialogAttendeesComponent,
                my_training_component_1.MyTrainingComponent,
                leads_component_1.LeadsComponent,
                new_partner_client_component_1.NewPartnerClientComponent,
                dialog_contract_pricing_info_component_1.DialogContractPricingInfoComponent,
                dialog_documents_lead_client_component_1.DialogDocumentsLeadClientComponent,
                dialog_activity_log_component_1.DialogActivityLogComponent,
                dialog_terms_of_the_deal_component_1.DialogTermsOfTheDealComponent,
                dialog_office_information_component_1.DialogOfficeInformationComponent,
                dialog_contacts_component_1.DialogContactsComponent,
                dialog_add_client_component_1.DialogAddClientComponent,
                dialog_add_service_component_1.DialogAddServiceComponent,
                dialog_add_cuntry_component_1.DialogAddCuntryComponent,
                dialog_score_awads_component_1.DialogScoreAwadsComponent,
                dialog_experiens_team_component_1.DialogExperiensTeamComponent,
                dialog_report_of_day_component_1.DialogReportOfDayComponent,
                profile_consultant_component_1.ProfileConsultantComponent,
                profile_coordinator_component_1.ProfileCoordinatorComponent,
                profile_manager_component_1.ProfileManagerComponent,
                dialog_emergency_contact_component_1.DialogEmergencyContactComponent,
                dialog_profile_document_component_1.DialogProfileDocumentComponent,
                dialog_add_office_component_1.DialogAddOfficeComponent,
                dialog_add_country_component_1.DialogAddCountryComponent,
                dialog_add_operation_leader_component_1.DialogAddOperationLeaderComponent,
                dialog_add_assigned_team_component_1.DialogAddAssignedTeamComponent,
                countries_component_1.CountriesComponent,
                dialog_admin_center_countries_component_1.DialogAdminCenterCountriesComponent,
                dialog_admin_center_add_city_component_1.DialogAdminCenterAddCityComponent,
                dialog_admin_center_add_info_component_1.DialogAdminCenterAddInfoComponent,
                catalogs_component_1.CatalogsComponent,
                services_component_1.ServicesComponent,
                training_admin_component_1.TrainingAdminComponent,
                dialog_add_country_seccion_country_component_1.DialogAddCountrySeccionCountryComponent,
                dialog_admin_center_documents_upload_component_1.DialogAdminCenterDocumentsUploadComponent,
                dialog_admin_center_emergency_component_1.DialogAdminCenterEmergencyComponent,
                dialog_add_service_admin_center_component_1.DialogAddServiceAdminCenterComponent,
                dialog_add_service_admin_center_component_1.DialogAddServiceAdminCenterComponent,
                dialog_admin_center_documents_upload_component_1.DialogAdminCenterDocumentsUploadComponent,
                dialog_admin_center_emergency_component_1.DialogAdminCenterEmergencyComponent,
                dialog_payment_concept_document_component_1.DialogPaymentConceptDocumentComponent,
                all_active_services_component_1.AllActiveServicesComponent,
                dialog_catalog_currencies_component_1.DialogCatalogCurrenciesComponent,
                dialog_catalog_languages_component_1.DialogCatalogLanguagesComponent,
                dialog_catalog_offices_component_1.DialogCatalogOfficesComponent,
                dialog_catalog_roles_component_1.DialogCatalogRolesComponent,
                dialog_catalog_titles_component_1.DialogCatalogTitlesComponent,
                dialog_catalog_clicles_component_1.DialogCatalogCliclesComponent,
                dialog_catalog_user_component_1.DialogCatalogUserComponent,
                dialog_add_country_seccion_country_component_1.DialogAddCountrySeccionCountryComponent,
                request_center_component_1.RequestCenterComponent,
                invoice_list_component_1.InvoiceListComponent,
                report_country_partner_component_1.ReportCountryPartnerComponent,
                report_by_status_component_1.ReportByStatusComponent,
                reports_full_sistem_contacts_component_1.ReportsFullSistemContactsComponent,
                dialog_add_table_full_sistem_contact_component_1.DialogAddTableFullSistemContactComponent,
                suplier_partner_component_1.SuplierPartnerComponent,
                dialog_add_filter_full_sistem_contact_component_1.DialogAddFilterFullSistemContactComponent,
                dialog_request_invoice_component_1.DialogRequestInvoiceComponent,
                dialog_document_invoice_component_1.DialogDocumentInvoiceComponent,
                dialog_confirm_component_1.DialogConfirmComponent,
                dialog_supplierpartnerinvoice_component_1.DialogSupplierpartnerinvoiceComponent,
                new_table_operational_reports_component_1.NewTableOperationalReportsComponent,
                dialog_edit_colums_operational_reports_component_1.DialogEditColumsOperationalReportsComponent,
                dialog_edit_filters_operational_reports_component_1.DialogEditFiltersOperationalReportsComponent,
                dialog_request_invoice_component_1.DialogRequestInvoiceComponent,
                dialog_add_columns_full_sistem_contact_component_1.DialogAddColumnsFullSistemContactComponent,
                stickynote_component_1.StickynoteComponent,
                dialog_stickynote_component_1.DialogStickynoteComponent,
                third_party_expenses_component_1.ThirdPartyExpensesComponent,
                invoices_supplier_component_1.InvoicesSupplierComponent,
                invoices_service_component_1.InvoicesServiceComponent,
                my_invoices_component_1.MyInvoicesComponent,
                dialog_additional_expenses_component_1.DialogAdditionalExpensesComponent,
                dialog_requested_invoice_component_1.DialogRequestedInvoiceComponent,
                dialog_requested_invoices_document_component_1.DialogRequestedInvoicesDocumentComponent,
                add_participante_component_1.AddParticipanteComponent,
                add_training_component_1.AddTrainingComponent,
                add_content_component_1.AddContentComponent,
                content_component_1.ContentComponent,
                add_element_component_1.AddElementComponent,
                training_curso_component_1.TrainingCursoComponent,
                training_finished_component_1.TrainingFinishedComponent,
                preview_component_1.PreviewComponent,
                catalogs_currencies_component_1.CatalogsCurrenciesComponent,
                catalogs_languages_component_1.CatalogsLanguagesComponent,
                catalogs_premier_offices_component_1.CatalogsPremierOfficesComponent,
                catalogs_roles_component_1.CatalogsRolesComponent,
                catalogs_job_titles_component_1.CatalogsJobTitlesComponent,
                catalogs_life_cicles_component_1.CatalogsLifeCiclesComponent,
                catalogs_users_component_1.CatalogsUsersComponent,
                catalogs_sex_component_1.CatalogsSexComponent,
                catalogs_marital_status_component_1.CatalogsMaritalStatusComponent,
                catalogs_nationality_component_1.CatalogsNationalityComponent,
                catalogs_weight_measure_component_1.CatalogsWeightMeasureComponent,
                catalogs_pet_type_component_1.CatalogsPetTypeComponent,
                catalogs_vehicle_type_component_1.CatalogsVehicleTypeComponent,
                catalogs_tax_percentage_component_1.CatalogsTaxPercentageComponent,
                catalogs_proficiency_component_1.CatalogsProficiencyComponent,
                catalogs_education_level_component_1.CatalogsEducationLevelComponent,
                catalogs_company_type_component_1.CatalogsCompanyTypeComponent,
                dialog_catalog_sex_component_1.DialogCatalogSexComponent,
                dialog_catalog_pet_type_component_1.DialogCatalogPetTypeComponent,
                dialog_catalog_vehicle_type_component_1.DialogCatalogVehicleTypeComponent,
                dialog_catalog_tax_percentage_component_1.DialogCatalogTaxPercentageComponent,
                dialog_catalog_company_type_component_1.DialogCatalogCompanyTypeComponent,
                dialog_catalog_proficiency_component_1.DialogCatalogProficiencyComponent,
                dialog_catalog_education_level_component_1.DialogCatalogEducationLevelComponent,
                admin_center_users_component_1.AdminCenterUsersComponent,
                admin_center_system_configuration_component_1.AdminCenterSystemConfigurationComponent,
                dialog_catalog_relationship_component_1.DialogCatalogRelationshipComponent,
                dialog_catalog_visa_category_component_1.DialogCatalogVisaCategoryComponent,
                dialog_catalog_privacy_component_1.DialogCatalogPrivacyComponent,
                dialog_inactive_user_component_1.DialogInactiveUserComponent,
                dialog_add_leader_component_1.DialogAddLeaderComponent,
                dialog_catalog_policy_component_1.DialogCatalogPolicyComponent,
                dialog_catalog_payment_responsibility_component_1.DialogCatalogPaymentResponsibilityComponent,
                dialog_catalog_partner_status_component_1.DialogCatalogPartnerStatusComponent,
                dialog_catalog_coverage_type_component_1.DialogCatalogCoverageTypeComponent,
                dialog_catalog_service_type_component_1.DialogCatalogServiceTypeComponent,
                dialog_catalog_transport_type_component_1.DialogCatalogTransportTypeComponent,
                dialog_catalog_coordinator_type_component_1.DialogCatalogCoordinatorTypeComponent,
                dialog_catalog_notification_type_component_1.DialogCatalogNotificationTypeComponent,
                dialog_catalog_document_type_component_1.DialogCatalogDocumentTypeComponent,
                dialog_catalog_contact_type_component_1.DialogCatalogContactTypeComponent,
                dialog_catalog_supplier_type_component_1.DialogCatalogSupplierTypeComponent,
                dialog_catalog_breed_component_1.DialogCatalogBreedComponent,
                dialog_change_password_component_1.DialogChangePasswordComponent,
                legal_renewal_component_1.LegalRenewalComponent,
                dialog_catalog_status_component_1.DialogCatalogStatusComponent,
                add_group_component_1.AddGroupComponent,
                home_sale_component_1.HomeSaleComponent,
                home_purchase_component_1.HomePurchaseComponent,
                other_component_1.OtherComponent,
                property_management_component_1.PropertyManagementComponent,
                dialog_add_visit_component_1.DialogAddVisitComponent,
                dialog_add_upcoming_component_1.DialogAddUpcomingComponent,
                dialog_add_slide_home_component_1.DialogAddSlideHomeComponent,
                dialog_post_it_component_1.DialogPostItComponent,
                dialog_completion_report_immigration_component_1.DialogCompletionReportImmigrationComponent,
                view_all_reports_component_1.ViewAllReportsComponent,
                dialog_completion_report_relocation_component_1.DialogCompletionReportRelocationComponent,
                tenancy_management_component_1.TenancyManagementComponent,
                dialog_add_event_tenancy_component_1.DialogAddEventTenancyComponent,
                dialog_add_conclusion_completion_report_component_1.DialogAddConclusionCompletionReportComponent,
                dialog_documents_relocation_component_1.DialogDocumentsRelocationComponent
            ]
        })
    ], MaterialComponentsModule);
    return MaterialComponentsModule;
}());
exports.MaterialComponentsModule = MaterialComponentsModule;
