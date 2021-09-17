import { HttpService, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProblemDto } from "../../submodules/dto/problemDto";
import { Problem } from "../../submodules/entity/problem";
import AppService from "../../submodules/entity/AppService/AppServiceBase";
import { Repository } from "typeorm";
let dto = require('../../submodules/mapping/problemMapper')

@Injectable()
export default class ProblemAppService extends AppService<Problem,ProblemDto>{
    constructor(@InjectRepository(Problem) private readonly problemRepository: Repository<Problem>,public http:HttpService) {
        super(http,problemRepository,Problem,Problem,ProblemDto,dto.problementityJson, dto.problemdtoJson,dto.problementityToDtoJson, dto.problemdtoToEntityJson);
             
    }

} 