import { HttpModule, HttpService, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProblemAppService from './appServices/problemAppService'
import { ProblemFacade } from './facade/problemFacade';
import { ProblemRoutes } from './routes/productRoute';
import { Problem } from '../submodules/entity/problem';
import { Testcase } from 'src/submodules/entity/testcases';
import { TestcaseFacade } from './facade/testcaseFacade';
import { TestcaseRoutes } from './routes/testcaseRoute';
import TestcaseAppService from './appServices/testcaseAppService';

@Module({
  imports: [HttpModule,
    TypeOrmModule.forFeature([ Problem, Testcase]),
  ],
  providers: [ProblemFacade,ProblemAppService, TestcaseAppService, TestcaseFacade],
  controllers: [ProblemRoutes, TestcaseRoutes]
})

export class EntityModule implements NestModule {
  constructor() {
    console.log("Inside Entity Module....");
  }

  configure(consumer: MiddlewareConsumer) {
    console.log("Inside Consumer baby......");
  }
}