import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

if (process.env.NODE_ENV === 'development') {
  const bucket = admin.storage().bucket();
  bucket
    .upload('./public/images/product-placeholder.png', { public: true })
    .then((response) => response[0].getMetadata())
    .then((response) => response[0].mediaLink)
    .then((image) => {
      const product = {
        name: 'Playstation Plus',
        description: 'Описание товара',
        image,
        options: [
          { name: 'Формат', values: ['Электронный'] },
          {
            name: 'Длительность',
            values: ['1 месяц', '3 месяца', '12 месяцев'],
          },
        ],
        variants: {
          sample1: {
            options: {
              Формат: 'Электронный',
              Длительность: '1 месяц',
            },
            price: 10000,
            quantity: 1,
          },
          sample2: {
            options: {
              Формат: 'Электронный',
              Длительность: '3 месяца',
            },
            price: 20000,
            quantity: 1,
          },
        },
      };
      admin.firestore().collection('products').add(product);
    })
    .catch(console.error);
}

export default admin;
