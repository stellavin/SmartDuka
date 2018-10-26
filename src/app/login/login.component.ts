import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { AuthToken } from '../_services/AuthToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public password: string;
  public username: string;
  public errorMsg: string | void;


  constructor(
          private dialog: MatDialog,
          private router: Router,
          private _authService: AuthService,
          private _authToken: AuthToken,
          ) {
            return;
          }

  ngOnInit() {
  }

  login() {
    this.errorMsg = null;
    console.log('log in');
    this._authService.login({'username': this.username, 'password': this.password})
        .subscribe((res) => {
                console.log('im here', res);
                this.router.navigate(['head/', 'categorys']);
            },
            (errorMsg) => {
                if (errorMsg.hasOwnProperty('non_field_errors')) {
                    this.errorMsg = errorMsg.non_field_errors;
                    console.log('error', this.errorMsg);
                }
                console.log('error');
                this.password = '';
            }
        );
}


  register() {
    console.log('clicked');
    this.router.navigate(['/register']);
  }

}
