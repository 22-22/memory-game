import React from 'react';
import { CardType } from "../../types";
import { useAppDispatch } from "../../app/hooks";
import { countImagesLoaded } from "../board/boardSlice";
import front from "../../assets/cover.jpg";
import './Card.css';

interface CardProps {
    card: CardType;
    isOpen: boolean;
    handleCardClick: (card: CardType) => void;
}

export const Card: React.FC<CardProps> = ({ card, isOpen, handleCardClick }) => {
    const dispatch = useAppDispatch();
    const onClick = () => {
        handleCardClick(card);
    };

    const handleImageLoad = () => {
        dispatch(countImagesLoaded());
    };
    return (
        <div className="flip-card" onClick={onClick}>
            <div className={isOpen ? 'flip-card-inner flip-class' : 'flip-card-inner'}>
                <div className="flip-card-front">
                    <img className="card-img" src={front} onLoad={handleImageLoad} alt="front" />
                </div>
                <div className="flip-card-back">
                    <img className="card-img" src={card.content} onLoad={handleImageLoad} alt="back" />
                </div>
            </div>
        </div>
    )
}
