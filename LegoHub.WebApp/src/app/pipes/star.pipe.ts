import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'star'
})

export class StarPipe implements PipeTransform {
    transform(value: any, args?: any): any {
        var doubleValue = parseFloat(value);
        if(isNaN(doubleValue)) doubleValue = 0;

        if(args){
            var totalStar = parseInt(args);
            if(isNaN(totalStar)) totalStar = 0;
            var unStar = totalStar - Math.round(doubleValue);
            if(unStar < 0) unStar = 0;

            return new Array(unStar);
        } else {
            return new Array(Math.round(doubleValue));
        }
    }
}