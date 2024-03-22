import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {}

baseUrl= environment.baseUrl
    
post(url: any, data: any) {
    return this.http.post(`${this.baseUrl}/admin/${url}`, data)
}

get(url: any) {
    return this.http.get(`${this.baseUrl}/admin/${url}`)
}

delete(url: any, data: any) {
    return this.http.delete(`${this.baseUrl}/admin/${url}`, data)
}

patch(url: any, data: any) {
    return this.http.patch(`${this.baseUrl}/admin/${url}`, data)
}

deletCategroy(data: any) {
this.http.delete(this.baseUrl + "/admin/deleteCategory", data)
}
 
}