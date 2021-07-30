import { ReferenceItem } from './referenceItem';
import { positiveInteger, timeout } from './decorators';

// 05.02.01 06.03.01 06.03.02
export default class Encyclopedia extends ReferenceItem {
    private _copies: number;

    @positiveInteger
    get copies(): number {
        return this._copies;
    }

    set copies(value: number) {
        this._copies = value;
    }

    constructor(
        id: number,
        title: string,
        year: number,
        public edition: number,
    ) {
        super(id, title, year,);
    }
    // 05.02.03

    // @timeout(500)
    printItem() {
        super.printItem();
        console.log(`Edition: ${this.edition} ${this.year}`);
    }
    abstractCitation() {
        console.log(` ${this.title} ${this.year}`);
    }
}
