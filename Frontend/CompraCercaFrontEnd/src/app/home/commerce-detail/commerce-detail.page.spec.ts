import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerceDetailPage } from './commerce-detail.page';

describe('CommerceDetailPage', () => {
  let component: CommerceDetailPage;
  let fixture: ComponentFixture<CommerceDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommerceDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommerceDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
