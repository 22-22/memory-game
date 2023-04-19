import React, { useState, useEffect, useRef } from 'react';
import { originalCardsArray } from "../../constants";
import { CardType } from "../../types";
import { useAppDispatch } from "../../app/hooks";
import { countTries, countMatchingPairs } from "./boardSlice";
import { Card } from "../card/Card";
// @ts-ignore 
import winSoundSrc from '../../assets/sounds/win.wav';
import './Board.css';

export function Board() {
    const dispatch = useAppDispatch();

    const [cards, setCards] = useState<CardType[]>([]);
    const [guessingCards, setGuessingCards] = useState<CardType[]>([]);
    const [matchingCards, setMatchingCards] = useState<CardType[]>([]);

    const winSoundRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const copy = [...originalCardsArray];
        copy.sort(() => Math.random() - 0.5);
        setCards(copy);
    }, []);

    useEffect(() => {
        if (guessingCards.length === 2) {
            dispatch(countTries());
            if (guessingCards[0].content === guessingCards[1].content) {
                setMatchingCards([...matchingCards, ...guessingCards]);
                dispatch(countMatchingPairs())
                setGuessingCards([]);
                winSoundRef.current?.play();
            } else {
                setTimeout(() => {
                    setGuessingCards([]);
                }, 1000)
            }
        }
    }, [guessingCards, matchingCards, dispatch]);

    const checkIfMatching = (id: number) => {
        const matchingIds = matchingCards.map((card) => card.id);
        return matchingIds.includes(id);
    };

    const checkIfGuessing = (id: number) => {
        const guessingIds = guessingCards.map((card) => card.id);
        return guessingIds.includes(id);
    };

    const handleCardClick = (card: CardType) => {
        if (guessingCards.length < 2 && !checkIfMatching(card.id)) {
            setGuessingCards([...guessingCards, card]);
        };
    };

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
