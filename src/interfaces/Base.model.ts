
export declare interface BaseModel {
  id: number;
}

export declare interface BaseSnakeCase extends BaseModel{
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export declare interface BaseCamelCase extends BaseModel{
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export type OmitBaseCamelCase = 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'
export type OmitBaseSnakeCase = 'id' | 'created_at' | 'updated_at' | 'daleted_at'
export type nullable = null | ''
export type Image = object | '' | string | Blob
