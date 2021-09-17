import { DtoBase } from "./DtoBase";

export class TestcaseDto extends DtoBase {
    constructor() {
      super();
     
    }
    Expected_Input?: string;
    Expected_Output?: string;
    Problem_id?: string;
    
  }