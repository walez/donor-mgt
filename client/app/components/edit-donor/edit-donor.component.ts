import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EditDonorDialogComponent } from '../edit-donor-dialog/edit-donor-dialog.component';

@Component({
  selector: 'app-edit-donor',
  templateUrl: './edit-donor.component.html',
  styleUrls: ['./edit-donor.component.css']
})
export class EditDonorComponent implements OnInit {
  donor: any;
  showSpinner: Boolean = true;

  constructor(
    public dialog: MdDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.data.subscribe( (data) => {
      this.donor = data;
      this.showSpinner = false;
      this.showDialog();
    });
  }

  ngOnInit() {
  }

  showDialog() {
    let dialogRef = this.dialog.open(EditDonorDialogComponent, {
      disableClose: true,
      data: this.donor
    });
    dialogRef.afterClosed().subscribe(userType => {
      this.router.navigate(['/']);
    });
  }
}
