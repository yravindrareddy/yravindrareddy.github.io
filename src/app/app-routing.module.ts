import { ErrorComponent } from './error/error.component';
import { ResultComponent } from './result/result.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindingFalconeComponent } from './finding-falcone/finding-falcone.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'findFalcone'},
  { path: 'findFalcone', component: FindingFalconeComponent },
  { path: 'result', component: ResultComponent },
  { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
