import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  private loggedInStatus = false;
  
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  getCheckUser(username: string, password: string) {
    var authUrl = "http://172.20.2.162:7080/ldaprest/authentication?bindDN=uid=" + username + ",ou=People,o=domen1.rs,o=isp&password=" + password;
    return this._http.get(authUrl);
  }
}
