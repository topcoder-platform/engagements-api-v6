import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";
import { TransformFnParams } from "class-transformer";
import { ERROR_MESSAGES } from "./constants";

export const transformArray = ({ value }: TransformFnParams) => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  return value;
};

/**
 * Converts query-string boolean literals to booleans for DTO validation.
 *
 * Empty values become `undefined`, existing booleans pass through, and the
 * case-insensitive strings `true` and `false` are converted. Other values are
 * returned unchanged so `@IsBoolean()` can report a validation error.
 *
 * @param params Class-transformer callback parameters containing the raw query
 * value.
 * @returns A boolean, `undefined`, or the original unsupported value.
 * @throws This transformer does not throw.
 */
export const transformBoolean = ({ value }: TransformFnParams): unknown => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    const normalized = value.toLowerCase();
    if (normalized === "true") {
      return true;
    }
    if (normalized === "false") {
      return false;
    }
  }
  return value;
};

export const trimTransformer = ({
  value,
}: {
  value: unknown;
}): string | undefined =>
  typeof value === "string" ? value.trim() : undefined;

export function IsNotWhitespace(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: "isNotWhitespace",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return typeof value === "string" && value.trim().length > 0;
        },
        defaultMessage() {
          return "Field cannot be empty or contain only whitespace";
        },
      },
    });
  };
}

export function HasDuration(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: "hasDuration",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(_value: unknown, args: ValidationArguments) {
          const dto = args.object as Record<string, unknown>;

          // Private engagements do not collect public duration fields.
          if (dto.isPrivate === true) {
            return true;
          }

          return hasValidDuration(dto);
        },
        defaultMessage() {
          return ERROR_MESSAGES.MissingDuration;
        },
      },
    });
  };
}

export function HasDurationIfProvided(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: "hasDurationIfProvided",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(_value: unknown, args: ValidationArguments) {
          const dto = args.object as Record<string, unknown>;
          const hasAnyDurationField =
            dto.durationWeeks !== undefined ||
            dto.durationMonths !== undefined ||
            dto.durationStartDate !== undefined ||
            dto.durationEndDate !== undefined;

          if (!hasAnyDurationField) {
            return true;
          }

          return hasValidDuration(dto);
        },
        defaultMessage() {
          return ERROR_MESSAGES.MissingDuration;
        },
      },
    });
  };
}

const hasValidDuration = (dto: Record<string, unknown>): boolean => {
  const weeks = Number(dto.durationWeeks);
  const months = Number(dto.durationMonths);
  const hasWeeks = Number.isInteger(weeks) && weeks > 0;
  const hasMonths = Number.isInteger(months) && months > 0;
  const hasStart = Boolean(dto.durationStartDate);
  const hasEnd = Boolean(dto.durationEndDate);

  if (hasWeeks || hasMonths) {
    return true;
  }

  return hasStart && hasEnd;
};
