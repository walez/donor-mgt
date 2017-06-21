import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDonorDialogComponent } from './edit-donor-dialog.component';

describe('EditDonorDialogComponent', () => {
  let component: EditDonorDialogComponent;
  let fixture: ComponentFixture<EditDonorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDonorDialogComponent ]
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
