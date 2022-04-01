import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomSelectComponent } from './classroom-select.page';

describe('ClassroomSelectComponent', () => {
  let component: ClassroomSelectComponent;
  let fixture: ComponentFixture<ClassroomSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassroomSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
