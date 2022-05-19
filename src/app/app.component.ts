import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

interface IJSTechnologies {
  framework: string;
  versions: string[];
}

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
  frameworkVersion: string[];

  frameworks: IJSTechnologies[] = [
    { framework: 'angular', versions: ['1.1.1', '1.2.1', '1.3.3'] },
    { framework: 'react', versions: ['2.1.2', '3.2.4', '4.3.1'] },
    { framework: 'vue', versions: ['3.3.1', '5.2.1', '5.1.3'] },
  ];

  constructor(private fb: FormBuilder) {}

  matcher = new MyErrorStateMatcher();
  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required, Validators.email, this.restrictedEmail()],
    dateOfBirth: ['', Validators.required],
    framework: ['', Validators.required],
    frameworkVersion: ['', Validators.required],
    hobbies: this.fb.array([]),
  });

  ngOnInit(): void {
    this.profileForm.get('framework')?.valueChanges.subscribe((item) => {
      this.frameworkVersion = item.versions;
    });
  }

  get hobbies() {
    return this.profileForm.controls['hobbies'] as FormArray;
  }

  restrictedEmail() {
    // console.log(this);
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
