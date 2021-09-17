import { Page } from "./page";
import { Condition } from "./condition";

export enum RequestType {
  EXPLICIT, // user id will not be feed by api gateway
  IMPLICIT, // user id will be feed by api gateway with And condition
  BOTH, // user id will be feed by api gateway with Or condition
}

export class Filter {
  public OrderByField: string;
  public IsOrderByFieldAsc: boolean;
  public Conditions: Array<Condition>;
  public PageInfo: Page;
  public RequestType: RequestType;

  // static Conditions: any;

  constructor() {
    // this.OrderByField = "";
    this.IsOrderByFieldAsc = false;
    this.Conditions = [];
    this.PageInfo = new Page();
    this.RequestType = RequestType.IMPLICIT;
  }

  // public getConditions(): Array<Condition> {
  //   return this.Conditions;
  // }

  // public setConditions(value: Array<Condition>) {
  //   this.Conditions = value;
  // }

  // public getPageInfo(): Page {
  //   return this.PageInfo;
  // }

  // public setPageInfo(value: Page) {
  //   this.PageInfo = value;
  // }

  // public getOrderByField(): string {
  //   return this.OrderByField;
  // }

  // public setOrderByField(value: string) {
  //   this.OrderByField = value;
  // }

  // public getIsOrderByFieldAsc(): boolean {
  //   return this.IsOrderByFieldAsc;
  // }

  // public setIsOrderByFieldAsc(value: boolean) {
  //   this.IsOrderByFieldAsc = value;
  // }
}
