/* eslint-disable @typescript-eslint/no-explicit-any */

// Prisma 6 generates types in .prisma/client but @prisma/client's package.json
// exports map expects default.d.ts which isn't generated. This declaration
// module resolves the TS7016 error at compile time while runtime still uses
// the fully-typed generated client.
declare module "@prisma/client" {
  export const PrismaClient: any;
  export type PrismaClient = any;
}
