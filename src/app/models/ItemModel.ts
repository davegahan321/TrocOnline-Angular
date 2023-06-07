export interface ItemsObject{
    id: number;
    name: string;
    value: number;
    owner_Id: number;
    toSale: boolean;
    description: string;
    player?: any;
    offer_Items?: any;
}