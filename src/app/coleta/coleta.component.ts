import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-coleta',
  templateUrl: './coleta.component.html'
})
export class ColetaComponent implements OnInit {
	cliente: Cliente;
	clienteDestinatario: Cliente;
	clientes: any[];
	dataColeta: any;
	dataEntrega: any;
	veiculoColeta: number;
	
	btnSalvar: string;
	btn: string;
	exibirBtnCancelar: any;
	textoBtn: string;
  
  constructor(private http:  HttpClient) { 
  


  }


  
  ngOnInit() {

    this.http.get("http://localhost:50143/api/v1/fretes_grid").subscribe(data => {
	    console.log(data);
    });


    this.cliente = new Cliente();
	this.clienteDestinatario = new Cliente();

	this.clientes = [
		{ "id": 1, "logradouro": "rua frei otto", "numero": "55", "bairro": "sta Monica", "cep": "34567098", "uf": 1, "cidade": "bh" },
		{ "id": 2, "logradouro": "rua frei otto 2", "numero": "66", "bairro": "sta a", "cep": "678", "uf": 2, "cidade": "sp" },
		{ "id": 3, "logradouro": "rua frei otto 3", "numero": "77", "bairro": "sta b", "cep": "567", "uf": 3, "cidade": "nh" },
		{ "id": 4, "logradouro": "rua frei otto 4", "numero": "88", "bairro": "sta c", "cep": "777", "uf": 4, "cidade": "55" },
	];
	
	this.dataColeta = this.returnToDate();
	this.dataEntrega  = this.returnToDateMoreOne();
	
	this.btn = "btn-primary";
	this.btnSalvar = "disabled";
	this.exibirBtnCancelar = false;
	
	this.textoBtn = "Salvar";
	
	this.veiculoColeta = 0;
  }
  
  selecionarDestinatario(idCliente) {
	  let i;
	  for (i = 0; i < this.clientes.length; i++) {
		if (idCliente == this.clientes[i].id) {
			Object.assign(this.clienteDestinatario, this.clientes[i]);
		}
	  }
	  
	  if (idCliente == 0) {
		Object.assign(this.cliente, { "id": 0, "logradouro": "", "numero": "", "bairro": "", "cep": "", "uf": 0, "cidade": "" });
	  }
  }
  
  selecionarRemente(idCliente) {
	  let i;
	  for (i = 0; i < this.clientes.length; i++) {
		if (idCliente == this.clientes[i].id) {
			Object.assign(this.cliente, this.clientes[i]);
		}
	  }
	  
	  if (idCliente == 0) {
		Object.assign(this.cliente, { "id": 0, "logradouro": "", "numero": "", "bairro": "", "cep": "", "uf": 0, "cidade": "" });
	  }
  }  
  
  excluir(id) {
	  this.btn = "btn-danger";
	  this.btnSalvar = "";
	  this.exibirBtnCancelar = true;
	  this.textoBtn = "Excluir";
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
  
  btnSalvarDisabled() {
	  return this.clienteDestinatario.id == 0 || this.cliente.id == 0 || this.veiculoColeta == 0 ? "disabled" : "";	  
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
