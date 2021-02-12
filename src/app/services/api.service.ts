import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://localhost:8080'

  constructor(private http: HttpClient) {}

  upload(image): Observable<any> {
    const uploadData = new FormData()
    uploadData.append('data', image)
    return this.http.post(this.url, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  getInfo() {
    return this.http.get(this.url)
  }
}
