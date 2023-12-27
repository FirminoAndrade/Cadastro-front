import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFormulario } from '../model/formulario.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment.prod';

const URL = environment.URLPROD

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  constructor(private http: HttpClient,private _snack: MatSnackBar) {}

  public listarFormulariosService(): Observable<any> {
    return this.http.get(URL + 'formulario/todos');
  }

  public criarFormularioService(formulario: IFormulario): Observable<IFormulario> {
    return this.http.post<IFormulario>(URL + 'formulario', formulario);
  }

  public buscarPorId(id: string): Observable<IFormulario> {
    return this.http.get<IFormulario>(URL + 'formulario/' + id);
  }

  public updateFormularioService(formulario: IFormulario) {
    return this.http.put(URL + 'formulario/' + formulario.id, formulario);
  }

  public deleteFormularioService(id: string): Observable<any> {
    return this.http.delete(URL + 'formulario/' + id);
  }

  public mensagem(msg: string): void {
    this._snack.open(msg, 'ok', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }
}
