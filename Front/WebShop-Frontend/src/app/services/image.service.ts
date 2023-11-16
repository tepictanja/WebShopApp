import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, defer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = 'http://localhost:9000';
  private basePath = '/webshop';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  uploadFile(file: File): Observable<string> {
    const filePath = `${this.basePath}/${file.name}`;
    return defer(async () => {
      const filePath = `${this.basePath}/${file.name}`;
      const uploadTask = await this.storage.upload(filePath, file).task;

      const downloadURL = await uploadTask.ref.getDownloadURL();
      return downloadURL;
    });
  }
}
