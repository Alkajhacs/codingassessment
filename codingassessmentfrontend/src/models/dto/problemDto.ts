import { DtoBase } from "./DtoBase";

export class ProblemDto extends DtoBase {
    constructor() {
      super();
     
    }
    Problem_Name!: string;
    Problem?: string;
    Input?: string;
    Output?: string;
    Constraints?: string;
    Example?: string;
    Duration?: string;
    Marks?: number;
    
  }