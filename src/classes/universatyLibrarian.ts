import * as Interfaces from '../../NamespaceDemo/interfaces';
import { format, logger, logMethod, logParameter, sealed, writable } from './decorators';

// 05.04.01
// @sealed('UniversityLibrarian')
// @ts-ignore
@logger

export class UniversityLibrarian implements Interfaces.ILibrarian {
    @format()
    name: string = '';
    email: string;
    department: string;

    // @logMethod
    assistCustomer(@logParameter custName: string) {
        console.log(`${this.name} is assisting ${custName}`);
    }

    @writable(true)
    assistFaculty() {
        console.log('Assisting facult')
    }

    // @writable(false)
    teachCommunity() {
        console.log('Teachnic community')
    }
}
