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
    id: ""
  });

  getAll() {
    return firstValueFrom(this.httpClient.get<any[]>(this.baseUrl));
  }

  async getById(id: string) {
    return await firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${id}`));
  }

  register(formValues: any) {
    return firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/register`, formValues));
  }

  update(id: string, formValues: any) {
    return firstValueFrom(this.httpClient.put<any>(`${this.baseUrl}/${id}`, formValues));
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
