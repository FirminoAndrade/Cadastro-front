import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IFormulario } from 'src/app/model/formulario.model';
import { IGenero } from 'src/app/model/genero.modelo';
import { FormularioService } from 'src/app/service/formulario.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent {
  formulario: IFormulario = {
    nome: '',
    endereco: '',
    bairro: '',
    cidade: '',
    telefone: '',
    dataNasc: '',
    genero: '',
    idade: '',
    data: '',
  };

  tipoGenero: IGenero[] = [
    { valor: 'Masculino' },
    { valor: 'Feminino' },
    { valor: 'Prefiro não dizer' },
    { valor: 'Outros' },
  ];

  data = new Date();
  dia = String(this.data.getDate()).padStart(2, '0');
  mes = String(this.data.getMonth() + 1).padStart(2, '0');
  ano = this.data.getFullYear();
  dataAtual = `${this.dia}/${this.mes}/${this.ano}`;
  dataConvertida: string = String(this.dataAtual);

  constructor(
    private service: FormularioService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formulario.data = this.dataConvertida;
  }

  public criarFormulario(): void {
      this.formulario.data = this.dataConvertida;
      this.service.criarFormularioService(this.formulario).subscribe();
      this.router.navigate(['/lista'])
  }
}
