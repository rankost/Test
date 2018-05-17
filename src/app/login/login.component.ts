import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = new FormControl();
  password = new FormControl();

  bindDN: string;

  constructor(private Auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  userLogin() {

    console.log(this.username.value, this.password.value);
    this.Auth.getCheckUser(this.username.value, this.password.value).subscribe(data => {
      var result = JSON.parse(JSON.stringify(data));
      if(result.resultStatus === 'SUCCESS')
      {
        
        this.router.navigate(['user-search']);
        this.Auth.setLoggedIn(true);
        this.bindDN = result.bindDN;
      
      }
      else if (result.resultStatus === 'FAILURE')
      {

      }
      else { }
    })
  }

}
