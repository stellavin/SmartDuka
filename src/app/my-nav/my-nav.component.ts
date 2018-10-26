import { CurrentUserService } from './service/currentuser.service';
import { RegisterUserService } from './../register/services/registeruser.service';
import { AuthService } from './../login/services/auth.service';
import { SessionService } from './../_services/SessionService';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'my-nav',
  templateUrl: './my-nav.component.html',
  styleUrls: ['./my-nav.component.css']
})
export class MyNavComponent {

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  currentUser: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute,
    public _sessionService: SessionService,
    public _userService: AuthService,
    public router: Router,
    private _currentUser: CurrentUserService
) {

}

getUser() {
  this._currentUser.get('current-user').subscribe((res) => {
      // this._sessionService.setUser(res);
      this.currentUser = res;
      console.log('user......', res);
  });
}

logout() {
  this._userService.logout().subscribe((res) => {
    this._sessionService.logout();
    // link to home
    this.router.navigate(['/']);
  }, (err) => {
    this._sessionService.logout();
    // link to home
    this.router.navigate(['/']);
  });

}




}
