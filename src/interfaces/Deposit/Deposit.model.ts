import { Account } from '../Account/Account.model';
import { BaseCamelCase, BaseSnakeCase } from '../Base.model';
import { OperationStatus } from '../OperationStatus/OperationStatus.model';
import { Rechargeable } from './../Rechargeable/Rechargeable.model';

export declare interface Deposit extends BaseCamelCase{
  transactionNumber: string;
  amount: string;
  rechargeable: Rechargeable;
  account: Account;
  voucher: Voucher;
  operationStatus: OperationStatus
}

export declare interface Voucher extends BaseSnakeCase {
  imageable_type: string;
  imageable_id: number;
  url: string;
}
