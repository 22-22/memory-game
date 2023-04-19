import React from 'react';
import { selectMatchingPairs, selectTries } from "../board/boardSlice";
import { useAppSelector } from '../../app/hooks';
import './Stats.css';

export const Stats = () => {
    const tries = useAppSelector(selectTries);
    const matchingPairs = useAppSelector(selectMatchingPairs);
    return (
        <div className="stats-container">
            <div>Tries: <span className="stats-data">{tries}</span></div>
            <div>Matches: <span className="stats-data">{matchingPairs}</span></div>
        </div>
    )
}
