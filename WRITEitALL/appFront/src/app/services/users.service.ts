import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpClient = inject(HttpClient);
  baseUrl = "http://10.6.131.98/api/api/users"

  getAll() {
    return firstValueFrom(this.httpClient.get<any[]>(this.baseUrl));
  }

  getById(id: string) {
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${id}`));
  }

  register(formValues: any) {
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/register`, formValues));
  }

  login(formValues: any) {
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/login`, formValues));
  }

  isLogged():boolean {
    return localStorage.getItem('user_token') ? true : false;
  }
}
