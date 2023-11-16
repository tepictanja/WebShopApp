import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerSupportModalComponent } from '../customer-support-modal/customer-support-modal.component';
import { NewProductComponent } from '../new-product/new-product.component';
import { TokenService } from 'src/app/auth/services/token.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit{

  isProductsPage: boolean = true;
  path: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      this.isProductsPage = urlSegments.length === 0;
      console.log(this.isProductsPage);
    });
  }

  isAuthenticated(): boolean {
    return this.tokenService.getAccessToken() !== null;
  }

  isSearchOpen: boolean = false;

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    console.log(this.isSearchOpen);
  }

  clearSearch() {
  }

  logout(){
    this.tokenService.logout();
    this.router.navigate(['/auth/login'])
  }

  customerSupport(): void {
    const modalRef = this.dialog.open(CustomerSupportModalComponent, {
      width: '30rem'
    });
  }

  newProduct(): void {
    const modalRef = this.dialog.open(NewProductComponent, {
      width: '600px'
    });

    modalRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.router.navigate(['/home']);
      }
    });
  }
}
