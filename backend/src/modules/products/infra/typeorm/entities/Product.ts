import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { OrdersProducts } from "@modules/orders/infra/typeorm/entities/OrdersProducts";

import { Category } from "./Category";

@Entity("products")
class Product {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id: string;

  @Column()
  SKU: string;

  @Column()
  bar_code: string;

  @Column()
  name: string;

  @Column()
  platform: string;

  @Column()
  genre: string;

  @Column("decimal")
  price: number;

  @Column("int")
  quantity: number;

  @Column()
  available: boolean;

  @Column()
  description: string;

  @OneToMany(() => OrdersProducts, (order_products) => order_products.product)
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}

export { Product };
