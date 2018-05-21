export interface User {
    dn: string;
    attributes?: (AttributesEntity)[] | null;
  }
  export interface AttributesEntity {
    name: string;
    values?: (ValuesEntity)[] | null;
  }
  export interface ValuesEntity {
    value: string;
  }
