import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the user state type
interface UserState {
  monthlyPlan: string;
  weeklyPlan: string;
  phone: string;
  name: string;
  planId: string;
  areaCode: string;
  cohort: string;
  driverId: string;
  userBalance: number;
}

// Initial state
const initialState: UserState = {
  monthlyPlan: '',
  weeklyPlan: '',
  phone: '',
  name: '',
  planId: '',
  areaCode: '',
  cohort: '',
  driverId: '',
  userBalance: 0
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
  },
});

// Export actions and reducer
export const { updateUser } = userSlice.actions;
export default userSlice.reducer;