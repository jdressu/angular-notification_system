import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SomewhereElseComponent } from './components/somewhere-else/somewhere-else.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'somewhere-else', component: SomewhereElseComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
