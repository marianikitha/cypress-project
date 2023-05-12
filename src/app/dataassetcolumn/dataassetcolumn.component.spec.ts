import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataassetcolumnComponent } from './dataassetcolumn.component';

describe('DataassetcolumnComponent', () => {
  let component: DataassetcolumnComponent;
  let fixture: ComponentFixture<DataassetcolumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataassetcolumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataassetcolumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
