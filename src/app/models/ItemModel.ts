export interface ItemsObject{
    id: number;
    name: string;
    value: number;
    owner_Id: string;
    toSale: boolean;
    description: string;
    imageUrl:string;
    player?: any;
    offer_Items?: any;
}