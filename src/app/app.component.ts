import { RegisterUserService } from './register/services/registeruser.service';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { SessionService } from './_services/SessionService';
import { Component, ApplicationRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public isAuthenticated: boolean = false;
  public currentUser: any;

  constructor(
    private _sessionService: SessionService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _applicationRef: ApplicationRef,
    private _userService: RegisterUserService
) {
  

}
  ngOnInit() {
    this.isAuthenticated = this._sessionService.isLoggedIn();
    if (this.isAuthenticated) {
        this.getUser();
        console.log('current user----ooo',  this.getUser());
        this._router.navigate(['head/', 'categorys']);
    }
  }
  getUser() {
      this._userService.getCurrentUser().subscribe((res) => {
          // this._sessionService.setUser(res);
          this.currentUser = res;
          console.log('current user', res);
      });
  }

}
