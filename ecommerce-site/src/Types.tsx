export interface IProduct {
  id: number;
  category: string;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
  hasPrime: boolean;
}

export interface IProductFeedProps {
  products: IProduct[];
}

export interface IProductProps {
  product: IProduct;
}
