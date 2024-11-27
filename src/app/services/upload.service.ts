import { Injectable } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  progress: Observable<number|undefined>|null = null;

  constructor(private storage: AngularFireStorage) { }

  public uploadFile = (file:File): Observable<string> => {
    const filePath = `uploads/${Date.now()}`
    const fileRef = this.storage.ref(filePath)
    const upload = this.storage.upload(filePath, file)

    this.progress = upload.percentageChanges()

    return new Observable((observer) => {
      upload.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(
              (url) => {
                observer.next(url)
                observer.complete()
              },
              (error) => observer.error(error)
            );
          })
        ).subscribe()
    });
  }
}
