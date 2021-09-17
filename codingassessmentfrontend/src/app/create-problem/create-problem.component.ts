import { Component, OnInit } from '@angular/core';
import { ProblemDto } from "src/models/dto/problemDto";
import {FormsModule, NgForm } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { ProblemService } from '../Services/problem.service';
import { TestcaseDto } from 'src/models/dto/testcaseDto';

@Component({
  selector: 'app-create-problem',
  templateUrl: './create-problem.component.html',
  styleUrls: ['./create-problem.component.css']
})
export class CreateProblemComponent implements OnInit {
id!: number;
header!: string;
testcases!: TestcaseDto[];
  problem: ProblemDto= {
    id: 0,
    Problem_Name: '',
    Problem: '',
    Input: '',
    Output: '',
    Constraints: '',
    Example: '',
    Duration: 'hh:mm:ss' ,
    Marks: 0
  };
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
        "Problem_Name" : '',
        "Problem": '',
        "Input" : '',
        "Output": '',
        "Constraints": '',
        "Example": '',
        "Duration": '',
        "Marks":'',
      }
    ]
  }

  str1: any= {
    "DataCollection": [
      {
        "Problem_id": '',
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
    this.header= this.id ===0? 'AddProblem': 'EditProblem';
    if(this.id!=0) {
      this._problemservice.readOneProblem(this.id).subscribe((result)=> this.problem= result)
      this._problemservice.readfilterTestcase(this.id).subscribe((result) => {
        this.testcases =result;
        console.log(result);
      } );
    }
      console.log(this.problem);
    }

  onSubmit(form:NgForm) {
    console.log(form.value);
    this.DataCollection= [];
    this.DataCollection.push(form.value);
    this.str.DataCollection= this.DataCollection;

    if(this.id === 0)
    {
      this._problemservice.createProblem(this.str).subscribe((result)=>{
        console.log(result);
      });
    }
    else
    {
      form.value.id = this.problem['id'];
      this._problemservice.updateProblem(form.value.id,this.str).subscribe((result)=>{
        console.log(result);
      });
      for(var i=0;i<this.testcases.length;i++){
        this._problemservice.updateTestcase(this.testcases[i].id,this.testcases[i]).subscribe((result)=> {
          console.log(result);
        })
      } 
    }

    this._router.navigateByUrl('list');
  }
}
