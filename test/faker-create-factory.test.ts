import { createFactory } from '../src/faker-create-factory';

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

  it('should override the schema option if needed', () => {
    const customName = `Overridden-${Date.now()}`;
    const gen = Schema.generate({ username: customName });
    expect(gen.username).toBe(customName);
  });

  it('should override with a function callback', () => {
    const customAge = Date.now();

    const gen1 = Schema.generate(() => ({ age: customAge }));
    const gen2 = Schema.generate({ age: customAge });

    expect(gen1.age).toBe(customAge);
    expect(gen2.age).toBe(customAge);
  });

  it('should generate different overrides', () => {
    const [gen1, gen2] = Schema.generateMany(2, () => ({
      age: Math.random()
    }));

    expect(gen1.age !== gen2.age).toBeTruthy();
  });

  it('should have an index parameter in the generate many callback', () => {
    const [gen1, gen2] = Schema.generateMany(2, (_, index) => ({
      age: index
    }));

    expect(gen1).toHaveProperty('age', 0);
    expect(gen2).toHaveProperty('age', 1);
  });

  it('should have an index parameter in create factory', () => {
    const CustomSchema = createFactory<{ i: number }>((_, index) => ({
      i: index
    }));

    const gen = CustomSchema.generateMany(5);
    expect(gen).toEqual(Array.from({ length: 5 }).map((_, i) => ({ i })));
  });
});
