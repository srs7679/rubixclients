import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmersAddComponent } from './farmers-add.component';

describe('FarmersAddComponent', () => {
  let component: FarmersAddComponent;
  let fixture: ComponentFixture<FarmersAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmersAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
