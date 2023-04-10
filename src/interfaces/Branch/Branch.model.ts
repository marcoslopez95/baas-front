import { BaseCamelCase } from "../Base.model";
import { Bussiness } from "../Bussiness/Bussiness.model";

export declare interface Branch extends BaseCamelCase{
  token?: string,
  name: string,
  description: string,
  business: Bussiness
}
