import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.css']
})
export class ActivateComponent implements OnInit{

  activateForm: FormGroup;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private registrationService: RegistrationService, private snackBar: MatSnackBar) {
    this.activateForm = formBuilder.group({
      username: [null, Validators.required],
      pin: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  activate(): void {
    this.registrationService.activate(this.activateForm.value.username, this.activateForm.value.pin).subscribe({
      next: (response: any) => {
        if (response != null) {
          this.snackBar.open('You have successfully activated your account', undefined, { duration: 2000 })
          this.router.navigate(['/auth/login']).then(() => {
          });
        }
      }
    });
  }

}
