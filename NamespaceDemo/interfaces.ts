import { ECategory } from './enums';
// 06.02
// 04.01.07 /04.01.09
interface IBook {
    id: number;
    category: ECategory;
    available: boolean;
    author: string;
    title: string;
    pages?: number;
    // markDamaged?: (reason) => void;
    markDamaged?: DamageLogger;
}

// 04. 02. 01.
interface DamageLogger {
    (reason: string): string;
}

// 04.03.01
interface IPerson {
    name: string;
    email: string;
}

// 04.03.02
interface IAuthor extends IPerson {
    numBooksPublished: number;
}

// 04.03.03
interface ILibrarian extends IPerson {
    department: string;
    assistCustomer: (custName: string) => void;
}

// 07.02

interface IMagazine {
    title: string;
    publisher: string;
}

interface IShelfItem {
    title: string;
}

interface ILibMgrCallback {
    (err: Error, title: string[]): void;
}

export { IBook, IAuthor, ILibrarian, IPerson, DamageLogger as Logger, IMagazine, IShelfItem, ILibMgrCallback };
