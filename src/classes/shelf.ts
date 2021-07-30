import { IShelfItem } from '../../NamespaceDemo/interfaces';


export default class Shelf<T extends IShelfItem> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getFirst(): T {
        return this.items[0];
    }
    // 07.03.01
    find(title: string): T {
        return this.items.find(item => item.title === title);
    }

    printTitles(): void {
        this.items.forEach((item) => console.log(item.title));
    }
}
