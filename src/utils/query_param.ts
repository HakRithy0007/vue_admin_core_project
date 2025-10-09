import type {
  PagingOptions,
  FilterOptions,
  SortOptions,
} from "@/types/pagination_type";

export const buildQueryParams = (
  pagingOptions: PagingOptions,
  filters?: FilterOptions[],
  sort?: SortOptions
): Record<string, any> => {
  const params: Record<string, any> = {
    "paging_options[page]": pagingOptions.page,
    "paging_options[per_page]": pagingOptions.per_page,
  };

  if (filters) {
    filters.forEach((filter, index) => {
      params[`filters[${index}][property]`] = filter.property;
      params[`filters[${index}][value]`] = filter.value;
    });
  }

  if (sort && sort.property && sort.direction) {
    params["sort[property]"] = sort.property;
    params["sort[direction]"] = sort.direction;
  }

  return params;
};
