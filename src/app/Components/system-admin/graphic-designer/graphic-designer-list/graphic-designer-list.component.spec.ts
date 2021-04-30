import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicDesignerListComponent } from './graphic-designer-list.component';

describe('GraphicDesignerListComponent', () => {
  let component: GraphicDesignerListComponent;
  let fixture: ComponentFixture<GraphicDesignerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicDesignerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
