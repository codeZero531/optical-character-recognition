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

  fileUpload(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    // this.load = true;
    return this.http.post<any>('http://localhost:3000/file', formData );
  }
}
