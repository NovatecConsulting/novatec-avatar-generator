import { Injectable } from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { DomSanitizer } from '@angular/platform-browser'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://localhost:8080'

  constructor(private http: HttpClient) {}

  upload(image): Observable<Blob> {
    const uploadData = new FormData()
    uploadData.append('data', image)
    let httpHeaders = new HttpHeaders().set('Accept', "image/*");

    return this.http.post<Blob>(this.url, uploadData, {
        headers: httpHeaders,
        reportProgress: true,
        responseType: 'blob' as 'json'
      })

  }

  getInfo() {
    return this.http.get(this.url)
  }
}
