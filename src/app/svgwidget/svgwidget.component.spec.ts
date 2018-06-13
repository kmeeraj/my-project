import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgwidgetComponent } from './svgwidget.component';

describe('SvgwidgetComponent', () => {
  let component: SvgwidgetComponent;
  let fixture: ComponentFixture<SvgwidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgwidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
