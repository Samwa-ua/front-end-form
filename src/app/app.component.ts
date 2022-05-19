import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {}

  matcher = new MyErrorStateMatcher();

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    framework: ['', Validators.required],
    frameworkVersion: ['', Validators.required],
    hobbies: this.fb.array([]),
  });

  get hobbies() {
    return this.profileForm.controls['hobbies'] as FormArray;
  }

  addHobby() {
    const hobbiesForm = this.fb.group({
      title: ['', Validators.required],
      duration: ['', Validators.required],
    });
    this.hobbies.push(hobbiesForm);
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }
}
