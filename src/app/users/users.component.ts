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
  userForm = new FormGroup ({
    firstName: new FormControl(),
    lastName: new FormControl(),
  });


  user: createJsonMode = new createJsonMode();
  jsonRequest: any;
  onlyStatus: string;
  message: string;
  IsHidden= true;
  

  constructor(private _userService: UserServiceService) { }

  ngOnInit() {
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

    valuesObjClas.push({"value": "top"});
    valuesObjClas.push({"value": "person"});
    valuesObjClas.push({"value": "account"});
    valuesObjClas.push({"value": "inetuser"});
    valuesObjClas.push({"value": "inetOrgPerson"});
    attributes.push({"name": "Objectclass", "values": valuesObjClas});
    
    valuesUid.push({"value": this.userForm.value.firstName});
    attributes.push({"name": "uid", "values": valuesUid});

    valuesCN.push({"value": this.userForm.value.firstName});
    attributes.push({"name": "cn", "values": valuesCN});

    valuesSN.push({"value": this.userForm.value.lastName});
    attributes.push({"name": "sn", "values": valuesSN});

    valuesInetUser.push({"value": "active"});
    attributes.push({"name": "inetUserStatus", "values": valuesInetUser});

    valuesMail.push({"value": this.userForm.value.firstName + "." + this.userForm.value.lastName + "@example.com"});
    attributes.push({"name": "mail", "values": valuesMail});

    formResult = {"dn": "uid=" + this.userForm.value.firstName + ",ou=People,o=domen1.rs,o=isp", "attributes": attributes};

    this.jsonRequest = formResult;


    this._userService.addUser(this.jsonRequest)
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
