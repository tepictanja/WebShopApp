import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from 'src/app/auth/services/token.service';
import { MessageRequest } from 'src/app/models/messageRequest';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-customer-support-modal',
  templateUrl: './customer-support-modal.component.html',
  styleUrls: ['./customer-support-modal.component.css']
})
export class CustomerSupportModalComponent implements OnInit {
  messageForm: FormGroup;
  title: string = '';
  message: string = '';

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<CustomerSupportModalComponent>, private tokenService: TokenService, private messageService: MessageService) {
    this.messageForm = this.formBuilder.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  sendMessage(){
    const request: MessageRequest = {
      title: this.messageForm.value.title,
      content: this.messageForm.value.message,
      userId: this.tokenService.getUser().id
    }
    this.messageService.addMessage(request).subscribe({
      next: (response: any) => {
        console.log("Message added.");
      },
      error: (err: any) => {
        console.log(err);
        this.snackBar.open('An error occurred.', undefined, { duration: 2000 });
      },
      complete: () => {
        this.snackBar.open('Message added successfully.', undefined, { duration: 2000 });
        this.dialogRef.close();
      }
    });
  }

}
