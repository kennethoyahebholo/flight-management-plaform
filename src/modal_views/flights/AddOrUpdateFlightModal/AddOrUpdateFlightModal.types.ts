// import { CreateTenantApiData } from '../../../../screens/Dashboard/Tenants/_partials/TenantsRecord/TenantsRecord.types';

export interface IPropertyOptions {
  id?: string;
  label?: string;
  value?: string;
  unit?: string;
}

export interface IAddOrUpdateFlightModal {
  isShowAddOrUpdateFlightsModal: boolean;
  onClickAwayAddOrUpdateFlightsModal: () => void;
  onCloseAddOrUpdateFlightsModal: () => void;
  //   handleSuccessAction?: any;
  //   setSuccessMessage?: any;
  //   setSelectedPropertyName?: any;
  //   getAllRealtorPropertyPaginatedLoading?: boolean;
  //   transformedData: IPropertyOptions[];
  createOrUpdateFlightApiData: any;
  //   editTenantDetails?: boolean;
  //   handleChangePaymentAccount?: any;
  //   updateTenantLoading?: boolean;
}

interface FileType {
  file: string | null;
  name: string;
}

export interface IFormData {
  code: string;
  capacity: string;
  departureDate: string;
  files: FileType[];
}
