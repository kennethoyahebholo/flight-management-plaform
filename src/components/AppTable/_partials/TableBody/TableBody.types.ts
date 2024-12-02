import { ReactNode } from 'react';

import { ContentType } from '../../AppTable.types';

export interface ITableBody {
  allowKeyArr: string[];
  tableIndex: number;
  content: ContentType;
  hasOnclick?: (rowData: ContentType) => void;
  actionButton?: ReactNode;
  handleActionButtonClick?: (id: string) => void;
  hasActionButton?: boolean;
}
