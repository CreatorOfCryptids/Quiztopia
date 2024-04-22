import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ReviewSet = ({ sets }) => {
    const { setId } = useParams();
    const set = sets.find((set) => set._id === parseInt(setId));
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [descriptions, setDescriptions] = useState({});
    const [showDescription, setShowDescription] = useState(false);

    const currentCard = set.flashcards[currentCardIndex];

    const handleDescriptionChange = (e) => {
        setDescriptions({
            ...descriptions,
            [currentCard._id]: e.target.value
        });
    };

    const handleNextCard = () => {
        if (currentCardIndex < set.flashcards.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setShowDescription(false);
        }
    };

    const handleShowDescription = () => {
        setShowDescription(true);
    };

    const handleSkipCard = () => {
        setShowDescription(false);
        handleNextCard();
    };

    const handleReset = () => {
        setDescriptions({});
        setShowDescription(false);
        setCurrentCardIndex(0);
    };

    const handleCorrectDescription = () => {
        if (!descriptions[currentCard._id]) {
            const updatedSets = sets.map((set) => {
                if (set.id === parseInt(setId)) {
                    return {
                        ...set,
                        flashcards: set.flashcards.map((card) => {
                            if (card.id === currentCard.id) {
                                return {
                                    ...card,
                                    proficiency: Math.min(card.proficiency + 1, 3)
                                };
                            }
                            return card;
                        })
                    };
                }
                return set;
            });
            setSets(updatedSets);
            handleNextCard();
        }
    };

    return (
        <div>
            <h1>Review Set: {set.title}</h1>
            <p>{set.description}</p>
            <div>
                <p>{currentCard.term}</p>
                {!showDescription ? (
                    <div>
                        <label>
                            Description:
                            <input
                                type="text"
                                value={descriptions[currentCard._id] || ''}
                                onChange={handleDescriptionChange}
                            />
                        </label>
                        <button onClick={handleCorrectDescription}>Correct Description</button>
                        <button onClick={handleNextCard}>Next Card</button>
                        <button onClick={handleShowDescription}>Show Description</button>
                    </div>
                ) : (
                    <div>
                        <p>Correct Description: {currentCard.definition}</p>
                        <button onClick={handleSkipCard}>Skip Card</button>
                    </div>
                )}
            </div>
            <button onClick={handleReset}>Restart</button>
        </div>
    );
};

export default ReviewSet;
