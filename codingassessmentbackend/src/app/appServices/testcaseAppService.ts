import { HttpService, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TestcaseDto } from "../../submodules/dto/testcaseDto";
import { Testcase } from "../../submodules/entity/testcases";
import AppService from "../../submodules/entity/AppService/AppServiceBase";
import { Repository } from "typeorm";
let dto = require('../../submodules/mapping/testcaseMapper')

@Injectable()
export default class TestcaseAppService extends AppService<Testcase,TestcaseDto>{
    constructor(@InjectRepository(Testcase) private readonly testcaseRepository: Repository<Testcase>,public http:HttpService) {
        super(http,testcaseRepository,Testcase,Testcase,TestcaseDto,dto.testcaseentityJson, dto.testcasedtoJson,dto.testcaseentityToDtoJson, dto.testcasedtoToEntityJson);
             
    }

} 