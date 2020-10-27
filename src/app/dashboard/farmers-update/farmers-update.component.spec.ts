import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmersUpdateComponent } from './farmers-update.component';

describe('FarmersUpdateComponent', () => {
  let component: FarmersUpdateComponent;
  let fixture: ComponentFixture<FarmersUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmersUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmersUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
