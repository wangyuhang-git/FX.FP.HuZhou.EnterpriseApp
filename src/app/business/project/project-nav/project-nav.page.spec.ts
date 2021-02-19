import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProjectNavPage } from './project-nav.page';

describe('ProjectNavPage', () => {
  let component: ProjectNavPage;
  let fixture: ComponentFixture<ProjectNavPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNavPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectNavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
