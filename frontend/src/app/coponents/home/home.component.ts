import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, retry} from 'rxjs/operators';
import {FileService} from '../../services/file.service';
import {languages} from '../../models/Languages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images;
  multipleImages = [];
  text: string;

  load: boolean;
  selectedImage: any;
  imgSrc: any;

  languages = languages;

  constructor(
    private http: HttpClient,
    private fileService: FileService
  ) { }

  ngOnInit() {
  }

  featuredPhotoSelected(event: any) {
    const file  = event.target.files[0];
    this.images = file;
    // this.fileService.test(file);
  }

  selectMultipleImage(event: any) {
    this.multipleImages  = event.target.files;

  }

  onSubmit() {
    this.text = '';
    this.load = true;

    this.fileService.fileUpload(this.images)
      .pipe(
        retry(5),

      )
      .subscribe(
        (res) => {

          console.log(typeof res);
          console.log(res.text);
          this.text = res.text;
        },
        (err) => console.log(err),
        () => {
          console.log('completed!');
          this.load = false;
        },

      );

  }

  onMultipleSubmit() {
    const formData = new FormData();
    for (const img of this.multipleImages) {
      formData.append('files', img);
    }
    this.http.post<any>('http://localhost:5000/multipleFiles', formData)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );

  }


  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const  reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      console.log(reader);
    } else {
      this.selectedImage = null;
      this.imgSrc = '/assets/img/image.jpeg';
    }
  }

}
