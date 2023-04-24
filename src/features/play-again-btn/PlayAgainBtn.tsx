import React, { useCallback } from 'react';
import { recreateBoard } from "../board/boardSlice";
import { resetStats } from "../stats/statsSlice";
import { useAppDispatch } from "../../app/hooks";
import './PlayAgainBtn.css';

export const PlayAgainBtn = () => {
    const dispatch = useAppDispatch();

    const handleRestart = useCallback(() => {
        dispatch(recreateBoard());
        dispatch(resetStats());
    }, [dispatch]);

    return (
        <button
            className="play-again-btn"
            onClick={handleRestart}
        >
            Play again
        </button>
    )
}
