import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveruserComponent } from './recoveruser.component';

describe('RecoveruserComponent', () => {
  let component: RecoveruserComponent;
  let fixture: ComponentFixture<RecoveruserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoveruserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
