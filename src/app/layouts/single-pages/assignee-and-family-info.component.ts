import { Component, ViewChild, OnInit, createPlatformFactory, Input } from '@angular/core';
import { LoaderComponent } from '../../../app/shared/loader';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceGeneralService } from 'app/service/service-general/service-general.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { DialogDocumentsComponent } from 'app/pages-component/dialog/dialog-documents/dialog-documents.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogGeneralMessageComponent } from 'app/pages-component/dialog/general-message/general-message.component';
import { FilterPipe, FilterPipeModule } from 'ngx-filter-pipe';


/*
    1. Globals
    2. Functions
    3. Utilities
    Ex: Class and Models
*/
@Component({
    selector: 'assignee-and-family-sp',
    templateUrl: './assignee-and-family-info.component.html',
  })
  export class SinglePageAssigneeFamilyInfo implements OnInit {

    constructor(
        public _services:ServiceGeneralService,
        public _router:Router,
        public _routerParams:ActivatedRoute,
        public _dialog:MatDialog
    ) {}

    public today_date:Date = new Date();
    public images_path:string = this._services.url_images;
    public __loader__:LoaderComponent = new LoaderComponent();
    public assing_dependents:DependentInformationsModel[] = [];
    public assing_information:AssigneeInformationModel = new AssigneeInformationModel();
    public immgration_profile:ImmigrationProfileModel = new ImmigrationProfileModel();
    public image_path:string = this._services.url_images;

    public typePrefix: any  = {
      countriesName: ''
    }
    public prefix;
    public prefixWork;
    public prefixCatalog;
    public filterLanguages1: any = { name: '' };
    public filterNationality0: any = { nationality1: '' };
    public filterNationalityRe2: any = { nationality1: '' };

    // toggles para dependent
    public toggleDependent: Boolean = false;
    public togglePet : Boolean = false;


    ngOnInit() { this.initPageSettings() }

    public request_id:number = 0;
    public initPageSettings():void {

        this.request_id = this._routerParams.snapshot.params.id;

        this.requestSettingsData();
        this.getCatalogues();
        this.assing_dependents.push( new DependentInformationsModel() );
        this.assing_pets.push( new PetsNavigationModel() );

    }

    public able_ass_section:boolean = false;
    public able_imm_section:boolean = false;
    public able_hou_section:boolean = false;
    public sr_request_data:any = {};
    public typehous_catalogue:any[] = [];
    public housing_forms_requested_ids:any = undefined;
    public WorkOrderServiceId:any;
    public requestSettingsData():void {

        this._services.service_general_get(`RequestInformation/GetRequestInformation?id=${ this.request_id }`)
            .subscribe( (response:any) => {
                console.log("Request Information: ",response.result );
                if( response.success ) {
                 
                    this.sr_request_data = response.result;
                    this.WorkOrderServiceId = this.sr_request_data.housingAvailible[0].workOrderServices;

                    if( this.sr_request_data.needsAssessment ) {

                        this.able_ass_section = true;
                        this.requestSRData();

                    }

                    if( this.sr_request_data.immigrationProfile ) {

                        this.able_imm_section = true;
                        this.immgration_education.push( new EducationalBackgrounds() );
                        this.immgration_languages.push( new LenguageProficiencies() );
                        this.immgration_dependent.push( new DependentImmigrationInfos() );

                    }

                    if( this.sr_request_data.housingSpecification ) {

                        this.housing_forms_requested_ids = [];

                        this.able_hou_section = true;
                        this.typehous_catalogue = this.sr_request_data.housingAvailible;
                        console.log("housing specifications: ", this.typehous_catalogue);
                        this.typehous_catalogue.forEach( (type:any) => {

                            this.housing_forms_requested_ids.push( type.id );

                        });
                        this.changeHSForm(this.typehous_catalogue[0].id);

                    }

                    this._services.service_general_get('HousingSpecification/GetHousingSpecitifcationByServiceRecord/'+this.WorkOrderServiceId+'/'+this.sr_request_data.housingAvailible[0].id )
                    .subscribe( (response:any) => {
                        console.log("Housing Specification: ",response.result );
                        if( response.success ) {
                            if(this.sr_request_data.housingAvailible[0].typeHousing == "Area Orientation"){
                                this.housing_are = response.result;
                                
                            }
                            if(this.sr_request_data.housingAvailible[0].typeHousing == "Pre Decision"){
                                this.housing = response.result;
                                
                            }
                            if(this.sr_request_data.housingAvailible[0].typeHousing == "Home Finding"){
                                this.housing_hom = response.result;
                                
                            }
                        }
                    })

                }

                console.log('Get Request Information ====> ', response);

            }, (error:any) => {

                console.error('Error (GetRequestInformation) => ', error);

            });

    }

    public sr_data:any = undefined;
    public current_email:string = '';
    public requestSRData():void {

      this._services.service_general_get(`ServiceRecord/GetServiceRecordById?id=${this.sr_request_data.serviceRecordId}`)
        .subscribe( (response:any) => {
            console.log("get service record by id: ",response.result );
              this.sr_data = response.result;
              this.assing_information = this.sr_data.assigneeInformations[0];

              this.current_email = this.assing_information.email;

              this.assing_information.sexId = this.assing_information.sexId.toString();

              if( this.assing_information.dependentInformations.length != 0 ) {
                this.toggleDependent = true;
                  // this.show_dependent_section = true;
                  this.assing_dependents = this.assing_information.dependentInformations;
                  // this.toggleDependentsSection();

              }

              if( this.assing_information.petsNavigation.length != 0 ) {

                  // this.show_pets_section = true;
                  this.togglePet = true;
                  this.assing_pets = this.assing_information.petsNavigation;

              }

              if( this.assing_information.photo != '' ) {

                  this.assing_information.photo = this.assing_information.photo;

              }

              // separar prefix de phone number
              // si el valor de mobilephone no es mayor a 10 caracteres entonces no tiene prefijo y toma el valor actual desde la bd asi vienen con prefijo  93+6567567567 o sin 6567567567
              if (this.assing_information.mobilePhone != '' && this.assing_information.mobilePhone != null)
              {
                let search = '+';
                // obtener la posicion de +
                let posicion = this.assing_information.mobilePhone.indexOf(search);
                // obtener el valor de prefix
                this.prefix = this.assing_information.mobilePhone.substr(0, posicion);
                // obtener valor phone
                this.assing_information.mobilePhone = this.assing_information.mobilePhone.substr(posicion + 1);

              }
              // sacar prefix de work phone
              if (this.assing_information.workPhone != '' && this.assing_information.workPhone != null)
              {
                let search = '+';
                // obtener la posicion de +
                let posicion = this.assing_information.workPhone.indexOf(search);
                // obtener el valor de prefix
                this.prefixWork = this.assing_information.workPhone.substr(0, posicion);
                // obtener valor phone
                this.assing_information.workPhone = this.assing_information.workPhone.substr(posicion + 1);

              }



              this.setDependentsConfiguration();
              this.initLanguageSelector();

              console.log('[CP101] GetServiceRecordById => ', this.assing_information);

          }, (error:any) => {

              console.error('Error (GetServiceRecordById) => ', error);

      });

    }

    public initLanguageSelector(): void {
      console.log('languages', this.assing_information.languagesSpokens);
      const languages_selected: any[] = this.assing_information.languagesSpokens;

      let languages_pre_selected: number[] = [];

      languages_selected.forEach((language: any) => {

        languages_pre_selected.push(language.languages);

      });

      this.assing_information.languagesSpokens = [];
      this.assing_information.languagesSpokens = languages_pre_selected;


    }

    public setDependentsConfiguration():void {

        const dependents_in: DependentInformationsModel[] = this.assing_information.dependentInformations;

        if (dependents_in.length == 0) {

          this.assing_dependents.push(new DependentInformationsModel());

        } else {

          this.toggleDependentsSection();
          this.assing_dependents = dependents_in;

          this.assing_dependents.forEach((dependent: DependentInformationsModel) => {

            if (dependent.photo.indexOf(this.image_path) <= -1) {

              dependent.photo = this.image_path + dependent.photo;

            }

            if( dependent.languageDependentInformations.length != 0 ) {

              let hold_lan_id:number[] = [];

              dependent.languageDependentInformations.forEach( ( language:LanguagesSpokensModelDependent ) => {

                hold_lan_id.push( language.language );

              });

              dependent.languageDependentInformations = [];
              dependent.languageDependentInformations = hold_lan_id;

            }

          });

        }

    }

    public assing_pets:PetsNavigationModel[] = [];
    public addPet():void {

        this.assing_pets.push( new PetsNavigationModel() );

    }

    public removePet( index:number ):void {

        this.assing_pets.splice( index ,1 );

    }

    public addDepartament():void {

        this.assing_dependents.push( new DependentInformationsModel() );

    }

    public removeDepartament( index:number ):void {

        this.assing_dependents.splice( index ,1 );

    }


    public aceptarCondiciones:any;
    public show_message:boolean = false;
    public saveAssingInformation() {

        if( this.validatingAssingInformations() ) {

            this.__loader__.showLoader();

            this.photoCleaner();
            this.getLanguagesData();
            this.getLanguagesDependentsData();
            // concatenar prefix de telefono
            if ( this.assing_information.mobilePhone != '' &&this.prefix) {
              this.assing_information.mobilePhone = `${this.prefix}+${this.assing_information.mobilePhone}`
            }
            console.log('numero con prefix', this.assing_information.mobilePhone);
            // concatenar prefix de work phone
            if ( this.assing_information.workPhone != '' && this.prefixWork) {
              this.assing_information.workPhone = `${this.prefixWork}+${this.assing_information.workPhone}`
            }
            console.log('numero con prefix work phone', this.assing_information.workPhone);

            console.log('Data Send Ass ==> ', this.assing_information);


            console.log(this.aceptarCondiciones);
            debugger
            if(this.aceptarCondiciones != true){
              this.show_message = true;
              this.__loader__.hideLoader();
              return true;
            }


            this._services.service_general_post_with_url(`AssigneeInformation/CreateAssigneeInformartion`, this.assing_information)
                .subscribe( (response:any) => {

                    console.log('Response Assignee information ===> ', response);

                    if( response.success ) {

                        const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
                            data: {
                              header: 'Assignee Information',
                              body: 'Assignee Information has been sent successfully.'
                            }
                        });

                        this.initPageSettings();

                    }

                    this.__loader__.hideLoader();

                }, (error:any) => {

                    console.error('Error (CreateImmigrationProfile) => ', error);

                    this.__loader__.hideLoader();

                });

        } else {

            console.log('No se ha completado el formulario');

            this.movePageTo();


        }

    }

    public getLanguagesData():void {
        console.log(this.assing_information.languagesSpokens);
        let languages_selected : any [] = this.assing_information.languagesSpokens, hold_language: LanguagesSpokensModel [] = [];
        debugger

          // let languages_selected  = this.assing_information.languagesSpokens_;


          languages_selected.forEach( (language:any) => {

            const language_selected: LanguagesSpokensModel = new LanguagesSpokensModel();

            language_selected.assignneInformation = this.assing_information.id;
            language_selected.languages = language;
            hold_language.push(language_selected);

              // this.assing_information.languagesSpokens.push({
              //     assignneInformation: this.assing_information.id,
              //     languages: language
              // });
          });
          this.assing_information.languagesSpokens = [];
          this.assing_information.languagesSpokens = hold_language;


    }

    public getLanguagesDependentsData():void {

        const dependents:any[] = this.assing_dependents;
        if( dependents.length != 0 ) {
            //let language_holder:any[] = [];
            dependents.forEach( (dependent:DependentInformationsModel) => {
                if( dependent.languageDependentInformations.length != 0 ) {
                    const languages:any[] = dependent.languageDependentInformations;
                    console.log(languages);
                    dependent.languageDependentInformations = [];
                        languages.forEach( (language_:any) => {
                            //const new_language:LanguagesSpokensModelDependent = new LanguagesSpokensModelDependent;
                            dependent.languageDependentInformations.push({
                                dependent: dependent.id,
                                language: language_
                            })
                            //new_language.language = language.language;
                            //language_holder.push( new_language );
                        });

                    //dependent.languageDependentInformations = language_holder;
                    //language_holder = [];
                }
            });
        }
    }

    public houses_requested:any[] = [];
    public saveHousingInformation() {

        console.log('Data Send H ==> ', this.housing);
        console.log('Data Send H ==> ', this.housing_hom);
        console.log('Data Send H ==> ', this.housing_are);

        console.log('Enviaria esto => ', this.addAllHousesSelected());
        let data__ = this.addAllHousesSelected();
        console.log("data que se enviara: ",data__);
        if( this.validatingHousingForms() ) {

            this.__loader__.showLoader();

            if(this.aceptarCondiciones != true){
                this.show_message = true;
                this.__loader__.hideLoader();
                return true;
              }

              debugger
              data__.forEach(E => {
                  
                  if(E.id && E.id!=0){
                    console.log(JSON.stringify(E));
                    this._services.service_general_put('HousingSpecification/PutCreateHousingSpecification', E)
                    .subscribe( (response:any) => {
                        console.log('Response Housing ===> ', response);
                        if( response.success ) {
                            const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
                                data: {
                                header: 'Housing Specifications',
                                body: 'Housing Specification has been sent successfully.'
                                }
                            });
                        }
                        this.__loader__.hideLoader();
                    }, (error:any) => {
                        console.error('Error (CreateHousingSpecification) => ', error);
                        this.__loader__.hideLoader();
    
                    });
                  }
                  
                    if(E.id && E.id==0){
                        this._services.service_general_post_with_url('HousingSpecification/AddHousingSpecification', E)
                        .subscribe( (response:any) => {
                            console.log('Response Housing ===> ', response);
                            if( response.success ) {
                                const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
                                    data: {
                                    header: 'Housing Specifications',
                                    body: 'Housing Specification has been sent successfully.'
                                    }
                                });
                            }
                            this.__loader__.hideLoader();
                        }, (error:any) => {
                            console.error('Error (CreateHousingSpecification) => ', error);
                            this.__loader__.hideLoader();
        
                        });
                      
                  }
              });

        }

    }

    public saveImmgrationInformation(){

        if( this.validatingImmgrationForm() ) {

            this.immgration_profile.serviceRecordId = this.sr_request_data.serviceRecordId;
            this.immgration_profile.educationalBackgrounds = this.immgration_education;
            this.immgration_profile.lenguageProficiencies = this.immgration_languages;
            this.immgration_profile.dependentImmigrationInfos = this.immgration_dependent;

            console.log('Data Send P ==> ', JSON.stringify( this.immgration_profile ) );

            if(this.aceptarCondiciones != true){
                this.show_message = true;
                this.__loader__.hideLoader();
                return true;
            }

            this._services.service_general_post_with_url('ImmigrationProfile/CreateImmigrationProfile', this.immgration_profile)
                .subscribe( (response:any) => {

                    console.log('Response Imm ===> ', response);

                    if( response.success ) {

                        const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
                            data: {
                            header: 'Immigrations Profile',
                            body: 'Immigrations Profile has been sent successfully.'
                            }
                        });

                    }

                }, (error:any) => {

                    console.error('Error (CreateImmigrationProfile) => ', error);

                });

        }

    }

    public saveFormsData():void {

        if( this.able_ass_section ) {

            this.saveAssingInformation();

        }

        if( this.able_imm_section ) {

            this.saveImmgrationInformation();

        }

        if( this.able_hou_section ) {

            this.saveHousingInformation();

        }

    }

    public show_ass_foer:boolean = false;
    public validatingAssingInformations():boolean {

        let result:boolean = true;
        this.show_ass_foer = true;

        if( this.assing_information.assigneeName == '' ) result = false;
        if( this.assing_information.birth == '' ) result = false;
        if( this.assing_information.age == '' ) result = false;
        if( this.assing_information.nationalityId == '' ) result = false;
        if( this.assing_information.maritalStatusId == '' ) result = false;
        if( this.assing_information.email == '' ) result = false;
        if( !this.validateEmail( this.assing_information.email ) ) result = false;
        if( this.assing_information.mobilePhone == '' ) result = false;
        if( this.assing_information.workPhone == '' ) result = false;
        if( this.assing_information.policyTypeId == '' ) result = false;
        if( this.assing_information.assignmentDurationTime == '' ) result = false;
        if( this.assing_information.assignmentDuration == '' ) result = false;
        if( this.assing_information.initialArrival == '' ) result = false;
        if( this.assing_information.finalMove == '' ) result = false;
        if( this.assing_information.homeCountryId == '' ) result = false;
        if( this.assing_information.homeCityId == '' ) result = false;
        if( this.assing_information.currentPosition == '' ) result = false;
        if( this.assing_information.hostCountry == '' ) result = false;
        if( this.assing_information.hostCityId == '' ) result = false;
        if( this.assing_information.newPosition == '' ) result = false;
        if( !this.assInforValidateDependents() ) result = false;
        if( !this.assInforValidatePets() ) result = false;

        return result;

    }

    public ass_mail_val:boolean = false;
    public validateAssInfoEmail( mail:string ):void {

        this.validateEmail( mail ) ?
            this.ass_mail_val = true :
            this.ass_mail_val = false;

    }

    public show_imm_err:boolean = false;
    public validatingImmgrationForm():boolean {

        let result:boolean = true;

        this.show_imm_err = true;

        if( this.immgration_profile.passportInformation.number == '' ) result = false;
        if( this.immgration_profile.passportInformation.issue == '' ) result = false;
        if( this.immgration_profile.passportInformation.expiration == '' ) result = false;
        if( this.immgration_profile.passportInformation.issuingAuthority == '' ) result = false;
        if( this.immgration_profile.passportInformation.placeIssue == '' ) result = false;
        if( this.immgration_profile.passportInformation.currentAddress == '' ) result = false;
        if( this.immgration_profile.previousHostCountry.visaNumber == ''  ) result = false;
        if( this.immgration_profile.previousHostCountry.issue == ''  ) result = false;
        if( this.immgration_profile.previousHostCountry.expiration == ''  ) result = false;
        if( this.immgration_profile.previousHostCountry.issuingAuthority == ''  ) result = false;
        if( this.immgration_profile.previousHostCountry.placeIssue == ''  ) result = false;
        if( this.immgration_profile.previousHostCountry.visaCategoryId == ''  ) result = false;
        if( this.immgration_profile.highestLevelEducationalId == ''  ) result = false;
        if( this.immgration_profile.assigmentInformation.legalNameHomeCountry == ''  ) result = false;
        if( this.immgration_profile.assigmentInformation.currentJobPositionTitle == ''  ) result = false;
        if( this.immgration_profile.assigmentInformation.employmentFrom == ''  ) result = false;
        if( this.immgration_profile.assigmentInformation.employmentTo == ''  ) result = false;
        if( this.immgration_profile.assigmentInformation.hiringManagerEmail == ''  ) result = false;
        if( !this.validateEmail( this.immgration_profile.assigmentInformation.hiringManagerEmail )  ) result = false;
        if( !this.immgrationLanguageValidator() ) result = false;
        if( !this.immgrationDependentValidator() ) result = false;

        return result;

    }

    public hir_imm_form:boolean = false;
    public hirignEmailValidation( email_in:string ):void {

        this.validateEmail( email_in ) ?
            this.hir_imm_form = true :
            this.hir_imm_form = false;

    }

    public immgrationLanguageValidator():boolean {

        let result:boolean = true;

        this.immgration_languages.forEach( (language:LenguageProficiencies) => {

            if( language.languageId.length == 0 ) result = false;
            if( language.proficiencyId == '' ) result = false;

        });

        return result;

    }

    public immgrationDependentValidator():boolean {

        let result:boolean = true;

        this.immgration_dependent.forEach( (dependent:DependentImmigrationInfos) => {

            if( dependent.relationshipId == '' ) result = false;
            if( dependent.name == '' ) result = false;
            if( dependent.passportNumber == '' ) result = false;
            if( dependent.issue == '' ) result = false;
            if( dependent.expiration == '' ) result = false;
            if( dependent.issuingAuthority == '' ) result = false;
            if( dependent.placeIssue == '' ) result = false;
            if( dependent.entryDateHostCountry == '' ) result = false;

        });

        return result;

    }

    public show_hofo_err:boolean = false;
    public validatingHousingForms():boolean {

        let result:boolean = true;

        this.show_hofo_err = true;

        this.housing_forms_requested_ids.forEach( (form_id:number) => {

            if( form_id == 1 ) result = this.validatingHousingForm();
            if( form_id == 2 ) result = this.validatingHousingFormHF();
            if( form_id == 3 ) result = this.validatingHousingFormAO();

        });

        if( !result ) this.showGeneralMessageDialog(
            `Housing Specifications incomplete`,
            `You must fill all forms from select "Desired Property Type" to continue.`
        );

        return result;

    }

    public validatingHousingForm():boolean {

        let result:boolean = true;

        if( this.housing.areaInterest == '' ) result = false;
        if( this.housing.contractTypeId == '' ) result = false;
        if( this.housing.propertyTypeId == '' ) result = false;
        if( this.housing.bedroom == '' ) result = false;
        if( this.housing.bathroom == '' ) result = false;
        if( this.housing.budget == '' ) result = false;
        if( this.housing.currencyId == '' ) result = false;
        if( this.housing.metricId == '' ) result = false;
        if( this.housing.sizeId == '' ) result = false;
        if( this.housing.desiredCommuteTime == '' ) result = false;
        if( this.housing.intendedStartDate == '' ) result = false;
        if( this.housing.parkingSpacesId == '' ) result = false;

        return result;

    }

    public validatingHousingFormHF():boolean {

        let result:boolean = true;

        if( this.housing_hom.areaInterest == '' ) result = false;
        if( this.housing_hom.contractTypeId == '' ) result = false;
        if( this.housing_hom.propertyTypeId == '' ) result = false;
        if( this.housing_hom.bedroom == '' ) result = false;
        if( this.housing_hom.bathroom == '' ) result = false;
        if( this.housing_hom.budget == '' ) result = false;
        if( this.housing_hom.currencyId == '' ) result = false;
        if( this.housing_hom.metricId == '' ) result = false;
        if( this.housing_hom.sizeId == '' ) result = false;
        if( this.housing_hom.desiredCommuteTime == '' ) result = false;
        if( this.housing_hom.intendedStartDate == '' ) result = false;
        if( this.housing_hom.parkingSpacesId == '' ) result = false;

        return result;

    }

    public validatingHousingFormAO():boolean {

        let result:boolean = true;

        if( this.housing_are.areaInterest == '' ) result = false;
        if( this.housing_are.contractTypeId == '' ) result = false;
        if( this.housing_are.propertyTypeId == '' ) result = false;
        if( this.housing_are.bedroom == '' ) result = false;
        if( this.housing_are.bathroom == '' ) result = false;
        if( this.housing_are.budget == '' ) result = false;
        if( this.housing_are.currencyId == '' ) result = false;
        if( this.housing_are.metricId == '' ) result = false;
        if( this.housing_are.sizeId == '' ) result = false;
        if( this.housing_are.desiredCommuteTime == '' ) result = false;
        if( this.housing_are.intendedStartDate == '' ) result = false;
        if( this.housing_are.parkingSpacesId == '' ) result = false;

        return result;

    }

    public show_defo_err:boolean = false;
    public assInforValidateDependents():boolean {

        let result:boolean = true;
        // this.show_dependent_section
        if( this.toggleDependent ) {

            this.show_defo_err = true;

            this.getAssingDependentsAge( this.assing_dependents );

            this.assing_dependents.forEach( (dependent:DependentInformationsModel) => {

                dependent.assigneeInformationId = this.assing_information.id;

                if( dependent.relationshipId == '' ) result = false;
                if( dependent.name == '' ) result = false;
                if( dependent.birth == '' ) result = false;
                if( dependent.languagesId == '' ) result = false;
                if( dependent.nationalityId == '' ) result = false;

                switch( dependent.relationshipId.toString() ) {

                    case '1':
                        if( dependent.email == '' ) result = false;
                        if( dependent.phone == '' ) result = false;
                        break;

                    case '2':
                        if( dependent.currentGrade == '' ) result = false;
                        break;

                    case '3':
                        if( dependent.ifOther == '' ) result = false;
                        break;

                    default:
                        result = false;
                        break;

                }

            });

            if( result ) this.assing_information.dependentInformations = this.assing_dependents;

        } else {

            this.show_defo_err = false;

            this.assing_dependents = [];

        }

        return result;

    }

    public show_pedo_err:boolean = false;
    public assInforValidatePets():boolean {

        let result:boolean = true;
        // this.show_pets_section
        if( this.togglePet ) {

            this.show_pedo_err = true;

            this.getPetsAges( this.assing_pets );

            this.assing_pets.forEach( (pet:PetsNavigationModel) => {

                pet.assigneeInformationId = this.assing_information.id;

                if( pet.petTypeId == '' ) result = false;
                if( pet.name == '' ) result = false;
                if( pet.breedId == '' ) result = false;
                if( pet.age == '' ) result = false;
                if( pet.sizeId == '' ) result = false;
                if( pet.weight == '' ) result = false;

            });

            if( result ) this.assing_information.petsNavigation = this.assing_pets;

        } else {

            this.assing_pets = [];

        }

        return result;

    }

    public getAssingDependentsAge( dependents_in:DependentInformationsModel[] ):void {

        dependents_in.forEach( ( dependent:DependentInformationsModel, index:number ) => {

          const dependent_age_container:any = document.getElementById(`dependent_${ index }`);

          if( dependent_age_container != undefined || dependent_age_container != null ) {

            dependent.age = dependent_age_container.value;

          }

        });

    }

    public getPetsAges( pets_in:PetsNavigationModel[] ):void {

        pets_in.forEach( ( pet:PetsNavigationModel, index:number ) => {

          const pet_age_container:any = document.getElementById(`pet_${ index }`);

          if( pet_age_container != undefined || pet_age_container != null ) {

            pet.age = pet_age_container.value;

          }

        });

    }

    public able_home_city:boolean = false;
    public home_city_catalogue:any[] = [];
    public async initHomeCityFieldSettings( country_id:string ):Promise<void> {

        this.able_home_city = true;

        // this.home_city_catalogue = await this._services.getCatalogueFrom(`GetState?country=${ country_id }`);

        this.home_city_catalogue = await this._services.getCatalogueFrom('GetState', `?country=${country_id}`);

    }

    public able_host_city:boolean = false;
    public host_city_catalogue:any[] = [];
    public async initHostCityFieldSettings( country_id:string ):Promise<void> {

        this.able_host_city = true;

        this.host_city_catalogue = await this._services.getCatalogueFrom(`GetState?country=${ country_id }`);

    }

    public immgration_education:EducationalBackgrounds[] = [];
    public addEducationGroup(): void {

        this.immgration_education.push( new EducationalBackgrounds() );

    }

    public removeEducationGroup(index): void {

        this.immgration_education.splice(index, 1);

    }

    public immgration_languages:LenguageProficiencies[] = [];
    public addLanguage(): void {

        this.immgration_languages.push( new LenguageProficiencies() );

    }

    public removeLanguage(index): void {

        this.immgration_languages.splice(index, 1);

    }

    public immgration_dependent:DependentImmigrationInfos[] = [];
    public addDependent(): void {

        this.immgration_dependent.push( new DependentImmigrationInfos() );

    }

    public removeDependent(index: number): void {

        this.immgration_dependent.splice(index, 1);

    }

    public checkCheckBoxvalue(event) {
        console.log(event.source.value);
        let l = new RelHousingAmenities();
        l.amenitieId = event.source.value;
        l.housingSpecificationId = 0;
        this.housing.relHousingAmenities.push(l);
    }

    public checkCheckBoxvalueHome(event) {
        console.log(event.source.value);
        let l = new RelHousingAmenities();
        l.amenitieId = event.source.value;
        l.housingSpecificationId = 0;
        this.housing_hom.relHousingAmenities.push(l);
    }

    public checkCheckBoxvalueArea(event) {
        console.log(event.source.value);
        let l = new RelHousingAmenities();
        l.amenitieId = event.source.value;
        l.housingSpecificationId = 0;
        this.housing_are.relHousingAmenities.push(l);
    }

    public addNewDocument( dependent_in:DependentImmigrationInfos ):void {

        const dialogRef = this._dialog.open(DialogDocumentsComponent, {
            width: "95%",
            data: dependent_in
        });

        dialogRef.afterClosed().subscribe( (result:any) => {

            const document_data:DocumentDependentsImmigrationInfo = new DocumentDependentsImmigrationInfo();

            document_data.id = result.id;
            document_data.fileName = result.fileName;
            document_data.fileExtension = result.fileExtension;
            document_data.fileRequest = result.fileRequest;
            document_data.createdBy = result.createdBy;
            document_data.updatedDate = result.updatedDate;
            document_data.issueDate = result.issueDate;
            document_data.expirationDate = result.expirationDate;
            document_data.issuingAuthority = result.issuingAuthority;
            document_data.countryOrigin = result.countryOriginthis;
            document_data.local = true;

            dependent_in.documentDependentImmigrationInfos.push( document_data );

        });

    }

    public photoCleaner():void {

        if( this.assing_information.photo.indexOf('data:') == 0 ) {

            this.assing_information.photo = this.assing_information.photo.split(',')[1]

        }

        if( this.assing_information.dependentInformations.length != 0 ) {

            this.assing_information.dependentInformations.forEach( (dependent:any) => {

                if( dependent.photo.indexOf('data:') == 0 ) {

                    dependent.photo = dependent.photo.split(',')[1];

                }

            });

        }

        if( this.assing_information.petsNavigation.length != 0 ) {

            this.assing_information.petsNavigation.forEach( (pet:any) => {

                if( pet.photo.indexOf('data:') == 0 ) {

                    pet.photo = pet.photo.split(',')[1];

                }

            });

        }

    }

    /* Utilities ======================================> */
    public country_catalogue:any = [];
    public marital_catalogue:any = [];
    public policytype_catalogue:any = [];
    public assduration_catalogue:any = [];
    public relationship_catalogue:any = [];
    public languages_catalogue:any[] = [];
    public schoolgrades_catalogue:any[] = [];
    public pettype_catalogue:any[] = [];
    public petsize_catalogue:any[] = [];
    public breed_catalogue:any[] = [];
    public visacategory_catalogue:any = [];
    public hightschool_catalogue:any = [];
    public proficiency_catalogue:any[] = [];
    public catContractType:any[] = [];
    public catDesiredPorpertyType:any[] = [];
    public catMetric:any[] = [];
    public amenities:RelHousingAmenities[] = [];
    public caCurrency:any[] = [];
    public weightmeasure_catalogue:any[] = [];
    public gender_catalogue:any = [];
    public nationality_catalogue: any = [];
    public ca_property = [];

    public async getCatalogues():Promise<void> {

        this.weightmeasure_catalogue = await this._services.getCatalogueFrom('GetWeightMeasure');
        this.country_catalogue = await this._services.getCatalogueFrom('GetCountry');
        this.nationality_catalogue = await this._services.getCatalogueFrom('Nationalities');

        this.marital_catalogue = await this._services.getCatalogueFrom('GetMaritalStatus');
        this.policytype_catalogue = await this._services.getCatalogueFrom('GetPolicyType');
        this.assduration_catalogue = await this._services.getCatalogueFrom('GetDurationForServiceRecord');
        this.relationship_catalogue = await this._services.getCatalogueFrom('GetRelationship');
        this.languages_catalogue = await this._services.getCatalogueFrom('GetLanguages');
        this.schoolgrades_catalogue = await this._services.getCatalogueFrom('GetGradeSchooling');
        this.pettype_catalogue = await this._services.getCatalogueFrom('GetPetType');
        this.petsize_catalogue = await this._services.getCatalogueFrom('GetSize');
        this.proficiency_catalogue = await this._services.getCatalogueFrom('GetProficiency');
        this.visacategory_catalogue = await this._services.getCatalogueFrom('GetVisaCategory');
        this.hightschool_catalogue = await this._services.getCatalogueFrom('GetHighestLevelEducation');
        this.catContractType = await this._services.getCatalogueFrom('GetContractType');
        this.catDesiredPorpertyType = await this._services.getCatalogueFrom('GetPropertyTypeHousing');
        this.catMetric = await this._services.getCatalogueFrom('GetMetric');
        let amenities_ = await this._services.getCatalogueFrom('GetAmenity');
            amenities_.forEach(E => {
            E.checked = false;
          });
          this.amenities = amenities_;

          amenities_.forEach((E:any) => {
            for (let i = 0; i < this.housing_are.relHousingAmenities.length; i++) {
                if(E.id == this.housing_are.relHousingAmenities[i].amenitieId){
                    E.checked = true;
                }
            }
           });

           amenities_.forEach((E:any) => {
            for (let i = 0; i < this.housing.relHousingAmenities.length; i++) {
                if(E.id == this.housing.relHousingAmenities[i].amenitieId){
                    E.checked = true;
                }
            }
           });

           amenities_.forEach((E:any) => {
            for (let i = 0; i < this.housing_hom.relHousingAmenities.length; i++) {
                if(E.id == this.housing_hom.relHousingAmenities[i].amenitieId){
                    E.checked = true;
                }
            }
           });


           this.amenities = amenities_;
           console.log(this.amenities);
      
        this.caCurrency = await this._services.getCatalogueFrom('GetCurrency');
        this.gender_catalogue = await this._services.getCatalogueFrom('GetSex');

        await this.initHomeCityFieldSettings( this.assing_information.homeCountryId );
        await this.initHostCityFieldSettings( this.assing_information.hostCountry );
        this.prefixCatalog = await this._services.getCatalogueFrom('PhoneCode');
        this._services.service_general_get('AdminCenter/PropertyType/All').subscribe(resp => {
            if (resp.success) {
              console.log('get desired', resp);
              this.ca_property = resp.result;
            }
          });

    }

    public async requestPetBreedCatalogue( id_pet_type:any ):Promise<any> {

        const extra_data = `?id=${ id_pet_type }`;

        this.breed_catalogue = await this._services.getCatalogueFrom('GetBreed', extra_data);

    }

    public getValueFromCatalogue( catalogue:[], id_to_find:any, get_field:string ):string {

        let result:string = '';

        catalogue.forEach( (item:any) => {

          if( item.id == id_to_find || item.dependentId == id_to_find ) {

            result = item[get_field];

          }

        });

        return result;

      }

      public getDocumentCountryOrigin( id_to_find:number ):string {

        return this.getValueFromCatalogue( this.country_catalogue , id_to_find, 'name' );

      }

    public show_dependent_section:boolean = false;

    // aqui esta el toggle dependent
    public toggleDependentsSection():void {

        !this.show_dependent_section ?
            this.show_dependent_section = true :
            this.show_dependent_section = false;

    }

    // aqui esta el toggle de pet
    public show_pets_section:boolean = false;
    public togglePetsSection():void {

        !this.show_pets_section ?
            this.show_pets_section = true :
            this.show_pets_section = false;

    }

    public calculateHowOld():void {

        const my_bd:any = this.assing_information.birth;

        if( my_bd != null || my_bd != '' ) {

            this.assing_information.age = calculateAge( my_bd  ).toString();

        } else {

            this.assing_information.age = null;

        }

        function calculateAge(birthday) {

            const ageDifMs = Date.now() - birthday.getTime(),
                  ageDate = new Date(ageDifMs);

            return Math.abs(ageDate.getUTCFullYear() - 1970);

        }

    }

    public calculateHowOldDina(to_who: string, value_input: any, native_input: boolean = true): void {

        value_input = value_input.target.value;

        const field_age_group: any = document.getElementById(to_who);

        debugger
        if (value_input != null) field_age_group.value = getYears(value_input);
        else field_age_group.value = null;

        function getYears(date_in: any): number {

          const date_init = new Date(date_in.getFullYear(), date_in.getMonth(), date_in.getDate()),
            date_today = new Date();

          let diff = (date_init.getTime() - date_today.getTime()) / 1000;
          diff /= (60 * 60 * 24);
  
          console.log("EDADES: ", Math.abs(Math.round(diff / 365.25))); 

          return Math.abs(Math.round(diff / 365.25));

        }

    }

    public movePageTo( y:number = 0): void {

        window.scrollTo(0, y);

    }

    public emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    public validateEmail(email_in: string): boolean {

        let result: boolean = true;

        const validating_email = this.emailPattern.test(email_in);

        if (!validating_email) result = false;

        return result;

    }

    public previewSelectedPhoto( event:any, model_to:any, field_to_append:string ):void {

        const event_input:any = event.target.files[0],
            reader:FileReader = new FileReader(),
            img_container:any = document.getElementById( field_to_append );

            reader.onload = () => {

                const base64:any = reader.result;

                model_to.photo = base64;
                model_to.photoExtension = event_input.type.split('/')[1];
                img_container.src = base64;

                console.log('=====> ', model_to);
                console.log( event_input );

            }

            reader.readAsDataURL( event_input );

    }

    /* Ultima actualizacion 3/Dic/2020 ==========================================================> */
    /* ==========================================================================================> */
    public passport_expiring:boolean = false;
    public isPassportExpiring( date_in:any ):void {

        const date_seleted:Date = new Date( date_in );

        let difference:any = ( date_seleted.getTime() - this.today_date.getTime() ) / 1000;
        difference /= (60 * 60 * 24 * 7 * 4);

        let months_between:number = Math.abs(Math.round(difference));

        months_between <= 6 ? this.passport_expiring = true : this.passport_expiring = false;

    }

    public show_second_prfield:boolean = false;
    public canIShowImmProSecondPayRoll():void {

        !this.show_second_prfield ?
            this.show_second_prfield = true :
            this.show_second_prfield = false;

    }

    public housing:HousingModel = new HousingModel();
    public housing_hom:HousingModel = new HousingModel();
    public housing_are:HousingModel = new HousingModel();

    public show_pre_form:boolean = false;
    public show_hom_form:boolean = false;
    public show_are_form:boolean = false;
    public changeHSForm( form_selected:any ):void {

        if( form_selected == 1 ) {

            this.show_pre_form = true;
            this.show_hom_form = false;
            this.show_are_form = false;

        } else if ( form_selected == 2 ) {

            this.show_pre_form = false;
            this.show_hom_form = true;
            this.show_are_form = false;

        } else if ( form_selected == 3 ) {

            this.show_pre_form = false;
            this.show_hom_form = false;
            this.show_are_form = true;

        }

        console.log(this.housing)
    }

    public addAllHousesSelected():any[] {

        let houses_selected:any[] = [];

        this.housing_forms_requested_ids.forEach( (form_to_send:any) => {

            if( form_to_send == 1 ) {

                this.housing.typeService = 1;
                this.housing.workOrderServices = this.sr_request_data.housingAvailible[0].workOrderServices;
                houses_selected.push( this.housing );

            }

            if( form_to_send == 2 ) {

                this.housing_hom.typeService = 2;
                this.housing_hom.workOrderServices = this.sr_request_data.housingAvailible[0].workOrderServices;
                houses_selected.push( this.housing_hom );

            }

            if( form_to_send == 3 ) {

                this.housing_are.typeService = 3;
                this.housing_are.workOrderServices = this.sr_request_data.housingAvailible[0].workOrderServices;
                houses_selected.push( this.housing_are );

            }

        });
         
        console.log(this.housing)
        return houses_selected;

    }

    public showGeneralMessageDialog(title: string = "No title", body: string = "No content"): void {

        const dialogRef = this._dialog.open(DialogGeneralMessageComponent, {
          data: {
            header: title,
            body: body
          }
        });

        dialogRef.afterClosed().subscribe(result => {

        });

    }

    public validateEmailServerAvailability( mail:string ):void {

        if( mail != '' ) {

          this._services.service_general_get(`User/VeryfyEmail?email=${ mail }`)
              .subscribe( (response:any) => {

                console.log('Res => ', response);

                if( this.current_email != response.result ) {

                  if( !response.success ) {

                    this.showGeneralMessageDialog(
                        'Email already exists',
                        'The email already exists, perhaps it has been used in any Service Record.'
                    );

                    this.assing_information.email = '';

                  }

                }

              }, (error:any) => {

                console.error('Error (User/VeryfyEmail) => ', error);

              });

        }

      }

}

