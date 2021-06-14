import { inject, injectable } from "tsyringe";

import { IProductsImagesRepository } from "@modules/products/repositories/IProductsImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  product_id: string;
  images_name: string[];
}

@injectable()
class UploadProductImagesUseCase {
  constructor(
    @inject("ProductsImagesRepository")
    private productsImagesRepository: IProductsImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ product_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.productsImagesRepository.create(product_id, image);
      await this.storageProvider.save(image, "products");
    });
  }
}

export { UploadProductImagesUseCase };
