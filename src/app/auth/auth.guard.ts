import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthState } from "./reducers";
import { tap } from "rxjs/operators";
import { isLoggedIn } from "./auth.selectors";
import { AppState } from "../reducers";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppState>,
        private router: Router) {
            console.log('ctor of guard');
    }
    
    // CanActivate for routes navigation
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log('in CanActivate');
        return this.store
            .pipe(
                select(isLoggedIn),  // selector
                tap(loggedIn => {
                    console.log('in CanActivate tap');
                    if (!loggedIn) {
                        console.log('routing to login');
                        //this.router.navigateByUrl('/login');
                    }
                })
            )
    }

    // CanLoad for lazy-loaded modules
//   canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
//     return this.store
//       .select(isLoggedIn)
//       .pipe(
//         tap(loggedIn => {
//           if (!loggedIn) {
//             this.router.navigateByUrl('/login');
//           }
//         })
//       );
//   }

}