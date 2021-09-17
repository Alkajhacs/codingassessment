import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Injectable, Param, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { TestcaseFacade } from '../facade/testcaseFacade';
import { ResponseModel } from '../../submodules/entity/common/ResponseModel';
import { Request } from 'express';
import { SNS_SQS } from '../../submodules/sns_sqs/SNS_SQS';
import { TestcaseDto } from '../../submodules/dto/testcaseDto';
import { RequestModelQuery } from '../../submodules/entity/common/RequestModelQuery';
import { RequestModel } from '../../submodules/entity/common/RequestModel';
import { Message } from '../../submodules/entity/common/Message';


@Controller('testcase')
export class TestcaseRoutes{

  constructor(private testcaseFacade : TestcaseFacade) { }

  private sns_sqs = SNS_SQS.getInstance();
  private topicArray = ['TESTCASE_ADD','TESTCASE_UPDATE','TESTCASE_DELETE'];
  private serviceName = ['TESTCASE_SERVICE','TESTCASE_SERVICE','TESTCASE_SERVICE'];
  private children_array= ["testcase"];
  onModuleInit() {
   
    for (var i = 0; i < this.topicArray.length; i++) {
      this.sns_sqs.listenToService(this.topicArray[i], this.serviceName[i], (() => {
        let value = this.topicArray[i];
        return async (result) => {
          console.log("Result is........" + JSON.stringify(result));
          try {
            let responseModelOfTestcaseDto: ResponseModel<TestcaseDto> = null;
            console.log(`listening to  ${value} topic.....result is....`);
            // ToDo :- add a method for removing queue message from queue....
            switch (value) {
              case 'TESTCASE_ADD':
                console.log("Inside PRODUCT_ADD Topic");
                responseModelOfTestcaseDto = await this.createTestcase(result["message"]);
                break;
              case 'TESTCASE_UPDATE':
                  console.log("Inside PRODUCT_UPDATE Topic");
                  responseModelOfTestcaseDto = await this.updatetestcase(result["message"]);
                  break;
              case 'TESTCASE_DELETE':
                    console.log("Inside PRODUCT_DELETE Topic");
                    responseModelOfTestcaseDto = await this.deleteTestcase(result["message"]);
                    break;
  
            }
  
            console.log("Result of aws of GroupRoutes  is...." + JSON.stringify(result));
            let requestModelOfTestcaseDto: RequestModel<TestcaseDto> = result["message"];
            responseModelOfTestcaseDto.setSocketId(requestModelOfTestcaseDto.SocketId)
            responseModelOfTestcaseDto.setCommunityUrl(requestModelOfTestcaseDto.CommunityUrl);
            responseModelOfTestcaseDto.setRequestId(requestModelOfTestcaseDto.RequestGuid);
            responseModelOfTestcaseDto.setStatus(new Message("200", "Group Inserted Successfully", null));

            for (let index = 0; index < result.OnSuccessTopicsToPush.length; index++) {
              const element = result.OnSuccessTopicsToPush[index];
              console.log("ELEMENT: ", JSON.stringify(responseModelOfTestcaseDto));
              this.sns_sqs.publishMessageToTopic(element, responseModelOfTestcaseDto)
            }
          }
          catch (error) {
            console.log("Inside Catch.........");
            console.log(error, result);
            for (let index = 0; index < result.OnFailureTopicsToPush.length; index++) {
              const element = result.OnFailureTopicsToPush[index];
              let errorResult: ResponseModel<TestcaseDto> = new ResponseModel<TestcaseDto>(null,null,null,null,null,null,null,null,null);;
              errorResult.setStatus(new Message("500",error,null))
              

              this.sns_sqs.publishMessageToTopic(element, errorResult);
            }
          }
        }
      })())
    }

  }

  @Get('/filter')
  async search(@Req() request: Request) {
    try {
      console.log("Inside controller ......STUDENT");
      let requestmodelquery = new RequestModelQuery();
      requestmodelquery.Children= this.children_array
      requestmodelquery.Filter.Conditions= (JSON.parse(request.headers['requestmodel'].toString())).Filter.Conditions;
      console.log(JSON.stringify(requestmodelquery));
      console.log(JSON.stringify(requestmodelquery.Filter));
      
      return this.testcaseFacade.search(requestmodelquery);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  allTestcases(@Query('page') page: number) {
    try {
      console.log("Inside controller ......STUDENT");
      return this.testcaseFacade.getAll(page);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/search/:value1')
  searchTestcase(@Param('value1') value1: any){
    try {
      console.log("Inside controller ......STUDENT");
      return this.testcaseFacade.getone(value1);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("/") 
  async createTestcase(@Body() body:RequestModel<TestcaseDto>): Promise<ResponseModel<TestcaseDto>> {  //requiestmodel<STUDENTDto></STUDENTDto>....Promise<ResponseModel<Grou[pDto>>]
    try {
      console.log("Inside CreateTestcase of controller....body id" + JSON.stringify(body));
      let result = await this.testcaseFacade.create(body);
   
      return result;
      // return null;
    } catch (error) {
       console.log("Error is....." + error);
       throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/")
  async updatetestcase(@Body() body: RequestModel<TestcaseDto>): Promise<ResponseModel<TestcaseDto>> {  //requiestmodel<STUDENTDto></STUDENTDto>....Promise<ResponseModel<Grou[pDto>>]
    try {
      console.log("Inside updateProduct of controller....body id" + JSON.stringify(body));

      console.log("Executing update query..............")
      return await this.testcaseFacade.update(body);
    } catch (error) {
      console.log("Error is....." + error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/')
  deleteTestcase(@Body() body:RequestModel<TestcaseDto>): Promise<ResponseModel<TestcaseDto>>{
    try {
      console.log("body: ",body)
      return this.testcaseFacade.deleteById(body);
        } catch (error) {
          throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
  }

  @Get('/:id')
  readOne(@Param('id') id) {
    return this.testcaseFacade.readOne(id);
  }


}