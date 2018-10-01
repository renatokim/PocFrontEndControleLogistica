import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Rota } from '../model/rota';
import { Transporte } from '../model/transporte';

@Component({
  selector: 'app-coleta',
  templateUrl: './coleta.component.html'
})
export class ColetaComponent implements OnInit {
	baseUrl: string;	
	cliente: Cliente;
	clienteDestinatario: Cliente;
	clientes: any;
	dataColeta: any;
	dataEntrega: any;
	veiculoColeta: number;
	transportes: any;
	clientesDestinatario: any;
	transporteEnviar: any;

	btnSalvar: string;
	btn: string;
	exibirBtnCancelar: any;
	textoBtn: string;
	rotas: any;
	coleta: Transporte;
  
  constructor(private http:  HttpClient) { 

  }

  ngOnInit() {
	this.baseUrl = "https://projetoj.apphb.com/";
	//this.baseUrl = "http://localhost:50143";

	this.buscarColetas();

    this.http.get(this.baseUrl + "/api/v1/transporte_clientes").subscribe(data => {
		this.clientes = data;
    });		
	
    this.http.get(this.baseUrl + "/api/v1/rotas_response").subscribe(data => {
		console.log(data);
		this.rotas = data;
    });		

	this.cliente = new Cliente();
	this.coleta = new Transporte();	
	this.clienteDestinatario = new Cliente();
	this.transporteEnviar = {};
	
	this.dataColeta = this.returnToDate();
	this.dataEntrega  = this.returnToDateMoreOne();
	
	this.btn = "btn-primary";
	this.btnSalvar = "disabled";
	this.exibirBtnCancelar = false;
	
	this.textoBtn = "Salvar";
	
	this.veiculoColeta = 0;
  }
  
  	selecionarDestinatario(idCliente) { 
		console.log(idCliente);
		let i;
		for (i = 0; i < this.clientes.length; i++) {
			if (idCliente == this.clientes[i].Id) {
				Object.assign(this.clienteDestinatario, this.clientes[i]);
			}
		}
		
		if (idCliente == 0) {
			Object.assign(this.clienteDestinatario, { "Id": 0, "Logradouro": "", "Numero": "", "Bairro": "", "Cep": "", "Uf": 0, "Cidade": "" });
		}
	}
  
  	selecionarRemente(idCliente) {
	  let i;
	  for (i = 0; i < this.clientes.length; i++) {
			if (idCliente == this.clientes[i].Id) {
				Object.assign(this.cliente, this.clientes[i]);
			}
		}
	  
	  if (idCliente == 0) {
		Object.assign(this.cliente, { "Id": 0, "Logradouro": "", "Numero": "", "Bairro": "", "Cep": "", "Uf": 0, "Cidade": "" });
	  }
  	}  
  
  	excluir(id) {
	  this.btn = "btn-danger";
	  this.btnSalvar = "";
	  this.exibirBtnCancelar = true;
	  this.textoBtn = "Excluir";
	}

  	salvar() {
		this.transporteEnviar.Id = this.coleta.Id;
		this.transporteEnviar.ClienteColeta = this.cliente.Id;
		this.transporteEnviar.ClienteEntrega = this.clienteDestinatario.Id;
		this.transporteEnviar.DataCadastro = this.dataColeta;
		this.transporteEnviar.DataPrevisaoEntrega = this.dataEntrega;
		this.transporteEnviar.RotaId = this.coleta.IdRota;

		this.http.post(this.baseUrl + "/api/v1/transporte/", this.transporteEnviar).subscribe(() => {
			this.buscarColetas();
		});  	
	}  
  
  	cancelar() {
		this.btn = "btn-primary";	
		this.btnSalvar = "disabled";
		this.exibirBtnCancelar = false;
		this.textoBtn = "Salvar";
  	}
  
  	editar(id) {
		this.btn = "btn-warning";
		this.btnSalvar = "";
		this.exibirBtnCancelar = true;
		this.textoBtn = "Editar";
  	}  
  
  	buscarColetas() {
		this.http.get(this.baseUrl + "/api/v1/transportes_grid").subscribe(data => {
			this.transportes = data;
		});
  	} 

	btnSalvarDisabled() {
		//return this.clienteDestinatario.Id == 0 || this.cliente.Id == 0 || this.veiculoColeta == 0 ? "disabled" : "";	  
		return false;	  
	}

	returnToDate() {
		let dia = "";
		let mes = "";

		let today = new Date(); 
		let dd = today.getDate();
		let mm = today.getMonth() + 1; //January is 0!
		let yyyy = today.getFullYear();

		if(dd < 10) {
			dia = '0' + dd
		} 

		if(mm < 10) {
			mes = '0' + mm
		} 

		let todayDate = yyyy + '-' + mes + '-' + dia;
		return todayDate;
	}

	returnToDateMoreOne() {
		let dia = "";
		let mes = "";

		let today = new Date(); 
		let dd = today.getDate() + 1;
		let mm = today.getMonth() + 1; //January is 0!
		let yyyy = today.getFullYear();

		if(dd < 10) {
			dia = '0' + dd
		} 

		if(mm < 10) {
			mes = '0' + mm
		} 

		let todayDate = yyyy + '-' + mes + '-' + dia;
		return todayDate;
	}
}
