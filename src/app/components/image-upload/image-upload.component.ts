import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../services/api.service'

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  file: File | null = null

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getInfo().subscribe(console.log)
  }

  onFileChanged(event) {
    this.file = event.target.files[0]
    console.log(this.file)
  }

  upload() {
    this.apiService.upload(this.file).subscribe((file) => {
      console.log(file)
    })
  }
}
