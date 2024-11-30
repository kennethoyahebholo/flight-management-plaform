import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IDashboardSlice {
  isShowDashboardModal: boolean;
  activeDashboardModal: 'logoutModal' | '';
  activePage: string;
  isShowLogOutModal: boolean;
}

const initialState: IDashboardSlice = {
  isShowDashboardModal: false,
  activeDashboardModal: '',
  activePage: '',
  isShowLogOutModal: false
};

export const DashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setIsShowDashboardModal: (state: IDashboardSlice, action: PayloadAction<boolean>) => {
      const { payload } = action;
      state.isShowDashboardModal = payload;
    },
    setActiveDashboardModal: (
      state: IDashboardSlice,
      action: PayloadAction<'logoutModal' | ''>
    ) => {
      const { payload } = action;
      state.activeDashboardModal = payload;
    },
    setActivePage: (state: IDashboardSlice, action: PayloadAction<string>) => {
      const { payload } = action;
      state.activePage = payload;
    },
    setIsShowLogOutModal: (state: IDashboardSlice, action: PayloadAction<boolean>) => {
      const { payload } = action;
      state.isShowLogOutModal = payload;
    }
  }
});

export default DashboardSlice.reducer;

export const {
  setIsShowDashboardModal,
  setActiveDashboardModal,
  setActivePage,
  setIsShowLogOutModal
} = DashboardSlice.actions;
