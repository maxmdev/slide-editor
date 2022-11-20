export interface ISlideItem {
  id: string;
  icon: string;
  title: string;
  description?: string;
}

export interface ISlide {
  id: string;
  items: ISlideItem[];
  title?: string;
}
