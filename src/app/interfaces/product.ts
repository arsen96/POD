import { Category } from "./category";

export interface Product {
    id:number
    title:string;
    price:number;
    description?:string;
    created_at?:Date;
    updated_at?:Date;
    size?:string;
    colour?:string;
    category:Array<Category>
    btn:string
    img:string;
    status?:string
}
