export interface Sound {
  icon: React.ReactNode;
  id: string;
  label: string;
  src: string;
}

export type 音效 = Array<Sound>;

export interface Category {
  icon: React.ReactNode;
  id: string;
  sounds: 音效;
  title: string;
}

export type Categories = Array<Category>;
