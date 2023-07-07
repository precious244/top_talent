import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSalaryService } from 'src/app/services/add-salary/add-salary.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { EditExperienceModel } from '../modal-add-experience/model/edit-experience.model';
import { AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { __values } from 'tslib';
@Component({
  selector: 'app-modal-edit-experience',
  templateUrl: './modal-edit-experience.component.html',
  styleUrls: ['./modal-edit-experience.component.scss']
})
export class ModalEditExperienceComponent {
  expModel = new EditExperienceModel();
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];
  userData: any = {};
  @Input() data: any;
  profile: any = {};
  experience : any = {};
  submitted: boolean = false;
  disabled: boolean = false;
  editable: boolean = true;  

  currentYear = new Date().getFullYear();
  startPeriodYearOptions: number[] = [];
  endPeriodYearOptions: number[] = [];
  chosenYearDate: Date | undefined;
  value: any = [];
  isPresent: boolean = true;  

  @Input()
  maxNumberOfCharacters = 2000;
  counter = true;

  numberOfCharacters1 = 0;
  numberOfCharacters2 = 0;
  interaction = {
    textValue: ''
  };
  invisible: boolean = true;

  constructor(
    public activeModal: NgbActiveModal,
    public profileService: ProfileService,
    public readonly authService: AuthService,
    private readonly salaryService: AddSalaryService,
  ) { 
  //   this.expModel.editExperience.controls['isPresent'].valueChanges.subscribe(value => {
  //     if (value) {
  //       this.expModel.editExperience.controls['endPeriodMonth'].disable()
  //       this.expModel.editExperience.controls['endPeriodMonth'].setValue('july')
  //       this.expModel.editExperience.controls['endPeriodMonth'].getRawValue()
  //       console.log(this.expModel.editExperience.controls['endPeriodMonth'].getRawValue());
  //       this.expModel.editExperience.controls['endPeriodYear'].disable()
  //       this.expModel.editExperience.controls['endPeriodYear'].setValue('0')
  //       this.expModel.editExperience.controls['endPeriodYear'].getRawValue()
  //       console.log(this.expModel.editExperience.controls['endPeriodYear'].getRawValue());
  //     } else {
  //       this.expModel.editExperience.controls['endPeriodMonth'].enable()
  //       this.expModel.editExperience.controls['endPeriodYear'].enable()
  //     }
  // })
}

  
updateData() { 
  this.expModel.editExperience.markAllAsTouched();
  this.expModel.editExperience.controls['jobseekerId'].setValue(this.userData.jobseekerId);
  this.profileService.getExpList(this.expModel.editExperience.value).subscribe(
      (response: any) => {
        var index = this.profileService.getIndex()
        var experienceId = response.data[index]['experienceId']
        this.expModel.editExperience.controls['experienceId'].setValue(experienceId)
        console.log(this.expModel.editExperience.value)
        this.profileService.updateExp(this.expModel.editExperience.value).subscribe(
          (response: any) => {
            this.salaryService.saveData(response.data)
            this.submitted = true
            this.activeModal.dismiss('Cross click')
            window.location.reload()
    })})}

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.endPeriodYearOptions.push(2050 - i);
    }

    for (let i = 0; i < 100; i++) {
      this.startPeriodYearOptions.push(this.currentYear - i);
    }
    if (this.authService.isLogin()) {
      this.userData = this.authService.loadUserData()
    }
    const param = {
      jobseekerId: this.data.jobseekerId
    }
    this.profileService.getUserProfile(param).subscribe(
      (response: any) => {
        this.expModel.userProfile = response.data;
        this.profile = this.expModel.userProfile;
      })
    this.profileService.getAllJobType().subscribe(
      (response) => {
        this.expModel.allJobType = response.data;
      })
    this.profileService.getAllJobFunction().subscribe(
      (response) => {
        this.expModel.allJobFunction = response.data;
      })
    this.profileService.getAllCompanyList().subscribe(
      (response) => {
        this.expModel.allCompany= response.data;
      })
      this.expModel.editExperience.controls['jobseekerId'].setValue(this.userData.jobseekerId);
      this.profileService.getExpList(this.expModel.editExperience.value).subscribe(
          (response: any) => {
            var index = this.profileService.getIndex()
            var experienceId = response.data[index]['experienceId']
            this.expModel.editExperience.controls['experienceId'].setValue(experienceId)
            this.profileService.getExpDetail(this.expModel.editExperience.value).subscribe(
              (data:any) => {
                this.expModel.dataExperience = data.data;
                this.experience = this.expModel.dataExperience;
            })})
    this.getCountries();
    }

  getCountries(){
    this.profileService.getCountryList().subscribe(
      (response) => {
        this.expModel.allCountry = response.data;
    })}

  onChangeCountry(countryId:any) {
      this.expModel.allCity = this.expModel.allCountry[countryId];
      this.profileService.getCityList(countryId).subscribe(
        (response:any)=>{
          this.expModel.allCity = response.data
        }
      )
    }
  roleData3 = [];
  roleData = [];

  get f(): { [key: string]: AbstractControl } {
    return this.expModel.editExperience.controls;
  }

  onKeyUp(event: any): void {
    this.numberOfCharacters1 = event.target.value.length;

    if (this.numberOfCharacters1 > this.maxNumberOfCharacters) {
      event.target.value = event.target.value.slice(0, this.maxNumberOfCharacters);
      this.numberOfCharacters1 = this.maxNumberOfCharacters;
    }
  }

  confirmBox(){
    Swal.fire({
      title: 'Are you sure you want to cancel ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result:any) => {
      if (result.value) {
        window.location.reload()
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }
  }
