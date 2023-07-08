import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';
import { SignupCredentials } from '../../shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9]+$/),
        ],
        [this.uniqueUsername.validate]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.matchPassword.validate] }
  );

  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router
  ) {}

  getControl(inputName: string): FormControl {
    return this.authForm.get(inputName) as FormControl;
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    if (this.authForm.value) {
      const credentials: SignupCredentials = {
        username: this.authForm.value.username!,
        password: this.authForm.value.password!,
        passwordConfirmation: this.authForm.value.passwordConfirmation!,
      };

      this.authService.signup(credentials).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/inbox');
        },
        error: (err) => {
          if (!err.status) {
            this.authForm.setErrors({ noConnection: true });
          } else {
            this.authForm.setErrors({ unknownError: true });
          }
        },
      });
    }
  }
}
