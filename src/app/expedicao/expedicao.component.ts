import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-expedicao',
  templateUrl: './expedicao.component.html',
  styleUrls: ['./expedicao.component.css']
})
export class ExpedicaoComponent implements OnInit {
  baseUrl: string;
  rotas: any;  
  rota: any;
  btn: string;
  textoBtn: string;  

  constructor(private http:  HttpClient) { }

  ngOnInit() {
    this.baseUrl = "https://projetoj.apphb.com/";
    //this.baseUrl = "http://localhost:50143";
    this.btn = "btn-primary";
    this.textoBtn = "Salvar";    
    this.rota = {};
    this.buscarRotas();
  }

  buscarRotas = function() {
    this.http.get(this.baseUrl + "/api/v1/rotas_grid").subscribe(data => {
      this.rotas = data;
      console.log(this.rotas);
    });    
  }  

  salvar() {
    if (this.textoBtn == "Salvar") {
      this.rota.TransporteId = 0;	      
      this.rota.Id = 0;
      this.rota.TransporteId = 0;
      this.salvarRota(this.rota);
    } else if (this.textoBtn == "Excluir") {
      this.excluirRota(this.rota.Id);
    } else if (this.textoBtn == "Editar") {
      this.editarRota(this.rota);
    }
     this.btn = "btn-primary";
    this.textoBtn = "Salvar";
  }

  editar(idRota) {
    this.textoBtn = "Editar";
    this.btn = "btn-warning";
    this.buscarRotaEditar(idRota);
  }
  
  excluir(idRota) {
    this.textoBtn = "Excluir";
    this.btn = "btn-danger";
    this.buscarRotaEditar(idRota);
  }
  
  salvarRota(rota) {
    this.http.post(this.baseUrl + "/api/v1/rota/", rota).subscribe(() => {
      this.rota = { Id: 0, TransporteId: 0 };
      this.buscarRotas();	      this.buscarRotas();
    });	    
  }  

  buscarRotaEditar(idRota) {
    this.http
      .get(this.baseUrl + "/api/v1/rota_editar/" + idRota)
      .subscribe(data => {
        Object.assign(this.rota, data);
      });
  }
  
   editarRota(idRota) {
    this.http.put(this.baseUrl + "/api/v1/rota/", idRota).subscribe(() => {
      this.rota = { Id: 0, TransporteId: 0 };
      this.buscarRotas();
    });
  }
  
   excluirRota(idRota) {
    this.http
      .delete(this.baseUrl + "/api/v1/rota/" + this.rota.Id)
      .subscribe(() => {
        this.rota = { Id: 0, TransporteId: 0 };
        this.buscarRotas();
      });
  }  

  cancelar() {
    this.btn = "btn-primary";
    this.textoBtn = "Salvar";
    this.rota = { Id: 0, TransporteId: 0 };
  }  
}
