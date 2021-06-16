import { User } from "@modules/accounts/infra/typeorm/entities/User";

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface ICreateOrderDTO {
  user: User;
  products: IProduct[];
}

export { ICreateOrderDTO };