class LanguagesSpokensModel {
    assignneInformation:number = 0;
    languages:string = '';
}

class LanguagesSpokensModelDependent {
    dependent:number = 0;
    language:number = 0;
}

class AssigneeInformationModel {
    id:number = 0;
    assigneePhoto:string = '';
    assigneeName:string = '';
    assigneeNameId:number = 0;
    sexId:string = "1";
    birth:string = '';
    age:string = '';
    nationalityId:string = '';
    maritalStatusId:string = '';
    mobilePhone:string = '';
    workPhone:string = '';
    policyTypeId:string = '';
    assignmentDuration:string = '';
    assignmentDurationTime:string = '';
    initialArrival:string = '';
    homeCountryId:string = '';
    finalMove:string = '';
    homeCityId:string = '';
    currentPosition:string = '';
    hostCountry:string = '';
    photo:string = '';
    PhotoExtension:string = '';
    hostCityId:string = '';
    newPosition:string = '';
    dependentInformation:boolean = null;
    pets:boolean = null;
    email:string = '';
    dependentInformations:any = [];
    petsNavigation:any = [];
    serviceRecordId:number = 0;
    languagesSpokens:any[] = [];
    languagesSpokens_:any = [];
}

class DependentInformationsModel {
    id:number = 0;
    photo:string = '';
    PhotoExtension:string = '';
    relationshipId:string = '';
    name:string = '';
    birth:string = '';
    age:string = '';
    nationalityId:string = '';
    aditionalComments:string = '';
    assigneeInformationId:number = 0;
    languagesId:string = '';
    email:string = '';
    phone:string = '';
    currentGrade:string = '';
    ifOther:string = '';
    sex:boolean = false;
    languageDependentInformations:any[] = [];
    languageDependentInformations_:any = [];
}

class immigrationCoodinators {
    id:number = 0;
    coordinatorTypeId:number = 0;
    coordinatorId:number = 0;
    assigned:string = '';
    accepted:string = '01/01/1900';
    serviceRecordId:number = 0;
    statusId:number = 2;
}

class relocationCoordinators {
    id:number = 0;
    coordinatorTypeId:string = '';
    coordinatorId:string = '';
    assigned:string = '';
    accepted:string = '01/01/1900';
    serviceRecordId:number = 0;
    statusId:number = 2;
}

class PetsNavigationModel {
    id:number = 0;
    petTypeId:string = '';
    name:string = '';
    breedId:string = '';
    age:string = '';
    sizeId:string = '';
    weight:string = '';
    PhotoExtension:string = '';
    weightMeasuresId:string = '';
    assigneeInformationId:number = 0;
    photo:string = '';
}

class ImmigrationProfileModel {
    id:number = 0;
    serviceRecordId:number = 0;
    passportInformationId:number = 0;
    previousHostCountryId:number = 0;
    assigmentInformationId:number = 0;
    highestLevelEducationalId:string = '';
    passportInformation:PassportInformation = new PassportInformation();
    previousHostCountry:PreviousHostCountry = new PreviousHostCountry();
    educationalBackgrounds:EducationalBackgrounds[] = [];
    lenguageProficiencies:LenguageProficiencies[] = [];
    assigmentInformation:AssigmentInformation = new AssigmentInformation();
    dependentImmigrationInfos:DependentImmigrationInfos[] = [];
}

