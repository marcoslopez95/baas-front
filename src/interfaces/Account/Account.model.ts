import { AccountType } from "../AccountType/AccountType.model";
import { BaseCamelCase } from "../Base.model";
import { Currency } from "../Currency/Currency.model";

export declare interface Account extends BaseCamelCase{
  accountNumber: string;
  balance: string;
  transferAccountantBalance: string;
  rechargeAccountantBalance: string;
  currency: Currency;
  accountType: AccountType;
}
