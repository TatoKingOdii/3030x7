import { Component } from '@angular/core';
import {AuthService} from "../../libs/services/auth-service/auth.service";
import {Router} from "@angular/router";
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatIcon,
    MatMiniFabButton,
    MatToolbar
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username?: string;
  password?: string;

  constructor(private router: Router, private authService: AuthService) {}
  login() {
    this.router.navigate(["/dashboard"]);
  }

  getAuthService() : AuthService {
    return this.authService;
  }
}
