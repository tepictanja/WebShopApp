import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileModalComponent } from './edit-profile-modal/edit-profile-modal.component';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { TokenService } from 'src/app/auth/services/token.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  pagedProducts: Product[] = [];
  activeProducts: Product[] = [];
  currentPage = 1;
  pageSize = 8;
  userImageUrl: string | undefined;


  constructor(private dialog: MatDialog, private productService: ProductService, private tokenService: TokenService, private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.currentPage = 1; 
    this.loadActiveProducts();
    this.userImageUrl = this.tokenService.getUser().avatarUri;
  }

  onModalClosed() {
    this.loadActiveProducts();
  }

  editProfile(): void {
    const modalRef = this.dialog.open(EditProfileModalComponent, {
      width: '30rem'
    });
  }

  loadActiveProducts() {
    const startIndex = this.currentPage - 1;
    this.productService.getUsersActiveProducts(this.tokenService.getUser().id, startIndex, this.pageSize)
      .subscribe((response: any) => {
          this.pagedProducts = response.content; 
      });
  }

  loadSoldProducts() {
    const startIndex = this.currentPage - 1;
    this.productService.getUsersSoldProducts(this.tokenService.getUser().id, startIndex, this.pageSize)
      .subscribe((response: any) => {
        if (response.content.length > 0) {
          this.pagedProducts = response.content;
        }
      });
  }

  loadPurchasedProducts(){
    const startIndex = this.currentPage - 1;
    this.productService.getPurchasedProducts(this.tokenService.getUser().id, startIndex, this.pageSize)
      .subscribe((response: any) => {
        if (response.content.length > 0) {
          this.pagedProducts = response.content;
        }
      });
  }

  loadNextPage() {
    this.currentPage++;
    this.loadActiveProducts();
  }

  loadPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadActiveProducts();
    }
  }

}
