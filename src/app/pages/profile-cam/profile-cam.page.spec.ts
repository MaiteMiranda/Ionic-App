import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileCamPage } from './profile-cam.page';

describe('ProfileCamPage', () => {
  let component: ProfileCamPage;
  let fixture: ComponentFixture<ProfileCamPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfileCamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
