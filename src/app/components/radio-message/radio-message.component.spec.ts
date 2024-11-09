import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioMessageComponent } from './radio-message.component';

describe('RadioMessageComponent', () => {
  let component: RadioMessageComponent;
  let fixture: ComponentFixture<RadioMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
