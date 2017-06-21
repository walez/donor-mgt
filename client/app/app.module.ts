import { BrowserModule }           from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule }                from '@angular/core';
import { FormsModule }             from '@angular/forms';
import { HttpModule }              from '@angular/http';
import { MaterialModule }          from '@angular/material';
import { EsriLoaderModule }        from 'angular-esri-loader';

import { AppRoutingModule } from './app-routing.module';

//Components import
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { UserTypeDialogComponent } from './components/user-type-dialog/user-type-dialog.component';
import { CreateDonorDialogComponent } from './components/create-donor-dialog/create-donor-dialog.component';
import { EditDonorDialogComponent } from './components/edit-donor-dialog/edit-donor-dialog.component';
import { EditDonorComponent } from './components/edit-donor/edit-donor.component';
import { DisplayMapComponent } from './components/display-map/display-map.component';

//Services import
import { DonorService } from './services/donor.service';
import { LocationService } from './services/location.service';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AppBarComponent,
    UserTypeDialogComponent,
    CreateDonorDialogComponent,
    EditDonorDialogComponent,
    EditDonorComponent,
    DisplayMapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    EsriLoaderModule,
    AppRoutingModule
  ],
  providers: [DonorService, LocationService, StorageService],
  entryComponents: [
    CreateDonorDialogComponent,
    EditDonorDialogComponent,
    UserTypeDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
