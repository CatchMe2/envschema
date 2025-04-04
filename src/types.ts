import type { StandardSchemaV1 } from '@standard-schema/spec';

export type EnvvarEntry<T> = [string, StandardSchemaV1<T>];

export type EnvSchema = {
  [key: string]: EnvSchema | EnvvarEntry<unknown>;
};

type DepthLevels = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export type InferEnv<
  T extends EnvSchema,
  DepthLimit extends number = 10,
> = DepthLimit extends 0
  ? never
  : {
      [K in keyof T]: T[K] extends EnvvarEntry<infer U>
        ? U
        : T[K] extends EnvSchema
          ? InferEnv<T[K], DepthLevels[DepthLimit]>
          : never;
    };

export type NodeEnvInfo = {
  isProduction: boolean;
  isTest: boolean;
  isDevelopment: boolean;
};

export type EnvvarValidationIssue = {
  name: string;
  value?: string;
  messages: string[];
};
