import React from 'react';
import { useCharacterData } from '../graphql/query';
import { CharacterDetails } from './CharacterDetails';
import LoadingAnimation from './LoadingAnimation';

interface CharProps {
    id: string;
    favorites: string[];
    addToFavorites: (characterId: string) => void;
    removeFromFavorites: (characterId: string) => void;
    isFavorited: (characterId: string) => boolean;
}

export const Character: React.FC<CharProps> = ({ id, favorites, addToFavorites, removeFromFavorites, isFavorited }) => {
    const { loading, error, data } = useCharacterData(id);

    if (loading) return <p><LoadingAnimation /></p>;
    if (error) return <p>Error</p>;

    return (
        <CharacterDetails
            character={data?.person}
            favorites={favorites}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            isFavorited={isFavorited}
        />
    );
};