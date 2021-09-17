import { Injectable } from "@nestjs/common";
import ProblemAppService from "../appServices/problemAppService";
import { ProblemDto } from "../../submodules/dto/problemDto";
import { Problem } from "../../submodules/entity/problem";
import FacadeBase from "./facadeBase";

@Injectable()
export class ProblemFacade extends FacadeBase<Problem,ProblemDto>{
    constructor(private problemAppService: ProblemAppService){
       super(problemAppService);
    }
}