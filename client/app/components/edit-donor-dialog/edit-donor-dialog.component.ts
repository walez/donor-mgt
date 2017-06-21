import { Component, OnInit, Inject} from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

import { DonorService } from '../../services/donor.service';

@Component({
  selector: 'app-edit-donor-dialog',
  templateUrl: './edit-donor-dialog.component.html',
  styleUrls: ['./edit-donor-dialog.component.css']
})
export class EditDonorDialogComponent implements OnInit {
  public donor: any;
  public donorLink: any;
  public showSpinner = false;
  public showStep = 1;

  constructor(
    public donorService: DonorService,
    public dialogRef: MdDialogRef<EditDonorDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
  ) {
    this.donor = data.donor;
  }

  ngOnInit() {
  }

  update() {
    this.showSpinner = true;
    this.donorService.editDonor(this.donor._id, this.donor)
      .subscribe( (donor) => {
        console.log("updated donor", donor);
        this.showSpinner = false;
        this.donorLink = `/donors/${donor.unique_slug}`;
        this.showStep = 2;
      },
      (err) => {
        alert("Issue updating donor pledge");
        this.showSpinner = false;
      })
  }

  delete() {
    console.log("donor:", this.donor);
    this.showSpinner = true;
    this.donorService.deleteDonor(this.donor._id)
      .subscribe( (donor) => {
        console.log("deleted donor", donor);
        this.showSpinner = false;
        this.showStep = 3;
      },
      (err) => {
        alert("Issue updating donor pledge");
        this.showSpinner = false;
      })
  }

  cancel() {
    this.dialogRef.close();
  }
}
