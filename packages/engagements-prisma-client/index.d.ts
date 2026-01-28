
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
 * Enums
 */
export namespace $Enums {
  export const EngagementStatus: {
  OPEN: 'OPEN',
  PENDING_ASSIGNMENT: 'PENDING_ASSIGNMENT',
  ACTIVE: 'ACTIVE',
  CANCELLED: 'CANCELLED',
  CLOSED: 'CLOSED'
};

export type EngagementStatus = (typeof EngagementStatus)[keyof typeof EngagementStatus]


export const ApplicationStatus: {
  SUBMITTED: 'SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
};

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus]


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

}

export type EngagementStatus = $Enums.EngagementStatus

export const EngagementStatus: typeof $Enums.EngagementStatus

export type ApplicationStatus = $Enums.ApplicationStatus

export const ApplicationStatus: typeof $Enums.ApplicationStatus

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Workload = $Enums.Workload

export const Workload: typeof $Enums.Workload

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
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
   * const prisma = new PrismaClient()
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

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
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
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
    MemberExperience: 'MemberExperience'
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
      modelProps: "engagement" | "engagementApplication" | "engagementAssignment" | "engagementFeedback" | "memberExperience"
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
  }

  export type EngagementCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | EngagementCountOutputTypeCountApplicationsArgs
    assignments?: boolean | EngagementCountOutputTypeCountAssignmentsArgs
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
   * Count Type EngagementAssignmentCountOutputType
   */

  export type EngagementAssignmentCountOutputType = {
    feedback: number
    memberExperiences: number
  }

  export type EngagementAssignmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    feedback?: boolean | EngagementAssignmentCountOutputTypeCountFeedbackArgs
    memberExperiences?: boolean | EngagementAssignmentCountOutputTypeCountMemberExperiencesArgs
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
    applicationDeadline: Date | null
    status: $Enums.EngagementStatus | null
    isPrivate: boolean | null
    requiredMemberCount: number | null
    role: $Enums.Role | null
    workload: $Enums.Workload | null
    compensationRange: string | null
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
    applicationDeadline: Date | null
    status: $Enums.EngagementStatus | null
    isPrivate: boolean | null
    requiredMemberCount: number | null
    role: $Enums.Role | null
    workload: $Enums.Workload | null
    compensationRange: string | null
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
    applicationDeadline: number
    status: number
    isPrivate: number
    requiredMemberCount: number
    role: number
    workload: number
    compensationRange: number
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
    applicationDeadline?: true
    status?: true
    isPrivate?: true
    requiredMemberCount?: true
    role?: true
    workload?: true
    compensationRange?: true
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
    applicationDeadline?: true
    status?: true
    isPrivate?: true
    requiredMemberCount?: true
    role?: true
    workload?: true
    compensationRange?: true
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
    applicationDeadline?: true
    status?: true
    isPrivate?: true
    requiredMemberCount?: true
    role?: true
    workload?: true
    compensationRange?: true
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
    applicationDeadline: Date
    status: $Enums.EngagementStatus
    isPrivate: boolean
    requiredMemberCount: number | null
    role: $Enums.Role | null
    workload: $Enums.Workload | null
    compensationRange: string | null
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
    applicationDeadline?: boolean
    status?: boolean
    isPrivate?: boolean
    requiredMemberCount?: boolean
    role?: boolean
    workload?: boolean
    compensationRange?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
    applications?: boolean | Engagement$applicationsArgs<ExtArgs>
    assignments?: boolean | Engagement$assignmentsArgs<ExtArgs>
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
    applicationDeadline?: boolean
    status?: boolean
    isPrivate?: boolean
    requiredMemberCount?: boolean
    role?: boolean
    workload?: boolean
    compensationRange?: boolean
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
    applicationDeadline?: boolean
    status?: boolean
    isPrivate?: boolean
    requiredMemberCount?: boolean
    role?: boolean
    workload?: boolean
    compensationRange?: boolean
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
    applicationDeadline?: boolean
    status?: boolean
    isPrivate?: boolean
    requiredMemberCount?: boolean
    role?: boolean
    workload?: boolean
    compensationRange?: boolean
    createdAt?: boolean
    createdBy?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }

  export type EngagementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "projectId" | "title" | "description" | "durationStartDate" | "durationEndDate" | "durationWeeks" | "durationMonths" | "timeZones" | "countries" | "requiredSkills" | "applicationDeadline" | "status" | "isPrivate" | "requiredMemberCount" | "role" | "workload" | "compensationRange" | "createdAt" | "createdBy" | "updatedAt" | "updatedBy", ExtArgs["result"]["engagement"]>
  export type EngagementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | Engagement$applicationsArgs<ExtArgs>
    assignments?: boolean | Engagement$assignmentsArgs<ExtArgs>
    _count?: boolean | EngagementCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EngagementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EngagementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EngagementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Engagement"
    objects: {
      applications: Prisma.$EngagementApplicationPayload<ExtArgs>[]
      assignments: Prisma.$EngagementAssignmentPayload<ExtArgs>[]
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
      applicationDeadline: Date
      status: $Enums.EngagementStatus
      isPrivate: boolean
      requiredMemberCount: number | null
      role: $Enums.Role | null
      workload: $Enums.Workload | null
      compensationRange: string | null
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
    readonly applicationDeadline: FieldRef<"Engagement", 'DateTime'>
    readonly status: FieldRef<"Engagement", 'EngagementStatus'>
    readonly isPrivate: FieldRef<"Engagement", 'Boolean'>
    readonly requiredMemberCount: FieldRef<"Engagement", 'Int'>
    readonly role: FieldRef<"Engagement", 'Role'>
    readonly workload: FieldRef<"Engagement", 'Workload'>
    readonly compensationRange: FieldRef<"Engagement", 'String'>
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
    email: string | null
    name: string | null
    address: string | null
    mobileNumber: string | null
    coverLetter: string | null
    resumeUrl: string | null
    yearsOfExperience: number | null
    availability: string | null
    status: $Enums.ApplicationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type EngagementApplicationMaxAggregateOutputType = {
    id: string | null
    engagementId: string | null
    userId: string | null
    email: string | null
    name: string | null
    address: string | null
    mobileNumber: string | null
    coverLetter: string | null
    resumeUrl: string | null
    yearsOfExperience: number | null
    availability: string | null
    status: $Enums.ApplicationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    updatedBy: string | null
  }

  export type EngagementApplicationCountAggregateOutputType = {
    id: number
    engagementId: number
    userId: number
    email: number
    name: number
    address: number
    mobileNumber: number
    coverLetter: number
    resumeUrl: number
    portfolioUrls: number
    yearsOfExperience: number
    availability: number
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
    email?: true
    name?: true
    address?: true
    mobileNumber?: true
    coverLetter?: true
    resumeUrl?: true
    yearsOfExperience?: true
    availability?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type EngagementApplicationMaxAggregateInputType = {
    id?: true
    engagementId?: true
    userId?: true
    email?: true
    name?: true
    address?: true
    mobileNumber?: true
    coverLetter?: true
    resumeUrl?: true
    yearsOfExperience?: true
    availability?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    updatedBy?: true
  }

  export type EngagementApplicationCountAggregateInputType = {
    id?: true
    engagementId?: true
    userId?: true
    email?: true
    name?: true
    address?: true
    mobileNumber?: true
    coverLetter?: true
    resumeUrl?: true
    portfolioUrls?: true
    yearsOfExperience?: true
    availability?: true
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
    email: string
    name: string
    address: string | null
    mobileNumber: string | null
    coverLetter: string | null
    resumeUrl: string | null
    portfolioUrls: string[]
    yearsOfExperience: number | null
    availability: string | null
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
    email?: boolean
    name?: boolean
    address?: boolean
    mobileNumber?: boolean
    coverLetter?: boolean
    resumeUrl?: boolean
    portfolioUrls?: boolean
    yearsOfExperience?: boolean
    availability?: boolean
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
    email?: boolean
    name?: boolean
    address?: boolean
    mobileNumber?: boolean
    coverLetter?: boolean
    resumeUrl?: boolean
    portfolioUrls?: boolean
    yearsOfExperience?: boolean
    availability?: boolean
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
    email?: boolean
    name?: boolean
    address?: boolean
    mobileNumber?: boolean
    coverLetter?: boolean
    resumeUrl?: boolean
    portfolioUrls?: boolean
    yearsOfExperience?: boolean
    availability?: boolean
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
    email?: boolean
    name?: boolean
    address?: boolean
    mobileNumber?: boolean
    coverLetter?: boolean
    resumeUrl?: boolean
    portfolioUrls?: boolean
    yearsOfExperience?: boolean
    availability?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    updatedBy?: boolean
  }

  export type EngagementApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "engagementId" | "userId" | "email" | "name" | "address" | "mobileNumber" | "coverLetter" | "resumeUrl" | "portfolioUrls" | "yearsOfExperience" | "availability" | "status" | "createdAt" | "updatedAt" | "updatedBy", ExtArgs["result"]["engagementApplication"]>
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
      email: string
      name: string
      address: string | null
      mobileNumber: string | null
      coverLetter: string | null
      resumeUrl: string | null
      portfolioUrls: string[]
      yearsOfExperience: number | null
      availability: string | null
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
    readonly email: FieldRef<"EngagementApplication", 'String'>
    readonly name: FieldRef<"EngagementApplication", 'String'>
    readonly address: FieldRef<"EngagementApplication", 'String'>
    readonly mobileNumber: FieldRef<"EngagementApplication", 'String'>
    readonly coverLetter: FieldRef<"EngagementApplication", 'String'>
    readonly resumeUrl: FieldRef<"EngagementApplication", 'String'>
    readonly portfolioUrls: FieldRef<"EngagementApplication", 'String[]'>
    readonly yearsOfExperience: FieldRef<"EngagementApplication", 'Int'>
    readonly availability: FieldRef<"EngagementApplication", 'String'>
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
    _min: EngagementAssignmentMinAggregateOutputType | null
    _max: EngagementAssignmentMaxAggregateOutputType | null
  }

  export type EngagementAssignmentMinAggregateOutputType = {
    id: string | null
    engagementId: string | null
    memberId: string | null
    memberHandle: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EngagementAssignmentMaxAggregateOutputType = {
    id: string | null
    engagementId: string | null
    memberId: string | null
    memberHandle: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EngagementAssignmentCountAggregateOutputType = {
    id: number
    engagementId: number
    memberId: number
    memberHandle: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EngagementAssignmentMinAggregateInputType = {
    id?: true
    engagementId?: true
    memberId?: true
    memberHandle?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EngagementAssignmentMaxAggregateInputType = {
    id?: true
    engagementId?: true
    memberId?: true
    memberHandle?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EngagementAssignmentCountAggregateInputType = {
    id?: true
    engagementId?: true
    memberId?: true
    memberHandle?: true
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
    _min?: EngagementAssignmentMinAggregateInputType
    _max?: EngagementAssignmentMaxAggregateInputType
  }

  export type EngagementAssignmentGroupByOutputType = {
    id: string
    engagementId: string
    memberId: string
    memberHandle: string
    createdAt: Date
    updatedAt: Date
    _count: EngagementAssignmentCountAggregateOutputType | null
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
    createdAt?: boolean
    updatedAt?: boolean
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
    feedback?: boolean | EngagementAssignment$feedbackArgs<ExtArgs>
    memberExperiences?: boolean | EngagementAssignment$memberExperiencesArgs<ExtArgs>
    _count?: boolean | EngagementAssignmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagementAssignment"]>

  export type EngagementAssignmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementId?: boolean
    memberId?: boolean
    memberHandle?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagementAssignment"]>

  export type EngagementAssignmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    engagementId?: boolean
    memberId?: boolean
    memberHandle?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["engagementAssignment"]>

  export type EngagementAssignmentSelectScalar = {
    id?: boolean
    engagementId?: boolean
    memberId?: boolean
    memberHandle?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EngagementAssignmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "engagementId" | "memberId" | "memberHandle" | "createdAt" | "updatedAt", ExtArgs["result"]["engagementAssignment"]>
  export type EngagementAssignmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    engagement?: boolean | EngagementDefaultArgs<ExtArgs>
    feedback?: boolean | EngagementAssignment$feedbackArgs<ExtArgs>
    memberExperiences?: boolean | EngagementAssignment$memberExperiencesArgs<ExtArgs>
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
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      engagementId: string
      memberId: string
      memberHandle: string
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
    applicationDeadline: 'applicationDeadline',
    status: 'status',
    isPrivate: 'isPrivate',
    requiredMemberCount: 'requiredMemberCount',
    role: 'role',
    workload: 'workload',
    compensationRange: 'compensationRange',
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
    email: 'email',
    name: 'name',
    address: 'address',
    mobileNumber: 'mobileNumber',
    coverLetter: 'coverLetter',
    resumeUrl: 'resumeUrl',
    portfolioUrls: 'portfolioUrls',
    yearsOfExperience: 'yearsOfExperience',
    availability: 'availability',
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


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
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
    applicationDeadline?: DateTimeFilter<"Engagement"> | Date | string
    status?: EnumEngagementStatusFilter<"Engagement"> | $Enums.EngagementStatus
    isPrivate?: BoolFilter<"Engagement"> | boolean
    requiredMemberCount?: IntNullableFilter<"Engagement"> | number | null
    role?: EnumRoleNullableFilter<"Engagement"> | $Enums.Role | null
    workload?: EnumWorkloadNullableFilter<"Engagement"> | $Enums.Workload | null
    compensationRange?: StringNullableFilter<"Engagement"> | string | null
    createdAt?: DateTimeFilter<"Engagement"> | Date | string
    createdBy?: StringFilter<"Engagement"> | string
    updatedAt?: DateTimeFilter<"Engagement"> | Date | string
    updatedBy?: StringNullableFilter<"Engagement"> | string | null
    applications?: EngagementApplicationListRelationFilter
    assignments?: EngagementAssignmentListRelationFilter
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
    applicationDeadline?: SortOrder
    status?: SortOrder
    isPrivate?: SortOrder
    requiredMemberCount?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    workload?: SortOrderInput | SortOrder
    compensationRange?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrderInput | SortOrder
    applications?: EngagementApplicationOrderByRelationAggregateInput
    assignments?: EngagementAssignmentOrderByRelationAggregateInput
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
    applicationDeadline?: DateTimeFilter<"Engagement"> | Date | string
    status?: EnumEngagementStatusFilter<"Engagement"> | $Enums.EngagementStatus
    isPrivate?: BoolFilter<"Engagement"> | boolean
    requiredMemberCount?: IntNullableFilter<"Engagement"> | number | null
    role?: EnumRoleNullableFilter<"Engagement"> | $Enums.Role | null
    workload?: EnumWorkloadNullableFilter<"Engagement"> | $Enums.Workload | null
    compensationRange?: StringNullableFilter<"Engagement"> | string | null
    createdAt?: DateTimeFilter<"Engagement"> | Date | string
    createdBy?: StringFilter<"Engagement"> | string
    updatedAt?: DateTimeFilter<"Engagement"> | Date | string
    updatedBy?: StringNullableFilter<"Engagement"> | string | null
    applications?: EngagementApplicationListRelationFilter
    assignments?: EngagementAssignmentListRelationFilter
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
    applicationDeadline?: SortOrder
    status?: SortOrder
    isPrivate?: SortOrder
    requiredMemberCount?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    workload?: SortOrderInput | SortOrder
    compensationRange?: SortOrderInput | SortOrder
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
    applicationDeadline?: DateTimeWithAggregatesFilter<"Engagement"> | Date | string
    status?: EnumEngagementStatusWithAggregatesFilter<"Engagement"> | $Enums.EngagementStatus
    isPrivate?: BoolWithAggregatesFilter<"Engagement"> | boolean
    requiredMemberCount?: IntNullableWithAggregatesFilter<"Engagement"> | number | null
    role?: EnumRoleNullableWithAggregatesFilter<"Engagement"> | $Enums.Role | null
    workload?: EnumWorkloadNullableWithAggregatesFilter<"Engagement"> | $Enums.Workload | null
    compensationRange?: StringNullableWithAggregatesFilter<"Engagement"> | string | null
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
    email?: StringFilter<"EngagementApplication"> | string
    name?: StringFilter<"EngagementApplication"> | string
    address?: StringNullableFilter<"EngagementApplication"> | string | null
    mobileNumber?: StringNullableFilter<"EngagementApplication"> | string | null
    coverLetter?: StringNullableFilter<"EngagementApplication"> | string | null
    resumeUrl?: StringNullableFilter<"EngagementApplication"> | string | null
    portfolioUrls?: StringNullableListFilter<"EngagementApplication">
    yearsOfExperience?: IntNullableFilter<"EngagementApplication"> | number | null
    availability?: StringNullableFilter<"EngagementApplication"> | string | null
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
    email?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    mobileNumber?: SortOrderInput | SortOrder
    coverLetter?: SortOrderInput | SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    portfolioUrls?: SortOrder
    yearsOfExperience?: SortOrderInput | SortOrder
    availability?: SortOrderInput | SortOrder
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
    email?: StringFilter<"EngagementApplication"> | string
    name?: StringFilter<"EngagementApplication"> | string
    address?: StringNullableFilter<"EngagementApplication"> | string | null
    mobileNumber?: StringNullableFilter<"EngagementApplication"> | string | null
    coverLetter?: StringNullableFilter<"EngagementApplication"> | string | null
    resumeUrl?: StringNullableFilter<"EngagementApplication"> | string | null
    portfolioUrls?: StringNullableListFilter<"EngagementApplication">
    yearsOfExperience?: IntNullableFilter<"EngagementApplication"> | number | null
    availability?: StringNullableFilter<"EngagementApplication"> | string | null
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
    email?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    mobileNumber?: SortOrderInput | SortOrder
    coverLetter?: SortOrderInput | SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    portfolioUrls?: SortOrder
    yearsOfExperience?: SortOrderInput | SortOrder
    availability?: SortOrderInput | SortOrder
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
    email?: StringWithAggregatesFilter<"EngagementApplication"> | string
    name?: StringWithAggregatesFilter<"EngagementApplication"> | string
    address?: StringNullableWithAggregatesFilter<"EngagementApplication"> | string | null
    mobileNumber?: StringNullableWithAggregatesFilter<"EngagementApplication"> | string | null
    coverLetter?: StringNullableWithAggregatesFilter<"EngagementApplication"> | string | null
    resumeUrl?: StringNullableWithAggregatesFilter<"EngagementApplication"> | string | null
    portfolioUrls?: StringNullableListFilter<"EngagementApplication">
    yearsOfExperience?: IntNullableWithAggregatesFilter<"EngagementApplication"> | number | null
    availability?: StringNullableWithAggregatesFilter<"EngagementApplication"> | string | null
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
    createdAt?: DateTimeFilter<"EngagementAssignment"> | Date | string
    updatedAt?: DateTimeFilter<"EngagementAssignment"> | Date | string
    engagement?: XOR<EngagementScalarRelationFilter, EngagementWhereInput>
    feedback?: EngagementFeedbackListRelationFilter
    memberExperiences?: MemberExperienceListRelationFilter
  }

  export type EngagementAssignmentOrderByWithRelationInput = {
    id?: SortOrder
    engagementId?: SortOrder
    memberId?: SortOrder
    memberHandle?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    engagement?: EngagementOrderByWithRelationInput
    feedback?: EngagementFeedbackOrderByRelationAggregateInput
    memberExperiences?: MemberExperienceOrderByRelationAggregateInput
  }

  export type EngagementAssignmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    engagementId_memberId?: EngagementAssignmentEngagementIdMemberIdCompoundUniqueInput
    AND?: EngagementAssignmentWhereInput | EngagementAssignmentWhereInput[]
    OR?: EngagementAssignmentWhereInput[]
    NOT?: EngagementAssignmentWhereInput | EngagementAssignmentWhereInput[]
    engagementId?: StringFilter<"EngagementAssignment"> | string
    memberId?: StringFilter<"EngagementAssignment"> | string
    memberHandle?: StringFilter<"EngagementAssignment"> | string
    createdAt?: DateTimeFilter<"EngagementAssignment"> | Date | string
    updatedAt?: DateTimeFilter<"EngagementAssignment"> | Date | string
    engagement?: XOR<EngagementScalarRelationFilter, EngagementWhereInput>
    feedback?: EngagementFeedbackListRelationFilter
    memberExperiences?: MemberExperienceListRelationFilter
  }, "id" | "engagementId_memberId">

  export type EngagementAssignmentOrderByWithAggregationInput = {
    id?: SortOrder
    engagementId?: SortOrder
    memberId?: SortOrder
    memberHandle?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EngagementAssignmentCountOrderByAggregateInput
    _max?: EngagementAssignmentMaxOrderByAggregateInput
    _min?: EngagementAssignmentMinOrderByAggregateInput
  }

  export type EngagementAssignmentScalarWhereWithAggregatesInput = {
    AND?: EngagementAssignmentScalarWhereWithAggregatesInput | EngagementAssignmentScalarWhereWithAggregatesInput[]
    OR?: EngagementAssignmentScalarWhereWithAggregatesInput[]
    NOT?: EngagementAssignmentScalarWhereWithAggregatesInput | EngagementAssignmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EngagementAssignment"> | string
    engagementId?: StringWithAggregatesFilter<"EngagementAssignment"> | string
    memberId?: StringWithAggregatesFilter<"EngagementAssignment"> | string
    memberHandle?: StringWithAggregatesFilter<"EngagementAssignment"> | string
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
    applicationDeadline: Date | string
    status?: $Enums.EngagementStatus
    isPrivate?: boolean
    requiredMemberCount?: number | null
    role?: $Enums.Role | null
    workload?: $Enums.Workload | null
    compensationRange?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    applications?: EngagementApplicationCreateNestedManyWithoutEngagementInput
    assignments?: EngagementAssignmentCreateNestedManyWithoutEngagementInput
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
    applicationDeadline: Date | string
    status?: $Enums.EngagementStatus
    isPrivate?: boolean
    requiredMemberCount?: number | null
    role?: $Enums.Role | null
    workload?: $Enums.Workload | null
    compensationRange?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    applications?: EngagementApplicationUncheckedCreateNestedManyWithoutEngagementInput
    assignments?: EngagementAssignmentUncheckedCreateNestedManyWithoutEngagementInput
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
    applicationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: EngagementApplicationUpdateManyWithoutEngagementNestedInput
    assignments?: EngagementAssignmentUpdateManyWithoutEngagementNestedInput
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
    applicationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: EngagementApplicationUncheckedUpdateManyWithoutEngagementNestedInput
    assignments?: EngagementAssignmentUncheckedUpdateManyWithoutEngagementNestedInput
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
    applicationDeadline: Date | string
    status?: $Enums.EngagementStatus
    isPrivate?: boolean
    requiredMemberCount?: number | null
    role?: $Enums.Role | null
    workload?: $Enums.Workload | null
    compensationRange?: string | null
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
    applicationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
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
    applicationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementApplicationCreateInput = {
    id?: string
    userId: string
    email: string
    name: string
    address?: string | null
    mobileNumber?: string | null
    coverLetter?: string | null
    resumeUrl?: string | null
    portfolioUrls?: EngagementApplicationCreateportfolioUrlsInput | string[]
    yearsOfExperience?: number | null
    availability?: string | null
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
    email: string
    name: string
    address?: string | null
    mobileNumber?: string | null
    coverLetter?: string | null
    resumeUrl?: string | null
    portfolioUrls?: EngagementApplicationCreateportfolioUrlsInput | string[]
    yearsOfExperience?: number | null
    availability?: string | null
    status?: $Enums.ApplicationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type EngagementApplicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrls?: EngagementApplicationUpdateportfolioUrlsInput | string[]
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
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
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrls?: EngagementApplicationUpdateportfolioUrlsInput | string[]
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementApplicationCreateManyInput = {
    id?: string
    engagementId: string
    userId: string
    email: string
    name: string
    address?: string | null
    mobileNumber?: string | null
    coverLetter?: string | null
    resumeUrl?: string | null
    portfolioUrls?: EngagementApplicationCreateportfolioUrlsInput | string[]
    yearsOfExperience?: number | null
    availability?: string | null
    status?: $Enums.ApplicationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type EngagementApplicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrls?: EngagementApplicationUpdateportfolioUrlsInput | string[]
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementApplicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrls?: EngagementApplicationUpdateportfolioUrlsInput | string[]
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementAssignmentCreateInput = {
    id?: string
    memberId: string
    memberHandle: string
    createdAt?: Date | string
    updatedAt?: Date | string
    engagement: EngagementCreateNestedOneWithoutAssignmentsInput
    feedback?: EngagementFeedbackCreateNestedManyWithoutAssignmentInput
    memberExperiences?: MemberExperienceCreateNestedManyWithoutAssignmentInput
  }

  export type EngagementAssignmentUncheckedCreateInput = {
    id?: string
    engagementId: string
    memberId: string
    memberHandle: string
    createdAt?: Date | string
    updatedAt?: Date | string
    feedback?: EngagementFeedbackUncheckedCreateNestedManyWithoutAssignmentInput
    memberExperiences?: MemberExperienceUncheckedCreateNestedManyWithoutAssignmentInput
  }

  export type EngagementAssignmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    engagement?: EngagementUpdateOneRequiredWithoutAssignmentsNestedInput
    feedback?: EngagementFeedbackUpdateManyWithoutAssignmentNestedInput
    memberExperiences?: MemberExperienceUpdateManyWithoutAssignmentNestedInput
  }

  export type EngagementAssignmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedback?: EngagementFeedbackUncheckedUpdateManyWithoutAssignmentNestedInput
    memberExperiences?: MemberExperienceUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type EngagementAssignmentCreateManyInput = {
    id?: string
    engagementId: string
    memberId: string
    memberHandle: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EngagementAssignmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EngagementAssignmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
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
    applicationDeadline?: SortOrder
    status?: SortOrder
    isPrivate?: SortOrder
    requiredMemberCount?: SortOrder
    role?: SortOrder
    workload?: SortOrder
    compensationRange?: SortOrder
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
    applicationDeadline?: SortOrder
    status?: SortOrder
    isPrivate?: SortOrder
    requiredMemberCount?: SortOrder
    role?: SortOrder
    workload?: SortOrder
    compensationRange?: SortOrder
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
    applicationDeadline?: SortOrder
    status?: SortOrder
    isPrivate?: SortOrder
    requiredMemberCount?: SortOrder
    role?: SortOrder
    workload?: SortOrder
    compensationRange?: SortOrder
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
    email?: SortOrder
    name?: SortOrder
    address?: SortOrder
    mobileNumber?: SortOrder
    coverLetter?: SortOrder
    resumeUrl?: SortOrder
    portfolioUrls?: SortOrder
    yearsOfExperience?: SortOrder
    availability?: SortOrder
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
    email?: SortOrder
    name?: SortOrder
    address?: SortOrder
    mobileNumber?: SortOrder
    coverLetter?: SortOrder
    resumeUrl?: SortOrder
    yearsOfExperience?: SortOrder
    availability?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    updatedBy?: SortOrder
  }

  export type EngagementApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    engagementId?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    name?: SortOrder
    address?: SortOrder
    mobileNumber?: SortOrder
    coverLetter?: SortOrder
    resumeUrl?: SortOrder
    yearsOfExperience?: SortOrder
    availability?: SortOrder
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

  export type EngagementFeedbackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MemberExperienceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EngagementAssignmentEngagementIdMemberIdCompoundUniqueInput = {
    engagementId: string
    memberId: string
  }

  export type EngagementAssignmentCountOrderByAggregateInput = {
    id?: SortOrder
    engagementId?: SortOrder
    memberId?: SortOrder
    memberHandle?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EngagementAssignmentMaxOrderByAggregateInput = {
    id?: SortOrder
    engagementId?: SortOrder
    memberId?: SortOrder
    memberHandle?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EngagementAssignmentMinOrderByAggregateInput = {
    id?: SortOrder
    engagementId?: SortOrder
    memberId?: SortOrder
    memberHandle?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
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

  export type NullableEnumWorkloadFieldUpdateOperationsInput = {
    set?: $Enums.Workload | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
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

  export type EngagementApplicationCreateWithoutEngagementInput = {
    id?: string
    userId: string
    email: string
    name: string
    address?: string | null
    mobileNumber?: string | null
    coverLetter?: string | null
    resumeUrl?: string | null
    portfolioUrls?: EngagementApplicationCreateportfolioUrlsInput | string[]
    yearsOfExperience?: number | null
    availability?: string | null
    status?: $Enums.ApplicationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type EngagementApplicationUncheckedCreateWithoutEngagementInput = {
    id?: string
    userId: string
    email: string
    name: string
    address?: string | null
    mobileNumber?: string | null
    coverLetter?: string | null
    resumeUrl?: string | null
    portfolioUrls?: EngagementApplicationCreateportfolioUrlsInput | string[]
    yearsOfExperience?: number | null
    availability?: string | null
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
    createdAt?: Date | string
    updatedAt?: Date | string
    feedback?: EngagementFeedbackCreateNestedManyWithoutAssignmentInput
    memberExperiences?: MemberExperienceCreateNestedManyWithoutAssignmentInput
  }

  export type EngagementAssignmentUncheckedCreateWithoutEngagementInput = {
    id?: string
    memberId: string
    memberHandle: string
    createdAt?: Date | string
    updatedAt?: Date | string
    feedback?: EngagementFeedbackUncheckedCreateNestedManyWithoutAssignmentInput
    memberExperiences?: MemberExperienceUncheckedCreateNestedManyWithoutAssignmentInput
  }

  export type EngagementAssignmentCreateOrConnectWithoutEngagementInput = {
    where: EngagementAssignmentWhereUniqueInput
    create: XOR<EngagementAssignmentCreateWithoutEngagementInput, EngagementAssignmentUncheckedCreateWithoutEngagementInput>
  }

  export type EngagementAssignmentCreateManyEngagementInputEnvelope = {
    data: EngagementAssignmentCreateManyEngagementInput | EngagementAssignmentCreateManyEngagementInput[]
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
    email?: StringFilter<"EngagementApplication"> | string
    name?: StringFilter<"EngagementApplication"> | string
    address?: StringNullableFilter<"EngagementApplication"> | string | null
    mobileNumber?: StringNullableFilter<"EngagementApplication"> | string | null
    coverLetter?: StringNullableFilter<"EngagementApplication"> | string | null
    resumeUrl?: StringNullableFilter<"EngagementApplication"> | string | null
    portfolioUrls?: StringNullableListFilter<"EngagementApplication">
    yearsOfExperience?: IntNullableFilter<"EngagementApplication"> | number | null
    availability?: StringNullableFilter<"EngagementApplication"> | string | null
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
    createdAt?: DateTimeFilter<"EngagementAssignment"> | Date | string
    updatedAt?: DateTimeFilter<"EngagementAssignment"> | Date | string
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
    applicationDeadline: Date | string
    status?: $Enums.EngagementStatus
    isPrivate?: boolean
    requiredMemberCount?: number | null
    role?: $Enums.Role | null
    workload?: $Enums.Workload | null
    compensationRange?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    assignments?: EngagementAssignmentCreateNestedManyWithoutEngagementInput
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
    applicationDeadline: Date | string
    status?: $Enums.EngagementStatus
    isPrivate?: boolean
    requiredMemberCount?: number | null
    role?: $Enums.Role | null
    workload?: $Enums.Workload | null
    compensationRange?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    assignments?: EngagementAssignmentUncheckedCreateNestedManyWithoutEngagementInput
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
    applicationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    assignments?: EngagementAssignmentUpdateManyWithoutEngagementNestedInput
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
    applicationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    assignments?: EngagementAssignmentUncheckedUpdateManyWithoutEngagementNestedInput
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
    applicationDeadline: Date | string
    status?: $Enums.EngagementStatus
    isPrivate?: boolean
    requiredMemberCount?: number | null
    role?: $Enums.Role | null
    workload?: $Enums.Workload | null
    compensationRange?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    applications?: EngagementApplicationCreateNestedManyWithoutEngagementInput
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
    applicationDeadline: Date | string
    status?: $Enums.EngagementStatus
    isPrivate?: boolean
    requiredMemberCount?: number | null
    role?: $Enums.Role | null
    workload?: $Enums.Workload | null
    compensationRange?: string | null
    createdAt?: Date | string
    createdBy: string
    updatedAt?: Date | string
    updatedBy?: string | null
    applications?: EngagementApplicationUncheckedCreateNestedManyWithoutEngagementInput
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
    applicationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: EngagementApplicationUpdateManyWithoutEngagementNestedInput
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
    applicationDeadline?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumEngagementStatusFieldUpdateOperationsInput | $Enums.EngagementStatus
    isPrivate?: BoolFieldUpdateOperationsInput | boolean
    requiredMemberCount?: NullableIntFieldUpdateOperationsInput | number | null
    role?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    workload?: NullableEnumWorkloadFieldUpdateOperationsInput | $Enums.Workload | null
    compensationRange?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: EngagementApplicationUncheckedUpdateManyWithoutEngagementNestedInput
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

  export type EngagementAssignmentCreateWithoutFeedbackInput = {
    id?: string
    memberId: string
    memberHandle: string
    createdAt?: Date | string
    updatedAt?: Date | string
    engagement: EngagementCreateNestedOneWithoutAssignmentsInput
    memberExperiences?: MemberExperienceCreateNestedManyWithoutAssignmentInput
  }

  export type EngagementAssignmentUncheckedCreateWithoutFeedbackInput = {
    id?: string
    engagementId: string
    memberId: string
    memberHandle: string
    createdAt?: Date | string
    updatedAt?: Date | string
    memberExperiences?: MemberExperienceUncheckedCreateNestedManyWithoutAssignmentInput
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
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    engagement?: EngagementUpdateOneRequiredWithoutAssignmentsNestedInput
    memberExperiences?: MemberExperienceUpdateManyWithoutAssignmentNestedInput
  }

  export type EngagementAssignmentUncheckedUpdateWithoutFeedbackInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    memberExperiences?: MemberExperienceUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type EngagementAssignmentCreateWithoutMemberExperiencesInput = {
    id?: string
    memberId: string
    memberHandle: string
    createdAt?: Date | string
    updatedAt?: Date | string
    engagement: EngagementCreateNestedOneWithoutAssignmentsInput
    feedback?: EngagementFeedbackCreateNestedManyWithoutAssignmentInput
  }

  export type EngagementAssignmentUncheckedCreateWithoutMemberExperiencesInput = {
    id?: string
    engagementId: string
    memberId: string
    memberHandle: string
    createdAt?: Date | string
    updatedAt?: Date | string
    feedback?: EngagementFeedbackUncheckedCreateNestedManyWithoutAssignmentInput
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
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    engagement?: EngagementUpdateOneRequiredWithoutAssignmentsNestedInput
    feedback?: EngagementFeedbackUpdateManyWithoutAssignmentNestedInput
  }

  export type EngagementAssignmentUncheckedUpdateWithoutMemberExperiencesInput = {
    id?: StringFieldUpdateOperationsInput | string
    engagementId?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedback?: EngagementFeedbackUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type EngagementApplicationCreateManyEngagementInput = {
    id?: string
    userId: string
    email: string
    name: string
    address?: string | null
    mobileNumber?: string | null
    coverLetter?: string | null
    resumeUrl?: string | null
    portfolioUrls?: EngagementApplicationCreateportfolioUrlsInput | string[]
    yearsOfExperience?: number | null
    availability?: string | null
    status?: $Enums.ApplicationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    updatedBy?: string | null
  }

  export type EngagementAssignmentCreateManyEngagementInput = {
    id?: string
    memberId: string
    memberHandle: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EngagementApplicationUpdateWithoutEngagementInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrls?: EngagementApplicationUpdateportfolioUrlsInput | string[]
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementApplicationUncheckedUpdateWithoutEngagementInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrls?: EngagementApplicationUpdateportfolioUrlsInput | string[]
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementApplicationUncheckedUpdateManyWithoutEngagementInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    mobileNumber?: NullableStringFieldUpdateOperationsInput | string | null
    coverLetter?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    portfolioUrls?: EngagementApplicationUpdateportfolioUrlsInput | string[]
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EngagementAssignmentUpdateWithoutEngagementInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedback?: EngagementFeedbackUpdateManyWithoutAssignmentNestedInput
    memberExperiences?: MemberExperienceUpdateManyWithoutAssignmentNestedInput
  }

  export type EngagementAssignmentUncheckedUpdateWithoutEngagementInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    feedback?: EngagementFeedbackUncheckedUpdateManyWithoutAssignmentNestedInput
    memberExperiences?: MemberExperienceUncheckedUpdateManyWithoutAssignmentNestedInput
  }

  export type EngagementAssignmentUncheckedUpdateManyWithoutEngagementInput = {
    id?: StringFieldUpdateOperationsInput | string
    memberId?: StringFieldUpdateOperationsInput | string
    memberHandle?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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