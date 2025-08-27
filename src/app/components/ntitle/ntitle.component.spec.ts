import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NtitleComponent } from './ntitle.component';

describe('NtitleComponent', () => {
  let component: NtitleComponent;
  let fixture: ComponentFixture<NtitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NtitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
