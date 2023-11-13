import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { IFormulario } from 'src/app/model/formulario.model';
import { FormularioService } from 'src/app/service/formulario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'nome',
    'telefone',
    'dataNasc',
    'data',
    'acoes'
  ];

  dataSource!: MatTableDataSource<IFormulario>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: FormularioService, private router: Router) {
    this.service.listarFormulariosService().subscribe((resposta) => {
      this.dataSource = new MatTableDataSource(resposta);
      this.dataSource.paginator = this.paginator;
    });
  }
  public ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  apagar (id: any) {
   this.service.deleteFormularioService(id).subscribe();
   location.reload();
  }
}
