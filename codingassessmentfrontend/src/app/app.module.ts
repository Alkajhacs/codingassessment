import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ProblemService } from './Services/problem.service';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateProblemComponent } from './create-problem/create-problem.component';
import { ProblemsComponent } from './problems/problems.component';
import { RouterModule, Routes } from '@angular/router';
import { SolveComponent } from './solve/solve.component';
import { CreateTestcaseComponent } from './create-testcase/create-testcase.component';

const appRoutes: Routes = [
  { path: 'list', component:ProblemsComponent},
  { path: 'create', component:CreateProblemComponent},
  { path: 'list/create/:id', component:CreateProblemComponent},
  { path: 'create/:id', component:CreateProblemComponent},
  { path: 'list/solve/:id', component:SolveComponent},
  { path: 'list/create/testcase/:id', component:CreateTestcaseComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CreateProblemComponent,
    ProblemsComponent,
    SolveComponent,
    CreateTestcaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ProblemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
