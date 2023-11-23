import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TextsService {

  
  httpClient = inject(HttpClient);
  baseUrl = "http://10.6.131.98/api/api/texts"

  getAll() {
    return firstValueFrom(this.httpClient.get<any[]>(this.baseUrl));
  }

    getById(id: string) {
    return firstValueFrom(this.httpClient.get<any>(`${this.baseUrl}/${id}`));
    }
}
