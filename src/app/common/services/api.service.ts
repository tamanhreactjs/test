import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(endpoint: string, options: any = {}) {
    return this.http.get(endpoint, {
      ...options
    });
  }

  post(endpoint: string, data: any) {
    return this.http.post(endpoint, data);
  }

  put(endpoint: string, data: any) {
    return this.http.put(endpoint, data);
  }
}
