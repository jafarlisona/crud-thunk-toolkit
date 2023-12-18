import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "users/fetchProducts",
  async () => {
    const response = await fetch("https://northwind.vercel.app/api/categories");
    const data = await response.json();
    return data;
  }
);
export const postProducts = createAsyncThunk(
  "users/postProducts",
  async (product) => {
    const response = await fetch(
      "https://northwind.vercel.app/api/categories",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      }
    );
    const data = await response.json();
    return data;
  }
);
export const delByIdProducts = createAsyncThunk(
  "users/delByIdProducts",
  async (id) => {
    const response = await fetch(
      "https://northwind.vercel.app/api/categories/" + id,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return { data, id };
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    value: [],
    isLoading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.value = action.payload;
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    //post
    builder.addCase(postProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.value.push(action.payload);
    });
    builder.addCase(postProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    //del
    builder.addCase(delByIdProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.value = state.value.filter((x) => x.id !== action.payload.id);
    });
    builder.addCase(delByIdProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(delByIdProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default productSlice.reducer;
