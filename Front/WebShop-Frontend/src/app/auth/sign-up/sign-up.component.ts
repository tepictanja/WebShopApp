import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { SignUpRequest } from 'src/app/models/sign-up-request';
import { NavigationExtras, Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class SignUpComponent implements OnInit{
  selectedFiles: File[] = [];
  selectedImagesNames: string[] = [];
  signUpForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService, private snackBar: MatSnackBar, private router: Router,
    private imageService: ImageService) {
    this.signUpForm = formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      city: [null, Validators.required],
    });
  }
  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    this.uploadImages();
  }

  uploadImages() {
    const uploadObservables: Observable<any>[] = [];

    for (let i = 0; i < this.selectedFiles.length; i++) {
      uploadObservables.push(this.imageService.uploadFile(this.selectedFiles[i]));
    }

    forkJoin(uploadObservables).subscribe({
      next: (results: any[]) => {
        results.forEach((downloadURL: any) => {
          this.selectedImagesNames.push(downloadURL);
        });
      },
      error: (error: any) => {
        console.error('Error uploading files:', error);
      }
    });
  }

  signUp(){
    const request : SignUpRequest = {
      firstName : this.signUpForm.value.firstName,
      lastName: this.signUpForm.value.lastName,
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password,
      email: this.signUpForm.value.email,
      phoneNumber: this.signUpForm.value.phoneNumber,
      city: this.signUpForm.value.city,
      avatarUri: this.selectedImagesNames[0],
    };
    
    this.registrationService.signUp(request).subscribe({
      next: () => {
        this.signUpForm.reset()
      },
      error: () =>
        this.snackBar.open('An error occured!', undefined, { duration: 2000 }),
      complete: () =>{
        this.snackBar.open('Account created sucessfully! PIN has been sent to your e-mail. Please activate account.', undefined, {
          duration: 4000,
        }),
          this.router.navigate(['/auth/activate']).then(() => {
          });
      },
    });
  }
}
