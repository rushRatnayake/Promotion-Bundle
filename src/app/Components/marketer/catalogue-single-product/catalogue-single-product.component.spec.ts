import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueSingleProductComponent } from './catalogue-single-product.component';

describe('CatalogueSingleProductComponent', () => {
  let component: CatalogueSingleProductComponent;
  let fixture: ComponentFixture<CatalogueSingleProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogueSingleProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueSingleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
