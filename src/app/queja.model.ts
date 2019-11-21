export interface Queja {
  _id: string;
  uId: string;
  placeEvent: string;
  description: string;
  status: string;
  userRate: number;
  answers: number[];
  finalComment: string;
  registerDate: Date;
}
