import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../services/api.service'
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  file: File | null = null
  image: SafeUrl

  constructor(private apiService: ApiService, private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.apiService.getInfo().subscribe(console.log)
  }

  onFileChanged(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return

    this.file = input.files[0]
    this.upload()
  }

  upload() {
    this.apiService.upload(this.file).subscribe(res => {
      this.createImageFromBlob(res)
    })
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.image = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
