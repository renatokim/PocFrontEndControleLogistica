import { Routes, RouterModule } from '@angular/router'
import { ColetaComponent } from './coleta/coleta.component'
import { ExpedicaoComponent } from './expedicao/expedicao.component'
import { FreteComponent } from './frete/frete.component'
import { RelatorioComponent } from './relatorio/relatorio.component'
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'coleta', component: ColetaComponent },
  { path: 'expedicao', component: ExpedicaoComponent },
  { path: 'frete', component: FreteComponent },
  { path: 'relatorio', component: RelatorioComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);