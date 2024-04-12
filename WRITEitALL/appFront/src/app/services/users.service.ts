import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpClient = inject(HttpClient);
  baseUrl = "http://localhost:3000/api/users"
  user = signal<any>({
    id: "1234"
  });

  getAll() {
    return firstValueFrom(this.httpClient.get<any[]>(this.baseUrl));
  }

  getById(id: string) {
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${id}`));
  }

  register(formValues: any) {
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/register`, formValues));
  }

  async login(formValues: any) {
    const response = await firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/login`, formValues));
    this.user().id = response._id;
    return response;
  }
  async getIdbyToken(token: string) {
    const response = await firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/token/${token}`));
    return response;
  }


  isLogged():boolean {
    return localStorage.getItem('user_token') ? true : false;
  }
}
