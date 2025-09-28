// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 
//  import { jwtDecode } from "jwt-decode";
// import { notifySuccess } from "../../Utils/Notification";
// import Api from "../../Api/api";
// import axios from "axios";

// const initialState = {
//   currentUser: null,
// };

// export const signUp = createAsyncThunk(
//   "userSlice/signUp",
//   async (userData, thunkAPI) => {
//     try {
//       const response = await Api.post("/auth/signup", userData);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
// export const signIn = createAsyncThunk(
//   "userSlice/signIn",
//   async (userData, thunkAPI) => {
//     try {
//       const formdata = new FormData();
//       formdata.append("email", userData.email);
//       formdata.append("password", userData.password);

//       const response = await axios.post("http://54.235.109.101/auth/login/", formdata);
//       const data = response.data;

//       console.log(data, "response.data");
//       data?.access && notifySuccess("logged in success");

//       return data.access;
//     } catch (error) {
//       console.error("Login error", error);
//       return thunkAPI.rejectWithValue("Login failed");
//     }
//   }
// );

// const userSlice = createSlice({
//   name: "userSlice",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(signUp.fulfilled, (state, action) => {
//       state.currentUser = action.payload;
//     });
//     builder.addCase(signIn.fulfilled, (state, action) => {
//       const token = action.payload;
//       localStorage.setItem("token", token);
//       const decodedToken = jwtDecode(`Bearer ${token}`);
//       state.currentUser = decodedToken;
//     });
//   },
// });

// export default userSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 import { notifySuccess, notifyError } from "../../Utils/Notification";
import Api from "../../Api/api";
import axios from "axios";

const initialState = {
  currentUser: null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  loading: false,
  error: null,
};

export const signUp = createAsyncThunk(
  "userSlice/signUp",
  async (userData, thunkAPI) => {
    try {
      const response = await Api.post("/auth/signup", userData);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data || "Sign up failed");
    }
  }
);

export const signIn = createAsyncThunk(
  "userSlice/signIn",
  async (userData, thunkAPI) => {
    try {
      const formdata = new FormData();
      formdata.append("email", userData.email);
      formdata.append("password", userData.password);

      const response = await axios.post("http://54.235.109.101/auth/login/", formdata);
      const data = response.data;

      console.log(data, "response.data");
      
      if (data?.access) {
        notifySuccess("logged in success");
        return data;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Login error", error);
      notifyError("Login failed");
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const logout = createAsyncThunk(
  "userSlice/logout",
  async (_, thunkAPI) => {
    try {
        return true;
    } catch (error) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

 export const refreshAccessToken = createAsyncThunk(
  "userSlice/refreshAccessToken",
  async (_, thunkAPI) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post("http://54.235.109.101/auth/refresh/", {
        refresh: refreshToken
      });

      return response.data.access;
    } catch (error) {
      console.error("Token refresh error", error);
      return thunkAPI.rejectWithValue("Token refresh failed");
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
     initializeFromStorage: (state) => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const userData = localStorage.getItem("userData");

      if (accessToken && userData) {
        try {
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
          state.currentUser = JSON.parse(userData);
          state.isAuthenticated = true;
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
           localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userData");
          state.isAuthenticated = false;
        }
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
     builder.addCase(signUp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
     });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

     builder.addCase(signIn.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      const { access, refresh, user } = action.payload;
      
       localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("userData", JSON.stringify(user));

       state.accessToken = access;
      state.refreshToken = refresh;
      state.currentUser = user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
       localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");

       state.currentUser = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    });

    // Refresh Token
    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      const newAccessToken = action.payload;
      localStorage.setItem("accessToken", newAccessToken);
      state.accessToken = newAccessToken;
    });
    builder.addCase(refreshAccessToken.rejected, (state) => {
       localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");
      
      state.currentUser = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    });
  },
});

export const { initializeFromStorage, clearError } = userSlice.actions;
export default userSlice.reducer;