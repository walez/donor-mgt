import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule }             from '@angular/forms';
import { MaterialModule, MdDialogRef, MD_DIALOG_DATA }          from '@angular/material';

import { AppRoutingModule } from '../../app-routing.module';
import { AppModule } from '../../app.module';

import { EditDonorDialogComponent } from './edit-donor-dialog.component';

describe('EditDonorDialogComponent', () => {
  let component: EditDonorDialogComponent;
  let fixture: ComponentFixture<EditDonorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        FormsModule,
        AppModule,
        AppRoutingModule,
        MaterialModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: MdDialogRef}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDonorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
