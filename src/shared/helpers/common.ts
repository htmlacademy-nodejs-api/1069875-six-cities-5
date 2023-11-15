import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { ValidationErrorField } from '../libs/rest/index.js';

export function generateRandomValue(
  min: number,
  max: number,
  numAfterDigit = 0
) {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition =
    startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function fillDTO<T, V>(someDTO: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDTO, plainObject, {
    excludeExtraneousValues: true,
  });
}

export function createErrorObject(message: string) {
  return {
    message,
  };
}

export function transformObjectValuesToString(items: object) {
  return Object.values(items).join(', ');
}

export function reduceValidationErrors(
  errors: ValidationError[]
): ValidationErrorField[] {
  return errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : [],
  }));
}
