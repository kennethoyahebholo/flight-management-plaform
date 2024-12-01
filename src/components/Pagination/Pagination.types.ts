export interface IPagination {
  count: number;
  pageSize: number;
  setPage: (pageNum: number) => void;
  page: number;
}
