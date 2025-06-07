import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'firstChar'
})
export class FirstCharPipe implements PipeTransform {

    transform(value: string): string {
        if (value == null || value.length === 0) { return ''; }
        return value[0];
    }

}
