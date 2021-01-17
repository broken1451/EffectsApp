import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions/usuarios.actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuariosEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}

  // creacion de efecto, esto retorna un observable
  public cargarUsuarios$ = createEffect(() => {
    return this.actions$.pipe(
      // ofType(action q me interesa escuchar)
      ofType(usuariosActions.cargarUsuarios),
      tap((data) => console.log('data effect tap', data)),
      mergeMap((usuarios) => {
        console.log({ usuarios });
        return this.usuarioService.getUsers().pipe(
          tap((data) => console.log('dataUsers effect INSIDE  tap', data)),
          map((users) => {
            // disparar una accion para q el efecto devuelva una accion de manera correcta
            return usuariosActions.cargarUsuariosSuccess({ usuarios: users });
          }),
          catchError((err) => {
            // disparar una accion erronea y transformarla en un observable
            return of(usuariosActions.cargarUsuariosError({ payload: err }));
          })
        );
      }),
      tap((data) => console.log('data after effect tap', data))
    );
  });
}
