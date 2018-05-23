import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import { createJsonMode, resultStatus } from '../shared/create-json-model';
import { NameValue, Value } from '../shared/name-value';
import { Jsonp } from '@angular/http';
import { User } from '../shared/interfaces';
import { FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  // userForm = new FormGroup ({
    firstName = new FormControl('', [ Validators.required ]);
    lastName = new FormControl('', [ Validators.required ]);
    password = new FormControl('', [ Validators.required ]);
  // });


  matcher = new MyErrorStateMatcher();


  user: createJsonMode = new createJsonMode();
  onlyStatus: string;
  message: string;
  IsHidden= true;
  

  constructor(private _userService: UserServiceService) { }

  ngOnInit() {
  }

  notEntered() {
    return this.firstName.hasError('required') || this.lastName.hasError('required');
  }

  onSubmit() {

    // this.user.dn = "uid=" + this.userForm.value.firstName + ",ou=People,o=domen1.rs,o=isp"
    // this.user.attributes.push(new NameValue("Objectclass", [new Value("top"), new Value("person"),  new Value("account"),  new Value("inetOrgPerson")]));
    // this.user.attributes.push(new NameValue("uid",[new Value(this.userForm.value.firstName)]));
    // this.user.attributes.push(new NameValue("cn",[new Value(this.userForm.value.firstName)]));
    // this.user.attributes.push(new NameValue("sn",[new Value(this.userForm.value.lastName)]));
    // this.user.attributes.push(new NameValue("mail",[new Value(this.userForm.value.firstName + "." + this.userForm.value.lastName + "@example.com")]));

    var formResult = {};
    var attributes = [];
    var valuesObjClas = [];
    var valuesUid = [];
    var valuesCN = [];
    var valuesSN = [];
    var valuesMail = [];
    var valuesInetUser = [];
    var valuesUserPassword = [];

    valuesObjClas.push({"value": "top"});
    valuesObjClas.push({"value": "person"});
    valuesObjClas.push({"value": "account"});
    valuesObjClas.push({"value": "inetuser"});
    valuesObjClas.push({"value": "inetOrgPerson"});
    valuesObjClas.push({"value": "ipuser"});
    attributes.push({"name": "Objectclass", "values": valuesObjClas});
    
    valuesUid.push({"value": this.firstName.value});
    attributes.push({"name": "uid", "values": valuesUid});

    valuesCN.push({"value": this.firstName.value});
    attributes.push({"name": "cn", "values": valuesCN});

    valuesSN.push({"value": this.lastName.value});
    attributes.push({"name": "sn", "values": valuesSN});

    valuesInetUser.push({"value": "active"});
    attributes.push({"name": "inetUserStatus", "values": valuesInetUser});

    valuesUserPassword.push({"value": this.password.value});
    attributes.push({"name": "userPassword", "values": valuesUserPassword});

    valuesMail.push({"value": this.firstName.value + "." + this.lastName.value + "@example.com"});
    attributes.push({"name": "mail", "values": valuesMail});

    formResult = {"dn": "uid=" + this.firstName.value + ",ou=People,o=domen1.rs,o=isp", "attributes": attributes};



    this._userService.addUser(formResult)
    .subscribe(
      (data: resultStatus) => { 
        this.onlyStatus = data.resultStatus
        this.message = data.resultStatus + ": " +data.message;
        this.IsHidden = false;
      },
      (error: Error) => {  console.log(error) }
    );
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
