import React from 'react';
import { selectMatchingCards } from "../board/boardSlice";
import { selectTries } from "../stats/statsSlice";
import { useAppSelector } from '../../app/hooks';
import { Timer } from "../timer/Timer";
import './Stats.css';

export const Stats = () => {
    const tries = useAppSelector(selectTries);
    const matchingCards = useAppSelector(selectMatchingCards);

    return (
        <section className="stats-container">
            <div>
                <span>Tries: <span className="stats-data">{tries}</span></span>
                <span>Matches: <span className="stats-data">{matchingCards.length / 2}</span></span>
            </div>
            <Timer />
        </section>
    )
}
