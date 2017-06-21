import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-user-type-dialog',
  templateUrl: './user-type-dialog.component.html',
  styleUrls: ['./user-type-dialog.component.css']
})
export class UserTypeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<UserTypeDialogComponent>
  ) { }

  ngOnInit() {
  }

  selectedType(type) {
    return this.dialogRef.close(type);
  }

}
