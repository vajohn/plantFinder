import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { P505Component } from './p505.component';

describe('P505Component', () => {
  let component: P505Component;
  let fixture: ComponentFixture<P505Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ P505Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(P505Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
