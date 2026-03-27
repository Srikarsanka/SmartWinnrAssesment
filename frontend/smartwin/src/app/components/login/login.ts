import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  myform: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.myform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  role: String = ""

  loginsubmit() {
    if (this.myform.valid) {

      const credentials = {
        email: this.myform.value.email,
        password: this.myform.value.password
      };

      this.http.post<any>('http://localhost:5000/api/auth/login', credentials, { 
        withCredentials: true 
      }).subscribe({
        next: (response: any) => {
          console.log("Login Successful!", response);
          this.role = response.payload.role;
          localStorage.setItem("role", response.payload.role);
          localStorage.setItem("token", response.token);

          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error("Login Error:", error);
          alert("Login failed. Check credentials.");
        }
      });
    }
  }
}
