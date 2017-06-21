import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EditDonorComponent } from './components/edit-donor/edit-donor.component';
import { DisplayMapComponent } from './components/display-map/display-map.component';

import { DonorResolver } from './services/donor-resolver.service';

const APP_ROUTES: Routes = [
  { path: '',
    children: [
      { path: '', component: DisplayMapComponent },
      { path: 'donors/:slug',
        component: EditDonorComponent,
        resolve: {
          donor: DonorResolver
        }
      }
    ]
  },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ],
  providers: [DonorResolver]
})
export class AppRoutingModule { }
