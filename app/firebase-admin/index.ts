import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

if (process.env.NODE_ENV === 'development') {
  const product = {
    name: 'Playstation Plus',
    description: 'Описание товара',
    image: {
      url: '/images/product-placeholder.png',
      alt: 'TODO',
    },
    options: [
      { name: 'Формат', values: ['Электронный'] },
      { name: 'Длительность', values: ['1 месяц', '3 месяца', '12 месяцев'] },
    ],
    variants: {
      sample1: {
        options: {
          Формат: 'Электронный',
          Длительность: '1 месяц',
        },
        price: 10000,
      },
      sample2: {
        options: {
          Формат: 'Электронный',
          Длительность: '3 месяца',
        },
        price: 20000,
      },
      sample3: {
        options: {
          Формат: 'Электронный',
          Длительность: '12 месяцев',
        },
        price: 30000,
      },
    },
  };
  const db = admin.firestore();
  db.collection('products').add(product);
}

export default admin;
