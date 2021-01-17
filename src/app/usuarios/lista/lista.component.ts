import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import  * as usuarioActions from '../../store/actions/usuarios.actions';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public loading: boolean = true;
  public error: any;

  constructor(private usuarioService: UsuarioService, private store:Store<AppState>) { }

  ngOnInit(): void {
    this.getUsers();
    // this.store.dispatch(cargarUsuarios());
  }

  getUsers(){
    // this.usuarioService.getUsers().subscribe((data)=>{
    //   console.log({data})
    //   this.usuarios = data
    // })
    this.store.dispatch(usuarioActions.cargarUsuarios());
    setTimeout(() => {
    this.store.select('usuarios').subscribe(({users, loading, error}) =>{
      this.usuarios = users;
        this.loading = loading;
        this.error = error;
      });
    }, 1500);
  }

}
