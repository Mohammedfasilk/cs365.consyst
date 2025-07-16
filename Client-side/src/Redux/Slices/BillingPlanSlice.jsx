    import { createSlice } from "@reduxjs/toolkit";

    const initialState = {
    billingPlan: null,
    billingPlanName: "",
    isOpen: false,
    isSaved: false,
    source: "",
    };

    const billingPlanSlice = createSlice({
    name: "billingPlan",
    initialState,
    reducers: {
        setSelectedBillingPlan: (state, action) => {
        state.billingPlan = action.payload;
        state.source = action.payload.source;
        },
        setSelectedBillingPlanName: (state, action) => {
        state.billingPlanName = action.payload;
        },
        setIsOpen: (state, action) => {
        state.isOpen = action.payload;
        },
        setIsSaved: (state, action) => {
        state.isSaved = action.payload;
        },
        clearSelectedBillingPlan: (state) => {
        state.billingPlan = null;
        state.billingPlanName = "";
        state.source = "";
        },
    },
    });

    export const {
    setSelectedBillingPlan,
    setSelectedBillingPlanName,
    setIsOpen,
    setIsSaved,
    clearSelectedBillingPlan,
    } = billingPlanSlice.actions;

    export default billingPlanSlice.reducer;