class PassportInformation {
    id: number = 0;
    number: string = '';
    issue: string = '';
    expiration: string = '';
    issuingAuthority: string = '';
    placeIssue: string = '';
    currentAddress: string = '';
    specificAttentionPoints: string = '';
}

class PreviousHostCountry {
    priorHostCountryVisaIssued: boolean = false;
    id: number = 0;
    visaNumber: string = '';
    issue: string = '';
    expiration: string = '';
    issuingAuthority: string = '';
    placeIssue: string = '';
    visaCategoryId: string = '';
    idAssignedNumber: string = '';
    positionEmployer: string = '';
    positionResponsabilities: string = '';
}

class EducationalBackgrounds {
    id: number = 0;
    immigrationProfileId: number = 0;
    institution: string = '';
    fieldStudy: string = '';
    startDate: string = '';
    endDate: string = '';
    degree: string = '';
    listProfessionalLicenses: string = '';
}

class LenguageProficiencies {
    id: number = 0;
    languageId:string = '';
    proficiencyId:string = '';
    comments: string = '';
    immigrationProfileId: number = 0;
}

class AssigmentInformation {
    id: number = 0;
    legalNameHomeCountry:string = '';
    locationHome:string = '';
    currentJobPositionTitle:string = '';
    employmentFrom:string = '';
    employmentTo:string = '';
    legalNameHostCountry:string = '';
    locationHost:string = '';
    newJobPositionTitle:string = '';
    newJobResponsibilitie:string = '';
    estimatedStartDate:string = '';
    lenghtAssigment:string = '';
    currentGrossSalary:string = '';
    newGrossSalary:string = '';
    payrollLocation:string = '';
    splitPayrollApplicable:boolean = false;
    hiringManager:string = '';
    hiringManagerPhone:string = '';
    hiringManagerEmail:string = '';
    legalRepresentative:string = '';
    specificAtention:string = '';
    documentType:string = '';
    documentTypeExtension:string = '';
    licenseDriver:string = '';
    licenseDriverExtension:string = '';
    currencyNewGrossSalary:string = '';
    currencyCurrentGrossSalary:string = '';
    payrollLocationSecond:string = '';
}

