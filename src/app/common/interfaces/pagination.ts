export interface QueryParams {
  limit?: number;
  search?: string;
  page: number;
  sort?: string;
  order?: 'desc' | 'asc';
}
