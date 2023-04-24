import { CardType } from "./types";

export const shuffleCards = (cards: CardType[]) => {
    const copy = [...cards];
    copy.sort(() => Math.random() - 0.5);
    return copy;
};