class DependentImmigrationInfos {
    id: number = 0;
    relationshipId:string = '';
    name: string = '';
    passportNumber: string = '';
    issue: string = '';
    expiration: string = '';
    issuingAuthority: string = '';
    placeIssue: string = '';
    entryDateHostCountry: string = '';
    specificAttentionPoints: string = '';
    immigrationProfileId:number = 0;
    documentType: string = '';
    documentTypeExtension: string = '';
    licenceDriver: string = '';
    licenseDriverExtension: string = '';
    documentDependentImmigrationInfos:DocumentDependentsImmigrationInfo[] = [];
}

class HousingModel {
    id:number = 0;
    workOrderServices:string = '';
    typeService:number = 0;
    serviceRecordId:number = 0;
    areaInterest:string = '';
    properytTypeId:number = 0;
    bedroom:string = '';
    bathroom:string = '';
    sizeId:string = '';
    metricId:string = '';
    desiredCommuteTime:string = '';
    propertyTypeId:string = '';
    budget:string = '';
    currencyId:string = '';
    contractTypeId:string = '';
    intendedStartDate:string = '';
    additionalComments:string = '';
    parkingSpacesId:string = '';
    relHousingAmenities:RelHousingAmenities[] = [];
}

export class RelHousingAmenities {
    housingSpecificationId: number;
    amenitieId: number;
}

class DocumentDependentsImmigrationInfo {
    id:number = 0;
    fileName:string = '';
    fileRequest:string = '';
    fileExtension:string = '';
    notificationId:number = 0;
    createdDate:string = '';
    createdBy:number = 0;
    updatedDate:string = '';
    issueDate:string = '';
    expirationDate:string = '';
    issuingAuthority:string = '';
    countryOrigin:string = '';
    local:boolean = false;
}
