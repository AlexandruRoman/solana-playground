import { IdlType } from "@project-serum/anchor/dist/cjs/idl";

export interface Account {
  name: string;
  isMut: boolean;
  isSigner: boolean;
}

export interface Instruction {
  name: string;
  accounts: Account[];
  args: any[];
}

export interface Field {
  name: string;
  type: IdlType;
}

export interface Type {
  kind: "struct";
  fields: Field[];
}

export interface Account2 {
  name: string;
  type: Type;
}

export interface Metadata {
  address: string;
}

export interface RootObject {
  version: string;
  name: string;
  instructions: Instruction[];
  accounts: Account2[];
  metadata: Metadata;
}
