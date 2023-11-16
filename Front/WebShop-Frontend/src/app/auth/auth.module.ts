import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ActivateComponent } from './activate/activate.component';
import { MatStepperModule } from '@angular/material/stepper';
import { AuthComponent } from './auth/auth.component';


@NgModule({
    declarations: [
        LoginComponent,
        SignUpComponent,
        ActivateComponent,
        AuthComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule,
        MatStepperModule
    ]
})
export class AuthModule { }
