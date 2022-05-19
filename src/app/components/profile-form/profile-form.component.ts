import { Component, OnInit } from '@angular/core';
import {
  AsyncValidator,
  FormArray,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { IEmailValidation } from 'src/app/interfaces/emailValidation';
import { IJSTechnologies } from 'src/app/interfaces/technologies';

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
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {
  title = 'frontEndForm';
  frameworkVersion: string[];

  jsTechnologies: IJSTechnologies[] = [
    { framework: 'angular', versions: ['1.1.1', '1.2.1', '1.3.3'] },
    { framework: 'react', versions: ['2.1.2', '3.2.4', '4.3.1'] },
    { framework: 'vue', versions: ['3.3.1', '5.2.1', '5.1.3'] },
  ];

  constructor(private fb: FormBuilder) {}

  matcher = new MyErrorStateMatcher();

  profileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [
      '',
      [Validators.required, Validators.email],
      this.restrictedEmail.bind(this) as AsyncValidator,
    ],
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

  restrictedEmail(control: FormControl): Promise<IEmailValidation> {
    const promise = new Promise<IEmailValidation>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.test') {
          resolve({ restrictedEmail: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }

  addHobby() {
    const hobbiesForm = this.fb.group({
      title: ['', Validators.required],
      duration: ['', Validators.required],
    });
    this.hobbies.push(hobbiesForm);
  }

  convertToJSON(): void {
    const data = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      dateOfBirth: this.formatDate(this.profileForm.value.dateOfBirth),
      framework: this.profileForm.value.framework.framework,
      frameworkVersion: this.profileForm.value.frameworkVersion,
      email: this.profileForm.value.email,
      hobbies: this.profileForm.value.hobbies,
    };

    console.log(data);
  }

  formatDate(time) {
    return new Date(time).toLocaleString('en-us', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  onSubmit() {
    this.convertToJSON();
  }
}
