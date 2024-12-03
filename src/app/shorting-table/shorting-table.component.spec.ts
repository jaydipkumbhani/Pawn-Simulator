import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortingTableComponent } from './shorting-table.component';

describe('ShortingTableComponent', () => {
  let component: ShortingTableComponent;
  let fixture: ComponentFixture<ShortingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShortingTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
