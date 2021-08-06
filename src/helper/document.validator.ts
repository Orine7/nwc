import { registerDecorator, ValidationOptions } from "class-validator";

// Validators done inspired by https://gist.github.com/alexbruno work

export function isCpf(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: "isCpf",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const numbers = documentToNumberArray(value, "CPF");
          if (numbers) {
            return CPFValidationCalc(numbers);
          } else return false;
        },
      },
    });
  };
}

export function isCnpj(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: "isCnpj",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const numbers = documentToNumberArray(value, "CNPJ");
          if (numbers) {
            return CNPJValidationCalc(numbers);
          } else return false;
        },
      },
    });
  };
}

//Helper functions

function documentToNumberArray(document: string, type: "CPF" | "CNPJ") {
  if (!document) return false;
  const value = checkDocumentFormat(document, type);

  if (!value) return false;
  switch (type) {
    case "CNPJ":
      return charToNumberArray(value, 14);
    case "CPF":
      return charToNumberArray(value, 11);
    default:
      return false;
  }
}

function checkDocumentFormat(value: string, type: "CPF" | "CNPJ") {
  switch (type) {
    case "CNPJ":
      if (value?.length > 18) return false;
      const CnpjDigits = /^\d{14}$/.test(value);
      const CnpjFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value);
      if (CnpjDigits || CnpjFormat) {
        return value;
      } else return false;
    case "CPF":
      if (value?.length > 14) return false;
      const CpfDigits = /^\d{11}$/.test(value);
      const CpfFormat = /^\d{3}.\d{3}.\d{3}-\d{2}$/.test(value);
      if (CpfDigits || CpfFormat) {
        return value;
      } else return false;
    default:
      return false;
  }
}

function charToNumberArray(value: string, documentLength: number) {
  const match = value.toString().match(/\d/g);
  const numbers = Array.isArray(match) ? match.map(Number) : [];
  if (numbers.length != documentLength) return false;

  const items = [...new Set(numbers)];
  if (items.length === 1) return false;

  return numbers;
}

function CNPJValidationCalc(cnpjArray: Array<number>) {
  const digitCalc = (digit: number) => {
    const slice = cnpjArray.slice(0, digit);
    let factor = digit - 7;
    let sum = 0;

    for (let i = digit; i >= 1; i--) {
      const n = slice[digit - i];
      sum += n * factor--;
      if (factor < 2) factor = 9;
    }

    const result = 11 - (sum % 11);

    return result > 9 ? 0 : result;
  };

  const digits = cnpjArray.slice(12);

  const digit0 = digitCalc(12);
  if (digit0 !== digits[0]) return false;

  const digit1 = digitCalc(13);
  return digit1 === digits[1];
}

function CPFValidationCalc(cpfArray: Array<number>) {
  const base = cpfArray.slice(0, 9);
  const digits = cpfArray.slice(9);

  const baseCalc = (number: number, index: number, cpfLenght: number) =>
    number * (cpfLenght - index);

  const digitCalc = (digit: number) => {
    const rest = digit % cpfArray.length;
    return rest < 2 ? 0 : cpfArray.length - rest;
  };

  const firstDigitValidationCalc = base
    .map((n, i) => baseCalc(n, i, cpfArray.length - 1))
    .reduce((r, n) => r + n, 0);
  const checkFirstVerificationDigit = digitCalc(firstDigitValidationCalc);

  if (checkFirstVerificationDigit !== digits[0]) return false;

  const secondDigitValidationCalc = base
    .concat(checkFirstVerificationDigit)
    .map((n, i) => baseCalc(n, i, cpfArray.length))
    .reduce((r, n) => r + n, 0);
  const checkSecondVerificationDigit = digitCalc(secondDigitValidationCalc);

  return checkSecondVerificationDigit === digits[1];
}
