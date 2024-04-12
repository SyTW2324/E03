import { HttpClient } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextsService {

  
  httpClient = inject(HttpClient);
  baseUrl = "http://localhost:3000/api/texts"

  getAll() {
    return firstValueFrom(this.httpClient.get<any[]>(this.baseUrl));
  }

  async getById(id: string) {
    return await firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${id}`));
  }
  async getAllByUser(token: string | null) {

    return await firstValueFrom(this.httpClient.get<any[]>(`${this.baseUrl}/user/${token}`));
  
  }

  create(formValues: any) {
    return firstValueFrom(this.httpClient.post<any>(this.baseUrl, formValues));
  }

  update(id: string, formValues: any) {
    return firstValueFrom(this.httpClient.put<any>(`${this.baseUrl}/${id}`, formValues));
  }

  deleteById(id: string) {
    return firstValueFrom(this.httpClient.delete<any>(`${this.baseUrl}/${id}`));
  }

  getPublicTexts() {
    return firstValueFrom(this.httpClient.get<any[]>(`${this.baseUrl}/public`));
  }
  checkTextOwner(id_Text: string, user_token: string | null) {
    if (!user_token) {
      return false;
    } else {
      console.log("ID: " + id_Text);
      console.log("Token: " + user_token);
      const result = firstValueFrom(this.httpClient.post<any>(`${this.baseUrl}/${id_Text}`, { token: user_token}));
      console.log("Resultado: " + result);
      return result;
    }
  }

  async getTextsCount(id: string) {
    const response = await firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/count/${id}`));
    return response;
  }
}
