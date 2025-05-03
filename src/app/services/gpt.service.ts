import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GptService {
  private api_url = environment.api_url;

  constructor(private http: HttpClient) {}

  askGpt = (userId: string, msg: string): Observable<string> => {
    const encodedUserId = encodeURIComponent(userId);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${encodedUserId}`);

    return this.http
      .post<{ msg: string }>(this.api_url, { prompt: msg }, { headers })
      .pipe(
        map((res) => res.msg),
        catchError((err) => {
          console.error('GPT error:', err);
          return of('⚠️ מצטער, אירעה שגיאה בעיבוד הבקשה. נסה שוב מאוחר יותר.');
        })
      );
  };
}
