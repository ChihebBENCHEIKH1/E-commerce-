import { faker } from "@faker-js/faker";

export const generateUser = () => {
  return {
    username: faker.internet.email(),
    password: faker.internet.password(),
  };
};
