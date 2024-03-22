import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlipkartCatComponent } from './flipkart-cat.component';

describe('FlipkartCatComponent', () => {
  let component: FlipkartCatComponent;
  let fixture: ComponentFixture<FlipkartCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlipkartCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlipkartCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
