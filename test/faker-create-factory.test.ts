import { createFactory } from '../faker-create-factory';

const getType = (v: any) => typeof v;

describe('faker create factory', () => {
  interface Model {
    username: string;
    age: number;
  }

  const Schema = createFactory<Model>((faker) => ({
    username: faker.internet.userName(),
    age: faker.random.number()
  }));

  it('it should generate a schema', () => {
    const gen = Schema.generate();

    expect(Object.keys(gen)).toEqual(['username', 'age']);
    expect(Object.values(gen).map(getType)).toEqual(['string', 'number']);
  });

  it('should generate many schemas', () => {
    const gen = Schema.generateMany(2);

    expect(gen.map(Object.keys)).toEqual([
      ['username', 'age'],
      ['username', 'age']
    ]);

    expect(gen.map((val) => Object.values(val).map(getType))).toEqual([
      ['string', 'number'],
      ['string', 'number']
    ]);
  });
});
