import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SoldProductRequest } from 'src/app/models/sold-product-request';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css']
})
export class BuyModalComponent {
  selectedPaymentMethod: string = 'card'; 
  creditCardNumber: string = '';
  address: string = '';
  @Input() productId?: number;

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<BuyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close(): void {
    this.dialogRef.close();
  }

  buy(): void {
    this.dialogRef.close({ confirm: 'confirm', address: this.address });
  }
}
