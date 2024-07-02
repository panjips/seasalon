export interface Branch {
  id?: string;
  name: string;
  location: string;
  open_at: string;
  close_at: string;
}

export interface Service {
  id?: string;
  name: string;
  duration: string;
  branch_id: string;
  Branch?: Branch;
}

export interface Review {
  id?: string;
  name: string;
  rating: number;
  comment: string;
}

export interface Reservation {
  id?: string;
  name: string;
  phone_number: string;
  datetime: string;
  service_id?: string;
  branch_id?: string;
  user_id?: string;
}
