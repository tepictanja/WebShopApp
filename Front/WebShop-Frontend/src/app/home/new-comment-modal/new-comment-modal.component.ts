import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from 'src/app/auth/services/token.service';
import { CommentRequest } from 'src/app/models/commentRequest';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-comment-modal',
  templateUrl: './new-comment-modal.component.html',
  styleUrls: ['./new-comment-modal.component.css']
})
export class NewCommentModalComponent implements OnInit {
  commentForm: FormGroup;
  comment: string = '';
  @Input() productId?: number;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<NewCommentModalComponent>, private productService: ProductService, private tokenService: TokenService) {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  addProduct(){
    console.log(this.productId);
    if(this.productId){
      const request : CommentRequest = {
        content : this.commentForm.value.comment,
        productId : this.productId,
        userId : this.tokenService.getUser().id
      }
      this.productService.addComment(request).subscribe({
        next: (response: any) => {
        },
        error: (err: any) => {
          console.log(err);
          this.snackBar.open('An error occurred.', undefined, { duration: 2000 });
        },
        complete: () => {
          this.snackBar.open('Comment added successfully.', undefined, { duration: 2000 });
          this.dialogRef.close();
        }
      });

    }
  }

}
