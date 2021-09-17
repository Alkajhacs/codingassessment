import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestcaseComponent } from './create-testcase.component';

describe('CreateTestcaseComponent', () => {
  let component: CreateTestcaseComponent;
  let fixture: ComponentFixture<CreateTestcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTestcaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTestcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
