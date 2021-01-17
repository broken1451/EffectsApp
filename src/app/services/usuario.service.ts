import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';

const URL = 'https://reqres.in/api';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<any> {
    return this.httpClient.get<Usuario>(`${URL}/users?per_page=6&delay=3`).pipe(
      map((resp: Usuario) => {
        return resp['data'];
      })
    );
  }

  getUserById(id: string): Observable<any> {
    return this.httpClient.get<Usuario>(`${URL}/users/${id}`).pipe(
      map((resp: Usuario) => {
        return resp['data'];
      })
    );
  }
}
