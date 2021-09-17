import { Injectable } from "@nestjs/common";
import TestcaseAppService from "../appServices/testcaseAppService";
import { TestcaseDto } from "../../submodules/dto/testcaseDto";
import { Testcase } from "../../submodules/entity/testcases";
import FacadeBase from "./facadeBase";

@Injectable()
export class TestcaseFacade extends FacadeBase<Testcase,TestcaseDto>{
    constructor(private testcaseAppService: TestcaseAppService){
       super(testcaseAppService);
    }
}