import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  currentUser: any;
  currentPermission: any;
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.authService.currentUserSubject.subscribe(data => this.currentUser = data);
    var token = this.authService.getJwtToken();
    if (token != null) {
      return true;
    } else {
      this.router.navigate(['/welcome'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    // if (this.currentUser) {
    //   let permissions = PermissionCategoryList;
    //   let current_navigation = permissions.find(data => data.path == state.url);
    //   try {
    //     let navigator = this.currentPermission.find(data => data.category_id == current_navigation.id || 0);
    //     if (current_navigation.path == "/") {
    //       return true;
    //     }
    //     if (navigator.can_view) {
    //       // authorised so return true
    //       return true;
    //     }

    //   } catch {
    //     return true;
    //   }

    return true;


  }


}
