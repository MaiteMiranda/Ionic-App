import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profile-cam',
  templateUrl: './profile-cam.page.html',
  styleUrls: ['./profile-cam.page.scss'],
})
export class ProfileCamPage implements OnInit {
  imageSource: any;
  constructor() { }

  ngOnInit() {
  }
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });

    this.imageSource = image.dataUrl;
  };

}
