import { DataTableParams } from '../components/types';


export class DataTableResource<T> {

    constructor(private items: T[]) {}

    query(params: DataTableParams, filter?: (item: T, index: number, items: T[]) => boolean): Promise<T[]> {

        let result: T[] = [];
        if (filter) {
            result = this.items.filter(filter);
        } else {
            result = this.items.slice(); // shallow copy to use for sorting instead of changing the original
        }

        if (params.sortBy) {
            result.sort((a, b) => {
                if (typeof a[params.sortBy] === 'string') {
                    return a[params.sortBy].localeCompare(b[params.sortBy]);
                } else {
                    return a[params.sortBy] - b[params.sortBy];
                }
            });
            if (params.sortAsc === false) {
                result.reverse();
            }
        }
        if (params.offset !== undefined) {
            if (params.limit === undefined) {
                result = result.slice(params.offset, result.length);
            } else {
                result = result.slice(params.offset, params.offset + params.limit);
            }
        }
        if (params.searchString!=undefined && params.searchString!=''){
            let temp_result=[];
            for (let row of result){
                let array=objectToArray(row);
                let found=false;
                for (let item of array){
                    if(item.toLowerCase().search(params.searchString.toLowerCase())!=-1){
                        found=true;
                    }
                }
                if(found){
                    temp_result.push(row);
                }
            }
            result=temp_result;
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(result));
        });
    }

    count(): Promise<number> {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.items.length));
        });

    }

    
}

function objectToArray(obj:any):string[]{
    let arr = [];
    let index=0;
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            arr.push(obj[key]);
            index++;
        }
    }
    return arr;
}