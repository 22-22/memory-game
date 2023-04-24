import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";

interface StatsState {
    tries: number,
    seconds: number
}

const initialState: StatsState = {
    tries: 0,
    seconds: 0,
}

export const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        countTries: (state) => {
            state.tries += 1;
        },
        resetStats: (state) => {
            state.tries = 0;
            state.seconds = 0;
        },
        countTime: (state) => {
            state.seconds += 1;
        },
    }
});

export const { countTries, resetStats, countTime } = statsSlice.actions;

export const selectTries = (state: RootState) => state.stats.tries;
export const selectSeconds = (state: RootState) => state.stats.seconds;

export default statsSlice.reducer;