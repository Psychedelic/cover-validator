/* eslint-disable new-cap, max-classes-per-file */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["validate", "defaultMessage"] }] */
import {Principal} from '@dfinity/principal';
import {
  isEmpty,
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

import {BuildConfigRequest} from './model';

@ValidatorConstraint({name: 'isValidUrlFormat', async: false})
export class IsValidUrlFormat implements ValidatorConstraintInterface {
  validate(value: string) {
    const urlPattern = /^[^ /]+\/[^ /]+$/u;
    return urlPattern.test(value);
  }

  defaultMessage() {
    return 'Invalid repo url format';
  }
}

@ValidatorConstraint({name: 'isValidVersionFormat', async: false})
export class IsValidVersionFormat implements ValidatorConstraintInterface {
  validate(value?: string) {
    const versionPattern = /^[0-9]+\.[0-9]+\.[0-9]+$/u;
    return !value || versionPattern.test(value);
  }

  defaultMessage() {
    return 'Invalid version format';
  }
}

@ValidatorConstraint({name: 'isHexString', async: false})
export class IsHexString implements ValidatorConstraintInterface {
  validate(value: string) {
    return /^(?:[A-Fa-f0-9]{2})+$/u.test(value);
  }

  defaultMessage() {
    return 'Invalid hex format';
  }
}

@ValidatorConstraint({name: 'isValidPrincipalFormat', async: false})
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
    return 'Invalid principal format';
  }
}

export const IsNotEmptyIfOptimized = () => (object: BuildConfigRequest, propertyName: string) => {
  registerDecorator({
    name: 'IsNotEmptyIfOptimized',
    target: object.constructor,
    propertyName,
    options: {message: 'Rust version must be specified to use the optimizer'},
    validator: {
      validate(value: string, args: ValidationArguments) {
        const optimizeCount = (args.object as BuildConfigRequest).optimizeCount as number;
        return optimizeCount <= 0 || (optimizeCount > 0 && !isEmpty(value));
      }
    }
  });
};
