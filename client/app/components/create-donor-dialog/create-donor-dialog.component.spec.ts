import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDonorDialogComponent } from './create-donor-dialog.component';

describe('CreateDonorDialogComponent', () => {
  let component: CreateDonorDialogComponent;
  let fixture: ComponentFixture<CreateDonorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDonorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDonorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
