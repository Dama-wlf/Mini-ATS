import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { filtredCandidatesAPI, fetchCandidatesAPI, fetchCandidateByIdAPI, createCandidateAPI, updateCandidateAPI,
     updateCandidateStatusAPI,rejectCandidateAPI, deleteCandidateAPI, getRejectedCandidatesAPI } from "./candidateAPI";

// Tous les candidats
export const fetchCandidates = createAsyncThunk(
    "candidates/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchCandidatesAPI();
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// filtre les candidats
export const filtreCandidates = createAsyncThunk(
    "candidates/filtred",
    async (filters = {}, { rejectWithValue }) => {
        try {
            const data = await filtredCandidatesAPI(filters);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// Un candidat par ID
export const fetchCandidateById = createAsyncThunk(
    "candidates/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const data = await fetchCandidateByIdAPI(id);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// Créer un candidat
export const createCandidate = createAsyncThunk(
    "candidates/create",
    async (formData, { rejectWithValue }) => {
        try {
            const data = await createCandidateAPI(formData);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data);
        }
    }
);

// Mettre à jour un candidat
export const updateCandidate = createAsyncThunk(
    "candidates/update",
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const data = await updateCandidateAPI(id, formData);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// Mettre à jour le statut
export const updateCandidateStatus = createAsyncThunk(
    "candidates/updateStatus",
    async ({ id, status }, { rejectWithValue }) => {
        try {
            const data = await updateCandidateStatusAPI(id, status);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// Rejeter un candidat
export const rejectCandidate = createAsyncThunk(
    "candidates/reject",
    async (id, { rejectWithValue }) => {
        try {
            const data = await rejectCandidateAPI(id);
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// Supprimer un candidat
export const deleteCandidate = createAsyncThunk(
    "candidates/delete",
    async (id, { rejectWithValue }) => {
        try {
            const data = await deleteCandidateAPI(id);
            return data.message; // on peut retourner seulement le message
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// Récupérer les candidats rejetés
export const getRejectedCandidates = createAsyncThunk(
    "candidates/rejected",
    async (filters = {} , { rejectWithValue }) => {
        try {
            const data = await getRejectedCandidatesAPI(filters);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);


const candidateSlice = createSlice({
    name: "candidates",
    initialState: {
        allCandidates: [],
        filtredCandidates: [],
        rejectedCandidates: [],
        selectedCandidate: null,
        loading: false,
        error: null,
        totalPages: 1,
        currentPage: 1,
    },
    reducers: {
        clearSelectedCandidate: (state) => {
            state.selectedCandidate = null;
        },
    },
    extraReducers: (builder) => {
        builder

         // fetchCandidates
            .addCase(fetchCandidates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCandidates.fulfilled, (state, action) => {
                state.loading = false;
                state.allCandidates = action.payload;
            })
            .addCase(fetchCandidates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // filtreCandidates
            .addCase(filtreCandidates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(filtreCandidates.fulfilled, (state, action) => {
                state.loading = false;
                state.filtredCandidates = action.payload.data;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(filtreCandidates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // fetchCandidateById
            .addCase(fetchCandidateById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCandidateById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCandidate = action.payload;
            })
            .addCase(fetchCandidateById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // createCandidate
            .addCase(createCandidate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.allCandidates.push(action.payload);
            })
            .addCase(createCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // updateCandidate
            .addCase(updateCandidate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.allCandidates = state.allCandidates.map((c) =>
                    c._id === action.payload._id ? action.payload : c
                );
            })
            .addCase(updateCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // updateCandidateStatus
            .addCase(updateCandidateStatus.fulfilled, (state, action) => {
                const idx = state.allCandidates.findIndex((c) => c._id === action.payload._id);
                if (idx !== -1) state.allCandidates[idx] = action.payload;
            })

            // rejectCandidate
            .addCase(rejectCandidate.fulfilled, (state, action) => {
                state.allCandidates = state.allCandidates.filter((c) => c._id !== action.payload._id);
                state.rejectedCandidates.push(action.payload);
            })

            // deleteCandidate
            .addCase(deleteCandidate.fulfilled, (state, action) => {
                state.allCandidates = state.allCandidates.filter((c) => c._id !== action.meta.arg);
                state.rejectedCandidates = state.rejectedCandidates.filter((c) => c._id !== action.meta.arg);
            })

            // getRejectedCandidates
            .addCase(getRejectedCandidates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRejectedCandidates.fulfilled, (state, action) => {
                state.loading = false;
                state.rejectedCandidates = action.payload.data; 
                state.totalPages = action.payload.totalPages; 
                state.currentPage = action.payload.currentPage;
            })

            .addCase(getRejectedCandidates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
},
});

export const { clearSelectedCandidate } = candidateSlice.actions;
export default candidateSlice.reducer;
