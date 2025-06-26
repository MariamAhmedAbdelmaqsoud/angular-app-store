import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', Validators.required),
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\S+$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{8}$/),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: Register.passwordsMatch }
  );
  static passwordsMatch(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  submitted = false;
  handleRegister() {
    this.submitted = true;
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
    }
  }
}

