import { HttpClient } from '@angular/common/http';
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

  getById(id: string) {
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${id}`));
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
}
