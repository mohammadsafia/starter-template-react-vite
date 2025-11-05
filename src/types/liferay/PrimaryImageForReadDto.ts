export type PrimaryImageForReadDto = {
  id: number;
  link: {
    href: string;
    label: string;
  };
  name: string;
  type?: 'image' | 'video';
};
