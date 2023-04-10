import { BaseCamelCase } from "../Base.model";

export declare interface Currency extends BaseCamelCase{
  name: string;
  abbreviation: string;
  symbol: string;
  description: string;
}
