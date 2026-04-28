declare module "better-sqlite3" {
  interface DatabaseOptions {
    memory?: boolean;
    readonly?: boolean;
    fileMustExist?: boolean;
    timeout?: number;
    verbose?: (message?: string) => void;
    nativeBinding?: string;
  }

  interface RunResult {
    changes: number;
    lastInsertRowid: number | bigint;
  }

  class Statement {
    run(...params: unknown[]): RunResult;
    get(...params: unknown[]): unknown;
    all(...params: unknown[]): unknown[];
    iterate(...params: unknown[]): IterableIterator<unknown>;
    readonly source: string;
    readonly database: Database;
  }

  class Database {
    constructor(filename: string, options?: DatabaseOptions);
    prepare(source: string): Statement;
    exec(source: string): this;
    pragma(source: string, options?: { simple?: boolean }): unknown;
    close(): void;
    transaction<T>(fn: (...args: unknown[]) => T): (...args: unknown[]) => T;
    checkpoint(databaseName?: string): this;
    readonly name: string;
    readonly memory: boolean;
    readonly open: boolean;
    readonly inTransaction: boolean;
  }

  export = Database;
}