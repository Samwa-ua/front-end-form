import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontEndForm';
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  dateOfBirth = new FormControl('', [Validators.required]);
  framework = new FormControl('', [Validators.required]);
  frameworkVersion = new FormControl('', [Validators.required]);
  hobbies = new FormArray([new FormControl(null, [Validators.required])]);
  // hobby = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  addHobby() {
    (<FormArray>this.hobbies.get('')).push(new FormControl(null));
    console.log(this.hobbies);
  }

  submit() {
    console.log(this.firstName.value);
  }
}
