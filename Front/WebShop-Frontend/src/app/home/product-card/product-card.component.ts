import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
import { BuyModalComponent } from '../buy-modal/buy-modal.component';
import { SoldProductRequest } from 'src/app/models/sold-product-request';
import { TokenService } from 'src/app/auth/services/token.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product?: Product;
  @Input() imageURL?: string ;
  @Input() delete?: boolean;
  @Input() buy?: boolean;
  @Output() modalClosed = new EventEmitter<void>();

  selectedPhoto: string | ArrayBuffer | null = null;

  constructor(private productService: ProductService, private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router,
    private tokenService : TokenService){
  }

  isAuthenticated(): boolean {
    return this.tokenService.getAccessToken() !== null;
  }

  navigateToProductDetails(id: number) {
    this.router.navigate(['/home/product', id]);
  }

  deleteProduct(id: number) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '300px',
      data: 'Are you sure you want to delete this product?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        if(id !== null){
          this.productService.deleteProduct(id).subscribe({
            next: () => {
            },
            error: (error: any) => {
              this.snackBar.open('An error occurred!' + error, undefined, { duration: 2000 });
              console.log(error);
            },
            complete: () => {
              this.snackBar.open('Product successfully deleted.', undefined, { duration: 2000 });
              this.modalClosed.emit();
            }
          });
        }
      }
    });
  }

  buyProduct(id: number){
    const dialogRef = this.dialog.open(BuyModalComponent, {
      data: { id }
    });

    const request : SoldProductRequest = {
      productId : id,
      customerId : this.tokenService.getUser().id
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result.confirm === 'confirm') {
        const address = result.address;
        if (id !== null) {
          this.productService.buyProduct(request).subscribe({
            next: () => {
              //this.router.navigate(['/home']).then(() => console.log('Navigation complete.'));
            },
            error: (error: any) => {
              this.snackBar.open('An error occurred!' + error, undefined, { duration: 2000 });
              console.log(error);
            },
            complete: () => {
              this.snackBar.open('Product successfully buyed.', undefined, { duration: 2000 });
              this.modalClosed.emit();
            }
          });

          this.productService.orderProduct(address).subscribe({
            next: () => {
            },
            error: (error: any) => {
              this.snackBar.open('An error occurred!' + error, undefined, { duration: 2000 });
              console.log(error);
            },
            complete: () => {
              this.snackBar.open('Product successfully buyed.', undefined, { duration: 2000 });
            }
          });
        }
      }
    });
  }

}
