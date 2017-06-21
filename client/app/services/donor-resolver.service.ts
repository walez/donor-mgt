import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { DonorService } from './donor.service';

@Injectable()
export class DonorResolver implements Resolve<any> {
  constructor(private donorService: DonorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let slug = route.params['slug'];
    return this.donorService.getDonor(slug).map( donor => {
      if (donor) {
        return donor;
      } else {
        this.router.navigate(['/']);
        return null;
      }
    });
  }
}
