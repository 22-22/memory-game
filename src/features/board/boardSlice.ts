import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface BoardState {
    tries: number,
    matchingPairs: number,
    imagesLoaded: number
};

const initialState: BoardState = {
    tries: 0,
    matchingPairs: 0,
    imagesLoaded: 0,
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        countTries: (state) => {
            state.tries += 1;
        },
        countMatchingPairs: (state) => {
            state.matchingPairs += 1;
        },
        countImagesLoaded: (state) => {
            state.imagesLoaded += 1;
        }
    },
})

export const { countTries, countMatchingPairs, countImagesLoaded } = boardSlice.actions;

export const selectTries = (state: RootState) => state.board.tries;
export const selectMatchingPairs = (state: RootState) => state.board.matchingPairs;
export const selectImagesLoaded = (state: RootState) => state.board.imagesLoaded;

export default boardSlice.reducer;
