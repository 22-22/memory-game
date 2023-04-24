import React, { useCallback, useEffect, useRef } from 'react';
import { CardType } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    createCardsArray,
    selectCards,
    selectGuessingCards,
    addGuessingCards,
    clearGuessingCards,
    addMatchingCards,
    selectMatchingCards,
    selectIsStarted,
    setGameStart,
    setGameEnd
} from "./boardSlice";
import { countTries } from "../stats/statsSlice";
import { Card } from "../card/Card";
// @ts-ignore 
import winSoundSrc from '../../assets/sounds/win.wav';
import './Board.css';

export function Board() {
    const dispatch = useAppDispatch();
    const cards = useAppSelector(selectCards);
    const guessingCards = useAppSelector(selectGuessingCards);
    const matchingCards = useAppSelector(selectMatchingCards);
    const isStarted = useAppSelector(selectIsStarted);
    const winSoundRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        dispatch(createCardsArray());
    }, [dispatch]);

    const evaluateMove = useCallback(() => {
        if (guessingCards.length === 2) {
            dispatch(countTries());
            if (guessingCards[0].content === guessingCards[1].content) {
                dispatch(addMatchingCards());
                dispatch(clearGuessingCards());
                winSoundRef.current?.play();
            } else {
                setTimeout(() => {
                    dispatch(clearGuessingCards());
                }, 1000);
            }
        }
    }, [guessingCards, dispatch]);

    useEffect(() => {
        evaluateMove();
    }, [evaluateMove]);

    useEffect(() => {
        if (matchingCards.length === cards.length) {
            dispatch(setGameEnd());
        }
    }, [matchingCards]);

    const checkIfMatching = useCallback((id: number) => {
        const matchingIds = matchingCards.map((card) => card.id);
        return matchingIds.includes(id);
    }, [matchingCards]);

    const checkIfGuessing = useCallback((id: number) => {
        const guessingIds = guessingCards.map((card) => card.id);
        return guessingIds.includes(id);
    }, [guessingCards]);

    const handleCardClick = useCallback((card: CardType) => {
        if (!isStarted) {
            dispatch(setGameStart());
        }
        if (guessingCards.length < 2 && !checkIfMatching(card.id)) {
            dispatch(addGuessingCards(card));
        };
    }, [guessingCards, checkIfMatching, dispatch]);

    return (
        <>
            <div className="board">
                {cards.map((card) => <Card
                    key={card.id}
                    card={card}
                    handleCardClick={handleCardClick}
                    isOpen={checkIfGuessing(card.id) || checkIfMatching(card.id)}
                />)}
                <audio ref={winSoundRef}>
                    <source src={winSoundSrc} type="audio/wav" />
                </audio>
            </div>
        </>
    )
}
