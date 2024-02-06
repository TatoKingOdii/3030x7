import { Injectable } from '@angular/core';
import {User} from "../../model/user";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser?: User;

  constructor(private router: Router) { }

  authenticate(user: User, path: string) {
    this.currentUser = user;
    this.router.navigate([path]);
  }

  deauthenticate() {
    this.currentUser = undefined;
  }

  isUserAuthenticated() : boolean {
    return this.currentUser !== undefined;
  }
}
