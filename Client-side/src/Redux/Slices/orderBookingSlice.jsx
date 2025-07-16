import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salesOrder: {}, // full sales order object
  salesOrderName: "", // selected sales order name
  isOpen: false,
  isSaved: false,
  source: "",
};

const selectedSalesOrderSlice = createSlice({
  name: "selectedSalesOrder",
  initialState,
  reducers: {
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
    setIsSaved(state, action) {
      state.isSaved = action.payload;
    },
    setSelectedSalesOrder: (state, action) => {
       state.salesOrder = action.payload.order;
      state.source = action.payload.source;
    },
    setSelectedSalesOrderName: (state, action) => {
      state.salesOrderName = action.payload;
    },
    clearSelectedSalesOrder: (state) => {
      state.salesOrder = null;
      state.salesOrderName = "";
    },
  },
});

export const {
  setSelectedSalesOrder,
  setSelectedSalesOrderName,
  clearSelectedSalesOrder,
  setIsOpen,
  setIsSaved,
} = selectedSalesOrderSlice.actions;

export default selectedSalesOrderSlice.reducer;
