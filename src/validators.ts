import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isEmpty,
  registerDecorator
} from "class-validator";
import {BuildConfigRequest} from "./model";
import {Principal} from "@dfinity/principal";

@ValidatorConstraint({name: "isValidUrlFormat", async: false})
export class IsValidUrlFormat implements ValidatorConstraintInterface {
  validate(value: string) {
    const urlPattern = /^[^ /]+\/[^ /]+$/;
    return urlPattern.test(value);
  }

  defaultMessage() {
    return "Invalid repo url format";
  }
}

@ValidatorConstraint({name: "isValidVersionFormat", async: false})
export class IsValidVersionFormat implements ValidatorConstraintInterface {
  validate(value?: string) {
    const versionPattern = /^[0-9]+.[0-9]+.[0-9]+$/;
    return !value || versionPattern.test(value);
  }

  defaultMessage() {
    return "Invalid version format";
  }
}

@ValidatorConstraint({name: "isHexString", async: false})
export class IsHexString implements ValidatorConstraintInterface {
  validate(value: string) {
    const hexPattern = /^([A-Fa-f0-9]{2})+$/;
    return value !== undefined && value.length % 2 === 0 && hexPattern.test(value);
  }

  defaultMessage() {
    return "Invalid hex format";
  }
}

@ValidatorConstraint({name: "isValidPrincipalFormat", async: false})
export class IsValidPrincipalFormat implements ValidatorConstraintInterface {
  validate(principal: string) {
    try {
      Principal.fromText(principal);
      return true;
    } catch (_) {
      return false;
    }
  }

  defaultMessage() {
    return "Invalid principal format";
  }
}

export function IsNotEmptyIfOptimized() {
  return function (object: BuildConfigRequest, propertyName: string) {
    registerDecorator({
      name: "IsNotEmptyIfOptimized",
      target: object.constructor,
      propertyName,
      options: {message: "Rust version must be specified to use the optimizer"},
      validator: {
        validate(value: string, args: ValidationArguments) {
          const optimizeTimes = (args.object as BuildConfigRequest).optimizeTimes as number;
          return optimizeTimes <= 0 || (optimizeTimes > 0 && !isEmpty(value));
        }
      }
    });
  };
}
