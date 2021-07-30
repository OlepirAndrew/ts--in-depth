// 08.01.01 prevent add new properties
export function sealed(value: string) {
    return function (constr: Function): void {
        console.log(`Sealing the constructor ${value}`);
        Object.seal(constr);
        Object.seal(constr.prototype);
    };
}
// 08.02.06
export function logger<TFunction extends Function>(constr: Function): TFunction {
    const newConstructor: Function = function () {
        console.log('Creating new instance');
        console.log(constr.name);
        this.age = 30;
    };

    newConstructor.prototype = Object.create(constr.prototype);
    newConstructor.prototype.printLibrarian = function (): void {
        console.log(`Librarian name: ${this.name}, Librarian age: ${this.age}`);
    };

    return newConstructor as TFunction;
}


export function writable(isWritable: boolean) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        console.log('Decorator writable is called');
        descriptor.writable = isWritable;

        return descriptor;
    };
}

export function timeout(ms: number) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value

        descriptor.value = function (...args: any[]) {
            if (window.confirm('Are you sure?')) {
                setTimeout(() => {
                    originalMethod.apply(this, args)
                }, ms)
            }
        }
        return descriptor;
    };
}

export function logParameter(target: any, methodName: string, index: number) {
    const key = `${methodName}decor_params_indexes`

    Array.isArray(target[key])
        ? target[key].push(index)
        : target[key] = [index]
}

export function logMethod(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const key = `${methodName}decor_params_indexes`

    descriptor.value = function (...args: any) {
        const indexes = target[key];
        if (Array.isArray(indexes)) {
            args.forEach((arg, index) => {
                if (indexes.includes(index)) {
                    console.log(`Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`)
                }
            })
        }
        return originalMethod.apply(this.args)
    }
    return descriptor
}

function makeProperty<T>(prototype: any, propertyName: string, getTransformer: (value: any) => T, setTransformer: (value: any) => T) {
    const values = new Map<any, T>();
    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(
                this, propertyName, {
                get() {
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true
            }
            );
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true
    }
    );
}

export function format(pref: string = 'Mr./Mrs.') {
    return function (target: any, propertyName: string) {
        makeProperty(
            target,
            propertyName,
            value => `${pref} ${value}`,
            value => value
        )
    }
}

export function positiveInteger(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalSet = descriptor.set;

    descriptor.set = function (value: number) {
        if (value < 1 || !Number.isInteger(value)) {
            throw new Error('Invalid value')
        }

        originalSet.call(this, value)
    }
    return descriptor;
}

