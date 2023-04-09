import { BankAccountType } from "../BankAccountType/BankAccountType.model";
import { BaseCamelCase } from "../Base.model";
import { Country } from "../Country/Country.model";
import { Currency } from "../Currency/Currency.model";
import { PaymentMethod } from "../PaymentMethod/PaymentMethod.model";

export declare interface Rechargeable extends BaseCamelCase {
  bank: string;
  swiftCode: string;
  accountHolder: string;
  accountNumber: string;
  address: string;
  iban: string;
  reference?: any;
  paymentMethod: PaymentMethod;
  currency: Currency;
  bankAccountType: BankAccountType;
  country: Country;
}
