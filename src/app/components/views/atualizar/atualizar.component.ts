import { FormularioService } from 'src/app/service/formulario.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IFormulario } from 'src/app/model/formulario.model';
import { IGenero } from 'src/app/model/genero.modelo';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.css']
})
export class AtualizarComponent implements OnInit {

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

  constructor(
    private service: FormularioService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.formulario.id = this.route.snapshot.paramMap.get("id")!;
    this.buscarPorId();
  }

  public buscarPorId(): void {
    this.service.buscarPorId(this.formulario.id!).subscribe((resposta) => {
      this.formulario.nome = resposta.nome;
      this.formulario.endereco = resposta.endereco;
      this.formulario.bairro = resposta.bairro;
      this.formulario.cidade = resposta.cidade;
      this.formulario.telefone = resposta.telefone;
      this.formulario.dataNasc = resposta.dataNasc;
      this.formulario.genero = resposta.genero;
      this.formulario.idade = resposta.idade;
      this.formulario.data = resposta.data;
    });
  }

  public atualizarFormulario(): void {
     this.service.updateFormularioService(this.formulario).subscribe((resposta) => {
      this.router.navigate(["/lista"]);
      this.service.mensagem("Formulário atualizado com sucesso!")
     }, err => {
      this.service.mensagem("Validar se todos os campos estão preenchidos corretamente!")
     })
  }

  public navegarParaLista(){
    this.router.navigate(["/lista"]);
  }
}
