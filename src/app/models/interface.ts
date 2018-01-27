export interface Filter {
    id: number;
    name: string;
    type: string;
}

export interface Product {
    id: number;
    name: string;
    price: string;
    available: boolean;
    Best_Seller: boolean;
    categories: number[];
    img: string;
    description: string;
}
