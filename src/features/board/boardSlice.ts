import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CardType } from "../../types";
import { originalCardsArray } from "../../constants";
import { shuffleCards } from "../../utils";
export interface BoardState {
    imagesLoaded: number,
    cards: CardType[],
    guessingCards: CardType[],
    matchingCards: CardType[],
    isStarted: boolean
};

const initialState: BoardState = {
    imagesLoaded: 0,
    cards: [],
    guessingCards: [],
    matchingCards: [],
    isStarted: false
};

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        countImagesLoaded: (state) => {
            state.imagesLoaded += 1;
        },
        createCardsArray: (state) => {
            state.cards = shuffleCards(originalCardsArray);
        },
        addGuessingCards: (state, action: PayloadAction<CardType>) => {
            state.guessingCards.push(action.payload);
        },
        clearGuessingCards: (state) => {
            state.guessingCards = [];
        },
        addMatchingCards: (state) => {
            // concat doesn't mutate original array and push does
            // state.matchingCards.concat(state.guessingCards);
            state.matchingCards.push(...state.guessingCards);
        },
        recreateBoard: (state) => {
            // state.imagesLoaded = 0;
            state.cards = shuffleCards(originalCardsArray);
            state.guessingCards = [];
            state.matchingCards = [];
            state.isStarted = false;
        },
        setGameStart: (state) => {
            state.isStarted = true;
        },
        setGameEnd: (state) => {
            state.isStarted = false;
        },
    },
})

export const {
    countImagesLoaded, createCardsArray, addGuessingCards,
    clearGuessingCards, addMatchingCards,
    recreateBoard, setGameStart, setGameEnd
} = boardSlice.actions;

export const selectImagesLoaded = (state: RootState) => state.board.imagesLoaded;
export const selectCards = (state: RootState) => state.board.cards;
export const selectGuessingCards = (state: RootState) => state.board.guessingCards;
export const selectMatchingCards = (state: RootState) => state.board.matchingCards;
export const selectIsStarted = (state: RootState) => state.board.isStarted;

export default boardSlice.reducer;
