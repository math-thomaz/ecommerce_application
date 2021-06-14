interface ICreateProductDTO {
  id?: string;
  category_id: string;
  name: string;
  SKU: string;
  bar_code: string;
  platform: string;
  genre: string;
  price: number;
  quantity: number;
  description: string;
}

export { ICreateProductDTO };
