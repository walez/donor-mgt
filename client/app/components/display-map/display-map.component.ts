import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import  * as _  from 'lodash';

import { UserTypeDialogComponent } from '../user-type-dialog/user-type-dialog.component';

import { LocationService } from '../../services/location.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-display-map',
  templateUrl: './display-map.component.html',
  styleUrls: ['./display-map.component.css']
})
export class DisplayMapComponent implements OnInit {
  title = 'Donor Pledge';
  postiion: any;
  center: any;
  userType: any;

  constructor(
    public dialog: MdDialog,
    private location: LocationService,
    private storage: StorageService
  ) {
    this.getLocation();
    this.checkUserTypeExist();
  }

  ngOnInit() {
  }

  checkUserTypeExist() {
    //check if user has selected type before
    const type = this.storage.getStorageItem("userType")
    if( _.isEmpty(type))
      this.showDialog();
    else
      this.setType(type);
  }

  getLocation() {
    this.location.getLocation().subscribe( (coords) => {
      this.center = coords;
    }, ( err ) => {
      console.log(err);
    })
  }

  setType(userType) {
    this.userType = userType;
    return;
  }

  showDialog() {
    let dialogRef = this.dialog.open(UserTypeDialogComponent, {
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(userType => {
      this.userType = userType;
      this.storage.setStorageItem("userType", userType)
    });
  }

}
