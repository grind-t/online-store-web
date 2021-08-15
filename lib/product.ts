interface ProductImage {
  url: string;
  alt?: string;
}

interface ProductPrice {
  value: number;
  currency: 'RUB';
}

interface ProductOption {
  name: string;
  values: string[];
}

interface ProductVariant {
  image: ProductImage;
  price: ProductPrice;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  image?: ProductImage;
  price?: ProductPrice;
  options?: ProductOption[];
  variants: Record<string, ProductVariant>;
}

const productConverter: FirebaseFirestore.FirestoreDataConverter<Product> = {
  toFirestore: (product: Product) => {
    const { id, ...rest } = product;
    return rest;
  },
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot) => {
    const product = { id: snap.id, ...snap.data() } as Product;
    // Populate variants with base product image and price.
    Object.values(product.variants).forEach((v) => {
      v.image = v.image ?? product.image;
      v.price = v.price ?? product.price;
    });
    return product;
  },
};

export { productConverter };
export type {
  Product,
  ProductVariant,
  ProductOption,
  ProductPrice,
  ProductImage,
};
