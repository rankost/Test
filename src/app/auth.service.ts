import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserDetails() {
    // proslediti id, password i pozvati servis koji proverava te podatke i vraca neki odgovor?
  }
}
