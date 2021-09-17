import { Component, OnInit } from '@angular/core';
import { TestcaseDto } from "src/models/dto/testcaseDto";
import {FormsModule, NgForm } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { ProblemService } from '../Services/problem.service';

@Component({
  selector: 'app-create-testcase',
  templateUrl: './create-testcase.component.html',
  styleUrls: ['./create-testcase.component.css']
})
export class CreateTestcaseComponent implements OnInit {
  id!: number;
  header!: string;

  testcase: TestcaseDto= {
    id: 0,
    Problem_id: 0,
    Expected_Input: '',
    Expected_Output: '',
  };
  DataCollection: any= []
  str: any= {
    "DataCollection": [
      {
        "Problem_id" : 0,
        "Expected_Input" : '',
        "Expected_Output": ''
      }
    ]
  } 

  constructor(private _problemservice: ProblemService,
    private _router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id= Number(this.route.snapshot.paramMap.get('id'));
    this.testcase.Problem_id=this.id;
    this.header= this.id ===0? 'AddProblem': 'EditProblem';
    if(this.id!=0) {
   //   this._problemservice.readOneProblem(this.id).subscribe((result)=> this.testcase= result)
      console.log(this.testcase);
    }
  }

  onSubmit(form:NgForm) {
    console.log(form.value);
    this.DataCollection= [];
    this.DataCollection.push(form.value);
    this.str.DataCollection= this.DataCollection;
      this._problemservice.createTestcase(this.str).subscribe((result)=>{
        console.log(result);
      });

  }



}
