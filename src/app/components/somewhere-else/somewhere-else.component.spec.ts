import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomewhereElseComponent } from './somewhere-else.component';

describe('SomewhereElseComponent', () => {
  let component: SomewhereElseComponent;
  let fixture: ComponentFixture<SomewhereElseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SomewhereElseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SomewhereElseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
