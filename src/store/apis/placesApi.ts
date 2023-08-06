export interface Place {
  id: number;
  title: string;
  imgUrl: string;
  description: string;
  address: string;
  creator: number;
  location: {
    lat: number;
    lng: number;
  };
}
