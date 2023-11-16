import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { NewCommentModalComponent } from '../../new-comment-modal/new-comment-modal.component';
import { TokenService } from 'src/app/auth/services/token.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  constructor(private route: ActivatedRoute, private productService: ProductService, private dialog: MatDialog, private tokenService: TokenService) { }
  productId?: number;
  product?:Product;
  currentImageIndex: number = 0;
  currentImage: any;


  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const productId = this.route.snapshot.params["id"];
      console.log(productId);
      if(productId){
        this.getProduct(productId);
      }
    });
  }

  isAuthenticated(): boolean {
    return this.tokenService.getAccessToken() !== null;
  }

  getProduct(id: number){
    this.productService.getProduct(id).subscribe({
      next: (product: Product) => {
        this.product = product;
        this.currentImage = product.images[0];
        console.log(this.product);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  openNewCommentModal(productId: number): void {
    const dialogRef = this.dialog.open(NewCommentModalComponent);
    dialogRef.componentInstance.productId = productId;

    dialogRef.afterClosed().subscribe(result => {
      this.getProduct(productId);
    });
  }

  showPreviousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      if(this.product)
        this.currentImage = this.product.images[this.currentImageIndex];
    }
  }

  showNextImage() {
    if(this.product){
      if (this.currentImageIndex < this.product.images.length - 1) {
        this.currentImageIndex++;
        this.currentImage = this.product.images[this.currentImageIndex];
      }
    }
  }

}
