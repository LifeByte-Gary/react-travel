import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "i18next";

interface LangeageState {
  currentLanguage: "zh" | "en";
  languageList: { code: string; name: string }[];
}

const initialState: LangeageState = {
  currentLanguage: "zh",
  languageList: [
    { name: "中文", code: "zh" },
    { name: "English", code: "en" },
  ],
};

export const changeCurrentLanguage = createAsyncThunk(
  "language/changeCurrentLanguage",
  async (toLanguage: "zh" | "en", thunkAPI) => {
    await i18n.changeLanguage(toLanguage);

    return toLanguage;
  }
);

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    addLanguage: (
      state,
      action: PayloadAction<{ code: string; name: string }>
    ) => {
      state.languageList.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeCurrentLanguage.fulfilled, (state, { payload }) => {
      state.currentLanguage = payload;
    });
  },
});
