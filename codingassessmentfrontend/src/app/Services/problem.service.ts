import { Injectable } from "@angular/core";
import { ProblemDto } from "src/models/dto/problemDto"; 
import { HttpClient} from "@angular/common/http";
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';
import { TestcaseDto } from "src/models/dto/testcaseDto";


@Injectable()
export class ProblemService {

  socket = io(`${environment.apiurlio}`);
  request_guid: string;
  socket_id!: string;
  token!: any;

  constructor(private http: HttpClient) {

    //FIRST ACTION hapens wheN the page opens firSt time , this is one time activity 
    this.socket.on('connection', function (socket) {
      console.log('socket has been connected');
      console.log(socket)
    });

    //Thi seven Is caLled whEn  the server sends the data back to the client
    this.socket.on('successResponseFromServer', function (data) {
      //evalaute the requestGuid from the dictionary and then match and then show themessgae in console
      console.log(data);
      //for find you can use 'Filter' 
      //remove the item from the dictionary /array
    });

    //this is the event which is called when the server register the socket id and sends back the socket id
    this.socket.on('socketIdFromServer', function (data) {
      console.log(data)
      sessionStorage.setItem('socket_id', data.socket_id);
    });

    this.request_guid = this.uuidv4();

  }

  public readProblems(page: number) {
      
    const url = `${environment.murl}?page=${page}`
    console.log(url);
    
     return this.http.get<ProblemDto[]>(url)
  }


  public readOneProblem(id: number) {
    return this.http.get<ProblemDto>(`${environment.murl}/${id}`);
  }

  public createProblem(problem1: any){
    problem1.SocketId= sessionStorage.getItem('socket_id');
    problem1.RequestGuid = this.request_guid;
   return this.http.post<any>(`${environment.apiurl}`, problem1);
  }

  public updateProblem(id: number, problem: any) {
    problem.SocketId= sessionStorage.getItem('socket_id');
    problem.RequestGuid = this.request_guid;
    return this.http.put<ProblemDto>(`${environment.apiurl}/${id}`, problem);
  }
  public searchProblem(value: any) {
    return this.http.get<ProblemDto[]>(`${environment.murl}/search/${value}`);
  }
  public deleteProblem(id: number, problem: any) {
    problem.SocketId= sessionStorage.getItem('socket_id');
    problem.RequestGuid = this.request_guid;
    return this.http.request<any>('DELETE', `${environment.apiurl}/${id}`, { body: problem });
  }

  public readTestcases(page: number) {
      
    const url = `${environment.murl}?page=${page}`
    console.log(url);
    
     return this.http.get<TestcaseDto[]>(url)
  }


  public readOneTestcase(id: number) {
    return this.http.get<TestcaseDto>(`${environment.murl}/${id}`);
  }


  public readfilterTestcase(id: number) {
    const headers= {
      'content-type': 'application/json',
      'requestmodel': `{"Filter": {"Conditions":[{"FieldName":"Problem_id","FieldValue":${id}}]}}`,
    }
    return this.http.get<TestcaseDto[]>(`${environment.murlt}/filter`,{headers});
  }

  public createTestcase(problem1: any){
    problem1.SocketId= sessionStorage.getItem('socket_id');
    problem1.RequestGuid = this.request_guid;
   return this.http.post<any>(`${environment.apiurlt}`, problem1);
  }

  public updateTestcase(id: number, problem: any) {
    problem.SocketId= sessionStorage.getItem('socket_id');
    problem.RequestGuid = this.request_guid;
    return this.http.put<TestcaseDto>(`${environment.apiurlt}/${id}`, problem);
  }
  public searchTestcase(value: any) {
    return this.http.get<TestcaseDto[]>(`${environment.murlt}/search/${value}`);
  }
  public deleteTestcase(id: number, problem: any) {
    problem.SocketId= sessionStorage.getItem('socket_id');
    problem.RequestGuid = this.request_guid;
    return this.http.request<any>('DELETE', `${environment.apiurlt}/${id}`, { body: problem });
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

  }
  
}