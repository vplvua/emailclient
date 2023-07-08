import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9]+$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  getControl(inputName: string): FormControl {
    return this.authForm.get(inputName) as FormControl;
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    const credentials = {
      username: this.authForm.value.username || '',
      password: this.authForm.value.password || '',
    };

    this.authService.signin(credentials).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox');
      },
      error: (err) => {
        if (!err.status) {
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
        if (err.error.username || err.error.password) {
          this.authForm.setErrors({ credentials: true });
        }
      },
    });
  }
}
