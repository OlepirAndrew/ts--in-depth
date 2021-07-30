import * as Interfaces from './interfaces';
import * as Types from '../NamespaceDemo/types';
import { ECategory } from './enums';
import Encyclopedia from '../src/classes/enciclopedia';
import RefBook from '../src/classes/enciclopedia';
import { ILibMgrCallback } from './interfaces';

/* eslint-disable no-redeclare */
// O6.02.05
// 04.01.02
export function getAllBooks(): readonly Interfaces.IBook[] {

    const allBooksArr: readonly Interfaces.IBook[] = [
        { id: 2, category: ECategory.JavaScript, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false },
        { id: 1, category: ECategory.JavaScript, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true },
        { id: 3, category: ECategory.CSS, title: 'CSS Secrets', author: 'Lea Verou', available: true },
        { id: 4, category: ECategory.JavaScript, title: 'Mastering JavaScript Object-Oriented Programming', author: 'Andrea Chiarelli', available: true }
    ];

    return allBooksArr;
}

export function getBookAvailable(available: boolean) {
    return (book: { available: boolean }) => book.available === available;
}

// 02. 01. 02.
export function logFirstAvailable(books: readonly Interfaces.IBook[] = getAllBooks()): void {
    const availableBook: Interfaces.IBook = books.find(getBookAvailable(true));

    // console.log(`Books: ${books.length}, available: ${availableBook.title}`);
}

// 02. 01. 06.
export function getBookTitlesByCategory(category: ECategory = ECategory.JavaScript): Array<string> {
    return getAllBooks()
        .filter((book: { category: ECategory }) => book.category === category)
        .map((book: { title: string }) => book.title);
}

// 02. 01. 07.
export function logBookTitles(arr: string[]): void {
    arr.forEach((bookName: string) => console.log(bookName));
}

// 02. 01. 08.
export function getBookAuthorByIndex(index: number): [string, string] {
    const books = getAllBooks();
    const { title, author } = books[index];

    return [title, author];
}

// 02. 01. 09.
export function calcTotalPages(): bigint {
    const lib = <const>[
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
    ];

    return lib.reduce((pre: bigint, cur: { books: number; avgPagesPerBook: number }) => {
        return pre + BigInt(cur.books) * BigInt(cur.avgPagesPerBook);
    }, BigInt(0));

}

// 03.01.01
export function createCustomerID(customerName: string, id: number): string {
    return `${customerName}-${id}`;
}

// 03.02.01
export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`customer name:${name}`);
    if (age) console.log(`customer age:${age}`);
    if (city) console.log(`customer age:${city}`);
}

// 03.02.04 / 04.01.03
export function getBookById(bookId: number): Types.TBookOrUndefined {
    return getAllBooks().find(book => book.id === bookId);
}

// 03.02.05
const getTitlesBook = (book: { title: string }) => book.title;
export function getCheckoutBooks(customer: string, ...booksId: number[]): string[] {
    console.log(customer);
    const availableBooks = booksId.map(getBookById).filter(getBookAvailable(true)).map(getTitlesBook);

    return availableBooks.length ? availableBooks : ['no books available'];
}

// 03.03.02
export function getBookByAuthor(author: string): (book) => boolean {
    return (book: Interfaces.IBook): boolean => book.author === author;
}

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];

export function getTitles(...args: any[]): string[] {
    let availableBooks = ['no books available'];
    const books = getAllBooks();

    if (args.length === 1 && typeof args[0] === 'string') {
        availableBooks = books.filter(getBookByAuthor(args[0])).map(getTitlesBook);
    } else if (args.length && typeof args[0] === 'boolean') {
        availableBooks = books.filter(getBookAvailable(args[0])).map(getTitlesBook);
    } else if (args.length === 2) {
        const [id, available] = args;
        if (typeof id === 'number' && typeof available === 'boolean') {
            availableBooks = [getBookById(args[0])].filter(getBookAvailable(args[1])).map(getTitlesBook);
        }
    }

    return availableBooks;
}

// 03.03.04
export function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('value should have been a string');
    }
}

export function assertRefBookInstance(condition: any): asserts condition {
    if (!condition) {
        throw new Error('It is not instance of RefBook');
    }
}

// 03.04.02
export function bookTitleTransform(bookTitle: any): string {
    assertStringValue(bookTitle);

    return [...bookTitle].reverse().join('');
}

// 04.01.04
export function printBook(book: Interfaces.IBook): void {
    console.log(`${book.title} by ${book.author}`);
}

// 04.05.02
export function getProperty<TObj, TKey extends keyof TObj>(obj: TObj, property: Types.TBookProperties): TObj[TKey] | string {
    return typeof obj[property] === 'function' ? (obj[property] as Function).name : obj[property];
}

// 07.01.01
export function purge<T>(inventory: T[]): T[] {
    return inventory.slice(2);
}

export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);
    data.printItem();
}

export function getBooksByCategory(category: ECategory, callback: ILibMgrCallback) {
    setTimeout(() => {
        try {
            const titles = getBookTitlesByCategory(category);
            if (titles.length > 0) {
                callback(null, titles)
            } else {
                throw new Error('No books found')
            }
        } catch (error) {
            console.log(error, null)
        }
    }, 2000)
}

export function logCategorySearch(err: Error, titles: string[]): void {
    console.log(err?.message || titles)
}

export function getBooksByCategoryPromise(category: ECategory): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
        setTimeout(() => {
            try {
                const titles = getBookTitlesByCategory(category);
                if (titles.length > 0) {
                    resolve(titles)
                } else {
                    reject('No books found')
                }
            } catch (error) {
                console.log(error, null)
            }
        }, 2000)
    })
}

export async function logSearchResults(category: ECategory): Promise<string[]> {
    const titles = await getBooksByCategoryPromise(category); return
    return titles;
}



