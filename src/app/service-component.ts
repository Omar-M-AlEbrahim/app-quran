// quran-api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { qurandata } from './quran-data';

@Injectable({
  providedIn: 'root'
})
export class QuranApiService {

  constructor(private http: HttpClient) { }

  Interpretation_of_the_Koran(chapter: number, verse: number): Observable<qurandata> 
  {
    return this.http.get<qurandata>(`https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/ar-tafsir-muyassar/${chapter}/${verse}.json`);
  }
  arabic_quran(chapter: number, verse: number): Observable<qurandata> 
  {
    return this.http.get<qurandata>(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/ara-quranindopak/${chapter}/${verse}.json`);
  }
  English_Quran(chapter: number, verse: number): Observable<qurandata> 
  {
    return this.http.get<qurandata>(`https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/eng-abdelhaleem/${chapter}/${verse}.json`);
  }
}
