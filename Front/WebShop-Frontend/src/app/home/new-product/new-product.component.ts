import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Attribute } from 'src/app/models/attribute';
import { ProductRequest } from 'src/app/models/product-request';
import { TokenService } from 'src/app/auth/services/token.service';
import { ProductAttribute } from 'src/app/models/product-attribute';
import { Image} from 'src/app/models/image';
import { Product } from 'src/app/models/product';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ImageService } from 'src/app/services/image.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class NewProductComponent implements OnInit{
  basicInfoForm: FormGroup;
  attributesForm: FormGroup; 
  selectedFiles: File[] = [];
  filteredCategories: any[] = [];
  categories: Category[] = [];
  selectedCategory: any; 
  attributes: any[] = []; 
  selectedImagesNames: string[] = [];


  constructor(private formBuilder: FormBuilder, private productService: ProductService, private categoryService: CategoryService, private tokenService: TokenService, private snackBar: MatSnackBar, private router: Router,
    public dialogRef: MatDialogRef<NewProductComponent>, private fireStorage: AngularFireStorage, private imageService: ImageService){
    this.basicInfoForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      location: ['', Validators.required],
      isNew: [false, Validators.required],
      category: ['', Validators.required]
    });
    this.attributesForm = this.formBuilder.group({});
  }

  ngOnInit(){
    this.categoryService.getAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
        this.filteredCategories = this.filterCategories(this.categories)
      }
    });
  }

  filterCategories(categories: any[]): any[] {
    const result: any[] = [];

    const getLeafCategories = (category: any) => {
      if (!category.subcategories || category.subcategories.length === 0) {
        result.push(category);
      } else {
        const hasLeafSubcategories = category.subcategories.some(
          (subcategory: any) => {
            return (
              !subcategory.subcategories || subcategory.subcategories.length === 0
            );
          }
        );

        if (hasLeafSubcategories) {
          result.push(category);
        }

        category.subcategories.forEach((subcategory: any) => {
          getLeafCategories(subcategory);
        });
      }
    };

    categories.forEach((category) => {
      getLeafCategories(category);
    });

    return result;
  }

  onCategorySelected() {
    console.log(this.filteredCategories);
    if (this.selectedCategory !== undefined && this.selectedCategory >= 0 && this.selectedCategory <= this.filteredCategories.length) {
      const selectedCategory = this.filteredCategories.find(category => category.id === this.selectedCategory);
      console.log(selectedCategory);

      if (selectedCategory && selectedCategory.attributes) {
        this.attributes = selectedCategory.attributes;
        this.loadAttributesForm();
      }
    }
  }

  loadAttributesForm() {
    this.attributesForm = this.formBuilder.group({});
    this.attributes.forEach((attribute) => {
      this.attributesForm.addControl(
        attribute.name,
        this.formBuilder.control('', Validators.required)
      );
    });
  }

  onFileSelected(event: any){
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

  newProduct(){
    const images: Image[] = this.selectedImagesNames.map(image => new Image(image));
    const attributes: ProductAttribute[] = this.attributes.map(attribute => {
      const value = this.attributesForm.get(attribute.name)?.value || '';
      return new ProductAttribute(value, attribute);
    });
    

    const product : ProductRequest = {
      name: this.basicInfoForm.value.name,
      description : this.basicInfoForm.value.description,
      price : this.basicInfoForm.value.price,
      isNew : this.basicInfoForm.value.isNew,
      location : this.basicInfoForm.value.location,
      quantity : this.basicInfoForm.value.quantity,
      sallerId : this.tokenService.getUser().id,
      images: images,
      attributes: attributes,
      categoryId: this.selectedCategory,
    }

    this.productService.addProduct(product).subscribe({
      next: () => {
        this.productService.announceProductAdded();
        this.router.navigate(['/home']).then(() => {
        });
      },
      error: (err: any) => {
        console.log(err);
        this.snackBar.open('An error occurred.', undefined, { duration: 2000 });
      },
      complete: () => {
        this.snackBar.open('Product added successfully.', undefined, { duration: 2000 });
        this.dialogRef.close('success');
        this.productService.announceProductAdded();
      }
    });
  }
}
