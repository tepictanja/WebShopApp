import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, forkJoin } from 'rxjs';
import { TokenService } from 'src/app/auth/services/token.service';
import { User } from 'src/app/models/user';
import { UserUpdateRequest } from 'src/app/models/userUpdateRequest';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.css']
})
export class EditProfileModalComponent implements OnInit{

  editProfileForm: FormGroup;
  userImageUrl: string | undefined;
  selectedFiles: File[] = [];
  selectedImagesNames: string[] = [];

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<EditProfileModalComponent>, private tokenService: TokenService,
     private userService: UserService, private imageService: ImageService) {
    this.editProfileForm = formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      currentPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      email: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      city: [null, Validators.required],
    });
   }

  ngOnInit(): void {
    const user = this.tokenService.getUser();
    this.editProfileForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      city: user.city
    });
    this.userImageUrl = user.avatarUri;
  }

  cancel(): void {
    this.dialogRef.close();
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
        console.log('All files uploaded.');
        results.forEach((downloadURL: any) => {
          console.log('File uploaded successfully! Download URL:', downloadURL);
          this.selectedImagesNames.push(downloadURL);
        });
      },
      error: (error: any) => {
        console.error('Error uploading files:', error);
      }
    });
  }

  updateUserProfile(){
    var imageUri;
    if(this.selectedImagesNames.length>0)
      imageUri=this.selectedImagesNames[0];
    else
      imageUri=this.tokenService.getUser().avatarUri;
    console.log(imageUri);
    const request: UserUpdateRequest = {
      firstName: this.editProfileForm.value.firstName,
      lastName: this.editProfileForm.value.lastName,
      currentPassword: this.editProfileForm.value.currentPassword,
      newPassword: this.editProfileForm.value.newPassword,
      email: this.editProfileForm.value.email,
      phoneNumber: this.editProfileForm.value.phoneNumber,
      city: this.editProfileForm.value.city,
      avatarUri: imageUri
    }
    
    this.userService.updateUser(request).subscribe({
      next: (response: User) => {
        this.tokenService.saveUser(response);
        console.log("User information updated.");
      },
      error: (err: any) => {
        console.log(err);
        this.snackBar.open('An error occurred.', undefined, { duration: 2000 });
      },
      complete: () => {
        this.snackBar.open('User information updated successfully.', undefined, { duration: 2000 });
        this.dialogRef.close();
        window.location.reload();
      }
    });

  }

}
