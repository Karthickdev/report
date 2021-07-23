import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  url = "./assets/data.json";

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get(this.url);
  }
}
