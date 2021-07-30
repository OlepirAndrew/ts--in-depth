// 05.01.01 05.03.01 06.04.01
export abstract class ReferenceItem {
    // title: string;
    // year: number;
    private _publisher: string;
    // 05.01.05
    readonly #id: number;
    // 05.01.06
    static department: string = 'department';

    // constructor(
    //     newTitle: string,
    //     newYear: number
    // ) {
    //     console.log('Creating a new ReferenceItem...');
    //     this.title = newTitle;
    //     this.year = newYear;
    // }

    // 05.01.03
    protected constructor(
        id: number,
        public title: string,
        protected year: number,
    ) {
        console.log('Creating a new ReferenceItem...');
        this.#id = id;
    }

    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        // 05.01.06
        console.log(ReferenceItem.department);
    }

    // 05.01.04
    get publisher(): string {
        return this._publisher.toUpperCase();
    }

    set publisher(newPublisher: string){
        this._publisher = newPublisher;
    }

    getId(): number {
        return this.#id;
    }

    abstract abstractCitation(): void;
}
