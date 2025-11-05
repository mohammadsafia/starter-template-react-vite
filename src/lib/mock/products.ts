export type MockProduct = {
  id: string;
  name: string;
  price: number;
  category: 'Hardware' | 'Software' | 'Service';
  rating: number; // 1-5
  stock: number;
};

export const mockProducts: MockProduct[] = Array.from({ length: 20 }).map((_, i) => {
  const categories = ['Hardware', 'Software', 'Service'] as const;
  const id = (i + 1).toString();
  return {
    id,
    name: `Product ${id}`,
    price: Math.round((Math.random() * 500 + 20) * 100) / 100,
    category: categories[i % categories.length],
    rating: Math.max(1, Math.min(5, Math.round(Math.random() * 5))),
    stock: Math.floor(Math.random() * 1000),
  };
});


