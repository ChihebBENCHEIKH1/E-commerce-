import { faker } from "@faker-js/faker";
import { RegisterDTO } from "../../src/dto/RegisterDTO";
import { LoginDTO } from "../../src/dto/LoginDTO";

export const generateUser = () => {
  return {
    username: faker.internet.email(),
    password: faker.internet.password(),
  };
};

export const generateRegisterUser = (): RegisterDTO => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    country: faker.address.countryCode(),
    recaptcha: faker.internet.password(),
  };
};

export const generateLoginUser = (): LoginDTO => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    recaptcha: faker.internet.password(),
  };
};
