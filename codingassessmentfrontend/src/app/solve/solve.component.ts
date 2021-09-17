import { Component, OnInit } from '@angular/core';
import { ProblemDto } from "src/models/dto/problemDto";
import { ActivatedRoute } from '@angular/router';
import { ProblemService } from '../Services/problem.service';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { TestcaseDto } from 'src/models/dto/testcaseDto';


@Component({
  selector: 'app-solve',
  templateUrl: './solve.component.html',
  styleUrls: ['./solve.component.css']
})
export class SolveComponent implements OnInit {

  useroutput: any[]= [];
  ntestcase!: number;
  expectedoutput: any[] =[];
  check: boolean= false;
  solution!: string;
  input!: string;
  output!: string;
  einput!: string;
  eoutput!: string;
  id!: number;
  response!: any;
  testcases!: TestcaseDto[];
  problem: ProblemDto = {
    id: 0,
    Problem_Name: '',
    Problem: '',
    Input: '',
    Output: '',
    Constraints: '',
    Example: '',
    Duration: 'hh:mm:ss',
    Marks: 0
  };

  testcase: TestcaseDto= {
    id: 0,
    Problem_id: 0,
    Expected_Input: '',
    Expected_Output: '',
  };

  token!: any;
  selectedlanguage: any = 75;
  constructor(private route: ActivatedRoute,
    private _problemservice: ProblemService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id != 0) {
      this._problemservice.readOneProblem(this.id).subscribe((result) => this.problem = result)
      this._problemservice.readfilterTestcase(this.id).subscribe((result) => {
        this.testcases =result;
        console.log(result);
      } );
    }
  }

  selectchangehandler(event: any) {
    this.selectedlanguage = event.target.value;
    console.log(this.selectedlanguage);
  }

  async onSubmit(form: NgForm) {
    console.log(form.value.solution);
    console.log(this.selectedlanguage);
    const body = JSON.stringify({
      "language_id": this.selectedlanguage,
      "source_code": form.value.solution,
      "stdin": form.value.input
    })
    
    let result = await axios.post("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true&fields=*", body,{
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'x-rapidapi-key': '5681d1de66mshd9ab0eab501197fp17a0a0jsn2496d66dadd4'
      }
    });
    this.output= result.data.stdout;
    console.log(this.output);
  }


  async testcasecheck(value1: any, value2: any, form: NgForm, last: any, i: any) {
    console.log(i);
    this.check= true;
    this.output="";
    this.input=value1;
    this.einput=value1;
    this.eoutput= value2;
   this.expectedoutput[i]=value2;
    console.log(this.expectedoutput);
    
    this.ntestcase=last;
    console.log(form.value.solution);
    console.log(last+1);
    console.log(this.selectedlanguage);
    const body = JSON.stringify({
      "language_id": this.selectedlanguage,
      "source_code": form.value.solution,
      "stdin": form.value.input,
      "expected_output":value2
    })
    
    let result = await axios.post("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true&fields=*", body,{
      headers: {
        'content-type': 'application/json',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'x-rapidapi-key': '5681d1de66mshd9ab0eab501197fp17a0a0jsn2496d66dadd4'
      }
    });
    this.output= result.data.stdout;
    console.log(this.output);
    if(this.output== this.eoutput)
    {
      alert("Congratulations test case matched");
    }
    this.useroutput[i]= this.output;
  }

  Result()
  {
    for(var i=0;i<this.ntestcase;i++)
    {
      if(this.useroutput[i]== this.expectedoutput[i])
      {
        alert("You scored full");
      }
      else{
        alert("You may have missed some testcases");
        console.log(this.useroutput[i], this.expectedoutput[i]);
      }
    }
      
  }
  
  
}
