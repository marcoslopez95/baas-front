import { OmitBaseCamelCase, nullable } from "../Base.model";
import { Deposit } from "./Deposit.model";

export declare interface DepositCreateDto extends OmitDepositCreate {
  business_bank_account_id: number | nullable
  account_id: number | nullable
  payment_method_id: number | nullable
  comments?: string | nullable
}

type OmitDepositCreate = Omit<Deposit, OmitBaseCamelCase | ignoreFields>

type ignoreFields = 'transactionNumber' | 'voucher' | 'rechargeable' | 'account' | 'operationStatus'
/**
 * {
    business_bank_account_id: null,
    payment_method_id: 0,
    account_id: '',
    amount: "0,00",
    comments: '',
  }
 */
