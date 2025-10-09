import instance from "@/utils/axios";
import type { User, UserResponse } from "@/types/user_type";
import type { FetchParams } from "@/types/pagination_type";
import { buildQueryParams } from "@/utils/query_param";

export const fetchUsers = async ({
  pagingOptions,
  filters,
  sort,
}: FetchParams) => {
  try {
    const params = buildQueryParams(pagingOptions, filters, sort);

    const response = await instance.get<UserResponse>("/users/", { params });

    return {
      data: response.data.data.users,
      total: response.data.total,
      page: response.data.page,
      per_page: response.data.per_page,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error fetching users: " + error.message);
    } else {
      throw new Error("Error fetching users");
    }
  }
};

export const updateUser = async (userID: string, userData: Partial<User>) => {
  
  try {
    const response = await instance.put(`/users/update/${userID}`, userData);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error updating user: " + error.message);
    } else {
      throw new Error("Error updating user");
    }
  }
};
