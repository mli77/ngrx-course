import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AuthState } from './auth/reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { login, logout } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(private router: Router, private store: Store<AuthState>) {

    }

    ngOnInit() {

      //this.store.subscribe(state => console.log("store value:", state));

      const userProfile = localStorage.getItem("user");

      if (userProfile) {
          this.store.dispatch(login({user: JSON.parse(userProfile)}));
      }

      this.isLoggedIn$ = this.store
      .pipe(
        //select(state => !!state["auth"].user)
        select(isLoggedIn)
      );
      this.isLoggedOut$ = this.store
      .pipe(
        //select(state => !state["auth"].user)
        select(isLoggedOut)
      );

      
      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

    }

    logout() {
      //const newLogoutAction = logout();
      console.log('in logout');
      this.store.dispatch(logout());
      this.router.navigateByUrl('/login');
    }

}
