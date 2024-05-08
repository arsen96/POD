import { Product } from "./product";

export interface Category{
    id:number;
    name:string;
    products:Array<Partial<Product>>
}