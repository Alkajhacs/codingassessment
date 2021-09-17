import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Injectable, Param, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { ProblemFacade } from '../facade/problemFacade';
import { ResponseModel } from '../../submodules/entity/common/ResponseModel';
import { Request } from 'express';
import { SNS_SQS } from '../../submodules/sns_sqs/SNS_SQS';
import { ProblemDto } from '../../submodules/dto/problemDto';
import { RequestModelQuery } from '../../submodules/entity/common/RequestModelQuery';
import { RequestModel } from '../../submodules/entity/common/RequestModel';
import { Message } from '../../submodules/entity/common/Message';


@Controller('problem')
export class ProblemRoutes{

  constructor(private problemFacade : ProblemFacade) { }

  private sns_sqs = SNS_SQS.getInstance();
  private topicArray = ['PROBLEM_ADD','PROBLEM_UPDATE','PROBLEM_DELETE'];
  private serviceName = ['PROBLEM_SERVICE','PROBLEM_SERVICE','PROBLEM_SERVICE'];
  
  onModuleInit() {
   
    for (var i = 0; i < this.topicArray.length; i++) {
      this.sns_sqs.listenToService(this.topicArray[i], this.serviceName[i], (() => {
        let value = this.topicArray[i];
        return async (result) => {
          console.log("Result is........" + JSON.stringify(result));
          try {
            let responseModelOfProblemDto: ResponseModel<ProblemDto> = null;
            console.log(`listening to  ${value} topic.....result is....`);
            // ToDo :- add a method for removing queue message from queue....
            switch (value) {
              case 'PROBLEM_ADD':
                console.log("Inside PRODUCT_ADD Topic");
                responseModelOfProblemDto = await this.createProblem(result["message"]);
                break;
              case 'PROBLEM_UPDATE':
                  console.log("Inside PRODUCT_UPDATE Topic");
                  responseModelOfProblemDto = await this.updateproblem(result["message"]);
                  break;
              case 'PROBLEM_DELETE':
                    console.log("Inside PRODUCT_DELETE Topic");
                    responseModelOfProblemDto = await this.deleteProblem(result["message"]);
                    break;
  
            }
  
            console.log("Result of aws of GroupRoutes  is...." + JSON.stringify(result));
            let requestModelOfProblemDto: RequestModel<ProblemDto> = result["message"];
            responseModelOfProblemDto.setSocketId(requestModelOfProblemDto.SocketId)
            responseModelOfProblemDto.setCommunityUrl(requestModelOfProblemDto.CommunityUrl);
            responseModelOfProblemDto.setRequestId(requestModelOfProblemDto.RequestGuid);
            responseModelOfProblemDto.setStatus(new Message("200", "Group Inserted Successfully", null));

            for (let index = 0; index < result.OnSuccessTopicsToPush.length; index++) {
              const element = result.OnSuccessTopicsToPush[index];
              console.log("ELEMENT: ", JSON.stringify(responseModelOfProblemDto));
              this.sns_sqs.publishMessageToTopic(element, responseModelOfProblemDto)
            }
          }
          catch (error) {
            console.log("Inside Catch.........");
            console.log(error, result);
            for (let index = 0; index < result.OnFailureTopicsToPush.length; index++) {
              const element = result.OnFailureTopicsToPush[index];
              let errorResult: ResponseModel<ProblemDto> = new ResponseModel<ProblemDto>(null,null,null,null,null,null,null,null,null);;
              errorResult.setStatus(new Message("500",error,null))
              

              this.sns_sqs.publishMessageToTopic(element, errorResult);
            }
          }
        }
      })())
    }

  }


  @Get()
  allProblems(@Query('page') page: number) {
    try {
      console.log("Inside controller ......STUDENT");
      return this.problemFacade.getAll(page);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/search/:value1')
  searchProblem(@Param('value1') value1: any){
    try {
      console.log("Inside controller ......STUDENT");
      return this.problemFacade.getone(value1);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("/") 
  async createProblem(@Body() body:RequestModel<ProblemDto>): Promise<ResponseModel<ProblemDto>> {  //requiestmodel<STUDENTDto></STUDENTDto>....Promise<ResponseModel<Grou[pDto>>]
    try {
      console.log("Inside CreateProblem of controller....body id" + JSON.stringify(body));
      let result = await this.problemFacade.create(body);
   
      return result;
      // return null;
    } catch (error) {
       console.log("Error is....." + error);
       throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/")
  async updateproblem(@Body() body: RequestModel<ProblemDto>): Promise<ResponseModel<ProblemDto>> {  //requiestmodel<STUDENTDto></STUDENTDto>....Promise<ResponseModel<Grou[pDto>>]
    try {
      console.log("Inside updateProduct of controller....body id" + JSON.stringify(body));

      console.log("Executing update query..............")
      return await this.problemFacade.update(body);
    } catch (error) {
      console.log("Error is....." + error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/')
  deleteProblem(@Body() body:RequestModel<ProblemDto>): Promise<ResponseModel<ProblemDto>>{
    try {
      console.log("body: ",body)
      return this.problemFacade.deleteById(body);
        } catch (error) {
          throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
  }

  @Get('/:id')
  readOne(@Param('id') id) {
    return this.problemFacade.readOne(id);
  }


}