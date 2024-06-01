import { Product } from "./product";

export interface Category{
    id:number;
    name:string
    description:string;
    main:boolean;
    products:Array<Product>
    numberTotal:number;
    slug:string,
    parentId:number;
    show?:boolean
    widgets:Array<Category>;
}