export interface IPagination {
  count: number;
  pageSize: number;
  setPage: any;
  page: number;
  limitValue?: string;
  setLimitValue?: any;
}
