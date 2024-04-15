import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostdashboardComponent } from './postdashboard.component';

describe('PostdashboardComponent', () => {
  let component: PostdashboardComponent;
  let fixture: ComponentFixture<PostdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
