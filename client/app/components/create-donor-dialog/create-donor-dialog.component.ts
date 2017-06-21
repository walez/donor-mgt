import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { DonorService } from '../../services/donor.service';

@Component({
  selector: 'app-create-donor-dialog',
  templateUrl: './create-donor-dialog.component.html',
  styleUrls: ['./create-donor-dialog.component.css']
})
export class CreateDonorDialogComponent implements OnInit {
  public donor: any;
  public donorLink: any;
  public showSpinner = false;
  public showStep = 1;

  constructor(
    public donorService: DonorService,
    public dialogRef: MdDialogRef<CreateDonorDialogComponent>,
    @Optional() @Inject(MD_DIALOG_DATA) public data: any
  ) {
    this.donor = {
      location: {
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        address: data.location.address || ""
      }
    };
  }

  ngOnInit() {
  }

  save() {
    this.showSpinner = true;
    this.donorService.createDonor(this.donor)
      .subscribe( (donor) => {
        console.log("saved donor", donor);
        this.showSpinner = false;
        this.donorLink = `/donors/${donor.unique_slug}`;
        this.showStep = 2;
      },
      (err) => {
        console.log(err);
        alert("Issue saving donor pledge");
        this.showSpinner = false;
      })
  }

  cancel() {
    this.dialogRef.close();
  }

}
