import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { LoginRequest } from 'src/app/models/login-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from '../services/token.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  username: string = '';
  password: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private registrationService: RegistrationService, private snackBar: MatSnackBar, private tokenService: TokenService) { 
    this.loginForm = formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
  ngOnInit(): void {
  }

  login(){
    const request : LoginRequest = {
      username : this.loginForm.value.username,
      password : this.loginForm.value.password
    };

    this.registrationService.login(request).subscribe({
      next : (response : any) => {
        if(response === null){
          this.snackBar.open('Please activate your account first.', undefined, { duration: 2000 })
          this.router.navigate(['/auth/activate']).then(() => {
          });
        }
        else{
          this.tokenService.saveTokens(response.token);
          const logedInUser: User = {
            id: response.id,
            firstName: response.firstName,
            lastName: response.lastName,
            username: response.username,
            email: response.email,
            phoneNumber: response.phoneNumber,
            city: response.city,
            avatarUri: response.avatarUri,
            status: response.status
          }
          this.tokenService.saveUser(logedInUser);
          this.snackBar.open('Succesfull login!', undefined, { duration: 2000 })
          this.router.navigate(['/home']).then(() => {
          });
        }
      }
    });
  }

}
