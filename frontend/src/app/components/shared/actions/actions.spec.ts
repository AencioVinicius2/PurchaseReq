import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Actions } from './actions';

describe('Actions', () => {
  let component: Actions;
  let fixture: ComponentFixture<Actions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Actions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Actions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
