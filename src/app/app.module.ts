import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
//import { FreteComponent } from './frete/frete.component';
//import { ExpedicaoComponent } from './expedicao/expedicao.component';
//import { RelatorioComponent } from './relatorio/relatorio.component';
import { routing } from './app.router';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ColetaComponent } from './coleta/coleta.component';
import { ExpedicaoComponent } from './expedicao/expedicao.component';
import { FreteComponent } from './frete/frete.component';
import { RelatorioComponent } from './relatorio/relatorio.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ColetaComponent,
    //FreteComponent,
    //ExpedicaoComponent,
    ColetaComponent,
    ExpedicaoComponent,
    FreteComponent,
    RelatorioComponent,
    //RelatorioComponent,
    //HomeComponent
  ],
  imports: [
    BrowserModule,
    routing,
	FormsModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }