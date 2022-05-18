import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
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
export class AppComponent implements OnInit {
  title = 'frontEndForm';
  profileForm: FormGroup;

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      framework: new FormControl(null, [Validators.required]),
      frameworkVersion: new FormControl(null, [Validators.required]),
      hobbies: new FormArray([new FormControl(null, [Validators.required])]),
    });
  }

  matcher = new MyErrorStateMatcher();
  addHobby() {
    console.log(this);
  }

  onSubmit() {
    console.log(this.profileForm.value);
  }
}
