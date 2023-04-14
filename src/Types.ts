export declare type Head = {
  name: string
  value: string
}
export declare interface InnerTransfer {
  id: number
  transactionNumber: string
  amount: string
  createdAt: string
  origin: Origin
  destination: Destination
  operationCategory: OperationCategory
  operationStatus: OperationStatus
}

export declare interface Origin {
  id: number
  accountNumber: string
  balance: any
  transferAccountantBalance: any
  rechargeAccountantBalance: any
  createdAt: any
  user: User
  currency: Currency
  accountType: AccountType
}

export declare interface User {
  id: number
  name: string
  email: string
  createdAt: any
}

export declare interface Currency {
  id: number
  name: string
  abbreviation: string
  symbol: string
  description: string
  createdAt: any
  category: any
}

export declare interface AccountType {
  id: number
  name: string
  description: string
  createdAt: any
  updatedAt: any
}

export declare interface Destination {
  id: number
  accountNumber: string
  balance: any
  transferAccountantBalance: any
  rechargeAccountantBalance: any
  createdAt: any
  user: User
  currency: Currency
  accountType: AccountType
}

export declare interface OperationCategory {
  id: number
  name: string
  description: string
  created_at: any
}

export declare interface OperationStatus {
  id: number
  name: string
  color: any
  description: string
  created_at: any
}



export declare interface Deposit {
  id: number
  transactionNumber: string
  amount: string
  createdAt: Date
  rechargeable: Rechargeable
  account: Account
  voucher: Voucher
  operationStatus: OperationStatus
}


export declare interface Account {
  id: number
  accountNumber: string
  balance: string
  transferAccountantBalance: string
  rechargeAccountantBalance: string
  createdAt: Date
  currency: Currency2
  accountType: AccountType
}
export declare interface AccountType {
  id: number
  name: string
  description: string
  createdAt?: any
  updatedAt?: any
}
export declare interface Currency2 {
  id: number
  name: string
  abbreviation: string
  symbol: string
  description: string
  createdAt?: any
}

export declare interface Voucher {
  id: number
  imageable_type: string
  imageable_id: number
  url: string
  created_at: Date
  updated_at: Date
}B
export declare interface ankAccountType {
  id: number
  name: string
  description?: any
  created_at?: any
}
export declare interface PaymentMethod {
  id: number
  name: string
  description: string
  created_at?: any
}
export declare interface Rechargeable {
  id: number
  bank: string
  swiftCode: string
  accountHolder: string
  accountNumber: string
  address: string
  iban: string
  reference?: any
  createdAt: Date
  paymentMethod: PaymentMethod
  currency: Currency2
  country: Country
}

export declare interface Country {
  id: number
  name: string
  abbreviation: string
  phone_code: string
  citizenship: string
  description?: any
  created_at?: any
}


export declare interface OperationStatus {
  id: number
  name: string
  description: string
  createdAt?: any
  updatedAt?: any
}
