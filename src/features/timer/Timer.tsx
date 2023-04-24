import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { countTime, selectSeconds } from "../stats/statsSlice";
import { selectIsStarted } from "../board/boardSlice";

export const Timer = () => {
    const dispatch = useAppDispatch();
    const time = useAppSelector(selectSeconds);
    const isStarted = useAppSelector(selectIsStarted);
    const [timerId, setTimerId] = useState<ReturnType<typeof setInterval> | undefined>(undefined);

    const startTimer = useCallback(() => {
        const newTimerId = setInterval(() => dispatch(countTime()), 1000);
        setTimerId(newTimerId);
    }, [dispatch]);

    const stopTimer = useCallback(() => {
        clearInterval(timerId);
        setTimerId(undefined);
    }, [timerId])

    useEffect(() => {
        if (isStarted) {
            startTimer();
        } else {
            stopTimer();
        }
        return () => clearInterval(timerId);
        // }, [isStarted, startTimer, stopTimer, timerId]);
    }, [isStarted]);

    return (
        <div>{time} s.</div>
    )
}
