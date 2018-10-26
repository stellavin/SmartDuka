import { RegisterUserService } from './services/registeruser.service';
import { User } from './models/user';
import { LocationService } from './services/location.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ListResponse } from '../_bases/models/ListResponse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public username: string = '';
  public password: string = '';
  public locationRespones: ListResponse;
  public user: User = new User({});
  public errorMsg: Object;
  public success: Object;


  constructor(
    private dialog: MatDialog, 
    private router: Router, 
    private _locationService: LocationService, 
    private _registerService: RegisterUserService,
    private toastr: ToastrService,
    ) { }

  ngOnInit() {
    this.getLocations();
  }

  login() {
      this.router.navigate(['/']);
  }

  getLocations() {
    this._locationService.getList().subscribe((res) => {
        this.locationRespones = res;
        console.log('locations', this.locationRespones);
    });
}
show(){
  this.toastr.error('Please enter a valid email address.');
}


registerUser() {
  let tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  let valid = false;
  if (this.user.email.length > 254 || this.user.email.length < 5) {
    valid = false;
  } else {
    valid = tester.test(this.user.email);
  }

  if (!valid) {
    this.errorMsg = 'Please enter a valid email address.';
     console.log('Please enter a valid email address.');
  } else {
    this.user['location'] = 11;
    this._registerService.register(this.user)
      .subscribe((res) => {
          this.success = 'Thanks for Registering!';
          this.router.navigate(['/']);
        },
        (errorMsg) => {
          const text = '';
          for (const field in errorMsg) {
            if (errorMsg.hasOwnProperty(field)) {
              if (field === 'email') {
                if (errorMsg[field] === 'email already exists.') {
                  this.errorMsg = 'The provided email address has already been used to register';
                } else {
                  this.errorMsg = text + field + ': ' + errorMsg[field];
                }
              } else {
                this.errorMsg = text + field + ': ' + errorMsg[field];
              }
            }
          }
          if (errorMsg.hasOwnProperty('non_field_errors')) {
            this.errorMsg = text + errorMsg.non_field_errors;
          }
        });
  }  
}


}
