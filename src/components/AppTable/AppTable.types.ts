import { ReactNode } from 'react';

export interface ContentType {
  capacity: number;
  code: string;
  departureDate: string;
  id: string;
  img: string;
  status: string;
}

export interface IAppTableComp {
  content: ContentType[];
  allColumn: string[];
  tableTitles: Record<string, string>;
  page?: number;
  pageSize: number;
  count?: number;
  setPage: (pageNum: number) => void;
  loader?: boolean;
  hasOnclick?: (rowData: {
    capacity: number;
    code: string;
    departureDate: string;
    id: string;
    img: string;
    status: string;
  }) => void;
  handleActionButtonClick?: (id: string) => void;
  hasActionButton?: boolean;
  actionButton?: ReactNode;
}
