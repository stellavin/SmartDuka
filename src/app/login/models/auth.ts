import { BaseModel } from './../../_bases/models/BaseModel';

export class Auth extends BaseModel {


   constructor (obj: Object) {
       super();
       for (const field in obj) {
           if (obj.hasOwnProperty(field)) {
               this[field] = obj[field];
           }
       }
   }
}
