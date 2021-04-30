import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicDesignerViewComponent } from './graphic-designer-view.component';

describe('GraphicDesignerViewComponent', () => {
  let component: GraphicDesignerViewComponent;
  let fixture: ComponentFixture<GraphicDesignerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicDesignerViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicDesignerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
