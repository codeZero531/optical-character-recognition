import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient
  ) { }

  fileUpload(imageUrl: string, imageName: string, selectedOption: string): Observable<any> {
    return this.http.post('https://ocr-api.herokuapp.com/image', {
      name: imageName,
      image: imageUrl,
      language: selectedOption
    });
  }
}
