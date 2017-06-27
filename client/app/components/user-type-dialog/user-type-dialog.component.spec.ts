import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule }             from '@angular/forms';
import { MaterialModule }          from '@angular/material';

import { AppRoutingModule } from '../../app-routing.module';
import { AppModule } from '../../app.module';

import { UserTypeDialogComponent } from './user-type-dialog.component';

describe('UserTypeDialogComponent', () => {
  let component: UserTypeDialogComponent;
  let fixture: ComponentFixture<UserTypeDialogComponent>;

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
    fixture = TestBed.createComponent(UserTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
