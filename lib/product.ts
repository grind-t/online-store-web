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
  id: string;
  options: Record<string, string>;
  image?: ProductImage;
  price?: ProductPrice;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  image: ProductImage;
  price: ProductPrice;
  options?: ProductOption[];
  variants: ProductVariant[];
}

function getVariant(
  variants: ProductVariant[],
  selectedOptions?: Record<string, string>
): ProductVariant {
  if (!selectedOptions) return variants[0];
  const keys = Object.keys(selectedOptions);
  return variants.find((variant) =>
    keys.every((key) => selectedOptions[key] === variant.options[key])
  );
}

function selectInitialOptions(
  options?: ProductOption[]
): Record<string, string> | null {
  if (!options) return null;
  let record = {};
  for (const option of options) record[option.name] = option.values[0];
  return record;
}

async function getVariantsFromFirestore(
  productDocRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
): Promise<ProductVariant[]> {
  const snap = await productDocRef.collection('variants').get();
  const variants = new Array(snap.docs.length);
  for (let i = 0; i < variants.length; i++) {
    const doc = snap.docs[i];
    variants[i] = doc.data();
    variants[i].id = doc.id;
  }
  return variants;
}

async function getProductsFromFirestore(
  db: FirebaseFirestore.Firestore
): Promise<Product[]> {
  const snap = await db.collection('products').get();
  const products = new Array(snap.docs.length);
  for (let i = 0; i < products.length; i++) {
    const doc = snap.docs[i];
    products[i] = doc.data();
    products[i].id = doc.id;
    products[i].variants = await getVariantsFromFirestore(doc.ref);
  }
  return products;
}

export { getVariant, selectInitialOptions, getProductsFromFirestore };
export type {
  Product,
  ProductVariant,
  ProductOption,
  ProductPrice,
  ProductImage,
};
