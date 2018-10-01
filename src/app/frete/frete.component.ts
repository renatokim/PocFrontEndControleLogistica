import { Component, OnInit } from '@angular/core';
import { Frete } from '../model/frete';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-frete',
  templateUrl: './frete.component.html'
})
export class FreteComponent implements OnInit {
  baseUrl: string;
  frete: Frete;
  fretes: Object;
  ufs: any[];
  frotas: any[];
  btn: string;
  textoBtn: string;
  exibirBtnCancelar: any;
  
  constructor(private http:  HttpClient) { }

  ngOnInit() {
    this.baseUrl = "https://projetoj.apphb.com/";
    //this.baseUrl = "http://localhost:50143";
    this.buscarFretes();
    this.frete = new Frete();

    this.ufs = [{"id":1, "descricao":"MG"}, {"id":2, "descricao":"RJ"}, {"id":3, "descricao":"SP"}, {"id":3, "descricao":"ES"}];
    this.frotas = [{"id":1, "descricao":"MOTO"}, {"id":2, "descricao":"CAMINHONETE"}, {"id":3, "descricao":"CAMINHÃO"}];
    
    this.btn = "btn-primary";
    this.textoBtn = "Salvar";
    this.exibirBtnCancelar = false;
  }
  
  buscarFretes = function() {
    this.http.get(this.baseUrl + "/api/v1/fretes_grid").subscribe(data => {
      this.fretes = data;
    });    
  }

  editar(frete) {
    this.http.get(this.baseUrl + "/api/v1/frete/" + frete.Id).subscribe(data => {
      Object.assign(this.frete, data);
    });

    this.btn = "btn-warning";
    this.textoBtn = "Editar";
    this.exibirBtnCancelar = "true";
  }
  
  salvar(frete) {
    if (this.btn == "btn-danger") {
      this.excluirFrete(frete.Id)
    } else {
      this.salvarFrete(frete)
    }
  }
  
  excluir(frete) {
    this.http.get(this.baseUrl + "/api/v1/frete/" + frete.Id).subscribe(data => {
      Object.assign(this.frete, data);
    });

    this.btn = "btn-danger";
    this.textoBtn = "Excluir";
    this.exibirBtnCancelar = "true";
  }  
  
  cancelar() {
    Object.assign(this.frete, { "Id" : 0, "Uf" : 0, "Frota" : 0, "Valor" : "" });
    this.btn = "btn-primary";
    this.textoBtn = "Salvar";
    this.exibirBtnCancelar = false;
  } 
  
  excluirFrete(id) {
    this.http.delete(this.baseUrl + "/api/v1/frete/" + id).subscribe(() => {
      Object.assign(this.frete, { "Id": 0, "Uf": 0, "Frota": 0, "Valor": "" });
      this.buscarFretes();

      this.btn = "btn-primary";
      this.textoBtn = "Salvar";
      this.exibirBtnCancelar = false;      
    });
  }

  salvarFrete(frete) {
    this.http.post(this.baseUrl + "/api/v1/frete/", frete).subscribe(() => {
      Object.assign(this.frete, { "Id": 0, "Uf": 0, "Frota": 0, "Valor": "" });
      this.buscarFretes();

      this.btn = "btn-primary";
      this.textoBtn = "Salvar";
      this.exibirBtnCancelar = false;      
    });    
  }
}
