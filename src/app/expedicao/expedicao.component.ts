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

  constructor(private http:  HttpClient) { }

  ngOnInit() {
    this.baseUrl = "https://projetoj.apphb.com/";
    //this.baseUrl = "http://localhost:50143";
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
    this.rota.Id = 0;
    this.rota.TransporteId = 0;    

    this.http.post(this.baseUrl + "/api/v1/rota/", this.rota).subscribe(() => {
      this.buscarRotas();
    });
  }
}
