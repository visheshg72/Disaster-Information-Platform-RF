import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrl = 'http://20.244.144.173:8000/api';

  constructor(private http: HttpClient) {}

  getFeaturedNews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/featured-news`);
  }

  getBulletinNews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/alerts`);
  }

  getTrendingNews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/trending-news`);
  }

  getGlobalNews(): Observable<any> {
    return this.http.get(`${this.baseUrl}/global-news`);
  }

  getKnowledgeHub(): Observable<any> {
    return this.http.get(`${this.baseUrl}/knowledge-hub`);
  }
}
