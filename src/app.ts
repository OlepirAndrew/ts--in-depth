/* Compiled with --strictNullChecks */
/* eslint-disable no-redeclare */

import * as Interfaces from '../NamespaceDemo/interfaces';
import * as Types from '../NamespaceDemo/types';
import { ECategory } from '../NamespaceDemo/enums';

import {
    logFirstAvailable,
    getAllBooks,
    createCustomer,
    getBookById,
    getCheckoutBooks,
    getTitles,
    getBookTitlesByCategory,
    logBookTitles,
    calcTotalPages,
    createCustomerID,
    getBookAuthorByIndex,
    bookTitleTransform,
    printBook,
    getProperty,
    printRefBook,
    getBookByAuthor,
    getBooksByCategory,
    logCategorySearch,
    getBooksByCategoryPromise,
    logSearchResults
} from '../NamespaceDemo/functions';

import { UniversityLibrarian, Reader, Shelf, RefBook } from './classes';
import type { Library } from './classes';
import { TBookRequiredFields, TUpdatedBook, TCreateCustomerFunctionType } from '../NamespaceDemo/types';
// ===============

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string): void {
    const elt: HTMLElement = document.getElementById(divName);
    if (typeof elt === 'object') {
        elt.innerText = `Hello from ${name}`;
    }
}

// console.log(getAllBooks());
logFirstAvailable(getAllBooks());
// console.log(logBookTitles(getBookTitlesByCategory(ECategory.JavaScript)));
// console.log(getBookAuthorByIndex(1));
// console.log(calcTotalPages());

// 03.01.02
const myId: string = createCustomerID('Ann', 10);
// console.log(myId);

// 03.01.03
let idGenerator: (customerName: string, id: number) => string;
idGenerator = (customerName: string, id: number) => `${customerName}-${id}`;
idGenerator = createCustomerID;
// console.log(idGenerator('Boris', 20));
createCustomer('vasya', 33, 'kharkiv');
const bookById = getBookById(2);
// console.log(bookById);
const myBooks = getCheckoutBooks('Vasya', 2, 3, 4);
// console.log(myBooks);
// 03.03.03
const checkedOutBooks = getTitles('Liang Yuxian Eugene');
// console.log(checkedOutBooks);
// console.log(bookTitleTransform(checkedOutBooks[0]));
// 04.01.05 / 04.01.08
const myBook: Interfaces.IBook = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: ECategory.CSS,
    pages: 200,
    markDamaged: (reason: string) => `Damaged: ${reason}`
};

myBook.markDamaged('missing back cover');
// 04.01.06
printBook(myBook);

// 04.02.03
const logDamage: Interfaces.Logger = (reason: string) => `Damaged ${reason}`;

// 04.03.04
const favoriteAuthor: Interfaces.IAuthor = {
    name: 'Volodimir',
    email: 'volodimir@gmail.com',
    numBooksPublished: 100
};

// 04.05.03
// console.log(getProperty(myBook, 'title'));
// console.log(getProperty(myBook, 'markDamaged'));
// console.log(getProperty(myBook, 'isbn'));

// 05.01.02
// const ref = new ReferenceItem(999, 'Title 2021', 2021);
// ref.publisher = 'setNewTitle';
// console.log(ref.publisher);
// console.log(ref);
// console.log(ref.getId());
// ref.printItem();

// 05.02.02
const refBook = new RefBook(99, 'title', 2020, 9,);
refBook.printItem();
// console.log(refBook);
refBook.abstractCitation();


// 05.04.02
const favoriteLibrarian: Interfaces.ILibrarian = new UniversityLibrarian();
favoriteLibrarian.name = 'Franky';
favoriteLibrarian.assistCustomer('Bob');

// 05.05.02
const PersonalBook: Types.TPersonBook = {
    name: 'Franky',
    email: 'franky@email.com',
    id: 1,
    category: ECategory.Angular,
    available: true,
    author: 'Franky ForeFinger',
    title: 'someTitle'
};


// 06.05
const flag = true

if (flag) {
    import('./classes').then(module => {
        const reader = new module.Reader()
        reader.name = 'Anna'
        reader.take(getAllBooks()[0])
        console.log(reader)
    })
}

// 06.06.05
const library: Library = {
    id: 1,
    name: 'Name',
    address: 'Address'
};

// 07.01.04
const inventory: Interfaces.IBook[] = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: ECategory.Software },
    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: ECategory.Software },
    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: ECategory.Software },
    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: ECategory.Software }
];

// 07.01.05
// const result: Interfaces.IBook[] = purge<Interfaces.IBook>(inventory);
// console.log(result);

// 07.02.06
const bookShelf = new Shelf<Interfaces.IBook>();
inventory.forEach((book: Interfaces.IBook) => bookShelf.add(book));
console.log(bookShelf.getFirst());
// 07.02.07
const magazines: Interfaces.IMagazine[] = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },
    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
    { title: 'Five Points', publisher: 'GSU' }
];
// 07.02.07
const magazineShelf = new Shelf<Interfaces.IMagazine>();
magazines.forEach((mag: Interfaces.IMagazine) => magazineShelf.add(mag));
// console.log(magazineShelf.getFirst());

// 07.03
magazineShelf.printTitles();
// 07.03.05
console.log(magazineShelf.find('Five Points'));
// 07.03.06
getProperty(magazines[0], 'title');
// 07.04.02
const bookRequiredFields: TBookRequiredFields = {
    id: 111,
    category: ECategory.CSS,
    available: true,
    author: 'Author',
    title: 'Title',
    pages: 1000,
    markDamaged: null
};
// 07.04.02
const updatedBook: TUpdatedBook = { id: 2 };
// 07.04.07
const params: Parameters<TCreateCustomerFunctionType> = ['Anna'];
createCustomer(...params);
// 08.01.03
const lib = new UniversityLibrarian();
lib.teachCommunity = null
lib.name = 'qwerty';
lib['printLibrarian']();

//06.03

printRefBook(refBook);

const e = new RefBook(99, 'title', 2020, 9,);
e.copies = 100;
// e.copies = 0;
console.log('start')
// getBooksByCategory(ECategory.JavaScript, logCategorySearch)
// getBooksByCategoryPromise(ECategory.JavaScript)
//     .then(res => {
//         console.log(res);
//         return res.length
//     }
//     )
//     .then(len => console.log(len))
//     .catch(err => console.log(err))
logSearchResults(ECategory.JavaScript).catch(err => console.log(err));
console.log('finish')

