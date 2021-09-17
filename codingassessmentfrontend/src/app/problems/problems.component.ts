import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProblemDto } from "src/models/dto/problemDto";
import { ProblemService } from '../Services/problem.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NgForm } from '@angular/forms';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})
export class ProblemsComponent implements OnInit {

  @Input() problem!: ProblemDto;
  totallength:any;
  config: any;
  search:any;
  bool:any= false;

  value: number=1;

  DataCollection: any= []
  str: any= {
    "DataCollection": [
      {
        "Problem_Name" : '',
        "Problem": '',
        "Input" : '',
        "Output": '',
        "Constraints": '',
        "Example": '',
        "Duration": 'hh:mm:ss',
        "Marks": ''
      }
    ]
  }

  problems!: ProblemDto[];
  constructor(private _problemservice: ProblemService,
    private _router: Router,
    private route: ActivatedRoute,
    private changeDetectorRefs: ChangeDetectorRef) { }


    pageChange(newPage: number) {
      this._router.navigate([''], { queryParams: { page: newPage } });             
    }
    
    startpage(){
      if(this.value>=0 )
      this.value=1
    }
    
    page(){
    if(this.value>=0)
    this.value=this.value+1
    }
    page1(){
    if(this.value>=2 )
    this.value=this.value-1
    }


  ngOnInit(): void {

    this._problemservice.readProblems(this.value).subscribe( (result) => {
      this.problems= result;
      console.log(result);
    });
  }

  selectProblem(problem: ProblemDto){
    this.problem=problem;
    this._router.navigate(['create/',this.problem.id])
  }

  getproblem() {
    this._problemservice.readProblems(this.value).subscribe( (result) => {
      this.problems=result;
      console.log(this.problems);
    });
  }

  SearchP(form: any) {
    console.log(form);
    this._problemservice.searchProblem(form).subscribe( (result)=> {
      this.problems=result;
      console.log(this.problems);
      
    })
  }

  sort(column: number) {

    if(column==0)
    {
      if(this.bool == true)
      {
        this.problems.sort((a, b) => a.id < b.id? 1: a.id >b.id ? -1 : 0);
        this.bool=!this.bool
      }
      else { 
        this.problems.sort((a, b) => a.id > b.id? 1: a.id < b.id ? -1 : 0);
        this.bool=!this.bool
      }
    }
    else {
      if(this.bool == true)
      {
        this.problems.sort((a, b) => a.Problem_Name < b.Problem_Name? 1: a.Problem_Name >b.Problem_Name ? -1 : 0);      
        this.bool=!this.bool
      }
      else { 
        this.problems.sort((a, b) => a.Problem_Name > b.Problem_Name? 1: a.Problem_Name <b.Problem_Name ? -1 : 0);
        this.bool=!this.bool
      }
      
    }
  }
    
    deleteProblem(id: number,problem: any){

        this.DataCollection = []
        this.DataCollection.push(problem)
    
        this.str.DataCollection = this.DataCollection
    
        this._problemservice.deleteProblem(id, this.str).subscribe((result) => {
          this.changeDetectorRefs.detectChanges();
        });
      }
}
