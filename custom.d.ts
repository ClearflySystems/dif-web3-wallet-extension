// custom.d.ts

// fix missing type declarations in typeorm
declare module 'typeorm' {
  export interface Relation<T> {

  }
}