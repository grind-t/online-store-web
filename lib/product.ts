interface Product {
  img: string;
  options: string[][];
  price: number;
}

const productConverter = {
  toFirestore: (product: Product) => {
    const options = product.options.map((group) => group.join('; '));
    return {
      img: product.img,
      options: options,
      price: product.price,
    };
  },
  fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot) => {
    const data = snapshot.data();
    const options = (<string[]>data.options).map((group) =>
      group.split(';').map((option) => option.trim())
    );
    return {
      img: data.img,
      options,
      price: data.price,
    };
  },
};

export { productConverter };
export type { Product };
