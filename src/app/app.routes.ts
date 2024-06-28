import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "cadastrar", component: CadastrarComponent},
  {path: "categoria", component: CategoriaComponent},
  {path: "MenuPrincipal", component: HomeComponent},
];
