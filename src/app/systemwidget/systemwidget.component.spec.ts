import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemwidgetComponent } from './systemwidget.component';

describe('SystemwidgetComponent', () => {
  let component: SystemwidgetComponent;
  let fixture: ComponentFixture<SystemwidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemwidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
