export interface User {
  id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  phone: string;
  status_id: number;
  created_at: string;
  created_by: number;
  role_id: number;
  user_role_name: string;
  operator: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  status_code: number;
  data: {
    users: User[];
  };
  page: number;
  per_page: number;
  total: number;
}

export interface UserFormData {
  users: Array<{
    phone: string;
    roles: Array<{ id: number; user_role_name: string }>;
    status: Array<{ id: number; name: string }>;
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
    phone_number: string;
    role_id: number;
    status_id: number;
  }>;
}
