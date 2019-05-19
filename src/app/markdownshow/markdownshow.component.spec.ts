import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownshowComponent } from './markdownshow.component';

describe('MarkdownshowComponent', () => {
  let component: MarkdownshowComponent;
  let fixture: ComponentFixture<MarkdownshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkdownshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
