
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Engagement
 * 
 */
export type Engagement = $Result.DefaultSelection<Prisma.$EngagementPayload>
/**
 * Model EngagementApplication
 * 
 */
export type EngagementApplication = $Result.DefaultSelection<Prisma.$EngagementApplicationPayload>
/**
 * Model EngagementAssignment
 * 
 */
export type EngagementAssignment = $Result.DefaultSelection<Prisma.$EngagementAssignmentPayload>
/**
 * Model EngagementFeedback
 * 
 */
export type EngagementFeedback = $Result.DefaultSelection<Prisma.$EngagementFeedbackPayload>
/**
 * Model MemberExperience
 * 
 */
export type MemberExperience = $Result.DefaultSelection<Prisma.$MemberExperiencePayload>
/**
 * Model EngagementLead
 * 
 */
export type EngagementLead = $Result.DefaultSelection<Prisma.$EngagementLeadPayload>
/**
 * Model EngagementTimesheetEntry
 * 
 */
export type EngagementTimesheetEntry = $Result.DefaultSelection<Prisma.$EngagementTimesheetEntryPayload>
/**
 * Model EngagementTimesheetAudit
 * One audit trail for the whole timesheet domain. Most rows are entry-scoped, but manager
 * assignment and removal are engagement-scoped and have no entry, so exactly one of
 * timesheetEntryId / engagementId is set on every row - enforced by a database check constraint.
 */
export type EngagementTimesheetAudit = $Result.DefaultSelection<Prisma.$EngagementTimesheetAuditPayload>
/**
 * Model EngagementManager
 * 
 */
export type EngagementManager = $Result.DefaultSelection<Prisma.$EngagementManagerPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const EngagementStatus: {
  OPEN: 'OPEN',
  ACTIVE: 'ACTIVE',
  CANCELLED: 'CANCELLED',
  CLOSED: 'CLOSED',
  ON_HOLD: 'ON_HOLD'
};

export type EngagementStatus = (typeof EngagementStatus)[keyof typeof EngagementStatus]


export const ApplicationStatus: {
  SUBMITTED: 'SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  SHORTLISTED: 'SHORTLISTED',
  SELECTED: 'SELECTED',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
};

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus]


export const AssignmentStatus: {
  SELECTED: 'SELECTED',
  OFFER_REJECTED: 'OFFER_REJECTED',
  ASSIGNED: 'ASSIGNED',
  COMPLETED: 'COMPLETED',
  TERMINATED: 'TERMINATED'
};

export type AssignmentStatus = (typeof AssignmentStatus)[keyof typeof AssignmentStatus]


export const PaymentCycle: {
  WEEKLY: 'WEEKLY',
  FORTNIGHTLY: 'FORTNIGHTLY',
  MONTHLY: 'MONTHLY'
};

export type PaymentCycle = (typeof PaymentCycle)[keyof typeof PaymentCycle]


export const AssignmentSource: {
  DIRECT: 'DIRECT',
  VENDOR: 'VENDOR',
  WIPRO_REFERRAL: 'WIPRO_REFERRAL',
  CUSTOMER_REFERRAL: 'CUSTOMER_REFERRAL',
  TOPCODER_COMMUNITY: 'TOPCODER_COMMUNITY'
};

export type AssignmentSource = (typeof AssignmentSource)[keyof typeof AssignmentSource]


export const Role: {
  DESIGNER: 'DESIGNER',
  SOFTWARE_DEVELOPER: 'SOFTWARE_DEVELOPER',
  DATA_SCIENTIST: 'DATA_SCIENTIST',
  DATA_ENGINEER: 'DATA_ENGINEER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Workload: {
  FULL_TIME: 'FULL_TIME',
  FRACTIONAL: 'FRACTIONAL'
};

export type Workload = (typeof Workload)[keyof typeof Workload]


export const AnticipatedStart: {
  IMMEDIATE: 'IMMEDIATE',
  FEW_DAYS: 'FEW_DAYS',
  FEW_WEEKS: 'FEW_WEEKS'
};

export type AnticipatedStart = (typeof AnticipatedStart)[keyof typeof AnticipatedStart]


export const TimesheetEntryStatus: {
  DRAFT: 'DRAFT',
  SUBMITTED: 'SUBMITTED',
  APPROVED: 'APPROVED'
};

export type TimesheetEntryStatus = (typeof TimesheetEntryStatus)[keyof typeof TimesheetEntryStatus]


export const TimesheetAuditAction: {
  CREATED: 'CREATED',
  UPDATED: 'UPDATED',
  SUBMITTED: 'SUBMITTED',
  UNSUBMITTED: 'UNSUBMITTED',
  APPROVED: 'APPROVED',
  REOPENED: 'REOPENED',
  ADMIN_OVERRIDE: 'ADMIN_OVERRIDE',
  PAYMENT_LINKED: 'PAYMENT_LINKED',
  MANAGER_ASSIGNED: 'MANAGER_ASSIGNED',
  MANAGER_REMOVED: 'MANAGER_REMOVED',
  DELETED: 'DELETED'
};

export type TimesheetAuditAction = (typeof TimesheetAuditAction)[keyof typeof TimesheetAuditAction]


export const RoleLevel: {
  JUNIOR: 'JUNIOR',
  MID: 'MID',
  SENIOR: 'SENIOR'
};

export type RoleLevel = (typeof RoleLevel)[keyof typeof RoleLevel]


export const EngagementLeadStatus: {
  SUBMITTED: 'SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  QUALIFIED: 'QUALIFIED',
  CONVERTED: 'CONVERTED',
  REJECTED: 'REJECTED'
};

export type EngagementLeadStatus = (typeof EngagementLeadStatus)[keyof typeof EngagementLeadStatus]


export const EngagementModel: {
  TIME_AND_MATERIAL: 'TIME_AND_MATERIAL',
  FIXED_PRICE: 'FIXED_PRICE'
};

export type EngagementModel = (typeof EngagementModel)[keyof typeof EngagementModel]


export const ExperienceLevel: {
  JUNIOR: 'JUNIOR',
  MID: 'MID',
  SENIOR: 'SENIOR',
  LEAD_ARCHITECT: 'LEAD_ARCHITECT'
};

export type ExperienceLevel = (typeof ExperienceLevel)[keyof typeof ExperienceLevel]


export const LeadPriority: {
  CRITICAL: 'CRITICAL',
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW'
};

export type LeadPriority = (typeof LeadPriority)[keyof typeof LeadPriority]

}

export type EngagementStatus = $Enums.EngagementStatus

export const EngagementStatus: typeof $Enums.EngagementStatus

export type ApplicationStatus = $Enums.ApplicationStatus

export const ApplicationStatus: typeof $Enums.ApplicationStatus

export type AssignmentStatus = $Enums.AssignmentStatus

export const AssignmentStatus: typeof $Enums.AssignmentStatus

export type PaymentCycle = $Enums.PaymentCycle

export const PaymentCycle: typeof $Enums.PaymentCycle

export type AssignmentSource = $Enums.AssignmentSource

export const AssignmentSource: typeof $Enums.AssignmentSource

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Workload = $Enums.Workload

export const Workload: typeof $Enums.Workload

export type AnticipatedStart = $Enums.AnticipatedStart

export const AnticipatedStart: typeof $Enums.AnticipatedStart

export type TimesheetEntryStatus = $Enums.TimesheetEntryStatus

export const TimesheetEntryStatus: typeof $Enums.TimesheetEntryStatus

export type TimesheetAuditAction = $Enums.TimesheetAuditAction

export const TimesheetAuditAction: typeof $Enums.TimesheetAuditAction

export type RoleLevel = $Enums.RoleLevel

export const RoleLevel: typeof $Enums.RoleLevel

export type EngagementLeadStatus = $Enums.EngagementLeadStatus

export const EngagementLeadStatus: typeof $Enums.EngagementLeadStatus

export type EngagementModel = $Enums.EngagementModel

export const EngagementModel: typeof $Enums.EngagementModel

export type ExperienceLevel = $Enums.ExperienceLevel

export const ExperienceLevel: typeof $Enums.ExperienceLevel

export type LeadPriority = $Enums.LeadPriority

export const LeadPriority: typeof $Enums.LeadPriority

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Engagements
 * const engagements = await prisma.engagement.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Engagements
   * const engagements = await prisma.engagement.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.engagement`: Exposes CRUD operations for the **Engagement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Engagements
    * const engagements = await prisma.engagement.findMany()
    * ```
    */
  get engagement(): Prisma.EngagementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.engagementApplication`: Exposes CRUD operations for the **EngagementApplication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EngagementApplications
    * const engagementApplications = await prisma.engagementApplication.findMany()
    * ```
    */
  get engagementApplication(): Prisma.EngagementApplicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.engagementAssignment`: Exposes CRUD operations for the **EngagementAssignment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EngagementAssignments
    * const engagementAssignments = await prisma.engagementAssignment.findMany()
    * ```
    */
  get engagementAssignment(): Prisma.EngagementAssignmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.engagementFeedback`: Exposes CRUD operations for the **EngagementFeedback** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EngagementFeedbacks
    * const engagementFeedbacks = await prisma.engagementFeedback.findMany()
    * ```
    */
  get engagementFeedback(): Prisma.EngagementFeedbackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.memberExperience`: Exposes CRUD operations for the **MemberExperience** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MemberExperiences
    * const memberExperiences = await prisma.memberExperience.findMany()
    * ```
    */
  get memberExperience(): Prisma.MemberExperienceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.engagementLead`: Exposes CRUD operations for the **EngagementLead** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EngagementLeads
    * const engagementLeads = await prisma.engagementLead.findMany()
    * ```
    */
  get engagementLead(): Prisma.EngagementLeadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.engagementTimesheetEntry`: Exposes CRUD operations for the **EngagementTimesheetEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EngagementTimesheetEntries
    * const engagementTimesheetEntries = await prisma.engagementTimesheetEntry.findMany()
    * ```
    */
  get engagementTimesheetEntry(): Prisma.EngagementTimesheetEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.engagementTimesheetAudit`: Exposes CRUD operations for the **EngagementTimesheetAudit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EngagementTimesheetAudits
    * const engagementTimesheetAudits = await prisma.engagementTimesheetAudit.findMany()
    * ```
    */
  get engagementTimesheetAudit(): Prisma.EngagementTimesheetAuditDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.engagementManager`: Exposes CRUD operations for the **EngagementManager** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EngagementManagers
    * const engagementManagers = await prisma.engagementManager.findMany()
    * ```
    */
  get engagementManager(): Prisma.EngagementManagerDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Engagement: 'Engagement',
    EngagementApplication: 'EngagementApplication',
    EngagementAssignment: 'EngagementAssignment',
    EngagementFeedback: 'EngagementFeedback',
    MemberExperience: 'MemberExperience',
    EngagementLead: 'EngagementLead',
    EngagementTimesheetEntry: 'EngagementTimesheetEntry',
    EngagementTimesheetAudit: 'EngagementTimesheetAudit',
    EngagementManager: 'EngagementManager'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "engagement" | "engagementApplication" | "engagementAssignment" | "engagementFeedback" | "memberExperience" | "engagementLead" | "engagementTimesheetEntry" | "engagementTimesheetAudit" | "engagementManager"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Engagement: {
        payload: Prisma.$EngagementPayload<ExtArgs>
        fields: Prisma.EngagementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EngagementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EngagementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload>
          }
          findFirst: {
            args: Prisma.EngagementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EngagementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload>
          }
          findMany: {
            args: Prisma.EngagementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload>[]
          }
          create: {
            args: Prisma.EngagementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload>
          }
          createMany: {
            args: Prisma.EngagementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EngagementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload>[]
          }
          delete: {
            args: Prisma.EngagementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload>
          }
          update: {
            args: Prisma.EngagementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload>
          }
          deleteMany: {
            args: Prisma.EngagementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EngagementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EngagementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload>[]
          }
          upsert: {
            args: Prisma.EngagementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload>
          }
          aggregate: {
            args: Prisma.EngagementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEngagement>
          }
          groupBy: {
            args: Prisma.EngagementGroupByArgs<ExtArgs>
            result: $Utils.Optional<EngagementGroupByOutputType>[]
          }
          count: {
            args: Prisma.EngagementCountArgs<ExtArgs>
            result: $Utils.Optional<EngagementCountAggregateOutputType> | number
          }
        }
      }
      EngagementApplication: {
        payload: Prisma.$EngagementApplicationPayload<ExtArgs>
        fields: Prisma.EngagementApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EngagementApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EngagementApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementApplicationPayload>
          }
          findFirst: {
            args: Prisma.EngagementApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EngagementApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementApplicationPayload>
          }
          findMany: {
            args: Prisma.EngagementApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementApplicationPayload>[]
          }
          create: {
            args: Prisma.EngagementApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementApplicationPayload>
          }
          createMany: {
            args: Prisma.EngagementApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EngagementApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementApplicationPayload>[]
          }
          delete: {
            args: Prisma.EngagementApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementApplicationPayload>
          }
          update: {
            args: Prisma.EngagementApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementApplicationPayload>
          }
          deleteMany: {
            args: Prisma.EngagementApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EngagementApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EngagementApplicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementApplicationPayload>[]
          }
          upsert: {
            args: Prisma.EngagementApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementApplicationPayload>
          }
          aggregate: {
            args: Prisma.EngagementApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEngagementApplication>
          }
          groupBy: {
            args: Prisma.EngagementApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<EngagementApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.EngagementApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<EngagementApplicationCountAggregateOutputType> | number
          }
        }
      }
      EngagementAssignment: {
        payload: Prisma.$EngagementAssignmentPayload<ExtArgs>
        fields: Prisma.EngagementAssignmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EngagementAssignmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementAssignmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EngagementAssignmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementAssignmentPayload>
          }
          findFirst: {
            args: Prisma.EngagementAssignmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementAssignmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EngagementAssignmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementAssignmentPayload>
          }
          findMany: {
            args: Prisma.EngagementAssignmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementAssignmentPayload>[]
          }
          create: {
            args: Prisma.EngagementAssignmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementAssignmentPayload>
          }
          createMany: {
            args: Prisma.EngagementAssignmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EngagementAssignmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementAssignmentPayload>[]
          }
          delete: {
            args: Prisma.EngagementAssignmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementAssignmentPayload>
          }
          update: {
            args: Prisma.EngagementAssignmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementAssignmentPayload>
          }
          deleteMany: {
            args: Prisma.EngagementAssignmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EngagementAssignmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EngagementAssignmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementAssignmentPayload>[]
          }
          upsert: {
            args: Prisma.EngagementAssignmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementAssignmentPayload>
          }
          aggregate: {
            args: Prisma.EngagementAssignmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEngagementAssignment>
          }
          groupBy: {
            args: Prisma.EngagementAssignmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<EngagementAssignmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.EngagementAssignmentCountArgs<ExtArgs>
            result: $Utils.Optional<EngagementAssignmentCountAggregateOutputType> | number
          }
        }
      }
      EngagementFeedback: {
        payload: Prisma.$EngagementFeedbackPayload<ExtArgs>
        fields: Prisma.EngagementFeedbackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EngagementFeedbackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementFeedbackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EngagementFeedbackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementFeedbackPayload>
          }
          findFirst: {
            args: Prisma.EngagementFeedbackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementFeedbackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EngagementFeedbackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementFeedbackPayload>
          }
          findMany: {
            args: Prisma.EngagementFeedbackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementFeedbackPayload>[]
          }
          create: {
            args: Prisma.EngagementFeedbackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementFeedbackPayload>
          }
          createMany: {
            args: Prisma.EngagementFeedbackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EngagementFeedbackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementFeedbackPayload>[]
          }
          delete: {
            args: Prisma.EngagementFeedbackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementFeedbackPayload>
          }
          update: {
            args: Prisma.EngagementFeedbackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementFeedbackPayload>
          }
          deleteMany: {
            args: Prisma.EngagementFeedbackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EngagementFeedbackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EngagementFeedbackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementFeedbackPayload>[]
          }
          upsert: {
            args: Prisma.EngagementFeedbackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementFeedbackPayload>
          }
          aggregate: {
            args: Prisma.EngagementFeedbackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEngagementFeedback>
          }
          groupBy: {
            args: Prisma.EngagementFeedbackGroupByArgs<ExtArgs>
            result: $Utils.Optional<EngagementFeedbackGroupByOutputType>[]
          }
          count: {
            args: Prisma.EngagementFeedbackCountArgs<ExtArgs>
            result: $Utils.Optional<EngagementFeedbackCountAggregateOutputType> | number
          }
        }
      }
      MemberExperience: {
        payload: Prisma.$MemberExperiencePayload<ExtArgs>
        fields: Prisma.MemberExperienceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MemberExperienceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExperiencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MemberExperienceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExperiencePayload>
          }
          findFirst: {
            args: Prisma.MemberExperienceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExperiencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MemberExperienceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExperiencePayload>
          }
          findMany: {
            args: Prisma.MemberExperienceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExperiencePayload>[]
          }
          create: {
            args: Prisma.MemberExperienceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExperiencePayload>
          }
          createMany: {
            args: Prisma.MemberExperienceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MemberExperienceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExperiencePayload>[]
          }
          delete: {
            args: Prisma.MemberExperienceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExperiencePayload>
          }
          update: {
            args: Prisma.MemberExperienceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExperiencePayload>
          }
          deleteMany: {
            args: Prisma.MemberExperienceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MemberExperienceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MemberExperienceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExperiencePayload>[]
          }
          upsert: {
            args: Prisma.MemberExperienceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MemberExperiencePayload>
          }
          aggregate: {
            args: Prisma.MemberExperienceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMemberExperience>
          }
          groupBy: {
            args: Prisma.MemberExperienceGroupByArgs<ExtArgs>
            result: $Utils.Optional<MemberExperienceGroupByOutputType>[]
          }
          count: {
            args: Prisma.MemberExperienceCountArgs<ExtArgs>
            result: $Utils.Optional<MemberExperienceCountAggregateOutputType> | number
          }
        }
      }
      EngagementLead: {
        payload: Prisma.$EngagementLeadPayload<ExtArgs>
        fields: Prisma.EngagementLeadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EngagementLeadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementLeadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EngagementLeadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementLeadPayload>
          }
          findFirst: {
            args: Prisma.EngagementLeadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementLeadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EngagementLeadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementLeadPayload>
          }
          findMany: {
            args: Prisma.EngagementLeadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementLeadPayload>[]
          }
          create: {
            args: Prisma.EngagementLeadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementLeadPayload>
          }
          createMany: {
            args: Prisma.EngagementLeadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EngagementLeadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementLeadPayload>[]
          }
          delete: {
            args: Prisma.EngagementLeadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementLeadPayload>
          }
          update: {
            args: Prisma.EngagementLeadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementLeadPayload>
          }
          deleteMany: {
            args: Prisma.EngagementLeadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EngagementLeadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EngagementLeadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementLeadPayload>[]
          }
          upsert: {
            args: Prisma.EngagementLeadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementLeadPayload>
          }
          aggregate: {
            args: Prisma.EngagementLeadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEngagementLead>
          }
          groupBy: {
            args: Prisma.EngagementLeadGroupByArgs<ExtArgs>
            result: $Utils.Optional<EngagementLeadGroupByOutputType>[]
          }
          count: {
            args: Prisma.EngagementLeadCountArgs<ExtArgs>
            result: $Utils.Optional<EngagementLeadCountAggregateOutputType> | number
          }
        }
      }
      EngagementTimesheetEntry: {
        payload: Prisma.$EngagementTimesheetEntryPayload<ExtArgs>
        fields: Prisma.EngagementTimesheetEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EngagementTimesheetEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EngagementTimesheetEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetEntryPayload>
          }
          findFirst: {
            args: Prisma.EngagementTimesheetEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EngagementTimesheetEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetEntryPayload>
          }
          findMany: {
            args: Prisma.EngagementTimesheetEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetEntryPayload>[]
          }
          create: {
            args: Prisma.EngagementTimesheetEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetEntryPayload>
          }
          createMany: {
            args: Prisma.EngagementTimesheetEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EngagementTimesheetEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetEntryPayload>[]
          }
          delete: {
            args: Prisma.EngagementTimesheetEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetEntryPayload>
          }
          update: {
            args: Prisma.EngagementTimesheetEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetEntryPayload>
          }
          deleteMany: {
            args: Prisma.EngagementTimesheetEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EngagementTimesheetEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EngagementTimesheetEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetEntryPayload>[]
          }
          upsert: {
            args: Prisma.EngagementTimesheetEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetEntryPayload>
          }
          aggregate: {
            args: Prisma.EngagementTimesheetEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEngagementTimesheetEntry>
          }
          groupBy: {
            args: Prisma.EngagementTimesheetEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<EngagementTimesheetEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.EngagementTimesheetEntryCountArgs<ExtArgs>
            result: $Utils.Optional<EngagementTimesheetEntryCountAggregateOutputType> | number
          }
        }
      }
      EngagementTimesheetAudit: {
        payload: Prisma.$EngagementTimesheetAuditPayload<ExtArgs>
        fields: Prisma.EngagementTimesheetAuditFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EngagementTimesheetAuditFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetAuditPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EngagementTimesheetAuditFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetAuditPayload>
          }
          findFirst: {
            args: Prisma.EngagementTimesheetAuditFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetAuditPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EngagementTimesheetAuditFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetAuditPayload>
          }
          findMany: {
            args: Prisma.EngagementTimesheetAuditFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetAuditPayload>[]
          }
          create: {
            args: Prisma.EngagementTimesheetAuditCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetAuditPayload>
          }
          createMany: {
            args: Prisma.EngagementTimesheetAuditCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EngagementTimesheetAuditCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetAuditPayload>[]
          }
          delete: {
            args: Prisma.EngagementTimesheetAuditDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetAuditPayload>
          }
          update: {
            args: Prisma.EngagementTimesheetAuditUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetAuditPayload>
          }
          deleteMany: {
            args: Prisma.EngagementTimesheetAuditDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EngagementTimesheetAuditUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EngagementTimesheetAuditUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetAuditPayload>[]
          }
          upsert: {
            args: Prisma.EngagementTimesheetAuditUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementTimesheetAuditPayload>
          }
          aggregate: {
            args: Prisma.EngagementTimesheetAuditAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEngagementTimesheetAudit>
          }
          groupBy: {
            args: Prisma.EngagementTimesheetAuditGroupByArgs<ExtArgs>
            result: $Utils.Optional<EngagementTimesheetAuditGroupByOutputType>[]
          }
          count: {
            args: Prisma.EngagementTimesheetAuditCountArgs<ExtArgs>
            result: $Utils.Optional<EngagementTimesheetAuditCountAggregateOutputType> | number
          }
        }
      }
      EngagementManager: {
        payload: Prisma.$EngagementManagerPayload<ExtArgs>
        fields: Prisma.EngagementManagerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EngagementManagerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementManagerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EngagementManagerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementManagerPayload>
          }
          findFirst: {
            args: Prisma.EngagementManagerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementManagerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EngagementManagerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementManagerPayload>
          }
          findMany: {
            args: Prisma.EngagementManagerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementManagerPayload>[]
          }
          create: {
            args: Prisma.EngagementManagerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementManagerPayload>
          }
          createMany: {
            args: Prisma.EngagementManagerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EngagementManagerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementManagerPayload>[]
          }
          delete: {
            args: Prisma.EngagementManagerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementManagerPayload>
          }
          update: {
            args: Prisma.EngagementManagerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementManagerPayload>
          }
          deleteMany: {
            args: Prisma.EngagementManagerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EngagementManagerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EngagementManagerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementManagerPayload>[]
          }
          upsert: {
            args: Prisma.EngagementManagerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementManagerPayload>
          }
          aggregate: {
            args: Prisma.EngagementManagerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEngagementManager>
          }
          groupBy: {
            args: Prisma.EngagementManagerGroupByArgs<ExtArgs>
            result: $Utils.Optional<EngagementManagerGroupByOutputType>[]
          }
          count: {
            args: Prisma.EngagementManagerCountArgs<ExtArgs>
            result: $Utils.Optional<EngagementManagerCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    engagement?: EngagementOmit
    engagementApplication?: EngagementApplicationOmit
    engagementAssignment?: EngagementAssignmentOmit
    engagementFeedback?: EngagementFeedbackOmit
    memberExperience?: MemberExperienceOmit
    engagementLead?: EngagementLeadOmit
    engagementTimesheetEntry?: EngagementTimesheetEntryOmit
    engagementTimesheetAudit?: EngagementTimesheetAuditOmit
    engagementManager?: EngagementManagerOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type EngagementCountOutputType
   */

  export type EngagementCountOutputType = {
    applications: number
    assignments: number
    managers: number
    timesheetAudit: number
  }

  export type EngagementCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | EngagementCountOutputTypeCountApplicationsArgs
    assignments?: boolean | EngagementCountOutputTypeCountAssignmentsArgs
    managers?: boolean | EngagementCountOutputTypeCountManagersArgs
    timesheetAudit?: boolean | EngagementCountOutputTypeCountTimesheetAuditArgs
  }

  // Custom InputTypes
  /**
   * EngagementCountOutputType without action
   */
  export type EngagementCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementCountOutputType
     */
    select?: EngagementCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EngagementCountOutputType without action
   */
  export type EngagementCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EngagementApplicationWhereInput
  }

  /**
   * EngagementCountOutputType without action
   */
  export type EngagementCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EngagementAssignmentWhereInput
  }

  /**
   * EngagementCountOutputType without action
   */
  export type EngagementCountOutputTypeCountManagersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EngagementManagerWhereInput
  }

  /**
   * EngagementCountOutputType without action
   */
  export type EngagementCountOutputTypeCountTimesheetAuditArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EngagementTimesheetAuditWhereInput
  }


  /**
   * Count Type EngagementAssignmentCountOutputType
   */

  export type EngagementAssignmentCountOutputType = {
    feedback: number
    memberExperiences: number
    timesheetEntries: number
  }

  export type EngagementAssignmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    feedback?: boolean | EngagementAssignmentCountOutputTypeCountFeedbackArgs
    memberExperiences?: boolean | EngagementAssignmentCountOutputTypeCountMemberExperiencesArgs
    timesheetEntries?: boolean | EngagementAssignmentCountOutputTypeCountTimesheetEntriesArgs
  }

  // Custom InputTypes
  /**
   * EngagementAssignmentCountOutputType without action
   */
  export type EngagementAssignmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementAssignmentCountOutputType
     */
    select?: EngagementAssignmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EngagementAssignmentCountOutputType without action
   */
  export type EngagementAssignmentCountOutputTypeCountFeedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EngagementFeedbackWhereInput
  }

  /**
   * EngagementAssignmentCountOutputType without action
   */
  export type EngagementAssignmentCountOutputTypeCountMemberExperiencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberExperienceWhereInput
  }

  /**
   * EngagementAssignmentCountOutputType without action
   */
  export type EngagementAssignmentCountOutputTypeCountTimesheetEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EngagementTimesheetEntryWhereInput
  }


  /**
   * Count Type EngagementTimesheetEntryCountOutputType
   */

  export type EngagementTimesheetEntryCountOutputType = {
    auditRecords: number
  }

  export type EngagementTimesheetEntryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditRecords?: boolean | EngagementTimesheetEntryCountOutputTypeCountAuditRecordsArgs
  }

  // Custom InputTypes
  /**
   * EngagementTimesheetEntryCountOutputType without action
   */
  export type EngagementTimesheetEntryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetEntryCountOutputType
     */
    select?: EngagementTimesheetEntryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EngagementTimesheetEntryCountOutputType without action
   */
  export type EngagementTimesheetEntryCountOutputTypeCountAuditRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EngagementTimesheetAuditWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Engagement
   */

  export type AggregateEngagement = {
    _count: EngagementCountAggregateOutputType | null
    _avg: EngagementAvgAggregateOutputType | null
    _sum: EngagementSumAggregateOutputType | null
    _min: EngagementMinAggregateOutputType | null
    _max: EngagementMaxAggregateOutputType | null
  }

  export type EngagementAvgAggregateOutputType = {
    durationWeeks: number | null
    durationMonths: number | null
    requiredMemberCount: number | null
  }

  export type EngagementSumAggregateOutputType = {
    durationWeeks: number | null
    durationMonths: number | null
    requiredMemberCount: number | null
  }

  export type EngagementMinAggregateOutputType = {
    id: string | null
    projectId: string | null
    title: string | null
    description: string | null
    durationStartDate: Date | null
    durationEndDate: Date | null
    durationWeeks: number | null
    durationMonths: number | null
    anticipatedStart: $Enums.AnticipatedStart | null
    status: $Enums.EngagementStatus | null
    isPrivate: boolean | null
    requiredMemberCount: number | null
    role: $Enums.Role | null
    roleLevel: $Enums.RoleLevel | null
    workload: $Enums.Workload | null
    compensationRange: string | null
    receivedDateFromAccount: Date | null
    account: string | null
    smu: string | null
    spoc: string | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type EngagementMaxAggregateOutputType = {
    id: string | null
    projectId: string | null
    title: string | null
    description: string | null
    durationStartDate: Date | null
    durationEndDate: Date | null
    durationWeeks: number | null
    durationMonths: number | null
    anticipatedStart: $Enums.AnticipatedStart | null
    status: $Enums.EngagementStatus | null
    isPrivate: boolean | null
    requiredMemberCount: number | null
    role: $Enums.Role | null
    roleLevel: $Enums.RoleLevel | null
    workload: $Enums.Workload | null
    compensationRange: string | null
    receivedDateFromAccount: Date | null
    account: string | null
    smu: string | null
    spoc: string | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type EngagementCountAggregateOutputType = {
    id: number
    projectId: number
    title: number
    description: number
    durationStartDate: number
    durationEndDate: number
    durationWeeks: number
    durationMonths: number
    timeZones: number
    countries: number
    requiredSkills: number
    anticipatedStart: number
    status: number
    isPrivate: number
    requiredMemberCount: number
    role: number
    roleLevel: number
    workload: number
    compensationRange: number
    receivedDateFromAccount: number
    account: number
    smu: number
    spoc: number
    createdAt: number
    createdBy: number
    updatedAt: number
    updatedBy: number
    _all: number
  }


  export type EngagementAvgAggregateInputType = {
    durationWeeks?: true
    durationMonths?: true
    requiredMemberCount?: true
  }

  export type EngagementSumAggregateInputType = {
    durationWeeks?: true
    durationMonths?: true
    requiredMemberCount?: true
  }

  export type EngagementMinAggregateInputType = {
    id?: true
    projectId?: true
    title?: true
    description?: true
    durationStartDate?: true
    durationEndDate?: true
    durationWeeks?: true
    durationMonths?: true
    anticipatedStart?: true
    status?: true
    isPrivate?: true
    requiredMemberCount?: true
    role?: true
    roleLevel?: true
    workload?: true
    compensationRange?: true
    receivedDateFromAccount?: true
    account?: true
    smu?: true
    spoc?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type EngagementMaxAggregateInputType = {
    id?: true
    projectId?: true
    title?: true
    description?: true
    durationStartDate?: true
    durationEndDate?: true
    durationWeeks?: true
    durationMonths?: true
    anticipatedStart?: true
    status?: true
    isPrivate?: true
    requiredMemberCount?: true
    role?: true
    roleLevel?: true
    workload?: true
    compensationRange?: true
    receivedDateFromAccount?: true
    account?: true
    smu?: true
    spoc?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type EngagementCountAggregateInputType = {
    id?: true
    projectId?: true
    title?: true
    description?: true
    durationStartDate?: true
    durationEndDate?: true
    durationWeeks?: true
    durationMonths?: true
    timeZones?: true
    countries?: true
    requiredSkills?: true
    anticipatedStart?: true
    status?: true
    isPrivate?: true
    requiredMemberCount?: true
    role?: true
    roleLevel?: true
    workload?: true
    compensationRange?: true
    receivedDateFromAccount?: true
    account?: true
    smu?: true
    spoc?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
    _all?: true
  }

  export type EngagementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Engagement to aggregate.
     */
    where?: EngagementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Engagements to fetch.
     */
    orderBy?: EngagementOrderByWithRelationInput | EngagementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EngagementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Engagements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Engagements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Engagements
    **/
    _count?: true | EngagementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EngagementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EngagementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EngagementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EngagementMaxAggregateInputType
  }

  export type GetEngagementAggregateType<T extends EngagementAggregateArgs> = {
        [P in keyof T & keyof AggregateEngagement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEngagement[P]>
      : GetScalarType<T[P], AggregateEngagement[P]>
  }




  export type EngagementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EngagementWhereInput
    orderBy?: EngagementOrderByWithAggregationInput | EngagementOrderByWithAggregationInput[]
    by: EngagementScalarFieldEnum[] | EngagementScalarFieldEnum
    having?: EngagementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EngagementCountAggregateInputType | true
    _avg?: EngagementAvgAggregateInputType
    _sum?: EngagementSumAggregateInputType
    _min?: EngagementMinAggregateInputType
    _max?: EngagementMaxAggregateInputType
  }

  export type EngagementGroupByOutputType = {
    id: string
    projectId: string
    title: string
    description: string
    durationStartDate: Date | null
    durationEndDate: Date | null
    durationWeeks: number | null
    durationMonths: number | null
    timeZones: string[]
    countries: string[]
    requiredSkills: string[]
    anticipatedStart: $Enums.AnticipatedStart
    status: $Enums.EngagementStatus
    isPrivate: boolean
    requiredMemberCount: number | null
    role: $Enums.Role | null
    roleLevel: $Enums.RoleLevel | null
    workload: $Enums.Workload | null
    compensationRange: string | null
    receivedDateFromAccount: Date | null
    account: string | null
    smu: string | null
    spoc: string | null
    createdAt: Date
    createdBy: string
    updatedAt: Date
    updatedBy: string | null
    _count: EngagementCountAggregateOutputType | null
    _avg: EngagementAvgAggregateOutputType | null
    _sum: EngagementSumAggregateOutputType | null
    _min: EngagementMinAggregateOutputType | null
    _max: EngagementMaxAggregateOutputType | null
  }

  type GetEngagementGroupByPayload<T extends EngagementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EngagementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EngagementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EngagementGroupByOutputType[P]>
            : GetScalarType<T[P], EngagementGroupByOutputType[P]>
        }
      >
    >


  export type EngagementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    title?: boolean
    description?: boolean
    durationStartDate?: boolean
    durationEndDate?: boolean
    durationWeeks?: boolean
    durationMonths?: boolean
    timeZones?: boolean
    countries?: boolean
    requiredSkills?: boolean
    anticipatedStart?: boolean
    status?: boolean
    isPrivate?: boolean
    requiredMemberCount?: boolean
    role?: boolean
    roleLevel?: boolean
    workload?: boolean
    compensationRange?: boolean
    receivedDateFromAccount?: boolean
    account?: boolean
    smu?: boolean
    spoc?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    applications?: boolean | Engagement$applicationsArgs<ExtArgs>
    assignments?: boolean | Engagement$assignmentsArgs<ExtArgs>
    managers?: boolean | Engagement$managersArgs<ExtArgs>
    timesheetAudit?: boolean | Engagement$timesheetAuditArgs<ExtArgs>
    _count?: boolean | EngagementCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagement"]>

  export type EngagementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    title?: boolean
    description?: boolean
    durationStartDate?: boolean
    durationEndDate?: boolean
    durationWeeks?: boolean
    durationMonths?: boolean
    timeZones?: boolean
    countries?: boolean
    requiredSkills?: boolean
    anticipatedStart?: boolean
    status?: boolean
    isPrivate?: boolean
    requiredMemberCount?: boolean
    role?: boolean
    roleLevel?: boolean
    workload?: boolean
    compensationRange?: boolean
    receivedDateFromAccount?: boolean
    account?: boolean
    smu?: boolean
    spoc?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["engagement"]>

  export type EngagementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    projectId?: boolean
    title?: boolean
    description?: boolean
    durationStartDate?: boolean
    durationEndDate?: boolean
    durationWeeks?: boolean
    durationMonths?: boolean
    timeZones?: boolean
    countries?: boolean
    requiredSkills?: boolean
    anticipatedStart?: boolean
    status?: boolean
    isPrivate?: boolean
    requiredMemberCount?: boolean
    role?: boolean
    roleLevel?: boolean
    workload?: boolean
    compensationRange?: boolean
    receivedDateFromAccount?: boolean
    account?: boolean
    smu?: boolean
    spoc?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["engagement"]>

  export type EngagementSelectScalar = {
    id?: boolean
    projectId?: boolean
    title?: boolean
    description?: boolean
    durationStartDate?: boolean
    durationEndDate?: boolean
    durationWeeks?: boolean
    durationMonths?: boolean
    timeZones?: boolean
    countries?: boolean
    requiredSkills?: boolean
    anticipatedStart?: boolean
    status?: boolean
    isPrivate?: boolean
    requiredMemberCount?: boolean
    role?: boolean
    roleLevel?: boolean
    workload?: boolean
    compensationRange?: boolean
    receivedDateFromAccount?: boolean
    account?: boolean
    smu?: boolean
    spoc?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }

  export type EngagementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "title" | "description" | "durationStartDate" | "durationEndDate" | "durationWeeks" | "durationMonths" | "timeZones" | "countries" | "requiredSkills" | "anticipatedStart" | "status" | "isPrivate" | "requiredMemberCount" | "role" | "roleLevel" | "workload" | "compensationRange" | "receivedDateFromAccount" | "account" | "smu" | "spoc" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy", ExtArgs["result"]["engagement"]>
  export type EngagementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | Engagement$applicationsArgs<ExtArgs>
    assignments?: boolean | Engagement$assignmentsArgs<ExtArgs>
    managers?: boolean | Engagement$managersArgs<ExtArgs>
    timesheetAudit?: boolean | Engagement$timesheetAuditArgs<ExtArgs>
    _count?: boolean | EngagementCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EngagementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EngagementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EngagementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Engagement"
    objects: {
      applications: Prisma.$EngagementApplicationPayload<ExtArgs>[]
      assignments: Prisma.$EngagementAssignmentPayload<ExtArgs>[]
      managers: Prisma.$EngagementManagerPayload<ExtArgs>[]
      timesheetAudit: Prisma.$EngagementTimesheetAuditPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      projectId: string
      title: string
      description: string
      durationStartDate: Date | null
      durationEndDate: Date | null
      durationWeeks: number | null
      durationMonths: number | null
      timeZones: string[]
      countries: string[]
      requiredSkills: string[]
      anticipatedStart: $Enums.AnticipatedStart
      status: $Enums.EngagementStatus
      isPrivate: boolean
      requiredMemberCount: number | null
      role: $Enums.Role | null
      roleLevel: $Enums.RoleLevel | null
      workload: $Enums.Workload | null
      compensationRange: string | null
      receivedDateFromAccount: Date | null
      account: string | null
      smu: string | null
      spoc: string | null
      createdAt: Date
      createdBy: string
      updatedAt: Date
      updatedBy: string | null
    }, ExtArgs["result"]["engagement"]>
    composites: {}
  }

  type EngagementGetPayload<S extends boolean | null | undefined | EngagementDefaultArgs> = $Result.GetResult<Prisma.$EngagementPayload, S>

  type EngagementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EngagementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EngagementCountAggregateInputType | true
    }

  export interface EngagementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Engagement'], meta: { name: 'Engagement' } }
    /**
     * Find zero or one Engagement that matches the filter.
     * @param {EngagementFindUniqueArgs} args - Arguments to find a Engagement
     * @example
     * // Get one Engagement
     * const engagement = await prisma.engagement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EngagementFindUniqueArgs>(args: SelectSubset<T, EngagementFindUniqueArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Engagement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EngagementFindUniqueOrThrowArgs} args - Arguments to find a Engagement
     * @example
     * // Get one Engagement
     * const engagement = await prisma.engagement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EngagementFindUniqueOrThrowArgs>(args: SelectSubset<T, EngagementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Engagement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementFindFirstArgs} args - Arguments to find a Engagement
     * @example
     * // Get one Engagement
     * const engagement = await prisma.engagement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EngagementFindFirstArgs>(args?: SelectSubset<T, EngagementFindFirstArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Engagement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementFindFirstOrThrowArgs} args - Arguments to find a Engagement
     * @example
     * // Get one Engagement
     * const engagement = await prisma.engagement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EngagementFindFirstOrThrowArgs>(args?: SelectSubset<T, EngagementFindFirstOrThrowArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Engagements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Engagements
     * const engagements = await prisma.engagement.findMany()
     * 
     * // Get first 10 Engagements
     * const engagements = await prisma.engagement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const engagementWithIdOnly = await prisma.engagement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EngagementFindManyArgs>(args?: SelectSubset<T, EngagementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Engagement.
     * @param {EngagementCreateArgs} args - Arguments to create a Engagement.
     * @example
     * // Create one Engagement
     * const Engagement = await prisma.engagement.create({
     *   data: {
     *     // ... data to create a Engagement
     *   }
     * })
     * 
     */
    create<T extends EngagementCreateArgs>(args: SelectSubset<T, EngagementCreateArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Engagements.
     * @param {EngagementCreateManyArgs} args - Arguments to create many Engagements.
     * @example
     * // Create many Engagements
     * const engagement = await prisma.engagement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EngagementCreateManyArgs>(args?: SelectSubset<T, EngagementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Engagements and returns the data saved in the database.
     * @param {EngagementCreateManyAndReturnArgs} args - Arguments to create many Engagements.
     * @example
     * // Create many Engagements
     * const engagement = await prisma.engagement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Engagements and only return the `id`
     * const engagementWithIdOnly = await prisma.engagement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EngagementCreateManyAndReturnArgs>(args?: SelectSubset<T, EngagementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Engagement.
     * @param {EngagementDeleteArgs} args - Arguments to delete one Engagement.
     * @example
     * // Delete one Engagement
     * const Engagement = await prisma.engagement.delete({
     *   where: {
     *     // ... filter to delete one Engagement
     *   }
     * })
     * 
     */
    delete<T extends EngagementDeleteArgs>(args: SelectSubset<T, EngagementDeleteArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Engagement.
     * @param {EngagementUpdateArgs} args - Arguments to update one Engagement.
     * @example
     * // Update one Engagement
     * const engagement = await prisma.engagement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EngagementUpdateArgs>(args: SelectSubset<T, EngagementUpdateArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Engagements.
     * @param {EngagementDeleteManyArgs} args - Arguments to filter Engagements to delete.
     * @example
     * // Delete a few Engagements
     * const { count } = await prisma.engagement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EngagementDeleteManyArgs>(args?: SelectSubset<T, EngagementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Engagements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Engagements
     * const engagement = await prisma.engagement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EngagementUpdateManyArgs>(args: SelectSubset<T, EngagementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Engagements and returns the data updated in the database.
     * @param {EngagementUpdateManyAndReturnArgs} args - Arguments to update many Engagements.
     * @example
     * // Update many Engagements
     * const engagement = await prisma.engagement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Engagements and only return the `id`
     * const engagementWithIdOnly = await prisma.engagement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EngagementUpdateManyAndReturnArgs>(args: SelectSubset<T, EngagementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Engagement.
     * @param {EngagementUpsertArgs} args - Arguments to update or create a Engagement.
     * @example
     * // Update or create a Engagement
     * const engagement = await prisma.engagement.upsert({
     *   create: {
     *     // ... data to create a Engagement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Engagement we want to update
     *   }
     * })
     */
    upsert<T extends EngagementUpsertArgs>(args: SelectSubset<T, EngagementUpsertArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Engagements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementCountArgs} args - Arguments to filter Engagements to count.
     * @example
     * // Count the number of Engagements
     * const count = await prisma.engagement.count({
     *   where: {
     *     // ... the filter for the Engagements we want to count
     *   }
     * })
    **/
    count<T extends EngagementCountArgs>(
      args?: Subset<T, EngagementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EngagementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Engagement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EngagementAggregateArgs>(args: Subset<T, EngagementAggregateArgs>): Prisma.PrismaPromise<GetEngagementAggregateType<T>>

    /**
     * Group by Engagement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EngagementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EngagementGroupByArgs['orderBy'] }
        : { orderBy?: EngagementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EngagementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEngagementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Engagement model
   */
  readonly fields: EngagementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Engagement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EngagementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    applications<T extends Engagement$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Engagement$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignments<T extends Engagement$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Engagement$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    managers<T extends Engagement$managersArgs<ExtArgs> = {}>(args?: Subset<T, Engagement$managersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementManagerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    timesheetAudit<T extends Engagement$timesheetAuditArgs<ExtArgs> = {}>(args?: Subset<T, Engagement$timesheetAuditArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementTimesheetAuditPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Engagement model
   */
  interface EngagementFieldRefs {
    readonly id: FieldRef<"Engagement", 'String'>
    readonly projectId: FieldRef<"Engagement", 'String'>
    readonly title: FieldRef<"Engagement", 'String'>
    readonly description: FieldRef<"Engagement", 'String'>
    readonly durationStartDate: FieldRef<"Engagement", 'DateTime'>
    readonly durationEndDate: FieldRef<"Engagement", 'DateTime'>
    readonly durationWeeks: FieldRef<"Engagement", 'Int'>
    readonly durationMonths: FieldRef<"Engagement", 'Int'>
    readonly timeZones: FieldRef<"Engagement", 'String[]'>
    readonly countries: FieldRef<"Engagement", 'String[]'>
    readonly requiredSkills: FieldRef<"Engagement", 'String[]'>
    readonly anticipatedStart: FieldRef<"Engagement", 'AnticipatedStart'>
    readonly status: FieldRef<"Engagement", 'EngagementStatus'>
    readonly isPrivate: FieldRef<"Engagement", 'Boolean'>
    readonly requiredMemberCount: FieldRef<"Engagement", 'Int'>
    readonly role: FieldRef<"Engagement", 'Role'>
    readonly roleLevel: FieldRef<"Engagement", 'RoleLevel'>
    readonly workload: FieldRef<"Engagement", 'Workload'>
    readonly compensationRange: FieldRef<"Engagement", 'String'>
    readonly receivedDateFromAccount: FieldRef<"Engagement", 'DateTime'>
    readonly account: FieldRef<"Engagement", 'String'>
    readonly smu: FieldRef<"Engagement", 'String'>
    readonly spoc: FieldRef<"Engagement", 'String'>
    readonly createdAt: FieldRef<"Engagement", 'DateTime'>
    readonly createdBy: FieldRef<"Engagement", 'String'>
    readonly updatedAt: FieldRef<"Engagement", 'DateTime'>
    readonly updatedBy: FieldRef<"Engagement", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Engagement findUnique
   */
  export type EngagementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementInclude<ExtArgs> | null
    /**
     * Filter, which Engagement to fetch.
     */
    where: EngagementWhereUniqueInput
  }

  /**
   * Engagement findUniqueOrThrow
   */
  export type EngagementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementInclude<ExtArgs> | null
    /**
     * Filter, which Engagement to fetch.
     */
    where: EngagementWhereUniqueInput
  }

  /**
   * Engagement findFirst
   */
  export type EngagementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementInclude<ExtArgs> | null
    /**
     * Filter, which Engagement to fetch.
     */
    where?: EngagementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Engagements to fetch.
     */
    orderBy?: EngagementOrderByWithRelationInput | EngagementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Engagements.
     */
    cursor?: EngagementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Engagements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Engagements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Engagements.
     */
    distinct?: EngagementScalarFieldEnum | EngagementScalarFieldEnum[]
  }

  /**
   * Engagement findFirstOrThrow
   */
  export type EngagementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementInclude<ExtArgs> | null
    /**
     * Filter, which Engagement to fetch.
     */
    where?: EngagementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Engagements to fetch.
     */
    orderBy?: EngagementOrderByWithRelationInput | EngagementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Engagements.
     */
    cursor?: EngagementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Engagements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Engagements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Engagements.
     */
    distinct?: EngagementScalarFieldEnum | EngagementScalarFieldEnum[]
  }

  /**
   * Engagement findMany
   */
  export type EngagementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementInclude<ExtArgs> | null
    /**
     * Filter, which Engagements to fetch.
     */
    where?: EngagementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Engagements to fetch.
     */
    orderBy?: EngagementOrderByWithRelationInput | EngagementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Engagements.
     */
    cursor?: EngagementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Engagements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Engagements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Engagements.
     */
    distinct?: EngagementScalarFieldEnum | EngagementScalarFieldEnum[]
  }

  /**
   * Engagement create
   */
  export type EngagementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementInclude<ExtArgs> | null
    /**
     * The data needed to create a Engagement.
     */
    data: XOR<EngagementCreateInput, EngagementUncheckedCreateInput>
  }

  /**
   * Engagement createMany
   */
  export type EngagementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Engagements.
     */
    data: EngagementCreateManyInput | EngagementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Engagement createManyAndReturn
   */
  export type EngagementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * The data used to create many Engagements.
     */
    data: EngagementCreateManyInput | EngagementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Engagement update
   */
  export type EngagementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementInclude<ExtArgs> | null
    /**
     * The data needed to update a Engagement.
     */
    data: XOR<EngagementUpdateInput, EngagementUncheckedUpdateInput>
    /**
     * Choose, which Engagement to update.
     */
    where: EngagementWhereUniqueInput
  }

  /**
   * Engagement updateMany
   */
  export type EngagementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Engagements.
     */
    data: XOR<EngagementUpdateManyMutationInput, EngagementUncheckedUpdateManyInput>
    /**
     * Filter which Engagements to update
     */
    where?: EngagementWhereInput
    /**
     * Limit how many Engagements to update.
     */
    limit?: number
  }

  /**
   * Engagement updateManyAndReturn
   */
  export type EngagementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * The data used to update Engagements.
     */
    data: XOR<EngagementUpdateManyMutationInput, EngagementUncheckedUpdateManyInput>
    /**
     * Filter which Engagements to update
     */
    where?: EngagementWhereInput
    /**
     * Limit how many Engagements to update.
     */
    limit?: number
  }

  /**
   * Engagement upsert
   */
  export type EngagementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementInclude<ExtArgs> | null
    /**
     * The filter to search for the Engagement to update in case it exists.
     */
    where: EngagementWhereUniqueInput
    /**
     * In case the Engagement found by the `where` argument doesn't exist, create a new Engagement with this data.
     */
    create: XOR<EngagementCreateInput, EngagementUncheckedCreateInput>
    /**
     * In case the Engagement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EngagementUpdateInput, EngagementUncheckedUpdateInput>
  }

  /**
   * Engagement delete
   */
  export type EngagementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementInclude<ExtArgs> | null
    /**
     * Filter which Engagement to delete.
     */
    where: EngagementWhereUniqueInput
  }

  /**
   * Engagement deleteMany
   */
  export type EngagementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Engagements to delete
     */
    where?: EngagementWhereInput
    /**
     * Limit how many Engagements to delete.
     */
    limit?: number
  }

  /**
   * Engagement.applications
   */
  export type Engagement$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementApplication
     */
    select?: EngagementApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementApplication
     */
    omit?: EngagementApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementApplicationInclude<ExtArgs> | null
    where?: EngagementApplicationWhereInput
    orderBy?: EngagementApplicationOrderByWithRelationInput | EngagementApplicationOrderByWithRelationInput[]
    cursor?: EngagementApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EngagementApplicationScalarFieldEnum | EngagementApplicationScalarFieldEnum[]
  }

  /**
   * Engagement.assignments
   */
  export type Engagement$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementAssignment
     */
    select?: EngagementAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementAssignment
     */
    omit?: EngagementAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementAssignmentInclude<ExtArgs> | null
    where?: EngagementAssignmentWhereInput
    orderBy?: EngagementAssignmentOrderByWithRelationInput | EngagementAssignmentOrderByWithRelationInput[]
    cursor?: EngagementAssignmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EngagementAssignmentScalarFieldEnum | EngagementAssignmentScalarFieldEnum[]
  }

  /**
   * Engagement.managers
   */
  export type Engagement$managersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementManager
     */
    select?: EngagementManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementManager
     */
    omit?: EngagementManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementManagerInclude<ExtArgs> | null
    where?: EngagementManagerWhereInput
    orderBy?: EngagementManagerOrderByWithRelationInput | EngagementManagerOrderByWithRelationInput[]
    cursor?: EngagementManagerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EngagementManagerScalarFieldEnum | EngagementManagerScalarFieldEnum[]
  }

  /**
   * Engagement.timesheetAudit
   */
  export type Engagement$timesheetAuditArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetAudit
     */
    select?: EngagementTimesheetAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetAudit
     */
    omit?: EngagementTimesheetAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetAuditInclude<ExtArgs> | null
    where?: EngagementTimesheetAuditWhereInput
    orderBy?: EngagementTimesheetAuditOrderByWithRelationInput | EngagementTimesheetAuditOrderByWithRelationInput[]
    cursor?: EngagementTimesheetAuditWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EngagementTimesheetAuditScalarFieldEnum | EngagementTimesheetAuditScalarFieldEnum[]
  }

  /**
   * Engagement without action
   */
  export type EngagementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementInclude<ExtArgs> | null
  }


  /**
   * Model EngagementApplication
   */

  export type AggregateEngagementApplication = {
    _count: EngagementApplicationCountAggregateOutputType | null
    _avg: EngagementApplicationAvgAggregateOutputType | null
    _sum: EngagementApplicationSumAggregateOutputType | null
    _min: EngagementApplicationMinAggregateOutputType | null
    _max: EngagementApplicationMaxAggregateOutputType | null
  }

  export type EngagementApplicationAvgAggregateOutputType = {
    yearsOfExperience: number | null
  }

  export type EngagementApplicationSumAggregateOutputType = {
    yearsOfExperience: number | null
  }

  export type EngagementApplicationMinAggregateOutputType = {
    id: string | null
    engagementId: string | null
    userId: string | null
    handle: string | null
    email: string | null
    name: string | null
    address: string | null
    mobileNumber: string | null
    coverLetter: string | null
    resumeUrl: string | null
    cvFileUrl: string | null
    yearsOfExperience: number | null
    availability: string | null
    expectedPayRate: string | null
    referralSource: string | null
    status: $Enums.ApplicationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type EngagementApplicationMaxAggregateOutputType = {
    id: string | null
    engagementId: string | null
    userId: string | null
    handle: string | null
    email: string | null
    name: string | null
    address: string | null
    mobileNumber: string | null
    coverLetter: string | null
    resumeUrl: string | null
    cvFileUrl: string | null
    yearsOfExperience: number | null
    availability: string | null
    expectedPayRate: string | null
    referralSource: string | null
    status: $Enums.ApplicationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type EngagementApplicationCountAggregateOutputType = {
    id: number
    engagementId: number
    userId: number
    handle: number
    email: number
    name: number
    address: number
    mobileNumber: number
    coverLetter: number
    resumeUrl: number
    cvFileUrl: number
    portfolioUrls: number
    yearsOfExperience: number
    availability: number
    expectedPayRate: number
    referralSource: number
    status: number
    createdAt: number
    updatedAt: number
    updatedBy: number
    _all: number
  }


  export type EngagementApplicationAvgAggregateInputType = {
    yearsOfExperience?: true
  }

  export type EngagementApplicationSumAggregateInputType = {
    yearsOfExperience?: true
  }

  export type EngagementApplicationMinAggregateInputType = {
    id?: true
    engagementId?: true
    userId?: true
    handle?: true
    email?: true
    name?: true
    address?: true
    mobileNumber?: true
    coverLetter?: true
    resumeUrl?: true
    cvFileUrl?: true
    yearsOfExperience?: true
    availability?: true
    expectedPayRate?: true
    referralSource?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type EngagementApplicationMaxAggregateInputType = {
    id?: true
    engagementId?: true
    userId?: true
    handle?: true
    email?: true
    name?: true
    address?: true
    mobileNumber?: true
    coverLetter?: true
    resumeUrl?: true
    cvFileUrl?: true
    yearsOfExperience?: true
    availability?: true
    expectedPayRate?: true
    referralSource?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type EngagementApplicationCountAggregateInputType = {
    id?: true
    engagementId?: true
    userId?: true
    handle?: true
    email?: true
    name?: true
    address?: true
    mobileNumber?: true
    coverLetter?: true
    resumeUrl?: true
    cvFileUrl?: true
    portfolioUrls?: true
    yearsOfExperience?: true
    availability?: true
    expectedPayRate?: true
    referralSource?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
    _all?: true
  }

  export type EngagementApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EngagementApplication to aggregate.
     */
    where?: EngagementApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementApplications to fetch.
     */
    orderBy?: EngagementApplicationOrderByWithRelationInput | EngagementApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EngagementApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EngagementApplications
    **/
    _count?: true | EngagementApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EngagementApplicationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EngagementApplicationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EngagementApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EngagementApplicationMaxAggregateInputType
  }

  export type GetEngagementApplicationAggregateType<T extends EngagementApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateEngagementApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEngagementApplication[P]>
      : GetScalarType<T[P], AggregateEngagementApplication[P]>
  }




  export type EngagementApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EngagementApplicationWhereInput
    orderBy?: EngagementApplicationOrderByWithAggregationInput | EngagementApplicationOrderByWithAggregationInput[]
    by: EngagementApplicationScalarFieldEnum[] | EngagementApplicationScalarFieldEnum
    having?: EngagementApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EngagementApplicationCountAggregateInputType | true
    _avg?: EngagementApplicationAvgAggregateInputType
    _sum?: EngagementApplicationSumAggregateInputType
    _min?: EngagementApplicationMinAggregateInputType
    _max?: EngagementApplicationMaxAggregateInputType
  }

  export type EngagementApplicationGroupByOutputType = {
    id: string
    engagementId: string
    userId: string
    handle: string | null
    email: string
    name: string
    address: string | null
    mobileNumber: string | null
    coverLetter: string | null
    resumeUrl: string | null
    cvFileUrl: string | null
    portfolioUrls: string[]
    yearsOfExperience: number | null
    availability: string | null
    expectedPayRate: string | null
    referralSource: string | null
    status: $Enums.ApplicationStatus
    createdAt: Date
    updatedAt: Date
    updatedBy: string | null
    _count: EngagementApplicationCountAggregateOutputType | null
    _avg: EngagementApplicationAvgAggregateOutputType | null
    _sum: EngagementApplicationSumAggregateOutputType | null
    _min: EngagementApplicationMinAggregateOutputType | null
    _max: EngagementApplicationMaxAggregateOutputType | null
  }

  type GetEngagementApplicationGroupByPayload<T extends EngagementApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EngagementApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EngagementApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EngagementApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], EngagementApplicationGroupByOutputType[P]>
        }
      >
    >


  export type EngagementApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementId?: boolean
    userId?: boolean
    handle?: boolean
    email?: boolean
    name?: boolean
    address?: boolean
    mobileNumber?: boolean
    coverLetter?: boolean
    resumeUrl?: boolean
    cvFileUrl?: boolean
    portfolioUrls?: boolean
    yearsOfExperience?: boolean
    availability?: boolean
    expectedPayRate?: boolean
    referralSource?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagementApplication"]>

  export type EngagementApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementId?: boolean
    userId?: boolean
    handle?: boolean
    email?: boolean
    name?: boolean
    address?: boolean
    mobileNumber?: boolean
    coverLetter?: boolean
    resumeUrl?: boolean
    cvFileUrl?: boolean
    portfolioUrls?: boolean
    yearsOfExperience?: boolean
    availability?: boolean
    expectedPayRate?: boolean
    referralSource?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagementApplication"]>

  export type EngagementApplicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementId?: boolean
    userId?: boolean
    handle?: boolean
    email?: boolean
    name?: boolean
    address?: boolean
    mobileNumber?: boolean
    coverLetter?: boolean
    resumeUrl?: boolean
    cvFileUrl?: boolean
    portfolioUrls?: boolean
    yearsOfExperience?: boolean
    availability?: boolean
    expectedPayRate?: boolean
    referralSource?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagementApplication"]>

  export type EngagementApplicationSelectScalar = {
    id?: boolean
    engagementId?: boolean
    userId?: boolean
    handle?: boolean
    email?: boolean
    name?: boolean
    address?: boolean
    mobileNumber?: boolean
    coverLetter?: boolean
    resumeUrl?: boolean
    cvFileUrl?: boolean
    portfolioUrls?: boolean
    yearsOfExperience?: boolean
    availability?: boolean
    expectedPayRate?: boolean
    referralSource?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }

  export type EngagementApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "engagementId" | "userId" | "handle" | "email" | "name" | "address" | "mobileNumber" | "coverLetter" | "resumeUrl" | "cvFileUrl" | "portfolioUrls" | "yearsOfExperience" | "availability" | "expectedPayRate" | "referralSource" | "status" | "createdAt" | "updatedAt" | "updatedBy", ExtArgs["result"]["engagementApplication"]>
  export type EngagementApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
  }
  export type EngagementApplicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
  }
  export type EngagementApplicationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
  }

  export type $EngagementApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EngagementApplication"
    objects: {
      engagement: Prisma.$EngagementPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      engagementId: string
      userId: string
      handle: string | null
      email: string
      name: string
      address: string | null
      mobileNumber: string | null
      coverLetter: string | null
      /**
       * Link to the applicant's resume or professional profile (LinkedIn profile, Google Drive CV, website).
       */
      resumeUrl: string | null
      /**
       * URL of the CV file the applicant uploaded through Filestack (stored in S3).
       */
      cvFileUrl: string | null
      portfolioUrls: string[]
      yearsOfExperience: number | null
      availability: string | null
      /**
       * Pay rate the applicant expects for the engagement, as entered by the applicant (e.g. "$50/hour").
       */
      expectedPayRate: string | null
      /**
       * How the applicant came to know of the opportunity.
       */
      referralSource: string | null
      status: $Enums.ApplicationStatus
      createdAt: Date
      updatedAt: Date
      updatedBy: string | null
    }, ExtArgs["result"]["engagementApplication"]>
    composites: {}
  }

  type EngagementApplicationGetPayload<S extends boolean | null | undefined | EngagementApplicationDefaultArgs> = $Result.GetResult<Prisma.$EngagementApplicationPayload, S>

  type EngagementApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EngagementApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EngagementApplicationCountAggregateInputType | true
    }

  export interface EngagementApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EngagementApplication'], meta: { name: 'EngagementApplication' } }
    /**
     * Find zero or one EngagementApplication that matches the filter.
     * @param {EngagementApplicationFindUniqueArgs} args - Arguments to find a EngagementApplication
     * @example
     * // Get one EngagementApplication
     * const engagementApplication = await prisma.engagementApplication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EngagementApplicationFindUniqueArgs>(args: SelectSubset<T, EngagementApplicationFindUniqueArgs<ExtArgs>>): Prisma__EngagementApplicationClient<$Result.GetResult<Prisma.$EngagementApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EngagementApplication that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EngagementApplicationFindUniqueOrThrowArgs} args - Arguments to find a EngagementApplication
     * @example
     * // Get one EngagementApplication
     * const engagementApplication = await prisma.engagementApplication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EngagementApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, EngagementApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EngagementApplicationClient<$Result.GetResult<Prisma.$EngagementApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EngagementApplication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementApplicationFindFirstArgs} args - Arguments to find a EngagementApplication
     * @example
     * // Get one EngagementApplication
     * const engagementApplication = await prisma.engagementApplication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EngagementApplicationFindFirstArgs>(args?: SelectSubset<T, EngagementApplicationFindFirstArgs<ExtArgs>>): Prisma__EngagementApplicationClient<$Result.GetResult<Prisma.$EngagementApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EngagementApplication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementApplicationFindFirstOrThrowArgs} args - Arguments to find a EngagementApplication
     * @example
     * // Get one EngagementApplication
     * const engagementApplication = await prisma.engagementApplication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EngagementApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, EngagementApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__EngagementApplicationClient<$Result.GetResult<Prisma.$EngagementApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EngagementApplications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EngagementApplications
     * const engagementApplications = await prisma.engagementApplication.findMany()
     * 
     * // Get first 10 EngagementApplications
     * const engagementApplications = await prisma.engagementApplication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const engagementApplicationWithIdOnly = await prisma.engagementApplication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EngagementApplicationFindManyArgs>(args?: SelectSubset<T, EngagementApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EngagementApplication.
     * @param {EngagementApplicationCreateArgs} args - Arguments to create a EngagementApplication.
     * @example
     * // Create one EngagementApplication
     * const EngagementApplication = await prisma.engagementApplication.create({
     *   data: {
     *     // ... data to create a EngagementApplication
     *   }
     * })
     * 
     */
    create<T extends EngagementApplicationCreateArgs>(args: SelectSubset<T, EngagementApplicationCreateArgs<ExtArgs>>): Prisma__EngagementApplicationClient<$Result.GetResult<Prisma.$EngagementApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EngagementApplications.
     * @param {EngagementApplicationCreateManyArgs} args - Arguments to create many EngagementApplications.
     * @example
     * // Create many EngagementApplications
     * const engagementApplication = await prisma.engagementApplication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EngagementApplicationCreateManyArgs>(args?: SelectSubset<T, EngagementApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EngagementApplications and returns the data saved in the database.
     * @param {EngagementApplicationCreateManyAndReturnArgs} args - Arguments to create many EngagementApplications.
     * @example
     * // Create many EngagementApplications
     * const engagementApplication = await prisma.engagementApplication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EngagementApplications and only return the `id`
     * const engagementApplicationWithIdOnly = await prisma.engagementApplication.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EngagementApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, EngagementApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementApplicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EngagementApplication.
     * @param {EngagementApplicationDeleteArgs} args - Arguments to delete one EngagementApplication.
     * @example
     * // Delete one EngagementApplication
     * const EngagementApplication = await prisma.engagementApplication.delete({
     *   where: {
     *     // ... filter to delete one EngagementApplication
     *   }
     * })
     * 
     */
    delete<T extends EngagementApplicationDeleteArgs>(args: SelectSubset<T, EngagementApplicationDeleteArgs<ExtArgs>>): Prisma__EngagementApplicationClient<$Result.GetResult<Prisma.$EngagementApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EngagementApplication.
     * @param {EngagementApplicationUpdateArgs} args - Arguments to update one EngagementApplication.
     * @example
     * // Update one EngagementApplication
     * const engagementApplication = await prisma.engagementApplication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EngagementApplicationUpdateArgs>(args: SelectSubset<T, EngagementApplicationUpdateArgs<ExtArgs>>): Prisma__EngagementApplicationClient<$Result.GetResult<Prisma.$EngagementApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EngagementApplications.
     * @param {EngagementApplicationDeleteManyArgs} args - Arguments to filter EngagementApplications to delete.
     * @example
     * // Delete a few EngagementApplications
     * const { count } = await prisma.engagementApplication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EngagementApplicationDeleteManyArgs>(args?: SelectSubset<T, EngagementApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EngagementApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EngagementApplications
     * const engagementApplication = await prisma.engagementApplication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EngagementApplicationUpdateManyArgs>(args: SelectSubset<T, EngagementApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EngagementApplications and returns the data updated in the database.
     * @param {EngagementApplicationUpdateManyAndReturnArgs} args - Arguments to update many EngagementApplications.
     * @example
     * // Update many EngagementApplications
     * const engagementApplication = await prisma.engagementApplication.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EngagementApplications and only return the `id`
     * const engagementApplicationWithIdOnly = await prisma.engagementApplication.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EngagementApplicationUpdateManyAndReturnArgs>(args: SelectSubset<T, EngagementApplicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementApplicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EngagementApplication.
     * @param {EngagementApplicationUpsertArgs} args - Arguments to update or create a EngagementApplication.
     * @example
     * // Update or create a EngagementApplication
     * const engagementApplication = await prisma.engagementApplication.upsert({
     *   create: {
     *     // ... data to create a EngagementApplication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EngagementApplication we want to update
     *   }
     * })
     */
    upsert<T extends EngagementApplicationUpsertArgs>(args: SelectSubset<T, EngagementApplicationUpsertArgs<ExtArgs>>): Prisma__EngagementApplicationClient<$Result.GetResult<Prisma.$EngagementApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EngagementApplications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementApplicationCountArgs} args - Arguments to filter EngagementApplications to count.
     * @example
     * // Count the number of EngagementApplications
     * const count = await prisma.engagementApplication.count({
     *   where: {
     *     // ... the filter for the EngagementApplications we want to count
     *   }
     * })
    **/
    count<T extends EngagementApplicationCountArgs>(
      args?: Subset<T, EngagementApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EngagementApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EngagementApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EngagementApplicationAggregateArgs>(args: Subset<T, EngagementApplicationAggregateArgs>): Prisma.PrismaPromise<GetEngagementApplicationAggregateType<T>>

    /**
     * Group by EngagementApplication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementApplicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EngagementApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EngagementApplicationGroupByArgs['orderBy'] }
        : { orderBy?: EngagementApplicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EngagementApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEngagementApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EngagementApplication model
   */
  readonly fields: EngagementApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EngagementApplication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EngagementApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    engagement<T extends EngagementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EngagementDefaultArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EngagementApplication model
   */
  interface EngagementApplicationFieldRefs {
    readonly id: FieldRef<"EngagementApplication", 'String'>
    readonly engagementId: FieldRef<"EngagementApplication", 'String'>
    readonly userId: FieldRef<"EngagementApplication", 'String'>
    readonly handle: FieldRef<"EngagementApplication", 'String'>
    readonly email: FieldRef<"EngagementApplication", 'String'>
    readonly name: FieldRef<"EngagementApplication", 'String'>
    readonly address: FieldRef<"EngagementApplication", 'String'>
    readonly mobileNumber: FieldRef<"EngagementApplication", 'String'>
    readonly coverLetter: FieldRef<"EngagementApplication", 'String'>
    readonly resumeUrl: FieldRef<"EngagementApplication", 'String'>
    readonly cvFileUrl: FieldRef<"EngagementApplication", 'String'>
    readonly portfolioUrls: FieldRef<"EngagementApplication", 'String[]'>
    readonly yearsOfExperience: FieldRef<"EngagementApplication", 'Int'>
    readonly availability: FieldRef<"EngagementApplication", 'String'>
    readonly expectedPayRate: FieldRef<"EngagementApplication", 'String'>
    readonly referralSource: FieldRef<"EngagementApplication", 'String'>
    readonly status: FieldRef<"EngagementApplication", 'ApplicationStatus'>
    readonly createdAt: FieldRef<"EngagementApplication", 'DateTime'>
    readonly updatedAt: FieldRef<"EngagementApplication", 'DateTime'>
    readonly updatedBy: FieldRef<"EngagementApplication", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EngagementApplication findUnique
   */
  export type EngagementApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementApplication
     */
    select?: EngagementApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementApplication
     */
    omit?: EngagementApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementApplicationInclude<ExtArgs> | null
    /**
     * Filter, which EngagementApplication to fetch.
     */
    where: EngagementApplicationWhereUniqueInput
  }

  /**
   * EngagementApplication findUniqueOrThrow
   */
  export type EngagementApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementApplication
     */
    select?: EngagementApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementApplication
     */
    omit?: EngagementApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementApplicationInclude<ExtArgs> | null
    /**
     * Filter, which EngagementApplication to fetch.
     */
    where: EngagementApplicationWhereUniqueInput
  }

  /**
   * EngagementApplication findFirst
   */
  export type EngagementApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementApplication
     */
    select?: EngagementApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementApplication
     */
    omit?: EngagementApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementApplicationInclude<ExtArgs> | null
    /**
     * Filter, which EngagementApplication to fetch.
     */
    where?: EngagementApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementApplications to fetch.
     */
    orderBy?: EngagementApplicationOrderByWithRelationInput | EngagementApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EngagementApplications.
     */
    cursor?: EngagementApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementApplications.
     */
    distinct?: EngagementApplicationScalarFieldEnum | EngagementApplicationScalarFieldEnum[]
  }

  /**
   * EngagementApplication findFirstOrThrow
   */
  export type EngagementApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementApplication
     */
    select?: EngagementApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementApplication
     */
    omit?: EngagementApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementApplicationInclude<ExtArgs> | null
    /**
     * Filter, which EngagementApplication to fetch.
     */
    where?: EngagementApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementApplications to fetch.
     */
    orderBy?: EngagementApplicationOrderByWithRelationInput | EngagementApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EngagementApplications.
     */
    cursor?: EngagementApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementApplications.
     */
    distinct?: EngagementApplicationScalarFieldEnum | EngagementApplicationScalarFieldEnum[]
  }

  /**
   * EngagementApplication findMany
   */
  export type EngagementApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementApplication
     */
    select?: EngagementApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementApplication
     */
    omit?: EngagementApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementApplicationInclude<ExtArgs> | null
    /**
     * Filter, which EngagementApplications to fetch.
     */
    where?: EngagementApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementApplications to fetch.
     */
    orderBy?: EngagementApplicationOrderByWithRelationInput | EngagementApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EngagementApplications.
     */
    cursor?: EngagementApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementApplications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementApplications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementApplications.
     */
    distinct?: EngagementApplicationScalarFieldEnum | EngagementApplicationScalarFieldEnum[]
  }

  /**
   * EngagementApplication create
   */
  export type EngagementApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementApplication
     */
    select?: EngagementApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementApplication
     */
    omit?: EngagementApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a EngagementApplication.
     */
    data: XOR<EngagementApplicationCreateInput, EngagementApplicationUncheckedCreateInput>
  }

  /**
   * EngagementApplication createMany
   */
  export type EngagementApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EngagementApplications.
     */
    data: EngagementApplicationCreateManyInput | EngagementApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EngagementApplication createManyAndReturn
   */
  export type EngagementApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementApplication
     */
    select?: EngagementApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementApplication
     */
    omit?: EngagementApplicationOmit<ExtArgs> | null
    /**
     * The data used to create many EngagementApplications.
     */
    data: EngagementApplicationCreateManyInput | EngagementApplicationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementApplicationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EngagementApplication update
   */
  export type EngagementApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementApplication
     */
    select?: EngagementApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementApplication
     */
    omit?: EngagementApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a EngagementApplication.
     */
    data: XOR<EngagementApplicationUpdateInput, EngagementApplicationUncheckedUpdateInput>
    /**
     * Choose, which EngagementApplication to update.
     */
    where: EngagementApplicationWhereUniqueInput
  }

  /**
   * EngagementApplication updateMany
   */
  export type EngagementApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EngagementApplications.
     */
    data: XOR<EngagementApplicationUpdateManyMutationInput, EngagementApplicationUncheckedUpdateManyInput>
    /**
     * Filter which EngagementApplications to update
     */
    where?: EngagementApplicationWhereInput
    /**
     * Limit how many EngagementApplications to update.
     */
    limit?: number
  }

  /**
   * EngagementApplication updateManyAndReturn
   */
  export type EngagementApplicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementApplication
     */
    select?: EngagementApplicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementApplication
     */
    omit?: EngagementApplicationOmit<ExtArgs> | null
    /**
     * The data used to update EngagementApplications.
     */
    data: XOR<EngagementApplicationUpdateManyMutationInput, EngagementApplicationUncheckedUpdateManyInput>
    /**
     * Filter which EngagementApplications to update
     */
    where?: EngagementApplicationWhereInput
    /**
     * Limit how many EngagementApplications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementApplicationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EngagementApplication upsert
   */
  export type EngagementApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementApplication
     */
    select?: EngagementApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementApplication
     */
    omit?: EngagementApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the EngagementApplication to update in case it exists.
     */
    where: EngagementApplicationWhereUniqueInput
    /**
     * In case the EngagementApplication found by the `where` argument doesn't exist, create a new EngagementApplication with this data.
     */
    create: XOR<EngagementApplicationCreateInput, EngagementApplicationUncheckedCreateInput>
    /**
     * In case the EngagementApplication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EngagementApplicationUpdateInput, EngagementApplicationUncheckedUpdateInput>
  }

  /**
   * EngagementApplication delete
   */
  export type EngagementApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementApplication
     */
    select?: EngagementApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementApplication
     */
    omit?: EngagementApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementApplicationInclude<ExtArgs> | null
    /**
     * Filter which EngagementApplication to delete.
     */
    where: EngagementApplicationWhereUniqueInput
  }

  /**
   * EngagementApplication deleteMany
   */
  export type EngagementApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EngagementApplications to delete
     */
    where?: EngagementApplicationWhereInput
    /**
     * Limit how many EngagementApplications to delete.
     */
    limit?: number
  }

  /**
   * EngagementApplication without action
   */
  export type EngagementApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementApplication
     */
    select?: EngagementApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementApplication
     */
    omit?: EngagementApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementApplicationInclude<ExtArgs> | null
  }


  /**
   * Model EngagementAssignment
   */

  export type AggregateEngagementAssignment = {
    _count: EngagementAssignmentCountAggregateOutputType | null
    _avg: EngagementAssignmentAvgAggregateOutputType | null
    _sum: EngagementAssignmentSumAggregateOutputType | null
    _min: EngagementAssignmentMinAggregateOutputType | null
    _max: EngagementAssignmentMaxAggregateOutputType | null
  }

  export type EngagementAssignmentAvgAggregateOutputType = {
    standardHoursPerDay: number | null
    totalHours: number | null
    standardHoursPerWeek: number | null
    durationMonths: number | null
  }

  export type EngagementAssignmentSumAggregateOutputType = {
    standardHoursPerDay: number | null
    totalHours: number | null
    standardHoursPerWeek: number | null
    durationMonths: number | null
  }

  export type EngagementAssignmentMinAggregateOutputType = {
    id: string | null
    engagementId: string | null
    memberId: string | null
    memberHandle: string | null
    status: $Enums.AssignmentStatus | null
    acceptedAt: Date | null
    agreementRate: string | null
    ratePerHour: string | null
    paymentCycle: $Enums.PaymentCycle | null
    standardHoursPerDay: number | null
    totalHours: number | null
    standardHoursPerWeek: number | null
    durationMonths: number | null
    otherRemarks: string | null
    terminationReason: string | null
    startDate: Date | null
    endDate: Date | null
    wiproIdEndDate: Date | null
    candidateWiproId: string | null
    source: $Enums.AssignmentSource | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EngagementAssignmentMaxAggregateOutputType = {
    id: string | null
    engagementId: string | null
    memberId: string | null
    memberHandle: string | null
    status: $Enums.AssignmentStatus | null
    acceptedAt: Date | null
    agreementRate: string | null
    ratePerHour: string | null
    paymentCycle: $Enums.PaymentCycle | null
    standardHoursPerDay: number | null
    totalHours: number | null
    standardHoursPerWeek: number | null
    durationMonths: number | null
    otherRemarks: string | null
    terminationReason: string | null
    startDate: Date | null
    endDate: Date | null
    wiproIdEndDate: Date | null
    candidateWiproId: string | null
    source: $Enums.AssignmentSource | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EngagementAssignmentCountAggregateOutputType = {
    id: number
    engagementId: number
    memberId: number
    memberHandle: number
    status: number
    acceptedAt: number
    agreementRate: number
    ratePerHour: number
    paymentCycle: number
    standardHoursPerDay: number
    totalHours: number
    standardHoursPerWeek: number
    durationMonths: number
    otherRemarks: number
    terminationReason: number
    startDate: number
    endDate: number
    wiproIdEndDate: number
    candidateWiproId: number
    source: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EngagementAssignmentAvgAggregateInputType = {
    standardHoursPerDay?: true
    totalHours?: true
    standardHoursPerWeek?: true
    durationMonths?: true
  }

  export type EngagementAssignmentSumAggregateInputType = {
    standardHoursPerDay?: true
    totalHours?: true
    standardHoursPerWeek?: true
    durationMonths?: true
  }

  export type EngagementAssignmentMinAggregateInputType = {
    id?: true
    engagementId?: true
    memberId?: true
    memberHandle?: true
    status?: true
    acceptedAt?: true
    agreementRate?: true
    ratePerHour?: true
    paymentCycle?: true
    standardHoursPerDay?: true
    totalHours?: true
    standardHoursPerWeek?: true
    durationMonths?: true
    otherRemarks?: true
    terminationReason?: true
    startDate?: true
    endDate?: true
    wiproIdEndDate?: true
    candidateWiproId?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EngagementAssignmentMaxAggregateInputType = {
    id?: true
    engagementId?: true
    memberId?: true
    memberHandle?: true
    status?: true
    acceptedAt?: true
    agreementRate?: true
    ratePerHour?: true
    paymentCycle?: true
    standardHoursPerDay?: true
    totalHours?: true
    standardHoursPerWeek?: true
    durationMonths?: true
    otherRemarks?: true
    terminationReason?: true
    startDate?: true
    endDate?: true
    wiproIdEndDate?: true
    candidateWiproId?: true
    source?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EngagementAssignmentCountAggregateInputType = {
    id?: true
    engagementId?: true
    memberId?: true
    memberHandle?: true
    status?: true
    acceptedAt?: true
    agreementRate?: true
    ratePerHour?: true
    paymentCycle?: true
    standardHoursPerDay?: true
    totalHours?: true
    standardHoursPerWeek?: true
    durationMonths?: true
    otherRemarks?: true
    terminationReason?: true
    startDate?: true
    endDate?: true
    wiproIdEndDate?: true
    candidateWiproId?: true
    source?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EngagementAssignmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EngagementAssignment to aggregate.
     */
    where?: EngagementAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementAssignments to fetch.
     */
    orderBy?: EngagementAssignmentOrderByWithRelationInput | EngagementAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EngagementAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EngagementAssignments
    **/
    _count?: true | EngagementAssignmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EngagementAssignmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EngagementAssignmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EngagementAssignmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EngagementAssignmentMaxAggregateInputType
  }

  export type GetEngagementAssignmentAggregateType<T extends EngagementAssignmentAggregateArgs> = {
        [P in keyof T & keyof AggregateEngagementAssignment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEngagementAssignment[P]>
      : GetScalarType<T[P], AggregateEngagementAssignment[P]>
  }




  export type EngagementAssignmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EngagementAssignmentWhereInput
    orderBy?: EngagementAssignmentOrderByWithAggregationInput | EngagementAssignmentOrderByWithAggregationInput[]
    by: EngagementAssignmentScalarFieldEnum[] | EngagementAssignmentScalarFieldEnum
    having?: EngagementAssignmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EngagementAssignmentCountAggregateInputType | true
    _avg?: EngagementAssignmentAvgAggregateInputType
    _sum?: EngagementAssignmentSumAggregateInputType
    _min?: EngagementAssignmentMinAggregateInputType
    _max?: EngagementAssignmentMaxAggregateInputType
  }

  export type EngagementAssignmentGroupByOutputType = {
    id: string
    engagementId: string
    memberId: string
    memberHandle: string
    status: $Enums.AssignmentStatus
    acceptedAt: Date | null
    agreementRate: string | null
    ratePerHour: string | null
    paymentCycle: $Enums.PaymentCycle
    standardHoursPerDay: number | null
    totalHours: number | null
    standardHoursPerWeek: number | null
    durationMonths: number | null
    otherRemarks: string | null
    terminationReason: string | null
    startDate: Date | null
    endDate: Date | null
    wiproIdEndDate: Date | null
    candidateWiproId: string | null
    source: $Enums.AssignmentSource | null
    createdAt: Date
    updatedAt: Date
    _count: EngagementAssignmentCountAggregateOutputType | null
    _avg: EngagementAssignmentAvgAggregateOutputType | null
    _sum: EngagementAssignmentSumAggregateOutputType | null
    _min: EngagementAssignmentMinAggregateOutputType | null
    _max: EngagementAssignmentMaxAggregateOutputType | null
  }

  type GetEngagementAssignmentGroupByPayload<T extends EngagementAssignmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EngagementAssignmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EngagementAssignmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EngagementAssignmentGroupByOutputType[P]>
            : GetScalarType<T[P], EngagementAssignmentGroupByOutputType[P]>
        }
      >
    >


  export type EngagementAssignmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementId?: boolean
    memberId?: boolean
    memberHandle?: boolean
    status?: boolean
    acceptedAt?: boolean
    agreementRate?: boolean
    ratePerHour?: boolean
    paymentCycle?: boolean
    standardHoursPerDay?: boolean
    totalHours?: boolean
    standardHoursPerWeek?: boolean
    durationMonths?: boolean
    otherRemarks?: boolean
    terminationReason?: boolean
    startDate?: boolean
    endDate?: boolean
    wiproIdEndDate?: boolean
    candidateWiproId?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
    feedback?: boolean | EngagementAssignment$feedbackArgs<ExtArgs>
    memberExperiences?: boolean | EngagementAssignment$memberExperiencesArgs<ExtArgs>
    timesheetEntries?: boolean | EngagementAssignment$timesheetEntriesArgs<ExtArgs>
    _count?: boolean | EngagementAssignmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagementAssignment"]>

  export type EngagementAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementId?: boolean
    memberId?: boolean
    memberHandle?: boolean
    status?: boolean
    acceptedAt?: boolean
    agreementRate?: boolean
    ratePerHour?: boolean
    paymentCycle?: boolean
    standardHoursPerDay?: boolean
    totalHours?: boolean
    standardHoursPerWeek?: boolean
    durationMonths?: boolean
    otherRemarks?: boolean
    terminationReason?: boolean
    startDate?: boolean
    endDate?: boolean
    wiproIdEndDate?: boolean
    candidateWiproId?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagementAssignment"]>

  export type EngagementAssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementId?: boolean
    memberId?: boolean
    memberHandle?: boolean
    status?: boolean
    acceptedAt?: boolean
    agreementRate?: boolean
    ratePerHour?: boolean
    paymentCycle?: boolean
    standardHoursPerDay?: boolean
    totalHours?: boolean
    standardHoursPerWeek?: boolean
    durationMonths?: boolean
    otherRemarks?: boolean
    terminationReason?: boolean
    startDate?: boolean
    endDate?: boolean
    wiproIdEndDate?: boolean
    candidateWiproId?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagementAssignment"]>

  export type EngagementAssignmentSelectScalar = {
    id?: boolean
    engagementId?: boolean
    memberId?: boolean
    memberHandle?: boolean
    status?: boolean
    acceptedAt?: boolean
    agreementRate?: boolean
    ratePerHour?: boolean
    paymentCycle?: boolean
    standardHoursPerDay?: boolean
    totalHours?: boolean
    standardHoursPerWeek?: boolean
    durationMonths?: boolean
    otherRemarks?: boolean
    terminationReason?: boolean
    startDate?: boolean
    endDate?: boolean
    wiproIdEndDate?: boolean
    candidateWiproId?: boolean
    source?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EngagementAssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "engagementId" | "memberId" | "memberHandle" | "status" | "acceptedAt" | "agreementRate" | "ratePerHour" | "paymentCycle" | "standardHoursPerDay" | "totalHours" | "standardHoursPerWeek" | "durationMonths" | "otherRemarks" | "terminationReason" | "startDate" | "endDate" | "wiproIdEndDate" | "candidateWiproId" | "source" | "createdAt" | "updatedAt", ExtArgs["result"]["engagementAssignment"]>
  export type EngagementAssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
    feedback?: boolean | EngagementAssignment$feedbackArgs<ExtArgs>
    memberExperiences?: boolean | EngagementAssignment$memberExperiencesArgs<ExtArgs>
    timesheetEntries?: boolean | EngagementAssignment$timesheetEntriesArgs<ExtArgs>
    _count?: boolean | EngagementAssignmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EngagementAssignmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
  }
  export type EngagementAssignmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
  }

  export type $EngagementAssignmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EngagementAssignment"
    objects: {
      engagement: Prisma.$EngagementPayload<ExtArgs>
      feedback: Prisma.$EngagementFeedbackPayload<ExtArgs>[]
      memberExperiences: Prisma.$MemberExperiencePayload<ExtArgs>[]
      timesheetEntries: Prisma.$EngagementTimesheetEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      engagementId: string
      memberId: string
      memberHandle: string
      status: $Enums.AssignmentStatus
      /**
       * First recorded acceptance; null for legacy assignments without a known acceptance date.
       */
      acceptedAt: Date | null
      agreementRate: string | null
      ratePerHour: string | null
      paymentCycle: $Enums.PaymentCycle
      standardHoursPerDay: number | null
      /**
       * Hours allocated to the assignment overall. Optional; hours left are derived from it.
       */
      totalHours: number | null
      /**
       * @deprecated Use standardHoursPerDay instead.
       */
      standardHoursPerWeek: number | null
      durationMonths: number | null
      otherRemarks: string | null
      terminationReason: string | null
      startDate: Date | null
      endDate: Date | null
      wiproIdEndDate: Date | null
      candidateWiproId: string | null
      source: $Enums.AssignmentSource | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["engagementAssignment"]>
    composites: {}
  }

  type EngagementAssignmentGetPayload<S extends boolean | null | undefined | EngagementAssignmentDefaultArgs> = $Result.GetResult<Prisma.$EngagementAssignmentPayload, S>

  type EngagementAssignmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EngagementAssignmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EngagementAssignmentCountAggregateInputType | true
    }

  export interface EngagementAssignmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EngagementAssignment'], meta: { name: 'EngagementAssignment' } }
    /**
     * Find zero or one EngagementAssignment that matches the filter.
     * @param {EngagementAssignmentFindUniqueArgs} args - Arguments to find a EngagementAssignment
     * @example
     * // Get one EngagementAssignment
     * const engagementAssignment = await prisma.engagementAssignment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EngagementAssignmentFindUniqueArgs>(args: SelectSubset<T, EngagementAssignmentFindUniqueArgs<ExtArgs>>): Prisma__EngagementAssignmentClient<$Result.GetResult<Prisma.$EngagementAssignmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EngagementAssignment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EngagementAssignmentFindUniqueOrThrowArgs} args - Arguments to find a EngagementAssignment
     * @example
     * // Get one EngagementAssignment
     * const engagementAssignment = await prisma.engagementAssignment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EngagementAssignmentFindUniqueOrThrowArgs>(args: SelectSubset<T, EngagementAssignmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EngagementAssignmentClient<$Result.GetResult<Prisma.$EngagementAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EngagementAssignment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementAssignmentFindFirstArgs} args - Arguments to find a EngagementAssignment
     * @example
     * // Get one EngagementAssignment
     * const engagementAssignment = await prisma.engagementAssignment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EngagementAssignmentFindFirstArgs>(args?: SelectSubset<T, EngagementAssignmentFindFirstArgs<ExtArgs>>): Prisma__EngagementAssignmentClient<$Result.GetResult<Prisma.$EngagementAssignmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EngagementAssignment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementAssignmentFindFirstOrThrowArgs} args - Arguments to find a EngagementAssignment
     * @example
     * // Get one EngagementAssignment
     * const engagementAssignment = await prisma.engagementAssignment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EngagementAssignmentFindFirstOrThrowArgs>(args?: SelectSubset<T, EngagementAssignmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__EngagementAssignmentClient<$Result.GetResult<Prisma.$EngagementAssignmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EngagementAssignments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementAssignmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EngagementAssignments
     * const engagementAssignments = await prisma.engagementAssignment.findMany()
     * 
     * // Get first 10 EngagementAssignments
     * const engagementAssignments = await prisma.engagementAssignment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const engagementAssignmentWithIdOnly = await prisma.engagementAssignment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EngagementAssignmentFindManyArgs>(args?: SelectSubset<T, EngagementAssignmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementAssignmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EngagementAssignment.
     * @param {EngagementAssignmentCreateArgs} args - Arguments to create a EngagementAssignment.
     * @example
     * // Create one EngagementAssignment
     * const EngagementAssignment = await prisma.engagementAssignment.create({
     *   data: {
     *     // ... data to create a EngagementAssignment
     *   }
     * })
     * 
     */
    create<T extends EngagementAssignmentCreateArgs>(args: SelectSubset<T, EngagementAssignmentCreateArgs<ExtArgs>>): Prisma__EngagementAssignmentClient<$Result.GetResult<Prisma.$EngagementAssignmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EngagementAssignments.
     * @param {EngagementAssignmentCreateManyArgs} args - Arguments to create many EngagementAssignments.
     * @example
     * // Create many EngagementAssignments
     * const engagementAssignment = await prisma.engagementAssignment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EngagementAssignmentCreateManyArgs>(args?: SelectSubset<T, EngagementAssignmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EngagementAssignments and returns the data saved in the database.
     * @param {EngagementAssignmentCreateManyAndReturnArgs} args - Arguments to create many EngagementAssignments.
     * @example
     * // Create many EngagementAssignments
     * const engagementAssignment = await prisma.engagementAssignment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EngagementAssignments and only return the `id`
     * const engagementAssignmentWithIdOnly = await prisma.engagementAssignment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EngagementAssignmentCreateManyAndReturnArgs>(args?: SelectSubset<T, EngagementAssignmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementAssignmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EngagementAssignment.
     * @param {EngagementAssignmentDeleteArgs} args - Arguments to delete one EngagementAssignment.
     * @example
     * // Delete one EngagementAssignment
     * const EngagementAssignment = await prisma.engagementAssignment.delete({
     *   where: {
     *     // ... filter to delete one EngagementAssignment
     *   }
     * })
     * 
     */
    delete<T extends EngagementAssignmentDeleteArgs>(args: SelectSubset<T, EngagementAssignmentDeleteArgs<ExtArgs>>): Prisma__EngagementAssignmentClient<$Result.GetResult<Prisma.$EngagementAssignmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EngagementAssignment.
     * @param {EngagementAssignmentUpdateArgs} args - Arguments to update one EngagementAssignment.
     * @example
     * // Update one EngagementAssignment
     * const engagementAssignment = await prisma.engagementAssignment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EngagementAssignmentUpdateArgs>(args: SelectSubset<T, EngagementAssignmentUpdateArgs<ExtArgs>>): Prisma__EngagementAssignmentClient<$Result.GetResult<Prisma.$EngagementAssignmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EngagementAssignments.
     * @param {EngagementAssignmentDeleteManyArgs} args - Arguments to filter EngagementAssignments to delete.
     * @example
     * // Delete a few EngagementAssignments
     * const { count } = await prisma.engagementAssignment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EngagementAssignmentDeleteManyArgs>(args?: SelectSubset<T, EngagementAssignmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EngagementAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementAssignmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EngagementAssignments
     * const engagementAssignment = await prisma.engagementAssignment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EngagementAssignmentUpdateManyArgs>(args: SelectSubset<T, EngagementAssignmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EngagementAssignments and returns the data updated in the database.
     * @param {EngagementAssignmentUpdateManyAndReturnArgs} args - Arguments to update many EngagementAssignments.
     * @example
     * // Update many EngagementAssignments
     * const engagementAssignment = await prisma.engagementAssignment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EngagementAssignments and only return the `id`
     * const engagementAssignmentWithIdOnly = await prisma.engagementAssignment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EngagementAssignmentUpdateManyAndReturnArgs>(args: SelectSubset<T, EngagementAssignmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementAssignmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EngagementAssignment.
     * @param {EngagementAssignmentUpsertArgs} args - Arguments to update or create a EngagementAssignment.
     * @example
     * // Update or create a EngagementAssignment
     * const engagementAssignment = await prisma.engagementAssignment.upsert({
     *   create: {
     *     // ... data to create a EngagementAssignment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EngagementAssignment we want to update
     *   }
     * })
     */
    upsert<T extends EngagementAssignmentUpsertArgs>(args: SelectSubset<T, EngagementAssignmentUpsertArgs<ExtArgs>>): Prisma__EngagementAssignmentClient<$Result.GetResult<Prisma.$EngagementAssignmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EngagementAssignments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementAssignmentCountArgs} args - Arguments to filter EngagementAssignments to count.
     * @example
     * // Count the number of EngagementAssignments
     * const count = await prisma.engagementAssignment.count({
     *   where: {
     *     // ... the filter for the EngagementAssignments we want to count
     *   }
     * })
    **/
    count<T extends EngagementAssignmentCountArgs>(
      args?: Subset<T, EngagementAssignmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EngagementAssignmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EngagementAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementAssignmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EngagementAssignmentAggregateArgs>(args: Subset<T, EngagementAssignmentAggregateArgs>): Prisma.PrismaPromise<GetEngagementAssignmentAggregateType<T>>

    /**
     * Group by EngagementAssignment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementAssignmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EngagementAssignmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EngagementAssignmentGroupByArgs['orderBy'] }
        : { orderBy?: EngagementAssignmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EngagementAssignmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEngagementAssignmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EngagementAssignment model
   */
  readonly fields: EngagementAssignmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EngagementAssignment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EngagementAssignmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    engagement<T extends EngagementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EngagementDefaultArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    feedback<T extends EngagementAssignment$feedbackArgs<ExtArgs> = {}>(args?: Subset<T, EngagementAssignment$feedbackArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementFeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    memberExperiences<T extends EngagementAssignment$memberExperiencesArgs<ExtArgs> = {}>(args?: Subset<T, EngagementAssignment$memberExperiencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    timesheetEntries<T extends EngagementAssignment$timesheetEntriesArgs<ExtArgs> = {}>(args?: Subset<T, EngagementAssignment$timesheetEntriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementTimesheetEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EngagementAssignment model
   */
  interface EngagementAssignmentFieldRefs {
    readonly id: FieldRef<"EngagementAssignment", 'String'>
    readonly engagementId: FieldRef<"EngagementAssignment", 'String'>
    readonly memberId: FieldRef<"EngagementAssignment", 'String'>
    readonly memberHandle: FieldRef<"EngagementAssignment", 'String'>
    readonly status: FieldRef<"EngagementAssignment", 'AssignmentStatus'>
    readonly acceptedAt: FieldRef<"EngagementAssignment", 'DateTime'>
    readonly agreementRate: FieldRef<"EngagementAssignment", 'String'>
    readonly ratePerHour: FieldRef<"EngagementAssignment", 'String'>
    readonly paymentCycle: FieldRef<"EngagementAssignment", 'PaymentCycle'>
    readonly standardHoursPerDay: FieldRef<"EngagementAssignment", 'Float'>
    readonly totalHours: FieldRef<"EngagementAssignment", 'Float'>
    readonly standardHoursPerWeek: FieldRef<"EngagementAssignment", 'Float'>
    readonly durationMonths: FieldRef<"EngagementAssignment", 'Int'>
    readonly otherRemarks: FieldRef<"EngagementAssignment", 'String'>
    readonly terminationReason: FieldRef<"EngagementAssignment", 'String'>
    readonly startDate: FieldRef<"EngagementAssignment", 'DateTime'>
    readonly endDate: FieldRef<"EngagementAssignment", 'DateTime'>
    readonly wiproIdEndDate: FieldRef<"EngagementAssignment", 'DateTime'>
    readonly candidateWiproId: FieldRef<"EngagementAssignment", 'String'>
    readonly source: FieldRef<"EngagementAssignment", 'AssignmentSource'>
    readonly createdAt: FieldRef<"EngagementAssignment", 'DateTime'>
    readonly updatedAt: FieldRef<"EngagementAssignment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EngagementAssignment findUnique
   */
  export type EngagementAssignmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementAssignment
     */
    select?: EngagementAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementAssignment
     */
    omit?: EngagementAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which EngagementAssignment to fetch.
     */
    where: EngagementAssignmentWhereUniqueInput
  }

  /**
   * EngagementAssignment findUniqueOrThrow
   */
  export type EngagementAssignmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementAssignment
     */
    select?: EngagementAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementAssignment
     */
    omit?: EngagementAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which EngagementAssignment to fetch.
     */
    where: EngagementAssignmentWhereUniqueInput
  }

  /**
   * EngagementAssignment findFirst
   */
  export type EngagementAssignmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementAssignment
     */
    select?: EngagementAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementAssignment
     */
    omit?: EngagementAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which EngagementAssignment to fetch.
     */
    where?: EngagementAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementAssignments to fetch.
     */
    orderBy?: EngagementAssignmentOrderByWithRelationInput | EngagementAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EngagementAssignments.
     */
    cursor?: EngagementAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementAssignments.
     */
    distinct?: EngagementAssignmentScalarFieldEnum | EngagementAssignmentScalarFieldEnum[]
  }

  /**
   * EngagementAssignment findFirstOrThrow
   */
  export type EngagementAssignmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementAssignment
     */
    select?: EngagementAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementAssignment
     */
    omit?: EngagementAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which EngagementAssignment to fetch.
     */
    where?: EngagementAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementAssignments to fetch.
     */
    orderBy?: EngagementAssignmentOrderByWithRelationInput | EngagementAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EngagementAssignments.
     */
    cursor?: EngagementAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementAssignments.
     */
    distinct?: EngagementAssignmentScalarFieldEnum | EngagementAssignmentScalarFieldEnum[]
  }

  /**
   * EngagementAssignment findMany
   */
  export type EngagementAssignmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementAssignment
     */
    select?: EngagementAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementAssignment
     */
    omit?: EngagementAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementAssignmentInclude<ExtArgs> | null
    /**
     * Filter, which EngagementAssignments to fetch.
     */
    where?: EngagementAssignmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementAssignments to fetch.
     */
    orderBy?: EngagementAssignmentOrderByWithRelationInput | EngagementAssignmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EngagementAssignments.
     */
    cursor?: EngagementAssignmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementAssignments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementAssignments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementAssignments.
     */
    distinct?: EngagementAssignmentScalarFieldEnum | EngagementAssignmentScalarFieldEnum[]
  }

  /**
   * EngagementAssignment create
   */
  export type EngagementAssignmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementAssignment
     */
    select?: EngagementAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementAssignment
     */
    omit?: EngagementAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to create a EngagementAssignment.
     */
    data: XOR<EngagementAssignmentCreateInput, EngagementAssignmentUncheckedCreateInput>
  }

  /**
   * EngagementAssignment createMany
   */
  export type EngagementAssignmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EngagementAssignments.
     */
    data: EngagementAssignmentCreateManyInput | EngagementAssignmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EngagementAssignment createManyAndReturn
   */
  export type EngagementAssignmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementAssignment
     */
    select?: EngagementAssignmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementAssignment
     */
    omit?: EngagementAssignmentOmit<ExtArgs> | null
    /**
     * The data used to create many EngagementAssignments.
     */
    data: EngagementAssignmentCreateManyInput | EngagementAssignmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementAssignmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EngagementAssignment update
   */
  export type EngagementAssignmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementAssignment
     */
    select?: EngagementAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementAssignment
     */
    omit?: EngagementAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementAssignmentInclude<ExtArgs> | null
    /**
     * The data needed to update a EngagementAssignment.
     */
    data: XOR<EngagementAssignmentUpdateInput, EngagementAssignmentUncheckedUpdateInput>
    /**
     * Choose, which EngagementAssignment to update.
     */
    where: EngagementAssignmentWhereUniqueInput
  }

  /**
   * EngagementAssignment updateMany
   */
  export type EngagementAssignmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EngagementAssignments.
     */
    data: XOR<EngagementAssignmentUpdateManyMutationInput, EngagementAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which EngagementAssignments to update
     */
    where?: EngagementAssignmentWhereInput
    /**
     * Limit how many EngagementAssignments to update.
     */
    limit?: number
  }

  /**
   * EngagementAssignment updateManyAndReturn
   */
  export type EngagementAssignmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementAssignment
     */
    select?: EngagementAssignmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementAssignment
     */
    omit?: EngagementAssignmentOmit<ExtArgs> | null
    /**
     * The data used to update EngagementAssignments.
     */
    data: XOR<EngagementAssignmentUpdateManyMutationInput, EngagementAssignmentUncheckedUpdateManyInput>
    /**
     * Filter which EngagementAssignments to update
     */
    where?: EngagementAssignmentWhereInput
    /**
     * Limit how many EngagementAssignments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementAssignmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EngagementAssignment upsert
   */
  export type EngagementAssignmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementAssignment
     */
    select?: EngagementAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementAssignment
     */
    omit?: EngagementAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementAssignmentInclude<ExtArgs> | null
    /**
     * The filter to search for the EngagementAssignment to update in case it exists.
     */
    where: EngagementAssignmentWhereUniqueInput
    /**
     * In case the EngagementAssignment found by the `where` argument doesn't exist, create a new EngagementAssignment with this data.
     */
    create: XOR<EngagementAssignmentCreateInput, EngagementAssignmentUncheckedCreateInput>
    /**
     * In case the EngagementAssignment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EngagementAssignmentUpdateInput, EngagementAssignmentUncheckedUpdateInput>
  }

  /**
   * EngagementAssignment delete
   */
  export type EngagementAssignmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementAssignment
     */
    select?: EngagementAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementAssignment
     */
    omit?: EngagementAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementAssignmentInclude<ExtArgs> | null
    /**
     * Filter which EngagementAssignment to delete.
     */
    where: EngagementAssignmentWhereUniqueInput
  }

  /**
   * EngagementAssignment deleteMany
   */
  export type EngagementAssignmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EngagementAssignments to delete
     */
    where?: EngagementAssignmentWhereInput
    /**
     * Limit how many EngagementAssignments to delete.
     */
    limit?: number
  }

  /**
   * EngagementAssignment.feedback
   */
  export type EngagementAssignment$feedbackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementFeedback
     */
    select?: EngagementFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementFeedback
     */
    omit?: EngagementFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementFeedbackInclude<ExtArgs> | null
    where?: EngagementFeedbackWhereInput
    orderBy?: EngagementFeedbackOrderByWithRelationInput | EngagementFeedbackOrderByWithRelationInput[]
    cursor?: EngagementFeedbackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EngagementFeedbackScalarFieldEnum | EngagementFeedbackScalarFieldEnum[]
  }

  /**
   * EngagementAssignment.memberExperiences
   */
  export type EngagementAssignment$memberExperiencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExperience
     */
    select?: MemberExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberExperience
     */
    omit?: MemberExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExperienceInclude<ExtArgs> | null
    where?: MemberExperienceWhereInput
    orderBy?: MemberExperienceOrderByWithRelationInput | MemberExperienceOrderByWithRelationInput[]
    cursor?: MemberExperienceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MemberExperienceScalarFieldEnum | MemberExperienceScalarFieldEnum[]
  }

  /**
   * EngagementAssignment.timesheetEntries
   */
  export type EngagementAssignment$timesheetEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetEntry
     */
    select?: EngagementTimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetEntry
     */
    omit?: EngagementTimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetEntryInclude<ExtArgs> | null
    where?: EngagementTimesheetEntryWhereInput
    orderBy?: EngagementTimesheetEntryOrderByWithRelationInput | EngagementTimesheetEntryOrderByWithRelationInput[]
    cursor?: EngagementTimesheetEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EngagementTimesheetEntryScalarFieldEnum | EngagementTimesheetEntryScalarFieldEnum[]
  }

  /**
   * EngagementAssignment without action
   */
  export type EngagementAssignmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementAssignment
     */
    select?: EngagementAssignmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementAssignment
     */
    omit?: EngagementAssignmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementAssignmentInclude<ExtArgs> | null
  }


  /**
   * Model EngagementFeedback
   */

  export type AggregateEngagementFeedback = {
    _count: EngagementFeedbackCountAggregateOutputType | null
    _avg: EngagementFeedbackAvgAggregateOutputType | null
    _sum: EngagementFeedbackSumAggregateOutputType | null
    _min: EngagementFeedbackMinAggregateOutputType | null
    _max: EngagementFeedbackMaxAggregateOutputType | null
  }

  export type EngagementFeedbackAvgAggregateOutputType = {
    rating: number | null
  }

  export type EngagementFeedbackSumAggregateOutputType = {
    rating: number | null
  }

  export type EngagementFeedbackMinAggregateOutputType = {
    id: string | null
    engagementAssignmentId: string | null
    feedbackText: string | null
    rating: number | null
    givenByMemberId: string | null
    givenByHandle: string | null
    givenByEmail: string | null
    secretToken: string | null
    secretTokenExpiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EngagementFeedbackMaxAggregateOutputType = {
    id: string | null
    engagementAssignmentId: string | null
    feedbackText: string | null
    rating: number | null
    givenByMemberId: string | null
    givenByHandle: string | null
    givenByEmail: string | null
    secretToken: string | null
    secretTokenExpiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EngagementFeedbackCountAggregateOutputType = {
    id: number
    engagementAssignmentId: number
    feedbackText: number
    rating: number
    givenByMemberId: number
    givenByHandle: number
    givenByEmail: number
    secretToken: number
    secretTokenExpiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EngagementFeedbackAvgAggregateInputType = {
    rating?: true
  }

  export type EngagementFeedbackSumAggregateInputType = {
    rating?: true
  }

  export type EngagementFeedbackMinAggregateInputType = {
    id?: true
    engagementAssignmentId?: true
    feedbackText?: true
    rating?: true
    givenByMemberId?: true
    givenByHandle?: true
    givenByEmail?: true
    secretToken?: true
    secretTokenExpiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EngagementFeedbackMaxAggregateInputType = {
    id?: true
    engagementAssignmentId?: true
    feedbackText?: true
    rating?: true
    givenByMemberId?: true
    givenByHandle?: true
    givenByEmail?: true
    secretToken?: true
    secretTokenExpiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EngagementFeedbackCountAggregateInputType = {
    id?: true
    engagementAssignmentId?: true
    feedbackText?: true
    rating?: true
    givenByMemberId?: true
    givenByHandle?: true
    givenByEmail?: true
    secretToken?: true
    secretTokenExpiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EngagementFeedbackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EngagementFeedback to aggregate.
     */
    where?: EngagementFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementFeedbacks to fetch.
     */
    orderBy?: EngagementFeedbackOrderByWithRelationInput | EngagementFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EngagementFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EngagementFeedbacks
    **/
    _count?: true | EngagementFeedbackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EngagementFeedbackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EngagementFeedbackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EngagementFeedbackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EngagementFeedbackMaxAggregateInputType
  }

  export type GetEngagementFeedbackAggregateType<T extends EngagementFeedbackAggregateArgs> = {
        [P in keyof T & keyof AggregateEngagementFeedback]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEngagementFeedback[P]>
      : GetScalarType<T[P], AggregateEngagementFeedback[P]>
  }




  export type EngagementFeedbackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EngagementFeedbackWhereInput
    orderBy?: EngagementFeedbackOrderByWithAggregationInput | EngagementFeedbackOrderByWithAggregationInput[]
    by: EngagementFeedbackScalarFieldEnum[] | EngagementFeedbackScalarFieldEnum
    having?: EngagementFeedbackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EngagementFeedbackCountAggregateInputType | true
    _avg?: EngagementFeedbackAvgAggregateInputType
    _sum?: EngagementFeedbackSumAggregateInputType
    _min?: EngagementFeedbackMinAggregateInputType
    _max?: EngagementFeedbackMaxAggregateInputType
  }

  export type EngagementFeedbackGroupByOutputType = {
    id: string
    engagementAssignmentId: string
    feedbackText: string
    rating: number | null
    givenByMemberId: string | null
    givenByHandle: string | null
    givenByEmail: string | null
    secretToken: string | null
    secretTokenExpiresAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: EngagementFeedbackCountAggregateOutputType | null
    _avg: EngagementFeedbackAvgAggregateOutputType | null
    _sum: EngagementFeedbackSumAggregateOutputType | null
    _min: EngagementFeedbackMinAggregateOutputType | null
    _max: EngagementFeedbackMaxAggregateOutputType | null
  }

  type GetEngagementFeedbackGroupByPayload<T extends EngagementFeedbackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EngagementFeedbackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EngagementFeedbackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EngagementFeedbackGroupByOutputType[P]>
            : GetScalarType<T[P], EngagementFeedbackGroupByOutputType[P]>
        }
      >
    >


  export type EngagementFeedbackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementAssignmentId?: boolean
    feedbackText?: boolean
    rating?: boolean
    givenByMemberId?: boolean
    givenByHandle?: boolean
    givenByEmail?: boolean
    secretToken?: boolean
    secretTokenExpiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignment?: boolean | EngagementAssignmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagementFeedback"]>

  export type EngagementFeedbackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementAssignmentId?: boolean
    feedbackText?: boolean
    rating?: boolean
    givenByMemberId?: boolean
    givenByHandle?: boolean
    givenByEmail?: boolean
    secretToken?: boolean
    secretTokenExpiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignment?: boolean | EngagementAssignmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagementFeedback"]>

  export type EngagementFeedbackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementAssignmentId?: boolean
    feedbackText?: boolean
    rating?: boolean
    givenByMemberId?: boolean
    givenByHandle?: boolean
    givenByEmail?: boolean
    secretToken?: boolean
    secretTokenExpiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignment?: boolean | EngagementAssignmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagementFeedback"]>

  export type EngagementFeedbackSelectScalar = {
    id?: boolean
    engagementAssignmentId?: boolean
    feedbackText?: boolean
    rating?: boolean
    givenByMemberId?: boolean
    givenByHandle?: boolean
    givenByEmail?: boolean
    secretToken?: boolean
    secretTokenExpiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EngagementFeedbackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "engagementAssignmentId" | "feedbackText" | "rating" | "givenByMemberId" | "givenByHandle" | "givenByEmail" | "secretToken" | "secretTokenExpiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["engagementFeedback"]>
  export type EngagementFeedbackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignment?: boolean | EngagementAssignmentDefaultArgs<ExtArgs>
  }
  export type EngagementFeedbackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignment?: boolean | EngagementAssignmentDefaultArgs<ExtArgs>
  }
  export type EngagementFeedbackIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignment?: boolean | EngagementAssignmentDefaultArgs<ExtArgs>
  }

  export type $EngagementFeedbackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EngagementFeedback"
    objects: {
      assignment: Prisma.$EngagementAssignmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      engagementAssignmentId: string
      feedbackText: string
      rating: number | null
      givenByMemberId: string | null
      givenByHandle: string | null
      givenByEmail: string | null
      secretToken: string | null
      secretTokenExpiresAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["engagementFeedback"]>
    composites: {}
  }

  type EngagementFeedbackGetPayload<S extends boolean | null | undefined | EngagementFeedbackDefaultArgs> = $Result.GetResult<Prisma.$EngagementFeedbackPayload, S>

  type EngagementFeedbackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EngagementFeedbackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EngagementFeedbackCountAggregateInputType | true
    }

  export interface EngagementFeedbackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EngagementFeedback'], meta: { name: 'EngagementFeedback' } }
    /**
     * Find zero or one EngagementFeedback that matches the filter.
     * @param {EngagementFeedbackFindUniqueArgs} args - Arguments to find a EngagementFeedback
     * @example
     * // Get one EngagementFeedback
     * const engagementFeedback = await prisma.engagementFeedback.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EngagementFeedbackFindUniqueArgs>(args: SelectSubset<T, EngagementFeedbackFindUniqueArgs<ExtArgs>>): Prisma__EngagementFeedbackClient<$Result.GetResult<Prisma.$EngagementFeedbackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EngagementFeedback that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EngagementFeedbackFindUniqueOrThrowArgs} args - Arguments to find a EngagementFeedback
     * @example
     * // Get one EngagementFeedback
     * const engagementFeedback = await prisma.engagementFeedback.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EngagementFeedbackFindUniqueOrThrowArgs>(args: SelectSubset<T, EngagementFeedbackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EngagementFeedbackClient<$Result.GetResult<Prisma.$EngagementFeedbackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EngagementFeedback that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementFeedbackFindFirstArgs} args - Arguments to find a EngagementFeedback
     * @example
     * // Get one EngagementFeedback
     * const engagementFeedback = await prisma.engagementFeedback.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EngagementFeedbackFindFirstArgs>(args?: SelectSubset<T, EngagementFeedbackFindFirstArgs<ExtArgs>>): Prisma__EngagementFeedbackClient<$Result.GetResult<Prisma.$EngagementFeedbackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EngagementFeedback that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementFeedbackFindFirstOrThrowArgs} args - Arguments to find a EngagementFeedback
     * @example
     * // Get one EngagementFeedback
     * const engagementFeedback = await prisma.engagementFeedback.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EngagementFeedbackFindFirstOrThrowArgs>(args?: SelectSubset<T, EngagementFeedbackFindFirstOrThrowArgs<ExtArgs>>): Prisma__EngagementFeedbackClient<$Result.GetResult<Prisma.$EngagementFeedbackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EngagementFeedbacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementFeedbackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EngagementFeedbacks
     * const engagementFeedbacks = await prisma.engagementFeedback.findMany()
     * 
     * // Get first 10 EngagementFeedbacks
     * const engagementFeedbacks = await prisma.engagementFeedback.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const engagementFeedbackWithIdOnly = await prisma.engagementFeedback.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EngagementFeedbackFindManyArgs>(args?: SelectSubset<T, EngagementFeedbackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementFeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EngagementFeedback.
     * @param {EngagementFeedbackCreateArgs} args - Arguments to create a EngagementFeedback.
     * @example
     * // Create one EngagementFeedback
     * const EngagementFeedback = await prisma.engagementFeedback.create({
     *   data: {
     *     // ... data to create a EngagementFeedback
     *   }
     * })
     * 
     */
    create<T extends EngagementFeedbackCreateArgs>(args: SelectSubset<T, EngagementFeedbackCreateArgs<ExtArgs>>): Prisma__EngagementFeedbackClient<$Result.GetResult<Prisma.$EngagementFeedbackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EngagementFeedbacks.
     * @param {EngagementFeedbackCreateManyArgs} args - Arguments to create many EngagementFeedbacks.
     * @example
     * // Create many EngagementFeedbacks
     * const engagementFeedback = await prisma.engagementFeedback.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EngagementFeedbackCreateManyArgs>(args?: SelectSubset<T, EngagementFeedbackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EngagementFeedbacks and returns the data saved in the database.
     * @param {EngagementFeedbackCreateManyAndReturnArgs} args - Arguments to create many EngagementFeedbacks.
     * @example
     * // Create many EngagementFeedbacks
     * const engagementFeedback = await prisma.engagementFeedback.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EngagementFeedbacks and only return the `id`
     * const engagementFeedbackWithIdOnly = await prisma.engagementFeedback.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EngagementFeedbackCreateManyAndReturnArgs>(args?: SelectSubset<T, EngagementFeedbackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementFeedbackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EngagementFeedback.
     * @param {EngagementFeedbackDeleteArgs} args - Arguments to delete one EngagementFeedback.
     * @example
     * // Delete one EngagementFeedback
     * const EngagementFeedback = await prisma.engagementFeedback.delete({
     *   where: {
     *     // ... filter to delete one EngagementFeedback
     *   }
     * })
     * 
     */
    delete<T extends EngagementFeedbackDeleteArgs>(args: SelectSubset<T, EngagementFeedbackDeleteArgs<ExtArgs>>): Prisma__EngagementFeedbackClient<$Result.GetResult<Prisma.$EngagementFeedbackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EngagementFeedback.
     * @param {EngagementFeedbackUpdateArgs} args - Arguments to update one EngagementFeedback.
     * @example
     * // Update one EngagementFeedback
     * const engagementFeedback = await prisma.engagementFeedback.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EngagementFeedbackUpdateArgs>(args: SelectSubset<T, EngagementFeedbackUpdateArgs<ExtArgs>>): Prisma__EngagementFeedbackClient<$Result.GetResult<Prisma.$EngagementFeedbackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EngagementFeedbacks.
     * @param {EngagementFeedbackDeleteManyArgs} args - Arguments to filter EngagementFeedbacks to delete.
     * @example
     * // Delete a few EngagementFeedbacks
     * const { count } = await prisma.engagementFeedback.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EngagementFeedbackDeleteManyArgs>(args?: SelectSubset<T, EngagementFeedbackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EngagementFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementFeedbackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EngagementFeedbacks
     * const engagementFeedback = await prisma.engagementFeedback.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EngagementFeedbackUpdateManyArgs>(args: SelectSubset<T, EngagementFeedbackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EngagementFeedbacks and returns the data updated in the database.
     * @param {EngagementFeedbackUpdateManyAndReturnArgs} args - Arguments to update many EngagementFeedbacks.
     * @example
     * // Update many EngagementFeedbacks
     * const engagementFeedback = await prisma.engagementFeedback.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EngagementFeedbacks and only return the `id`
     * const engagementFeedbackWithIdOnly = await prisma.engagementFeedback.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EngagementFeedbackUpdateManyAndReturnArgs>(args: SelectSubset<T, EngagementFeedbackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementFeedbackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EngagementFeedback.
     * @param {EngagementFeedbackUpsertArgs} args - Arguments to update or create a EngagementFeedback.
     * @example
     * // Update or create a EngagementFeedback
     * const engagementFeedback = await prisma.engagementFeedback.upsert({
     *   create: {
     *     // ... data to create a EngagementFeedback
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EngagementFeedback we want to update
     *   }
     * })
     */
    upsert<T extends EngagementFeedbackUpsertArgs>(args: SelectSubset<T, EngagementFeedbackUpsertArgs<ExtArgs>>): Prisma__EngagementFeedbackClient<$Result.GetResult<Prisma.$EngagementFeedbackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EngagementFeedbacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementFeedbackCountArgs} args - Arguments to filter EngagementFeedbacks to count.
     * @example
     * // Count the number of EngagementFeedbacks
     * const count = await prisma.engagementFeedback.count({
     *   where: {
     *     // ... the filter for the EngagementFeedbacks we want to count
     *   }
     * })
    **/
    count<T extends EngagementFeedbackCountArgs>(
      args?: Subset<T, EngagementFeedbackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EngagementFeedbackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EngagementFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementFeedbackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EngagementFeedbackAggregateArgs>(args: Subset<T, EngagementFeedbackAggregateArgs>): Prisma.PrismaPromise<GetEngagementFeedbackAggregateType<T>>

    /**
     * Group by EngagementFeedback.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementFeedbackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EngagementFeedbackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EngagementFeedbackGroupByArgs['orderBy'] }
        : { orderBy?: EngagementFeedbackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EngagementFeedbackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEngagementFeedbackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EngagementFeedback model
   */
  readonly fields: EngagementFeedbackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EngagementFeedback.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EngagementFeedbackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignment<T extends EngagementAssignmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EngagementAssignmentDefaultArgs<ExtArgs>>): Prisma__EngagementAssignmentClient<$Result.GetResult<Prisma.$EngagementAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EngagementFeedback model
   */
  interface EngagementFeedbackFieldRefs {
    readonly id: FieldRef<"EngagementFeedback", 'String'>
    readonly engagementAssignmentId: FieldRef<"EngagementFeedback", 'String'>
    readonly feedbackText: FieldRef<"EngagementFeedback", 'String'>
    readonly rating: FieldRef<"EngagementFeedback", 'Int'>
    readonly givenByMemberId: FieldRef<"EngagementFeedback", 'String'>
    readonly givenByHandle: FieldRef<"EngagementFeedback", 'String'>
    readonly givenByEmail: FieldRef<"EngagementFeedback", 'String'>
    readonly secretToken: FieldRef<"EngagementFeedback", 'String'>
    readonly secretTokenExpiresAt: FieldRef<"EngagementFeedback", 'DateTime'>
    readonly createdAt: FieldRef<"EngagementFeedback", 'DateTime'>
    readonly updatedAt: FieldRef<"EngagementFeedback", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EngagementFeedback findUnique
   */
  export type EngagementFeedbackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementFeedback
     */
    select?: EngagementFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementFeedback
     */
    omit?: EngagementFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which EngagementFeedback to fetch.
     */
    where: EngagementFeedbackWhereUniqueInput
  }

  /**
   * EngagementFeedback findUniqueOrThrow
   */
  export type EngagementFeedbackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementFeedback
     */
    select?: EngagementFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementFeedback
     */
    omit?: EngagementFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which EngagementFeedback to fetch.
     */
    where: EngagementFeedbackWhereUniqueInput
  }

  /**
   * EngagementFeedback findFirst
   */
  export type EngagementFeedbackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementFeedback
     */
    select?: EngagementFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementFeedback
     */
    omit?: EngagementFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which EngagementFeedback to fetch.
     */
    where?: EngagementFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementFeedbacks to fetch.
     */
    orderBy?: EngagementFeedbackOrderByWithRelationInput | EngagementFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EngagementFeedbacks.
     */
    cursor?: EngagementFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementFeedbacks.
     */
    distinct?: EngagementFeedbackScalarFieldEnum | EngagementFeedbackScalarFieldEnum[]
  }

  /**
   * EngagementFeedback findFirstOrThrow
   */
  export type EngagementFeedbackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementFeedback
     */
    select?: EngagementFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementFeedback
     */
    omit?: EngagementFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which EngagementFeedback to fetch.
     */
    where?: EngagementFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementFeedbacks to fetch.
     */
    orderBy?: EngagementFeedbackOrderByWithRelationInput | EngagementFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EngagementFeedbacks.
     */
    cursor?: EngagementFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementFeedbacks.
     */
    distinct?: EngagementFeedbackScalarFieldEnum | EngagementFeedbackScalarFieldEnum[]
  }

  /**
   * EngagementFeedback findMany
   */
  export type EngagementFeedbackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementFeedback
     */
    select?: EngagementFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementFeedback
     */
    omit?: EngagementFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementFeedbackInclude<ExtArgs> | null
    /**
     * Filter, which EngagementFeedbacks to fetch.
     */
    where?: EngagementFeedbackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementFeedbacks to fetch.
     */
    orderBy?: EngagementFeedbackOrderByWithRelationInput | EngagementFeedbackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EngagementFeedbacks.
     */
    cursor?: EngagementFeedbackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementFeedbacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementFeedbacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementFeedbacks.
     */
    distinct?: EngagementFeedbackScalarFieldEnum | EngagementFeedbackScalarFieldEnum[]
  }

  /**
   * EngagementFeedback create
   */
  export type EngagementFeedbackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementFeedback
     */
    select?: EngagementFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementFeedback
     */
    omit?: EngagementFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementFeedbackInclude<ExtArgs> | null
    /**
     * The data needed to create a EngagementFeedback.
     */
    data: XOR<EngagementFeedbackCreateInput, EngagementFeedbackUncheckedCreateInput>
  }

  /**
   * EngagementFeedback createMany
   */
  export type EngagementFeedbackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EngagementFeedbacks.
     */
    data: EngagementFeedbackCreateManyInput | EngagementFeedbackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EngagementFeedback createManyAndReturn
   */
  export type EngagementFeedbackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementFeedback
     */
    select?: EngagementFeedbackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementFeedback
     */
    omit?: EngagementFeedbackOmit<ExtArgs> | null
    /**
     * The data used to create many EngagementFeedbacks.
     */
    data: EngagementFeedbackCreateManyInput | EngagementFeedbackCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementFeedbackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EngagementFeedback update
   */
  export type EngagementFeedbackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementFeedback
     */
    select?: EngagementFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementFeedback
     */
    omit?: EngagementFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementFeedbackInclude<ExtArgs> | null
    /**
     * The data needed to update a EngagementFeedback.
     */
    data: XOR<EngagementFeedbackUpdateInput, EngagementFeedbackUncheckedUpdateInput>
    /**
     * Choose, which EngagementFeedback to update.
     */
    where: EngagementFeedbackWhereUniqueInput
  }

  /**
   * EngagementFeedback updateMany
   */
  export type EngagementFeedbackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EngagementFeedbacks.
     */
    data: XOR<EngagementFeedbackUpdateManyMutationInput, EngagementFeedbackUncheckedUpdateManyInput>
    /**
     * Filter which EngagementFeedbacks to update
     */
    where?: EngagementFeedbackWhereInput
    /**
     * Limit how many EngagementFeedbacks to update.
     */
    limit?: number
  }

  /**
   * EngagementFeedback updateManyAndReturn
   */
  export type EngagementFeedbackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementFeedback
     */
    select?: EngagementFeedbackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementFeedback
     */
    omit?: EngagementFeedbackOmit<ExtArgs> | null
    /**
     * The data used to update EngagementFeedbacks.
     */
    data: XOR<EngagementFeedbackUpdateManyMutationInput, EngagementFeedbackUncheckedUpdateManyInput>
    /**
     * Filter which EngagementFeedbacks to update
     */
    where?: EngagementFeedbackWhereInput
    /**
     * Limit how many EngagementFeedbacks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementFeedbackIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EngagementFeedback upsert
   */
  export type EngagementFeedbackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementFeedback
     */
    select?: EngagementFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementFeedback
     */
    omit?: EngagementFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementFeedbackInclude<ExtArgs> | null
    /**
     * The filter to search for the EngagementFeedback to update in case it exists.
     */
    where: EngagementFeedbackWhereUniqueInput
    /**
     * In case the EngagementFeedback found by the `where` argument doesn't exist, create a new EngagementFeedback with this data.
     */
    create: XOR<EngagementFeedbackCreateInput, EngagementFeedbackUncheckedCreateInput>
    /**
     * In case the EngagementFeedback was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EngagementFeedbackUpdateInput, EngagementFeedbackUncheckedUpdateInput>
  }

  /**
   * EngagementFeedback delete
   */
  export type EngagementFeedbackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementFeedback
     */
    select?: EngagementFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementFeedback
     */
    omit?: EngagementFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementFeedbackInclude<ExtArgs> | null
    /**
     * Filter which EngagementFeedback to delete.
     */
    where: EngagementFeedbackWhereUniqueInput
  }

  /**
   * EngagementFeedback deleteMany
   */
  export type EngagementFeedbackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EngagementFeedbacks to delete
     */
    where?: EngagementFeedbackWhereInput
    /**
     * Limit how many EngagementFeedbacks to delete.
     */
    limit?: number
  }

  /**
   * EngagementFeedback without action
   */
  export type EngagementFeedbackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementFeedback
     */
    select?: EngagementFeedbackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementFeedback
     */
    omit?: EngagementFeedbackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementFeedbackInclude<ExtArgs> | null
  }


  /**
   * Model MemberExperience
   */

  export type AggregateMemberExperience = {
    _count: MemberExperienceCountAggregateOutputType | null
    _min: MemberExperienceMinAggregateOutputType | null
    _max: MemberExperienceMaxAggregateOutputType | null
  }

  export type MemberExperienceMinAggregateOutputType = {
    id: string | null
    engagementAssignmentId: string | null
    experienceText: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberExperienceMaxAggregateOutputType = {
    id: string | null
    engagementAssignmentId: string | null
    experienceText: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MemberExperienceCountAggregateOutputType = {
    id: number
    engagementAssignmentId: number
    experienceText: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MemberExperienceMinAggregateInputType = {
    id?: true
    engagementAssignmentId?: true
    experienceText?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberExperienceMaxAggregateInputType = {
    id?: true
    engagementAssignmentId?: true
    experienceText?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MemberExperienceCountAggregateInputType = {
    id?: true
    engagementAssignmentId?: true
    experienceText?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MemberExperienceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemberExperience to aggregate.
     */
    where?: MemberExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberExperiences to fetch.
     */
    orderBy?: MemberExperienceOrderByWithRelationInput | MemberExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MemberExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberExperiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberExperiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MemberExperiences
    **/
    _count?: true | MemberExperienceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MemberExperienceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MemberExperienceMaxAggregateInputType
  }

  export type GetMemberExperienceAggregateType<T extends MemberExperienceAggregateArgs> = {
        [P in keyof T & keyof AggregateMemberExperience]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMemberExperience[P]>
      : GetScalarType<T[P], AggregateMemberExperience[P]>
  }




  export type MemberExperienceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MemberExperienceWhereInput
    orderBy?: MemberExperienceOrderByWithAggregationInput | MemberExperienceOrderByWithAggregationInput[]
    by: MemberExperienceScalarFieldEnum[] | MemberExperienceScalarFieldEnum
    having?: MemberExperienceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MemberExperienceCountAggregateInputType | true
    _min?: MemberExperienceMinAggregateInputType
    _max?: MemberExperienceMaxAggregateInputType
  }

  export type MemberExperienceGroupByOutputType = {
    id: string
    engagementAssignmentId: string
    experienceText: string
    createdAt: Date
    updatedAt: Date
    _count: MemberExperienceCountAggregateOutputType | null
    _min: MemberExperienceMinAggregateOutputType | null
    _max: MemberExperienceMaxAggregateOutputType | null
  }

  type GetMemberExperienceGroupByPayload<T extends MemberExperienceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MemberExperienceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MemberExperienceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MemberExperienceGroupByOutputType[P]>
            : GetScalarType<T[P], MemberExperienceGroupByOutputType[P]>
        }
      >
    >


  export type MemberExperienceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementAssignmentId?: boolean
    experienceText?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignment?: boolean | EngagementAssignmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memberExperience"]>

  export type MemberExperienceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementAssignmentId?: boolean
    experienceText?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignment?: boolean | EngagementAssignmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memberExperience"]>

  export type MemberExperienceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementAssignmentId?: boolean
    experienceText?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignment?: boolean | EngagementAssignmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["memberExperience"]>

  export type MemberExperienceSelectScalar = {
    id?: boolean
    engagementAssignmentId?: boolean
    experienceText?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MemberExperienceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "engagementAssignmentId" | "experienceText" | "createdAt" | "updatedAt", ExtArgs["result"]["memberExperience"]>
  export type MemberExperienceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignment?: boolean | EngagementAssignmentDefaultArgs<ExtArgs>
  }
  export type MemberExperienceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignment?: boolean | EngagementAssignmentDefaultArgs<ExtArgs>
  }
  export type MemberExperienceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignment?: boolean | EngagementAssignmentDefaultArgs<ExtArgs>
  }

  export type $MemberExperiencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MemberExperience"
    objects: {
      assignment: Prisma.$EngagementAssignmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      engagementAssignmentId: string
      experienceText: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["memberExperience"]>
    composites: {}
  }

  type MemberExperienceGetPayload<S extends boolean | null | undefined | MemberExperienceDefaultArgs> = $Result.GetResult<Prisma.$MemberExperiencePayload, S>

  type MemberExperienceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MemberExperienceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MemberExperienceCountAggregateInputType | true
    }

  export interface MemberExperienceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MemberExperience'], meta: { name: 'MemberExperience' } }
    /**
     * Find zero or one MemberExperience that matches the filter.
     * @param {MemberExperienceFindUniqueArgs} args - Arguments to find a MemberExperience
     * @example
     * // Get one MemberExperience
     * const memberExperience = await prisma.memberExperience.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MemberExperienceFindUniqueArgs>(args: SelectSubset<T, MemberExperienceFindUniqueArgs<ExtArgs>>): Prisma__MemberExperienceClient<$Result.GetResult<Prisma.$MemberExperiencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MemberExperience that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MemberExperienceFindUniqueOrThrowArgs} args - Arguments to find a MemberExperience
     * @example
     * // Get one MemberExperience
     * const memberExperience = await prisma.memberExperience.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MemberExperienceFindUniqueOrThrowArgs>(args: SelectSubset<T, MemberExperienceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MemberExperienceClient<$Result.GetResult<Prisma.$MemberExperiencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemberExperience that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberExperienceFindFirstArgs} args - Arguments to find a MemberExperience
     * @example
     * // Get one MemberExperience
     * const memberExperience = await prisma.memberExperience.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MemberExperienceFindFirstArgs>(args?: SelectSubset<T, MemberExperienceFindFirstArgs<ExtArgs>>): Prisma__MemberExperienceClient<$Result.GetResult<Prisma.$MemberExperiencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MemberExperience that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberExperienceFindFirstOrThrowArgs} args - Arguments to find a MemberExperience
     * @example
     * // Get one MemberExperience
     * const memberExperience = await prisma.memberExperience.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MemberExperienceFindFirstOrThrowArgs>(args?: SelectSubset<T, MemberExperienceFindFirstOrThrowArgs<ExtArgs>>): Prisma__MemberExperienceClient<$Result.GetResult<Prisma.$MemberExperiencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MemberExperiences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberExperienceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MemberExperiences
     * const memberExperiences = await prisma.memberExperience.findMany()
     * 
     * // Get first 10 MemberExperiences
     * const memberExperiences = await prisma.memberExperience.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const memberExperienceWithIdOnly = await prisma.memberExperience.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MemberExperienceFindManyArgs>(args?: SelectSubset<T, MemberExperienceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MemberExperience.
     * @param {MemberExperienceCreateArgs} args - Arguments to create a MemberExperience.
     * @example
     * // Create one MemberExperience
     * const MemberExperience = await prisma.memberExperience.create({
     *   data: {
     *     // ... data to create a MemberExperience
     *   }
     * })
     * 
     */
    create<T extends MemberExperienceCreateArgs>(args: SelectSubset<T, MemberExperienceCreateArgs<ExtArgs>>): Prisma__MemberExperienceClient<$Result.GetResult<Prisma.$MemberExperiencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MemberExperiences.
     * @param {MemberExperienceCreateManyArgs} args - Arguments to create many MemberExperiences.
     * @example
     * // Create many MemberExperiences
     * const memberExperience = await prisma.memberExperience.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MemberExperienceCreateManyArgs>(args?: SelectSubset<T, MemberExperienceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MemberExperiences and returns the data saved in the database.
     * @param {MemberExperienceCreateManyAndReturnArgs} args - Arguments to create many MemberExperiences.
     * @example
     * // Create many MemberExperiences
     * const memberExperience = await prisma.memberExperience.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MemberExperiences and only return the `id`
     * const memberExperienceWithIdOnly = await prisma.memberExperience.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MemberExperienceCreateManyAndReturnArgs>(args?: SelectSubset<T, MemberExperienceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberExperiencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MemberExperience.
     * @param {MemberExperienceDeleteArgs} args - Arguments to delete one MemberExperience.
     * @example
     * // Delete one MemberExperience
     * const MemberExperience = await prisma.memberExperience.delete({
     *   where: {
     *     // ... filter to delete one MemberExperience
     *   }
     * })
     * 
     */
    delete<T extends MemberExperienceDeleteArgs>(args: SelectSubset<T, MemberExperienceDeleteArgs<ExtArgs>>): Prisma__MemberExperienceClient<$Result.GetResult<Prisma.$MemberExperiencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MemberExperience.
     * @param {MemberExperienceUpdateArgs} args - Arguments to update one MemberExperience.
     * @example
     * // Update one MemberExperience
     * const memberExperience = await prisma.memberExperience.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MemberExperienceUpdateArgs>(args: SelectSubset<T, MemberExperienceUpdateArgs<ExtArgs>>): Prisma__MemberExperienceClient<$Result.GetResult<Prisma.$MemberExperiencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MemberExperiences.
     * @param {MemberExperienceDeleteManyArgs} args - Arguments to filter MemberExperiences to delete.
     * @example
     * // Delete a few MemberExperiences
     * const { count } = await prisma.memberExperience.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MemberExperienceDeleteManyArgs>(args?: SelectSubset<T, MemberExperienceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemberExperiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberExperienceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MemberExperiences
     * const memberExperience = await prisma.memberExperience.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MemberExperienceUpdateManyArgs>(args: SelectSubset<T, MemberExperienceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MemberExperiences and returns the data updated in the database.
     * @param {MemberExperienceUpdateManyAndReturnArgs} args - Arguments to update many MemberExperiences.
     * @example
     * // Update many MemberExperiences
     * const memberExperience = await prisma.memberExperience.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MemberExperiences and only return the `id`
     * const memberExperienceWithIdOnly = await prisma.memberExperience.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MemberExperienceUpdateManyAndReturnArgs>(args: SelectSubset<T, MemberExperienceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MemberExperiencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MemberExperience.
     * @param {MemberExperienceUpsertArgs} args - Arguments to update or create a MemberExperience.
     * @example
     * // Update or create a MemberExperience
     * const memberExperience = await prisma.memberExperience.upsert({
     *   create: {
     *     // ... data to create a MemberExperience
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MemberExperience we want to update
     *   }
     * })
     */
    upsert<T extends MemberExperienceUpsertArgs>(args: SelectSubset<T, MemberExperienceUpsertArgs<ExtArgs>>): Prisma__MemberExperienceClient<$Result.GetResult<Prisma.$MemberExperiencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MemberExperiences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberExperienceCountArgs} args - Arguments to filter MemberExperiences to count.
     * @example
     * // Count the number of MemberExperiences
     * const count = await prisma.memberExperience.count({
     *   where: {
     *     // ... the filter for the MemberExperiences we want to count
     *   }
     * })
    **/
    count<T extends MemberExperienceCountArgs>(
      args?: Subset<T, MemberExperienceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MemberExperienceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MemberExperience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberExperienceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MemberExperienceAggregateArgs>(args: Subset<T, MemberExperienceAggregateArgs>): Prisma.PrismaPromise<GetMemberExperienceAggregateType<T>>

    /**
     * Group by MemberExperience.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MemberExperienceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MemberExperienceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MemberExperienceGroupByArgs['orderBy'] }
        : { orderBy?: MemberExperienceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MemberExperienceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMemberExperienceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MemberExperience model
   */
  readonly fields: MemberExperienceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MemberExperience.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MemberExperienceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignment<T extends EngagementAssignmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EngagementAssignmentDefaultArgs<ExtArgs>>): Prisma__EngagementAssignmentClient<$Result.GetResult<Prisma.$EngagementAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MemberExperience model
   */
  interface MemberExperienceFieldRefs {
    readonly id: FieldRef<"MemberExperience", 'String'>
    readonly engagementAssignmentId: FieldRef<"MemberExperience", 'String'>
    readonly experienceText: FieldRef<"MemberExperience", 'String'>
    readonly createdAt: FieldRef<"MemberExperience", 'DateTime'>
    readonly updatedAt: FieldRef<"MemberExperience", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MemberExperience findUnique
   */
  export type MemberExperienceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExperience
     */
    select?: MemberExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberExperience
     */
    omit?: MemberExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExperienceInclude<ExtArgs> | null
    /**
     * Filter, which MemberExperience to fetch.
     */
    where: MemberExperienceWhereUniqueInput
  }

  /**
   * MemberExperience findUniqueOrThrow
   */
  export type MemberExperienceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExperience
     */
    select?: MemberExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberExperience
     */
    omit?: MemberExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExperienceInclude<ExtArgs> | null
    /**
     * Filter, which MemberExperience to fetch.
     */
    where: MemberExperienceWhereUniqueInput
  }

  /**
   * MemberExperience findFirst
   */
  export type MemberExperienceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExperience
     */
    select?: MemberExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberExperience
     */
    omit?: MemberExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExperienceInclude<ExtArgs> | null
    /**
     * Filter, which MemberExperience to fetch.
     */
    where?: MemberExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberExperiences to fetch.
     */
    orderBy?: MemberExperienceOrderByWithRelationInput | MemberExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemberExperiences.
     */
    cursor?: MemberExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberExperiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberExperiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberExperiences.
     */
    distinct?: MemberExperienceScalarFieldEnum | MemberExperienceScalarFieldEnum[]
  }

  /**
   * MemberExperience findFirstOrThrow
   */
  export type MemberExperienceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExperience
     */
    select?: MemberExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberExperience
     */
    omit?: MemberExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExperienceInclude<ExtArgs> | null
    /**
     * Filter, which MemberExperience to fetch.
     */
    where?: MemberExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberExperiences to fetch.
     */
    orderBy?: MemberExperienceOrderByWithRelationInput | MemberExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MemberExperiences.
     */
    cursor?: MemberExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberExperiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberExperiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberExperiences.
     */
    distinct?: MemberExperienceScalarFieldEnum | MemberExperienceScalarFieldEnum[]
  }

  /**
   * MemberExperience findMany
   */
  export type MemberExperienceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExperience
     */
    select?: MemberExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberExperience
     */
    omit?: MemberExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExperienceInclude<ExtArgs> | null
    /**
     * Filter, which MemberExperiences to fetch.
     */
    where?: MemberExperienceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MemberExperiences to fetch.
     */
    orderBy?: MemberExperienceOrderByWithRelationInput | MemberExperienceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MemberExperiences.
     */
    cursor?: MemberExperienceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MemberExperiences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MemberExperiences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MemberExperiences.
     */
    distinct?: MemberExperienceScalarFieldEnum | MemberExperienceScalarFieldEnum[]
  }

  /**
   * MemberExperience create
   */
  export type MemberExperienceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExperience
     */
    select?: MemberExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberExperience
     */
    omit?: MemberExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExperienceInclude<ExtArgs> | null
    /**
     * The data needed to create a MemberExperience.
     */
    data: XOR<MemberExperienceCreateInput, MemberExperienceUncheckedCreateInput>
  }

  /**
   * MemberExperience createMany
   */
  export type MemberExperienceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MemberExperiences.
     */
    data: MemberExperienceCreateManyInput | MemberExperienceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MemberExperience createManyAndReturn
   */
  export type MemberExperienceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExperience
     */
    select?: MemberExperienceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemberExperience
     */
    omit?: MemberExperienceOmit<ExtArgs> | null
    /**
     * The data used to create many MemberExperiences.
     */
    data: MemberExperienceCreateManyInput | MemberExperienceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExperienceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemberExperience update
   */
  export type MemberExperienceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExperience
     */
    select?: MemberExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberExperience
     */
    omit?: MemberExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExperienceInclude<ExtArgs> | null
    /**
     * The data needed to update a MemberExperience.
     */
    data: XOR<MemberExperienceUpdateInput, MemberExperienceUncheckedUpdateInput>
    /**
     * Choose, which MemberExperience to update.
     */
    where: MemberExperienceWhereUniqueInput
  }

  /**
   * MemberExperience updateMany
   */
  export type MemberExperienceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MemberExperiences.
     */
    data: XOR<MemberExperienceUpdateManyMutationInput, MemberExperienceUncheckedUpdateManyInput>
    /**
     * Filter which MemberExperiences to update
     */
    where?: MemberExperienceWhereInput
    /**
     * Limit how many MemberExperiences to update.
     */
    limit?: number
  }

  /**
   * MemberExperience updateManyAndReturn
   */
  export type MemberExperienceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExperience
     */
    select?: MemberExperienceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MemberExperience
     */
    omit?: MemberExperienceOmit<ExtArgs> | null
    /**
     * The data used to update MemberExperiences.
     */
    data: XOR<MemberExperienceUpdateManyMutationInput, MemberExperienceUncheckedUpdateManyInput>
    /**
     * Filter which MemberExperiences to update
     */
    where?: MemberExperienceWhereInput
    /**
     * Limit how many MemberExperiences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExperienceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MemberExperience upsert
   */
  export type MemberExperienceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExperience
     */
    select?: MemberExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberExperience
     */
    omit?: MemberExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExperienceInclude<ExtArgs> | null
    /**
     * The filter to search for the MemberExperience to update in case it exists.
     */
    where: MemberExperienceWhereUniqueInput
    /**
     * In case the MemberExperience found by the `where` argument doesn't exist, create a new MemberExperience with this data.
     */
    create: XOR<MemberExperienceCreateInput, MemberExperienceUncheckedCreateInput>
    /**
     * In case the MemberExperience was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MemberExperienceUpdateInput, MemberExperienceUncheckedUpdateInput>
  }

  /**
   * MemberExperience delete
   */
  export type MemberExperienceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExperience
     */
    select?: MemberExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberExperience
     */
    omit?: MemberExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExperienceInclude<ExtArgs> | null
    /**
     * Filter which MemberExperience to delete.
     */
    where: MemberExperienceWhereUniqueInput
  }

  /**
   * MemberExperience deleteMany
   */
  export type MemberExperienceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MemberExperiences to delete
     */
    where?: MemberExperienceWhereInput
    /**
     * Limit how many MemberExperiences to delete.
     */
    limit?: number
  }

  /**
   * MemberExperience without action
   */
  export type MemberExperienceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MemberExperience
     */
    select?: MemberExperienceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MemberExperience
     */
    omit?: MemberExperienceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MemberExperienceInclude<ExtArgs> | null
  }


  /**
   * Model EngagementLead
   */

  export type AggregateEngagementLead = {
    _count: EngagementLeadCountAggregateOutputType | null
    _avg: EngagementLeadAvgAggregateOutputType | null
    _sum: EngagementLeadSumAggregateOutputType | null
    _min: EngagementLeadMinAggregateOutputType | null
    _max: EngagementLeadMaxAggregateOutputType | null
  }

  export type EngagementLeadAvgAggregateOutputType = {
    minYearsExperience: number | null
    resourcesRequired: number | null
    workingHoursPerDay: number | null
  }

  export type EngagementLeadSumAggregateOutputType = {
    minYearsExperience: number | null
    resourcesRequired: number | null
    workingHoursPerDay: number | null
  }

  export type EngagementLeadMinAggregateOutputType = {
    id: string | null
    workEmail: string | null
    accountName: string | null
    smu: string | null
    engagementModel: $Enums.EngagementModel | null
    roleTitle: string | null
    jobDescription: string | null
    experienceLevel: $Enums.ExperienceLevel | null
    minYearsExperience: number | null
    industryDomain: string | null
    resourcesRequired: number | null
    preferredStartDate: Date | null
    engagementDuration: string | null
    workingHoursPerDay: number | null
    timeZoneRequirement: string | null
    remoteWorkAccepted: boolean | null
    workLocationRestrictions: string | null
    billRateCurrency: string | null
    billRateAmount: string | null
    priority: $Enums.LeadPriority | null
    additionalRequirements: string | null
    status: $Enums.EngagementLeadStatus | null
    convertedEngagementId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type EngagementLeadMaxAggregateOutputType = {
    id: string | null
    workEmail: string | null
    accountName: string | null
    smu: string | null
    engagementModel: $Enums.EngagementModel | null
    roleTitle: string | null
    jobDescription: string | null
    experienceLevel: $Enums.ExperienceLevel | null
    minYearsExperience: number | null
    industryDomain: string | null
    resourcesRequired: number | null
    preferredStartDate: Date | null
    engagementDuration: string | null
    workingHoursPerDay: number | null
    timeZoneRequirement: string | null
    remoteWorkAccepted: boolean | null
    workLocationRestrictions: string | null
    billRateCurrency: string | null
    billRateAmount: string | null
    priority: $Enums.LeadPriority | null
    additionalRequirements: string | null
    status: $Enums.EngagementLeadStatus | null
    convertedEngagementId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type EngagementLeadCountAggregateOutputType = {
    id: number
    workEmail: number
    accountName: number
    smu: number
    engagementModel: number
    roleTitle: number
    jobDescription: number
    requiredSkills: number
    experienceLevel: number
    minYearsExperience: number
    industryDomain: number
    resourcesRequired: number
    preferredStartDate: number
    engagementDuration: number
    workingHoursPerDay: number
    timeZoneRequirement: number
    remoteWorkAccepted: number
    workLocationRestrictions: number
    billRateCurrency: number
    billRateAmount: number
    priority: number
    additionalRequirements: number
    status: number
    convertedEngagementId: number
    createdAt: number
    updatedAt: number
    updatedBy: number
    _all: number
  }


  export type EngagementLeadAvgAggregateInputType = {
    minYearsExperience?: true
    resourcesRequired?: true
    workingHoursPerDay?: true
  }

  export type EngagementLeadSumAggregateInputType = {
    minYearsExperience?: true
    resourcesRequired?: true
    workingHoursPerDay?: true
  }

  export type EngagementLeadMinAggregateInputType = {
    id?: true
    workEmail?: true
    accountName?: true
    smu?: true
    engagementModel?: true
    roleTitle?: true
    jobDescription?: true
    experienceLevel?: true
    minYearsExperience?: true
    industryDomain?: true
    resourcesRequired?: true
    preferredStartDate?: true
    engagementDuration?: true
    workingHoursPerDay?: true
    timeZoneRequirement?: true
    remoteWorkAccepted?: true
    workLocationRestrictions?: true
    billRateCurrency?: true
    billRateAmount?: true
    priority?: true
    additionalRequirements?: true
    status?: true
    convertedEngagementId?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type EngagementLeadMaxAggregateInputType = {
    id?: true
    workEmail?: true
    accountName?: true
    smu?: true
    engagementModel?: true
    roleTitle?: true
    jobDescription?: true
    experienceLevel?: true
    minYearsExperience?: true
    industryDomain?: true
    resourcesRequired?: true
    preferredStartDate?: true
    engagementDuration?: true
    workingHoursPerDay?: true
    timeZoneRequirement?: true
    remoteWorkAccepted?: true
    workLocationRestrictions?: true
    billRateCurrency?: true
    billRateAmount?: true
    priority?: true
    additionalRequirements?: true
    status?: true
    convertedEngagementId?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type EngagementLeadCountAggregateInputType = {
    id?: true
    workEmail?: true
    accountName?: true
    smu?: true
    engagementModel?: true
    roleTitle?: true
    jobDescription?: true
    requiredSkills?: true
    experienceLevel?: true
    minYearsExperience?: true
    industryDomain?: true
    resourcesRequired?: true
    preferredStartDate?: true
    engagementDuration?: true
    workingHoursPerDay?: true
    timeZoneRequirement?: true
    remoteWorkAccepted?: true
    workLocationRestrictions?: true
    billRateCurrency?: true
    billRateAmount?: true
    priority?: true
    additionalRequirements?: true
    status?: true
    convertedEngagementId?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
    _all?: true
  }

  export type EngagementLeadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EngagementLead to aggregate.
     */
    where?: EngagementLeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementLeads to fetch.
     */
    orderBy?: EngagementLeadOrderByWithRelationInput | EngagementLeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EngagementLeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementLeads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementLeads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EngagementLeads
    **/
    _count?: true | EngagementLeadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EngagementLeadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EngagementLeadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EngagementLeadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EngagementLeadMaxAggregateInputType
  }

  export type GetEngagementLeadAggregateType<T extends EngagementLeadAggregateArgs> = {
        [P in keyof T & keyof AggregateEngagementLead]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEngagementLead[P]>
      : GetScalarType<T[P], AggregateEngagementLead[P]>
  }




  export type EngagementLeadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EngagementLeadWhereInput
    orderBy?: EngagementLeadOrderByWithAggregationInput | EngagementLeadOrderByWithAggregationInput[]
    by: EngagementLeadScalarFieldEnum[] | EngagementLeadScalarFieldEnum
    having?: EngagementLeadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EngagementLeadCountAggregateInputType | true
    _avg?: EngagementLeadAvgAggregateInputType
    _sum?: EngagementLeadSumAggregateInputType
    _min?: EngagementLeadMinAggregateInputType
    _max?: EngagementLeadMaxAggregateInputType
  }

  export type EngagementLeadGroupByOutputType = {
    id: string
    workEmail: string
    accountName: string
    smu: string
    engagementModel: $Enums.EngagementModel
    roleTitle: string
    jobDescription: string
    requiredSkills: string[]
    experienceLevel: $Enums.ExperienceLevel
    minYearsExperience: number
    industryDomain: string | null
    resourcesRequired: number
    preferredStartDate: Date
    engagementDuration: string
    workingHoursPerDay: number
    timeZoneRequirement: string
    remoteWorkAccepted: boolean
    workLocationRestrictions: string | null
    billRateCurrency: string
    billRateAmount: string
    priority: $Enums.LeadPriority | null
    additionalRequirements: string | null
    status: $Enums.EngagementLeadStatus
    convertedEngagementId: string | null
    createdAt: Date
    updatedAt: Date
    updatedBy: string | null
    _count: EngagementLeadCountAggregateOutputType | null
    _avg: EngagementLeadAvgAggregateOutputType | null
    _sum: EngagementLeadSumAggregateOutputType | null
    _min: EngagementLeadMinAggregateOutputType | null
    _max: EngagementLeadMaxAggregateOutputType | null
  }

  type GetEngagementLeadGroupByPayload<T extends EngagementLeadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EngagementLeadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EngagementLeadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EngagementLeadGroupByOutputType[P]>
            : GetScalarType<T[P], EngagementLeadGroupByOutputType[P]>
        }
      >
    >


  export type EngagementLeadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workEmail?: boolean
    accountName?: boolean
    smu?: boolean
    engagementModel?: boolean
    roleTitle?: boolean
    jobDescription?: boolean
    requiredSkills?: boolean
    experienceLevel?: boolean
    minYearsExperience?: boolean
    industryDomain?: boolean
    resourcesRequired?: boolean
    preferredStartDate?: boolean
    engagementDuration?: boolean
    workingHoursPerDay?: boolean
    timeZoneRequirement?: boolean
    remoteWorkAccepted?: boolean
    workLocationRestrictions?: boolean
    billRateCurrency?: boolean
    billRateAmount?: boolean
    priority?: boolean
    additionalRequirements?: boolean
    status?: boolean
    convertedEngagementId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["engagementLead"]>

  export type EngagementLeadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workEmail?: boolean
    accountName?: boolean
    smu?: boolean
    engagementModel?: boolean
    roleTitle?: boolean
    jobDescription?: boolean
    requiredSkills?: boolean
    experienceLevel?: boolean
    minYearsExperience?: boolean
    industryDomain?: boolean
    resourcesRequired?: boolean
    preferredStartDate?: boolean
    engagementDuration?: boolean
    workingHoursPerDay?: boolean
    timeZoneRequirement?: boolean
    remoteWorkAccepted?: boolean
    workLocationRestrictions?: boolean
    billRateCurrency?: boolean
    billRateAmount?: boolean
    priority?: boolean
    additionalRequirements?: boolean
    status?: boolean
    convertedEngagementId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["engagementLead"]>

  export type EngagementLeadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workEmail?: boolean
    accountName?: boolean
    smu?: boolean
    engagementModel?: boolean
    roleTitle?: boolean
    jobDescription?: boolean
    requiredSkills?: boolean
    experienceLevel?: boolean
    minYearsExperience?: boolean
    industryDomain?: boolean
    resourcesRequired?: boolean
    preferredStartDate?: boolean
    engagementDuration?: boolean
    workingHoursPerDay?: boolean
    timeZoneRequirement?: boolean
    remoteWorkAccepted?: boolean
    workLocationRestrictions?: boolean
    billRateCurrency?: boolean
    billRateAmount?: boolean
    priority?: boolean
    additionalRequirements?: boolean
    status?: boolean
    convertedEngagementId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }, ExtArgs["result"]["engagementLead"]>

  export type EngagementLeadSelectScalar = {
    id?: boolean
    workEmail?: boolean
    accountName?: boolean
    smu?: boolean
    engagementModel?: boolean
    roleTitle?: boolean
    jobDescription?: boolean
    requiredSkills?: boolean
    experienceLevel?: boolean
    minYearsExperience?: boolean
    industryDomain?: boolean
    resourcesRequired?: boolean
    preferredStartDate?: boolean
    engagementDuration?: boolean
    workingHoursPerDay?: boolean
    timeZoneRequirement?: boolean
    remoteWorkAccepted?: boolean
    workLocationRestrictions?: boolean
    billRateCurrency?: boolean
    billRateAmount?: boolean
    priority?: boolean
    additionalRequirements?: boolean
    status?: boolean
    convertedEngagementId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }

  export type EngagementLeadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "workEmail" | "accountName" | "smu" | "engagementModel" | "roleTitle" | "jobDescription" | "requiredSkills" | "experienceLevel" | "minYearsExperience" | "industryDomain" | "resourcesRequired" | "preferredStartDate" | "engagementDuration" | "workingHoursPerDay" | "timeZoneRequirement" | "remoteWorkAccepted" | "workLocationRestrictions" | "billRateCurrency" | "billRateAmount" | "priority" | "additionalRequirements" | "status" | "convertedEngagementId" | "createdAt" | "updatedAt" | "updatedBy", ExtArgs["result"]["engagementLead"]>

  export type $EngagementLeadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EngagementLead"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workEmail: string
      accountName: string
      smu: string
      engagementModel: $Enums.EngagementModel
      roleTitle: string
      jobDescription: string
      requiredSkills: string[]
      experienceLevel: $Enums.ExperienceLevel
      minYearsExperience: number
      industryDomain: string | null
      resourcesRequired: number
      preferredStartDate: Date
      engagementDuration: string
      workingHoursPerDay: number
      timeZoneRequirement: string
      remoteWorkAccepted: boolean
      workLocationRestrictions: string | null
      billRateCurrency: string
      billRateAmount: string
      priority: $Enums.LeadPriority | null
      additionalRequirements: string | null
      status: $Enums.EngagementLeadStatus
      convertedEngagementId: string | null
      createdAt: Date
      updatedAt: Date
      updatedBy: string | null
    }, ExtArgs["result"]["engagementLead"]>
    composites: {}
  }

  type EngagementLeadGetPayload<S extends boolean | null | undefined | EngagementLeadDefaultArgs> = $Result.GetResult<Prisma.$EngagementLeadPayload, S>

  type EngagementLeadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EngagementLeadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EngagementLeadCountAggregateInputType | true
    }

  export interface EngagementLeadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EngagementLead'], meta: { name: 'EngagementLead' } }
    /**
     * Find zero or one EngagementLead that matches the filter.
     * @param {EngagementLeadFindUniqueArgs} args - Arguments to find a EngagementLead
     * @example
     * // Get one EngagementLead
     * const engagementLead = await prisma.engagementLead.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EngagementLeadFindUniqueArgs>(args: SelectSubset<T, EngagementLeadFindUniqueArgs<ExtArgs>>): Prisma__EngagementLeadClient<$Result.GetResult<Prisma.$EngagementLeadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EngagementLead that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EngagementLeadFindUniqueOrThrowArgs} args - Arguments to find a EngagementLead
     * @example
     * // Get one EngagementLead
     * const engagementLead = await prisma.engagementLead.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EngagementLeadFindUniqueOrThrowArgs>(args: SelectSubset<T, EngagementLeadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EngagementLeadClient<$Result.GetResult<Prisma.$EngagementLeadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EngagementLead that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementLeadFindFirstArgs} args - Arguments to find a EngagementLead
     * @example
     * // Get one EngagementLead
     * const engagementLead = await prisma.engagementLead.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EngagementLeadFindFirstArgs>(args?: SelectSubset<T, EngagementLeadFindFirstArgs<ExtArgs>>): Prisma__EngagementLeadClient<$Result.GetResult<Prisma.$EngagementLeadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EngagementLead that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementLeadFindFirstOrThrowArgs} args - Arguments to find a EngagementLead
     * @example
     * // Get one EngagementLead
     * const engagementLead = await prisma.engagementLead.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EngagementLeadFindFirstOrThrowArgs>(args?: SelectSubset<T, EngagementLeadFindFirstOrThrowArgs<ExtArgs>>): Prisma__EngagementLeadClient<$Result.GetResult<Prisma.$EngagementLeadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EngagementLeads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementLeadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EngagementLeads
     * const engagementLeads = await prisma.engagementLead.findMany()
     * 
     * // Get first 10 EngagementLeads
     * const engagementLeads = await prisma.engagementLead.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const engagementLeadWithIdOnly = await prisma.engagementLead.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EngagementLeadFindManyArgs>(args?: SelectSubset<T, EngagementLeadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementLeadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EngagementLead.
     * @param {EngagementLeadCreateArgs} args - Arguments to create a EngagementLead.
     * @example
     * // Create one EngagementLead
     * const EngagementLead = await prisma.engagementLead.create({
     *   data: {
     *     // ... data to create a EngagementLead
     *   }
     * })
     * 
     */
    create<T extends EngagementLeadCreateArgs>(args: SelectSubset<T, EngagementLeadCreateArgs<ExtArgs>>): Prisma__EngagementLeadClient<$Result.GetResult<Prisma.$EngagementLeadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EngagementLeads.
     * @param {EngagementLeadCreateManyArgs} args - Arguments to create many EngagementLeads.
     * @example
     * // Create many EngagementLeads
     * const engagementLead = await prisma.engagementLead.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EngagementLeadCreateManyArgs>(args?: SelectSubset<T, EngagementLeadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EngagementLeads and returns the data saved in the database.
     * @param {EngagementLeadCreateManyAndReturnArgs} args - Arguments to create many EngagementLeads.
     * @example
     * // Create many EngagementLeads
     * const engagementLead = await prisma.engagementLead.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EngagementLeads and only return the `id`
     * const engagementLeadWithIdOnly = await prisma.engagementLead.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EngagementLeadCreateManyAndReturnArgs>(args?: SelectSubset<T, EngagementLeadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementLeadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EngagementLead.
     * @param {EngagementLeadDeleteArgs} args - Arguments to delete one EngagementLead.
     * @example
     * // Delete one EngagementLead
     * const EngagementLead = await prisma.engagementLead.delete({
     *   where: {
     *     // ... filter to delete one EngagementLead
     *   }
     * })
     * 
     */
    delete<T extends EngagementLeadDeleteArgs>(args: SelectSubset<T, EngagementLeadDeleteArgs<ExtArgs>>): Prisma__EngagementLeadClient<$Result.GetResult<Prisma.$EngagementLeadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EngagementLead.
     * @param {EngagementLeadUpdateArgs} args - Arguments to update one EngagementLead.
     * @example
     * // Update one EngagementLead
     * const engagementLead = await prisma.engagementLead.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EngagementLeadUpdateArgs>(args: SelectSubset<T, EngagementLeadUpdateArgs<ExtArgs>>): Prisma__EngagementLeadClient<$Result.GetResult<Prisma.$EngagementLeadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EngagementLeads.
     * @param {EngagementLeadDeleteManyArgs} args - Arguments to filter EngagementLeads to delete.
     * @example
     * // Delete a few EngagementLeads
     * const { count } = await prisma.engagementLead.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EngagementLeadDeleteManyArgs>(args?: SelectSubset<T, EngagementLeadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EngagementLeads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementLeadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EngagementLeads
     * const engagementLead = await prisma.engagementLead.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EngagementLeadUpdateManyArgs>(args: SelectSubset<T, EngagementLeadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EngagementLeads and returns the data updated in the database.
     * @param {EngagementLeadUpdateManyAndReturnArgs} args - Arguments to update many EngagementLeads.
     * @example
     * // Update many EngagementLeads
     * const engagementLead = await prisma.engagementLead.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EngagementLeads and only return the `id`
     * const engagementLeadWithIdOnly = await prisma.engagementLead.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EngagementLeadUpdateManyAndReturnArgs>(args: SelectSubset<T, EngagementLeadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementLeadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EngagementLead.
     * @param {EngagementLeadUpsertArgs} args - Arguments to update or create a EngagementLead.
     * @example
     * // Update or create a EngagementLead
     * const engagementLead = await prisma.engagementLead.upsert({
     *   create: {
     *     // ... data to create a EngagementLead
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EngagementLead we want to update
     *   }
     * })
     */
    upsert<T extends EngagementLeadUpsertArgs>(args: SelectSubset<T, EngagementLeadUpsertArgs<ExtArgs>>): Prisma__EngagementLeadClient<$Result.GetResult<Prisma.$EngagementLeadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EngagementLeads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementLeadCountArgs} args - Arguments to filter EngagementLeads to count.
     * @example
     * // Count the number of EngagementLeads
     * const count = await prisma.engagementLead.count({
     *   where: {
     *     // ... the filter for the EngagementLeads we want to count
     *   }
     * })
    **/
    count<T extends EngagementLeadCountArgs>(
      args?: Subset<T, EngagementLeadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EngagementLeadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EngagementLead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementLeadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EngagementLeadAggregateArgs>(args: Subset<T, EngagementLeadAggregateArgs>): Prisma.PrismaPromise<GetEngagementLeadAggregateType<T>>

    /**
     * Group by EngagementLead.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementLeadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EngagementLeadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EngagementLeadGroupByArgs['orderBy'] }
        : { orderBy?: EngagementLeadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EngagementLeadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEngagementLeadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EngagementLead model
   */
  readonly fields: EngagementLeadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EngagementLead.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EngagementLeadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EngagementLead model
   */
  interface EngagementLeadFieldRefs {
    readonly id: FieldRef<"EngagementLead", 'String'>
    readonly workEmail: FieldRef<"EngagementLead", 'String'>
    readonly accountName: FieldRef<"EngagementLead", 'String'>
    readonly smu: FieldRef<"EngagementLead", 'String'>
    readonly engagementModel: FieldRef<"EngagementLead", 'EngagementModel'>
    readonly roleTitle: FieldRef<"EngagementLead", 'String'>
    readonly jobDescription: FieldRef<"EngagementLead", 'String'>
    readonly requiredSkills: FieldRef<"EngagementLead", 'String[]'>
    readonly experienceLevel: FieldRef<"EngagementLead", 'ExperienceLevel'>
    readonly minYearsExperience: FieldRef<"EngagementLead", 'Int'>
    readonly industryDomain: FieldRef<"EngagementLead", 'String'>
    readonly resourcesRequired: FieldRef<"EngagementLead", 'Int'>
    readonly preferredStartDate: FieldRef<"EngagementLead", 'DateTime'>
    readonly engagementDuration: FieldRef<"EngagementLead", 'String'>
    readonly workingHoursPerDay: FieldRef<"EngagementLead", 'Float'>
    readonly timeZoneRequirement: FieldRef<"EngagementLead", 'String'>
    readonly remoteWorkAccepted: FieldRef<"EngagementLead", 'Boolean'>
    readonly workLocationRestrictions: FieldRef<"EngagementLead", 'String'>
    readonly billRateCurrency: FieldRef<"EngagementLead", 'String'>
    readonly billRateAmount: FieldRef<"EngagementLead", 'String'>
    readonly priority: FieldRef<"EngagementLead", 'LeadPriority'>
    readonly additionalRequirements: FieldRef<"EngagementLead", 'String'>
    readonly status: FieldRef<"EngagementLead", 'EngagementLeadStatus'>
    readonly convertedEngagementId: FieldRef<"EngagementLead", 'String'>
    readonly createdAt: FieldRef<"EngagementLead", 'DateTime'>
    readonly updatedAt: FieldRef<"EngagementLead", 'DateTime'>
    readonly updatedBy: FieldRef<"EngagementLead", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EngagementLead findUnique
   */
  export type EngagementLeadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementLead
     */
    select?: EngagementLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementLead
     */
    omit?: EngagementLeadOmit<ExtArgs> | null
    /**
     * Filter, which EngagementLead to fetch.
     */
    where: EngagementLeadWhereUniqueInput
  }

  /**
   * EngagementLead findUniqueOrThrow
   */
  export type EngagementLeadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementLead
     */
    select?: EngagementLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementLead
     */
    omit?: EngagementLeadOmit<ExtArgs> | null
    /**
     * Filter, which EngagementLead to fetch.
     */
    where: EngagementLeadWhereUniqueInput
  }

  /**
   * EngagementLead findFirst
   */
  export type EngagementLeadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementLead
     */
    select?: EngagementLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementLead
     */
    omit?: EngagementLeadOmit<ExtArgs> | null
    /**
     * Filter, which EngagementLead to fetch.
     */
    where?: EngagementLeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementLeads to fetch.
     */
    orderBy?: EngagementLeadOrderByWithRelationInput | EngagementLeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EngagementLeads.
     */
    cursor?: EngagementLeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementLeads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementLeads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementLeads.
     */
    distinct?: EngagementLeadScalarFieldEnum | EngagementLeadScalarFieldEnum[]
  }

  /**
   * EngagementLead findFirstOrThrow
   */
  export type EngagementLeadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementLead
     */
    select?: EngagementLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementLead
     */
    omit?: EngagementLeadOmit<ExtArgs> | null
    /**
     * Filter, which EngagementLead to fetch.
     */
    where?: EngagementLeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementLeads to fetch.
     */
    orderBy?: EngagementLeadOrderByWithRelationInput | EngagementLeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EngagementLeads.
     */
    cursor?: EngagementLeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementLeads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementLeads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementLeads.
     */
    distinct?: EngagementLeadScalarFieldEnum | EngagementLeadScalarFieldEnum[]
  }

  /**
   * EngagementLead findMany
   */
  export type EngagementLeadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementLead
     */
    select?: EngagementLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementLead
     */
    omit?: EngagementLeadOmit<ExtArgs> | null
    /**
     * Filter, which EngagementLeads to fetch.
     */
    where?: EngagementLeadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementLeads to fetch.
     */
    orderBy?: EngagementLeadOrderByWithRelationInput | EngagementLeadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EngagementLeads.
     */
    cursor?: EngagementLeadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementLeads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementLeads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementLeads.
     */
    distinct?: EngagementLeadScalarFieldEnum | EngagementLeadScalarFieldEnum[]
  }

  /**
   * EngagementLead create
   */
  export type EngagementLeadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementLead
     */
    select?: EngagementLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementLead
     */
    omit?: EngagementLeadOmit<ExtArgs> | null
    /**
     * The data needed to create a EngagementLead.
     */
    data: XOR<EngagementLeadCreateInput, EngagementLeadUncheckedCreateInput>
  }

  /**
   * EngagementLead createMany
   */
  export type EngagementLeadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EngagementLeads.
     */
    data: EngagementLeadCreateManyInput | EngagementLeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EngagementLead createManyAndReturn
   */
  export type EngagementLeadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementLead
     */
    select?: EngagementLeadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementLead
     */
    omit?: EngagementLeadOmit<ExtArgs> | null
    /**
     * The data used to create many EngagementLeads.
     */
    data: EngagementLeadCreateManyInput | EngagementLeadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EngagementLead update
   */
  export type EngagementLeadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementLead
     */
    select?: EngagementLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementLead
     */
    omit?: EngagementLeadOmit<ExtArgs> | null
    /**
     * The data needed to update a EngagementLead.
     */
    data: XOR<EngagementLeadUpdateInput, EngagementLeadUncheckedUpdateInput>
    /**
     * Choose, which EngagementLead to update.
     */
    where: EngagementLeadWhereUniqueInput
  }

  /**
   * EngagementLead updateMany
   */
  export type EngagementLeadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EngagementLeads.
     */
    data: XOR<EngagementLeadUpdateManyMutationInput, EngagementLeadUncheckedUpdateManyInput>
    /**
     * Filter which EngagementLeads to update
     */
    where?: EngagementLeadWhereInput
    /**
     * Limit how many EngagementLeads to update.
     */
    limit?: number
  }

  /**
   * EngagementLead updateManyAndReturn
   */
  export type EngagementLeadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementLead
     */
    select?: EngagementLeadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementLead
     */
    omit?: EngagementLeadOmit<ExtArgs> | null
    /**
     * The data used to update EngagementLeads.
     */
    data: XOR<EngagementLeadUpdateManyMutationInput, EngagementLeadUncheckedUpdateManyInput>
    /**
     * Filter which EngagementLeads to update
     */
    where?: EngagementLeadWhereInput
    /**
     * Limit how many EngagementLeads to update.
     */
    limit?: number
  }

  /**
   * EngagementLead upsert
   */
  export type EngagementLeadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementLead
     */
    select?: EngagementLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementLead
     */
    omit?: EngagementLeadOmit<ExtArgs> | null
    /**
     * The filter to search for the EngagementLead to update in case it exists.
     */
    where: EngagementLeadWhereUniqueInput
    /**
     * In case the EngagementLead found by the `where` argument doesn't exist, create a new EngagementLead with this data.
     */
    create: XOR<EngagementLeadCreateInput, EngagementLeadUncheckedCreateInput>
    /**
     * In case the EngagementLead was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EngagementLeadUpdateInput, EngagementLeadUncheckedUpdateInput>
  }

  /**
   * EngagementLead delete
   */
  export type EngagementLeadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementLead
     */
    select?: EngagementLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementLead
     */
    omit?: EngagementLeadOmit<ExtArgs> | null
    /**
     * Filter which EngagementLead to delete.
     */
    where: EngagementLeadWhereUniqueInput
  }

  /**
   * EngagementLead deleteMany
   */
  export type EngagementLeadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EngagementLeads to delete
     */
    where?: EngagementLeadWhereInput
    /**
     * Limit how many EngagementLeads to delete.
     */
    limit?: number
  }

  /**
   * EngagementLead without action
   */
  export type EngagementLeadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementLead
     */
    select?: EngagementLeadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementLead
     */
    omit?: EngagementLeadOmit<ExtArgs> | null
  }


  /**
   * Model EngagementTimesheetEntry
   */

  export type AggregateEngagementTimesheetEntry = {
    _count: EngagementTimesheetEntryCountAggregateOutputType | null
    _avg: EngagementTimesheetEntryAvgAggregateOutputType | null
    _sum: EngagementTimesheetEntrySumAggregateOutputType | null
    _min: EngagementTimesheetEntryMinAggregateOutputType | null
    _max: EngagementTimesheetEntryMaxAggregateOutputType | null
  }

  export type EngagementTimesheetEntryAvgAggregateOutputType = {
    hoursWorked: Decimal | null
  }

  export type EngagementTimesheetEntrySumAggregateOutputType = {
    hoursWorked: Decimal | null
  }

  export type EngagementTimesheetEntryMinAggregateOutputType = {
    id: string | null
    engagementAssignmentId: string | null
    workDate: Date | null
    hoursWorked: Decimal | null
    remarks: string | null
    status: $Enums.TimesheetEntryStatus | null
    submittedAt: Date | null
    submittedBy: string | null
    approvedAt: Date | null
    approvedBy: string | null
    approvedByHandle: string | null
    approvalComment: string | null
    reopenedAt: Date | null
    paidPaymentReference: string | null
    paidAt: Date | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type EngagementTimesheetEntryMaxAggregateOutputType = {
    id: string | null
    engagementAssignmentId: string | null
    workDate: Date | null
    hoursWorked: Decimal | null
    remarks: string | null
    status: $Enums.TimesheetEntryStatus | null
    submittedAt: Date | null
    submittedBy: string | null
    approvedAt: Date | null
    approvedBy: string | null
    approvedByHandle: string | null
    approvalComment: string | null
    reopenedAt: Date | null
    paidPaymentReference: string | null
    paidAt: Date | null
    createdAt: Date | null
    createdBy: string | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type EngagementTimesheetEntryCountAggregateOutputType = {
    id: number
    engagementAssignmentId: number
    workDate: number
    hoursWorked: number
    remarks: number
    status: number
    submittedAt: number
    submittedBy: number
    approvedAt: number
    approvedBy: number
    approvedByHandle: number
    approvalComment: number
    reopenedAt: number
    paidPaymentReference: number
    paidAt: number
    createdAt: number
    createdBy: number
    updatedAt: number
    updatedBy: number
    _all: number
  }


  export type EngagementTimesheetEntryAvgAggregateInputType = {
    hoursWorked?: true
  }

  export type EngagementTimesheetEntrySumAggregateInputType = {
    hoursWorked?: true
  }

  export type EngagementTimesheetEntryMinAggregateInputType = {
    id?: true
    engagementAssignmentId?: true
    workDate?: true
    hoursWorked?: true
    remarks?: true
    status?: true
    submittedAt?: true
    submittedBy?: true
    approvedAt?: true
    approvedBy?: true
    approvedByHandle?: true
    approvalComment?: true
    reopenedAt?: true
    paidPaymentReference?: true
    paidAt?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type EngagementTimesheetEntryMaxAggregateInputType = {
    id?: true
    engagementAssignmentId?: true
    workDate?: true
    hoursWorked?: true
    remarks?: true
    status?: true
    submittedAt?: true
    submittedBy?: true
    approvedAt?: true
    approvedBy?: true
    approvedByHandle?: true
    approvalComment?: true
    reopenedAt?: true
    paidPaymentReference?: true
    paidAt?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type EngagementTimesheetEntryCountAggregateInputType = {
    id?: true
    engagementAssignmentId?: true
    workDate?: true
    hoursWorked?: true
    remarks?: true
    status?: true
    submittedAt?: true
    submittedBy?: true
    approvedAt?: true
    approvedBy?: true
    approvedByHandle?: true
    approvalComment?: true
    reopenedAt?: true
    paidPaymentReference?: true
    paidAt?: true
    createdAt?: true
    createdBy?: true
    updatedAt?: true
    updatedBy?: true
    _all?: true
  }

  export type EngagementTimesheetEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EngagementTimesheetEntry to aggregate.
     */
    where?: EngagementTimesheetEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementTimesheetEntries to fetch.
     */
    orderBy?: EngagementTimesheetEntryOrderByWithRelationInput | EngagementTimesheetEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EngagementTimesheetEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementTimesheetEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementTimesheetEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EngagementTimesheetEntries
    **/
    _count?: true | EngagementTimesheetEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EngagementTimesheetEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EngagementTimesheetEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EngagementTimesheetEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EngagementTimesheetEntryMaxAggregateInputType
  }

  export type GetEngagementTimesheetEntryAggregateType<T extends EngagementTimesheetEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateEngagementTimesheetEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEngagementTimesheetEntry[P]>
      : GetScalarType<T[P], AggregateEngagementTimesheetEntry[P]>
  }




  export type EngagementTimesheetEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EngagementTimesheetEntryWhereInput
    orderBy?: EngagementTimesheetEntryOrderByWithAggregationInput | EngagementTimesheetEntryOrderByWithAggregationInput[]
    by: EngagementTimesheetEntryScalarFieldEnum[] | EngagementTimesheetEntryScalarFieldEnum
    having?: EngagementTimesheetEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EngagementTimesheetEntryCountAggregateInputType | true
    _avg?: EngagementTimesheetEntryAvgAggregateInputType
    _sum?: EngagementTimesheetEntrySumAggregateInputType
    _min?: EngagementTimesheetEntryMinAggregateInputType
    _max?: EngagementTimesheetEntryMaxAggregateInputType
  }

  export type EngagementTimesheetEntryGroupByOutputType = {
    id: string
    engagementAssignmentId: string
    workDate: Date
    hoursWorked: Decimal
    remarks: string | null
    status: $Enums.TimesheetEntryStatus
    submittedAt: Date | null
    submittedBy: string | null
    approvedAt: Date | null
    approvedBy: string | null
    approvedByHandle: string | null
    approvalComment: string | null
    reopenedAt: Date | null
    paidPaymentReference: string | null
    paidAt: Date | null
    createdAt: Date
    createdBy: string
    updatedAt: Date
    updatedBy: string | null
    _count: EngagementTimesheetEntryCountAggregateOutputType | null
    _avg: EngagementTimesheetEntryAvgAggregateOutputType | null
    _sum: EngagementTimesheetEntrySumAggregateOutputType | null
    _min: EngagementTimesheetEntryMinAggregateOutputType | null
    _max: EngagementTimesheetEntryMaxAggregateOutputType | null
  }

  type GetEngagementTimesheetEntryGroupByPayload<T extends EngagementTimesheetEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EngagementTimesheetEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EngagementTimesheetEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EngagementTimesheetEntryGroupByOutputType[P]>
            : GetScalarType<T[P], EngagementTimesheetEntryGroupByOutputType[P]>
        }
      >
    >


  export type EngagementTimesheetEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementAssignmentId?: boolean
    workDate?: boolean
    hoursWorked?: boolean
    remarks?: boolean
    status?: boolean
    submittedAt?: boolean
    submittedBy?: boolean
    approvedAt?: boolean
    approvedBy?: boolean
    approvedByHandle?: boolean
    approvalComment?: boolean
    reopenedAt?: boolean
    paidPaymentReference?: boolean
    paidAt?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    assignment?: boolean | EngagementAssignmentDefaultArgs<ExtArgs>
    auditRecords?: boolean | EngagementTimesheetEntry$auditRecordsArgs<ExtArgs>
    _count?: boolean | EngagementTimesheetEntryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagementTimesheetEntry"]>

  export type EngagementTimesheetEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementAssignmentId?: boolean
    workDate?: boolean
    hoursWorked?: boolean
    remarks?: boolean
    status?: boolean
    submittedAt?: boolean
    submittedBy?: boolean
    approvedAt?: boolean
    approvedBy?: boolean
    approvedByHandle?: boolean
    approvalComment?: boolean
    reopenedAt?: boolean
    paidPaymentReference?: boolean
    paidAt?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    assignment?: boolean | EngagementAssignmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagementTimesheetEntry"]>

  export type EngagementTimesheetEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementAssignmentId?: boolean
    workDate?: boolean
    hoursWorked?: boolean
    remarks?: boolean
    status?: boolean
    submittedAt?: boolean
    submittedBy?: boolean
    approvedAt?: boolean
    approvedBy?: boolean
    approvedByHandle?: boolean
    approvalComment?: boolean
    reopenedAt?: boolean
    paidPaymentReference?: boolean
    paidAt?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    assignment?: boolean | EngagementAssignmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagementTimesheetEntry"]>

  export type EngagementTimesheetEntrySelectScalar = {
    id?: boolean
    engagementAssignmentId?: boolean
    workDate?: boolean
    hoursWorked?: boolean
    remarks?: boolean
    status?: boolean
    submittedAt?: boolean
    submittedBy?: boolean
    approvedAt?: boolean
    approvedBy?: boolean
    approvedByHandle?: boolean
    approvalComment?: boolean
    reopenedAt?: boolean
    paidPaymentReference?: boolean
    paidAt?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }

  export type EngagementTimesheetEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "engagementAssignmentId" | "workDate" | "hoursWorked" | "remarks" | "status" | "submittedAt" | "submittedBy" | "approvedAt" | "approvedBy" | "approvedByHandle" | "approvalComment" | "reopenedAt" | "paidPaymentReference" | "paidAt" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy", ExtArgs["result"]["engagementTimesheetEntry"]>
  export type EngagementTimesheetEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignment?: boolean | EngagementAssignmentDefaultArgs<ExtArgs>
    auditRecords?: boolean | EngagementTimesheetEntry$auditRecordsArgs<ExtArgs>
    _count?: boolean | EngagementTimesheetEntryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EngagementTimesheetEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignment?: boolean | EngagementAssignmentDefaultArgs<ExtArgs>
  }
  export type EngagementTimesheetEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignment?: boolean | EngagementAssignmentDefaultArgs<ExtArgs>
  }

  export type $EngagementTimesheetEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EngagementTimesheetEntry"
    objects: {
      assignment: Prisma.$EngagementAssignmentPayload<ExtArgs>
      auditRecords: Prisma.$EngagementTimesheetAuditPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      engagementAssignmentId: string
      /**
       * Calendar day the hours were worked. Stored as a date, not a timestamp: a timesheet row is a
       * calendar day in the member's frame of reference, so the unique constraint below means "one
       * entry per day" and no timezone conversion can shift the 7th into the 6th.
       */
      workDate: Date
      /**
       * Decimal, not Float: these hours are summed and multiplied by an hourly rate to produce a
       * payment amount, so they must sum exactly.
       */
      hoursWorked: Prisma.Decimal
      remarks: string | null
      status: $Enums.TimesheetEntryStatus
      submittedAt: Date | null
      submittedBy: string | null
      approvedAt: Date | null
      approvedBy: string | null
      approvedByHandle: string | null
      approvalComment: string | null
      /**
       * Set when an administrator reopens an approved entry. The entry returns to DRAFT; this field is
       * what lets the UI badge it "Reopened" without the state machine growing a fourth status.
       */
      reopenedAt: Date | null
      paidPaymentReference: string | null
      paidAt: Date | null
      createdAt: Date
      createdBy: string
      updatedAt: Date
      updatedBy: string | null
    }, ExtArgs["result"]["engagementTimesheetEntry"]>
    composites: {}
  }

  type EngagementTimesheetEntryGetPayload<S extends boolean | null | undefined | EngagementTimesheetEntryDefaultArgs> = $Result.GetResult<Prisma.$EngagementTimesheetEntryPayload, S>

  type EngagementTimesheetEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EngagementTimesheetEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EngagementTimesheetEntryCountAggregateInputType | true
    }

  export interface EngagementTimesheetEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EngagementTimesheetEntry'], meta: { name: 'EngagementTimesheetEntry' } }
    /**
     * Find zero or one EngagementTimesheetEntry that matches the filter.
     * @param {EngagementTimesheetEntryFindUniqueArgs} args - Arguments to find a EngagementTimesheetEntry
     * @example
     * // Get one EngagementTimesheetEntry
     * const engagementTimesheetEntry = await prisma.engagementTimesheetEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EngagementTimesheetEntryFindUniqueArgs>(args: SelectSubset<T, EngagementTimesheetEntryFindUniqueArgs<ExtArgs>>): Prisma__EngagementTimesheetEntryClient<$Result.GetResult<Prisma.$EngagementTimesheetEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EngagementTimesheetEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EngagementTimesheetEntryFindUniqueOrThrowArgs} args - Arguments to find a EngagementTimesheetEntry
     * @example
     * // Get one EngagementTimesheetEntry
     * const engagementTimesheetEntry = await prisma.engagementTimesheetEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EngagementTimesheetEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, EngagementTimesheetEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EngagementTimesheetEntryClient<$Result.GetResult<Prisma.$EngagementTimesheetEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EngagementTimesheetEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementTimesheetEntryFindFirstArgs} args - Arguments to find a EngagementTimesheetEntry
     * @example
     * // Get one EngagementTimesheetEntry
     * const engagementTimesheetEntry = await prisma.engagementTimesheetEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EngagementTimesheetEntryFindFirstArgs>(args?: SelectSubset<T, EngagementTimesheetEntryFindFirstArgs<ExtArgs>>): Prisma__EngagementTimesheetEntryClient<$Result.GetResult<Prisma.$EngagementTimesheetEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EngagementTimesheetEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementTimesheetEntryFindFirstOrThrowArgs} args - Arguments to find a EngagementTimesheetEntry
     * @example
     * // Get one EngagementTimesheetEntry
     * const engagementTimesheetEntry = await prisma.engagementTimesheetEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EngagementTimesheetEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, EngagementTimesheetEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__EngagementTimesheetEntryClient<$Result.GetResult<Prisma.$EngagementTimesheetEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EngagementTimesheetEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementTimesheetEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EngagementTimesheetEntries
     * const engagementTimesheetEntries = await prisma.engagementTimesheetEntry.findMany()
     * 
     * // Get first 10 EngagementTimesheetEntries
     * const engagementTimesheetEntries = await prisma.engagementTimesheetEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const engagementTimesheetEntryWithIdOnly = await prisma.engagementTimesheetEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EngagementTimesheetEntryFindManyArgs>(args?: SelectSubset<T, EngagementTimesheetEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementTimesheetEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EngagementTimesheetEntry.
     * @param {EngagementTimesheetEntryCreateArgs} args - Arguments to create a EngagementTimesheetEntry.
     * @example
     * // Create one EngagementTimesheetEntry
     * const EngagementTimesheetEntry = await prisma.engagementTimesheetEntry.create({
     *   data: {
     *     // ... data to create a EngagementTimesheetEntry
     *   }
     * })
     * 
     */
    create<T extends EngagementTimesheetEntryCreateArgs>(args: SelectSubset<T, EngagementTimesheetEntryCreateArgs<ExtArgs>>): Prisma__EngagementTimesheetEntryClient<$Result.GetResult<Prisma.$EngagementTimesheetEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EngagementTimesheetEntries.
     * @param {EngagementTimesheetEntryCreateManyArgs} args - Arguments to create many EngagementTimesheetEntries.
     * @example
     * // Create many EngagementTimesheetEntries
     * const engagementTimesheetEntry = await prisma.engagementTimesheetEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EngagementTimesheetEntryCreateManyArgs>(args?: SelectSubset<T, EngagementTimesheetEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EngagementTimesheetEntries and returns the data saved in the database.
     * @param {EngagementTimesheetEntryCreateManyAndReturnArgs} args - Arguments to create many EngagementTimesheetEntries.
     * @example
     * // Create many EngagementTimesheetEntries
     * const engagementTimesheetEntry = await prisma.engagementTimesheetEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EngagementTimesheetEntries and only return the `id`
     * const engagementTimesheetEntryWithIdOnly = await prisma.engagementTimesheetEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EngagementTimesheetEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, EngagementTimesheetEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementTimesheetEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EngagementTimesheetEntry.
     * @param {EngagementTimesheetEntryDeleteArgs} args - Arguments to delete one EngagementTimesheetEntry.
     * @example
     * // Delete one EngagementTimesheetEntry
     * const EngagementTimesheetEntry = await prisma.engagementTimesheetEntry.delete({
     *   where: {
     *     // ... filter to delete one EngagementTimesheetEntry
     *   }
     * })
     * 
     */
    delete<T extends EngagementTimesheetEntryDeleteArgs>(args: SelectSubset<T, EngagementTimesheetEntryDeleteArgs<ExtArgs>>): Prisma__EngagementTimesheetEntryClient<$Result.GetResult<Prisma.$EngagementTimesheetEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EngagementTimesheetEntry.
     * @param {EngagementTimesheetEntryUpdateArgs} args - Arguments to update one EngagementTimesheetEntry.
     * @example
     * // Update one EngagementTimesheetEntry
     * const engagementTimesheetEntry = await prisma.engagementTimesheetEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EngagementTimesheetEntryUpdateArgs>(args: SelectSubset<T, EngagementTimesheetEntryUpdateArgs<ExtArgs>>): Prisma__EngagementTimesheetEntryClient<$Result.GetResult<Prisma.$EngagementTimesheetEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EngagementTimesheetEntries.
     * @param {EngagementTimesheetEntryDeleteManyArgs} args - Arguments to filter EngagementTimesheetEntries to delete.
     * @example
     * // Delete a few EngagementTimesheetEntries
     * const { count } = await prisma.engagementTimesheetEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EngagementTimesheetEntryDeleteManyArgs>(args?: SelectSubset<T, EngagementTimesheetEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EngagementTimesheetEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementTimesheetEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EngagementTimesheetEntries
     * const engagementTimesheetEntry = await prisma.engagementTimesheetEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EngagementTimesheetEntryUpdateManyArgs>(args: SelectSubset<T, EngagementTimesheetEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EngagementTimesheetEntries and returns the data updated in the database.
     * @param {EngagementTimesheetEntryUpdateManyAndReturnArgs} args - Arguments to update many EngagementTimesheetEntries.
     * @example
     * // Update many EngagementTimesheetEntries
     * const engagementTimesheetEntry = await prisma.engagementTimesheetEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EngagementTimesheetEntries and only return the `id`
     * const engagementTimesheetEntryWithIdOnly = await prisma.engagementTimesheetEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EngagementTimesheetEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, EngagementTimesheetEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementTimesheetEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EngagementTimesheetEntry.
     * @param {EngagementTimesheetEntryUpsertArgs} args - Arguments to update or create a EngagementTimesheetEntry.
     * @example
     * // Update or create a EngagementTimesheetEntry
     * const engagementTimesheetEntry = await prisma.engagementTimesheetEntry.upsert({
     *   create: {
     *     // ... data to create a EngagementTimesheetEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EngagementTimesheetEntry we want to update
     *   }
     * })
     */
    upsert<T extends EngagementTimesheetEntryUpsertArgs>(args: SelectSubset<T, EngagementTimesheetEntryUpsertArgs<ExtArgs>>): Prisma__EngagementTimesheetEntryClient<$Result.GetResult<Prisma.$EngagementTimesheetEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EngagementTimesheetEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementTimesheetEntryCountArgs} args - Arguments to filter EngagementTimesheetEntries to count.
     * @example
     * // Count the number of EngagementTimesheetEntries
     * const count = await prisma.engagementTimesheetEntry.count({
     *   where: {
     *     // ... the filter for the EngagementTimesheetEntries we want to count
     *   }
     * })
    **/
    count<T extends EngagementTimesheetEntryCountArgs>(
      args?: Subset<T, EngagementTimesheetEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EngagementTimesheetEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EngagementTimesheetEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementTimesheetEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EngagementTimesheetEntryAggregateArgs>(args: Subset<T, EngagementTimesheetEntryAggregateArgs>): Prisma.PrismaPromise<GetEngagementTimesheetEntryAggregateType<T>>

    /**
     * Group by EngagementTimesheetEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementTimesheetEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EngagementTimesheetEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EngagementTimesheetEntryGroupByArgs['orderBy'] }
        : { orderBy?: EngagementTimesheetEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EngagementTimesheetEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEngagementTimesheetEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EngagementTimesheetEntry model
   */
  readonly fields: EngagementTimesheetEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EngagementTimesheetEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EngagementTimesheetEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignment<T extends EngagementAssignmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EngagementAssignmentDefaultArgs<ExtArgs>>): Prisma__EngagementAssignmentClient<$Result.GetResult<Prisma.$EngagementAssignmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    auditRecords<T extends EngagementTimesheetEntry$auditRecordsArgs<ExtArgs> = {}>(args?: Subset<T, EngagementTimesheetEntry$auditRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementTimesheetAuditPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EngagementTimesheetEntry model
   */
  interface EngagementTimesheetEntryFieldRefs {
    readonly id: FieldRef<"EngagementTimesheetEntry", 'String'>
    readonly engagementAssignmentId: FieldRef<"EngagementTimesheetEntry", 'String'>
    readonly workDate: FieldRef<"EngagementTimesheetEntry", 'DateTime'>
    readonly hoursWorked: FieldRef<"EngagementTimesheetEntry", 'Decimal'>
    readonly remarks: FieldRef<"EngagementTimesheetEntry", 'String'>
    readonly status: FieldRef<"EngagementTimesheetEntry", 'TimesheetEntryStatus'>
    readonly submittedAt: FieldRef<"EngagementTimesheetEntry", 'DateTime'>
    readonly submittedBy: FieldRef<"EngagementTimesheetEntry", 'String'>
    readonly approvedAt: FieldRef<"EngagementTimesheetEntry", 'DateTime'>
    readonly approvedBy: FieldRef<"EngagementTimesheetEntry", 'String'>
    readonly approvedByHandle: FieldRef<"EngagementTimesheetEntry", 'String'>
    readonly approvalComment: FieldRef<"EngagementTimesheetEntry", 'String'>
    readonly reopenedAt: FieldRef<"EngagementTimesheetEntry", 'DateTime'>
    readonly paidPaymentReference: FieldRef<"EngagementTimesheetEntry", 'String'>
    readonly paidAt: FieldRef<"EngagementTimesheetEntry", 'DateTime'>
    readonly createdAt: FieldRef<"EngagementTimesheetEntry", 'DateTime'>
    readonly createdBy: FieldRef<"EngagementTimesheetEntry", 'String'>
    readonly updatedAt: FieldRef<"EngagementTimesheetEntry", 'DateTime'>
    readonly updatedBy: FieldRef<"EngagementTimesheetEntry", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EngagementTimesheetEntry findUnique
   */
  export type EngagementTimesheetEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetEntry
     */
    select?: EngagementTimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetEntry
     */
    omit?: EngagementTimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetEntryInclude<ExtArgs> | null
    /**
     * Filter, which EngagementTimesheetEntry to fetch.
     */
    where: EngagementTimesheetEntryWhereUniqueInput
  }

  /**
   * EngagementTimesheetEntry findUniqueOrThrow
   */
  export type EngagementTimesheetEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetEntry
     */
    select?: EngagementTimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetEntry
     */
    omit?: EngagementTimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetEntryInclude<ExtArgs> | null
    /**
     * Filter, which EngagementTimesheetEntry to fetch.
     */
    where: EngagementTimesheetEntryWhereUniqueInput
  }

  /**
   * EngagementTimesheetEntry findFirst
   */
  export type EngagementTimesheetEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetEntry
     */
    select?: EngagementTimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetEntry
     */
    omit?: EngagementTimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetEntryInclude<ExtArgs> | null
    /**
     * Filter, which EngagementTimesheetEntry to fetch.
     */
    where?: EngagementTimesheetEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementTimesheetEntries to fetch.
     */
    orderBy?: EngagementTimesheetEntryOrderByWithRelationInput | EngagementTimesheetEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EngagementTimesheetEntries.
     */
    cursor?: EngagementTimesheetEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementTimesheetEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementTimesheetEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementTimesheetEntries.
     */
    distinct?: EngagementTimesheetEntryScalarFieldEnum | EngagementTimesheetEntryScalarFieldEnum[]
  }

  /**
   * EngagementTimesheetEntry findFirstOrThrow
   */
  export type EngagementTimesheetEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetEntry
     */
    select?: EngagementTimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetEntry
     */
    omit?: EngagementTimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetEntryInclude<ExtArgs> | null
    /**
     * Filter, which EngagementTimesheetEntry to fetch.
     */
    where?: EngagementTimesheetEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementTimesheetEntries to fetch.
     */
    orderBy?: EngagementTimesheetEntryOrderByWithRelationInput | EngagementTimesheetEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EngagementTimesheetEntries.
     */
    cursor?: EngagementTimesheetEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementTimesheetEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementTimesheetEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementTimesheetEntries.
     */
    distinct?: EngagementTimesheetEntryScalarFieldEnum | EngagementTimesheetEntryScalarFieldEnum[]
  }

  /**
   * EngagementTimesheetEntry findMany
   */
  export type EngagementTimesheetEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetEntry
     */
    select?: EngagementTimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetEntry
     */
    omit?: EngagementTimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetEntryInclude<ExtArgs> | null
    /**
     * Filter, which EngagementTimesheetEntries to fetch.
     */
    where?: EngagementTimesheetEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementTimesheetEntries to fetch.
     */
    orderBy?: EngagementTimesheetEntryOrderByWithRelationInput | EngagementTimesheetEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EngagementTimesheetEntries.
     */
    cursor?: EngagementTimesheetEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementTimesheetEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementTimesheetEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementTimesheetEntries.
     */
    distinct?: EngagementTimesheetEntryScalarFieldEnum | EngagementTimesheetEntryScalarFieldEnum[]
  }

  /**
   * EngagementTimesheetEntry create
   */
  export type EngagementTimesheetEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetEntry
     */
    select?: EngagementTimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetEntry
     */
    omit?: EngagementTimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a EngagementTimesheetEntry.
     */
    data: XOR<EngagementTimesheetEntryCreateInput, EngagementTimesheetEntryUncheckedCreateInput>
  }

  /**
   * EngagementTimesheetEntry createMany
   */
  export type EngagementTimesheetEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EngagementTimesheetEntries.
     */
    data: EngagementTimesheetEntryCreateManyInput | EngagementTimesheetEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EngagementTimesheetEntry createManyAndReturn
   */
  export type EngagementTimesheetEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetEntry
     */
    select?: EngagementTimesheetEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetEntry
     */
    omit?: EngagementTimesheetEntryOmit<ExtArgs> | null
    /**
     * The data used to create many EngagementTimesheetEntries.
     */
    data: EngagementTimesheetEntryCreateManyInput | EngagementTimesheetEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EngagementTimesheetEntry update
   */
  export type EngagementTimesheetEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetEntry
     */
    select?: EngagementTimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetEntry
     */
    omit?: EngagementTimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a EngagementTimesheetEntry.
     */
    data: XOR<EngagementTimesheetEntryUpdateInput, EngagementTimesheetEntryUncheckedUpdateInput>
    /**
     * Choose, which EngagementTimesheetEntry to update.
     */
    where: EngagementTimesheetEntryWhereUniqueInput
  }

  /**
   * EngagementTimesheetEntry updateMany
   */
  export type EngagementTimesheetEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EngagementTimesheetEntries.
     */
    data: XOR<EngagementTimesheetEntryUpdateManyMutationInput, EngagementTimesheetEntryUncheckedUpdateManyInput>
    /**
     * Filter which EngagementTimesheetEntries to update
     */
    where?: EngagementTimesheetEntryWhereInput
    /**
     * Limit how many EngagementTimesheetEntries to update.
     */
    limit?: number
  }

  /**
   * EngagementTimesheetEntry updateManyAndReturn
   */
  export type EngagementTimesheetEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetEntry
     */
    select?: EngagementTimesheetEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetEntry
     */
    omit?: EngagementTimesheetEntryOmit<ExtArgs> | null
    /**
     * The data used to update EngagementTimesheetEntries.
     */
    data: XOR<EngagementTimesheetEntryUpdateManyMutationInput, EngagementTimesheetEntryUncheckedUpdateManyInput>
    /**
     * Filter which EngagementTimesheetEntries to update
     */
    where?: EngagementTimesheetEntryWhereInput
    /**
     * Limit how many EngagementTimesheetEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EngagementTimesheetEntry upsert
   */
  export type EngagementTimesheetEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetEntry
     */
    select?: EngagementTimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetEntry
     */
    omit?: EngagementTimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the EngagementTimesheetEntry to update in case it exists.
     */
    where: EngagementTimesheetEntryWhereUniqueInput
    /**
     * In case the EngagementTimesheetEntry found by the `where` argument doesn't exist, create a new EngagementTimesheetEntry with this data.
     */
    create: XOR<EngagementTimesheetEntryCreateInput, EngagementTimesheetEntryUncheckedCreateInput>
    /**
     * In case the EngagementTimesheetEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EngagementTimesheetEntryUpdateInput, EngagementTimesheetEntryUncheckedUpdateInput>
  }

  /**
   * EngagementTimesheetEntry delete
   */
  export type EngagementTimesheetEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetEntry
     */
    select?: EngagementTimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetEntry
     */
    omit?: EngagementTimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetEntryInclude<ExtArgs> | null
    /**
     * Filter which EngagementTimesheetEntry to delete.
     */
    where: EngagementTimesheetEntryWhereUniqueInput
  }

  /**
   * EngagementTimesheetEntry deleteMany
   */
  export type EngagementTimesheetEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EngagementTimesheetEntries to delete
     */
    where?: EngagementTimesheetEntryWhereInput
    /**
     * Limit how many EngagementTimesheetEntries to delete.
     */
    limit?: number
  }

  /**
   * EngagementTimesheetEntry.auditRecords
   */
  export type EngagementTimesheetEntry$auditRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetAudit
     */
    select?: EngagementTimesheetAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetAudit
     */
    omit?: EngagementTimesheetAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetAuditInclude<ExtArgs> | null
    where?: EngagementTimesheetAuditWhereInput
    orderBy?: EngagementTimesheetAuditOrderByWithRelationInput | EngagementTimesheetAuditOrderByWithRelationInput[]
    cursor?: EngagementTimesheetAuditWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EngagementTimesheetAuditScalarFieldEnum | EngagementTimesheetAuditScalarFieldEnum[]
  }

  /**
   * EngagementTimesheetEntry without action
   */
  export type EngagementTimesheetEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetEntry
     */
    select?: EngagementTimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetEntry
     */
    omit?: EngagementTimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetEntryInclude<ExtArgs> | null
  }


  /**
   * Model EngagementTimesheetAudit
   */

  export type AggregateEngagementTimesheetAudit = {
    _count: EngagementTimesheetAuditCountAggregateOutputType | null
    _min: EngagementTimesheetAuditMinAggregateOutputType | null
    _max: EngagementTimesheetAuditMaxAggregateOutputType | null
  }

  export type EngagementTimesheetAuditMinAggregateOutputType = {
    id: string | null
    timesheetEntryId: string | null
    engagementId: string | null
    action: $Enums.TimesheetAuditAction | null
    actorUserId: string | null
    actorHandle: string | null
    actorRole: string | null
    comment: string | null
    createdAt: Date | null
  }

  export type EngagementTimesheetAuditMaxAggregateOutputType = {
    id: string | null
    timesheetEntryId: string | null
    engagementId: string | null
    action: $Enums.TimesheetAuditAction | null
    actorUserId: string | null
    actorHandle: string | null
    actorRole: string | null
    comment: string | null
    createdAt: Date | null
  }

  export type EngagementTimesheetAuditCountAggregateOutputType = {
    id: number
    timesheetEntryId: number
    engagementId: number
    action: number
    previousValues: number
    updatedValues: number
    actorUserId: number
    actorHandle: number
    actorRole: number
    comment: number
    createdAt: number
    _all: number
  }


  export type EngagementTimesheetAuditMinAggregateInputType = {
    id?: true
    timesheetEntryId?: true
    engagementId?: true
    action?: true
    actorUserId?: true
    actorHandle?: true
    actorRole?: true
    comment?: true
    createdAt?: true
  }

  export type EngagementTimesheetAuditMaxAggregateInputType = {
    id?: true
    timesheetEntryId?: true
    engagementId?: true
    action?: true
    actorUserId?: true
    actorHandle?: true
    actorRole?: true
    comment?: true
    createdAt?: true
  }

  export type EngagementTimesheetAuditCountAggregateInputType = {
    id?: true
    timesheetEntryId?: true
    engagementId?: true
    action?: true
    previousValues?: true
    updatedValues?: true
    actorUserId?: true
    actorHandle?: true
    actorRole?: true
    comment?: true
    createdAt?: true
    _all?: true
  }

  export type EngagementTimesheetAuditAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EngagementTimesheetAudit to aggregate.
     */
    where?: EngagementTimesheetAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementTimesheetAudits to fetch.
     */
    orderBy?: EngagementTimesheetAuditOrderByWithRelationInput | EngagementTimesheetAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EngagementTimesheetAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementTimesheetAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementTimesheetAudits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EngagementTimesheetAudits
    **/
    _count?: true | EngagementTimesheetAuditCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EngagementTimesheetAuditMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EngagementTimesheetAuditMaxAggregateInputType
  }

  export type GetEngagementTimesheetAuditAggregateType<T extends EngagementTimesheetAuditAggregateArgs> = {
        [P in keyof T & keyof AggregateEngagementTimesheetAudit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEngagementTimesheetAudit[P]>
      : GetScalarType<T[P], AggregateEngagementTimesheetAudit[P]>
  }




  export type EngagementTimesheetAuditGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EngagementTimesheetAuditWhereInput
    orderBy?: EngagementTimesheetAuditOrderByWithAggregationInput | EngagementTimesheetAuditOrderByWithAggregationInput[]
    by: EngagementTimesheetAuditScalarFieldEnum[] | EngagementTimesheetAuditScalarFieldEnum
    having?: EngagementTimesheetAuditScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EngagementTimesheetAuditCountAggregateInputType | true
    _min?: EngagementTimesheetAuditMinAggregateInputType
    _max?: EngagementTimesheetAuditMaxAggregateInputType
  }

  export type EngagementTimesheetAuditGroupByOutputType = {
    id: string
    timesheetEntryId: string | null
    engagementId: string | null
    action: $Enums.TimesheetAuditAction
    previousValues: JsonValue | null
    updatedValues: JsonValue | null
    actorUserId: string
    actorHandle: string | null
    actorRole: string
    comment: string | null
    createdAt: Date
    _count: EngagementTimesheetAuditCountAggregateOutputType | null
    _min: EngagementTimesheetAuditMinAggregateOutputType | null
    _max: EngagementTimesheetAuditMaxAggregateOutputType | null
  }

  type GetEngagementTimesheetAuditGroupByPayload<T extends EngagementTimesheetAuditGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EngagementTimesheetAuditGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EngagementTimesheetAuditGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EngagementTimesheetAuditGroupByOutputType[P]>
            : GetScalarType<T[P], EngagementTimesheetAuditGroupByOutputType[P]>
        }
      >
    >


  export type EngagementTimesheetAuditSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timesheetEntryId?: boolean
    engagementId?: boolean
    action?: boolean
    previousValues?: boolean
    updatedValues?: boolean
    actorUserId?: boolean
    actorHandle?: boolean
    actorRole?: boolean
    comment?: boolean
    createdAt?: boolean
    entry?: boolean | EngagementTimesheetAudit$entryArgs<ExtArgs>
    engagement?: boolean | EngagementTimesheetAudit$engagementArgs<ExtArgs>
  }, ExtArgs["result"]["engagementTimesheetAudit"]>

  export type EngagementTimesheetAuditSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timesheetEntryId?: boolean
    engagementId?: boolean
    action?: boolean
    previousValues?: boolean
    updatedValues?: boolean
    actorUserId?: boolean
    actorHandle?: boolean
    actorRole?: boolean
    comment?: boolean
    createdAt?: boolean
    entry?: boolean | EngagementTimesheetAudit$entryArgs<ExtArgs>
    engagement?: boolean | EngagementTimesheetAudit$engagementArgs<ExtArgs>
  }, ExtArgs["result"]["engagementTimesheetAudit"]>

  export type EngagementTimesheetAuditSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timesheetEntryId?: boolean
    engagementId?: boolean
    action?: boolean
    previousValues?: boolean
    updatedValues?: boolean
    actorUserId?: boolean
    actorHandle?: boolean
    actorRole?: boolean
    comment?: boolean
    createdAt?: boolean
    entry?: boolean | EngagementTimesheetAudit$entryArgs<ExtArgs>
    engagement?: boolean | EngagementTimesheetAudit$engagementArgs<ExtArgs>
  }, ExtArgs["result"]["engagementTimesheetAudit"]>

  export type EngagementTimesheetAuditSelectScalar = {
    id?: boolean
    timesheetEntryId?: boolean
    engagementId?: boolean
    action?: boolean
    previousValues?: boolean
    updatedValues?: boolean
    actorUserId?: boolean
    actorHandle?: boolean
    actorRole?: boolean
    comment?: boolean
    createdAt?: boolean
  }

  export type EngagementTimesheetAuditOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "timesheetEntryId" | "engagementId" | "action" | "previousValues" | "updatedValues" | "actorUserId" | "actorHandle" | "actorRole" | "comment" | "createdAt", ExtArgs["result"]["engagementTimesheetAudit"]>
  export type EngagementTimesheetAuditInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | EngagementTimesheetAudit$entryArgs<ExtArgs>
    engagement?: boolean | EngagementTimesheetAudit$engagementArgs<ExtArgs>
  }
  export type EngagementTimesheetAuditIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | EngagementTimesheetAudit$entryArgs<ExtArgs>
    engagement?: boolean | EngagementTimesheetAudit$engagementArgs<ExtArgs>
  }
  export type EngagementTimesheetAuditIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | EngagementTimesheetAudit$entryArgs<ExtArgs>
    engagement?: boolean | EngagementTimesheetAudit$engagementArgs<ExtArgs>
  }

  export type $EngagementTimesheetAuditPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EngagementTimesheetAudit"
    objects: {
      entry: Prisma.$EngagementTimesheetEntryPayload<ExtArgs> | null
      engagement: Prisma.$EngagementPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      timesheetEntryId: string | null
      engagementId: string | null
      action: $Enums.TimesheetAuditAction
      previousValues: Prisma.JsonValue | null
      updatedValues: Prisma.JsonValue | null
      actorUserId: string
      actorHandle: string | null
      actorRole: string
      comment: string | null
      createdAt: Date
    }, ExtArgs["result"]["engagementTimesheetAudit"]>
    composites: {}
  }

  type EngagementTimesheetAuditGetPayload<S extends boolean | null | undefined | EngagementTimesheetAuditDefaultArgs> = $Result.GetResult<Prisma.$EngagementTimesheetAuditPayload, S>

  type EngagementTimesheetAuditCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EngagementTimesheetAuditFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EngagementTimesheetAuditCountAggregateInputType | true
    }

  export interface EngagementTimesheetAuditDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EngagementTimesheetAudit'], meta: { name: 'EngagementTimesheetAudit' } }
    /**
     * Find zero or one EngagementTimesheetAudit that matches the filter.
     * @param {EngagementTimesheetAuditFindUniqueArgs} args - Arguments to find a EngagementTimesheetAudit
     * @example
     * // Get one EngagementTimesheetAudit
     * const engagementTimesheetAudit = await prisma.engagementTimesheetAudit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EngagementTimesheetAuditFindUniqueArgs>(args: SelectSubset<T, EngagementTimesheetAuditFindUniqueArgs<ExtArgs>>): Prisma__EngagementTimesheetAuditClient<$Result.GetResult<Prisma.$EngagementTimesheetAuditPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EngagementTimesheetAudit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EngagementTimesheetAuditFindUniqueOrThrowArgs} args - Arguments to find a EngagementTimesheetAudit
     * @example
     * // Get one EngagementTimesheetAudit
     * const engagementTimesheetAudit = await prisma.engagementTimesheetAudit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EngagementTimesheetAuditFindUniqueOrThrowArgs>(args: SelectSubset<T, EngagementTimesheetAuditFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EngagementTimesheetAuditClient<$Result.GetResult<Prisma.$EngagementTimesheetAuditPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EngagementTimesheetAudit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementTimesheetAuditFindFirstArgs} args - Arguments to find a EngagementTimesheetAudit
     * @example
     * // Get one EngagementTimesheetAudit
     * const engagementTimesheetAudit = await prisma.engagementTimesheetAudit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EngagementTimesheetAuditFindFirstArgs>(args?: SelectSubset<T, EngagementTimesheetAuditFindFirstArgs<ExtArgs>>): Prisma__EngagementTimesheetAuditClient<$Result.GetResult<Prisma.$EngagementTimesheetAuditPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EngagementTimesheetAudit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementTimesheetAuditFindFirstOrThrowArgs} args - Arguments to find a EngagementTimesheetAudit
     * @example
     * // Get one EngagementTimesheetAudit
     * const engagementTimesheetAudit = await prisma.engagementTimesheetAudit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EngagementTimesheetAuditFindFirstOrThrowArgs>(args?: SelectSubset<T, EngagementTimesheetAuditFindFirstOrThrowArgs<ExtArgs>>): Prisma__EngagementTimesheetAuditClient<$Result.GetResult<Prisma.$EngagementTimesheetAuditPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EngagementTimesheetAudits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementTimesheetAuditFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EngagementTimesheetAudits
     * const engagementTimesheetAudits = await prisma.engagementTimesheetAudit.findMany()
     * 
     * // Get first 10 EngagementTimesheetAudits
     * const engagementTimesheetAudits = await prisma.engagementTimesheetAudit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const engagementTimesheetAuditWithIdOnly = await prisma.engagementTimesheetAudit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EngagementTimesheetAuditFindManyArgs>(args?: SelectSubset<T, EngagementTimesheetAuditFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementTimesheetAuditPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EngagementTimesheetAudit.
     * @param {EngagementTimesheetAuditCreateArgs} args - Arguments to create a EngagementTimesheetAudit.
     * @example
     * // Create one EngagementTimesheetAudit
     * const EngagementTimesheetAudit = await prisma.engagementTimesheetAudit.create({
     *   data: {
     *     // ... data to create a EngagementTimesheetAudit
     *   }
     * })
     * 
     */
    create<T extends EngagementTimesheetAuditCreateArgs>(args: SelectSubset<T, EngagementTimesheetAuditCreateArgs<ExtArgs>>): Prisma__EngagementTimesheetAuditClient<$Result.GetResult<Prisma.$EngagementTimesheetAuditPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EngagementTimesheetAudits.
     * @param {EngagementTimesheetAuditCreateManyArgs} args - Arguments to create many EngagementTimesheetAudits.
     * @example
     * // Create many EngagementTimesheetAudits
     * const engagementTimesheetAudit = await prisma.engagementTimesheetAudit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EngagementTimesheetAuditCreateManyArgs>(args?: SelectSubset<T, EngagementTimesheetAuditCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EngagementTimesheetAudits and returns the data saved in the database.
     * @param {EngagementTimesheetAuditCreateManyAndReturnArgs} args - Arguments to create many EngagementTimesheetAudits.
     * @example
     * // Create many EngagementTimesheetAudits
     * const engagementTimesheetAudit = await prisma.engagementTimesheetAudit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EngagementTimesheetAudits and only return the `id`
     * const engagementTimesheetAuditWithIdOnly = await prisma.engagementTimesheetAudit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EngagementTimesheetAuditCreateManyAndReturnArgs>(args?: SelectSubset<T, EngagementTimesheetAuditCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementTimesheetAuditPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EngagementTimesheetAudit.
     * @param {EngagementTimesheetAuditDeleteArgs} args - Arguments to delete one EngagementTimesheetAudit.
     * @example
     * // Delete one EngagementTimesheetAudit
     * const EngagementTimesheetAudit = await prisma.engagementTimesheetAudit.delete({
     *   where: {
     *     // ... filter to delete one EngagementTimesheetAudit
     *   }
     * })
     * 
     */
    delete<T extends EngagementTimesheetAuditDeleteArgs>(args: SelectSubset<T, EngagementTimesheetAuditDeleteArgs<ExtArgs>>): Prisma__EngagementTimesheetAuditClient<$Result.GetResult<Prisma.$EngagementTimesheetAuditPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EngagementTimesheetAudit.
     * @param {EngagementTimesheetAuditUpdateArgs} args - Arguments to update one EngagementTimesheetAudit.
     * @example
     * // Update one EngagementTimesheetAudit
     * const engagementTimesheetAudit = await prisma.engagementTimesheetAudit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EngagementTimesheetAuditUpdateArgs>(args: SelectSubset<T, EngagementTimesheetAuditUpdateArgs<ExtArgs>>): Prisma__EngagementTimesheetAuditClient<$Result.GetResult<Prisma.$EngagementTimesheetAuditPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EngagementTimesheetAudits.
     * @param {EngagementTimesheetAuditDeleteManyArgs} args - Arguments to filter EngagementTimesheetAudits to delete.
     * @example
     * // Delete a few EngagementTimesheetAudits
     * const { count } = await prisma.engagementTimesheetAudit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EngagementTimesheetAuditDeleteManyArgs>(args?: SelectSubset<T, EngagementTimesheetAuditDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EngagementTimesheetAudits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementTimesheetAuditUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EngagementTimesheetAudits
     * const engagementTimesheetAudit = await prisma.engagementTimesheetAudit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EngagementTimesheetAuditUpdateManyArgs>(args: SelectSubset<T, EngagementTimesheetAuditUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EngagementTimesheetAudits and returns the data updated in the database.
     * @param {EngagementTimesheetAuditUpdateManyAndReturnArgs} args - Arguments to update many EngagementTimesheetAudits.
     * @example
     * // Update many EngagementTimesheetAudits
     * const engagementTimesheetAudit = await prisma.engagementTimesheetAudit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EngagementTimesheetAudits and only return the `id`
     * const engagementTimesheetAuditWithIdOnly = await prisma.engagementTimesheetAudit.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EngagementTimesheetAuditUpdateManyAndReturnArgs>(args: SelectSubset<T, EngagementTimesheetAuditUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementTimesheetAuditPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EngagementTimesheetAudit.
     * @param {EngagementTimesheetAuditUpsertArgs} args - Arguments to update or create a EngagementTimesheetAudit.
     * @example
     * // Update or create a EngagementTimesheetAudit
     * const engagementTimesheetAudit = await prisma.engagementTimesheetAudit.upsert({
     *   create: {
     *     // ... data to create a EngagementTimesheetAudit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EngagementTimesheetAudit we want to update
     *   }
     * })
     */
    upsert<T extends EngagementTimesheetAuditUpsertArgs>(args: SelectSubset<T, EngagementTimesheetAuditUpsertArgs<ExtArgs>>): Prisma__EngagementTimesheetAuditClient<$Result.GetResult<Prisma.$EngagementTimesheetAuditPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EngagementTimesheetAudits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementTimesheetAuditCountArgs} args - Arguments to filter EngagementTimesheetAudits to count.
     * @example
     * // Count the number of EngagementTimesheetAudits
     * const count = await prisma.engagementTimesheetAudit.count({
     *   where: {
     *     // ... the filter for the EngagementTimesheetAudits we want to count
     *   }
     * })
    **/
    count<T extends EngagementTimesheetAuditCountArgs>(
      args?: Subset<T, EngagementTimesheetAuditCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EngagementTimesheetAuditCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EngagementTimesheetAudit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementTimesheetAuditAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EngagementTimesheetAuditAggregateArgs>(args: Subset<T, EngagementTimesheetAuditAggregateArgs>): Prisma.PrismaPromise<GetEngagementTimesheetAuditAggregateType<T>>

    /**
     * Group by EngagementTimesheetAudit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementTimesheetAuditGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EngagementTimesheetAuditGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EngagementTimesheetAuditGroupByArgs['orderBy'] }
        : { orderBy?: EngagementTimesheetAuditGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EngagementTimesheetAuditGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEngagementTimesheetAuditGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EngagementTimesheetAudit model
   */
  readonly fields: EngagementTimesheetAuditFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EngagementTimesheetAudit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EngagementTimesheetAuditClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    entry<T extends EngagementTimesheetAudit$entryArgs<ExtArgs> = {}>(args?: Subset<T, EngagementTimesheetAudit$entryArgs<ExtArgs>>): Prisma__EngagementTimesheetEntryClient<$Result.GetResult<Prisma.$EngagementTimesheetEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    engagement<T extends EngagementTimesheetAudit$engagementArgs<ExtArgs> = {}>(args?: Subset<T, EngagementTimesheetAudit$engagementArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EngagementTimesheetAudit model
   */
  interface EngagementTimesheetAuditFieldRefs {
    readonly id: FieldRef<"EngagementTimesheetAudit", 'String'>
    readonly timesheetEntryId: FieldRef<"EngagementTimesheetAudit", 'String'>
    readonly engagementId: FieldRef<"EngagementTimesheetAudit", 'String'>
    readonly action: FieldRef<"EngagementTimesheetAudit", 'TimesheetAuditAction'>
    readonly previousValues: FieldRef<"EngagementTimesheetAudit", 'Json'>
    readonly updatedValues: FieldRef<"EngagementTimesheetAudit", 'Json'>
    readonly actorUserId: FieldRef<"EngagementTimesheetAudit", 'String'>
    readonly actorHandle: FieldRef<"EngagementTimesheetAudit", 'String'>
    readonly actorRole: FieldRef<"EngagementTimesheetAudit", 'String'>
    readonly comment: FieldRef<"EngagementTimesheetAudit", 'String'>
    readonly createdAt: FieldRef<"EngagementTimesheetAudit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EngagementTimesheetAudit findUnique
   */
  export type EngagementTimesheetAuditFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetAudit
     */
    select?: EngagementTimesheetAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetAudit
     */
    omit?: EngagementTimesheetAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetAuditInclude<ExtArgs> | null
    /**
     * Filter, which EngagementTimesheetAudit to fetch.
     */
    where: EngagementTimesheetAuditWhereUniqueInput
  }

  /**
   * EngagementTimesheetAudit findUniqueOrThrow
   */
  export type EngagementTimesheetAuditFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetAudit
     */
    select?: EngagementTimesheetAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetAudit
     */
    omit?: EngagementTimesheetAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetAuditInclude<ExtArgs> | null
    /**
     * Filter, which EngagementTimesheetAudit to fetch.
     */
    where: EngagementTimesheetAuditWhereUniqueInput
  }

  /**
   * EngagementTimesheetAudit findFirst
   */
  export type EngagementTimesheetAuditFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetAudit
     */
    select?: EngagementTimesheetAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetAudit
     */
    omit?: EngagementTimesheetAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetAuditInclude<ExtArgs> | null
    /**
     * Filter, which EngagementTimesheetAudit to fetch.
     */
    where?: EngagementTimesheetAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementTimesheetAudits to fetch.
     */
    orderBy?: EngagementTimesheetAuditOrderByWithRelationInput | EngagementTimesheetAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EngagementTimesheetAudits.
     */
    cursor?: EngagementTimesheetAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementTimesheetAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementTimesheetAudits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementTimesheetAudits.
     */
    distinct?: EngagementTimesheetAuditScalarFieldEnum | EngagementTimesheetAuditScalarFieldEnum[]
  }

  /**
   * EngagementTimesheetAudit findFirstOrThrow
   */
  export type EngagementTimesheetAuditFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetAudit
     */
    select?: EngagementTimesheetAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetAudit
     */
    omit?: EngagementTimesheetAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetAuditInclude<ExtArgs> | null
    /**
     * Filter, which EngagementTimesheetAudit to fetch.
     */
    where?: EngagementTimesheetAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementTimesheetAudits to fetch.
     */
    orderBy?: EngagementTimesheetAuditOrderByWithRelationInput | EngagementTimesheetAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EngagementTimesheetAudits.
     */
    cursor?: EngagementTimesheetAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementTimesheetAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementTimesheetAudits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementTimesheetAudits.
     */
    distinct?: EngagementTimesheetAuditScalarFieldEnum | EngagementTimesheetAuditScalarFieldEnum[]
  }

  /**
   * EngagementTimesheetAudit findMany
   */
  export type EngagementTimesheetAuditFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetAudit
     */
    select?: EngagementTimesheetAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetAudit
     */
    omit?: EngagementTimesheetAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetAuditInclude<ExtArgs> | null
    /**
     * Filter, which EngagementTimesheetAudits to fetch.
     */
    where?: EngagementTimesheetAuditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementTimesheetAudits to fetch.
     */
    orderBy?: EngagementTimesheetAuditOrderByWithRelationInput | EngagementTimesheetAuditOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EngagementTimesheetAudits.
     */
    cursor?: EngagementTimesheetAuditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementTimesheetAudits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementTimesheetAudits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementTimesheetAudits.
     */
    distinct?: EngagementTimesheetAuditScalarFieldEnum | EngagementTimesheetAuditScalarFieldEnum[]
  }

  /**
   * EngagementTimesheetAudit create
   */
  export type EngagementTimesheetAuditCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetAudit
     */
    select?: EngagementTimesheetAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetAudit
     */
    omit?: EngagementTimesheetAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetAuditInclude<ExtArgs> | null
    /**
     * The data needed to create a EngagementTimesheetAudit.
     */
    data: XOR<EngagementTimesheetAuditCreateInput, EngagementTimesheetAuditUncheckedCreateInput>
  }

  /**
   * EngagementTimesheetAudit createMany
   */
  export type EngagementTimesheetAuditCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EngagementTimesheetAudits.
     */
    data: EngagementTimesheetAuditCreateManyInput | EngagementTimesheetAuditCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EngagementTimesheetAudit createManyAndReturn
   */
  export type EngagementTimesheetAuditCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetAudit
     */
    select?: EngagementTimesheetAuditSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetAudit
     */
    omit?: EngagementTimesheetAuditOmit<ExtArgs> | null
    /**
     * The data used to create many EngagementTimesheetAudits.
     */
    data: EngagementTimesheetAuditCreateManyInput | EngagementTimesheetAuditCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetAuditIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EngagementTimesheetAudit update
   */
  export type EngagementTimesheetAuditUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetAudit
     */
    select?: EngagementTimesheetAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetAudit
     */
    omit?: EngagementTimesheetAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetAuditInclude<ExtArgs> | null
    /**
     * The data needed to update a EngagementTimesheetAudit.
     */
    data: XOR<EngagementTimesheetAuditUpdateInput, EngagementTimesheetAuditUncheckedUpdateInput>
    /**
     * Choose, which EngagementTimesheetAudit to update.
     */
    where: EngagementTimesheetAuditWhereUniqueInput
  }

  /**
   * EngagementTimesheetAudit updateMany
   */
  export type EngagementTimesheetAuditUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EngagementTimesheetAudits.
     */
    data: XOR<EngagementTimesheetAuditUpdateManyMutationInput, EngagementTimesheetAuditUncheckedUpdateManyInput>
    /**
     * Filter which EngagementTimesheetAudits to update
     */
    where?: EngagementTimesheetAuditWhereInput
    /**
     * Limit how many EngagementTimesheetAudits to update.
     */
    limit?: number
  }

  /**
   * EngagementTimesheetAudit updateManyAndReturn
   */
  export type EngagementTimesheetAuditUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetAudit
     */
    select?: EngagementTimesheetAuditSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetAudit
     */
    omit?: EngagementTimesheetAuditOmit<ExtArgs> | null
    /**
     * The data used to update EngagementTimesheetAudits.
     */
    data: XOR<EngagementTimesheetAuditUpdateManyMutationInput, EngagementTimesheetAuditUncheckedUpdateManyInput>
    /**
     * Filter which EngagementTimesheetAudits to update
     */
    where?: EngagementTimesheetAuditWhereInput
    /**
     * Limit how many EngagementTimesheetAudits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetAuditIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EngagementTimesheetAudit upsert
   */
  export type EngagementTimesheetAuditUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetAudit
     */
    select?: EngagementTimesheetAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetAudit
     */
    omit?: EngagementTimesheetAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetAuditInclude<ExtArgs> | null
    /**
     * The filter to search for the EngagementTimesheetAudit to update in case it exists.
     */
    where: EngagementTimesheetAuditWhereUniqueInput
    /**
     * In case the EngagementTimesheetAudit found by the `where` argument doesn't exist, create a new EngagementTimesheetAudit with this data.
     */
    create: XOR<EngagementTimesheetAuditCreateInput, EngagementTimesheetAuditUncheckedCreateInput>
    /**
     * In case the EngagementTimesheetAudit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EngagementTimesheetAuditUpdateInput, EngagementTimesheetAuditUncheckedUpdateInput>
  }

  /**
   * EngagementTimesheetAudit delete
   */
  export type EngagementTimesheetAuditDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetAudit
     */
    select?: EngagementTimesheetAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetAudit
     */
    omit?: EngagementTimesheetAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetAuditInclude<ExtArgs> | null
    /**
     * Filter which EngagementTimesheetAudit to delete.
     */
    where: EngagementTimesheetAuditWhereUniqueInput
  }

  /**
   * EngagementTimesheetAudit deleteMany
   */
  export type EngagementTimesheetAuditDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EngagementTimesheetAudits to delete
     */
    where?: EngagementTimesheetAuditWhereInput
    /**
     * Limit how many EngagementTimesheetAudits to delete.
     */
    limit?: number
  }

  /**
   * EngagementTimesheetAudit.entry
   */
  export type EngagementTimesheetAudit$entryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetEntry
     */
    select?: EngagementTimesheetEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetEntry
     */
    omit?: EngagementTimesheetEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetEntryInclude<ExtArgs> | null
    where?: EngagementTimesheetEntryWhereInput
  }

  /**
   * EngagementTimesheetAudit.engagement
   */
  export type EngagementTimesheetAudit$engagementArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementInclude<ExtArgs> | null
    where?: EngagementWhereInput
  }

  /**
   * EngagementTimesheetAudit without action
   */
  export type EngagementTimesheetAuditDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementTimesheetAudit
     */
    select?: EngagementTimesheetAuditSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementTimesheetAudit
     */
    omit?: EngagementTimesheetAuditOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementTimesheetAuditInclude<ExtArgs> | null
  }


  /**
   * Model EngagementManager
   */

  export type AggregateEngagementManager = {
    _count: EngagementManagerCountAggregateOutputType | null
    _min: EngagementManagerMinAggregateOutputType | null
    _max: EngagementManagerMaxAggregateOutputType | null
  }

  export type EngagementManagerMinAggregateOutputType = {
    id: string | null
    engagementId: string | null
    managerUserId: string | null
    managerHandle: string | null
    managerName: string | null
    createdAt: Date | null
    createdBy: string | null
    removedAt: Date | null
    removedBy: string | null
  }

  export type EngagementManagerMaxAggregateOutputType = {
    id: string | null
    engagementId: string | null
    managerUserId: string | null
    managerHandle: string | null
    managerName: string | null
    createdAt: Date | null
    createdBy: string | null
    removedAt: Date | null
    removedBy: string | null
  }

  export type EngagementManagerCountAggregateOutputType = {
    id: number
    engagementId: number
    managerUserId: number
    managerHandle: number
    managerName: number
    createdAt: number
    createdBy: number
    removedAt: number
    removedBy: number
    _all: number
  }


  export type EngagementManagerMinAggregateInputType = {
    id?: true
    engagementId?: true
    managerUserId?: true
    managerHandle?: true
    managerName?: true
    createdAt?: true
    createdBy?: true
    removedAt?: true
    removedBy?: true
  }

  export type EngagementManagerMaxAggregateInputType = {
    id?: true
    engagementId?: true
    managerUserId?: true
    managerHandle?: true
    managerName?: true
    createdAt?: true
    createdBy?: true
    removedAt?: true
    removedBy?: true
  }

  export type EngagementManagerCountAggregateInputType = {
    id?: true
    engagementId?: true
    managerUserId?: true
    managerHandle?: true
    managerName?: true
    createdAt?: true
    createdBy?: true
    removedAt?: true
    removedBy?: true
    _all?: true
  }

  export type EngagementManagerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EngagementManager to aggregate.
     */
    where?: EngagementManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementManagers to fetch.
     */
    orderBy?: EngagementManagerOrderByWithRelationInput | EngagementManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EngagementManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementManagers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementManagers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EngagementManagers
    **/
    _count?: true | EngagementManagerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EngagementManagerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EngagementManagerMaxAggregateInputType
  }

  export type GetEngagementManagerAggregateType<T extends EngagementManagerAggregateArgs> = {
        [P in keyof T & keyof AggregateEngagementManager]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEngagementManager[P]>
      : GetScalarType<T[P], AggregateEngagementManager[P]>
  }




  export type EngagementManagerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EngagementManagerWhereInput
    orderBy?: EngagementManagerOrderByWithAggregationInput | EngagementManagerOrderByWithAggregationInput[]
    by: EngagementManagerScalarFieldEnum[] | EngagementManagerScalarFieldEnum
    having?: EngagementManagerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EngagementManagerCountAggregateInputType | true
    _min?: EngagementManagerMinAggregateInputType
    _max?: EngagementManagerMaxAggregateInputType
  }

  export type EngagementManagerGroupByOutputType = {
    id: string
    engagementId: string
    managerUserId: string
    managerHandle: string
    managerName: string | null
    createdAt: Date
    createdBy: string
    removedAt: Date | null
    removedBy: string | null
    _count: EngagementManagerCountAggregateOutputType | null
    _min: EngagementManagerMinAggregateOutputType | null
    _max: EngagementManagerMaxAggregateOutputType | null
  }

  type GetEngagementManagerGroupByPayload<T extends EngagementManagerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EngagementManagerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EngagementManagerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EngagementManagerGroupByOutputType[P]>
            : GetScalarType<T[P], EngagementManagerGroupByOutputType[P]>
        }
      >
    >


  export type EngagementManagerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementId?: boolean
    managerUserId?: boolean
    managerHandle?: boolean
    managerName?: boolean
    createdAt?: boolean
    createdBy?: boolean
    removedAt?: boolean
    removedBy?: boolean
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagementManager"]>

  export type EngagementManagerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementId?: boolean
    managerUserId?: boolean
    managerHandle?: boolean
    managerName?: boolean
    createdAt?: boolean
    createdBy?: boolean
    removedAt?: boolean
    removedBy?: boolean
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagementManager"]>

  export type EngagementManagerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementId?: boolean
    managerUserId?: boolean
    managerHandle?: boolean
    managerName?: boolean
    createdAt?: boolean
    createdBy?: boolean
    removedAt?: boolean
    removedBy?: boolean
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagementManager"]>

  export type EngagementManagerSelectScalar = {
    id?: boolean
    engagementId?: boolean
    managerUserId?: boolean
    managerHandle?: boolean
    managerName?: boolean
    createdAt?: boolean
    createdBy?: boolean
    removedAt?: boolean
    removedBy?: boolean
  }

  export type EngagementManagerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "engagementId" | "managerUserId" | "managerHandle" | "managerName" | "createdAt" | "createdBy" | "removedAt" | "removedBy", ExtArgs["result"]["engagementManager"]>
  export type EngagementManagerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
  }
  export type EngagementManagerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
  }
  export type EngagementManagerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
  }

  export type $EngagementManagerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EngagementManager"
    objects: {
      engagement: Prisma.$EngagementPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      engagementId: string
      managerUserId: string
      managerHandle: string
      managerName: string | null
      createdAt: Date
      createdBy: string
      /**
       * Soft delete. Removing a manager must not strand the approval records that name them, and the
       * audit history has to survive removal. `removedAt IS NULL` is the "is currently a manager"
       * predicate.
       */
      removedAt: Date | null
      removedBy: string | null
    }, ExtArgs["result"]["engagementManager"]>
    composites: {}
  }

  type EngagementManagerGetPayload<S extends boolean | null | undefined | EngagementManagerDefaultArgs> = $Result.GetResult<Prisma.$EngagementManagerPayload, S>

  type EngagementManagerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EngagementManagerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EngagementManagerCountAggregateInputType | true
    }

  export interface EngagementManagerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EngagementManager'], meta: { name: 'EngagementManager' } }
    /**
     * Find zero or one EngagementManager that matches the filter.
     * @param {EngagementManagerFindUniqueArgs} args - Arguments to find a EngagementManager
     * @example
     * // Get one EngagementManager
     * const engagementManager = await prisma.engagementManager.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EngagementManagerFindUniqueArgs>(args: SelectSubset<T, EngagementManagerFindUniqueArgs<ExtArgs>>): Prisma__EngagementManagerClient<$Result.GetResult<Prisma.$EngagementManagerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EngagementManager that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EngagementManagerFindUniqueOrThrowArgs} args - Arguments to find a EngagementManager
     * @example
     * // Get one EngagementManager
     * const engagementManager = await prisma.engagementManager.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EngagementManagerFindUniqueOrThrowArgs>(args: SelectSubset<T, EngagementManagerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EngagementManagerClient<$Result.GetResult<Prisma.$EngagementManagerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EngagementManager that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementManagerFindFirstArgs} args - Arguments to find a EngagementManager
     * @example
     * // Get one EngagementManager
     * const engagementManager = await prisma.engagementManager.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EngagementManagerFindFirstArgs>(args?: SelectSubset<T, EngagementManagerFindFirstArgs<ExtArgs>>): Prisma__EngagementManagerClient<$Result.GetResult<Prisma.$EngagementManagerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EngagementManager that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementManagerFindFirstOrThrowArgs} args - Arguments to find a EngagementManager
     * @example
     * // Get one EngagementManager
     * const engagementManager = await prisma.engagementManager.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EngagementManagerFindFirstOrThrowArgs>(args?: SelectSubset<T, EngagementManagerFindFirstOrThrowArgs<ExtArgs>>): Prisma__EngagementManagerClient<$Result.GetResult<Prisma.$EngagementManagerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EngagementManagers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementManagerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EngagementManagers
     * const engagementManagers = await prisma.engagementManager.findMany()
     * 
     * // Get first 10 EngagementManagers
     * const engagementManagers = await prisma.engagementManager.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const engagementManagerWithIdOnly = await prisma.engagementManager.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EngagementManagerFindManyArgs>(args?: SelectSubset<T, EngagementManagerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementManagerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EngagementManager.
     * @param {EngagementManagerCreateArgs} args - Arguments to create a EngagementManager.
     * @example
     * // Create one EngagementManager
     * const EngagementManager = await prisma.engagementManager.create({
     *   data: {
     *     // ... data to create a EngagementManager
     *   }
     * })
     * 
     */
    create<T extends EngagementManagerCreateArgs>(args: SelectSubset<T, EngagementManagerCreateArgs<ExtArgs>>): Prisma__EngagementManagerClient<$Result.GetResult<Prisma.$EngagementManagerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EngagementManagers.
     * @param {EngagementManagerCreateManyArgs} args - Arguments to create many EngagementManagers.
     * @example
     * // Create many EngagementManagers
     * const engagementManager = await prisma.engagementManager.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EngagementManagerCreateManyArgs>(args?: SelectSubset<T, EngagementManagerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EngagementManagers and returns the data saved in the database.
     * @param {EngagementManagerCreateManyAndReturnArgs} args - Arguments to create many EngagementManagers.
     * @example
     * // Create many EngagementManagers
     * const engagementManager = await prisma.engagementManager.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EngagementManagers and only return the `id`
     * const engagementManagerWithIdOnly = await prisma.engagementManager.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EngagementManagerCreateManyAndReturnArgs>(args?: SelectSubset<T, EngagementManagerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementManagerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EngagementManager.
     * @param {EngagementManagerDeleteArgs} args - Arguments to delete one EngagementManager.
     * @example
     * // Delete one EngagementManager
     * const EngagementManager = await prisma.engagementManager.delete({
     *   where: {
     *     // ... filter to delete one EngagementManager
     *   }
     * })
     * 
     */
    delete<T extends EngagementManagerDeleteArgs>(args: SelectSubset<T, EngagementManagerDeleteArgs<ExtArgs>>): Prisma__EngagementManagerClient<$Result.GetResult<Prisma.$EngagementManagerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EngagementManager.
     * @param {EngagementManagerUpdateArgs} args - Arguments to update one EngagementManager.
     * @example
     * // Update one EngagementManager
     * const engagementManager = await prisma.engagementManager.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EngagementManagerUpdateArgs>(args: SelectSubset<T, EngagementManagerUpdateArgs<ExtArgs>>): Prisma__EngagementManagerClient<$Result.GetResult<Prisma.$EngagementManagerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EngagementManagers.
     * @param {EngagementManagerDeleteManyArgs} args - Arguments to filter EngagementManagers to delete.
     * @example
     * // Delete a few EngagementManagers
     * const { count } = await prisma.engagementManager.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EngagementManagerDeleteManyArgs>(args?: SelectSubset<T, EngagementManagerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EngagementManagers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementManagerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EngagementManagers
     * const engagementManager = await prisma.engagementManager.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EngagementManagerUpdateManyArgs>(args: SelectSubset<T, EngagementManagerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EngagementManagers and returns the data updated in the database.
     * @param {EngagementManagerUpdateManyAndReturnArgs} args - Arguments to update many EngagementManagers.
     * @example
     * // Update many EngagementManagers
     * const engagementManager = await prisma.engagementManager.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EngagementManagers and only return the `id`
     * const engagementManagerWithIdOnly = await prisma.engagementManager.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EngagementManagerUpdateManyAndReturnArgs>(args: SelectSubset<T, EngagementManagerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementManagerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EngagementManager.
     * @param {EngagementManagerUpsertArgs} args - Arguments to update or create a EngagementManager.
     * @example
     * // Update or create a EngagementManager
     * const engagementManager = await prisma.engagementManager.upsert({
     *   create: {
     *     // ... data to create a EngagementManager
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EngagementManager we want to update
     *   }
     * })
     */
    upsert<T extends EngagementManagerUpsertArgs>(args: SelectSubset<T, EngagementManagerUpsertArgs<ExtArgs>>): Prisma__EngagementManagerClient<$Result.GetResult<Prisma.$EngagementManagerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EngagementManagers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementManagerCountArgs} args - Arguments to filter EngagementManagers to count.
     * @example
     * // Count the number of EngagementManagers
     * const count = await prisma.engagementManager.count({
     *   where: {
     *     // ... the filter for the EngagementManagers we want to count
     *   }
     * })
    **/
    count<T extends EngagementManagerCountArgs>(
      args?: Subset<T, EngagementManagerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EngagementManagerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EngagementManager.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementManagerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EngagementManagerAggregateArgs>(args: Subset<T, EngagementManagerAggregateArgs>): Prisma.PrismaPromise<GetEngagementManagerAggregateType<T>>

    /**
     * Group by EngagementManager.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementManagerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EngagementManagerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EngagementManagerGroupByArgs['orderBy'] }
        : { orderBy?: EngagementManagerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EngagementManagerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEngagementManagerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EngagementManager model
   */
  readonly fields: EngagementManagerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EngagementManager.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EngagementManagerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    engagement<T extends EngagementDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EngagementDefaultArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EngagementManager model
   */
  interface EngagementManagerFieldRefs {
    readonly id: FieldRef<"EngagementManager", 'String'>
    readonly engagementId: FieldRef<"EngagementManager", 'String'>
    readonly managerUserId: FieldRef<"EngagementManager", 'String'>
    readonly managerHandle: FieldRef<"EngagementManager", 'String'>
    readonly managerName: FieldRef<"EngagementManager", 'String'>
    readonly createdAt: FieldRef<"EngagementManager", 'DateTime'>
    readonly createdBy: FieldRef<"EngagementManager", 'String'>
    readonly removedAt: FieldRef<"EngagementManager", 'DateTime'>
    readonly removedBy: FieldRef<"EngagementManager", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EngagementManager findUnique
   */
  export type EngagementManagerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementManager
     */
    select?: EngagementManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementManager
     */
    omit?: EngagementManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementManagerInclude<ExtArgs> | null
    /**
     * Filter, which EngagementManager to fetch.
     */
    where: EngagementManagerWhereUniqueInput
  }

  /**
   * EngagementManager findUniqueOrThrow
   */
  export type EngagementManagerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementManager
     */
    select?: EngagementManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementManager
     */
    omit?: EngagementManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementManagerInclude<ExtArgs> | null
    /**
     * Filter, which EngagementManager to fetch.
     */
    where: EngagementManagerWhereUniqueInput
  }

  /**
   * EngagementManager findFirst
   */
  export type EngagementManagerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementManager
     */
    select?: EngagementManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementManager
     */
    omit?: EngagementManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementManagerInclude<ExtArgs> | null
    /**
     * Filter, which EngagementManager to fetch.
     */
    where?: EngagementManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementManagers to fetch.
     */
    orderBy?: EngagementManagerOrderByWithRelationInput | EngagementManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EngagementManagers.
     */
    cursor?: EngagementManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementManagers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementManagers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementManagers.
     */
    distinct?: EngagementManagerScalarFieldEnum | EngagementManagerScalarFieldEnum[]
  }

  /**
   * EngagementManager findFirstOrThrow
   */
  export type EngagementManagerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementManager
     */
    select?: EngagementManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementManager
     */
    omit?: EngagementManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementManagerInclude<ExtArgs> | null
    /**
     * Filter, which EngagementManager to fetch.
     */
    where?: EngagementManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementManagers to fetch.
     */
    orderBy?: EngagementManagerOrderByWithRelationInput | EngagementManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EngagementManagers.
     */
    cursor?: EngagementManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementManagers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementManagers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementManagers.
     */
    distinct?: EngagementManagerScalarFieldEnum | EngagementManagerScalarFieldEnum[]
  }

  /**
   * EngagementManager findMany
   */
  export type EngagementManagerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementManager
     */
    select?: EngagementManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementManager
     */
    omit?: EngagementManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementManagerInclude<ExtArgs> | null
    /**
     * Filter, which EngagementManagers to fetch.
     */
    where?: EngagementManagerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EngagementManagers to fetch.
     */
    orderBy?: EngagementManagerOrderByWithRelationInput | EngagementManagerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EngagementManagers.
     */
    cursor?: EngagementManagerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EngagementManagers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EngagementManagers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EngagementManagers.
     */
    distinct?: EngagementManagerScalarFieldEnum | EngagementManagerScalarFieldEnum[]
  }

  /**
   * EngagementManager create
   */
  export type EngagementManagerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementManager
     */
    select?: EngagementManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementManager
     */
    omit?: EngagementManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementManagerInclude<ExtArgs> | null
    /**
     * The data needed to create a EngagementManager.
     */
    data: XOR<EngagementManagerCreateInput, EngagementManagerUncheckedCreateInput>
  }

  /**
   * EngagementManager createMany
   */
  export type EngagementManagerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EngagementManagers.
     */
    data: EngagementManagerCreateManyInput | EngagementManagerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EngagementManager createManyAndReturn
   */
  export type EngagementManagerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementManager
     */
    select?: EngagementManagerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementManager
     */
    omit?: EngagementManagerOmit<ExtArgs> | null
    /**
     * The data used to create many EngagementManagers.
     */
    data: EngagementManagerCreateManyInput | EngagementManagerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementManagerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EngagementManager update
   */
  export type EngagementManagerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementManager
     */
    select?: EngagementManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementManager
     */
    omit?: EngagementManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementManagerInclude<ExtArgs> | null
    /**
     * The data needed to update a EngagementManager.
     */
    data: XOR<EngagementManagerUpdateInput, EngagementManagerUncheckedUpdateInput>
    /**
     * Choose, which EngagementManager to update.
     */
    where: EngagementManagerWhereUniqueInput
  }

  /**
   * EngagementManager updateMany
   */
  export type EngagementManagerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EngagementManagers.
     */
    data: XOR<EngagementManagerUpdateManyMutationInput, EngagementManagerUncheckedUpdateManyInput>
    /**
     * Filter which EngagementManagers to update
     */
    where?: EngagementManagerWhereInput
    /**
     * Limit how many EngagementManagers to update.
     */
    limit?: number
  }

  /**
   * EngagementManager updateManyAndReturn
   */
  export type EngagementManagerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementManager
     */
    select?: EngagementManagerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementManager
     */
    omit?: EngagementManagerOmit<ExtArgs> | null
    /**
     * The data used to update EngagementManagers.
     */
    data: XOR<EngagementManagerUpdateManyMutationInput, EngagementManagerUncheckedUpdateManyInput>
    /**
     * Filter which EngagementManagers to update
     */
    where?: EngagementManagerWhereInput
    /**
     * Limit how many EngagementManagers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementManagerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EngagementManager upsert
   */
  export type EngagementManagerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementManager
     */
    select?: EngagementManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementManager
     */
    omit?: EngagementManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementManagerInclude<ExtArgs> | null
    /**
     * The filter to search for the EngagementManager to update in case it exists.
     */
    where: EngagementManagerWhereUniqueInput
    /**
     * In case the EngagementManager found by the `where` argument doesn't exist, create a new EngagementManager with this data.
     */
    create: XOR<EngagementManagerCreateInput, EngagementManagerUncheckedCreateInput>
    /**
     * In case the EngagementManager was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EngagementManagerUpdateInput, EngagementManagerUncheckedUpdateInput>
  }

  /**
   * EngagementManager delete
   */
  export type EngagementManagerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementManager
     */
    select?: EngagementManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementManager
     */
    omit?: EngagementManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementManagerInclude<ExtArgs> | null
    /**
     * Filter which EngagementManager to delete.
     */
    where: EngagementManagerWhereUniqueInput
  }

  /**
   * EngagementManager deleteMany
   */
  export type EngagementManagerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EngagementManagers to delete
     */
    where?: EngagementManagerWhereInput
    /**
     * Limit how many EngagementManagers to delete.
     */
    limit?: number
  }

  /**
   * EngagementManager without action
   */
  export type EngagementManagerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EngagementManager
     */
    select?: EngagementManagerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EngagementManager
     */
    omit?: EngagementManagerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EngagementManagerInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const EngagementScalarFieldEnum: {
    id: 'id',
    projectId: 'projectId',
    title: 'title',
    description: 'description',
    durationStartDate: 'durationStartDate',
    durationEndDate: 'durationEndDate',
    durationWeeks: 'durationWeeks',
    durationMonths: 'durationMonths',
    timeZones: 'timeZones',
    countries: 'countries',
    requiredSkills: 'requiredSkills',
    anticipatedStart: 'anticipatedStart',
    status: 'status',
    isPrivate: 'isPrivate',
    requiredMemberCount: 'requiredMemberCount',
    role: 'role',
    roleLevel: 'roleLevel',
    workload: 'workload',
    compensationRange: 'compensationRange',
    receivedDateFromAccount: 'receivedDateFromAccount',
    account: 'account',
    smu: 'smu',
    spoc: 'spoc',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy'
  };

  export type EngagementScalarFieldEnum = (typeof EngagementScalarFieldEnum)[keyof typeof EngagementScalarFieldEnum]


  export const EngagementApplicationScalarFieldEnum: {
    id: 'id',
    engagementId: 'engagementId',
    userId: 'userId',
    handle: 'handle',
    email: 'email',
    name: 'name',
    address: 'address',
    mobileNumber: 'mobileNumber',
    coverLetter: 'coverLetter',
    resumeUrl: 'resumeUrl',
    cvFileUrl: 'cvFileUrl',
    portfolioUrls: 'portfolioUrls',
    yearsOfExperience: 'yearsOfExperience',
    availability: 'availability',
    expectedPayRate: 'expectedPayRate',
    referralSource: 'referralSource',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy'
  };

  export type EngagementApplicationScalarFieldEnum = (typeof EngagementApplicationScalarFieldEnum)[keyof typeof EngagementApplicationScalarFieldEnum]


  export const EngagementAssignmentScalarFieldEnum: {
    id: 'id',
    engagementId: 'engagementId',
    memberId: 'memberId',
    memberHandle: 'memberHandle',
    status: 'status',
    acceptedAt: 'acceptedAt',
    agreementRate: 'agreementRate',
    ratePerHour: 'ratePerHour',
    paymentCycle: 'paymentCycle',
    standardHoursPerDay: 'standardHoursPerDay',
    totalHours: 'totalHours',
    standardHoursPerWeek: 'standardHoursPerWeek',
    durationMonths: 'durationMonths',
    otherRemarks: 'otherRemarks',
    terminationReason: 'terminationReason',
    startDate: 'startDate',
    endDate: 'endDate',
    wiproIdEndDate: 'wiproIdEndDate',
    candidateWiproId: 'candidateWiproId',
    source: 'source',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EngagementAssignmentScalarFieldEnum = (typeof EngagementAssignmentScalarFieldEnum)[keyof typeof EngagementAssignmentScalarFieldEnum]


  export const EngagementFeedbackScalarFieldEnum: {
    id: 'id',
    engagementAssignmentId: 'engagementAssignmentId',
    feedbackText: 'feedbackText',
    rating: 'rating',
    givenByMemberId: 'givenByMemberId',
    givenByHandle: 'givenByHandle',
    givenByEmail: 'givenByEmail',
    secretToken: 'secretToken',
    secretTokenExpiresAt: 'secretTokenExpiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EngagementFeedbackScalarFieldEnum = (typeof EngagementFeedbackScalarFieldEnum)[keyof typeof EngagementFeedbackScalarFieldEnum]


  export const MemberExperienceScalarFieldEnum: {
    id: 'id',
    engagementAssignmentId: 'engagementAssignmentId',
    experienceText: 'experienceText',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MemberExperienceScalarFieldEnum = (typeof MemberExperienceScalarFieldEnum)[keyof typeof MemberExperienceScalarFieldEnum]


  export const EngagementLeadScalarFieldEnum: {
    id: 'id',
    workEmail: 'workEmail',
    accountName: 'accountName',
    smu: 'smu',
    engagementModel: 'engagementModel',
    roleTitle: 'roleTitle',
    jobDescription: 'jobDescription',
    requiredSkills: 'requiredSkills',
    experienceLevel: 'experienceLevel',
    minYearsExperience: 'minYearsExperience',
    industryDomain: 'industryDomain',
    resourcesRequired: 'resourcesRequired',
    preferredStartDate: 'preferredStartDate',
    engagementDuration: 'engagementDuration',
    workingHoursPerDay: 'workingHoursPerDay',
    timeZoneRequirement: 'timeZoneRequirement',
    remoteWorkAccepted: 'remoteWorkAccepted',
    workLocationRestrictions: 'workLocationRestrictions',
    billRateCurrency: 'billRateCurrency',
    billRateAmount: 'billRateAmount',
    priority: 'priority',
    additionalRequirements: 'additionalRequirements',
    status: 'status',
    convertedEngagementId: 'convertedEngagementId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy'
  };

  export type EngagementLeadScalarFieldEnum = (typeof EngagementLeadScalarFieldEnum)[keyof typeof EngagementLeadScalarFieldEnum]


  export const EngagementTimesheetEntryScalarFieldEnum: {
    id: 'id',
    engagementAssignmentId: 'engagementAssignmentId',
    workDate: 'workDate',
    hoursWorked: 'hoursWorked',
    remarks: 'remarks',
    status: 'status',
    submittedAt: 'submittedAt',
    submittedBy: 'submittedBy',
    approvedAt: 'approvedAt',
    approvedBy: 'approvedBy',
    approvedByHandle: 'approvedByHandle',
    approvalComment: 'approvalComment',
    reopenedAt: 'reopenedAt',
    paidPaymentReference: 'paidPaymentReference',
    paidAt: 'paidAt',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    updatedAt: 'updatedAt',
    updatedBy: 'updatedBy'
  };

  export type EngagementTimesheetEntryScalarFieldEnum = (typeof EngagementTimesheetEntryScalarFieldEnum)[keyof typeof EngagementTimesheetEntryScalarFieldEnum]


  export const EngagementTimesheetAuditScalarFieldEnum: {
    id: 'id',
    timesheetEntryId: 'timesheetEntryId',
    engagementId: 'engagementId',
    action: 'action',
    previousValues: 'previousValues',
    updatedValues: 'updatedValues',
    actorUserId: 'actorUserId',
    actorHandle: 'actorHandle',
    actorRole: 'actorRole',
    comment: 'comment',
    createdAt: 'createdAt'
  };

  export type EngagementTimesheetAuditScalarFieldEnum = (typeof EngagementTimesheetAuditScalarFieldEnum)[keyof typeof EngagementTimesheetAuditScalarFieldEnum]


  export const EngagementManagerScalarFieldEnum: {
    id: 'id',
    engagementId: 'engagementId',
    managerUserId: 'managerUserId',
    managerHandle: 'managerHandle',
    managerName: 'managerName',
    createdAt: 'createdAt',
    createdBy: 'createdBy',
    removedAt: 'removedAt',
    removedBy: 'removedBy'
  };

  export type EngagementManagerScalarFieldEnum = (typeof EngagementManagerScalarFieldEnum)[keyof typeof EngagementManagerScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'AnticipatedStart'
   */
  export type EnumAnticipatedStartFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnticipatedStart'>
    


  /**
   * Reference to a field of type 'AnticipatedStart[]'
   */
  export type ListEnumAnticipatedStartFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AnticipatedStart[]'>
    


  /**
   * Reference to a field of type 'EngagementStatus'
   */
  export type EnumEngagementStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EngagementStatus'>
    


  /**
   * Reference to a field of type 'EngagementStatus[]'
   */
  export type ListEnumEngagementStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EngagementStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'RoleLevel'
   */
  export type EnumRoleLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoleLevel'>
    


  /**
   * Reference to a field of type 'RoleLevel[]'
   */
  export type ListEnumRoleLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoleLevel[]'>
    


  /**
   * Reference to a field of type 'Workload'
   */
  export type EnumWorkloadFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Workload'>
    


  /**
   * Reference to a field of type 'Workload[]'
   */
  export type ListEnumWorkloadFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Workload[]'>
    


  /**
   * Reference to a field of type 'ApplicationStatus'
   */
  export type EnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplicationStatus'>
    


  /**
   * Reference to a field of type 'ApplicationStatus[]'
   */
  export type ListEnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplicationStatus[]'>
    


  /**
   * Reference to a field of type 'AssignmentStatus'
   */
  export type EnumAssignmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssignmentStatus'>
    


  /**
   * Reference to a field of type 'AssignmentStatus[]'
   */
  export type ListEnumAssignmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssignmentStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentCycle'
   */
  export type EnumPaymentCycleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentCycle'>
    


  /**
   * Reference to a field of type 'PaymentCycle[]'
   */
  export type ListEnumPaymentCycleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentCycle[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'AssignmentSource'
   */
  export type EnumAssignmentSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssignmentSource'>
    


  /**
   * Reference to a field of type 'AssignmentSource[]'
   */
  export type ListEnumAssignmentSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AssignmentSource[]'>
    


  /**
   * Reference to a field of type 'EngagementModel'
   */
  export type EnumEngagementModelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EngagementModel'>
    


  /**
   * Reference to a field of type 'EngagementModel[]'
   */
  export type ListEnumEngagementModelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EngagementModel[]'>
    


  /**
   * Reference to a field of type 'ExperienceLevel'
   */
  export type EnumExperienceLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExperienceLevel'>
    


  /**
   * Reference to a field of type 'ExperienceLevel[]'
   */
  export type ListEnumExperienceLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExperienceLevel[]'>
    


  /**
   * Reference to a field of type 'LeadPriority'
   */
  export type EnumLeadPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeadPriority'>
    


  /**
   * Reference to a field of type 'LeadPriority[]'
   */
  export type ListEnumLeadPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeadPriority[]'>
    


  /**
   * Reference to a field of type 'EngagementLeadStatus'
   */
  export type EnumEngagementLeadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EngagementLeadStatus'>
    


  /**
   * Reference to a field of type 'EngagementLeadStatus[]'
   */
  export type ListEnumEngagementLeadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EngagementLeadStatus[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'TimesheetEntryStatus'
   */
  export type EnumTimesheetEntryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TimesheetEntryStatus'>
    


  /**
   * Reference to a field of type 'TimesheetEntryStatus[]'
   */
  export type ListEnumTimesheetEntryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TimesheetEntryStatus[]'>
    


  /**
   * Reference to a field of type 'TimesheetAuditAction'
   */
  export type EnumTimesheetAuditActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TimesheetAuditAction'>
    


  /**
   * Reference to a field of type 'TimesheetAuditAction[]'
   */
  export type ListEnumTimesheetAuditActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TimesheetAuditAction[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type EngagementWhereInput = {
    AND?: EngagementWhereInput | EngagementWhereInput[]
    OR?: EngagementWhereInput[]
    NOT?: EngagementWhereInput | EngagementWhereInput[]
    id?: StringFilter<"Engagement"> | string
    projectId?: StringFilter<"Engagement"> | string
    title?: StringFilter<"Engagement"> | string
    description?: StringFilter<"Engagement"> | string
    durationStartDate?: DateTimeNullableFilter<"Engagement"> | Date | string | null
    durationEndDate?: DateTimeNullableFilter<"Engagement"> | Date | string | null
    durationWeeks?: IntNullableFilter<"Engagement"> | number | null
    durationMonths?: IntNullableFilter<"Engagement"> | number | null
    timeZones?: StringNullableListFilter<"Engagement">
    countries?: StringNullableListFilter<"Engagement">
    requiredSkills?: StringNullableListFilter<"Engagement">
    anticipatedStart?: EnumAnticipatedStartFilter<"Engagement"> | $Enums.AnticipatedStart
    status?: EnumEngagementStatusFilter<"Engagement"> | $Enums.EngagementStatus
    isPrivate?: BoolFilter<"Engagement"> | boolean
    requiredMemberCount?: IntNullableFilter<"Engagement"> | number | null
    role?: EnumRoleNullableFilter<"Engagement"> | $Enums.Role | null
    roleLevel?: EnumRoleLevelNullableFilter<"Engagement"> | $Enums.RoleLevel | null
    workload?: EnumWorkloadNullableFilter<"Engagement"> | $Enums.Workload | null
    compensationRange?: StringNullableFilter<"Engagement"> | string | null
    receivedDateFromAccount?: DateTimeNullableFilter<"Engagement"> | Date | string | null
    account?: StringNullableFilter<"Engagement"> | string | null
    smu?: StringNullableFilter<"Engagement"> | string | null
    spoc?: StringNullableFilter<"Engagement"> | string | null
    createdAt?: DateTimeFilter<"Engagement"> | Date | string
    createdBy?: StringFilter<"Engagement"> | string
    updatedAt?: DateTimeFilter<"Engagement"> | Date | string
    updatedBy?: StringNullableFilter<"Engagement"> | string | null
    applications?: EngagementApplicationListRelationFilter
    assignments?: EngagementAssignmentListRelationFilter
    managers?: EngagementManagerListRelationFilter
    timesheetAudit?: EngagementTimesheetAuditListRelationFilter
  }

  export type EngagementOrderByWithRelationInput = {
    id?: SortOrder
    projectId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    durationStartDate?: SortOrderInput | SortOrder
    durationEndDate?: SortOrderInput | SortOrder
    durationWeeks?: SortOrderInput | SortOrder
    durationMonths?: SortOrderInput | SortOrder
    timeZones?: SortOrder
    countries?: SortOrder
    requiredSkills?: SortOrder
    anticipatedStart?: SortOrder
    status?: SortOrder
    isPrivate?: SortOrder
    requiredMemberCount?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    roleLevel?: SortOrderInput | SortOrder
    workload?: SortOrderInput | SortOrder
    compensationRange?: SortOrderInput | SortOrder
    receivedDateFromAccount?: SortOrderInput | SortOrder
    account?: SortOrderInput | SortOrder
    smu?: SortOrderInput | SortOrder
    spoc?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    applications?: EngagementApplicationOrderByRelationAggregateInput
    assignments?: EngagementAssignmentOrderByRelationAggregateInput
    managers?: EngagementManagerOrderByRelationAggregateInput
    timesheetAudit?: EngagementTimesheetAuditOrderByRelationAggregateInput
  }

  export type EngagementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EngagementWhereInput | EngagementWhereInput[]
    OR?: EngagementWhereInput[]
    NOT?: EngagementWhereInput | EngagementWhereInput[]
    projectId?: StringFilter<"Engagement"> | string
    title?: StringFilter<"Engagement"> | string
    description?: StringFilter<"Engagement"> | string
    durationStartDate?: DateTimeNullableFilter<"Engagement"> | Date | string | null
    durationEndDate?: DateTimeNullableFilter<"Engagement"> | Date | string | null
    durationWeeks?: IntNullableFilter<"Engagement"> | number | null
    durationMonths?: IntNullableFilter<"Engagement"> | number | null
    timeZones?: StringNullableListFilter<"Engagement">
    countries?: StringNullableListFilter<"Engagement">
    requiredSkills?: StringNullableListFilter<"Engagement">
    anticipatedStart?: EnumAnticipatedStartFilter<"Engagement"> | $Enums.AnticipatedStart
    status?: EnumEngagementStatusFilter<"Engagement"> | $Enums.EngagementStatus
    isPrivate?: BoolFilter<"Engagement"> | boolean
    requiredMemberCount?: IntNullableFilter<"Engagement"> | number | null
    role?: EnumRoleNullableFilter<"Engagement"> | $Enums.Role | null
    roleLevel?: EnumRoleLevelNullableFilter<"Engagement"> | $Enums.RoleLevel | null
    workload?: EnumWorkloadNullableFilter<"Engagement"> | $Enums.Workload | null
    compensationRange?: StringNullableFilter<"Engagement"> | string | null
    receivedDateFromAccount?: DateTimeNullableFilter<"Engagement"> | Date | string | null
    account?: StringNullableFilter<"Engagement"> | string | null
    smu?: StringNullableFilter<"Engagement"> | string | null
    spoc?: StringNullableFilter<"Engagement"> | string | null
    createdAt?: DateTimeFilter<"Engagement"> | Date | string
    createdBy?: StringFilter<"Engagement"> | string
    updatedAt?: DateTimeFilter<"Engagement"> | Date | string
    updatedBy?: StringNullableFilter<"Engagement"> | string | null
    applications?: EngagementApplicationListRelationFilter
    assignments?: EngagementAssignmentListRelationFilter
    managers?: EngagementManagerListRelationFilter
    timesheetAudit?: EngagementTimesheetAuditListRelationFilter
  }, "id">

  export type EngagementOrderByWithAggregationInput = {
    id?: SortOrder
    projectId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    durationStartDate?: SortOrderInput | SortOrder
    durationEndDate?: SortOrderInput | SortOrder
    durationWeeks?: SortOrderInput | SortOrder
    durationMonths?: SortOrderInput | SortOrder
    timeZones?: SortOrder
    countries?: SortOrder
    requiredSkills?: SortOrder
    anticipatedStart?: SortOrder
    status?: SortOrder
    isPrivate?: SortOrder
    requiredMemberCount?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    roleLevel?: SortOrderInput | SortOrder
    workload?: SortOrderInput | SortOrder
    compensationRange?: SortOrderInput | SortOrder
    receivedDateFromAccount?: SortOrderInput | SortOrder
    account?: SortOrderInput | SortOrder
    smu?: SortOrderInput | SortOrder
    spoc?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    _count?: EngagementCountOrderByAggregateInput
    _avg?: EngagementAvgOrderByAggregateInput
    _max?: EngagementMaxOrderByAggregateInput
    _min?: EngagementMinOrderByAggregateInput
    _sum?: EngagementSumOrderByAggregateInput
  }

  export type EngagementScalarWhereWithAggregatesInput = {
    AND?: EngagementScalarWhereWithAggregatesInput | EngagementScalarWhereWithAggregatesInput[]
    OR?: EngagementScalarWhereWithAggregatesInput[]
    NOT?: EngagementScalarWhereWithAggregatesInput | EngagementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Engagement"> | string
    projectId?: StringWithAggregatesFilter<"Engagement"> | string
    title?: StringWithAggregatesFilter<"Engagement"> | string
    description?: StringWithAggregatesFilter<"Engagement"> | string
    durationStartDate?: DateTimeNullableWithAggregatesFilter<"Engagement"> | Date | string | null
    durationEndDate?: DateTimeNullableWithAggregatesFilter<"Engagement"> | Date | string | null
    durationWeeks?: IntNullableWithAggregatesFilter<"Engagement"> | number | null
    durationMonths?: IntNullableWithAggregatesFilter<"Engagement"> | number | null
    timeZones?: StringNullableListFilter<"Engagement">
    countries?: StringNullableListFilter<"Engagement">
    requiredSkills?: StringNullableListFilter<"Engagement">
    anticipatedStart?: EnumAnticipatedStartWithAggregatesFilter<"Engagement"> | $Enums.AnticipatedStart
    status?: EnumEngagementStatusWithAggregatesFilter<"Engagement"> | $Enums.EngagementStatus
    isPrivate?: BoolWithAggregatesFilter<"Engagement"> | boolean
    requiredMemberCount?: IntNullableWithAggregatesFilter<"Engagement"> | number | null
    role?: EnumRoleNullableWithAggregatesFilter<"Engagement"> | $Enums.Role | null
    roleLevel?: EnumRoleLevelNullableWithAggregatesFilter<"Engagement"> | $Enums.RoleLevel | null
    workload?: EnumWorkloadNullableWithAggregatesFilter<"Engagement"> | $Enums.Workload | null
    compensationRange?: StringNullableWithAggregatesFilter<"Engagement"> | string | null
    receivedDateFromAccount?: DateTimeNullableWithAggregatesFilter<"Engagement"> | Date | string | null
    account?: StringNullableWithAggregatesFilter<"Engagement"> | string | null
    smu?: StringNullableWithAggregatesFilter<"Engagement"> | string | null
    spoc?: StringNullableWithAggregatesFilter<"Engagement"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Engagement"> | Date | string
    createdBy?: StringWithAggregatesFilter<"Engagement"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"Engagement"> | Date | string
    updatedBy?: StringNullableWithAggregatesFilter<"Engagement"> | string | null
  }

  export type EngagementApplicationWhereInput = {
    AND?: EngagementApplicationWhereInput | EngagementApplicationWhereInput[]
    OR?: EngagementApplicationWhereInput[]
    NOT?: EngagementApplicationWhereInput | EngagementApplicationWhereInput[]
    id?: StringFilter<"EngagementApplication"> | string
    engagementId?: StringFilter<"EngagementApplication"> | string
    userId?: StringFilter<"EngagementApplication"> | string
    handle?: StringNullableFilter<"EngagementApplication"> | string | null
    email?: StringFilter<"EngagementApplication"> | string
    name?: StringFilter<"EngagementApplication"> | string
    address?: StringNullableFilter<"EngagementApplication"> | string | null
    mobileNumber?: StringNullableFilter<"EngagementApplication"> | string | null
    coverLetter?: StringNullableFilter<"EngagementApplication"> | string | null
    resumeUrl?: StringNullableFilter<"EngagementApplication"> | string | null
    cvFileUrl?: StringNullableFilter<"EngagementApplication"> | string | null
    portfolioUrls?: StringNullableListFilter<"EngagementApplication">
    yearsOfExperience?: IntNullableFilter<"EngagementApplication"> | number | null
    availability?: StringNullableFilter<"EngagementApplication"> | string | null
    expectedPayRate?: StringNullableFilter<"EngagementApplication"> | string | null
    referralSource?: StringNullableFilter<"EngagementApplication"> | string | null
    status?: EnumApplicationStatusFilter<"EngagementApplication"> | $Enums.ApplicationStatus
    createdAt?: DateTimeFilter<"EngagementApplication"> | Date | string
    updatedAt?: DateTimeFilter<"EngagementApplication"> | Date | string
    updatedBy?: StringNullableFilter<"EngagementApplication"> | string | null
    engagement?: XOR<EngagementScalarRelationFilter, EngagementWhereInput>
  }

  export type EngagementApplicationOrderByWithRelationInput = {
    id?: SortOrder
    engagementId?: SortOrder
    userId?: SortOrder
    handle?: SortOrderInput | SortOrder
    email?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    mobileNumber?: SortOrderInput | SortOrder
    coverLetter?: SortOrderInput | SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    cvFileUrl?: SortOrderInput | SortOrder
    portfolioUrls?: SortOrder
    yearsOfExperience?: SortOrderInput | SortOrder
    availability?: SortOrderInput | SortOrder
    expectedPayRate?: SortOrderInput | SortOrder
    referralSource?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    engagement?: EngagementOrderByWithRelationInput
  }

  export type EngagementApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    engagementId_userId?: EngagementApplicationEngagementIdUserIdCompoundUniqueInput
    AND?: EngagementApplicationWhereInput | EngagementApplicationWhereInput[]
    OR?: EngagementApplicationWhereInput[]
    NOT?: EngagementApplicationWhereInput | EngagementApplicationWhereInput[]
    engagementId?: StringFilter<"EngagementApplication"> | string
    userId?: StringFilter<"EngagementApplication"> | string
    handle?: StringNullableFilter<"EngagementApplication"> | string | null
    email?: StringFilter<"EngagementApplication"> | string
    name?: StringFilter<"EngagementApplication"> | string
    address?: StringNullableFilter<"EngagementApplication"> | string | null
    mobileNumber?: StringNullableFilter<"EngagementApplication"> | string | null
    coverLetter?: StringNullableFilter<"EngagementApplication"> | string | null
    resumeUrl?: StringNullableFilter<"EngagementApplication"> | string | null
    cvFileUrl?: StringNullableFilter<"EngagementApplication"> | string | null
    portfolioUrls?: StringNullableListFilter<"EngagementApplication">
    yearsOfExperience?: IntNullableFilter<"EngagementApplication"> | number | null
    availability?: StringNullableFilter<"EngagementApplication"> | string | null
    expectedPayRate?: StringNullableFilter<"EngagementApplication"> | string | null
    referralSource?: StringNullableFilter<"EngagementApplication"> | string | null
    status?: EnumApplicationStatusFilter<"EngagementApplication"> | $Enums.ApplicationStatus
    createdAt?: DateTimeFilter<"EngagementApplication"> | Date | string
    updatedAt?: DateTimeFilter<"EngagementApplication"> | Date | string
    updatedBy?: StringNullableFilter<"EngagementApplication"> | string | null
    engagement?: XOR<EngagementScalarRelationFilter, EngagementWhereInput>
  }, "id" | "engagementId_userId">

  export type EngagementApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    engagementId?: SortOrder
    userId?: SortOrder
    handle?: SortOrderInput | SortOrder
    email?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    mobileNumber?: SortOrderInput | SortOrder
    coverLetter?: SortOrderInput | SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    cvFileUrl?: SortOrderInput | SortOrder
    portfolioUrls?: SortOrder
    yearsOfExperience?: SortOrderInput | SortOrder
    availability?: SortOrderInput | SortOrder
    expectedPayRate?: SortOrderInput | SortOrder
    referralSource?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    _count?: EngagementApplicationCountOrderByAggregateInput
    _avg?: EngagementApplicationAvgOrderByAggregateInput
    _max?: EngagementApplicationMaxOrderByAggregateInput
    _min?: EngagementApplicationMinOrderByAggregateInput
    _sum?: EngagementApplicationSumOrderByAggregateInput
  }

  export type EngagementApplicationScalarWhereWithAggregatesInput = {
    AND?: EngagementApplicationScalarWhereWithAggregatesInput | EngagementApplicationScalarWhereWithAggregatesInput[]
    OR?: EngagementApplicationScalarWhereWithAggregatesInput[]
    NOT?: EngagementApplicationScalarWhereWithAggregatesInput | EngagementApplicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EngagementApplication"> | string
    engagementId?: StringWithAggregatesFilter<"EngagementApplication"> | string
    userId?: StringWithAggregatesFilter<"EngagementApplication"> | string
    handle?: StringNullableWithAggregatesFilter<"EngagementApplication"> | string | null
    email?: StringWithAggregatesFilter<"EngagementApplication"> | string
    name?: StringWithAggregatesFilter<"EngagementApplication"> | string
    address?: StringNullableWithAggregatesFilter<"EngagementApplication"> | string | null
    mobileNumber?: StringNullableWithAggregatesFilter<"EngagementApplication"> | string | null
    coverLetter?: StringNullableWithAggregatesFilter<"EngagementApplication"> | string | null
    resumeUrl?: StringNullableWithAggregatesFilter<"EngagementApplication"> | string | null
    cvFileUrl?: StringNullableWithAggregatesFilter<"EngagementApplication"> | string | null
    portfolioUrls?: StringNullableListFilter<"EngagementApplication">
    yearsOfExperience?: IntNullableWithAggregatesFilter<"EngagementApplication"> | number | null
    availability?: StringNullableWithAggregatesFilter<"EngagementApplication"> | string | null
    expectedPayRate?: StringNullableWithAggregatesFilter<"EngagementApplication"> | string | null
    referralSource?: StringNullableWithAggregatesFilter<"EngagementApplication"> | string | null
    status?: EnumApplicationStatusWithAggregatesFilter<"EngagementApplication"> | $Enums.ApplicationStatus
    createdAt?: DateTimeWithAggregatesFilter<"EngagementApplication"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EngagementApplication"> | Date | string
    updatedBy?: StringNullableWithAggregatesFilter<"EngagementApplication"> | string | null
  }

  export type EngagementAssignmentWhereInput = {
    AND?: EngagementAssignmentWhereInput | EngagementAssignmentWhereInput[]
    OR?: EngagementAssignmentWhereInput[]
    NOT?: EngagementAssignmentWhereInput | EngagementAssignmentWhereInput[]
    id?: StringFilter<"EngagementAssignment"> | string
    engagementId?: StringFilter<"EngagementAssignment"> | string
    memberId?: StringFilter<"EngagementAssignment"> | string
    memberHandle?: StringFilter<"EngagementAssignment"> | string
    status?: EnumAssignmentStatusFilter<"EngagementAssignment"> | $Enums.AssignmentStatus
    acceptedAt?: DateTimeNullableFilter<"EngagementAssignment"> | Date | string | null
    agreementRate?: StringNullableFilter<"EngagementAssignment"> | string | null
    ratePerHour?: StringNullableFilter<"EngagementAssignment"> | string | null
    paymentCycle?: EnumPaymentCycleFilter<"EngagementAssignment"> | $Enums.PaymentCycle
    standardHoursPerDay?: FloatNullableFilter<"EngagementAssignment"> | number | null
    totalHours?: FloatNullableFilter<"EngagementAssignment"> | number | null
    standardHoursPerWeek?: FloatNullableFilter<"EngagementAssignment"> | number | null
    durationMonths?: IntNullableFilter<"EngagementAssignment"> | number | null
    otherRemarks?: StringNullableFilter<"EngagementAssignment"> | string | null
    terminationReason?: StringNullableFilter<"EngagementAssignment"> | string | null
    startDate?: DateTimeNullableFilter<"EngagementAssignment"> | Date | string | null
    endDate?: DateTimeNullableFilter<"EngagementAssignment"> | Date | string | null
    wiproIdEndDate?: DateTimeNullableFilter<"EngagementAssignment"> | Date | string | null
    candidateWiproId?: StringNullableFilter<"EngagementAssignment"> | string | null
    source?: EnumAssignmentSourceNullableFilter<"EngagementAssignment"> | $Enums.AssignmentSource | null
    createdAt?: DateTimeFilter<"EngagementAssignment"> | Date | string
    updatedAt?: DateTimeFilter<"EngagementAssignment"> | Date | string
    engagement?: XOR<EngagementScalarRelationFilter, EngagementWhereInput>
    feedback?: EngagementFeedbackListRelationFilter
    memberExperiences?: MemberExperienceListRelationFilter
    timesheetEntries?: EngagementTimesheetEntryListRelationFilter
  }

  export type EngagementAssignmentOrderByWithRelationInput = {
    id?: SortOrder
    engagementId?: SortOrder
    memberId?: SortOrder
    memberHandle?: SortOrder
    status?: SortOrder
    acceptedAt?: SortOrderInput | SortOrder
    agreementRate?: SortOrderInput | SortOrder
    ratePerHour?: SortOrderInput | SortOrder
    paymentCycle?: SortOrder
    standardHoursPerDay?: SortOrderInput | SortOrder
    totalHours?: SortOrderInput | SortOrder
    standardHoursPerWeek?: SortOrderInput | SortOrder
    durationMonths?: SortOrderInput | SortOrder
    otherRemarks?: SortOrderInput | SortOrder
    terminationReason?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    wiproIdEndDate?: SortOrderInput | SortOrder
    candidateWiproId?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    engagement?: EngagementOrderByWithRelationInput
    feedback?: EngagementFeedbackOrderByRelationAggregateInput
    memberExperiences?: MemberExperienceOrderByRelationAggregateInput
    timesheetEntries?: EngagementTimesheetEntryOrderByRelationAggregateInput
  }

  export type EngagementAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EngagementAssignmentWhereInput | EngagementAssignmentWhereInput[]
    OR?: EngagementAssignmentWhereInput[]
    NOT?: EngagementAssignmentWhereInput | EngagementAssignmentWhereInput[]
    engagementId?: StringFilter<"EngagementAssignment"> | string
    memberId?: StringFilter<"EngagementAssignment"> | string
    memberHandle?: StringFilter<"EngagementAssignment"> | string
    status?: EnumAssignmentStatusFilter<"EngagementAssignment"> | $Enums.AssignmentStatus
    acceptedAt?: DateTimeNullableFilter<"EngagementAssignment"> | Date | string | null
    agreementRate?: StringNullableFilter<"EngagementAssignment"> | string | null
    ratePerHour?: StringNullableFilter<"EngagementAssignment"> | string | null
    paymentCycle?: EnumPaymentCycleFilter<"EngagementAssignment"> | $Enums.PaymentCycle
    standardHoursPerDay?: FloatNullableFilter<"EngagementAssignment"> | number | null
    totalHours?: FloatNullableFilter<"EngagementAssignment"> | number | null
    standardHoursPerWeek?: FloatNullableFilter<"EngagementAssignment"> | number | null
    durationMonths?: IntNullableFilter<"EngagementAssignment"> | number | null
    otherRemarks?: StringNullableFilter<"EngagementAssignment"> | string | null
    terminationReason?: StringNullableFilter<"EngagementAssignment"> | string | null
    startDate?: DateTimeNullableFilter<"EngagementAssignment"> | Date | string | null
    endDate?: DateTimeNullableFilter<"EngagementAssignment"> | Date | string | null
    wiproIdEndDate?: DateTimeNullableFilter<"EngagementAssignment"> | Date | string | null
    candidateWiproId?: StringNullableFilter<"EngagementAssignment"> | string | null
    source?: EnumAssignmentSourceNullableFilter<"EngagementAssignment"> | $Enums.AssignmentSource | null
    createdAt?: DateTimeFilter<"EngagementAssignment"> | Date | string
    updatedAt?: DateTimeFilter<"EngagementAssignment"> | Date | string
    engagement?: XOR<EngagementScalarRelationFilter, EngagementWhereInput>
    feedback?: EngagementFeedbackListRelationFilter
    memberExperiences?: MemberExperienceListRelationFilter
    timesheetEntries?: EngagementTimesheetEntryListRelationFilter
  }, "id">

  export type EngagementAssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    engagementId?: SortOrder
    memberId?: SortOrder
    memberHandle?: SortOrder
    status?: SortOrder
    acceptedAt?: SortOrderInput | SortOrder
    agreementRate?: SortOrderInput | SortOrder
    ratePerHour?: SortOrderInput | SortOrder
    paymentCycle?: SortOrder
    standardHoursPerDay?: SortOrderInput | SortOrder
    totalHours?: SortOrderInput | SortOrder
    standardHoursPerWeek?: SortOrderInput | SortOrder
    durationMonths?: SortOrderInput | SortOrder
    otherRemarks?: SortOrderInput | SortOrder
    terminationReason?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    endDate?: SortOrderInput | SortOrder
    wiproIdEndDate?: SortOrderInput | SortOrder
    candidateWiproId?: SortOrderInput | SortOrder
    source?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EngagementAssignmentCountOrderByAggregateInput
    _avg?: EngagementAssignmentAvgOrderByAggregateInput
    _max?: EngagementAssignmentMaxOrderByAggregateInput
    _min?: EngagementAssignmentMinOrderByAggregateInput
    _sum?: EngagementAssignmentSumOrderByAggregateInput
  }

  export type EngagementAssignmentScalarWhereWithAggregatesInput = {
    AND?: EngagementAssignmentScalarWhereWithAggregatesInput | EngagementAssignmentScalarWhereWithAggregatesInput[]
    OR?: EngagementAssignmentScalarWhereWithAggregatesInput[]
    NOT?: EngagementAssignmentScalarWhereWithAggregatesInput | EngagementAssignmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EngagementAssignment"> | string
    engagementId?: StringWithAggregatesFilter<"EngagementAssignment"> | string
    memberId?: StringWithAggregatesFilter<"EngagementAssignment"> | string
    memberHandle?: StringWithAggregatesFilter<"EngagementAssignment"> | string
    status?: EnumAssignmentStatusWithAggregatesFilter<"EngagementAssignment"> | $Enums.AssignmentStatus
    acceptedAt?: DateTimeNullableWithAggregatesFilter<"EngagementAssignment"> | Date | string | null
    agreementRate?: StringNullableWithAggregatesFilter<"EngagementAssignment"> | string | null
    ratePerHour?: StringNullableWithAggregatesFilter<"EngagementAssignment"> | string | null
    paymentCycle?: EnumPaymentCycleWithAggregatesFilter<"EngagementAssignment"> | $Enums.PaymentCycle
    standardHoursPerDay?: FloatNullableWithAggregatesFilter<"EngagementAssignment"> | number | null
    totalHours?: FloatNullableWithAggregatesFilter<"EngagementAssignment"> | number | null
    standardHoursPerWeek?: FloatNullableWithAggregatesFilter<"EngagementAssignment"> | number | null
    durationMonths?: IntNullableWithAggregatesFilter<"EngagementAssignment"> | number | null
    otherRemarks?: StringNullableWithAggregatesFilter<"EngagementAssignment"> | string | null
    terminationReason?: StringNullableWithAggregatesFilter<"EngagementAssignment"> | string | null
    startDate?: DateTimeNullableWithAggregatesFilter<"EngagementAssignment"> | Date | string | null
    endDate?: DateTimeNullableWithAggregatesFilter<"EngagementAssignment"> | Date | string | null
    wiproIdEndDate?: DateTimeNullableWithAggregatesFilter<"EngagementAssignment"> | Date | string | null
    candidateWiproId?: StringNullableWithAggregatesFilter<"EngagementAssignment"> | string | null
    source?: EnumAssignmentSourceNullableWithAggregatesFilter<"EngagementAssignment"> | $Enums.AssignmentSource | null
    createdAt?: DateTimeWithAggregatesFilter<"EngagementAssignment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EngagementAssignment"> | Date | string
  }

  export type EngagementFeedbackWhereInput = {
    AND?: EngagementFeedbackWhereInput | EngagementFeedbackWhereInput[]
    OR?: EngagementFeedbackWhereInput[]
    NOT?: EngagementFeedbackWhereInput | EngagementFeedbackWhereInput[]
    id?: StringFilter<"EngagementFeedback"> | string
    engagementAssignmentId?: StringFilter<"EngagementFeedback"> | string
    feedbackText?: StringFilter<"EngagementFeedback"> | string
    rating?: IntNullableFilter<"EngagementFeedback"> | number | null
    givenByMemberId?: StringNullableFilter<"EngagementFeedback"> | string | null
    givenByHandle?: StringNullableFilter<"EngagementFeedback"> | string | null
    givenByEmail?: StringNullableFilter<"EngagementFeedback"> | string | null
    secretToken?: StringNullableFilter<"EngagementFeedback"> | string | null
    secretTokenExpiresAt?: DateTimeNullableFilter<"EngagementFeedback"> | Date | string | null
    createdAt?: DateTimeFilter<"EngagementFeedback"> | Date | string
    updatedAt?: DateTimeFilter<"EngagementFeedback"> | Date | string
    assignment?: XOR<EngagementAssignmentScalarRelationFilter, EngagementAssignmentWhereInput>
  }

  export type EngagementFeedbackOrderByWithRelationInput = {
    id?: SortOrder
    engagementAssignmentId?: SortOrder
    feedbackText?: SortOrder
    rating?: SortOrderInput | SortOrder
    givenByMemberId?: SortOrderInput | SortOrder
    givenByHandle?: SortOrderInput | SortOrder
    givenByEmail?: SortOrderInput | SortOrder
    secretToken?: SortOrderInput | SortOrder
    secretTokenExpiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assignment?: EngagementAssignmentOrderByWithRelationInput
  }

  export type EngagementFeedbackWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    secretToken?: string
    AND?: EngagementFeedbackWhereInput | EngagementFeedbackWhereInput[]
    OR?: EngagementFeedbackWhereInput[]
    NOT?: EngagementFeedbackWhereInput | EngagementFeedbackWhereInput[]
    engagementAssignmentId?: StringFilter<"EngagementFeedback"> | string
    feedbackText?: StringFilter<"EngagementFeedback"> | string
    rating?: IntNullableFilter<"EngagementFeedback"> | number | null
    givenByMemberId?: StringNullableFilter<"EngagementFeedback"> | string | null
    givenByHandle?: StringNullableFilter<"EngagementFeedback"> | string | null
    givenByEmail?: StringNullableFilter<"EngagementFeedback"> | string | null
    secretTokenExpiresAt?: DateTimeNullableFilter<"EngagementFeedback"> | Date | string | null
    createdAt?: DateTimeFilter<"EngagementFeedback"> | Date | string
    updatedAt?: DateTimeFilter<"EngagementFeedback"> | Date | string
    assignment?: XOR<EngagementAssignmentScalarRelationFilter, EngagementAssignmentWhereInput>
  }, "id" | "secretToken">

  export type EngagementFeedbackOrderByWithAggregationInput = {
    id?: SortOrder
    engagementAssignmentId?: SortOrder
    feedbackText?: SortOrder
    rating?: SortOrderInput | SortOrder
    givenByMemberId?: SortOrderInput | SortOrder
    givenByHandle?: SortOrderInput | SortOrder
    givenByEmail?: SortOrderInput | SortOrder
    secretToken?: SortOrderInput | SortOrder
    secretTokenExpiresAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EngagementFeedbackCountOrderByAggregateInput
    _avg?: EngagementFeedbackAvgOrderByAggregateInput
    _max?: EngagementFeedbackMaxOrderByAggregateInput
    _min?: EngagementFeedbackMinOrderByAggregateInput
    _sum?: EngagementFeedbackSumOrderByAggregateInput
  }

  export type EngagementFeedbackScalarWhereWithAggregatesInput = {
    AND?: EngagementFeedbackScalarWhereWithAggregatesInput | EngagementFeedbackScalarWhereWithAggregatesInput[]
    OR?: EngagementFeedbackScalarWhereWithAggregatesInput[]
    NOT?: EngagementFeedbackScalarWhereWithAggregatesInput | EngagementFeedbackScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EngagementFeedback"> | string
    engagementAssignmentId?: StringWithAggregatesFilter<"EngagementFeedback"> | string
    feedbackText?: StringWithAggregatesFilter<"EngagementFeedback"> | string
    rating?: IntNullableWithAggregatesFilter<"EngagementFeedback"> | number | null
    givenByMemberId?: StringNullableWithAggregatesFilter<"EngagementFeedback"> | string | null
    givenByHandle?: StringNullableWithAggregatesFilter<"EngagementFeedback"> | string | null
    givenByEmail?: StringNullableWithAggregatesFilter<"EngagementFeedback"> | string | null
    secretToken?: StringNullableWithAggregatesFilter<"EngagementFeedback"> | string | null
    secretTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"EngagementFeedback"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EngagementFeedback"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EngagementFeedback"> | Date | string
  }

  export type MemberExperienceWhereInput = {
    AND?: MemberExperienceWhereInput | MemberExperienceWhereInput[]
    OR?: MemberExperienceWhereInput[]
    NOT?: MemberExperienceWhereInput | MemberExperienceWhereInput[]
    id?: StringFilter<"MemberExperience"> | string
    engagementAssignmentId?: StringFilter<"MemberExperience"> | string
    experienceText?: StringFilter<"MemberExperience"> | string
    createdAt?: DateTimeFilter<"MemberExperience"> | Date | string
    updatedAt?: DateTimeFilter<"MemberExperience"> | Date | string
    assignment?: XOR<EngagementAssignmentScalarRelationFilter, EngagementAssignmentWhereInput>
  }

  export type MemberExperienceOrderByWithRelationInput = {
    id?: SortOrder
    engagementAssignmentId?: SortOrder
    experienceText?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assignment?: EngagementAssignmentOrderByWithRelationInput
  }

  export type MemberExperienceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MemberExperienceWhereInput | MemberExperienceWhereInput[]
    OR?: MemberExperienceWhereInput[]
    NOT?: MemberExperienceWhereInput | MemberExperienceWhereInput[]
    engagementAssignmentId?: StringFilter<"MemberExperience"> | string
    experienceText?: StringFilter<"MemberExperience"> | string
    createdAt?: DateTimeFilter<"MemberExperience"> | Date | string
    updatedAt?: DateTimeFilter<"MemberExperience"> | Date | string
    assignment?: XOR<EngagementAssignmentScalarRelationFilter, EngagementAssignmentWhereInput>
  }, "id">

  export type MemberExperienceOrderByWithAggregationInput = {
    id?: SortOrder
    engagementAssignmentId?: SortOrder
    experienceText?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MemberExperienceCountOrderByAggregateInput
    _max?: MemberExperienceMaxOrderByAggregateInput
    _min?: MemberExperienceMinOrderByAggregateInput
  }

  export type MemberExperienceScalarWhereWithAggregatesInput = {
    AND?: MemberExperienceScalarWhereWithAggregatesInput | MemberExperienceScalarWhereWithAggregatesInput[]
    OR?: MemberExperienceScalarWhereWithAggregatesInput[]
    NOT?: MemberExperienceScalarWhereWithAggregatesInput | MemberExperienceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MemberExperience"> | string
    engagementAssignmentId?: StringWithAggregatesFilter<"MemberExperience"> | string
    experienceText?: StringWithAggregatesFilter<"MemberExperience"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MemberExperience"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MemberExperience"> | Date | string
  }

  export type EngagementLeadWhereInput = {
    AND?: EngagementLeadWhereInput | EngagementLeadWhereInput[]
    OR?: EngagementLeadWhereInput[]
    NOT?: EngagementLeadWhereInput | EngagementLeadWhereInput[]
    id?: StringFilter<"EngagementLead"> | string
    workEmail?: StringFilter<"EngagementLead"> | string
    accountName?: StringFilter<"EngagementLead"> | string
    smu?: StringFilter<"EngagementLead"> | string
    engagementModel?: EnumEngagementModelFilter<"EngagementLead"> | $Enums.EngagementModel
    roleTitle?: StringFilter<"EngagementLead"> | string
    jobDescription?: StringFilter<"EngagementLead"> | string
    requiredSkills?: StringNullableListFilter<"EngagementLead">
    experienceLevel?: EnumExperienceLevelFilter<"EngagementLead"> | $Enums.ExperienceLevel
    minYearsExperience?: IntFilter<"EngagementLead"> | number
    industryDomain?: StringNullableFilter<"EngagementLead"> | string | null
    resourcesRequired?: IntFilter<"EngagementLead"> | number
    preferredStartDate?: DateTimeFilter<"EngagementLead"> | Date | string
    engagementDuration?: StringFilter<"EngagementLead"> | string
    workingHoursPerDay?: FloatFilter<"EngagementLead"> | number
    timeZoneRequirement?: StringFilter<"EngagementLead"> | string
    remoteWorkAccepted?: BoolFilter<"EngagementLead"> | boolean
    workLocationRestrictions?: StringNullableFilter<"EngagementLead"> | string | null
    billRateCurrency?: StringFilter<"EngagementLead"> | string
    billRateAmount?: StringFilter<"EngagementLead"> | string
    priority?: EnumLeadPriorityNullableFilter<"EngagementLead"> | $Enums.LeadPriority | null
    additionalRequirements?: StringNullableFilter<"EngagementLead"> | string | null
    status?: EnumEngagementLeadStatusFilter<"EngagementLead"> | $Enums.EngagementLeadStatus
    convertedEngagementId?: StringNullableFilter<"EngagementLead"> | string | null
    createdAt?: DateTimeFilter<"EngagementLead"> | Date | string
    updatedAt?: DateTimeFilter<"EngagementLead"> | Date | string
    updatedBy?: StringNullableFilter<"EngagementLead"> | string | null
  }

  export type EngagementLeadOrderByWithRelationInput = {
    id?: SortOrder
    workEmail?: SortOrder
    accountName?: SortOrder
    smu?: SortOrder
    engagementModel?: SortOrder
    roleTitle?: SortOrder
    jobDescription?: SortOrder
    requiredSkills?: SortOrder
    experienceLevel?: SortOrder
    minYearsExperience?: SortOrder
    industryDomain?: SortOrderInput | SortOrder
    resourcesRequired?: SortOrder
    preferredStartDate?: SortOrder
    engagementDuration?: SortOrder
    workingHoursPerDay?: SortOrder
    timeZoneRequirement?: SortOrder
    remoteWorkAccepted?: SortOrder
    workLocationRestrictions?: SortOrderInput | SortOrder
    billRateCurrency?: SortOrder
    billRateAmount?: SortOrder
    priority?: SortOrderInput | SortOrder
    additionalRequirements?: SortOrderInput | SortOrder
    status?: SortOrder
    convertedEngagementId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
  }

  export type EngagementLeadWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EngagementLeadWhereInput | EngagementLeadWhereInput[]
    OR?: EngagementLeadWhereInput[]
    NOT?: EngagementLeadWhereInput | EngagementLeadWhereInput[]
    workEmail?: StringFilter<"EngagementLead"> | string
    accountName?: StringFilter<"EngagementLead"> | string
    smu?: StringFilter<"EngagementLead"> | string
    engagementModel?: EnumEngagementModelFilter<"EngagementLead"> | $Enums.EngagementModel
    roleTitle?: StringFilter<"EngagementLead"> | string
    jobDescription?: StringFilter<"EngagementLead"> | string
    requiredSkills?: StringNullableListFilter<"EngagementLead">
    experienceLevel?: EnumExperienceLevelFilter<"EngagementLead"> | $Enums.ExperienceLevel
    minYearsExperience?: IntFilter<"EngagementLead"> | number
    industryDomain?: StringNullableFilter<"EngagementLead"> | string | null
    resourcesRequired?: IntFilter<"EngagementLead"> | number
    preferredStartDate?: DateTimeFilter<"EngagementLead"> | Date | string
    engagementDuration?: StringFilter<"EngagementLead"> | string
    workingHoursPerDay?: FloatFilter<"EngagementLead"> | number
    timeZoneRequirement?: StringFilter<"EngagementLead"> | string
    remoteWorkAccepted?: BoolFilter<"EngagementLead"> | boolean
    workLocationRestrictions?: StringNullableFilter<"EngagementLead"> | string | null
    billRateCurrency?: StringFilter<"EngagementLead"> | string
    billRateAmount?: StringFilter<"EngagementLead"> | string
    priority?: EnumLeadPriorityNullableFilter<"EngagementLead"> | $Enums.LeadPriority | null
    additionalRequirements?: StringNullableFilter<"EngagementLead"> | string | null
    status?: EnumEngagementLeadStatusFilter<"EngagementLead"> | $Enums.EngagementLeadStatus
    convertedEngagementId?: StringNullableFilter<"EngagementLead"> | string | null
    createdAt?: DateTimeFilter<"EngagementLead"> | Date | string
    updatedAt?: DateTimeFilter<"EngagementLead"> | Date | string
    updatedBy?: StringNullableFilter<"EngagementLead"> | string | null
  }, "id">

  export type EngagementLeadOrderByWithAggregationInput = {
    id?: SortOrder
    workEmail?: SortOrder
    accountName?: SortOrder
    smu?: SortOrder
    engagementModel?: SortOrder
    roleTitle?: SortOrder
    jobDescription?: SortOrder
    requiredSkills?: SortOrder
    experienceLevel?: SortOrder
    minYearsExperience?: SortOrder
    industryDomain?: SortOrderInput | SortOrder
    resourcesRequired?: SortOrder
    preferredStartDate?: SortOrder
    engagementDuration?: SortOrder
    workingHoursPerDay?: SortOrder
    timeZoneRequirement?: SortOrder
    remoteWorkAccepted?: SortOrder
    workLocationRestrictions?: SortOrderInput | SortOrder
    billRateCurrency?: SortOrder
    billRateAmount?: SortOrder
    priority?: SortOrderInput | SortOrder
    additionalRequirements?: SortOrderInput | SortOrder
    status?: SortOrder
    convertedEngagementId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    _count?: EngagementLeadCountOrderByAggregateInput
    _avg?: EngagementLeadAvgOrderByAggregateInput
    _max?: EngagementLeadMaxOrderByAggregateInput
    _min?: EngagementLeadMinOrderByAggregateInput
    _sum?: EngagementLeadSumOrderByAggregateInput
  }

  export type EngagementLeadScalarWhereWithAggregatesInput = {
    AND?: EngagementLeadScalarWhereWithAggregatesInput | EngagementLeadScalarWhereWithAggregatesInput[]
    OR?: EngagementLeadScalarWhereWithAggregatesInput[]
    NOT?: EngagementLeadScalarWhereWithAggregatesInput | EngagementLeadScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EngagementLead"> | string
    workEmail?: StringWithAggregatesFilter<"EngagementLead"> | string
    accountName?: StringWithAggregatesFilter<"EngagementLead"> | string
    smu?: StringWithAggregatesFilter<"EngagementLead"> | string
    engagementModel?: EnumEngagementModelWithAggregatesFilter<"EngagementLead"> | $Enums.EngagementModel
    roleTitle?: StringWithAggregatesFilter<"EngagementLead"> | string
    jobDescription?: StringWithAggregatesFilter<"EngagementLead"> | string
    requiredSkills?: StringNullableListFilter<"EngagementLead">
    experienceLevel?: EnumExperienceLevelWithAggregatesFilter<"EngagementLead"> | $Enums.ExperienceLevel
    minYearsExperience?: IntWithAggregatesFilter<"EngagementLead"> | number
    industryDomain?: StringNullableWithAggregatesFilter<"EngagementLead"> | string | null
    resourcesRequired?: IntWithAggregatesFilter<"EngagementLead"> | number
    preferredStartDate?: DateTimeWithAggregatesFilter<"EngagementLead"> | Date | string
    engagementDuration?: StringWithAggregatesFilter<"EngagementLead"> | string
    workingHoursPerDay?: FloatWithAggregatesFilter<"EngagementLead"> | number
    timeZoneRequirement?: StringWithAggregatesFilter<"EngagementLead"> | string
    remoteWorkAccepted?: BoolWithAggregatesFilter<"EngagementLead"> | boolean
    workLocationRestrictions?: StringNullableWithAggregatesFilter<"EngagementLead"> | string | null
    billRateCurrency?: StringWithAggregatesFilter<"EngagementLead"> | string
    billRateAmount?: StringWithAggregatesFilter<"EngagementLead"> | string
    priority?: EnumLeadPriorityNullableWithAggregatesFilter<"EngagementLead"> | $Enums.LeadPriority | null
    additionalRequirements?: StringNullableWithAggregatesFilter<"EngagementLead"> | string | null
    status?: EnumEngagementLeadStatusWithAggregatesFilter<"EngagementLead"> | $Enums.EngagementLeadStatus
    convertedEngagementId?: StringNullableWithAggregatesFilter<"EngagementLead"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EngagementLead"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EngagementLead"> | Date | string
    updatedBy?: StringNullableWithAggregatesFilter<"EngagementLead"> | string | null
  }

  export type EngagementTimesheetEntryWhereInput = {
    AND?: EngagementTimesheetEntryWhereInput | EngagementTimesheetEntryWhereInput[]
    OR?: EngagementTimesheetEntryWhereInput[]
    NOT?: EngagementTimesheetEntryWhereInput | EngagementTimesheetEntryWhereInput[]
    id?: StringFilter<"EngagementTimesheetEntry"> | string
    engagementAssignmentId?: StringFilter<"EngagementTimesheetEntry"> | string
    workDate?: DateTimeFilter<"EngagementTimesheetEntry"> | Date | string
    hoursWorked?: DecimalFilter<"EngagementTimesheetEntry"> | Decimal | DecimalJsLike | number | string
    remarks?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    status?: EnumTimesheetEntryStatusFilter<"EngagementTimesheetEntry"> | $Enums.TimesheetEntryStatus
    submittedAt?: DateTimeNullableFilter<"EngagementTimesheetEntry"> | Date | string | null
    submittedBy?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    approvedAt?: DateTimeNullableFilter<"EngagementTimesheetEntry"> | Date | string | null
    approvedBy?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    approvedByHandle?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    approvalComment?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    reopenedAt?: DateTimeNullableFilter<"EngagementTimesheetEntry"> | Date | string | null
    paidPaymentReference?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    paidAt?: DateTimeNullableFilter<"EngagementTimesheetEntry"> | Date | string | null
    createdAt?: DateTimeFilter<"EngagementTimesheetEntry"> | Date | string
    createdBy?: StringFilter<"EngagementTimesheetEntry"> | string
    updatedAt?: DateTimeFilter<"EngagementTimesheetEntry"> | Date | string
    updatedBy?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    assignment?: XOR<EngagementAssignmentScalarRelationFilter, EngagementAssignmentWhereInput>
    auditRecords?: EngagementTimesheetAuditListRelationFilter
  }

  export type EngagementTimesheetEntryOrderByWithRelationInput = {
    id?: SortOrder
    engagementAssignmentId?: SortOrder
    workDate?: SortOrder
    hoursWorked?: SortOrder
    remarks?: SortOrderInput | SortOrder
    status?: SortOrder
    submittedAt?: SortOrderInput | SortOrder
    submittedBy?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    approvedBy?: SortOrderInput | SortOrder
    approvedByHandle?: SortOrderInput | SortOrder
    approvalComment?: SortOrderInput | SortOrder
    reopenedAt?: SortOrderInput | SortOrder
    paidPaymentReference?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    assignment?: EngagementAssignmentOrderByWithRelationInput
    auditRecords?: EngagementTimesheetAuditOrderByRelationAggregateInput
  }

  export type EngagementTimesheetEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    engagementAssignmentId_workDate?: EngagementTimesheetEntryEngagementAssignmentIdWorkDateCompoundUniqueInput
    AND?: EngagementTimesheetEntryWhereInput | EngagementTimesheetEntryWhereInput[]
    OR?: EngagementTimesheetEntryWhereInput[]
    NOT?: EngagementTimesheetEntryWhereInput | EngagementTimesheetEntryWhereInput[]
    engagementAssignmentId?: StringFilter<"EngagementTimesheetEntry"> | string
    workDate?: DateTimeFilter<"EngagementTimesheetEntry"> | Date | string
    hoursWorked?: DecimalFilter<"EngagementTimesheetEntry"> | Decimal | DecimalJsLike | number | string
    remarks?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    status?: EnumTimesheetEntryStatusFilter<"EngagementTimesheetEntry"> | $Enums.TimesheetEntryStatus
    submittedAt?: DateTimeNullableFilter<"EngagementTimesheetEntry"> | Date | string | null
    submittedBy?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    approvedAt?: DateTimeNullableFilter<"EngagementTimesheetEntry"> | Date | string | null
    approvedBy?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    approvedByHandle?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    approvalComment?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    reopenedAt?: DateTimeNullableFilter<"EngagementTimesheetEntry"> | Date | string | null
    paidPaymentReference?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    paidAt?: DateTimeNullableFilter<"EngagementTimesheetEntry"> | Date | string | null
    createdAt?: DateTimeFilter<"EngagementTimesheetEntry"> | Date | string
    createdBy?: StringFilter<"EngagementTimesheetEntry"> | string
    updatedAt?: DateTimeFilter<"EngagementTimesheetEntry"> | Date | string
    updatedBy?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    assignment?: XOR<EngagementAssignmentScalarRelationFilter, EngagementAssignmentWhereInput>
    auditRecords?: EngagementTimesheetAuditListRelationFilter
  }, "id" | "engagementAssignmentId_workDate">

  export type EngagementTimesheetEntryOrderByWithAggregationInput = {
    id?: SortOrder
    engagementAssignmentId?: SortOrder
    workDate?: SortOrder
    hoursWorked?: SortOrder
    remarks?: SortOrderInput | SortOrder
    status?: SortOrder
    submittedAt?: SortOrderInput | SortOrder
    submittedBy?: SortOrderInput | SortOrder
    approvedAt?: SortOrderInput | SortOrder
    approvedBy?: SortOrderInput | SortOrder
    approvedByHandle?: SortOrderInput | SortOrder
    approvalComment?: SortOrderInput | SortOrder
    reopenedAt?: SortOrderInput | SortOrder
    paidPaymentReference?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    _count?: EngagementTimesheetEntryCountOrderByAggregateInput
    _avg?: EngagementTimesheetEntryAvgOrderByAggregateInput
    _max?: EngagementTimesheetEntryMaxOrderByAggregateInput
    _min?: EngagementTimesheetEntryMinOrderByAggregateInput
    _sum?: EngagementTimesheetEntrySumOrderByAggregateInput
  }

  export type EngagementTimesheetEntryScalarWhereWithAggregatesInput = {
    AND?: EngagementTimesheetEntryScalarWhereWithAggregatesInput | EngagementTimesheetEntryScalarWhereWithAggregatesInput[]
    OR?: EngagementTimesheetEntryScalarWhereWithAggregatesInput[]
    NOT?: EngagementTimesheetEntryScalarWhereWithAggregatesInput | EngagementTimesheetEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EngagementTimesheetEntry"> | string
    engagementAssignmentId?: StringWithAggregatesFilter<"EngagementTimesheetEntry"> | string
    workDate?: DateTimeWithAggregatesFilter<"EngagementTimesheetEntry"> | Date | string
    hoursWorked?: DecimalWithAggregatesFilter<"EngagementTimesheetEntry"> | Decimal | DecimalJsLike | number | string
    remarks?: StringNullableWithAggregatesFilter<"EngagementTimesheetEntry"> | string | null
    status?: EnumTimesheetEntryStatusWithAggregatesFilter<"EngagementTimesheetEntry"> | $Enums.TimesheetEntryStatus
    submittedAt?: DateTimeNullableWithAggregatesFilter<"EngagementTimesheetEntry"> | Date | string | null
    submittedBy?: StringNullableWithAggregatesFilter<"EngagementTimesheetEntry"> | string | null
    approvedAt?: DateTimeNullableWithAggregatesFilter<"EngagementTimesheetEntry"> | Date | string | null
    approvedBy?: StringNullableWithAggregatesFilter<"EngagementTimesheetEntry"> | string | null
    approvedByHandle?: StringNullableWithAggregatesFilter<"EngagementTimesheetEntry"> | string | null
    approvalComment?: StringNullableWithAggregatesFilter<"EngagementTimesheetEntry"> | string | null
    reopenedAt?: DateTimeNullableWithAggregatesFilter<"EngagementTimesheetEntry"> | Date | string | null
    paidPaymentReference?: StringNullableWithAggregatesFilter<"EngagementTimesheetEntry"> | string | null
    paidAt?: DateTimeNullableWithAggregatesFilter<"EngagementTimesheetEntry"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EngagementTimesheetEntry"> | Date | string
    createdBy?: StringWithAggregatesFilter<"EngagementTimesheetEntry"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"EngagementTimesheetEntry"> | Date | string
    updatedBy?: StringNullableWithAggregatesFilter<"EngagementTimesheetEntry"> | string | null
  }

  export type EngagementTimesheetAuditWhereInput = {
    AND?: EngagementTimesheetAuditWhereInput | EngagementTimesheetAuditWhereInput[]
    OR?: EngagementTimesheetAuditWhereInput[]
    NOT?: EngagementTimesheetAuditWhereInput | EngagementTimesheetAuditWhereInput[]
    id?: StringFilter<"EngagementTimesheetAudit"> | string
    timesheetEntryId?: StringNullableFilter<"EngagementTimesheetAudit"> | string | null
    engagementId?: StringNullableFilter<"EngagementTimesheetAudit"> | string | null
    action?: EnumTimesheetAuditActionFilter<"EngagementTimesheetAudit"> | $Enums.TimesheetAuditAction
    previousValues?: JsonNullableFilter<"EngagementTimesheetAudit">
    updatedValues?: JsonNullableFilter<"EngagementTimesheetAudit">
    actorUserId?: StringFilter<"EngagementTimesheetAudit"> | string
    actorHandle?: StringNullableFilter<"EngagementTimesheetAudit"> | string | null
    actorRole?: StringFilter<"EngagementTimesheetAudit"> | string
    comment?: StringNullableFilter<"EngagementTimesheetAudit"> | string | null
    createdAt?: DateTimeFilter<"EngagementTimesheetAudit"> | Date | string
    entry?: XOR<EngagementTimesheetEntryNullableScalarRelationFilter, EngagementTimesheetEntryWhereInput> | null
    engagement?: XOR<EngagementNullableScalarRelationFilter, EngagementWhereInput> | null
  }

  export type EngagementTimesheetAuditOrderByWithRelationInput = {
    id?: SortOrder
    timesheetEntryId?: SortOrderInput | SortOrder
    engagementId?: SortOrderInput | SortOrder
    action?: SortOrder
    previousValues?: SortOrderInput | SortOrder
    updatedValues?: SortOrderInput | SortOrder
    actorUserId?: SortOrder
    actorHandle?: SortOrderInput | SortOrder
    actorRole?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    entry?: EngagementTimesheetEntryOrderByWithRelationInput
    engagement?: EngagementOrderByWithRelationInput
  }

  export type EngagementTimesheetAuditWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EngagementTimesheetAuditWhereInput | EngagementTimesheetAuditWhereInput[]
    OR?: EngagementTimesheetAuditWhereInput[]
    NOT?: EngagementTimesheetAuditWhereInput | EngagementTimesheetAuditWhereInput[]
    timesheetEntryId?: StringNullableFilter<"EngagementTimesheetAudit"> | string | null
    engagementId?: StringNullableFilter<"EngagementTimesheetAudit"> | string | null
    action?: EnumTimesheetAuditActionFilter<"EngagementTimesheetAudit"> | $Enums.TimesheetAuditAction
    previousValues?: JsonNullableFilter<"EngagementTimesheetAudit">
    updatedValues?: JsonNullableFilter<"EngagementTimesheetAudit">
    actorUserId?: StringFilter<"EngagementTimesheetAudit"> | string
    actorHandle?: StringNullableFilter<"EngagementTimesheetAudit"> | string | null
    actorRole?: StringFilter<"EngagementTimesheetAudit"> | string
    comment?: StringNullableFilter<"EngagementTimesheetAudit"> | string | null
    createdAt?: DateTimeFilter<"EngagementTimesheetAudit"> | Date | string
    entry?: XOR<EngagementTimesheetEntryNullableScalarRelationFilter, EngagementTimesheetEntryWhereInput> | null
    engagement?: XOR<EngagementNullableScalarRelationFilter, EngagementWhereInput> | null
  }, "id">

  export type EngagementTimesheetAuditOrderByWithAggregationInput = {
    id?: SortOrder
    timesheetEntryId?: SortOrderInput | SortOrder
    engagementId?: SortOrderInput | SortOrder
    action?: SortOrder
    previousValues?: SortOrderInput | SortOrder
    updatedValues?: SortOrderInput | SortOrder
    actorUserId?: SortOrder
    actorHandle?: SortOrderInput | SortOrder
    actorRole?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: EngagementTimesheetAuditCountOrderByAggregateInput
    _max?: EngagementTimesheetAuditMaxOrderByAggregateInput
    _min?: EngagementTimesheetAuditMinOrderByAggregateInput
  }

  export type EngagementTimesheetAuditScalarWhereWithAggregatesInput = {
    AND?: EngagementTimesheetAuditScalarWhereWithAggregatesInput | EngagementTimesheetAuditScalarWhereWithAggregatesInput[]
    OR?: EngagementTimesheetAuditScalarWhereWithAggregatesInput[]
    NOT?: EngagementTimesheetAuditScalarWhereWithAggregatesInput | EngagementTimesheetAuditScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EngagementTimesheetAudit"> | string
    timesheetEntryId?: StringNullableWithAggregatesFilter<"EngagementTimesheetAudit"> | string | null
    engagementId?: StringNullableWithAggregatesFilter<"EngagementTimesheetAudit"> | string | null
    action?: EnumTimesheetAuditActionWithAggregatesFilter<"EngagementTimesheetAudit"> | $Enums.TimesheetAuditAction
    previousValues?: JsonNullableWithAggregatesFilter<"EngagementTimesheetAudit">
    updatedValues?: JsonNullableWithAggregatesFilter<"EngagementTimesheetAudit">
    actorUserId?: StringWithAggregatesFilter<"EngagementTimesheetAudit"> | string
    actorHandle?: StringNullableWithAggregatesFilter<"EngagementTimesheetAudit"> | string | null
    actorRole?: StringWithAggregatesFilter<"EngagementTimesheetAudit"> | string
    comment?: StringNullableWithAggregatesFilter<"EngagementTimesheetAudit"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EngagementTimesheetAudit"> | Date | string
  }

  export type EngagementManagerWhereInput = {
    AND?: EngagementManagerWhereInput | EngagementManagerWhereInput[]
    OR?: EngagementManagerWhereInput[]
    NOT?: EngagementManagerWhereInput | EngagementManagerWhereInput[]
    id?: StringFilter<"EngagementManager"> | string
    engagementId?: StringFilter<"EngagementManager"> | string
    managerUserId?: StringFilter<"EngagementManager"> | string
    managerHandle?: StringFilter<"EngagementManager"> | string
    managerName?: StringNullableFilter<"EngagementManager"> | string | null
    createdAt?: DateTimeFilter<"EngagementManager"> | Date | string
    createdBy?: StringFilter<"EngagementManager"> | string
    removedAt?: DateTimeNullableFilter<"EngagementManager"> | Date | string | null
    removedBy?: StringNullableFilter<"EngagementManager"> | string | null
    engagement?: XOR<EngagementScalarRelationFilter, EngagementWhereInput>
  }

  export type EngagementManagerOrderByWithRelationInput = {
    id?: SortOrder
    engagementId?: SortOrder
    managerUserId?: SortOrder
    managerHandle?: SortOrder
    managerName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    removedAt?: SortOrderInput | SortOrder
    removedBy?: SortOrderInput | SortOrder
    engagement?: EngagementOrderByWithRelationInput
  }

  export type EngagementManagerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    engagementId_managerUserId?: EngagementManagerEngagementIdManagerUserIdCompoundUniqueInput
    AND?: EngagementManagerWhereInput | EngagementManagerWhereInput[]
    OR?: EngagementManagerWhereInput[]
    NOT?: EngagementManagerWhereInput | EngagementManagerWhereInput[]
    engagementId?: StringFilter<"EngagementManager"> | string
    managerUserId?: StringFilter<"EngagementManager"> | string
    managerHandle?: StringFilter<"EngagementManager"> | string
    managerName?: StringNullableFilter<"EngagementManager"> | string | null
    createdAt?: DateTimeFilter<"EngagementManager"> | Date | string
    createdBy?: StringFilter<"EngagementManager"> | string
    removedAt?: DateTimeNullableFilter<"EngagementManager"> | Date | string | null
    removedBy?: StringNullableFilter<"EngagementManager"> | string | null
    engagement?: XOR<EngagementScalarRelationFilter, EngagementWhereInput>
  }, "id" | "engagementId_managerUserId">

  export type EngagementManagerOrderByWithAggregationInput = {
    id?: SortOrder
    engagementId?: SortOrder
    managerUserId?: SortOrder
    managerHandle?: SortOrder
    managerName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    removedAt?: SortOrderInput | SortOrder
    removedBy?: SortOrderInput | SortOrder
    _count?: EngagementManagerCountOrderByAggregateInput
    _max?: EngagementManagerMaxOrderByAggregateInput
    _min?: EngagementManagerMinOrderByAggregateInput
  }

  export type EngagementManagerScalarWhereWithAggregatesInput = {
    AND?: EngagementManagerScalarWhereWithAggregatesInput | EngagementManagerScalarWhereWithAggregatesInput[]
    OR?: EngagementManagerScalarWhereWithAggregatesInput[]
    NOT?: EngagementManagerScalarWhereWithAggregatesInput | EngagementManagerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EngagementManager"> | string
    engagementId?: StringWithAggregatesFilter<"EngagementManager"> | string
    managerUserId?: StringWithAggregatesFilter<"EngagementManager"> | string
    managerHandle?: StringWithAggregatesFilter<"EngagementManager"> | string
    managerName?: StringNullableWithAggregatesFilter<"EngagementManager"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"EngagementManager"> | Date | string
    createdBy?: StringWithAggregatesFilter<"EngagementManager"> | string
    removedAt?: DateTimeNullableWithAggregatesFilter<"EngagementManager"> | Date | string | null
    removedBy?: StringNullableWithAggregatesFilter<"EngagementManager"> | string | null
  }

  export type EngagementCreateInput = {
    id?: string
    projectId: string
    title: string
    description: string
    durationStartDate?: Date | string | null
    durationEndDate?: Date | string | null
    durationWeeks?: number | null
    durationMonths?: number | null
    timeZones?: EngagementCreatetimeZonesInput | string[]
    countries?: EngagementCreatecountriesInput | string[]
    requiredSkills?: EngagementCreaterequiredSkillsInput | string[]
    anticipatedStart: $Enums.AnticipatedStart
    status?: $Enums.EngagementStatus
    isPrivate?: boolean
    requiredMemberCount?: number | null
    role?: $Enums.Role | null
    roleLevel?: $Enums.RoleLevel | null
    workload?: $Enums.Workload | null
    compensationRange?: string | null
    receivedDateFromAccount?: Date | string | null
    account?: string | null
    smu?: string | null
    spoc?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    applications?: EngagementApplicationCreateNestedManyWithoutEngagementInput
    assignments?: EngagementAssignmentCreateNestedManyWithoutEngagementInput
    managers?: EngagementManagerCreateNestedManyWithoutEngagementInput
    timesheetAudit?: EngagementTimesheetAuditCreateNestedManyWithoutEngagementInput
  }

  export type EngagementUncheckedCreateInput = {
    id?: string
    projectId: string
    title: string
    description: string
    durationStartDate?: Date | string | null
    durationEndDate?: Date | string | null
    durationWeeks?: number | null
    durationMonths?: number | null
    timeZones?: EngagementCreatetimeZonesInput | string[]
    countries?: EngagementCreatecountriesInput | string[]
    requiredSkills?: EngagementCreaterequiredSkillsInput | string[]
    anticipatedStart: $Enums.AnticipatedStart
    status?: $Enums.EngagementStatus
    isPrivate?: boolean
    requiredMemberCount?: number | null
    role?: $Enums.Role | null
    roleLevel?: $Enums.RoleLevel | null
    workload?: $Enums.Workload | null
    compensationRange?: string | null
    receivedDateFromAccount?: Date | string | null
    account?: string | null
    smu?: string | null
    spoc?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    applications?: EngagementApplicationUncheckedCreateNestedManyWithoutEngagementInput
    assignments?: EngagementAssignmentUncheckedCreateNestedManyWithoutEngagementInput
    managers?: EngagementManagerUncheckedCreateNestedManyWithoutEngagementInput
    timesheetAudit?: EngagementTimesheetAuditUncheckedCreateNestedManyWithoutEngagementInput
  }

  export type EngagementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    durationStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationWeeks?: NullableIntFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    timeZones?: EngagementUpdatetimeZonesInput | string[]
    countries?: EngagementUpdatecountriesInput | string[]
    requiredSkills?: EngagementUpdaterequiredSkillsInput | string[]
    anticipatedStart?: EnumAnticipatedStartFieldUpdateOperationsInput | $Enums.AnticipatedStart
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    roleLevel?: NullableEnumRoleLevelFieldUpdateOperationsInput | $Enums.RoleLevel | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    receivedDateFromAccount?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    account?: NullableStringFieldUpdateOperationsInput | string | null
    smu?: NullableStringFieldUpdateOperationsInput | string | null
    spoc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: EngagementApplicationUpdateManyWithoutEngagementNestedInput
    assignments?: EngagementAssignmentUpdateManyWithoutEngagementNestedInput
    managers?: EngagementManagerUpdateManyWithoutEngagementNestedInput
    timesheetAudit?: EngagementTimesheetAuditUpdateManyWithoutEngagementNestedInput
  }

  export type EngagementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    durationStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationWeeks?: NullableIntFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    timeZones?: EngagementUpdatetimeZonesInput | string[]
    countries?: EngagementUpdatecountriesInput | string[]
    requiredSkills?: EngagementUpdaterequiredSkillsInput | string[]
    anticipatedStart?: EnumAnticipatedStartFieldUpdateOperationsInput | $Enums.AnticipatedStart
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    roleLevel?: NullableEnumRoleLevelFieldUpdateOperationsInput | $Enums.RoleLevel | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    receivedDateFromAccount?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    account?: NullableStringFieldUpdateOperationsInput | string | null
    smu?: NullableStringFieldUpdateOperationsInput | string | null
    spoc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: EngagementApplicationUncheckedUpdateManyWithoutEngagementNestedInput
    assignments?: EngagementAssignmentUncheckedUpdateManyWithoutEngagementNestedInput
    managers?: EngagementManagerUncheckedUpdateManyWithoutEngagementNestedInput
    timesheetAudit?: EngagementTimesheetAuditUncheckedUpdateManyWithoutEngagementNestedInput
  }

  export type EngagementCreateManyInput = {
    id?: string
    projectId: string
    title: string
    description: string
    durationStartDate?: Date | string | null
    durationEndDate?: Date | string | null
    durationWeeks?: number | null
    durationMonths?: number | null
    timeZones?: EngagementCreatetimeZonesInput | string[]
    countries?: EngagementCreatecountriesInput | string[]
    requiredSkills?: EngagementCreaterequiredSkillsInput | string[]
    anticipatedStart: $Enums.AnticipatedStart
    status?: $Enums.EngagementStatus
    isPrivate?: boolean
    requiredMemberCount?: number | null
    role?: $Enums.Role | null
    roleLevel?: $Enums.RoleLevel | null
    workload?: $Enums.Workload | null
    compensationRange?: string | null
    receivedDateFromAccount?: Date | string | null
    account?: string | null
    smu?: string | null
    spoc?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type EngagementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    durationStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationWeeks?: NullableIntFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    timeZones?: EngagementUpdatetimeZonesInput | string[]
    countries?: EngagementUpdatecountriesInput | string[]
    requiredSkills?: EngagementUpdaterequiredSkillsInput | string[]
    anticipatedStart?: EnumAnticipatedStartFieldUpdateOperationsInput | $Enums.AnticipatedStart
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    roleLevel?: NullableEnumRoleLevelFieldUpdateOperationsInput | $Enums.RoleLevel | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    receivedDateFromAccount?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    account?: NullableStringFieldUpdateOperationsInput | string | null
    smu?: NullableStringFieldUpdateOperationsInput | string | null
    spoc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    durationStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationWeeks?: NullableIntFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    timeZones?: EngagementUpdatetimeZonesInput | string[]
    countries?: EngagementUpdatecountriesInput | string[]
    requiredSkills?: EngagementUpdaterequiredSkillsInput | string[]
    anticipatedStart?: EnumAnticipatedStartFieldUpdateOperationsInput | $Enums.AnticipatedStart
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    roleLevel?: NullableEnumRoleLevelFieldUpdateOperationsInput | $Enums.RoleLevel | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    receivedDateFromAccount?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    account?: NullableStringFieldUpdateOperationsInput | string | null
    smu?: NullableStringFieldUpdateOperationsInput | string | null
    spoc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementApplicationCreateInput = {
    id?: string
    userId: string
    handle?: string | null
    email: string
    name: string
    address?: string | null
    mobileNumber?: string | null
    coverLetter?: string | null
    resumeUrl?: string | null
    cvFileUrl?: string | null
    portfolioUrls?: EngagementApplicationCreateportfolioUrlsInput | string[]
    yearsOfExperience?: number | null
    availability?: string | null
    expectedPayRate?: string | null
    referralSource?: string | null
    status?: $Enums.ApplicationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
    engagement: EngagementCreateNestedOneWithoutApplicationsInput
  }

  export type EngagementApplicationUncheckedCreateInput = {
    id?: string
    engagementId: string
    userId: string
    handle?: string | null
    email: string
    name: string
    address?: string | null
    mobileNumber?: string | null
    coverLetter?: string | null
    resumeUrl?: string | null
    cvFileUrl?: string | null
    portfolioUrls?: EngagementApplicationCreateportfolioUrlsInput | string[]
    yearsOfExperience?: number | null
    availability?: string | null
    expectedPayRate?: string | null
    referralSource?: string | null
    status?: $Enums.ApplicationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type EngagementApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cvFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrls?: EngagementApplicationUpdateportfolioUrlsInput | string[]
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    expectedPayRate?: NullableStringFieldUpdateOperationsInput | string | null
    referralSource?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    engagement?: EngagementUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type EngagementApplicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cvFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrls?: EngagementApplicationUpdateportfolioUrlsInput | string[]
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    expectedPayRate?: NullableStringFieldUpdateOperationsInput | string | null
    referralSource?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementApplicationCreateManyInput = {
    id?: string
    engagementId: string
    userId: string
    handle?: string | null
    email: string
    name: string
    address?: string | null
    mobileNumber?: string | null
    coverLetter?: string | null
    resumeUrl?: string | null
    cvFileUrl?: string | null
    portfolioUrls?: EngagementApplicationCreateportfolioUrlsInput | string[]
    yearsOfExperience?: number | null
    availability?: string | null
    expectedPayRate?: string | null
    referralSource?: string | null
    status?: $Enums.ApplicationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type EngagementApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cvFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrls?: EngagementApplicationUpdateportfolioUrlsInput | string[]
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    expectedPayRate?: NullableStringFieldUpdateOperationsInput | string | null
    referralSource?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cvFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrls?: EngagementApplicationUpdateportfolioUrlsInput | string[]
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    expectedPayRate?: NullableStringFieldUpdateOperationsInput | string | null
    referralSource?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementAssignmentCreateInput = {
    id?: string
    memberId: string
    memberHandle: string
    status?: $Enums.AssignmentStatus
    acceptedAt?: Date | string | null
    agreementRate?: string | null
    ratePerHour?: string | null
    paymentCycle?: $Enums.PaymentCycle
    standardHoursPerDay?: number | null
    totalHours?: number | null
    standardHoursPerWeek?: number | null
    durationMonths?: number | null
    otherRemarks?: string | null
    terminationReason?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    wiproIdEndDate?: Date | string | null
    candidateWiproId?: string | null
    source?: $Enums.AssignmentSource | null
    createdAt?: Date | string
    updatedAt?: Date | string
    engagement: EngagementCreateNestedOneWithoutAssignmentsInput
    feedback?: EngagementFeedbackCreateNestedManyWithoutAssignmentInput
    memberExperiences?: MemberExperienceCreateNestedManyWithoutAssignmentInput
    timesheetEntries?: EngagementTimesheetEntryCreateNestedManyWithoutAssignmentInput
  }

  export type EngagementAssignmentUncheckedCreateInput = {
    id?: string
    engagementId: string
    memberId: string
    memberHandle: string
    status?: $Enums.AssignmentStatus
    acceptedAt?: Date | string | null
    agreementRate?: string | null
    ratePerHour?: string | null
    paymentCycle?: $Enums.PaymentCycle
    standardHoursPerDay?: number | null
    totalHours?: number | null
    standardHoursPerWeek?: number | null
    durationMonths?: number | null
    otherRemarks?: string | null
    terminationReason?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    wiproIdEndDate?: Date | string | null
    candidateWiproId?: string | null
    source?: $Enums.AssignmentSource | null
    createdAt?: Date | string
    updatedAt?: Date | string
    feedback?: EngagementFeedbackUncheckedCreateNestedManyWithoutAssignmentInput
    memberExperiences?: MemberExperienceUncheckedCreateNestedManyWithoutAssignmentInput
    timesheetEntries?: EngagementTimesheetEntryUncheckedCreateNestedManyWithoutAssignmentInput
  }

  export type EngagementAssignmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agreementRate?: NullableStringFieldUpdateOperationsInput | string | null
    ratePerHour?: NullableStringFieldUpdateOperationsInput | string | null
    paymentCycle?: EnumPaymentCycleFieldUpdateOperationsInput | $Enums.PaymentCycle
    standardHoursPerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    totalHours?: NullableFloatFieldUpdateOperationsInput | number | null
    standardHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    otherRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    terminationReason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wiproIdEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateWiproId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableEnumAssignmentSourceFieldUpdateOperationsInput | $Enums.AssignmentSource | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    engagement?: EngagementUpdateOneRequiredWithoutAssignmentsNestedInput
    feedback?: EngagementFeedbackUpdateManyWithoutAssignmentNestedInput
    memberExperiences?: MemberExperienceUpdateManyWithoutAssignmentNestedInput
    timesheetEntries?: EngagementTimesheetEntryUpdateManyWithoutAssignmentNestedInput
  }

  export type EngagementAssignmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agreementRate?: NullableStringFieldUpdateOperationsInput | string | null
    ratePerHour?: NullableStringFieldUpdateOperationsInput | string | null
    paymentCycle?: EnumPaymentCycleFieldUpdateOperationsInput | $Enums.PaymentCycle
    standardHoursPerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    totalHours?: NullableFloatFieldUpdateOperationsInput | number | null
    standardHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    otherRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    terminationReason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wiproIdEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateWiproId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableEnumAssignmentSourceFieldUpdateOperationsInput | $Enums.AssignmentSource | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedback?: EngagementFeedbackUncheckedUpdateManyWithoutAssignmentNestedInput
    memberExperiences?: MemberExperienceUncheckedUpdateManyWithoutAssignmentNestedInput
    timesheetEntries?: EngagementTimesheetEntryUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type EngagementAssignmentCreateManyInput = {
    id?: string
    engagementId: string
    memberId: string
    memberHandle: string
    status?: $Enums.AssignmentStatus
    acceptedAt?: Date | string | null
    agreementRate?: string | null
    ratePerHour?: string | null
    paymentCycle?: $Enums.PaymentCycle
    standardHoursPerDay?: number | null
    totalHours?: number | null
    standardHoursPerWeek?: number | null
    durationMonths?: number | null
    otherRemarks?: string | null
    terminationReason?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    wiproIdEndDate?: Date | string | null
    candidateWiproId?: string | null
    source?: $Enums.AssignmentSource | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EngagementAssignmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agreementRate?: NullableStringFieldUpdateOperationsInput | string | null
    ratePerHour?: NullableStringFieldUpdateOperationsInput | string | null
    paymentCycle?: EnumPaymentCycleFieldUpdateOperationsInput | $Enums.PaymentCycle
    standardHoursPerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    totalHours?: NullableFloatFieldUpdateOperationsInput | number | null
    standardHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    otherRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    terminationReason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wiproIdEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateWiproId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableEnumAssignmentSourceFieldUpdateOperationsInput | $Enums.AssignmentSource | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EngagementAssignmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agreementRate?: NullableStringFieldUpdateOperationsInput | string | null
    ratePerHour?: NullableStringFieldUpdateOperationsInput | string | null
    paymentCycle?: EnumPaymentCycleFieldUpdateOperationsInput | $Enums.PaymentCycle
    standardHoursPerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    totalHours?: NullableFloatFieldUpdateOperationsInput | number | null
    standardHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    otherRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    terminationReason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wiproIdEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateWiproId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableEnumAssignmentSourceFieldUpdateOperationsInput | $Enums.AssignmentSource | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EngagementFeedbackCreateInput = {
    id?: string
    feedbackText: string
    rating?: number | null
    givenByMemberId?: string | null
    givenByHandle?: string | null
    givenByEmail?: string | null
    secretToken?: string | null
    secretTokenExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignment: EngagementAssignmentCreateNestedOneWithoutFeedbackInput
  }

  export type EngagementFeedbackUncheckedCreateInput = {
    id?: string
    engagementAssignmentId: string
    feedbackText: string
    rating?: number | null
    givenByMemberId?: string | null
    givenByHandle?: string | null
    givenByEmail?: string | null
    secretToken?: string | null
    secretTokenExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EngagementFeedbackUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    feedbackText?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    givenByMemberId?: NullableStringFieldUpdateOperationsInput | string | null
    givenByHandle?: NullableStringFieldUpdateOperationsInput | string | null
    givenByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    secretToken?: NullableStringFieldUpdateOperationsInput | string | null
    secretTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignment?: EngagementAssignmentUpdateOneRequiredWithoutFeedbackNestedInput
  }

  export type EngagementFeedbackUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementAssignmentId?: StringFieldUpdateOperationsInput | string
    feedbackText?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    givenByMemberId?: NullableStringFieldUpdateOperationsInput | string | null
    givenByHandle?: NullableStringFieldUpdateOperationsInput | string | null
    givenByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    secretToken?: NullableStringFieldUpdateOperationsInput | string | null
    secretTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EngagementFeedbackCreateManyInput = {
    id?: string
    engagementAssignmentId: string
    feedbackText: string
    rating?: number | null
    givenByMemberId?: string | null
    givenByHandle?: string | null
    givenByEmail?: string | null
    secretToken?: string | null
    secretTokenExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EngagementFeedbackUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    feedbackText?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    givenByMemberId?: NullableStringFieldUpdateOperationsInput | string | null
    givenByHandle?: NullableStringFieldUpdateOperationsInput | string | null
    givenByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    secretToken?: NullableStringFieldUpdateOperationsInput | string | null
    secretTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EngagementFeedbackUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementAssignmentId?: StringFieldUpdateOperationsInput | string
    feedbackText?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    givenByMemberId?: NullableStringFieldUpdateOperationsInput | string | null
    givenByHandle?: NullableStringFieldUpdateOperationsInput | string | null
    givenByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    secretToken?: NullableStringFieldUpdateOperationsInput | string | null
    secretTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberExperienceCreateInput = {
    id?: string
    experienceText: string
    createdAt?: Date | string
    updatedAt?: Date | string
    assignment: EngagementAssignmentCreateNestedOneWithoutMemberExperiencesInput
  }

  export type MemberExperienceUncheckedCreateInput = {
    id?: string
    engagementAssignmentId: string
    experienceText: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberExperienceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    experienceText?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignment?: EngagementAssignmentUpdateOneRequiredWithoutMemberExperiencesNestedInput
  }

  export type MemberExperienceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementAssignmentId?: StringFieldUpdateOperationsInput | string
    experienceText?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberExperienceCreateManyInput = {
    id?: string
    engagementAssignmentId: string
    experienceText: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberExperienceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    experienceText?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberExperienceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementAssignmentId?: StringFieldUpdateOperationsInput | string
    experienceText?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EngagementLeadCreateInput = {
    id?: string
    workEmail: string
    accountName: string
    smu: string
    engagementModel: $Enums.EngagementModel
    roleTitle: string
    jobDescription: string
    requiredSkills?: EngagementLeadCreaterequiredSkillsInput | string[]
    experienceLevel: $Enums.ExperienceLevel
    minYearsExperience: number
    industryDomain?: string | null
    resourcesRequired: number
    preferredStartDate: Date | string
    engagementDuration: string
    workingHoursPerDay: number
    timeZoneRequirement: string
    remoteWorkAccepted: boolean
    workLocationRestrictions?: string | null
    billRateCurrency: string
    billRateAmount: string
    priority?: $Enums.LeadPriority | null
    additionalRequirements?: string | null
    status?: $Enums.EngagementLeadStatus
    convertedEngagementId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type EngagementLeadUncheckedCreateInput = {
    id?: string
    workEmail: string
    accountName: string
    smu: string
    engagementModel: $Enums.EngagementModel
    roleTitle: string
    jobDescription: string
    requiredSkills?: EngagementLeadCreaterequiredSkillsInput | string[]
    experienceLevel: $Enums.ExperienceLevel
    minYearsExperience: number
    industryDomain?: string | null
    resourcesRequired: number
    preferredStartDate: Date | string
    engagementDuration: string
    workingHoursPerDay: number
    timeZoneRequirement: string
    remoteWorkAccepted: boolean
    workLocationRestrictions?: string | null
    billRateCurrency: string
    billRateAmount: string
    priority?: $Enums.LeadPriority | null
    additionalRequirements?: string | null
    status?: $Enums.EngagementLeadStatus
    convertedEngagementId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type EngagementLeadUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workEmail?: StringFieldUpdateOperationsInput | string
    accountName?: StringFieldUpdateOperationsInput | string
    smu?: StringFieldUpdateOperationsInput | string
    engagementModel?: EnumEngagementModelFieldUpdateOperationsInput | $Enums.EngagementModel
    roleTitle?: StringFieldUpdateOperationsInput | string
    jobDescription?: StringFieldUpdateOperationsInput | string
    requiredSkills?: EngagementLeadUpdaterequiredSkillsInput | string[]
    experienceLevel?: EnumExperienceLevelFieldUpdateOperationsInput | $Enums.ExperienceLevel
    minYearsExperience?: IntFieldUpdateOperationsInput | number
    industryDomain?: NullableStringFieldUpdateOperationsInput | string | null
    resourcesRequired?: IntFieldUpdateOperationsInput | number
    preferredStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    engagementDuration?: StringFieldUpdateOperationsInput | string
    workingHoursPerDay?: FloatFieldUpdateOperationsInput | number
    timeZoneRequirement?: StringFieldUpdateOperationsInput | string
    remoteWorkAccepted?: BoolFieldUpdateOperationsInput | boolean
    workLocationRestrictions?: NullableStringFieldUpdateOperationsInput | string | null
    billRateCurrency?: StringFieldUpdateOperationsInput | string
    billRateAmount?: StringFieldUpdateOperationsInput | string
    priority?: NullableEnumLeadPriorityFieldUpdateOperationsInput | $Enums.LeadPriority | null
    additionalRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEngagementLeadStatusFieldUpdateOperationsInput | $Enums.EngagementLeadStatus
    convertedEngagementId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementLeadUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workEmail?: StringFieldUpdateOperationsInput | string
    accountName?: StringFieldUpdateOperationsInput | string
    smu?: StringFieldUpdateOperationsInput | string
    engagementModel?: EnumEngagementModelFieldUpdateOperationsInput | $Enums.EngagementModel
    roleTitle?: StringFieldUpdateOperationsInput | string
    jobDescription?: StringFieldUpdateOperationsInput | string
    requiredSkills?: EngagementLeadUpdaterequiredSkillsInput | string[]
    experienceLevel?: EnumExperienceLevelFieldUpdateOperationsInput | $Enums.ExperienceLevel
    minYearsExperience?: IntFieldUpdateOperationsInput | number
    industryDomain?: NullableStringFieldUpdateOperationsInput | string | null
    resourcesRequired?: IntFieldUpdateOperationsInput | number
    preferredStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    engagementDuration?: StringFieldUpdateOperationsInput | string
    workingHoursPerDay?: FloatFieldUpdateOperationsInput | number
    timeZoneRequirement?: StringFieldUpdateOperationsInput | string
    remoteWorkAccepted?: BoolFieldUpdateOperationsInput | boolean
    workLocationRestrictions?: NullableStringFieldUpdateOperationsInput | string | null
    billRateCurrency?: StringFieldUpdateOperationsInput | string
    billRateAmount?: StringFieldUpdateOperationsInput | string
    priority?: NullableEnumLeadPriorityFieldUpdateOperationsInput | $Enums.LeadPriority | null
    additionalRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEngagementLeadStatusFieldUpdateOperationsInput | $Enums.EngagementLeadStatus
    convertedEngagementId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementLeadCreateManyInput = {
    id?: string
    workEmail: string
    accountName: string
    smu: string
    engagementModel: $Enums.EngagementModel
    roleTitle: string
    jobDescription: string
    requiredSkills?: EngagementLeadCreaterequiredSkillsInput | string[]
    experienceLevel: $Enums.ExperienceLevel
    minYearsExperience: number
    industryDomain?: string | null
    resourcesRequired: number
    preferredStartDate: Date | string
    engagementDuration: string
    workingHoursPerDay: number
    timeZoneRequirement: string
    remoteWorkAccepted: boolean
    workLocationRestrictions?: string | null
    billRateCurrency: string
    billRateAmount: string
    priority?: $Enums.LeadPriority | null
    additionalRequirements?: string | null
    status?: $Enums.EngagementLeadStatus
    convertedEngagementId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type EngagementLeadUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    workEmail?: StringFieldUpdateOperationsInput | string
    accountName?: StringFieldUpdateOperationsInput | string
    smu?: StringFieldUpdateOperationsInput | string
    engagementModel?: EnumEngagementModelFieldUpdateOperationsInput | $Enums.EngagementModel
    roleTitle?: StringFieldUpdateOperationsInput | string
    jobDescription?: StringFieldUpdateOperationsInput | string
    requiredSkills?: EngagementLeadUpdaterequiredSkillsInput | string[]
    experienceLevel?: EnumExperienceLevelFieldUpdateOperationsInput | $Enums.ExperienceLevel
    minYearsExperience?: IntFieldUpdateOperationsInput | number
    industryDomain?: NullableStringFieldUpdateOperationsInput | string | null
    resourcesRequired?: IntFieldUpdateOperationsInput | number
    preferredStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    engagementDuration?: StringFieldUpdateOperationsInput | string
    workingHoursPerDay?: FloatFieldUpdateOperationsInput | number
    timeZoneRequirement?: StringFieldUpdateOperationsInput | string
    remoteWorkAccepted?: BoolFieldUpdateOperationsInput | boolean
    workLocationRestrictions?: NullableStringFieldUpdateOperationsInput | string | null
    billRateCurrency?: StringFieldUpdateOperationsInput | string
    billRateAmount?: StringFieldUpdateOperationsInput | string
    priority?: NullableEnumLeadPriorityFieldUpdateOperationsInput | $Enums.LeadPriority | null
    additionalRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEngagementLeadStatusFieldUpdateOperationsInput | $Enums.EngagementLeadStatus
    convertedEngagementId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementLeadUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workEmail?: StringFieldUpdateOperationsInput | string
    accountName?: StringFieldUpdateOperationsInput | string
    smu?: StringFieldUpdateOperationsInput | string
    engagementModel?: EnumEngagementModelFieldUpdateOperationsInput | $Enums.EngagementModel
    roleTitle?: StringFieldUpdateOperationsInput | string
    jobDescription?: StringFieldUpdateOperationsInput | string
    requiredSkills?: EngagementLeadUpdaterequiredSkillsInput | string[]
    experienceLevel?: EnumExperienceLevelFieldUpdateOperationsInput | $Enums.ExperienceLevel
    minYearsExperience?: IntFieldUpdateOperationsInput | number
    industryDomain?: NullableStringFieldUpdateOperationsInput | string | null
    resourcesRequired?: IntFieldUpdateOperationsInput | number
    preferredStartDate?: DateTimeFieldUpdateOperationsInput | Date | string
    engagementDuration?: StringFieldUpdateOperationsInput | string
    workingHoursPerDay?: FloatFieldUpdateOperationsInput | number
    timeZoneRequirement?: StringFieldUpdateOperationsInput | string
    remoteWorkAccepted?: BoolFieldUpdateOperationsInput | boolean
    workLocationRestrictions?: NullableStringFieldUpdateOperationsInput | string | null
    billRateCurrency?: StringFieldUpdateOperationsInput | string
    billRateAmount?: StringFieldUpdateOperationsInput | string
    priority?: NullableEnumLeadPriorityFieldUpdateOperationsInput | $Enums.LeadPriority | null
    additionalRequirements?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumEngagementLeadStatusFieldUpdateOperationsInput | $Enums.EngagementLeadStatus
    convertedEngagementId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementTimesheetEntryCreateInput = {
    id?: string
    workDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    remarks?: string | null
    status?: $Enums.TimesheetEntryStatus
    submittedAt?: Date | string | null
    submittedBy?: string | null
    approvedAt?: Date | string | null
    approvedBy?: string | null
    approvedByHandle?: string | null
    approvalComment?: string | null
    reopenedAt?: Date | string | null
    paidPaymentReference?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    assignment: EngagementAssignmentCreateNestedOneWithoutTimesheetEntriesInput
    auditRecords?: EngagementTimesheetAuditCreateNestedManyWithoutEntryInput
  }

  export type EngagementTimesheetEntryUncheckedCreateInput = {
    id?: string
    engagementAssignmentId: string
    workDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    remarks?: string | null
    status?: $Enums.TimesheetEntryStatus
    submittedAt?: Date | string | null
    submittedBy?: string | null
    approvedAt?: Date | string | null
    approvedBy?: string | null
    approvedByHandle?: string | null
    approvalComment?: string | null
    reopenedAt?: Date | string | null
    paidPaymentReference?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    auditRecords?: EngagementTimesheetAuditUncheckedCreateNestedManyWithoutEntryInput
  }

  export type EngagementTimesheetEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTimesheetEntryStatusFieldUpdateOperationsInput | $Enums.TimesheetEntryStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedByHandle?: NullableStringFieldUpdateOperationsInput | string | null
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    reopenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    assignment?: EngagementAssignmentUpdateOneRequiredWithoutTimesheetEntriesNestedInput
    auditRecords?: EngagementTimesheetAuditUpdateManyWithoutEntryNestedInput
  }

  export type EngagementTimesheetEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementAssignmentId?: StringFieldUpdateOperationsInput | string
    workDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTimesheetEntryStatusFieldUpdateOperationsInput | $Enums.TimesheetEntryStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedByHandle?: NullableStringFieldUpdateOperationsInput | string | null
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    reopenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    auditRecords?: EngagementTimesheetAuditUncheckedUpdateManyWithoutEntryNestedInput
  }

  export type EngagementTimesheetEntryCreateManyInput = {
    id?: string
    engagementAssignmentId: string
    workDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    remarks?: string | null
    status?: $Enums.TimesheetEntryStatus
    submittedAt?: Date | string | null
    submittedBy?: string | null
    approvedAt?: Date | string | null
    approvedBy?: string | null
    approvedByHandle?: string | null
    approvalComment?: string | null
    reopenedAt?: Date | string | null
    paidPaymentReference?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type EngagementTimesheetEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    workDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTimesheetEntryStatusFieldUpdateOperationsInput | $Enums.TimesheetEntryStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedByHandle?: NullableStringFieldUpdateOperationsInput | string | null
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    reopenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementTimesheetEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementAssignmentId?: StringFieldUpdateOperationsInput | string
    workDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTimesheetEntryStatusFieldUpdateOperationsInput | $Enums.TimesheetEntryStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedByHandle?: NullableStringFieldUpdateOperationsInput | string | null
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    reopenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementTimesheetAuditCreateInput = {
    id?: string
    action: $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId: string
    actorHandle?: string | null
    actorRole: string
    comment?: string | null
    createdAt?: Date | string
    entry?: EngagementTimesheetEntryCreateNestedOneWithoutAuditRecordsInput
    engagement?: EngagementCreateNestedOneWithoutTimesheetAuditInput
  }

  export type EngagementTimesheetAuditUncheckedCreateInput = {
    id?: string
    timesheetEntryId?: string | null
    engagementId?: string | null
    action: $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId: string
    actorHandle?: string | null
    actorRole: string
    comment?: string | null
    createdAt?: Date | string
  }

  export type EngagementTimesheetAuditUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumTimesheetAuditActionFieldUpdateOperationsInput | $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId?: StringFieldUpdateOperationsInput | string
    actorHandle?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: EngagementTimesheetEntryUpdateOneWithoutAuditRecordsNestedInput
    engagement?: EngagementUpdateOneWithoutTimesheetAuditNestedInput
  }

  export type EngagementTimesheetAuditUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    timesheetEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    engagementId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: EnumTimesheetAuditActionFieldUpdateOperationsInput | $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId?: StringFieldUpdateOperationsInput | string
    actorHandle?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EngagementTimesheetAuditCreateManyInput = {
    id?: string
    timesheetEntryId?: string | null
    engagementId?: string | null
    action: $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId: string
    actorHandle?: string | null
    actorRole: string
    comment?: string | null
    createdAt?: Date | string
  }

  export type EngagementTimesheetAuditUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumTimesheetAuditActionFieldUpdateOperationsInput | $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId?: StringFieldUpdateOperationsInput | string
    actorHandle?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EngagementTimesheetAuditUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    timesheetEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    engagementId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: EnumTimesheetAuditActionFieldUpdateOperationsInput | $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId?: StringFieldUpdateOperationsInput | string
    actorHandle?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EngagementManagerCreateInput = {
    id?: string
    managerUserId: string
    managerHandle: string
    managerName?: string | null
    createdAt?: Date | string
    createdBy: string
    removedAt?: Date | string | null
    removedBy?: string | null
    engagement: EngagementCreateNestedOneWithoutManagersInput
  }

  export type EngagementManagerUncheckedCreateInput = {
    id?: string
    engagementId: string
    managerUserId: string
    managerHandle: string
    managerName?: string | null
    createdAt?: Date | string
    createdBy: string
    removedAt?: Date | string | null
    removedBy?: string | null
  }

  export type EngagementManagerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    managerUserId?: StringFieldUpdateOperationsInput | string
    managerHandle?: StringFieldUpdateOperationsInput | string
    managerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    removedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    removedBy?: NullableStringFieldUpdateOperationsInput | string | null
    engagement?: EngagementUpdateOneRequiredWithoutManagersNestedInput
  }

  export type EngagementManagerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementId?: StringFieldUpdateOperationsInput | string
    managerUserId?: StringFieldUpdateOperationsInput | string
    managerHandle?: StringFieldUpdateOperationsInput | string
    managerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    removedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    removedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementManagerCreateManyInput = {
    id?: string
    engagementId: string
    managerUserId: string
    managerHandle: string
    managerName?: string | null
    createdAt?: Date | string
    createdBy: string
    removedAt?: Date | string | null
    removedBy?: string | null
  }

  export type EngagementManagerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    managerUserId?: StringFieldUpdateOperationsInput | string
    managerHandle?: StringFieldUpdateOperationsInput | string
    managerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    removedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    removedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementManagerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementId?: StringFieldUpdateOperationsInput | string
    managerUserId?: StringFieldUpdateOperationsInput | string
    managerHandle?: StringFieldUpdateOperationsInput | string
    managerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    removedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    removedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumAnticipatedStartFilter<$PrismaModel = never> = {
    equals?: $Enums.AnticipatedStart | EnumAnticipatedStartFieldRefInput<$PrismaModel>
    in?: $Enums.AnticipatedStart[] | ListEnumAnticipatedStartFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnticipatedStart[] | ListEnumAnticipatedStartFieldRefInput<$PrismaModel>
    not?: NestedEnumAnticipatedStartFilter<$PrismaModel> | $Enums.AnticipatedStart
  }

  export type EnumEngagementStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EngagementStatus | EnumEngagementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EngagementStatus[] | ListEnumEngagementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EngagementStatus[] | ListEnumEngagementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEngagementStatusFilter<$PrismaModel> | $Enums.EngagementStatus
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type EnumRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRoleNullableFilter<$PrismaModel> | $Enums.Role | null
  }

  export type EnumRoleLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleLevel | EnumRoleLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.RoleLevel[] | ListEnumRoleLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RoleLevel[] | ListEnumRoleLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRoleLevelNullableFilter<$PrismaModel> | $Enums.RoleLevel | null
  }

  export type EnumWorkloadNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Workload | EnumWorkloadFieldRefInput<$PrismaModel> | null
    in?: $Enums.Workload[] | ListEnumWorkloadFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Workload[] | ListEnumWorkloadFieldRefInput<$PrismaModel> | null
    not?: NestedEnumWorkloadNullableFilter<$PrismaModel> | $Enums.Workload | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EngagementApplicationListRelationFilter = {
    every?: EngagementApplicationWhereInput
    some?: EngagementApplicationWhereInput
    none?: EngagementApplicationWhereInput
  }

  export type EngagementAssignmentListRelationFilter = {
    every?: EngagementAssignmentWhereInput
    some?: EngagementAssignmentWhereInput
    none?: EngagementAssignmentWhereInput
  }

  export type EngagementManagerListRelationFilter = {
    every?: EngagementManagerWhereInput
    some?: EngagementManagerWhereInput
    none?: EngagementManagerWhereInput
  }

  export type EngagementTimesheetAuditListRelationFilter = {
    every?: EngagementTimesheetAuditWhereInput
    some?: EngagementTimesheetAuditWhereInput
    none?: EngagementTimesheetAuditWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EngagementApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EngagementAssignmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EngagementManagerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EngagementTimesheetAuditOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EngagementCountOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    durationStartDate?: SortOrder
    durationEndDate?: SortOrder
    durationWeeks?: SortOrder
    durationMonths?: SortOrder
    timeZones?: SortOrder
    countries?: SortOrder
    requiredSkills?: SortOrder
    anticipatedStart?: SortOrder
    status?: SortOrder
    isPrivate?: SortOrder
    requiredMemberCount?: SortOrder
    role?: SortOrder
    roleLevel?: SortOrder
    workload?: SortOrder
    compensationRange?: SortOrder
    receivedDateFromAccount?: SortOrder
    account?: SortOrder
    smu?: SortOrder
    spoc?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type EngagementAvgOrderByAggregateInput = {
    durationWeeks?: SortOrder
    durationMonths?: SortOrder
    requiredMemberCount?: SortOrder
  }

  export type EngagementMaxOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    durationStartDate?: SortOrder
    durationEndDate?: SortOrder
    durationWeeks?: SortOrder
    durationMonths?: SortOrder
    anticipatedStart?: SortOrder
    status?: SortOrder
    isPrivate?: SortOrder
    requiredMemberCount?: SortOrder
    role?: SortOrder
    roleLevel?: SortOrder
    workload?: SortOrder
    compensationRange?: SortOrder
    receivedDateFromAccount?: SortOrder
    account?: SortOrder
    smu?: SortOrder
    spoc?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type EngagementMinOrderByAggregateInput = {
    id?: SortOrder
    projectId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    durationStartDate?: SortOrder
    durationEndDate?: SortOrder
    durationWeeks?: SortOrder
    durationMonths?: SortOrder
    anticipatedStart?: SortOrder
    status?: SortOrder
    isPrivate?: SortOrder
    requiredMemberCount?: SortOrder
    role?: SortOrder
    roleLevel?: SortOrder
    workload?: SortOrder
    compensationRange?: SortOrder
    receivedDateFromAccount?: SortOrder
    account?: SortOrder
    smu?: SortOrder
    spoc?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type EngagementSumOrderByAggregateInput = {
    durationWeeks?: SortOrder
    durationMonths?: SortOrder
    requiredMemberCount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumAnticipatedStartWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnticipatedStart | EnumAnticipatedStartFieldRefInput<$PrismaModel>
    in?: $Enums.AnticipatedStart[] | ListEnumAnticipatedStartFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnticipatedStart[] | ListEnumAnticipatedStartFieldRefInput<$PrismaModel>
    not?: NestedEnumAnticipatedStartWithAggregatesFilter<$PrismaModel> | $Enums.AnticipatedStart
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnticipatedStartFilter<$PrismaModel>
    _max?: NestedEnumAnticipatedStartFilter<$PrismaModel>
  }

  export type EnumEngagementStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EngagementStatus | EnumEngagementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EngagementStatus[] | ListEnumEngagementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EngagementStatus[] | ListEnumEngagementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEngagementStatusWithAggregatesFilter<$PrismaModel> | $Enums.EngagementStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEngagementStatusFilter<$PrismaModel>
    _max?: NestedEnumEngagementStatusFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.Role | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRoleNullableFilter<$PrismaModel>
    _max?: NestedEnumRoleNullableFilter<$PrismaModel>
  }

  export type EnumRoleLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleLevel | EnumRoleLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.RoleLevel[] | ListEnumRoleLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RoleLevel[] | ListEnumRoleLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRoleLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.RoleLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRoleLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumRoleLevelNullableFilter<$PrismaModel>
  }

  export type EnumWorkloadNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Workload | EnumWorkloadFieldRefInput<$PrismaModel> | null
    in?: $Enums.Workload[] | ListEnumWorkloadFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Workload[] | ListEnumWorkloadFieldRefInput<$PrismaModel> | null
    not?: NestedEnumWorkloadNullableWithAggregatesFilter<$PrismaModel> | $Enums.Workload | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumWorkloadNullableFilter<$PrismaModel>
    _max?: NestedEnumWorkloadNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus
  }

  export type EngagementScalarRelationFilter = {
    is?: EngagementWhereInput
    isNot?: EngagementWhereInput
  }

  export type EngagementApplicationEngagementIdUserIdCompoundUniqueInput = {
    engagementId: string
    userId: string
  }

  export type EngagementApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    engagementId?: SortOrder
    userId?: SortOrder
    handle?: SortOrder
    email?: SortOrder
    name?: SortOrder
    address?: SortOrder
    mobileNumber?: SortOrder
    coverLetter?: SortOrder
    resumeUrl?: SortOrder
    cvFileUrl?: SortOrder
    portfolioUrls?: SortOrder
    yearsOfExperience?: SortOrder
    availability?: SortOrder
    expectedPayRate?: SortOrder
    referralSource?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type EngagementApplicationAvgOrderByAggregateInput = {
    yearsOfExperience?: SortOrder
  }

  export type EngagementApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    engagementId?: SortOrder
    userId?: SortOrder
    handle?: SortOrder
    email?: SortOrder
    name?: SortOrder
    address?: SortOrder
    mobileNumber?: SortOrder
    coverLetter?: SortOrder
    resumeUrl?: SortOrder
    cvFileUrl?: SortOrder
    yearsOfExperience?: SortOrder
    availability?: SortOrder
    expectedPayRate?: SortOrder
    referralSource?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type EngagementApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    engagementId?: SortOrder
    userId?: SortOrder
    handle?: SortOrder
    email?: SortOrder
    name?: SortOrder
    address?: SortOrder
    mobileNumber?: SortOrder
    coverLetter?: SortOrder
    resumeUrl?: SortOrder
    cvFileUrl?: SortOrder
    yearsOfExperience?: SortOrder
    availability?: SortOrder
    expectedPayRate?: SortOrder
    referralSource?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type EngagementApplicationSumOrderByAggregateInput = {
    yearsOfExperience?: SortOrder
  }

  export type EnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>
  }

  export type EnumAssignmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentStatus | EnumAssignmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAssignmentStatusFilter<$PrismaModel> | $Enums.AssignmentStatus
  }

  export type EnumPaymentCycleFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentCycle | EnumPaymentCycleFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentCycle[] | ListEnumPaymentCycleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentCycle[] | ListEnumPaymentCycleFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentCycleFilter<$PrismaModel> | $Enums.PaymentCycle
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumAssignmentSourceNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentSource | EnumAssignmentSourceFieldRefInput<$PrismaModel> | null
    in?: $Enums.AssignmentSource[] | ListEnumAssignmentSourceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AssignmentSource[] | ListEnumAssignmentSourceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAssignmentSourceNullableFilter<$PrismaModel> | $Enums.AssignmentSource | null
  }

  export type EngagementFeedbackListRelationFilter = {
    every?: EngagementFeedbackWhereInput
    some?: EngagementFeedbackWhereInput
    none?: EngagementFeedbackWhereInput
  }

  export type MemberExperienceListRelationFilter = {
    every?: MemberExperienceWhereInput
    some?: MemberExperienceWhereInput
    none?: MemberExperienceWhereInput
  }

  export type EngagementTimesheetEntryListRelationFilter = {
    every?: EngagementTimesheetEntryWhereInput
    some?: EngagementTimesheetEntryWhereInput
    none?: EngagementTimesheetEntryWhereInput
  }

  export type EngagementFeedbackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemberExperienceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EngagementTimesheetEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EngagementAssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    engagementId?: SortOrder
    memberId?: SortOrder
    memberHandle?: SortOrder
    status?: SortOrder
    acceptedAt?: SortOrder
    agreementRate?: SortOrder
    ratePerHour?: SortOrder
    paymentCycle?: SortOrder
    standardHoursPerDay?: SortOrder
    totalHours?: SortOrder
    standardHoursPerWeek?: SortOrder
    durationMonths?: SortOrder
    otherRemarks?: SortOrder
    terminationReason?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    wiproIdEndDate?: SortOrder
    candidateWiproId?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EngagementAssignmentAvgOrderByAggregateInput = {
    standardHoursPerDay?: SortOrder
    totalHours?: SortOrder
    standardHoursPerWeek?: SortOrder
    durationMonths?: SortOrder
  }

  export type EngagementAssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    engagementId?: SortOrder
    memberId?: SortOrder
    memberHandle?: SortOrder
    status?: SortOrder
    acceptedAt?: SortOrder
    agreementRate?: SortOrder
    ratePerHour?: SortOrder
    paymentCycle?: SortOrder
    standardHoursPerDay?: SortOrder
    totalHours?: SortOrder
    standardHoursPerWeek?: SortOrder
    durationMonths?: SortOrder
    otherRemarks?: SortOrder
    terminationReason?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    wiproIdEndDate?: SortOrder
    candidateWiproId?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EngagementAssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    engagementId?: SortOrder
    memberId?: SortOrder
    memberHandle?: SortOrder
    status?: SortOrder
    acceptedAt?: SortOrder
    agreementRate?: SortOrder
    ratePerHour?: SortOrder
    paymentCycle?: SortOrder
    standardHoursPerDay?: SortOrder
    totalHours?: SortOrder
    standardHoursPerWeek?: SortOrder
    durationMonths?: SortOrder
    otherRemarks?: SortOrder
    terminationReason?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    wiproIdEndDate?: SortOrder
    candidateWiproId?: SortOrder
    source?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EngagementAssignmentSumOrderByAggregateInput = {
    standardHoursPerDay?: SortOrder
    totalHours?: SortOrder
    standardHoursPerWeek?: SortOrder
    durationMonths?: SortOrder
  }

  export type EnumAssignmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentStatus | EnumAssignmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAssignmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AssignmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssignmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAssignmentStatusFilter<$PrismaModel>
  }

  export type EnumPaymentCycleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentCycle | EnumPaymentCycleFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentCycle[] | ListEnumPaymentCycleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentCycle[] | ListEnumPaymentCycleFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentCycleWithAggregatesFilter<$PrismaModel> | $Enums.PaymentCycle
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentCycleFilter<$PrismaModel>
    _max?: NestedEnumPaymentCycleFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumAssignmentSourceNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentSource | EnumAssignmentSourceFieldRefInput<$PrismaModel> | null
    in?: $Enums.AssignmentSource[] | ListEnumAssignmentSourceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AssignmentSource[] | ListEnumAssignmentSourceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAssignmentSourceNullableWithAggregatesFilter<$PrismaModel> | $Enums.AssignmentSource | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAssignmentSourceNullableFilter<$PrismaModel>
    _max?: NestedEnumAssignmentSourceNullableFilter<$PrismaModel>
  }

  export type EngagementAssignmentScalarRelationFilter = {
    is?: EngagementAssignmentWhereInput
    isNot?: EngagementAssignmentWhereInput
  }

  export type EngagementFeedbackCountOrderByAggregateInput = {
    id?: SortOrder
    engagementAssignmentId?: SortOrder
    feedbackText?: SortOrder
    rating?: SortOrder
    givenByMemberId?: SortOrder
    givenByHandle?: SortOrder
    givenByEmail?: SortOrder
    secretToken?: SortOrder
    secretTokenExpiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EngagementFeedbackAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type EngagementFeedbackMaxOrderByAggregateInput = {
    id?: SortOrder
    engagementAssignmentId?: SortOrder
    feedbackText?: SortOrder
    rating?: SortOrder
    givenByMemberId?: SortOrder
    givenByHandle?: SortOrder
    givenByEmail?: SortOrder
    secretToken?: SortOrder
    secretTokenExpiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EngagementFeedbackMinOrderByAggregateInput = {
    id?: SortOrder
    engagementAssignmentId?: SortOrder
    feedbackText?: SortOrder
    rating?: SortOrder
    givenByMemberId?: SortOrder
    givenByHandle?: SortOrder
    givenByEmail?: SortOrder
    secretToken?: SortOrder
    secretTokenExpiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EngagementFeedbackSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type MemberExperienceCountOrderByAggregateInput = {
    id?: SortOrder
    engagementAssignmentId?: SortOrder
    experienceText?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberExperienceMaxOrderByAggregateInput = {
    id?: SortOrder
    engagementAssignmentId?: SortOrder
    experienceText?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MemberExperienceMinOrderByAggregateInput = {
    id?: SortOrder
    engagementAssignmentId?: SortOrder
    experienceText?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumEngagementModelFilter<$PrismaModel = never> = {
    equals?: $Enums.EngagementModel | EnumEngagementModelFieldRefInput<$PrismaModel>
    in?: $Enums.EngagementModel[] | ListEnumEngagementModelFieldRefInput<$PrismaModel>
    notIn?: $Enums.EngagementModel[] | ListEnumEngagementModelFieldRefInput<$PrismaModel>
    not?: NestedEnumEngagementModelFilter<$PrismaModel> | $Enums.EngagementModel
  }

  export type EnumExperienceLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceLevel | EnumExperienceLevelFieldRefInput<$PrismaModel>
    in?: $Enums.ExperienceLevel[] | ListEnumExperienceLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExperienceLevel[] | ListEnumExperienceLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumExperienceLevelFilter<$PrismaModel> | $Enums.ExperienceLevel
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumLeadPriorityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadPriority | EnumLeadPriorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.LeadPriority[] | ListEnumLeadPriorityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LeadPriority[] | ListEnumLeadPriorityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLeadPriorityNullableFilter<$PrismaModel> | $Enums.LeadPriority | null
  }

  export type EnumEngagementLeadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EngagementLeadStatus | EnumEngagementLeadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EngagementLeadStatus[] | ListEnumEngagementLeadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EngagementLeadStatus[] | ListEnumEngagementLeadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEngagementLeadStatusFilter<$PrismaModel> | $Enums.EngagementLeadStatus
  }

  export type EngagementLeadCountOrderByAggregateInput = {
    id?: SortOrder
    workEmail?: SortOrder
    accountName?: SortOrder
    smu?: SortOrder
    engagementModel?: SortOrder
    roleTitle?: SortOrder
    jobDescription?: SortOrder
    requiredSkills?: SortOrder
    experienceLevel?: SortOrder
    minYearsExperience?: SortOrder
    industryDomain?: SortOrder
    resourcesRequired?: SortOrder
    preferredStartDate?: SortOrder
    engagementDuration?: SortOrder
    workingHoursPerDay?: SortOrder
    timeZoneRequirement?: SortOrder
    remoteWorkAccepted?: SortOrder
    workLocationRestrictions?: SortOrder
    billRateCurrency?: SortOrder
    billRateAmount?: SortOrder
    priority?: SortOrder
    additionalRequirements?: SortOrder
    status?: SortOrder
    convertedEngagementId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type EngagementLeadAvgOrderByAggregateInput = {
    minYearsExperience?: SortOrder
    resourcesRequired?: SortOrder
    workingHoursPerDay?: SortOrder
  }

  export type EngagementLeadMaxOrderByAggregateInput = {
    id?: SortOrder
    workEmail?: SortOrder
    accountName?: SortOrder
    smu?: SortOrder
    engagementModel?: SortOrder
    roleTitle?: SortOrder
    jobDescription?: SortOrder
    experienceLevel?: SortOrder
    minYearsExperience?: SortOrder
    industryDomain?: SortOrder
    resourcesRequired?: SortOrder
    preferredStartDate?: SortOrder
    engagementDuration?: SortOrder
    workingHoursPerDay?: SortOrder
    timeZoneRequirement?: SortOrder
    remoteWorkAccepted?: SortOrder
    workLocationRestrictions?: SortOrder
    billRateCurrency?: SortOrder
    billRateAmount?: SortOrder
    priority?: SortOrder
    additionalRequirements?: SortOrder
    status?: SortOrder
    convertedEngagementId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type EngagementLeadMinOrderByAggregateInput = {
    id?: SortOrder
    workEmail?: SortOrder
    accountName?: SortOrder
    smu?: SortOrder
    engagementModel?: SortOrder
    roleTitle?: SortOrder
    jobDescription?: SortOrder
    experienceLevel?: SortOrder
    minYearsExperience?: SortOrder
    industryDomain?: SortOrder
    resourcesRequired?: SortOrder
    preferredStartDate?: SortOrder
    engagementDuration?: SortOrder
    workingHoursPerDay?: SortOrder
    timeZoneRequirement?: SortOrder
    remoteWorkAccepted?: SortOrder
    workLocationRestrictions?: SortOrder
    billRateCurrency?: SortOrder
    billRateAmount?: SortOrder
    priority?: SortOrder
    additionalRequirements?: SortOrder
    status?: SortOrder
    convertedEngagementId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type EngagementLeadSumOrderByAggregateInput = {
    minYearsExperience?: SortOrder
    resourcesRequired?: SortOrder
    workingHoursPerDay?: SortOrder
  }

  export type EnumEngagementModelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EngagementModel | EnumEngagementModelFieldRefInput<$PrismaModel>
    in?: $Enums.EngagementModel[] | ListEnumEngagementModelFieldRefInput<$PrismaModel>
    notIn?: $Enums.EngagementModel[] | ListEnumEngagementModelFieldRefInput<$PrismaModel>
    not?: NestedEnumEngagementModelWithAggregatesFilter<$PrismaModel> | $Enums.EngagementModel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEngagementModelFilter<$PrismaModel>
    _max?: NestedEnumEngagementModelFilter<$PrismaModel>
  }

  export type EnumExperienceLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceLevel | EnumExperienceLevelFieldRefInput<$PrismaModel>
    in?: $Enums.ExperienceLevel[] | ListEnumExperienceLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExperienceLevel[] | ListEnumExperienceLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumExperienceLevelWithAggregatesFilter<$PrismaModel> | $Enums.ExperienceLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExperienceLevelFilter<$PrismaModel>
    _max?: NestedEnumExperienceLevelFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumLeadPriorityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadPriority | EnumLeadPriorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.LeadPriority[] | ListEnumLeadPriorityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LeadPriority[] | ListEnumLeadPriorityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLeadPriorityNullableWithAggregatesFilter<$PrismaModel> | $Enums.LeadPriority | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumLeadPriorityNullableFilter<$PrismaModel>
    _max?: NestedEnumLeadPriorityNullableFilter<$PrismaModel>
  }

  export type EnumEngagementLeadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EngagementLeadStatus | EnumEngagementLeadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EngagementLeadStatus[] | ListEnumEngagementLeadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EngagementLeadStatus[] | ListEnumEngagementLeadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEngagementLeadStatusWithAggregatesFilter<$PrismaModel> | $Enums.EngagementLeadStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEngagementLeadStatusFilter<$PrismaModel>
    _max?: NestedEnumEngagementLeadStatusFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type EnumTimesheetEntryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TimesheetEntryStatus | EnumTimesheetEntryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TimesheetEntryStatus[] | ListEnumTimesheetEntryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimesheetEntryStatus[] | ListEnumTimesheetEntryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTimesheetEntryStatusFilter<$PrismaModel> | $Enums.TimesheetEntryStatus
  }

  export type EngagementTimesheetEntryEngagementAssignmentIdWorkDateCompoundUniqueInput = {
    engagementAssignmentId: string
    workDate: Date | string
  }

  export type EngagementTimesheetEntryCountOrderByAggregateInput = {
    id?: SortOrder
    engagementAssignmentId?: SortOrder
    workDate?: SortOrder
    hoursWorked?: SortOrder
    remarks?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    submittedBy?: SortOrder
    approvedAt?: SortOrder
    approvedBy?: SortOrder
    approvedByHandle?: SortOrder
    approvalComment?: SortOrder
    reopenedAt?: SortOrder
    paidPaymentReference?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type EngagementTimesheetEntryAvgOrderByAggregateInput = {
    hoursWorked?: SortOrder
  }

  export type EngagementTimesheetEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    engagementAssignmentId?: SortOrder
    workDate?: SortOrder
    hoursWorked?: SortOrder
    remarks?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    submittedBy?: SortOrder
    approvedAt?: SortOrder
    approvedBy?: SortOrder
    approvedByHandle?: SortOrder
    approvalComment?: SortOrder
    reopenedAt?: SortOrder
    paidPaymentReference?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type EngagementTimesheetEntryMinOrderByAggregateInput = {
    id?: SortOrder
    engagementAssignmentId?: SortOrder
    workDate?: SortOrder
    hoursWorked?: SortOrder
    remarks?: SortOrder
    status?: SortOrder
    submittedAt?: SortOrder
    submittedBy?: SortOrder
    approvedAt?: SortOrder
    approvedBy?: SortOrder
    approvedByHandle?: SortOrder
    approvalComment?: SortOrder
    reopenedAt?: SortOrder
    paidPaymentReference?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type EngagementTimesheetEntrySumOrderByAggregateInput = {
    hoursWorked?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type EnumTimesheetEntryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimesheetEntryStatus | EnumTimesheetEntryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TimesheetEntryStatus[] | ListEnumTimesheetEntryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimesheetEntryStatus[] | ListEnumTimesheetEntryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTimesheetEntryStatusWithAggregatesFilter<$PrismaModel> | $Enums.TimesheetEntryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTimesheetEntryStatusFilter<$PrismaModel>
    _max?: NestedEnumTimesheetEntryStatusFilter<$PrismaModel>
  }

  export type EnumTimesheetAuditActionFilter<$PrismaModel = never> = {
    equals?: $Enums.TimesheetAuditAction | EnumTimesheetAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.TimesheetAuditAction[] | ListEnumTimesheetAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimesheetAuditAction[] | ListEnumTimesheetAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumTimesheetAuditActionFilter<$PrismaModel> | $Enums.TimesheetAuditAction
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EngagementTimesheetEntryNullableScalarRelationFilter = {
    is?: EngagementTimesheetEntryWhereInput | null
    isNot?: EngagementTimesheetEntryWhereInput | null
  }

  export type EngagementNullableScalarRelationFilter = {
    is?: EngagementWhereInput | null
    isNot?: EngagementWhereInput | null
  }

  export type EngagementTimesheetAuditCountOrderByAggregateInput = {
    id?: SortOrder
    timesheetEntryId?: SortOrder
    engagementId?: SortOrder
    action?: SortOrder
    previousValues?: SortOrder
    updatedValues?: SortOrder
    actorUserId?: SortOrder
    actorHandle?: SortOrder
    actorRole?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type EngagementTimesheetAuditMaxOrderByAggregateInput = {
    id?: SortOrder
    timesheetEntryId?: SortOrder
    engagementId?: SortOrder
    action?: SortOrder
    actorUserId?: SortOrder
    actorHandle?: SortOrder
    actorRole?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type EngagementTimesheetAuditMinOrderByAggregateInput = {
    id?: SortOrder
    timesheetEntryId?: SortOrder
    engagementId?: SortOrder
    action?: SortOrder
    actorUserId?: SortOrder
    actorHandle?: SortOrder
    actorRole?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumTimesheetAuditActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimesheetAuditAction | EnumTimesheetAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.TimesheetAuditAction[] | ListEnumTimesheetAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimesheetAuditAction[] | ListEnumTimesheetAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumTimesheetAuditActionWithAggregatesFilter<$PrismaModel> | $Enums.TimesheetAuditAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTimesheetAuditActionFilter<$PrismaModel>
    _max?: NestedEnumTimesheetAuditActionFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EngagementManagerEngagementIdManagerUserIdCompoundUniqueInput = {
    engagementId: string
    managerUserId: string
  }

  export type EngagementManagerCountOrderByAggregateInput = {
    id?: SortOrder
    engagementId?: SortOrder
    managerUserId?: SortOrder
    managerHandle?: SortOrder
    managerName?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    removedAt?: SortOrder
    removedBy?: SortOrder
  }

  export type EngagementManagerMaxOrderByAggregateInput = {
    id?: SortOrder
    engagementId?: SortOrder
    managerUserId?: SortOrder
    managerHandle?: SortOrder
    managerName?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    removedAt?: SortOrder
    removedBy?: SortOrder
  }

  export type EngagementManagerMinOrderByAggregateInput = {
    id?: SortOrder
    engagementId?: SortOrder
    managerUserId?: SortOrder
    managerHandle?: SortOrder
    managerName?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    removedAt?: SortOrder
    removedBy?: SortOrder
  }

  export type EngagementCreatetimeZonesInput = {
    set: string[]
  }

  export type EngagementCreatecountriesInput = {
    set: string[]
  }

  export type EngagementCreaterequiredSkillsInput = {
    set: string[]
  }

  export type EngagementApplicationCreateNestedManyWithoutEngagementInput = {
    create?: XOR<EngagementApplicationCreateWithoutEngagementInput, EngagementApplicationUncheckedCreateWithoutEngagementInput> | EngagementApplicationCreateWithoutEngagementInput[] | EngagementApplicationUncheckedCreateWithoutEngagementInput[]
    connectOrCreate?: EngagementApplicationCreateOrConnectWithoutEngagementInput | EngagementApplicationCreateOrConnectWithoutEngagementInput[]
    createMany?: EngagementApplicationCreateManyEngagementInputEnvelope
    connect?: EngagementApplicationWhereUniqueInput | EngagementApplicationWhereUniqueInput[]
  }

  export type EngagementAssignmentCreateNestedManyWithoutEngagementInput = {
    create?: XOR<EngagementAssignmentCreateWithoutEngagementInput, EngagementAssignmentUncheckedCreateWithoutEngagementInput> | EngagementAssignmentCreateWithoutEngagementInput[] | EngagementAssignmentUncheckedCreateWithoutEngagementInput[]
    connectOrCreate?: EngagementAssignmentCreateOrConnectWithoutEngagementInput | EngagementAssignmentCreateOrConnectWithoutEngagementInput[]
    createMany?: EngagementAssignmentCreateManyEngagementInputEnvelope
    connect?: EngagementAssignmentWhereUniqueInput | EngagementAssignmentWhereUniqueInput[]
  }

  export type EngagementManagerCreateNestedManyWithoutEngagementInput = {
    create?: XOR<EngagementManagerCreateWithoutEngagementInput, EngagementManagerUncheckedCreateWithoutEngagementInput> | EngagementManagerCreateWithoutEngagementInput[] | EngagementManagerUncheckedCreateWithoutEngagementInput[]
    connectOrCreate?: EngagementManagerCreateOrConnectWithoutEngagementInput | EngagementManagerCreateOrConnectWithoutEngagementInput[]
    createMany?: EngagementManagerCreateManyEngagementInputEnvelope
    connect?: EngagementManagerWhereUniqueInput | EngagementManagerWhereUniqueInput[]
  }

  export type EngagementTimesheetAuditCreateNestedManyWithoutEngagementInput = {
    create?: XOR<EngagementTimesheetAuditCreateWithoutEngagementInput, EngagementTimesheetAuditUncheckedCreateWithoutEngagementInput> | EngagementTimesheetAuditCreateWithoutEngagementInput[] | EngagementTimesheetAuditUncheckedCreateWithoutEngagementInput[]
    connectOrCreate?: EngagementTimesheetAuditCreateOrConnectWithoutEngagementInput | EngagementTimesheetAuditCreateOrConnectWithoutEngagementInput[]
    createMany?: EngagementTimesheetAuditCreateManyEngagementInputEnvelope
    connect?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
  }

  export type EngagementApplicationUncheckedCreateNestedManyWithoutEngagementInput = {
    create?: XOR<EngagementApplicationCreateWithoutEngagementInput, EngagementApplicationUncheckedCreateWithoutEngagementInput> | EngagementApplicationCreateWithoutEngagementInput[] | EngagementApplicationUncheckedCreateWithoutEngagementInput[]
    connectOrCreate?: EngagementApplicationCreateOrConnectWithoutEngagementInput | EngagementApplicationCreateOrConnectWithoutEngagementInput[]
    createMany?: EngagementApplicationCreateManyEngagementInputEnvelope
    connect?: EngagementApplicationWhereUniqueInput | EngagementApplicationWhereUniqueInput[]
  }

  export type EngagementAssignmentUncheckedCreateNestedManyWithoutEngagementInput = {
    create?: XOR<EngagementAssignmentCreateWithoutEngagementInput, EngagementAssignmentUncheckedCreateWithoutEngagementInput> | EngagementAssignmentCreateWithoutEngagementInput[] | EngagementAssignmentUncheckedCreateWithoutEngagementInput[]
    connectOrCreate?: EngagementAssignmentCreateOrConnectWithoutEngagementInput | EngagementAssignmentCreateOrConnectWithoutEngagementInput[]
    createMany?: EngagementAssignmentCreateManyEngagementInputEnvelope
    connect?: EngagementAssignmentWhereUniqueInput | EngagementAssignmentWhereUniqueInput[]
  }

  export type EngagementManagerUncheckedCreateNestedManyWithoutEngagementInput = {
    create?: XOR<EngagementManagerCreateWithoutEngagementInput, EngagementManagerUncheckedCreateWithoutEngagementInput> | EngagementManagerCreateWithoutEngagementInput[] | EngagementManagerUncheckedCreateWithoutEngagementInput[]
    connectOrCreate?: EngagementManagerCreateOrConnectWithoutEngagementInput | EngagementManagerCreateOrConnectWithoutEngagementInput[]
    createMany?: EngagementManagerCreateManyEngagementInputEnvelope
    connect?: EngagementManagerWhereUniqueInput | EngagementManagerWhereUniqueInput[]
  }

  export type EngagementTimesheetAuditUncheckedCreateNestedManyWithoutEngagementInput = {
    create?: XOR<EngagementTimesheetAuditCreateWithoutEngagementInput, EngagementTimesheetAuditUncheckedCreateWithoutEngagementInput> | EngagementTimesheetAuditCreateWithoutEngagementInput[] | EngagementTimesheetAuditUncheckedCreateWithoutEngagementInput[]
    connectOrCreate?: EngagementTimesheetAuditCreateOrConnectWithoutEngagementInput | EngagementTimesheetAuditCreateOrConnectWithoutEngagementInput[]
    createMany?: EngagementTimesheetAuditCreateManyEngagementInputEnvelope
    connect?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EngagementUpdatetimeZonesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EngagementUpdatecountriesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EngagementUpdaterequiredSkillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumAnticipatedStartFieldUpdateOperationsInput = {
    set?: $Enums.AnticipatedStart
  }

  export type EnumEngagementStatusFieldUpdateOperationsInput = {
    set?: $Enums.EngagementStatus
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableEnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role | null
  }

  export type NullableEnumRoleLevelFieldUpdateOperationsInput = {
    set?: $Enums.RoleLevel | null
  }

  export type NullableEnumWorkloadFieldUpdateOperationsInput = {
    set?: $Enums.Workload | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EngagementApplicationUpdateManyWithoutEngagementNestedInput = {
    create?: XOR<EngagementApplicationCreateWithoutEngagementInput, EngagementApplicationUncheckedCreateWithoutEngagementInput> | EngagementApplicationCreateWithoutEngagementInput[] | EngagementApplicationUncheckedCreateWithoutEngagementInput[]
    connectOrCreate?: EngagementApplicationCreateOrConnectWithoutEngagementInput | EngagementApplicationCreateOrConnectWithoutEngagementInput[]
    upsert?: EngagementApplicationUpsertWithWhereUniqueWithoutEngagementInput | EngagementApplicationUpsertWithWhereUniqueWithoutEngagementInput[]
    createMany?: EngagementApplicationCreateManyEngagementInputEnvelope
    set?: EngagementApplicationWhereUniqueInput | EngagementApplicationWhereUniqueInput[]
    disconnect?: EngagementApplicationWhereUniqueInput | EngagementApplicationWhereUniqueInput[]
    delete?: EngagementApplicationWhereUniqueInput | EngagementApplicationWhereUniqueInput[]
    connect?: EngagementApplicationWhereUniqueInput | EngagementApplicationWhereUniqueInput[]
    update?: EngagementApplicationUpdateWithWhereUniqueWithoutEngagementInput | EngagementApplicationUpdateWithWhereUniqueWithoutEngagementInput[]
    updateMany?: EngagementApplicationUpdateManyWithWhereWithoutEngagementInput | EngagementApplicationUpdateManyWithWhereWithoutEngagementInput[]
    deleteMany?: EngagementApplicationScalarWhereInput | EngagementApplicationScalarWhereInput[]
  }

  export type EngagementAssignmentUpdateManyWithoutEngagementNestedInput = {
    create?: XOR<EngagementAssignmentCreateWithoutEngagementInput, EngagementAssignmentUncheckedCreateWithoutEngagementInput> | EngagementAssignmentCreateWithoutEngagementInput[] | EngagementAssignmentUncheckedCreateWithoutEngagementInput[]
    connectOrCreate?: EngagementAssignmentCreateOrConnectWithoutEngagementInput | EngagementAssignmentCreateOrConnectWithoutEngagementInput[]
    upsert?: EngagementAssignmentUpsertWithWhereUniqueWithoutEngagementInput | EngagementAssignmentUpsertWithWhereUniqueWithoutEngagementInput[]
    createMany?: EngagementAssignmentCreateManyEngagementInputEnvelope
    set?: EngagementAssignmentWhereUniqueInput | EngagementAssignmentWhereUniqueInput[]
    disconnect?: EngagementAssignmentWhereUniqueInput | EngagementAssignmentWhereUniqueInput[]
    delete?: EngagementAssignmentWhereUniqueInput | EngagementAssignmentWhereUniqueInput[]
    connect?: EngagementAssignmentWhereUniqueInput | EngagementAssignmentWhereUniqueInput[]
    update?: EngagementAssignmentUpdateWithWhereUniqueWithoutEngagementInput | EngagementAssignmentUpdateWithWhereUniqueWithoutEngagementInput[]
    updateMany?: EngagementAssignmentUpdateManyWithWhereWithoutEngagementInput | EngagementAssignmentUpdateManyWithWhereWithoutEngagementInput[]
    deleteMany?: EngagementAssignmentScalarWhereInput | EngagementAssignmentScalarWhereInput[]
  }

  export type EngagementManagerUpdateManyWithoutEngagementNestedInput = {
    create?: XOR<EngagementManagerCreateWithoutEngagementInput, EngagementManagerUncheckedCreateWithoutEngagementInput> | EngagementManagerCreateWithoutEngagementInput[] | EngagementManagerUncheckedCreateWithoutEngagementInput[]
    connectOrCreate?: EngagementManagerCreateOrConnectWithoutEngagementInput | EngagementManagerCreateOrConnectWithoutEngagementInput[]
    upsert?: EngagementManagerUpsertWithWhereUniqueWithoutEngagementInput | EngagementManagerUpsertWithWhereUniqueWithoutEngagementInput[]
    createMany?: EngagementManagerCreateManyEngagementInputEnvelope
    set?: EngagementManagerWhereUniqueInput | EngagementManagerWhereUniqueInput[]
    disconnect?: EngagementManagerWhereUniqueInput | EngagementManagerWhereUniqueInput[]
    delete?: EngagementManagerWhereUniqueInput | EngagementManagerWhereUniqueInput[]
    connect?: EngagementManagerWhereUniqueInput | EngagementManagerWhereUniqueInput[]
    update?: EngagementManagerUpdateWithWhereUniqueWithoutEngagementInput | EngagementManagerUpdateWithWhereUniqueWithoutEngagementInput[]
    updateMany?: EngagementManagerUpdateManyWithWhereWithoutEngagementInput | EngagementManagerUpdateManyWithWhereWithoutEngagementInput[]
    deleteMany?: EngagementManagerScalarWhereInput | EngagementManagerScalarWhereInput[]
  }

  export type EngagementTimesheetAuditUpdateManyWithoutEngagementNestedInput = {
    create?: XOR<EngagementTimesheetAuditCreateWithoutEngagementInput, EngagementTimesheetAuditUncheckedCreateWithoutEngagementInput> | EngagementTimesheetAuditCreateWithoutEngagementInput[] | EngagementTimesheetAuditUncheckedCreateWithoutEngagementInput[]
    connectOrCreate?: EngagementTimesheetAuditCreateOrConnectWithoutEngagementInput | EngagementTimesheetAuditCreateOrConnectWithoutEngagementInput[]
    upsert?: EngagementTimesheetAuditUpsertWithWhereUniqueWithoutEngagementInput | EngagementTimesheetAuditUpsertWithWhereUniqueWithoutEngagementInput[]
    createMany?: EngagementTimesheetAuditCreateManyEngagementInputEnvelope
    set?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
    disconnect?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
    delete?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
    connect?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
    update?: EngagementTimesheetAuditUpdateWithWhereUniqueWithoutEngagementInput | EngagementTimesheetAuditUpdateWithWhereUniqueWithoutEngagementInput[]
    updateMany?: EngagementTimesheetAuditUpdateManyWithWhereWithoutEngagementInput | EngagementTimesheetAuditUpdateManyWithWhereWithoutEngagementInput[]
    deleteMany?: EngagementTimesheetAuditScalarWhereInput | EngagementTimesheetAuditScalarWhereInput[]
  }

  export type EngagementApplicationUncheckedUpdateManyWithoutEngagementNestedInput = {
    create?: XOR<EngagementApplicationCreateWithoutEngagementInput, EngagementApplicationUncheckedCreateWithoutEngagementInput> | EngagementApplicationCreateWithoutEngagementInput[] | EngagementApplicationUncheckedCreateWithoutEngagementInput[]
    connectOrCreate?: EngagementApplicationCreateOrConnectWithoutEngagementInput | EngagementApplicationCreateOrConnectWithoutEngagementInput[]
    upsert?: EngagementApplicationUpsertWithWhereUniqueWithoutEngagementInput | EngagementApplicationUpsertWithWhereUniqueWithoutEngagementInput[]
    createMany?: EngagementApplicationCreateManyEngagementInputEnvelope
    set?: EngagementApplicationWhereUniqueInput | EngagementApplicationWhereUniqueInput[]
    disconnect?: EngagementApplicationWhereUniqueInput | EngagementApplicationWhereUniqueInput[]
    delete?: EngagementApplicationWhereUniqueInput | EngagementApplicationWhereUniqueInput[]
    connect?: EngagementApplicationWhereUniqueInput | EngagementApplicationWhereUniqueInput[]
    update?: EngagementApplicationUpdateWithWhereUniqueWithoutEngagementInput | EngagementApplicationUpdateWithWhereUniqueWithoutEngagementInput[]
    updateMany?: EngagementApplicationUpdateManyWithWhereWithoutEngagementInput | EngagementApplicationUpdateManyWithWhereWithoutEngagementInput[]
    deleteMany?: EngagementApplicationScalarWhereInput | EngagementApplicationScalarWhereInput[]
  }

  export type EngagementAssignmentUncheckedUpdateManyWithoutEngagementNestedInput = {
    create?: XOR<EngagementAssignmentCreateWithoutEngagementInput, EngagementAssignmentUncheckedCreateWithoutEngagementInput> | EngagementAssignmentCreateWithoutEngagementInput[] | EngagementAssignmentUncheckedCreateWithoutEngagementInput[]
    connectOrCreate?: EngagementAssignmentCreateOrConnectWithoutEngagementInput | EngagementAssignmentCreateOrConnectWithoutEngagementInput[]
    upsert?: EngagementAssignmentUpsertWithWhereUniqueWithoutEngagementInput | EngagementAssignmentUpsertWithWhereUniqueWithoutEngagementInput[]
    createMany?: EngagementAssignmentCreateManyEngagementInputEnvelope
    set?: EngagementAssignmentWhereUniqueInput | EngagementAssignmentWhereUniqueInput[]
    disconnect?: EngagementAssignmentWhereUniqueInput | EngagementAssignmentWhereUniqueInput[]
    delete?: EngagementAssignmentWhereUniqueInput | EngagementAssignmentWhereUniqueInput[]
    connect?: EngagementAssignmentWhereUniqueInput | EngagementAssignmentWhereUniqueInput[]
    update?: EngagementAssignmentUpdateWithWhereUniqueWithoutEngagementInput | EngagementAssignmentUpdateWithWhereUniqueWithoutEngagementInput[]
    updateMany?: EngagementAssignmentUpdateManyWithWhereWithoutEngagementInput | EngagementAssignmentUpdateManyWithWhereWithoutEngagementInput[]
    deleteMany?: EngagementAssignmentScalarWhereInput | EngagementAssignmentScalarWhereInput[]
  }

  export type EngagementManagerUncheckedUpdateManyWithoutEngagementNestedInput = {
    create?: XOR<EngagementManagerCreateWithoutEngagementInput, EngagementManagerUncheckedCreateWithoutEngagementInput> | EngagementManagerCreateWithoutEngagementInput[] | EngagementManagerUncheckedCreateWithoutEngagementInput[]
    connectOrCreate?: EngagementManagerCreateOrConnectWithoutEngagementInput | EngagementManagerCreateOrConnectWithoutEngagementInput[]
    upsert?: EngagementManagerUpsertWithWhereUniqueWithoutEngagementInput | EngagementManagerUpsertWithWhereUniqueWithoutEngagementInput[]
    createMany?: EngagementManagerCreateManyEngagementInputEnvelope
    set?: EngagementManagerWhereUniqueInput | EngagementManagerWhereUniqueInput[]
    disconnect?: EngagementManagerWhereUniqueInput | EngagementManagerWhereUniqueInput[]
    delete?: EngagementManagerWhereUniqueInput | EngagementManagerWhereUniqueInput[]
    connect?: EngagementManagerWhereUniqueInput | EngagementManagerWhereUniqueInput[]
    update?: EngagementManagerUpdateWithWhereUniqueWithoutEngagementInput | EngagementManagerUpdateWithWhereUniqueWithoutEngagementInput[]
    updateMany?: EngagementManagerUpdateManyWithWhereWithoutEngagementInput | EngagementManagerUpdateManyWithWhereWithoutEngagementInput[]
    deleteMany?: EngagementManagerScalarWhereInput | EngagementManagerScalarWhereInput[]
  }

  export type EngagementTimesheetAuditUncheckedUpdateManyWithoutEngagementNestedInput = {
    create?: XOR<EngagementTimesheetAuditCreateWithoutEngagementInput, EngagementTimesheetAuditUncheckedCreateWithoutEngagementInput> | EngagementTimesheetAuditCreateWithoutEngagementInput[] | EngagementTimesheetAuditUncheckedCreateWithoutEngagementInput[]
    connectOrCreate?: EngagementTimesheetAuditCreateOrConnectWithoutEngagementInput | EngagementTimesheetAuditCreateOrConnectWithoutEngagementInput[]
    upsert?: EngagementTimesheetAuditUpsertWithWhereUniqueWithoutEngagementInput | EngagementTimesheetAuditUpsertWithWhereUniqueWithoutEngagementInput[]
    createMany?: EngagementTimesheetAuditCreateManyEngagementInputEnvelope
    set?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
    disconnect?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
    delete?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
    connect?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
    update?: EngagementTimesheetAuditUpdateWithWhereUniqueWithoutEngagementInput | EngagementTimesheetAuditUpdateWithWhereUniqueWithoutEngagementInput[]
    updateMany?: EngagementTimesheetAuditUpdateManyWithWhereWithoutEngagementInput | EngagementTimesheetAuditUpdateManyWithWhereWithoutEngagementInput[]
    deleteMany?: EngagementTimesheetAuditScalarWhereInput | EngagementTimesheetAuditScalarWhereInput[]
  }

  export type EngagementApplicationCreateportfolioUrlsInput = {
    set: string[]
  }

  export type EngagementCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<EngagementCreateWithoutApplicationsInput, EngagementUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: EngagementCreateOrConnectWithoutApplicationsInput
    connect?: EngagementWhereUniqueInput
  }

  export type EngagementApplicationUpdateportfolioUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumApplicationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ApplicationStatus
  }

  export type EngagementUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<EngagementCreateWithoutApplicationsInput, EngagementUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: EngagementCreateOrConnectWithoutApplicationsInput
    upsert?: EngagementUpsertWithoutApplicationsInput
    connect?: EngagementWhereUniqueInput
    update?: XOR<XOR<EngagementUpdateToOneWithWhereWithoutApplicationsInput, EngagementUpdateWithoutApplicationsInput>, EngagementUncheckedUpdateWithoutApplicationsInput>
  }

  export type EngagementCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<EngagementCreateWithoutAssignmentsInput, EngagementUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: EngagementCreateOrConnectWithoutAssignmentsInput
    connect?: EngagementWhereUniqueInput
  }

  export type EngagementFeedbackCreateNestedManyWithoutAssignmentInput = {
    create?: XOR<EngagementFeedbackCreateWithoutAssignmentInput, EngagementFeedbackUncheckedCreateWithoutAssignmentInput> | EngagementFeedbackCreateWithoutAssignmentInput[] | EngagementFeedbackUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: EngagementFeedbackCreateOrConnectWithoutAssignmentInput | EngagementFeedbackCreateOrConnectWithoutAssignmentInput[]
    createMany?: EngagementFeedbackCreateManyAssignmentInputEnvelope
    connect?: EngagementFeedbackWhereUniqueInput | EngagementFeedbackWhereUniqueInput[]
  }

  export type MemberExperienceCreateNestedManyWithoutAssignmentInput = {
    create?: XOR<MemberExperienceCreateWithoutAssignmentInput, MemberExperienceUncheckedCreateWithoutAssignmentInput> | MemberExperienceCreateWithoutAssignmentInput[] | MemberExperienceUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: MemberExperienceCreateOrConnectWithoutAssignmentInput | MemberExperienceCreateOrConnectWithoutAssignmentInput[]
    createMany?: MemberExperienceCreateManyAssignmentInputEnvelope
    connect?: MemberExperienceWhereUniqueInput | MemberExperienceWhereUniqueInput[]
  }

  export type EngagementTimesheetEntryCreateNestedManyWithoutAssignmentInput = {
    create?: XOR<EngagementTimesheetEntryCreateWithoutAssignmentInput, EngagementTimesheetEntryUncheckedCreateWithoutAssignmentInput> | EngagementTimesheetEntryCreateWithoutAssignmentInput[] | EngagementTimesheetEntryUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: EngagementTimesheetEntryCreateOrConnectWithoutAssignmentInput | EngagementTimesheetEntryCreateOrConnectWithoutAssignmentInput[]
    createMany?: EngagementTimesheetEntryCreateManyAssignmentInputEnvelope
    connect?: EngagementTimesheetEntryWhereUniqueInput | EngagementTimesheetEntryWhereUniqueInput[]
  }

  export type EngagementFeedbackUncheckedCreateNestedManyWithoutAssignmentInput = {
    create?: XOR<EngagementFeedbackCreateWithoutAssignmentInput, EngagementFeedbackUncheckedCreateWithoutAssignmentInput> | EngagementFeedbackCreateWithoutAssignmentInput[] | EngagementFeedbackUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: EngagementFeedbackCreateOrConnectWithoutAssignmentInput | EngagementFeedbackCreateOrConnectWithoutAssignmentInput[]
    createMany?: EngagementFeedbackCreateManyAssignmentInputEnvelope
    connect?: EngagementFeedbackWhereUniqueInput | EngagementFeedbackWhereUniqueInput[]
  }

  export type MemberExperienceUncheckedCreateNestedManyWithoutAssignmentInput = {
    create?: XOR<MemberExperienceCreateWithoutAssignmentInput, MemberExperienceUncheckedCreateWithoutAssignmentInput> | MemberExperienceCreateWithoutAssignmentInput[] | MemberExperienceUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: MemberExperienceCreateOrConnectWithoutAssignmentInput | MemberExperienceCreateOrConnectWithoutAssignmentInput[]
    createMany?: MemberExperienceCreateManyAssignmentInputEnvelope
    connect?: MemberExperienceWhereUniqueInput | MemberExperienceWhereUniqueInput[]
  }

  export type EngagementTimesheetEntryUncheckedCreateNestedManyWithoutAssignmentInput = {
    create?: XOR<EngagementTimesheetEntryCreateWithoutAssignmentInput, EngagementTimesheetEntryUncheckedCreateWithoutAssignmentInput> | EngagementTimesheetEntryCreateWithoutAssignmentInput[] | EngagementTimesheetEntryUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: EngagementTimesheetEntryCreateOrConnectWithoutAssignmentInput | EngagementTimesheetEntryCreateOrConnectWithoutAssignmentInput[]
    createMany?: EngagementTimesheetEntryCreateManyAssignmentInputEnvelope
    connect?: EngagementTimesheetEntryWhereUniqueInput | EngagementTimesheetEntryWhereUniqueInput[]
  }

  export type EnumAssignmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AssignmentStatus
  }

  export type EnumPaymentCycleFieldUpdateOperationsInput = {
    set?: $Enums.PaymentCycle
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumAssignmentSourceFieldUpdateOperationsInput = {
    set?: $Enums.AssignmentSource | null
  }

  export type EngagementUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<EngagementCreateWithoutAssignmentsInput, EngagementUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: EngagementCreateOrConnectWithoutAssignmentsInput
    upsert?: EngagementUpsertWithoutAssignmentsInput
    connect?: EngagementWhereUniqueInput
    update?: XOR<XOR<EngagementUpdateToOneWithWhereWithoutAssignmentsInput, EngagementUpdateWithoutAssignmentsInput>, EngagementUncheckedUpdateWithoutAssignmentsInput>
  }

  export type EngagementFeedbackUpdateManyWithoutAssignmentNestedInput = {
    create?: XOR<EngagementFeedbackCreateWithoutAssignmentInput, EngagementFeedbackUncheckedCreateWithoutAssignmentInput> | EngagementFeedbackCreateWithoutAssignmentInput[] | EngagementFeedbackUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: EngagementFeedbackCreateOrConnectWithoutAssignmentInput | EngagementFeedbackCreateOrConnectWithoutAssignmentInput[]
    upsert?: EngagementFeedbackUpsertWithWhereUniqueWithoutAssignmentInput | EngagementFeedbackUpsertWithWhereUniqueWithoutAssignmentInput[]
    createMany?: EngagementFeedbackCreateManyAssignmentInputEnvelope
    set?: EngagementFeedbackWhereUniqueInput | EngagementFeedbackWhereUniqueInput[]
    disconnect?: EngagementFeedbackWhereUniqueInput | EngagementFeedbackWhereUniqueInput[]
    delete?: EngagementFeedbackWhereUniqueInput | EngagementFeedbackWhereUniqueInput[]
    connect?: EngagementFeedbackWhereUniqueInput | EngagementFeedbackWhereUniqueInput[]
    update?: EngagementFeedbackUpdateWithWhereUniqueWithoutAssignmentInput | EngagementFeedbackUpdateWithWhereUniqueWithoutAssignmentInput[]
    updateMany?: EngagementFeedbackUpdateManyWithWhereWithoutAssignmentInput | EngagementFeedbackUpdateManyWithWhereWithoutAssignmentInput[]
    deleteMany?: EngagementFeedbackScalarWhereInput | EngagementFeedbackScalarWhereInput[]
  }

  export type MemberExperienceUpdateManyWithoutAssignmentNestedInput = {
    create?: XOR<MemberExperienceCreateWithoutAssignmentInput, MemberExperienceUncheckedCreateWithoutAssignmentInput> | MemberExperienceCreateWithoutAssignmentInput[] | MemberExperienceUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: MemberExperienceCreateOrConnectWithoutAssignmentInput | MemberExperienceCreateOrConnectWithoutAssignmentInput[]
    upsert?: MemberExperienceUpsertWithWhereUniqueWithoutAssignmentInput | MemberExperienceUpsertWithWhereUniqueWithoutAssignmentInput[]
    createMany?: MemberExperienceCreateManyAssignmentInputEnvelope
    set?: MemberExperienceWhereUniqueInput | MemberExperienceWhereUniqueInput[]
    disconnect?: MemberExperienceWhereUniqueInput | MemberExperienceWhereUniqueInput[]
    delete?: MemberExperienceWhereUniqueInput | MemberExperienceWhereUniqueInput[]
    connect?: MemberExperienceWhereUniqueInput | MemberExperienceWhereUniqueInput[]
    update?: MemberExperienceUpdateWithWhereUniqueWithoutAssignmentInput | MemberExperienceUpdateWithWhereUniqueWithoutAssignmentInput[]
    updateMany?: MemberExperienceUpdateManyWithWhereWithoutAssignmentInput | MemberExperienceUpdateManyWithWhereWithoutAssignmentInput[]
    deleteMany?: MemberExperienceScalarWhereInput | MemberExperienceScalarWhereInput[]
  }

  export type EngagementTimesheetEntryUpdateManyWithoutAssignmentNestedInput = {
    create?: XOR<EngagementTimesheetEntryCreateWithoutAssignmentInput, EngagementTimesheetEntryUncheckedCreateWithoutAssignmentInput> | EngagementTimesheetEntryCreateWithoutAssignmentInput[] | EngagementTimesheetEntryUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: EngagementTimesheetEntryCreateOrConnectWithoutAssignmentInput | EngagementTimesheetEntryCreateOrConnectWithoutAssignmentInput[]
    upsert?: EngagementTimesheetEntryUpsertWithWhereUniqueWithoutAssignmentInput | EngagementTimesheetEntryUpsertWithWhereUniqueWithoutAssignmentInput[]
    createMany?: EngagementTimesheetEntryCreateManyAssignmentInputEnvelope
    set?: EngagementTimesheetEntryWhereUniqueInput | EngagementTimesheetEntryWhereUniqueInput[]
    disconnect?: EngagementTimesheetEntryWhereUniqueInput | EngagementTimesheetEntryWhereUniqueInput[]
    delete?: EngagementTimesheetEntryWhereUniqueInput | EngagementTimesheetEntryWhereUniqueInput[]
    connect?: EngagementTimesheetEntryWhereUniqueInput | EngagementTimesheetEntryWhereUniqueInput[]
    update?: EngagementTimesheetEntryUpdateWithWhereUniqueWithoutAssignmentInput | EngagementTimesheetEntryUpdateWithWhereUniqueWithoutAssignmentInput[]
    updateMany?: EngagementTimesheetEntryUpdateManyWithWhereWithoutAssignmentInput | EngagementTimesheetEntryUpdateManyWithWhereWithoutAssignmentInput[]
    deleteMany?: EngagementTimesheetEntryScalarWhereInput | EngagementTimesheetEntryScalarWhereInput[]
  }

  export type EngagementFeedbackUncheckedUpdateManyWithoutAssignmentNestedInput = {
    create?: XOR<EngagementFeedbackCreateWithoutAssignmentInput, EngagementFeedbackUncheckedCreateWithoutAssignmentInput> | EngagementFeedbackCreateWithoutAssignmentInput[] | EngagementFeedbackUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: EngagementFeedbackCreateOrConnectWithoutAssignmentInput | EngagementFeedbackCreateOrConnectWithoutAssignmentInput[]
    upsert?: EngagementFeedbackUpsertWithWhereUniqueWithoutAssignmentInput | EngagementFeedbackUpsertWithWhereUniqueWithoutAssignmentInput[]
    createMany?: EngagementFeedbackCreateManyAssignmentInputEnvelope
    set?: EngagementFeedbackWhereUniqueInput | EngagementFeedbackWhereUniqueInput[]
    disconnect?: EngagementFeedbackWhereUniqueInput | EngagementFeedbackWhereUniqueInput[]
    delete?: EngagementFeedbackWhereUniqueInput | EngagementFeedbackWhereUniqueInput[]
    connect?: EngagementFeedbackWhereUniqueInput | EngagementFeedbackWhereUniqueInput[]
    update?: EngagementFeedbackUpdateWithWhereUniqueWithoutAssignmentInput | EngagementFeedbackUpdateWithWhereUniqueWithoutAssignmentInput[]
    updateMany?: EngagementFeedbackUpdateManyWithWhereWithoutAssignmentInput | EngagementFeedbackUpdateManyWithWhereWithoutAssignmentInput[]
    deleteMany?: EngagementFeedbackScalarWhereInput | EngagementFeedbackScalarWhereInput[]
  }

  export type MemberExperienceUncheckedUpdateManyWithoutAssignmentNestedInput = {
    create?: XOR<MemberExperienceCreateWithoutAssignmentInput, MemberExperienceUncheckedCreateWithoutAssignmentInput> | MemberExperienceCreateWithoutAssignmentInput[] | MemberExperienceUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: MemberExperienceCreateOrConnectWithoutAssignmentInput | MemberExperienceCreateOrConnectWithoutAssignmentInput[]
    upsert?: MemberExperienceUpsertWithWhereUniqueWithoutAssignmentInput | MemberExperienceUpsertWithWhereUniqueWithoutAssignmentInput[]
    createMany?: MemberExperienceCreateManyAssignmentInputEnvelope
    set?: MemberExperienceWhereUniqueInput | MemberExperienceWhereUniqueInput[]
    disconnect?: MemberExperienceWhereUniqueInput | MemberExperienceWhereUniqueInput[]
    delete?: MemberExperienceWhereUniqueInput | MemberExperienceWhereUniqueInput[]
    connect?: MemberExperienceWhereUniqueInput | MemberExperienceWhereUniqueInput[]
    update?: MemberExperienceUpdateWithWhereUniqueWithoutAssignmentInput | MemberExperienceUpdateWithWhereUniqueWithoutAssignmentInput[]
    updateMany?: MemberExperienceUpdateManyWithWhereWithoutAssignmentInput | MemberExperienceUpdateManyWithWhereWithoutAssignmentInput[]
    deleteMany?: MemberExperienceScalarWhereInput | MemberExperienceScalarWhereInput[]
  }

  export type EngagementTimesheetEntryUncheckedUpdateManyWithoutAssignmentNestedInput = {
    create?: XOR<EngagementTimesheetEntryCreateWithoutAssignmentInput, EngagementTimesheetEntryUncheckedCreateWithoutAssignmentInput> | EngagementTimesheetEntryCreateWithoutAssignmentInput[] | EngagementTimesheetEntryUncheckedCreateWithoutAssignmentInput[]
    connectOrCreate?: EngagementTimesheetEntryCreateOrConnectWithoutAssignmentInput | EngagementTimesheetEntryCreateOrConnectWithoutAssignmentInput[]
    upsert?: EngagementTimesheetEntryUpsertWithWhereUniqueWithoutAssignmentInput | EngagementTimesheetEntryUpsertWithWhereUniqueWithoutAssignmentInput[]
    createMany?: EngagementTimesheetEntryCreateManyAssignmentInputEnvelope
    set?: EngagementTimesheetEntryWhereUniqueInput | EngagementTimesheetEntryWhereUniqueInput[]
    disconnect?: EngagementTimesheetEntryWhereUniqueInput | EngagementTimesheetEntryWhereUniqueInput[]
    delete?: EngagementTimesheetEntryWhereUniqueInput | EngagementTimesheetEntryWhereUniqueInput[]
    connect?: EngagementTimesheetEntryWhereUniqueInput | EngagementTimesheetEntryWhereUniqueInput[]
    update?: EngagementTimesheetEntryUpdateWithWhereUniqueWithoutAssignmentInput | EngagementTimesheetEntryUpdateWithWhereUniqueWithoutAssignmentInput[]
    updateMany?: EngagementTimesheetEntryUpdateManyWithWhereWithoutAssignmentInput | EngagementTimesheetEntryUpdateManyWithWhereWithoutAssignmentInput[]
    deleteMany?: EngagementTimesheetEntryScalarWhereInput | EngagementTimesheetEntryScalarWhereInput[]
  }

  export type EngagementAssignmentCreateNestedOneWithoutFeedbackInput = {
    create?: XOR<EngagementAssignmentCreateWithoutFeedbackInput, EngagementAssignmentUncheckedCreateWithoutFeedbackInput>
    connectOrCreate?: EngagementAssignmentCreateOrConnectWithoutFeedbackInput
    connect?: EngagementAssignmentWhereUniqueInput
  }

  export type EngagementAssignmentUpdateOneRequiredWithoutFeedbackNestedInput = {
    create?: XOR<EngagementAssignmentCreateWithoutFeedbackInput, EngagementAssignmentUncheckedCreateWithoutFeedbackInput>
    connectOrCreate?: EngagementAssignmentCreateOrConnectWithoutFeedbackInput
    upsert?: EngagementAssignmentUpsertWithoutFeedbackInput
    connect?: EngagementAssignmentWhereUniqueInput
    update?: XOR<XOR<EngagementAssignmentUpdateToOneWithWhereWithoutFeedbackInput, EngagementAssignmentUpdateWithoutFeedbackInput>, EngagementAssignmentUncheckedUpdateWithoutFeedbackInput>
  }

  export type EngagementAssignmentCreateNestedOneWithoutMemberExperiencesInput = {
    create?: XOR<EngagementAssignmentCreateWithoutMemberExperiencesInput, EngagementAssignmentUncheckedCreateWithoutMemberExperiencesInput>
    connectOrCreate?: EngagementAssignmentCreateOrConnectWithoutMemberExperiencesInput
    connect?: EngagementAssignmentWhereUniqueInput
  }

  export type EngagementAssignmentUpdateOneRequiredWithoutMemberExperiencesNestedInput = {
    create?: XOR<EngagementAssignmentCreateWithoutMemberExperiencesInput, EngagementAssignmentUncheckedCreateWithoutMemberExperiencesInput>
    connectOrCreate?: EngagementAssignmentCreateOrConnectWithoutMemberExperiencesInput
    upsert?: EngagementAssignmentUpsertWithoutMemberExperiencesInput
    connect?: EngagementAssignmentWhereUniqueInput
    update?: XOR<XOR<EngagementAssignmentUpdateToOneWithWhereWithoutMemberExperiencesInput, EngagementAssignmentUpdateWithoutMemberExperiencesInput>, EngagementAssignmentUncheckedUpdateWithoutMemberExperiencesInput>
  }

  export type EngagementLeadCreaterequiredSkillsInput = {
    set: string[]
  }

  export type EnumEngagementModelFieldUpdateOperationsInput = {
    set?: $Enums.EngagementModel
  }

  export type EngagementLeadUpdaterequiredSkillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumExperienceLevelFieldUpdateOperationsInput = {
    set?: $Enums.ExperienceLevel
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumLeadPriorityFieldUpdateOperationsInput = {
    set?: $Enums.LeadPriority | null
  }

  export type EnumEngagementLeadStatusFieldUpdateOperationsInput = {
    set?: $Enums.EngagementLeadStatus
  }

  export type EngagementAssignmentCreateNestedOneWithoutTimesheetEntriesInput = {
    create?: XOR<EngagementAssignmentCreateWithoutTimesheetEntriesInput, EngagementAssignmentUncheckedCreateWithoutTimesheetEntriesInput>
    connectOrCreate?: EngagementAssignmentCreateOrConnectWithoutTimesheetEntriesInput
    connect?: EngagementAssignmentWhereUniqueInput
  }

  export type EngagementTimesheetAuditCreateNestedManyWithoutEntryInput = {
    create?: XOR<EngagementTimesheetAuditCreateWithoutEntryInput, EngagementTimesheetAuditUncheckedCreateWithoutEntryInput> | EngagementTimesheetAuditCreateWithoutEntryInput[] | EngagementTimesheetAuditUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: EngagementTimesheetAuditCreateOrConnectWithoutEntryInput | EngagementTimesheetAuditCreateOrConnectWithoutEntryInput[]
    createMany?: EngagementTimesheetAuditCreateManyEntryInputEnvelope
    connect?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
  }

  export type EngagementTimesheetAuditUncheckedCreateNestedManyWithoutEntryInput = {
    create?: XOR<EngagementTimesheetAuditCreateWithoutEntryInput, EngagementTimesheetAuditUncheckedCreateWithoutEntryInput> | EngagementTimesheetAuditCreateWithoutEntryInput[] | EngagementTimesheetAuditUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: EngagementTimesheetAuditCreateOrConnectWithoutEntryInput | EngagementTimesheetAuditCreateOrConnectWithoutEntryInput[]
    createMany?: EngagementTimesheetAuditCreateManyEntryInputEnvelope
    connect?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumTimesheetEntryStatusFieldUpdateOperationsInput = {
    set?: $Enums.TimesheetEntryStatus
  }

  export type EngagementAssignmentUpdateOneRequiredWithoutTimesheetEntriesNestedInput = {
    create?: XOR<EngagementAssignmentCreateWithoutTimesheetEntriesInput, EngagementAssignmentUncheckedCreateWithoutTimesheetEntriesInput>
    connectOrCreate?: EngagementAssignmentCreateOrConnectWithoutTimesheetEntriesInput
    upsert?: EngagementAssignmentUpsertWithoutTimesheetEntriesInput
    connect?: EngagementAssignmentWhereUniqueInput
    update?: XOR<XOR<EngagementAssignmentUpdateToOneWithWhereWithoutTimesheetEntriesInput, EngagementAssignmentUpdateWithoutTimesheetEntriesInput>, EngagementAssignmentUncheckedUpdateWithoutTimesheetEntriesInput>
  }

  export type EngagementTimesheetAuditUpdateManyWithoutEntryNestedInput = {
    create?: XOR<EngagementTimesheetAuditCreateWithoutEntryInput, EngagementTimesheetAuditUncheckedCreateWithoutEntryInput> | EngagementTimesheetAuditCreateWithoutEntryInput[] | EngagementTimesheetAuditUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: EngagementTimesheetAuditCreateOrConnectWithoutEntryInput | EngagementTimesheetAuditCreateOrConnectWithoutEntryInput[]
    upsert?: EngagementTimesheetAuditUpsertWithWhereUniqueWithoutEntryInput | EngagementTimesheetAuditUpsertWithWhereUniqueWithoutEntryInput[]
    createMany?: EngagementTimesheetAuditCreateManyEntryInputEnvelope
    set?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
    disconnect?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
    delete?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
    connect?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
    update?: EngagementTimesheetAuditUpdateWithWhereUniqueWithoutEntryInput | EngagementTimesheetAuditUpdateWithWhereUniqueWithoutEntryInput[]
    updateMany?: EngagementTimesheetAuditUpdateManyWithWhereWithoutEntryInput | EngagementTimesheetAuditUpdateManyWithWhereWithoutEntryInput[]
    deleteMany?: EngagementTimesheetAuditScalarWhereInput | EngagementTimesheetAuditScalarWhereInput[]
  }

  export type EngagementTimesheetAuditUncheckedUpdateManyWithoutEntryNestedInput = {
    create?: XOR<EngagementTimesheetAuditCreateWithoutEntryInput, EngagementTimesheetAuditUncheckedCreateWithoutEntryInput> | EngagementTimesheetAuditCreateWithoutEntryInput[] | EngagementTimesheetAuditUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: EngagementTimesheetAuditCreateOrConnectWithoutEntryInput | EngagementTimesheetAuditCreateOrConnectWithoutEntryInput[]
    upsert?: EngagementTimesheetAuditUpsertWithWhereUniqueWithoutEntryInput | EngagementTimesheetAuditUpsertWithWhereUniqueWithoutEntryInput[]
    createMany?: EngagementTimesheetAuditCreateManyEntryInputEnvelope
    set?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
    disconnect?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
    delete?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
    connect?: EngagementTimesheetAuditWhereUniqueInput | EngagementTimesheetAuditWhereUniqueInput[]
    update?: EngagementTimesheetAuditUpdateWithWhereUniqueWithoutEntryInput | EngagementTimesheetAuditUpdateWithWhereUniqueWithoutEntryInput[]
    updateMany?: EngagementTimesheetAuditUpdateManyWithWhereWithoutEntryInput | EngagementTimesheetAuditUpdateManyWithWhereWithoutEntryInput[]
    deleteMany?: EngagementTimesheetAuditScalarWhereInput | EngagementTimesheetAuditScalarWhereInput[]
  }

  export type EngagementTimesheetEntryCreateNestedOneWithoutAuditRecordsInput = {
    create?: XOR<EngagementTimesheetEntryCreateWithoutAuditRecordsInput, EngagementTimesheetEntryUncheckedCreateWithoutAuditRecordsInput>
    connectOrCreate?: EngagementTimesheetEntryCreateOrConnectWithoutAuditRecordsInput
    connect?: EngagementTimesheetEntryWhereUniqueInput
  }

  export type EngagementCreateNestedOneWithoutTimesheetAuditInput = {
    create?: XOR<EngagementCreateWithoutTimesheetAuditInput, EngagementUncheckedCreateWithoutTimesheetAuditInput>
    connectOrCreate?: EngagementCreateOrConnectWithoutTimesheetAuditInput
    connect?: EngagementWhereUniqueInput
  }

  export type EnumTimesheetAuditActionFieldUpdateOperationsInput = {
    set?: $Enums.TimesheetAuditAction
  }

  export type EngagementTimesheetEntryUpdateOneWithoutAuditRecordsNestedInput = {
    create?: XOR<EngagementTimesheetEntryCreateWithoutAuditRecordsInput, EngagementTimesheetEntryUncheckedCreateWithoutAuditRecordsInput>
    connectOrCreate?: EngagementTimesheetEntryCreateOrConnectWithoutAuditRecordsInput
    upsert?: EngagementTimesheetEntryUpsertWithoutAuditRecordsInput
    disconnect?: EngagementTimesheetEntryWhereInput | boolean
    delete?: EngagementTimesheetEntryWhereInput | boolean
    connect?: EngagementTimesheetEntryWhereUniqueInput
    update?: XOR<XOR<EngagementTimesheetEntryUpdateToOneWithWhereWithoutAuditRecordsInput, EngagementTimesheetEntryUpdateWithoutAuditRecordsInput>, EngagementTimesheetEntryUncheckedUpdateWithoutAuditRecordsInput>
  }

  export type EngagementUpdateOneWithoutTimesheetAuditNestedInput = {
    create?: XOR<EngagementCreateWithoutTimesheetAuditInput, EngagementUncheckedCreateWithoutTimesheetAuditInput>
    connectOrCreate?: EngagementCreateOrConnectWithoutTimesheetAuditInput
    upsert?: EngagementUpsertWithoutTimesheetAuditInput
    disconnect?: EngagementWhereInput | boolean
    delete?: EngagementWhereInput | boolean
    connect?: EngagementWhereUniqueInput
    update?: XOR<XOR<EngagementUpdateToOneWithWhereWithoutTimesheetAuditInput, EngagementUpdateWithoutTimesheetAuditInput>, EngagementUncheckedUpdateWithoutTimesheetAuditInput>
  }

  export type EngagementCreateNestedOneWithoutManagersInput = {
    create?: XOR<EngagementCreateWithoutManagersInput, EngagementUncheckedCreateWithoutManagersInput>
    connectOrCreate?: EngagementCreateOrConnectWithoutManagersInput
    connect?: EngagementWhereUniqueInput
  }

  export type EngagementUpdateOneRequiredWithoutManagersNestedInput = {
    create?: XOR<EngagementCreateWithoutManagersInput, EngagementUncheckedCreateWithoutManagersInput>
    connectOrCreate?: EngagementCreateOrConnectWithoutManagersInput
    upsert?: EngagementUpsertWithoutManagersInput
    connect?: EngagementWhereUniqueInput
    update?: XOR<XOR<EngagementUpdateToOneWithWhereWithoutManagersInput, EngagementUpdateWithoutManagersInput>, EngagementUncheckedUpdateWithoutManagersInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAnticipatedStartFilter<$PrismaModel = never> = {
    equals?: $Enums.AnticipatedStart | EnumAnticipatedStartFieldRefInput<$PrismaModel>
    in?: $Enums.AnticipatedStart[] | ListEnumAnticipatedStartFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnticipatedStart[] | ListEnumAnticipatedStartFieldRefInput<$PrismaModel>
    not?: NestedEnumAnticipatedStartFilter<$PrismaModel> | $Enums.AnticipatedStart
  }

  export type NestedEnumEngagementStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EngagementStatus | EnumEngagementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EngagementStatus[] | ListEnumEngagementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EngagementStatus[] | ListEnumEngagementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEngagementStatusFilter<$PrismaModel> | $Enums.EngagementStatus
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRoleNullableFilter<$PrismaModel> | $Enums.Role | null
  }

  export type NestedEnumRoleLevelNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleLevel | EnumRoleLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.RoleLevel[] | ListEnumRoleLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RoleLevel[] | ListEnumRoleLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRoleLevelNullableFilter<$PrismaModel> | $Enums.RoleLevel | null
  }

  export type NestedEnumWorkloadNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Workload | EnumWorkloadFieldRefInput<$PrismaModel> | null
    in?: $Enums.Workload[] | ListEnumWorkloadFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Workload[] | ListEnumWorkloadFieldRefInput<$PrismaModel> | null
    not?: NestedEnumWorkloadNullableFilter<$PrismaModel> | $Enums.Workload | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAnticipatedStartWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AnticipatedStart | EnumAnticipatedStartFieldRefInput<$PrismaModel>
    in?: $Enums.AnticipatedStart[] | ListEnumAnticipatedStartFieldRefInput<$PrismaModel>
    notIn?: $Enums.AnticipatedStart[] | ListEnumAnticipatedStartFieldRefInput<$PrismaModel>
    not?: NestedEnumAnticipatedStartWithAggregatesFilter<$PrismaModel> | $Enums.AnticipatedStart
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAnticipatedStartFilter<$PrismaModel>
    _max?: NestedEnumAnticipatedStartFilter<$PrismaModel>
  }

  export type NestedEnumEngagementStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EngagementStatus | EnumEngagementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EngagementStatus[] | ListEnumEngagementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EngagementStatus[] | ListEnumEngagementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEngagementStatusWithAggregatesFilter<$PrismaModel> | $Enums.EngagementStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEngagementStatusFilter<$PrismaModel>
    _max?: NestedEnumEngagementStatusFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.Role | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRoleNullableFilter<$PrismaModel>
    _max?: NestedEnumRoleNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RoleLevel | EnumRoleLevelFieldRefInput<$PrismaModel> | null
    in?: $Enums.RoleLevel[] | ListEnumRoleLevelFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.RoleLevel[] | ListEnumRoleLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumRoleLevelNullableWithAggregatesFilter<$PrismaModel> | $Enums.RoleLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRoleLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumRoleLevelNullableFilter<$PrismaModel>
  }

  export type NestedEnumWorkloadNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Workload | EnumWorkloadFieldRefInput<$PrismaModel> | null
    in?: $Enums.Workload[] | ListEnumWorkloadFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Workload[] | ListEnumWorkloadFieldRefInput<$PrismaModel> | null
    not?: NestedEnumWorkloadNullableWithAggregatesFilter<$PrismaModel> | $Enums.Workload | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumWorkloadNullableFilter<$PrismaModel>
    _max?: NestedEnumWorkloadNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus
  }

  export type NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>
  }

  export type NestedEnumAssignmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentStatus | EnumAssignmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAssignmentStatusFilter<$PrismaModel> | $Enums.AssignmentStatus
  }

  export type NestedEnumPaymentCycleFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentCycle | EnumPaymentCycleFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentCycle[] | ListEnumPaymentCycleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentCycle[] | ListEnumPaymentCycleFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentCycleFilter<$PrismaModel> | $Enums.PaymentCycle
  }

  export type NestedEnumAssignmentSourceNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentSource | EnumAssignmentSourceFieldRefInput<$PrismaModel> | null
    in?: $Enums.AssignmentSource[] | ListEnumAssignmentSourceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AssignmentSource[] | ListEnumAssignmentSourceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAssignmentSourceNullableFilter<$PrismaModel> | $Enums.AssignmentSource | null
  }

  export type NestedEnumAssignmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentStatus | EnumAssignmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AssignmentStatus[] | ListEnumAssignmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAssignmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AssignmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAssignmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAssignmentStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentCycleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentCycle | EnumPaymentCycleFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentCycle[] | ListEnumPaymentCycleFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentCycle[] | ListEnumPaymentCycleFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentCycleWithAggregatesFilter<$PrismaModel> | $Enums.PaymentCycle
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentCycleFilter<$PrismaModel>
    _max?: NestedEnumPaymentCycleFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumAssignmentSourceNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssignmentSource | EnumAssignmentSourceFieldRefInput<$PrismaModel> | null
    in?: $Enums.AssignmentSource[] | ListEnumAssignmentSourceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AssignmentSource[] | ListEnumAssignmentSourceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAssignmentSourceNullableWithAggregatesFilter<$PrismaModel> | $Enums.AssignmentSource | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAssignmentSourceNullableFilter<$PrismaModel>
    _max?: NestedEnumAssignmentSourceNullableFilter<$PrismaModel>
  }

  export type NestedEnumEngagementModelFilter<$PrismaModel = never> = {
    equals?: $Enums.EngagementModel | EnumEngagementModelFieldRefInput<$PrismaModel>
    in?: $Enums.EngagementModel[] | ListEnumEngagementModelFieldRefInput<$PrismaModel>
    notIn?: $Enums.EngagementModel[] | ListEnumEngagementModelFieldRefInput<$PrismaModel>
    not?: NestedEnumEngagementModelFilter<$PrismaModel> | $Enums.EngagementModel
  }

  export type NestedEnumExperienceLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceLevel | EnumExperienceLevelFieldRefInput<$PrismaModel>
    in?: $Enums.ExperienceLevel[] | ListEnumExperienceLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExperienceLevel[] | ListEnumExperienceLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumExperienceLevelFilter<$PrismaModel> | $Enums.ExperienceLevel
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumLeadPriorityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadPriority | EnumLeadPriorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.LeadPriority[] | ListEnumLeadPriorityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LeadPriority[] | ListEnumLeadPriorityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLeadPriorityNullableFilter<$PrismaModel> | $Enums.LeadPriority | null
  }

  export type NestedEnumEngagementLeadStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.EngagementLeadStatus | EnumEngagementLeadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EngagementLeadStatus[] | ListEnumEngagementLeadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EngagementLeadStatus[] | ListEnumEngagementLeadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEngagementLeadStatusFilter<$PrismaModel> | $Enums.EngagementLeadStatus
  }

  export type NestedEnumEngagementModelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EngagementModel | EnumEngagementModelFieldRefInput<$PrismaModel>
    in?: $Enums.EngagementModel[] | ListEnumEngagementModelFieldRefInput<$PrismaModel>
    notIn?: $Enums.EngagementModel[] | ListEnumEngagementModelFieldRefInput<$PrismaModel>
    not?: NestedEnumEngagementModelWithAggregatesFilter<$PrismaModel> | $Enums.EngagementModel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEngagementModelFilter<$PrismaModel>
    _max?: NestedEnumEngagementModelFilter<$PrismaModel>
  }

  export type NestedEnumExperienceLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExperienceLevel | EnumExperienceLevelFieldRefInput<$PrismaModel>
    in?: $Enums.ExperienceLevel[] | ListEnumExperienceLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExperienceLevel[] | ListEnumExperienceLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumExperienceLevelWithAggregatesFilter<$PrismaModel> | $Enums.ExperienceLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExperienceLevelFilter<$PrismaModel>
    _max?: NestedEnumExperienceLevelFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumLeadPriorityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.LeadPriority | EnumLeadPriorityFieldRefInput<$PrismaModel> | null
    in?: $Enums.LeadPriority[] | ListEnumLeadPriorityFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.LeadPriority[] | ListEnumLeadPriorityFieldRefInput<$PrismaModel> | null
    not?: NestedEnumLeadPriorityNullableWithAggregatesFilter<$PrismaModel> | $Enums.LeadPriority | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumLeadPriorityNullableFilter<$PrismaModel>
    _max?: NestedEnumLeadPriorityNullableFilter<$PrismaModel>
  }

  export type NestedEnumEngagementLeadStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EngagementLeadStatus | EnumEngagementLeadStatusFieldRefInput<$PrismaModel>
    in?: $Enums.EngagementLeadStatus[] | ListEnumEngagementLeadStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.EngagementLeadStatus[] | ListEnumEngagementLeadStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumEngagementLeadStatusWithAggregatesFilter<$PrismaModel> | $Enums.EngagementLeadStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEngagementLeadStatusFilter<$PrismaModel>
    _max?: NestedEnumEngagementLeadStatusFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedEnumTimesheetEntryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TimesheetEntryStatus | EnumTimesheetEntryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TimesheetEntryStatus[] | ListEnumTimesheetEntryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimesheetEntryStatus[] | ListEnumTimesheetEntryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTimesheetEntryStatusFilter<$PrismaModel> | $Enums.TimesheetEntryStatus
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumTimesheetEntryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimesheetEntryStatus | EnumTimesheetEntryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TimesheetEntryStatus[] | ListEnumTimesheetEntryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimesheetEntryStatus[] | ListEnumTimesheetEntryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTimesheetEntryStatusWithAggregatesFilter<$PrismaModel> | $Enums.TimesheetEntryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTimesheetEntryStatusFilter<$PrismaModel>
    _max?: NestedEnumTimesheetEntryStatusFilter<$PrismaModel>
  }

  export type NestedEnumTimesheetAuditActionFilter<$PrismaModel = never> = {
    equals?: $Enums.TimesheetAuditAction | EnumTimesheetAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.TimesheetAuditAction[] | ListEnumTimesheetAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimesheetAuditAction[] | ListEnumTimesheetAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumTimesheetAuditActionFilter<$PrismaModel> | $Enums.TimesheetAuditAction
  }

  export type NestedEnumTimesheetAuditActionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TimesheetAuditAction | EnumTimesheetAuditActionFieldRefInput<$PrismaModel>
    in?: $Enums.TimesheetAuditAction[] | ListEnumTimesheetAuditActionFieldRefInput<$PrismaModel>
    notIn?: $Enums.TimesheetAuditAction[] | ListEnumTimesheetAuditActionFieldRefInput<$PrismaModel>
    not?: NestedEnumTimesheetAuditActionWithAggregatesFilter<$PrismaModel> | $Enums.TimesheetAuditAction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTimesheetAuditActionFilter<$PrismaModel>
    _max?: NestedEnumTimesheetAuditActionFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EngagementApplicationCreateWithoutEngagementInput = {
    id?: string
    userId: string
    handle?: string | null
    email: string
    name: string
    address?: string | null
    mobileNumber?: string | null
    coverLetter?: string | null
    resumeUrl?: string | null
    cvFileUrl?: string | null
    portfolioUrls?: EngagementApplicationCreateportfolioUrlsInput | string[]
    yearsOfExperience?: number | null
    availability?: string | null
    expectedPayRate?: string | null
    referralSource?: string | null
    status?: $Enums.ApplicationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type EngagementApplicationUncheckedCreateWithoutEngagementInput = {
    id?: string
    userId: string
    handle?: string | null
    email: string
    name: string
    address?: string | null
    mobileNumber?: string | null
    coverLetter?: string | null
    resumeUrl?: string | null
    cvFileUrl?: string | null
    portfolioUrls?: EngagementApplicationCreateportfolioUrlsInput | string[]
    yearsOfExperience?: number | null
    availability?: string | null
    expectedPayRate?: string | null
    referralSource?: string | null
    status?: $Enums.ApplicationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type EngagementApplicationCreateOrConnectWithoutEngagementInput = {
    where: EngagementApplicationWhereUniqueInput
    create: XOR<EngagementApplicationCreateWithoutEngagementInput, EngagementApplicationUncheckedCreateWithoutEngagementInput>
  }

  export type EngagementApplicationCreateManyEngagementInputEnvelope = {
    data: EngagementApplicationCreateManyEngagementInput | EngagementApplicationCreateManyEngagementInput[]
    skipDuplicates?: boolean
  }

  export type EngagementAssignmentCreateWithoutEngagementInput = {
    id?: string
    memberId: string
    memberHandle: string
    status?: $Enums.AssignmentStatus
    acceptedAt?: Date | string | null
    agreementRate?: string | null
    ratePerHour?: string | null
    paymentCycle?: $Enums.PaymentCycle
    standardHoursPerDay?: number | null
    totalHours?: number | null
    standardHoursPerWeek?: number | null
    durationMonths?: number | null
    otherRemarks?: string | null
    terminationReason?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    wiproIdEndDate?: Date | string | null
    candidateWiproId?: string | null
    source?: $Enums.AssignmentSource | null
    createdAt?: Date | string
    updatedAt?: Date | string
    feedback?: EngagementFeedbackCreateNestedManyWithoutAssignmentInput
    memberExperiences?: MemberExperienceCreateNestedManyWithoutAssignmentInput
    timesheetEntries?: EngagementTimesheetEntryCreateNestedManyWithoutAssignmentInput
  }

  export type EngagementAssignmentUncheckedCreateWithoutEngagementInput = {
    id?: string
    memberId: string
    memberHandle: string
    status?: $Enums.AssignmentStatus
    acceptedAt?: Date | string | null
    agreementRate?: string | null
    ratePerHour?: string | null
    paymentCycle?: $Enums.PaymentCycle
    standardHoursPerDay?: number | null
    totalHours?: number | null
    standardHoursPerWeek?: number | null
    durationMonths?: number | null
    otherRemarks?: string | null
    terminationReason?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    wiproIdEndDate?: Date | string | null
    candidateWiproId?: string | null
    source?: $Enums.AssignmentSource | null
    createdAt?: Date | string
    updatedAt?: Date | string
    feedback?: EngagementFeedbackUncheckedCreateNestedManyWithoutAssignmentInput
    memberExperiences?: MemberExperienceUncheckedCreateNestedManyWithoutAssignmentInput
    timesheetEntries?: EngagementTimesheetEntryUncheckedCreateNestedManyWithoutAssignmentInput
  }

  export type EngagementAssignmentCreateOrConnectWithoutEngagementInput = {
    where: EngagementAssignmentWhereUniqueInput
    create: XOR<EngagementAssignmentCreateWithoutEngagementInput, EngagementAssignmentUncheckedCreateWithoutEngagementInput>
  }

  export type EngagementAssignmentCreateManyEngagementInputEnvelope = {
    data: EngagementAssignmentCreateManyEngagementInput | EngagementAssignmentCreateManyEngagementInput[]
    skipDuplicates?: boolean
  }

  export type EngagementManagerCreateWithoutEngagementInput = {
    id?: string
    managerUserId: string
    managerHandle: string
    managerName?: string | null
    createdAt?: Date | string
    createdBy: string
    removedAt?: Date | string | null
    removedBy?: string | null
  }

  export type EngagementManagerUncheckedCreateWithoutEngagementInput = {
    id?: string
    managerUserId: string
    managerHandle: string
    managerName?: string | null
    createdAt?: Date | string
    createdBy: string
    removedAt?: Date | string | null
    removedBy?: string | null
  }

  export type EngagementManagerCreateOrConnectWithoutEngagementInput = {
    where: EngagementManagerWhereUniqueInput
    create: XOR<EngagementManagerCreateWithoutEngagementInput, EngagementManagerUncheckedCreateWithoutEngagementInput>
  }

  export type EngagementManagerCreateManyEngagementInputEnvelope = {
    data: EngagementManagerCreateManyEngagementInput | EngagementManagerCreateManyEngagementInput[]
    skipDuplicates?: boolean
  }

  export type EngagementTimesheetAuditCreateWithoutEngagementInput = {
    id?: string
    action: $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId: string
    actorHandle?: string | null
    actorRole: string
    comment?: string | null
    createdAt?: Date | string
    entry?: EngagementTimesheetEntryCreateNestedOneWithoutAuditRecordsInput
  }

  export type EngagementTimesheetAuditUncheckedCreateWithoutEngagementInput = {
    id?: string
    timesheetEntryId?: string | null
    action: $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId: string
    actorHandle?: string | null
    actorRole: string
    comment?: string | null
    createdAt?: Date | string
  }

  export type EngagementTimesheetAuditCreateOrConnectWithoutEngagementInput = {
    where: EngagementTimesheetAuditWhereUniqueInput
    create: XOR<EngagementTimesheetAuditCreateWithoutEngagementInput, EngagementTimesheetAuditUncheckedCreateWithoutEngagementInput>
  }

  export type EngagementTimesheetAuditCreateManyEngagementInputEnvelope = {
    data: EngagementTimesheetAuditCreateManyEngagementInput | EngagementTimesheetAuditCreateManyEngagementInput[]
    skipDuplicates?: boolean
  }

  export type EngagementApplicationUpsertWithWhereUniqueWithoutEngagementInput = {
    where: EngagementApplicationWhereUniqueInput
    update: XOR<EngagementApplicationUpdateWithoutEngagementInput, EngagementApplicationUncheckedUpdateWithoutEngagementInput>
    create: XOR<EngagementApplicationCreateWithoutEngagementInput, EngagementApplicationUncheckedCreateWithoutEngagementInput>
  }

  export type EngagementApplicationUpdateWithWhereUniqueWithoutEngagementInput = {
    where: EngagementApplicationWhereUniqueInput
    data: XOR<EngagementApplicationUpdateWithoutEngagementInput, EngagementApplicationUncheckedUpdateWithoutEngagementInput>
  }

  export type EngagementApplicationUpdateManyWithWhereWithoutEngagementInput = {
    where: EngagementApplicationScalarWhereInput
    data: XOR<EngagementApplicationUpdateManyMutationInput, EngagementApplicationUncheckedUpdateManyWithoutEngagementInput>
  }

  export type EngagementApplicationScalarWhereInput = {
    AND?: EngagementApplicationScalarWhereInput | EngagementApplicationScalarWhereInput[]
    OR?: EngagementApplicationScalarWhereInput[]
    NOT?: EngagementApplicationScalarWhereInput | EngagementApplicationScalarWhereInput[]
    id?: StringFilter<"EngagementApplication"> | string
    engagementId?: StringFilter<"EngagementApplication"> | string
    userId?: StringFilter<"EngagementApplication"> | string
    handle?: StringNullableFilter<"EngagementApplication"> | string | null
    email?: StringFilter<"EngagementApplication"> | string
    name?: StringFilter<"EngagementApplication"> | string
    address?: StringNullableFilter<"EngagementApplication"> | string | null
    mobileNumber?: StringNullableFilter<"EngagementApplication"> | string | null
    coverLetter?: StringNullableFilter<"EngagementApplication"> | string | null
    resumeUrl?: StringNullableFilter<"EngagementApplication"> | string | null
    cvFileUrl?: StringNullableFilter<"EngagementApplication"> | string | null
    portfolioUrls?: StringNullableListFilter<"EngagementApplication">
    yearsOfExperience?: IntNullableFilter<"EngagementApplication"> | number | null
    availability?: StringNullableFilter<"EngagementApplication"> | string | null
    expectedPayRate?: StringNullableFilter<"EngagementApplication"> | string | null
    referralSource?: StringNullableFilter<"EngagementApplication"> | string | null
    status?: EnumApplicationStatusFilter<"EngagementApplication"> | $Enums.ApplicationStatus
    createdAt?: DateTimeFilter<"EngagementApplication"> | Date | string
    updatedAt?: DateTimeFilter<"EngagementApplication"> | Date | string
    updatedBy?: StringNullableFilter<"EngagementApplication"> | string | null
  }

  export type EngagementAssignmentUpsertWithWhereUniqueWithoutEngagementInput = {
    where: EngagementAssignmentWhereUniqueInput
    update: XOR<EngagementAssignmentUpdateWithoutEngagementInput, EngagementAssignmentUncheckedUpdateWithoutEngagementInput>
    create: XOR<EngagementAssignmentCreateWithoutEngagementInput, EngagementAssignmentUncheckedCreateWithoutEngagementInput>
  }

  export type EngagementAssignmentUpdateWithWhereUniqueWithoutEngagementInput = {
    where: EngagementAssignmentWhereUniqueInput
    data: XOR<EngagementAssignmentUpdateWithoutEngagementInput, EngagementAssignmentUncheckedUpdateWithoutEngagementInput>
  }

  export type EngagementAssignmentUpdateManyWithWhereWithoutEngagementInput = {
    where: EngagementAssignmentScalarWhereInput
    data: XOR<EngagementAssignmentUpdateManyMutationInput, EngagementAssignmentUncheckedUpdateManyWithoutEngagementInput>
  }

  export type EngagementAssignmentScalarWhereInput = {
    AND?: EngagementAssignmentScalarWhereInput | EngagementAssignmentScalarWhereInput[]
    OR?: EngagementAssignmentScalarWhereInput[]
    NOT?: EngagementAssignmentScalarWhereInput | EngagementAssignmentScalarWhereInput[]
    id?: StringFilter<"EngagementAssignment"> | string
    engagementId?: StringFilter<"EngagementAssignment"> | string
    memberId?: StringFilter<"EngagementAssignment"> | string
    memberHandle?: StringFilter<"EngagementAssignment"> | string
    status?: EnumAssignmentStatusFilter<"EngagementAssignment"> | $Enums.AssignmentStatus
    acceptedAt?: DateTimeNullableFilter<"EngagementAssignment"> | Date | string | null
    agreementRate?: StringNullableFilter<"EngagementAssignment"> | string | null
    ratePerHour?: StringNullableFilter<"EngagementAssignment"> | string | null
    paymentCycle?: EnumPaymentCycleFilter<"EngagementAssignment"> | $Enums.PaymentCycle
    standardHoursPerDay?: FloatNullableFilter<"EngagementAssignment"> | number | null
    totalHours?: FloatNullableFilter<"EngagementAssignment"> | number | null
    standardHoursPerWeek?: FloatNullableFilter<"EngagementAssignment"> | number | null
    durationMonths?: IntNullableFilter<"EngagementAssignment"> | number | null
    otherRemarks?: StringNullableFilter<"EngagementAssignment"> | string | null
    terminationReason?: StringNullableFilter<"EngagementAssignment"> | string | null
    startDate?: DateTimeNullableFilter<"EngagementAssignment"> | Date | string | null
    endDate?: DateTimeNullableFilter<"EngagementAssignment"> | Date | string | null
    wiproIdEndDate?: DateTimeNullableFilter<"EngagementAssignment"> | Date | string | null
    candidateWiproId?: StringNullableFilter<"EngagementAssignment"> | string | null
    source?: EnumAssignmentSourceNullableFilter<"EngagementAssignment"> | $Enums.AssignmentSource | null
    createdAt?: DateTimeFilter<"EngagementAssignment"> | Date | string
    updatedAt?: DateTimeFilter<"EngagementAssignment"> | Date | string
  }

  export type EngagementManagerUpsertWithWhereUniqueWithoutEngagementInput = {
    where: EngagementManagerWhereUniqueInput
    update: XOR<EngagementManagerUpdateWithoutEngagementInput, EngagementManagerUncheckedUpdateWithoutEngagementInput>
    create: XOR<EngagementManagerCreateWithoutEngagementInput, EngagementManagerUncheckedCreateWithoutEngagementInput>
  }

  export type EngagementManagerUpdateWithWhereUniqueWithoutEngagementInput = {
    where: EngagementManagerWhereUniqueInput
    data: XOR<EngagementManagerUpdateWithoutEngagementInput, EngagementManagerUncheckedUpdateWithoutEngagementInput>
  }

  export type EngagementManagerUpdateManyWithWhereWithoutEngagementInput = {
    where: EngagementManagerScalarWhereInput
    data: XOR<EngagementManagerUpdateManyMutationInput, EngagementManagerUncheckedUpdateManyWithoutEngagementInput>
  }

  export type EngagementManagerScalarWhereInput = {
    AND?: EngagementManagerScalarWhereInput | EngagementManagerScalarWhereInput[]
    OR?: EngagementManagerScalarWhereInput[]
    NOT?: EngagementManagerScalarWhereInput | EngagementManagerScalarWhereInput[]
    id?: StringFilter<"EngagementManager"> | string
    engagementId?: StringFilter<"EngagementManager"> | string
    managerUserId?: StringFilter<"EngagementManager"> | string
    managerHandle?: StringFilter<"EngagementManager"> | string
    managerName?: StringNullableFilter<"EngagementManager"> | string | null
    createdAt?: DateTimeFilter<"EngagementManager"> | Date | string
    createdBy?: StringFilter<"EngagementManager"> | string
    removedAt?: DateTimeNullableFilter<"EngagementManager"> | Date | string | null
    removedBy?: StringNullableFilter<"EngagementManager"> | string | null
  }

  export type EngagementTimesheetAuditUpsertWithWhereUniqueWithoutEngagementInput = {
    where: EngagementTimesheetAuditWhereUniqueInput
    update: XOR<EngagementTimesheetAuditUpdateWithoutEngagementInput, EngagementTimesheetAuditUncheckedUpdateWithoutEngagementInput>
    create: XOR<EngagementTimesheetAuditCreateWithoutEngagementInput, EngagementTimesheetAuditUncheckedCreateWithoutEngagementInput>
  }

  export type EngagementTimesheetAuditUpdateWithWhereUniqueWithoutEngagementInput = {
    where: EngagementTimesheetAuditWhereUniqueInput
    data: XOR<EngagementTimesheetAuditUpdateWithoutEngagementInput, EngagementTimesheetAuditUncheckedUpdateWithoutEngagementInput>
  }

  export type EngagementTimesheetAuditUpdateManyWithWhereWithoutEngagementInput = {
    where: EngagementTimesheetAuditScalarWhereInput
    data: XOR<EngagementTimesheetAuditUpdateManyMutationInput, EngagementTimesheetAuditUncheckedUpdateManyWithoutEngagementInput>
  }

  export type EngagementTimesheetAuditScalarWhereInput = {
    AND?: EngagementTimesheetAuditScalarWhereInput | EngagementTimesheetAuditScalarWhereInput[]
    OR?: EngagementTimesheetAuditScalarWhereInput[]
    NOT?: EngagementTimesheetAuditScalarWhereInput | EngagementTimesheetAuditScalarWhereInput[]
    id?: StringFilter<"EngagementTimesheetAudit"> | string
    timesheetEntryId?: StringNullableFilter<"EngagementTimesheetAudit"> | string | null
    engagementId?: StringNullableFilter<"EngagementTimesheetAudit"> | string | null
    action?: EnumTimesheetAuditActionFilter<"EngagementTimesheetAudit"> | $Enums.TimesheetAuditAction
    previousValues?: JsonNullableFilter<"EngagementTimesheetAudit">
    updatedValues?: JsonNullableFilter<"EngagementTimesheetAudit">
    actorUserId?: StringFilter<"EngagementTimesheetAudit"> | string
    actorHandle?: StringNullableFilter<"EngagementTimesheetAudit"> | string | null
    actorRole?: StringFilter<"EngagementTimesheetAudit"> | string
    comment?: StringNullableFilter<"EngagementTimesheetAudit"> | string | null
    createdAt?: DateTimeFilter<"EngagementTimesheetAudit"> | Date | string
  }

  export type EngagementCreateWithoutApplicationsInput = {
    id?: string
    projectId: string
    title: string
    description: string
    durationStartDate?: Date | string | null
    durationEndDate?: Date | string | null
    durationWeeks?: number | null
    durationMonths?: number | null
    timeZones?: EngagementCreatetimeZonesInput | string[]
    countries?: EngagementCreatecountriesInput | string[]
    requiredSkills?: EngagementCreaterequiredSkillsInput | string[]
    anticipatedStart: $Enums.AnticipatedStart
    status?: $Enums.EngagementStatus
    isPrivate?: boolean
    requiredMemberCount?: number | null
    role?: $Enums.Role | null
    roleLevel?: $Enums.RoleLevel | null
    workload?: $Enums.Workload | null
    compensationRange?: string | null
    receivedDateFromAccount?: Date | string | null
    account?: string | null
    smu?: string | null
    spoc?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    assignments?: EngagementAssignmentCreateNestedManyWithoutEngagementInput
    managers?: EngagementManagerCreateNestedManyWithoutEngagementInput
    timesheetAudit?: EngagementTimesheetAuditCreateNestedManyWithoutEngagementInput
  }

  export type EngagementUncheckedCreateWithoutApplicationsInput = {
    id?: string
    projectId: string
    title: string
    description: string
    durationStartDate?: Date | string | null
    durationEndDate?: Date | string | null
    durationWeeks?: number | null
    durationMonths?: number | null
    timeZones?: EngagementCreatetimeZonesInput | string[]
    countries?: EngagementCreatecountriesInput | string[]
    requiredSkills?: EngagementCreaterequiredSkillsInput | string[]
    anticipatedStart: $Enums.AnticipatedStart
    status?: $Enums.EngagementStatus
    isPrivate?: boolean
    requiredMemberCount?: number | null
    role?: $Enums.Role | null
    roleLevel?: $Enums.RoleLevel | null
    workload?: $Enums.Workload | null
    compensationRange?: string | null
    receivedDateFromAccount?: Date | string | null
    account?: string | null
    smu?: string | null
    spoc?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    assignments?: EngagementAssignmentUncheckedCreateNestedManyWithoutEngagementInput
    managers?: EngagementManagerUncheckedCreateNestedManyWithoutEngagementInput
    timesheetAudit?: EngagementTimesheetAuditUncheckedCreateNestedManyWithoutEngagementInput
  }

  export type EngagementCreateOrConnectWithoutApplicationsInput = {
    where: EngagementWhereUniqueInput
    create: XOR<EngagementCreateWithoutApplicationsInput, EngagementUncheckedCreateWithoutApplicationsInput>
  }

  export type EngagementUpsertWithoutApplicationsInput = {
    update: XOR<EngagementUpdateWithoutApplicationsInput, EngagementUncheckedUpdateWithoutApplicationsInput>
    create: XOR<EngagementCreateWithoutApplicationsInput, EngagementUncheckedCreateWithoutApplicationsInput>
    where?: EngagementWhereInput
  }

  export type EngagementUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: EngagementWhereInput
    data: XOR<EngagementUpdateWithoutApplicationsInput, EngagementUncheckedUpdateWithoutApplicationsInput>
  }

  export type EngagementUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    durationStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationWeeks?: NullableIntFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    timeZones?: EngagementUpdatetimeZonesInput | string[]
    countries?: EngagementUpdatecountriesInput | string[]
    requiredSkills?: EngagementUpdaterequiredSkillsInput | string[]
    anticipatedStart?: EnumAnticipatedStartFieldUpdateOperationsInput | $Enums.AnticipatedStart
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    roleLevel?: NullableEnumRoleLevelFieldUpdateOperationsInput | $Enums.RoleLevel | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    receivedDateFromAccount?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    account?: NullableStringFieldUpdateOperationsInput | string | null
    smu?: NullableStringFieldUpdateOperationsInput | string | null
    spoc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    assignments?: EngagementAssignmentUpdateManyWithoutEngagementNestedInput
    managers?: EngagementManagerUpdateManyWithoutEngagementNestedInput
    timesheetAudit?: EngagementTimesheetAuditUpdateManyWithoutEngagementNestedInput
  }

  export type EngagementUncheckedUpdateWithoutApplicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    durationStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationWeeks?: NullableIntFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    timeZones?: EngagementUpdatetimeZonesInput | string[]
    countries?: EngagementUpdatecountriesInput | string[]
    requiredSkills?: EngagementUpdaterequiredSkillsInput | string[]
    anticipatedStart?: EnumAnticipatedStartFieldUpdateOperationsInput | $Enums.AnticipatedStart
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    roleLevel?: NullableEnumRoleLevelFieldUpdateOperationsInput | $Enums.RoleLevel | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    receivedDateFromAccount?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    account?: NullableStringFieldUpdateOperationsInput | string | null
    smu?: NullableStringFieldUpdateOperationsInput | string | null
    spoc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    assignments?: EngagementAssignmentUncheckedUpdateManyWithoutEngagementNestedInput
    managers?: EngagementManagerUncheckedUpdateManyWithoutEngagementNestedInput
    timesheetAudit?: EngagementTimesheetAuditUncheckedUpdateManyWithoutEngagementNestedInput
  }

  export type EngagementCreateWithoutAssignmentsInput = {
    id?: string
    projectId: string
    title: string
    description: string
    durationStartDate?: Date | string | null
    durationEndDate?: Date | string | null
    durationWeeks?: number | null
    durationMonths?: number | null
    timeZones?: EngagementCreatetimeZonesInput | string[]
    countries?: EngagementCreatecountriesInput | string[]
    requiredSkills?: EngagementCreaterequiredSkillsInput | string[]
    anticipatedStart: $Enums.AnticipatedStart
    status?: $Enums.EngagementStatus
    isPrivate?: boolean
    requiredMemberCount?: number | null
    role?: $Enums.Role | null
    roleLevel?: $Enums.RoleLevel | null
    workload?: $Enums.Workload | null
    compensationRange?: string | null
    receivedDateFromAccount?: Date | string | null
    account?: string | null
    smu?: string | null
    spoc?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    applications?: EngagementApplicationCreateNestedManyWithoutEngagementInput
    managers?: EngagementManagerCreateNestedManyWithoutEngagementInput
    timesheetAudit?: EngagementTimesheetAuditCreateNestedManyWithoutEngagementInput
  }

  export type EngagementUncheckedCreateWithoutAssignmentsInput = {
    id?: string
    projectId: string
    title: string
    description: string
    durationStartDate?: Date | string | null
    durationEndDate?: Date | string | null
    durationWeeks?: number | null
    durationMonths?: number | null
    timeZones?: EngagementCreatetimeZonesInput | string[]
    countries?: EngagementCreatecountriesInput | string[]
    requiredSkills?: EngagementCreaterequiredSkillsInput | string[]
    anticipatedStart: $Enums.AnticipatedStart
    status?: $Enums.EngagementStatus
    isPrivate?: boolean
    requiredMemberCount?: number | null
    role?: $Enums.Role | null
    roleLevel?: $Enums.RoleLevel | null
    workload?: $Enums.Workload | null
    compensationRange?: string | null
    receivedDateFromAccount?: Date | string | null
    account?: string | null
    smu?: string | null
    spoc?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    applications?: EngagementApplicationUncheckedCreateNestedManyWithoutEngagementInput
    managers?: EngagementManagerUncheckedCreateNestedManyWithoutEngagementInput
    timesheetAudit?: EngagementTimesheetAuditUncheckedCreateNestedManyWithoutEngagementInput
  }

  export type EngagementCreateOrConnectWithoutAssignmentsInput = {
    where: EngagementWhereUniqueInput
    create: XOR<EngagementCreateWithoutAssignmentsInput, EngagementUncheckedCreateWithoutAssignmentsInput>
  }

  export type EngagementFeedbackCreateWithoutAssignmentInput = {
    id?: string
    feedbackText: string
    rating?: number | null
    givenByMemberId?: string | null
    givenByHandle?: string | null
    givenByEmail?: string | null
    secretToken?: string | null
    secretTokenExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EngagementFeedbackUncheckedCreateWithoutAssignmentInput = {
    id?: string
    feedbackText: string
    rating?: number | null
    givenByMemberId?: string | null
    givenByHandle?: string | null
    givenByEmail?: string | null
    secretToken?: string | null
    secretTokenExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EngagementFeedbackCreateOrConnectWithoutAssignmentInput = {
    where: EngagementFeedbackWhereUniqueInput
    create: XOR<EngagementFeedbackCreateWithoutAssignmentInput, EngagementFeedbackUncheckedCreateWithoutAssignmentInput>
  }

  export type EngagementFeedbackCreateManyAssignmentInputEnvelope = {
    data: EngagementFeedbackCreateManyAssignmentInput | EngagementFeedbackCreateManyAssignmentInput[]
    skipDuplicates?: boolean
  }

  export type MemberExperienceCreateWithoutAssignmentInput = {
    id?: string
    experienceText: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberExperienceUncheckedCreateWithoutAssignmentInput = {
    id?: string
    experienceText: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberExperienceCreateOrConnectWithoutAssignmentInput = {
    where: MemberExperienceWhereUniqueInput
    create: XOR<MemberExperienceCreateWithoutAssignmentInput, MemberExperienceUncheckedCreateWithoutAssignmentInput>
  }

  export type MemberExperienceCreateManyAssignmentInputEnvelope = {
    data: MemberExperienceCreateManyAssignmentInput | MemberExperienceCreateManyAssignmentInput[]
    skipDuplicates?: boolean
  }

  export type EngagementTimesheetEntryCreateWithoutAssignmentInput = {
    id?: string
    workDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    remarks?: string | null
    status?: $Enums.TimesheetEntryStatus
    submittedAt?: Date | string | null
    submittedBy?: string | null
    approvedAt?: Date | string | null
    approvedBy?: string | null
    approvedByHandle?: string | null
    approvalComment?: string | null
    reopenedAt?: Date | string | null
    paidPaymentReference?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    auditRecords?: EngagementTimesheetAuditCreateNestedManyWithoutEntryInput
  }

  export type EngagementTimesheetEntryUncheckedCreateWithoutAssignmentInput = {
    id?: string
    workDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    remarks?: string | null
    status?: $Enums.TimesheetEntryStatus
    submittedAt?: Date | string | null
    submittedBy?: string | null
    approvedAt?: Date | string | null
    approvedBy?: string | null
    approvedByHandle?: string | null
    approvalComment?: string | null
    reopenedAt?: Date | string | null
    paidPaymentReference?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    auditRecords?: EngagementTimesheetAuditUncheckedCreateNestedManyWithoutEntryInput
  }

  export type EngagementTimesheetEntryCreateOrConnectWithoutAssignmentInput = {
    where: EngagementTimesheetEntryWhereUniqueInput
    create: XOR<EngagementTimesheetEntryCreateWithoutAssignmentInput, EngagementTimesheetEntryUncheckedCreateWithoutAssignmentInput>
  }

  export type EngagementTimesheetEntryCreateManyAssignmentInputEnvelope = {
    data: EngagementTimesheetEntryCreateManyAssignmentInput | EngagementTimesheetEntryCreateManyAssignmentInput[]
    skipDuplicates?: boolean
  }

  export type EngagementUpsertWithoutAssignmentsInput = {
    update: XOR<EngagementUpdateWithoutAssignmentsInput, EngagementUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<EngagementCreateWithoutAssignmentsInput, EngagementUncheckedCreateWithoutAssignmentsInput>
    where?: EngagementWhereInput
  }

  export type EngagementUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: EngagementWhereInput
    data: XOR<EngagementUpdateWithoutAssignmentsInput, EngagementUncheckedUpdateWithoutAssignmentsInput>
  }

  export type EngagementUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    durationStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationWeeks?: NullableIntFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    timeZones?: EngagementUpdatetimeZonesInput | string[]
    countries?: EngagementUpdatecountriesInput | string[]
    requiredSkills?: EngagementUpdaterequiredSkillsInput | string[]
    anticipatedStart?: EnumAnticipatedStartFieldUpdateOperationsInput | $Enums.AnticipatedStart
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    roleLevel?: NullableEnumRoleLevelFieldUpdateOperationsInput | $Enums.RoleLevel | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    receivedDateFromAccount?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    account?: NullableStringFieldUpdateOperationsInput | string | null
    smu?: NullableStringFieldUpdateOperationsInput | string | null
    spoc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: EngagementApplicationUpdateManyWithoutEngagementNestedInput
    managers?: EngagementManagerUpdateManyWithoutEngagementNestedInput
    timesheetAudit?: EngagementTimesheetAuditUpdateManyWithoutEngagementNestedInput
  }

  export type EngagementUncheckedUpdateWithoutAssignmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    durationStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationWeeks?: NullableIntFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    timeZones?: EngagementUpdatetimeZonesInput | string[]
    countries?: EngagementUpdatecountriesInput | string[]
    requiredSkills?: EngagementUpdaterequiredSkillsInput | string[]
    anticipatedStart?: EnumAnticipatedStartFieldUpdateOperationsInput | $Enums.AnticipatedStart
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    roleLevel?: NullableEnumRoleLevelFieldUpdateOperationsInput | $Enums.RoleLevel | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    receivedDateFromAccount?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    account?: NullableStringFieldUpdateOperationsInput | string | null
    smu?: NullableStringFieldUpdateOperationsInput | string | null
    spoc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: EngagementApplicationUncheckedUpdateManyWithoutEngagementNestedInput
    managers?: EngagementManagerUncheckedUpdateManyWithoutEngagementNestedInput
    timesheetAudit?: EngagementTimesheetAuditUncheckedUpdateManyWithoutEngagementNestedInput
  }

  export type EngagementFeedbackUpsertWithWhereUniqueWithoutAssignmentInput = {
    where: EngagementFeedbackWhereUniqueInput
    update: XOR<EngagementFeedbackUpdateWithoutAssignmentInput, EngagementFeedbackUncheckedUpdateWithoutAssignmentInput>
    create: XOR<EngagementFeedbackCreateWithoutAssignmentInput, EngagementFeedbackUncheckedCreateWithoutAssignmentInput>
  }

  export type EngagementFeedbackUpdateWithWhereUniqueWithoutAssignmentInput = {
    where: EngagementFeedbackWhereUniqueInput
    data: XOR<EngagementFeedbackUpdateWithoutAssignmentInput, EngagementFeedbackUncheckedUpdateWithoutAssignmentInput>
  }

  export type EngagementFeedbackUpdateManyWithWhereWithoutAssignmentInput = {
    where: EngagementFeedbackScalarWhereInput
    data: XOR<EngagementFeedbackUpdateManyMutationInput, EngagementFeedbackUncheckedUpdateManyWithoutAssignmentInput>
  }

  export type EngagementFeedbackScalarWhereInput = {
    AND?: EngagementFeedbackScalarWhereInput | EngagementFeedbackScalarWhereInput[]
    OR?: EngagementFeedbackScalarWhereInput[]
    NOT?: EngagementFeedbackScalarWhereInput | EngagementFeedbackScalarWhereInput[]
    id?: StringFilter<"EngagementFeedback"> | string
    engagementAssignmentId?: StringFilter<"EngagementFeedback"> | string
    feedbackText?: StringFilter<"EngagementFeedback"> | string
    rating?: IntNullableFilter<"EngagementFeedback"> | number | null
    givenByMemberId?: StringNullableFilter<"EngagementFeedback"> | string | null
    givenByHandle?: StringNullableFilter<"EngagementFeedback"> | string | null
    givenByEmail?: StringNullableFilter<"EngagementFeedback"> | string | null
    secretToken?: StringNullableFilter<"EngagementFeedback"> | string | null
    secretTokenExpiresAt?: DateTimeNullableFilter<"EngagementFeedback"> | Date | string | null
    createdAt?: DateTimeFilter<"EngagementFeedback"> | Date | string
    updatedAt?: DateTimeFilter<"EngagementFeedback"> | Date | string
  }

  export type MemberExperienceUpsertWithWhereUniqueWithoutAssignmentInput = {
    where: MemberExperienceWhereUniqueInput
    update: XOR<MemberExperienceUpdateWithoutAssignmentInput, MemberExperienceUncheckedUpdateWithoutAssignmentInput>
    create: XOR<MemberExperienceCreateWithoutAssignmentInput, MemberExperienceUncheckedCreateWithoutAssignmentInput>
  }

  export type MemberExperienceUpdateWithWhereUniqueWithoutAssignmentInput = {
    where: MemberExperienceWhereUniqueInput
    data: XOR<MemberExperienceUpdateWithoutAssignmentInput, MemberExperienceUncheckedUpdateWithoutAssignmentInput>
  }

  export type MemberExperienceUpdateManyWithWhereWithoutAssignmentInput = {
    where: MemberExperienceScalarWhereInput
    data: XOR<MemberExperienceUpdateManyMutationInput, MemberExperienceUncheckedUpdateManyWithoutAssignmentInput>
  }

  export type MemberExperienceScalarWhereInput = {
    AND?: MemberExperienceScalarWhereInput | MemberExperienceScalarWhereInput[]
    OR?: MemberExperienceScalarWhereInput[]
    NOT?: MemberExperienceScalarWhereInput | MemberExperienceScalarWhereInput[]
    id?: StringFilter<"MemberExperience"> | string
    engagementAssignmentId?: StringFilter<"MemberExperience"> | string
    experienceText?: StringFilter<"MemberExperience"> | string
    createdAt?: DateTimeFilter<"MemberExperience"> | Date | string
    updatedAt?: DateTimeFilter<"MemberExperience"> | Date | string
  }

  export type EngagementTimesheetEntryUpsertWithWhereUniqueWithoutAssignmentInput = {
    where: EngagementTimesheetEntryWhereUniqueInput
    update: XOR<EngagementTimesheetEntryUpdateWithoutAssignmentInput, EngagementTimesheetEntryUncheckedUpdateWithoutAssignmentInput>
    create: XOR<EngagementTimesheetEntryCreateWithoutAssignmentInput, EngagementTimesheetEntryUncheckedCreateWithoutAssignmentInput>
  }

  export type EngagementTimesheetEntryUpdateWithWhereUniqueWithoutAssignmentInput = {
    where: EngagementTimesheetEntryWhereUniqueInput
    data: XOR<EngagementTimesheetEntryUpdateWithoutAssignmentInput, EngagementTimesheetEntryUncheckedUpdateWithoutAssignmentInput>
  }

  export type EngagementTimesheetEntryUpdateManyWithWhereWithoutAssignmentInput = {
    where: EngagementTimesheetEntryScalarWhereInput
    data: XOR<EngagementTimesheetEntryUpdateManyMutationInput, EngagementTimesheetEntryUncheckedUpdateManyWithoutAssignmentInput>
  }

  export type EngagementTimesheetEntryScalarWhereInput = {
    AND?: EngagementTimesheetEntryScalarWhereInput | EngagementTimesheetEntryScalarWhereInput[]
    OR?: EngagementTimesheetEntryScalarWhereInput[]
    NOT?: EngagementTimesheetEntryScalarWhereInput | EngagementTimesheetEntryScalarWhereInput[]
    id?: StringFilter<"EngagementTimesheetEntry"> | string
    engagementAssignmentId?: StringFilter<"EngagementTimesheetEntry"> | string
    workDate?: DateTimeFilter<"EngagementTimesheetEntry"> | Date | string
    hoursWorked?: DecimalFilter<"EngagementTimesheetEntry"> | Decimal | DecimalJsLike | number | string
    remarks?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    status?: EnumTimesheetEntryStatusFilter<"EngagementTimesheetEntry"> | $Enums.TimesheetEntryStatus
    submittedAt?: DateTimeNullableFilter<"EngagementTimesheetEntry"> | Date | string | null
    submittedBy?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    approvedAt?: DateTimeNullableFilter<"EngagementTimesheetEntry"> | Date | string | null
    approvedBy?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    approvedByHandle?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    approvalComment?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    reopenedAt?: DateTimeNullableFilter<"EngagementTimesheetEntry"> | Date | string | null
    paidPaymentReference?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
    paidAt?: DateTimeNullableFilter<"EngagementTimesheetEntry"> | Date | string | null
    createdAt?: DateTimeFilter<"EngagementTimesheetEntry"> | Date | string
    createdBy?: StringFilter<"EngagementTimesheetEntry"> | string
    updatedAt?: DateTimeFilter<"EngagementTimesheetEntry"> | Date | string
    updatedBy?: StringNullableFilter<"EngagementTimesheetEntry"> | string | null
  }

  export type EngagementAssignmentCreateWithoutFeedbackInput = {
    id?: string
    memberId: string
    memberHandle: string
    status?: $Enums.AssignmentStatus
    acceptedAt?: Date | string | null
    agreementRate?: string | null
    ratePerHour?: string | null
    paymentCycle?: $Enums.PaymentCycle
    standardHoursPerDay?: number | null
    totalHours?: number | null
    standardHoursPerWeek?: number | null
    durationMonths?: number | null
    otherRemarks?: string | null
    terminationReason?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    wiproIdEndDate?: Date | string | null
    candidateWiproId?: string | null
    source?: $Enums.AssignmentSource | null
    createdAt?: Date | string
    updatedAt?: Date | string
    engagement: EngagementCreateNestedOneWithoutAssignmentsInput
    memberExperiences?: MemberExperienceCreateNestedManyWithoutAssignmentInput
    timesheetEntries?: EngagementTimesheetEntryCreateNestedManyWithoutAssignmentInput
  }

  export type EngagementAssignmentUncheckedCreateWithoutFeedbackInput = {
    id?: string
    engagementId: string
    memberId: string
    memberHandle: string
    status?: $Enums.AssignmentStatus
    acceptedAt?: Date | string | null
    agreementRate?: string | null
    ratePerHour?: string | null
    paymentCycle?: $Enums.PaymentCycle
    standardHoursPerDay?: number | null
    totalHours?: number | null
    standardHoursPerWeek?: number | null
    durationMonths?: number | null
    otherRemarks?: string | null
    terminationReason?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    wiproIdEndDate?: Date | string | null
    candidateWiproId?: string | null
    source?: $Enums.AssignmentSource | null
    createdAt?: Date | string
    updatedAt?: Date | string
    memberExperiences?: MemberExperienceUncheckedCreateNestedManyWithoutAssignmentInput
    timesheetEntries?: EngagementTimesheetEntryUncheckedCreateNestedManyWithoutAssignmentInput
  }

  export type EngagementAssignmentCreateOrConnectWithoutFeedbackInput = {
    where: EngagementAssignmentWhereUniqueInput
    create: XOR<EngagementAssignmentCreateWithoutFeedbackInput, EngagementAssignmentUncheckedCreateWithoutFeedbackInput>
  }

  export type EngagementAssignmentUpsertWithoutFeedbackInput = {
    update: XOR<EngagementAssignmentUpdateWithoutFeedbackInput, EngagementAssignmentUncheckedUpdateWithoutFeedbackInput>
    create: XOR<EngagementAssignmentCreateWithoutFeedbackInput, EngagementAssignmentUncheckedCreateWithoutFeedbackInput>
    where?: EngagementAssignmentWhereInput
  }

  export type EngagementAssignmentUpdateToOneWithWhereWithoutFeedbackInput = {
    where?: EngagementAssignmentWhereInput
    data: XOR<EngagementAssignmentUpdateWithoutFeedbackInput, EngagementAssignmentUncheckedUpdateWithoutFeedbackInput>
  }

  export type EngagementAssignmentUpdateWithoutFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agreementRate?: NullableStringFieldUpdateOperationsInput | string | null
    ratePerHour?: NullableStringFieldUpdateOperationsInput | string | null
    paymentCycle?: EnumPaymentCycleFieldUpdateOperationsInput | $Enums.PaymentCycle
    standardHoursPerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    totalHours?: NullableFloatFieldUpdateOperationsInput | number | null
    standardHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    otherRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    terminationReason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wiproIdEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateWiproId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableEnumAssignmentSourceFieldUpdateOperationsInput | $Enums.AssignmentSource | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    engagement?: EngagementUpdateOneRequiredWithoutAssignmentsNestedInput
    memberExperiences?: MemberExperienceUpdateManyWithoutAssignmentNestedInput
    timesheetEntries?: EngagementTimesheetEntryUpdateManyWithoutAssignmentNestedInput
  }

  export type EngagementAssignmentUncheckedUpdateWithoutFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agreementRate?: NullableStringFieldUpdateOperationsInput | string | null
    ratePerHour?: NullableStringFieldUpdateOperationsInput | string | null
    paymentCycle?: EnumPaymentCycleFieldUpdateOperationsInput | $Enums.PaymentCycle
    standardHoursPerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    totalHours?: NullableFloatFieldUpdateOperationsInput | number | null
    standardHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    otherRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    terminationReason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wiproIdEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateWiproId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableEnumAssignmentSourceFieldUpdateOperationsInput | $Enums.AssignmentSource | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberExperiences?: MemberExperienceUncheckedUpdateManyWithoutAssignmentNestedInput
    timesheetEntries?: EngagementTimesheetEntryUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type EngagementAssignmentCreateWithoutMemberExperiencesInput = {
    id?: string
    memberId: string
    memberHandle: string
    status?: $Enums.AssignmentStatus
    acceptedAt?: Date | string | null
    agreementRate?: string | null
    ratePerHour?: string | null
    paymentCycle?: $Enums.PaymentCycle
    standardHoursPerDay?: number | null
    totalHours?: number | null
    standardHoursPerWeek?: number | null
    durationMonths?: number | null
    otherRemarks?: string | null
    terminationReason?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    wiproIdEndDate?: Date | string | null
    candidateWiproId?: string | null
    source?: $Enums.AssignmentSource | null
    createdAt?: Date | string
    updatedAt?: Date | string
    engagement: EngagementCreateNestedOneWithoutAssignmentsInput
    feedback?: EngagementFeedbackCreateNestedManyWithoutAssignmentInput
    timesheetEntries?: EngagementTimesheetEntryCreateNestedManyWithoutAssignmentInput
  }

  export type EngagementAssignmentUncheckedCreateWithoutMemberExperiencesInput = {
    id?: string
    engagementId: string
    memberId: string
    memberHandle: string
    status?: $Enums.AssignmentStatus
    acceptedAt?: Date | string | null
    agreementRate?: string | null
    ratePerHour?: string | null
    paymentCycle?: $Enums.PaymentCycle
    standardHoursPerDay?: number | null
    totalHours?: number | null
    standardHoursPerWeek?: number | null
    durationMonths?: number | null
    otherRemarks?: string | null
    terminationReason?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    wiproIdEndDate?: Date | string | null
    candidateWiproId?: string | null
    source?: $Enums.AssignmentSource | null
    createdAt?: Date | string
    updatedAt?: Date | string
    feedback?: EngagementFeedbackUncheckedCreateNestedManyWithoutAssignmentInput
    timesheetEntries?: EngagementTimesheetEntryUncheckedCreateNestedManyWithoutAssignmentInput
  }

  export type EngagementAssignmentCreateOrConnectWithoutMemberExperiencesInput = {
    where: EngagementAssignmentWhereUniqueInput
    create: XOR<EngagementAssignmentCreateWithoutMemberExperiencesInput, EngagementAssignmentUncheckedCreateWithoutMemberExperiencesInput>
  }

  export type EngagementAssignmentUpsertWithoutMemberExperiencesInput = {
    update: XOR<EngagementAssignmentUpdateWithoutMemberExperiencesInput, EngagementAssignmentUncheckedUpdateWithoutMemberExperiencesInput>
    create: XOR<EngagementAssignmentCreateWithoutMemberExperiencesInput, EngagementAssignmentUncheckedCreateWithoutMemberExperiencesInput>
    where?: EngagementAssignmentWhereInput
  }

  export type EngagementAssignmentUpdateToOneWithWhereWithoutMemberExperiencesInput = {
    where?: EngagementAssignmentWhereInput
    data: XOR<EngagementAssignmentUpdateWithoutMemberExperiencesInput, EngagementAssignmentUncheckedUpdateWithoutMemberExperiencesInput>
  }

  export type EngagementAssignmentUpdateWithoutMemberExperiencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agreementRate?: NullableStringFieldUpdateOperationsInput | string | null
    ratePerHour?: NullableStringFieldUpdateOperationsInput | string | null
    paymentCycle?: EnumPaymentCycleFieldUpdateOperationsInput | $Enums.PaymentCycle
    standardHoursPerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    totalHours?: NullableFloatFieldUpdateOperationsInput | number | null
    standardHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    otherRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    terminationReason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wiproIdEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateWiproId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableEnumAssignmentSourceFieldUpdateOperationsInput | $Enums.AssignmentSource | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    engagement?: EngagementUpdateOneRequiredWithoutAssignmentsNestedInput
    feedback?: EngagementFeedbackUpdateManyWithoutAssignmentNestedInput
    timesheetEntries?: EngagementTimesheetEntryUpdateManyWithoutAssignmentNestedInput
  }

  export type EngagementAssignmentUncheckedUpdateWithoutMemberExperiencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agreementRate?: NullableStringFieldUpdateOperationsInput | string | null
    ratePerHour?: NullableStringFieldUpdateOperationsInput | string | null
    paymentCycle?: EnumPaymentCycleFieldUpdateOperationsInput | $Enums.PaymentCycle
    standardHoursPerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    totalHours?: NullableFloatFieldUpdateOperationsInput | number | null
    standardHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    otherRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    terminationReason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wiproIdEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateWiproId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableEnumAssignmentSourceFieldUpdateOperationsInput | $Enums.AssignmentSource | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedback?: EngagementFeedbackUncheckedUpdateManyWithoutAssignmentNestedInput
    timesheetEntries?: EngagementTimesheetEntryUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type EngagementAssignmentCreateWithoutTimesheetEntriesInput = {
    id?: string
    memberId: string
    memberHandle: string
    status?: $Enums.AssignmentStatus
    acceptedAt?: Date | string | null
    agreementRate?: string | null
    ratePerHour?: string | null
    paymentCycle?: $Enums.PaymentCycle
    standardHoursPerDay?: number | null
    totalHours?: number | null
    standardHoursPerWeek?: number | null
    durationMonths?: number | null
    otherRemarks?: string | null
    terminationReason?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    wiproIdEndDate?: Date | string | null
    candidateWiproId?: string | null
    source?: $Enums.AssignmentSource | null
    createdAt?: Date | string
    updatedAt?: Date | string
    engagement: EngagementCreateNestedOneWithoutAssignmentsInput
    feedback?: EngagementFeedbackCreateNestedManyWithoutAssignmentInput
    memberExperiences?: MemberExperienceCreateNestedManyWithoutAssignmentInput
  }

  export type EngagementAssignmentUncheckedCreateWithoutTimesheetEntriesInput = {
    id?: string
    engagementId: string
    memberId: string
    memberHandle: string
    status?: $Enums.AssignmentStatus
    acceptedAt?: Date | string | null
    agreementRate?: string | null
    ratePerHour?: string | null
    paymentCycle?: $Enums.PaymentCycle
    standardHoursPerDay?: number | null
    totalHours?: number | null
    standardHoursPerWeek?: number | null
    durationMonths?: number | null
    otherRemarks?: string | null
    terminationReason?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    wiproIdEndDate?: Date | string | null
    candidateWiproId?: string | null
    source?: $Enums.AssignmentSource | null
    createdAt?: Date | string
    updatedAt?: Date | string
    feedback?: EngagementFeedbackUncheckedCreateNestedManyWithoutAssignmentInput
    memberExperiences?: MemberExperienceUncheckedCreateNestedManyWithoutAssignmentInput
  }

  export type EngagementAssignmentCreateOrConnectWithoutTimesheetEntriesInput = {
    where: EngagementAssignmentWhereUniqueInput
    create: XOR<EngagementAssignmentCreateWithoutTimesheetEntriesInput, EngagementAssignmentUncheckedCreateWithoutTimesheetEntriesInput>
  }

  export type EngagementTimesheetAuditCreateWithoutEntryInput = {
    id?: string
    action: $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId: string
    actorHandle?: string | null
    actorRole: string
    comment?: string | null
    createdAt?: Date | string
    engagement?: EngagementCreateNestedOneWithoutTimesheetAuditInput
  }

  export type EngagementTimesheetAuditUncheckedCreateWithoutEntryInput = {
    id?: string
    engagementId?: string | null
    action: $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId: string
    actorHandle?: string | null
    actorRole: string
    comment?: string | null
    createdAt?: Date | string
  }

  export type EngagementTimesheetAuditCreateOrConnectWithoutEntryInput = {
    where: EngagementTimesheetAuditWhereUniqueInput
    create: XOR<EngagementTimesheetAuditCreateWithoutEntryInput, EngagementTimesheetAuditUncheckedCreateWithoutEntryInput>
  }

  export type EngagementTimesheetAuditCreateManyEntryInputEnvelope = {
    data: EngagementTimesheetAuditCreateManyEntryInput | EngagementTimesheetAuditCreateManyEntryInput[]
    skipDuplicates?: boolean
  }

  export type EngagementAssignmentUpsertWithoutTimesheetEntriesInput = {
    update: XOR<EngagementAssignmentUpdateWithoutTimesheetEntriesInput, EngagementAssignmentUncheckedUpdateWithoutTimesheetEntriesInput>
    create: XOR<EngagementAssignmentCreateWithoutTimesheetEntriesInput, EngagementAssignmentUncheckedCreateWithoutTimesheetEntriesInput>
    where?: EngagementAssignmentWhereInput
  }

  export type EngagementAssignmentUpdateToOneWithWhereWithoutTimesheetEntriesInput = {
    where?: EngagementAssignmentWhereInput
    data: XOR<EngagementAssignmentUpdateWithoutTimesheetEntriesInput, EngagementAssignmentUncheckedUpdateWithoutTimesheetEntriesInput>
  }

  export type EngagementAssignmentUpdateWithoutTimesheetEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agreementRate?: NullableStringFieldUpdateOperationsInput | string | null
    ratePerHour?: NullableStringFieldUpdateOperationsInput | string | null
    paymentCycle?: EnumPaymentCycleFieldUpdateOperationsInput | $Enums.PaymentCycle
    standardHoursPerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    totalHours?: NullableFloatFieldUpdateOperationsInput | number | null
    standardHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    otherRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    terminationReason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wiproIdEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateWiproId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableEnumAssignmentSourceFieldUpdateOperationsInput | $Enums.AssignmentSource | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    engagement?: EngagementUpdateOneRequiredWithoutAssignmentsNestedInput
    feedback?: EngagementFeedbackUpdateManyWithoutAssignmentNestedInput
    memberExperiences?: MemberExperienceUpdateManyWithoutAssignmentNestedInput
  }

  export type EngagementAssignmentUncheckedUpdateWithoutTimesheetEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agreementRate?: NullableStringFieldUpdateOperationsInput | string | null
    ratePerHour?: NullableStringFieldUpdateOperationsInput | string | null
    paymentCycle?: EnumPaymentCycleFieldUpdateOperationsInput | $Enums.PaymentCycle
    standardHoursPerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    totalHours?: NullableFloatFieldUpdateOperationsInput | number | null
    standardHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    otherRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    terminationReason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wiproIdEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateWiproId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableEnumAssignmentSourceFieldUpdateOperationsInput | $Enums.AssignmentSource | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedback?: EngagementFeedbackUncheckedUpdateManyWithoutAssignmentNestedInput
    memberExperiences?: MemberExperienceUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type EngagementTimesheetAuditUpsertWithWhereUniqueWithoutEntryInput = {
    where: EngagementTimesheetAuditWhereUniqueInput
    update: XOR<EngagementTimesheetAuditUpdateWithoutEntryInput, EngagementTimesheetAuditUncheckedUpdateWithoutEntryInput>
    create: XOR<EngagementTimesheetAuditCreateWithoutEntryInput, EngagementTimesheetAuditUncheckedCreateWithoutEntryInput>
  }

  export type EngagementTimesheetAuditUpdateWithWhereUniqueWithoutEntryInput = {
    where: EngagementTimesheetAuditWhereUniqueInput
    data: XOR<EngagementTimesheetAuditUpdateWithoutEntryInput, EngagementTimesheetAuditUncheckedUpdateWithoutEntryInput>
  }

  export type EngagementTimesheetAuditUpdateManyWithWhereWithoutEntryInput = {
    where: EngagementTimesheetAuditScalarWhereInput
    data: XOR<EngagementTimesheetAuditUpdateManyMutationInput, EngagementTimesheetAuditUncheckedUpdateManyWithoutEntryInput>
  }

  export type EngagementTimesheetEntryCreateWithoutAuditRecordsInput = {
    id?: string
    workDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    remarks?: string | null
    status?: $Enums.TimesheetEntryStatus
    submittedAt?: Date | string | null
    submittedBy?: string | null
    approvedAt?: Date | string | null
    approvedBy?: string | null
    approvedByHandle?: string | null
    approvalComment?: string | null
    reopenedAt?: Date | string | null
    paidPaymentReference?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    assignment: EngagementAssignmentCreateNestedOneWithoutTimesheetEntriesInput
  }

  export type EngagementTimesheetEntryUncheckedCreateWithoutAuditRecordsInput = {
    id?: string
    engagementAssignmentId: string
    workDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    remarks?: string | null
    status?: $Enums.TimesheetEntryStatus
    submittedAt?: Date | string | null
    submittedBy?: string | null
    approvedAt?: Date | string | null
    approvedBy?: string | null
    approvedByHandle?: string | null
    approvalComment?: string | null
    reopenedAt?: Date | string | null
    paidPaymentReference?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type EngagementTimesheetEntryCreateOrConnectWithoutAuditRecordsInput = {
    where: EngagementTimesheetEntryWhereUniqueInput
    create: XOR<EngagementTimesheetEntryCreateWithoutAuditRecordsInput, EngagementTimesheetEntryUncheckedCreateWithoutAuditRecordsInput>
  }

  export type EngagementCreateWithoutTimesheetAuditInput = {
    id?: string
    projectId: string
    title: string
    description: string
    durationStartDate?: Date | string | null
    durationEndDate?: Date | string | null
    durationWeeks?: number | null
    durationMonths?: number | null
    timeZones?: EngagementCreatetimeZonesInput | string[]
    countries?: EngagementCreatecountriesInput | string[]
    requiredSkills?: EngagementCreaterequiredSkillsInput | string[]
    anticipatedStart: $Enums.AnticipatedStart
    status?: $Enums.EngagementStatus
    isPrivate?: boolean
    requiredMemberCount?: number | null
    role?: $Enums.Role | null
    roleLevel?: $Enums.RoleLevel | null
    workload?: $Enums.Workload | null
    compensationRange?: string | null
    receivedDateFromAccount?: Date | string | null
    account?: string | null
    smu?: string | null
    spoc?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    applications?: EngagementApplicationCreateNestedManyWithoutEngagementInput
    assignments?: EngagementAssignmentCreateNestedManyWithoutEngagementInput
    managers?: EngagementManagerCreateNestedManyWithoutEngagementInput
  }

  export type EngagementUncheckedCreateWithoutTimesheetAuditInput = {
    id?: string
    projectId: string
    title: string
    description: string
    durationStartDate?: Date | string | null
    durationEndDate?: Date | string | null
    durationWeeks?: number | null
    durationMonths?: number | null
    timeZones?: EngagementCreatetimeZonesInput | string[]
    countries?: EngagementCreatecountriesInput | string[]
    requiredSkills?: EngagementCreaterequiredSkillsInput | string[]
    anticipatedStart: $Enums.AnticipatedStart
    status?: $Enums.EngagementStatus
    isPrivate?: boolean
    requiredMemberCount?: number | null
    role?: $Enums.Role | null
    roleLevel?: $Enums.RoleLevel | null
    workload?: $Enums.Workload | null
    compensationRange?: string | null
    receivedDateFromAccount?: Date | string | null
    account?: string | null
    smu?: string | null
    spoc?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    applications?: EngagementApplicationUncheckedCreateNestedManyWithoutEngagementInput
    assignments?: EngagementAssignmentUncheckedCreateNestedManyWithoutEngagementInput
    managers?: EngagementManagerUncheckedCreateNestedManyWithoutEngagementInput
  }

  export type EngagementCreateOrConnectWithoutTimesheetAuditInput = {
    where: EngagementWhereUniqueInput
    create: XOR<EngagementCreateWithoutTimesheetAuditInput, EngagementUncheckedCreateWithoutTimesheetAuditInput>
  }

  export type EngagementTimesheetEntryUpsertWithoutAuditRecordsInput = {
    update: XOR<EngagementTimesheetEntryUpdateWithoutAuditRecordsInput, EngagementTimesheetEntryUncheckedUpdateWithoutAuditRecordsInput>
    create: XOR<EngagementTimesheetEntryCreateWithoutAuditRecordsInput, EngagementTimesheetEntryUncheckedCreateWithoutAuditRecordsInput>
    where?: EngagementTimesheetEntryWhereInput
  }

  export type EngagementTimesheetEntryUpdateToOneWithWhereWithoutAuditRecordsInput = {
    where?: EngagementTimesheetEntryWhereInput
    data: XOR<EngagementTimesheetEntryUpdateWithoutAuditRecordsInput, EngagementTimesheetEntryUncheckedUpdateWithoutAuditRecordsInput>
  }

  export type EngagementTimesheetEntryUpdateWithoutAuditRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    workDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTimesheetEntryStatusFieldUpdateOperationsInput | $Enums.TimesheetEntryStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedByHandle?: NullableStringFieldUpdateOperationsInput | string | null
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    reopenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    assignment?: EngagementAssignmentUpdateOneRequiredWithoutTimesheetEntriesNestedInput
  }

  export type EngagementTimesheetEntryUncheckedUpdateWithoutAuditRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementAssignmentId?: StringFieldUpdateOperationsInput | string
    workDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTimesheetEntryStatusFieldUpdateOperationsInput | $Enums.TimesheetEntryStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedByHandle?: NullableStringFieldUpdateOperationsInput | string | null
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    reopenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementUpsertWithoutTimesheetAuditInput = {
    update: XOR<EngagementUpdateWithoutTimesheetAuditInput, EngagementUncheckedUpdateWithoutTimesheetAuditInput>
    create: XOR<EngagementCreateWithoutTimesheetAuditInput, EngagementUncheckedCreateWithoutTimesheetAuditInput>
    where?: EngagementWhereInput
  }

  export type EngagementUpdateToOneWithWhereWithoutTimesheetAuditInput = {
    where?: EngagementWhereInput
    data: XOR<EngagementUpdateWithoutTimesheetAuditInput, EngagementUncheckedUpdateWithoutTimesheetAuditInput>
  }

  export type EngagementUpdateWithoutTimesheetAuditInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    durationStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationWeeks?: NullableIntFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    timeZones?: EngagementUpdatetimeZonesInput | string[]
    countries?: EngagementUpdatecountriesInput | string[]
    requiredSkills?: EngagementUpdaterequiredSkillsInput | string[]
    anticipatedStart?: EnumAnticipatedStartFieldUpdateOperationsInput | $Enums.AnticipatedStart
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    roleLevel?: NullableEnumRoleLevelFieldUpdateOperationsInput | $Enums.RoleLevel | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    receivedDateFromAccount?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    account?: NullableStringFieldUpdateOperationsInput | string | null
    smu?: NullableStringFieldUpdateOperationsInput | string | null
    spoc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: EngagementApplicationUpdateManyWithoutEngagementNestedInput
    assignments?: EngagementAssignmentUpdateManyWithoutEngagementNestedInput
    managers?: EngagementManagerUpdateManyWithoutEngagementNestedInput
  }

  export type EngagementUncheckedUpdateWithoutTimesheetAuditInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    durationStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationWeeks?: NullableIntFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    timeZones?: EngagementUpdatetimeZonesInput | string[]
    countries?: EngagementUpdatecountriesInput | string[]
    requiredSkills?: EngagementUpdaterequiredSkillsInput | string[]
    anticipatedStart?: EnumAnticipatedStartFieldUpdateOperationsInput | $Enums.AnticipatedStart
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    roleLevel?: NullableEnumRoleLevelFieldUpdateOperationsInput | $Enums.RoleLevel | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    receivedDateFromAccount?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    account?: NullableStringFieldUpdateOperationsInput | string | null
    smu?: NullableStringFieldUpdateOperationsInput | string | null
    spoc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: EngagementApplicationUncheckedUpdateManyWithoutEngagementNestedInput
    assignments?: EngagementAssignmentUncheckedUpdateManyWithoutEngagementNestedInput
    managers?: EngagementManagerUncheckedUpdateManyWithoutEngagementNestedInput
  }

  export type EngagementCreateWithoutManagersInput = {
    id?: string
    projectId: string
    title: string
    description: string
    durationStartDate?: Date | string | null
    durationEndDate?: Date | string | null
    durationWeeks?: number | null
    durationMonths?: number | null
    timeZones?: EngagementCreatetimeZonesInput | string[]
    countries?: EngagementCreatecountriesInput | string[]
    requiredSkills?: EngagementCreaterequiredSkillsInput | string[]
    anticipatedStart: $Enums.AnticipatedStart
    status?: $Enums.EngagementStatus
    isPrivate?: boolean
    requiredMemberCount?: number | null
    role?: $Enums.Role | null
    roleLevel?: $Enums.RoleLevel | null
    workload?: $Enums.Workload | null
    compensationRange?: string | null
    receivedDateFromAccount?: Date | string | null
    account?: string | null
    smu?: string | null
    spoc?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    applications?: EngagementApplicationCreateNestedManyWithoutEngagementInput
    assignments?: EngagementAssignmentCreateNestedManyWithoutEngagementInput
    timesheetAudit?: EngagementTimesheetAuditCreateNestedManyWithoutEngagementInput
  }

  export type EngagementUncheckedCreateWithoutManagersInput = {
    id?: string
    projectId: string
    title: string
    description: string
    durationStartDate?: Date | string | null
    durationEndDate?: Date | string | null
    durationWeeks?: number | null
    durationMonths?: number | null
    timeZones?: EngagementCreatetimeZonesInput | string[]
    countries?: EngagementCreatecountriesInput | string[]
    requiredSkills?: EngagementCreaterequiredSkillsInput | string[]
    anticipatedStart: $Enums.AnticipatedStart
    status?: $Enums.EngagementStatus
    isPrivate?: boolean
    requiredMemberCount?: number | null
    role?: $Enums.Role | null
    roleLevel?: $Enums.RoleLevel | null
    workload?: $Enums.Workload | null
    compensationRange?: string | null
    receivedDateFromAccount?: Date | string | null
    account?: string | null
    smu?: string | null
    spoc?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    applications?: EngagementApplicationUncheckedCreateNestedManyWithoutEngagementInput
    assignments?: EngagementAssignmentUncheckedCreateNestedManyWithoutEngagementInput
    timesheetAudit?: EngagementTimesheetAuditUncheckedCreateNestedManyWithoutEngagementInput
  }

  export type EngagementCreateOrConnectWithoutManagersInput = {
    where: EngagementWhereUniqueInput
    create: XOR<EngagementCreateWithoutManagersInput, EngagementUncheckedCreateWithoutManagersInput>
  }

  export type EngagementUpsertWithoutManagersInput = {
    update: XOR<EngagementUpdateWithoutManagersInput, EngagementUncheckedUpdateWithoutManagersInput>
    create: XOR<EngagementCreateWithoutManagersInput, EngagementUncheckedCreateWithoutManagersInput>
    where?: EngagementWhereInput
  }

  export type EngagementUpdateToOneWithWhereWithoutManagersInput = {
    where?: EngagementWhereInput
    data: XOR<EngagementUpdateWithoutManagersInput, EngagementUncheckedUpdateWithoutManagersInput>
  }

  export type EngagementUpdateWithoutManagersInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    durationStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationWeeks?: NullableIntFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    timeZones?: EngagementUpdatetimeZonesInput | string[]
    countries?: EngagementUpdatecountriesInput | string[]
    requiredSkills?: EngagementUpdaterequiredSkillsInput | string[]
    anticipatedStart?: EnumAnticipatedStartFieldUpdateOperationsInput | $Enums.AnticipatedStart
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    roleLevel?: NullableEnumRoleLevelFieldUpdateOperationsInput | $Enums.RoleLevel | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    receivedDateFromAccount?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    account?: NullableStringFieldUpdateOperationsInput | string | null
    smu?: NullableStringFieldUpdateOperationsInput | string | null
    spoc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: EngagementApplicationUpdateManyWithoutEngagementNestedInput
    assignments?: EngagementAssignmentUpdateManyWithoutEngagementNestedInput
    timesheetAudit?: EngagementTimesheetAuditUpdateManyWithoutEngagementNestedInput
  }

  export type EngagementUncheckedUpdateWithoutManagersInput = {
    id?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    durationStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    durationWeeks?: NullableIntFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    timeZones?: EngagementUpdatetimeZonesInput | string[]
    countries?: EngagementUpdatecountriesInput | string[]
    requiredSkills?: EngagementUpdaterequiredSkillsInput | string[]
    anticipatedStart?: EnumAnticipatedStartFieldUpdateOperationsInput | $Enums.AnticipatedStart
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    roleLevel?: NullableEnumRoleLevelFieldUpdateOperationsInput | $Enums.RoleLevel | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    receivedDateFromAccount?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    account?: NullableStringFieldUpdateOperationsInput | string | null
    smu?: NullableStringFieldUpdateOperationsInput | string | null
    spoc?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: EngagementApplicationUncheckedUpdateManyWithoutEngagementNestedInput
    assignments?: EngagementAssignmentUncheckedUpdateManyWithoutEngagementNestedInput
    timesheetAudit?: EngagementTimesheetAuditUncheckedUpdateManyWithoutEngagementNestedInput
  }

  export type EngagementApplicationCreateManyEngagementInput = {
    id?: string
    userId: string
    handle?: string | null
    email: string
    name: string
    address?: string | null
    mobileNumber?: string | null
    coverLetter?: string | null
    resumeUrl?: string | null
    cvFileUrl?: string | null
    portfolioUrls?: EngagementApplicationCreateportfolioUrlsInput | string[]
    yearsOfExperience?: number | null
    availability?: string | null
    expectedPayRate?: string | null
    referralSource?: string | null
    status?: $Enums.ApplicationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type EngagementAssignmentCreateManyEngagementInput = {
    id?: string
    memberId: string
    memberHandle: string
    status?: $Enums.AssignmentStatus
    acceptedAt?: Date | string | null
    agreementRate?: string | null
    ratePerHour?: string | null
    paymentCycle?: $Enums.PaymentCycle
    standardHoursPerDay?: number | null
    totalHours?: number | null
    standardHoursPerWeek?: number | null
    durationMonths?: number | null
    otherRemarks?: string | null
    terminationReason?: string | null
    startDate?: Date | string | null
    endDate?: Date | string | null
    wiproIdEndDate?: Date | string | null
    candidateWiproId?: string | null
    source?: $Enums.AssignmentSource | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EngagementManagerCreateManyEngagementInput = {
    id?: string
    managerUserId: string
    managerHandle: string
    managerName?: string | null
    createdAt?: Date | string
    createdBy: string
    removedAt?: Date | string | null
    removedBy?: string | null
  }

  export type EngagementTimesheetAuditCreateManyEngagementInput = {
    id?: string
    timesheetEntryId?: string | null
    action: $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId: string
    actorHandle?: string | null
    actorRole: string
    comment?: string | null
    createdAt?: Date | string
  }

  export type EngagementApplicationUpdateWithoutEngagementInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cvFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrls?: EngagementApplicationUpdateportfolioUrlsInput | string[]
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    expectedPayRate?: NullableStringFieldUpdateOperationsInput | string | null
    referralSource?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementApplicationUncheckedUpdateWithoutEngagementInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cvFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrls?: EngagementApplicationUpdateportfolioUrlsInput | string[]
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    expectedPayRate?: NullableStringFieldUpdateOperationsInput | string | null
    referralSource?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementApplicationUncheckedUpdateManyWithoutEngagementInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    handle?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    cvFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrls?: EngagementApplicationUpdateportfolioUrlsInput | string[]
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    expectedPayRate?: NullableStringFieldUpdateOperationsInput | string | null
    referralSource?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementAssignmentUpdateWithoutEngagementInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agreementRate?: NullableStringFieldUpdateOperationsInput | string | null
    ratePerHour?: NullableStringFieldUpdateOperationsInput | string | null
    paymentCycle?: EnumPaymentCycleFieldUpdateOperationsInput | $Enums.PaymentCycle
    standardHoursPerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    totalHours?: NullableFloatFieldUpdateOperationsInput | number | null
    standardHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    otherRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    terminationReason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wiproIdEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateWiproId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableEnumAssignmentSourceFieldUpdateOperationsInput | $Enums.AssignmentSource | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedback?: EngagementFeedbackUpdateManyWithoutAssignmentNestedInput
    memberExperiences?: MemberExperienceUpdateManyWithoutAssignmentNestedInput
    timesheetEntries?: EngagementTimesheetEntryUpdateManyWithoutAssignmentNestedInput
  }

  export type EngagementAssignmentUncheckedUpdateWithoutEngagementInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agreementRate?: NullableStringFieldUpdateOperationsInput | string | null
    ratePerHour?: NullableStringFieldUpdateOperationsInput | string | null
    paymentCycle?: EnumPaymentCycleFieldUpdateOperationsInput | $Enums.PaymentCycle
    standardHoursPerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    totalHours?: NullableFloatFieldUpdateOperationsInput | number | null
    standardHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    otherRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    terminationReason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wiproIdEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateWiproId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableEnumAssignmentSourceFieldUpdateOperationsInput | $Enums.AssignmentSource | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedback?: EngagementFeedbackUncheckedUpdateManyWithoutAssignmentNestedInput
    memberExperiences?: MemberExperienceUncheckedUpdateManyWithoutAssignmentNestedInput
    timesheetEntries?: EngagementTimesheetEntryUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type EngagementAssignmentUncheckedUpdateManyWithoutEngagementInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    status?: EnumAssignmentStatusFieldUpdateOperationsInput | $Enums.AssignmentStatus
    acceptedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agreementRate?: NullableStringFieldUpdateOperationsInput | string | null
    ratePerHour?: NullableStringFieldUpdateOperationsInput | string | null
    paymentCycle?: EnumPaymentCycleFieldUpdateOperationsInput | $Enums.PaymentCycle
    standardHoursPerDay?: NullableFloatFieldUpdateOperationsInput | number | null
    totalHours?: NullableFloatFieldUpdateOperationsInput | number | null
    standardHoursPerWeek?: NullableFloatFieldUpdateOperationsInput | number | null
    durationMonths?: NullableIntFieldUpdateOperationsInput | number | null
    otherRemarks?: NullableStringFieldUpdateOperationsInput | string | null
    terminationReason?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    endDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    wiproIdEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    candidateWiproId?: NullableStringFieldUpdateOperationsInput | string | null
    source?: NullableEnumAssignmentSourceFieldUpdateOperationsInput | $Enums.AssignmentSource | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EngagementManagerUpdateWithoutEngagementInput = {
    id?: StringFieldUpdateOperationsInput | string
    managerUserId?: StringFieldUpdateOperationsInput | string
    managerHandle?: StringFieldUpdateOperationsInput | string
    managerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    removedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    removedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementManagerUncheckedUpdateWithoutEngagementInput = {
    id?: StringFieldUpdateOperationsInput | string
    managerUserId?: StringFieldUpdateOperationsInput | string
    managerHandle?: StringFieldUpdateOperationsInput | string
    managerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    removedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    removedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementManagerUncheckedUpdateManyWithoutEngagementInput = {
    id?: StringFieldUpdateOperationsInput | string
    managerUserId?: StringFieldUpdateOperationsInput | string
    managerHandle?: StringFieldUpdateOperationsInput | string
    managerName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    removedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    removedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementTimesheetAuditUpdateWithoutEngagementInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumTimesheetAuditActionFieldUpdateOperationsInput | $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId?: StringFieldUpdateOperationsInput | string
    actorHandle?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: EngagementTimesheetEntryUpdateOneWithoutAuditRecordsNestedInput
  }

  export type EngagementTimesheetAuditUncheckedUpdateWithoutEngagementInput = {
    id?: StringFieldUpdateOperationsInput | string
    timesheetEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: EnumTimesheetAuditActionFieldUpdateOperationsInput | $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId?: StringFieldUpdateOperationsInput | string
    actorHandle?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EngagementTimesheetAuditUncheckedUpdateManyWithoutEngagementInput = {
    id?: StringFieldUpdateOperationsInput | string
    timesheetEntryId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: EnumTimesheetAuditActionFieldUpdateOperationsInput | $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId?: StringFieldUpdateOperationsInput | string
    actorHandle?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EngagementFeedbackCreateManyAssignmentInput = {
    id?: string
    feedbackText: string
    rating?: number | null
    givenByMemberId?: string | null
    givenByHandle?: string | null
    givenByEmail?: string | null
    secretToken?: string | null
    secretTokenExpiresAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MemberExperienceCreateManyAssignmentInput = {
    id?: string
    experienceText: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EngagementTimesheetEntryCreateManyAssignmentInput = {
    id?: string
    workDate: Date | string
    hoursWorked: Decimal | DecimalJsLike | number | string
    remarks?: string | null
    status?: $Enums.TimesheetEntryStatus
    submittedAt?: Date | string | null
    submittedBy?: string | null
    approvedAt?: Date | string | null
    approvedBy?: string | null
    approvedByHandle?: string | null
    approvalComment?: string | null
    reopenedAt?: Date | string | null
    paidPaymentReference?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type EngagementFeedbackUpdateWithoutAssignmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    feedbackText?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    givenByMemberId?: NullableStringFieldUpdateOperationsInput | string | null
    givenByHandle?: NullableStringFieldUpdateOperationsInput | string | null
    givenByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    secretToken?: NullableStringFieldUpdateOperationsInput | string | null
    secretTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EngagementFeedbackUncheckedUpdateWithoutAssignmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    feedbackText?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    givenByMemberId?: NullableStringFieldUpdateOperationsInput | string | null
    givenByHandle?: NullableStringFieldUpdateOperationsInput | string | null
    givenByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    secretToken?: NullableStringFieldUpdateOperationsInput | string | null
    secretTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EngagementFeedbackUncheckedUpdateManyWithoutAssignmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    feedbackText?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    givenByMemberId?: NullableStringFieldUpdateOperationsInput | string | null
    givenByHandle?: NullableStringFieldUpdateOperationsInput | string | null
    givenByEmail?: NullableStringFieldUpdateOperationsInput | string | null
    secretToken?: NullableStringFieldUpdateOperationsInput | string | null
    secretTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberExperienceUpdateWithoutAssignmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    experienceText?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberExperienceUncheckedUpdateWithoutAssignmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    experienceText?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MemberExperienceUncheckedUpdateManyWithoutAssignmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    experienceText?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EngagementTimesheetEntryUpdateWithoutAssignmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    workDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTimesheetEntryStatusFieldUpdateOperationsInput | $Enums.TimesheetEntryStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedByHandle?: NullableStringFieldUpdateOperationsInput | string | null
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    reopenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    auditRecords?: EngagementTimesheetAuditUpdateManyWithoutEntryNestedInput
  }

  export type EngagementTimesheetEntryUncheckedUpdateWithoutAssignmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    workDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTimesheetEntryStatusFieldUpdateOperationsInput | $Enums.TimesheetEntryStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedByHandle?: NullableStringFieldUpdateOperationsInput | string | null
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    reopenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    auditRecords?: EngagementTimesheetAuditUncheckedUpdateManyWithoutEntryNestedInput
  }

  export type EngagementTimesheetEntryUncheckedUpdateManyWithoutAssignmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    workDate?: DateTimeFieldUpdateOperationsInput | Date | string
    hoursWorked?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTimesheetEntryStatusFieldUpdateOperationsInput | $Enums.TimesheetEntryStatus
    submittedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedBy?: NullableStringFieldUpdateOperationsInput | string | null
    approvedByHandle?: NullableStringFieldUpdateOperationsInput | string | null
    approvalComment?: NullableStringFieldUpdateOperationsInput | string | null
    reopenedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    paidPaymentReference?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementTimesheetAuditCreateManyEntryInput = {
    id?: string
    engagementId?: string | null
    action: $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId: string
    actorHandle?: string | null
    actorRole: string
    comment?: string | null
    createdAt?: Date | string
  }

  export type EngagementTimesheetAuditUpdateWithoutEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: EnumTimesheetAuditActionFieldUpdateOperationsInput | $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId?: StringFieldUpdateOperationsInput | string
    actorHandle?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    engagement?: EngagementUpdateOneWithoutTimesheetAuditNestedInput
  }

  export type EngagementTimesheetAuditUncheckedUpdateWithoutEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: EnumTimesheetAuditActionFieldUpdateOperationsInput | $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId?: StringFieldUpdateOperationsInput | string
    actorHandle?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EngagementTimesheetAuditUncheckedUpdateManyWithoutEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: EnumTimesheetAuditActionFieldUpdateOperationsInput | $Enums.TimesheetAuditAction
    previousValues?: NullableJsonNullValueInput | InputJsonValue
    updatedValues?: NullableJsonNullValueInput | InputJsonValue
    actorUserId?: StringFieldUpdateOperationsInput | string
    actorHandle?: NullableStringFieldUpdateOperationsInput | string | null
    actorRole?: StringFieldUpdateOperationsInput | string
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}