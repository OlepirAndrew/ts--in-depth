// 06.01
namespace Utility {
    export namespace Feez {
        export function calculateLateFee(daysLate: number): number {
            return daysLate * 0.25;
        }
    }
    export function maxBooksAllowed(age: number): number {
        return age < 12 ? 4 : 10;
    }

    function privateFunc(): void {
        console.log('This is private function');
    }
}
