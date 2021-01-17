import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import * as usuarioActions from 'src/app/store/actions';
import { AppState } from '../../store/app.reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit, OnDestroy {
  public user: Usuario = null;
  public loading: boolean = true;
  public error: any;
  public userSubcription$: Subscription;
  public id: string;

  constructor(
    private activateRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(({ id }) => {
      if (id > 12) {
        this.id = id;
        console.log('aca');
        this.userSubcription$ = this.store
          .select('usuario')
          .subscribe(({ user, loading, error }) => {
            this.user = null;
            setTimeout(() => {
              this.loading = loading;
            }, 2000);
            this.loading = true;
            console.log(' this.loading', this.loading);
          });
      } else {
        this.getUserById(id);
        this.id = '';
        setTimeout(() => {
          this.userSubcription$ = this.store
            .select('usuario')
            .subscribe(({ user, loading, error }) => {
              if (user) {
                console.log({ user });
                this.user = user;
                this.loading = loading;
                this.error = error;
              }
              console.log({ loading });
            });
        }, 1500);
      }
    });
  }
  ngOnDestroy() {
    this.userSubcription$?.unsubscribe();
  }

  getUserById(id: string) {
    this.store.dispatch(usuarioActions.cargarUsuario({ id: id }));
  }
}
