import { BaseSnakeCase } from "../Base.model";

export declare interface Country extends BaseSnakeCase{
  name: string;
  abbreviation: string;
  phone_code: string;
  citizenship: string;
  description?: any;
}
