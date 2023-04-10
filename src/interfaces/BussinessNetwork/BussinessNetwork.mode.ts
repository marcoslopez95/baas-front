import { BaseCamelCase } from "../Base.model";

export declare interface BussinessNetwork extends Omit<BaseCamelCase, 'created_at'>{
  name:string,
  description:string,
  created_at: Date,
}
