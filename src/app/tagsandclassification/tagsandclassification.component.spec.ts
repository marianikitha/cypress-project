import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsandclassificationComponent } from './tagsandclassification.component';

describe('TagsandclassificationComponent', () => {
  let component: TagsandclassificationComponent;
  let fixture: ComponentFixture<TagsandclassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsandclassificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsandclassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
