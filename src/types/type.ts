export interface RegisterPayload {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  profile_image?: File;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  profile_image_url: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
export interface Product {
  id: number;
  name: string;
  image_url: string;
  price: number;
  created_at: string;
  updated_at: string;
}
export interface ProductUpdatePayload {
  name: string ;
  image?: File ;
  price: string;
}
export interface ProductPayload {
  name: string;
  image: File;
  price: string;
}

export type ProductFormProps = {
  initialValues?: {
    name: string;
    price: string;
    imageUrl?: string; 
  };
  errors: { [key: string]: string[] };
  isSubmitting: boolean;
  onSubmit: (form: {
    name: string;
    price: string;
    image?: File;
  }) => void;
  submitLabel?: string;
};