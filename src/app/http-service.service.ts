import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/timeout";

@Injectable()
export class HttpServiceService {

    private saveIMGurl="http://localhost:8081/save_image";
    private loadIMGurl="http://localhost:8081/get_images";

  constructor(private http: HttpClient) { }

public saveIMG(data,date): Observable<{response: string}>
 {
     return this.http.post<{response: string}>(this.saveIMGurl, {data: data, date:Date.now()}).pipe();
 }

 public loadIMG():Observable<{message:{data, date},error}>
 {
     return this.http.get<{message:{data, date},error}>(this.loadIMGurl).pipe();
 }
}
