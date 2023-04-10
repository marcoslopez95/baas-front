import { Image } from "../Base.model"
import { User } from "./User.model"

export declare interface FormKycInterface {
  document_type_id: number | null
  country_id: number | null
  city: string
  address: string
  birthdate: string
  phone_number: string
  selfie: Image
  front_document: Image
  reverse_document: Image
}

export declare interface UserCreateDto extends OnlyUserCreateDto{
  code?:string
  business_id?: number
}

type OnlyUserCreateDto = Partial<User>
