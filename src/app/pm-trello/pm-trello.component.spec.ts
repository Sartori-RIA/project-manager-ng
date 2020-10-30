import { DragDropModule } from '@angular/cdk/drag-drop';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PmTrelloComponent } from './pm-trello.component';

describe('PmTrelloComponent', () => {
  let component: PmTrelloComponent;
  let fixture: ComponentFixture<PmTrelloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmTrelloComponent ],
      imports: [
        NoopAnimationsModule,
        DragDropModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmTrelloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
