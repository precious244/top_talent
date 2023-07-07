import { FormControl, FormGroup, Validators } from "@angular/forms";

export class AddSalaryModel {
    allCurrency: any = [];
    jobseekerId: any;
    salaryId: any;
    userProfile: any = [];
    salary: any = {};
    
    formGroupEditSalary = new FormGroup({
        jobseekerId: new FormControl(""),
        salaryId: new FormControl(""),
        currentCurrency: new FormControl(""),
        expectedCurrency: new FormControl(""),
        currentSalary: new FormControl("", Validators.required),
        expectedMinimum: new FormControl("", Validators.required),
        expectedMaximum: new FormControl("", Validators.required)
    });

    responseUpdate: any = {
    }

    failedUpdate() {
        if (typeof this.responseUpdate.code !== 'undefined') {
            if (this.responseUpdate.code !== 200) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
}