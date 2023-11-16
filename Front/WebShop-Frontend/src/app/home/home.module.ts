import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';
import { HomeRoutingModule } from './home-routing.module';
import { ProductsComponent } from './products/products.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileModalComponent } from './user-profile/edit-profile-modal/edit-profile-modal.component';
import { CustomerSupportModalComponent } from './customer-support-modal/customer-support-modal.component';
import { NewProductComponent } from './new-product/new-product.component';
import { MatStepperModule } from "@angular/material/stepper";
import { MatDialogModule } from '@angular/material/dialog';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { ProductCardComponent } from './product-card/product-card.component';
import { NewCommentModalComponent } from './new-comment-modal/new-comment-modal.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { BuyModalComponent } from './buy-modal/buy-modal.component';



@NgModule({
  declarations: [
    ContainerComponent,
    ProductsComponent,
    UserProfileComponent,
    EditProfileModalComponent,
    CustomerSupportModalComponent,
    NewProductComponent,
    ProductDetailsComponent,
    ProductCardComponent,
    NewCommentModalComponent,
    ConfirmationModalComponent,
    BuyModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    HomeRoutingModule,
    MatStepperModule,
    MatDialogModule,
    MatTabsModule,
    MatTreeModule
  ]
})
export class HomeModule { }
