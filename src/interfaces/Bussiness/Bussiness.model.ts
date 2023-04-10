import { BaseCamelCase } from "../Base.model";
import { BussinessNetwork } from "../BussinessNetwork/BussinessNetwork.mode";

export declare interface Bussiness extends BaseCamelCase {
  code: string
  name: string
  logo: string
  icon: string
  primaryColor: string
  secondaryColor: string
  description: string
  businessNetwork: BussinessNetwork
}
