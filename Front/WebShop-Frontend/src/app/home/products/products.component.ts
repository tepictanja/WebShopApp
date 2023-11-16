import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductAttribute } from 'src/app/models/product-attribute';
import { FilterProductsRequest } from 'src/app/models/fiter-products-request';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit{
  attributesForm: FormGroup;
  specificAttributesForm: FormGroup;
  categories: Category[] = [];
  pagedProducts: Product[] = [];
  currentPage = 1;
  pageSize = 8;
  selectedCategory: any;
  attributes: any[] = [];
  searchName: any;
  nextProducts: Product[] = [];

  treeControl = new NestedTreeControl<Category>(category => category.subcategories);
  dataSource = new MatTreeNestedDataSource<Category>();

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private productService: ProductService, private router: Router,
    private activatedRoute: ActivatedRoute) { 
    this.attributesForm = this.formBuilder.group({
      location: ['', Validators.required],
      priceFrom: ['', Validators.required],
      priceTo: ['', Validators.required]
    });
    this.specificAttributesForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.loadProducts();
    this.categoryService.getAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
        this.dataSource.data = this.categories;
      }
    });

    this.productService.productAdded$.subscribe((added) => {
      if (added) {
        this.loadProducts();
      }
    });
    
  }

  onModalClosed() {
    this.loadProducts();
  }

  hasChild = (_: number, node: Category) => !!node.subcategories && node.subcategories.length > 0;

  loadProducts() {
    const startIndex = this.currentPage - 1;
    this.productService.getProducts(startIndex, this.pageSize)
      .subscribe((response: any) => {
        if(response.content.length>0){
          this.pagedProducts = response.content;
          console.log(this.pagedProducts);
        }
      });
  }

  loadNextPage() {
    this.currentPage++;
    this.loadProducts();
  }

  loadPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  filterByCategory(category: Category){
    this.selectedCategory = category;
    this.attributes = category.attributes;
    this.loadSpecficAttributesForm();
    const startIndex = this.currentPage - 1;
    this.productService.getProductsByCtegory(category.name, startIndex, this.pageSize)
      .subscribe((response: any) => {
        this.pagedProducts = response.content;
        console.log(this.pagedProducts);
      });
  }

  loadSpecficAttributesForm() {
    this.specificAttributesForm = this.formBuilder.group({});
    this.attributes.forEach((attribute) => {
      this.specificAttributesForm.addControl(
        attribute.name,
        this.formBuilder.control('', Validators.required)
      );
    });
  }

  getProductAttributes(){
    const productAttributes: ProductAttribute[] = this.attributes.map(attribute => {
      const value = this.specificAttributesForm.get(attribute.name)?.value || '';
      return new ProductAttribute(value, attribute);
    });
    return productAttributes;
  }

  applyFilters(){
    const request: FilterProductsRequest = {
      category: this.selectedCategory.name,
      location: this.attributesForm.value.location,
      productAttributes: this.getProductAttributes(),
      priceFrom: this.attributesForm.value.priceFrom,
      priceTo: this.attributesForm.value.priceTo,
    }

    console.log(request);

    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.productService.filterByAttributes(request, startIndex, this.pageSize)
      .subscribe((response: any) => {
        this.pagedProducts = response.content;
        console.log(this.pagedProducts);
      });
  }

  resetFilters(){
    this.loadProducts(); 
    this.attributesForm.reset();
    this.specificAttributesForm.reset();
  }

  searchProductByName(){
    const startIndex = this.currentPage - 1;
    this.productService.searchByName(this.searchName, startIndex, this.pageSize)
      .subscribe((response: any) => {
        this.pagedProducts = response.content;
        console.log(this.pagedProducts);
      });
  }

}
