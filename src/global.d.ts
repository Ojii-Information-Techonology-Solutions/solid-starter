/// <reference types="@solidjs/start/env" />

declare module "bun:sqlite" {
  export class Database {
    constructor(filename: string, options?: { readonly?: boolean; create?: boolean });
    query<T = any>(sql: string): {
      all(...params: any[]): T[];
      get(...params: any[]): T | null;
      run(...params: any[]): void;
      values(...params: any[]): any[][];
    };
    prepare(sql: string): {
      run(...params: any[]): { lastInsertRowid: number; changes: number };
      get(...params: any[]): any;
      all(...params: any[]): any[];
    };
    exec(sql: string): void;
    close(): void;
    readonly filename: string;
  }
}
