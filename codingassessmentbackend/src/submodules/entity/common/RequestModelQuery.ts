import { Filter } from "./filter";
import { RequestModelBase } from "./requestModelBase";

export class RequestModelQuery extends RequestModelBase
    {
        public Children: Array<string>;
        public Filter: Filter;
        //public AccessToken:string;

        //Empty constructor
        constructor() {
            super(0,"","");
            this.Filter = new Filter();
            this.Children = [];
            // let conditions:any = this.Filter.Conditions;
        }
        
}