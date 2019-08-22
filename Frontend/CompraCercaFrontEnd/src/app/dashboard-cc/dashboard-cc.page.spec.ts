import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCCPage } from './dashboard-cc.page';

describe('DashboardCCPage', () => {
  let component: DashboardCCPage;
  let fixture: ComponentFixture<DashboardCCPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCCPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCCPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
