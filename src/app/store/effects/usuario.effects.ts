import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuarioActions from '../actions/usuario.actions';
import { tap, mergeMap, map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from 'rxjs';

@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) {}

  // creacion de efecto, esto retorna un observable
  public cargarUsuario$ = createEffect(() => {
    return this.actions$.pipe(
      // ofType(action q me interesa escuchar)
      ofType(usuarioActions.cargarUsuario),
      tap((data) => console.log('data effect tap', data)),
      mergeMap((usuario) => {
        console.log({ usuario });
        return this.usuarioService.getUserById(usuario.id).pipe(
          tap((data) => console.log('dataUsers effect INSIDE  tap', data)),
          map((user) => {
            // disparar una accion para q el efecto devuelva una accion de manera correcta
            return usuarioActions.cargarUsuarioSuccess({ usuario: user });
          }),
          catchError((err) => {
            // disparar una accion erronea y transformarla en un observable
            return of(usuarioActions.cargarUsuarioError({ payload: err }));
          })
        );
      }),
      tap((data) => console.log('data after effect tap', data))
    );
  });
}
