import { getBooksByCategoryPromise } from './functions';
import { IBook, IPerson, IAuthor } from './interfaces';

// 05.05.01
type TPersonBook = IBook & IPerson;
// 05.05.03
type TBookOrUndefined = IBook | undefined;
// 04.05.01
type TBookProperties = keyof IBook;

type TUpdatedBook = Partial<IBook>;

type TBookRequiredFields = Required<IBook>;

export type TAuthorWoEmail = Omit<IAuthor, 'email'>;

type TCreateCustomerFunctionType = (name: string, age?: number, city?: string) => void;

export type fn = (p1: string, p2: number, p3: boolean) => symbol;

export type Unpromisify<T> = T extends Promise<infer R> ? R : never;

export type res = ReturnType<typeof getBooksByCategoryPromise>

export type PromiseValueType = Unpromisify<res>

export { TBookOrUndefined, TBookProperties, TPersonBook, TUpdatedBook, TBookRequiredFields, TCreateCustomerFunctionType };
