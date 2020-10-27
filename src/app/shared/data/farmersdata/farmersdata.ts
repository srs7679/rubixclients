import {Product} from './farmersproduct';
import {Phones} from './phones';
export class Farmersdata {
    farmerId:number;
    fullName:String;
    address:String;
    pickupAddress:String;
    place:String;
    deliveryfrequency:String;
    phones:Phones[];
    contactperson:String;
    landareasqft:String;
    preferredlanguage:String;
    isActive:boolean;
    isPriorityUser:boolean;
    assignedzone:String;
    rating:number;
    closedorders:number;
    createddate:String;
    updateddate:String;
    products:Product[];
    
}