export interface PagingOptions {
  page: number;
  per_page: number;
}

export interface FilterOptions {
  property: string;
  value: string | number;
}

export interface SortOptions {
  property: string;
  direction: "asc" | "desc";
}

export interface FetchParams {
  pagingOptions: PagingOptions;
  filters?: FilterOptions[];
  sort?: SortOptions;
}
