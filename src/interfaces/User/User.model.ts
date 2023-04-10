import { Account } from "../Account/Account.model";
import { BaseCamelCase, BaseModel } from "../Base.model";
import { Country } from "../Country/Country.model";
import { Role } from "../Role/Role.model";

export declare interface User extends BaseModel{
  email:string
  name:string
  accessToken?: string,
  roles: Role[]
  accounts: Account[]
  profile: Profile
}

interface Profile extends BaseCamelCase {
  city:string,
  address:string,
  phoneNumber:string,
  birthdate:string,
  country: Country
  kycVerification: KycVerification
}

interface KycVerification extends BaseCamelCase{
  tries: number,
  selfie_document_url:string
  front_document_url:string
  reverse_document_url?: string
  selfie_document_status:string
  front_document_status:string
  reverse_document_status:string
  general_status:string
  documentType: DocumentType
}

interface DocumentType extends BaseCamelCase {
  name:string
  description:string
}
