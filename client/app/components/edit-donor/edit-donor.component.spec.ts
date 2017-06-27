import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule }             from '@angular/forms';
import { MaterialModule }          from '@angular/material';

import { AppRoutingModule } from '../../app-routing.module';
import { AppModule } from '../../app.module';

import { EditDonorComponent } from './edit-donor.component';

describe('EditDonorComponent', () => {
  let component: EditDonorComponent;
  let fixture: ComponentFixture<EditDonorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        FormsModule,
        AppModule,
        AppRoutingModule,
        MaterialModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
