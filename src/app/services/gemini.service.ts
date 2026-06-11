import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private apiUrl =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=';

  private systemPrompt =
    'You are a my best friend. answer me by at most 10 words. be happy and tell nice things.';

  constructor(private httpClient: HttpClient) {}

  public askGemini(msg: string, img?: string): Observable<string> {
    const apiKey = this.getApiKey();

    if (!apiKey || apiKey.trim() === '') {
      return throwError(new Error('MISSING_API_KEY'));
    }

    const parts: Record<string, any>[] = [{ text: msg }];
    if (img)
      parts.push({
        inlineData: { mimeType: 'image/jpeg', data: img },
      });

    const payload = {
      contents: [{ parts }],
      systemInstruction: { parts: [{ text: this.systemPrompt }] },
      generationConfig: {
        temperature: 0.8,
      },
    };

    return this.httpClient.post(this.apiUrl + apiKey, payload).pipe(
      map((response: any) => response?.candidates[0]?.content?.parts[0]?.text),
      retry(2),
      catchError((error) => {
        console.error('Gemini API Error:', error);
        return throwError(
          () =>
            new Error(
              'אופס... משהו השתבש בתקשורת עם ה-AI. אנא נסו שוב מאוחר יותר.',
            ),
        );
      }),
    );
  }

  private getApiKey(): string {
    return localStorage.getItem('gemini_api_key') || '';
  }

  public saveApiKey(key: string): void {
    localStorage.setItem('gemini_api_key', key);
  }

  public clearApiKey(): void {
    localStorage.removeItem('gemini_api_key');
  }
}
