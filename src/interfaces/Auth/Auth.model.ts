export declare interface FormConfirmForgotPassword {
  code: string
  password: string
  password_confirmation: string
}
export declare interface FormConfirmVerifyEmail {
  sms_token: string
  email_token: string
  email: string
}
export declare interface FormLoginInterface {
  email: string
  password: string
}

export declare interface FormRegisterInterface {
  business_code: string
  name: string
  email: string
  password: string
  password_confirmation: string
}
