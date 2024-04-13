import React from 'react';
import { CharacterData } from '../graphql/query';
import { capitalizeFirstLetter } from '../utils/helpers';
import { List, Space, Typography } from 'antd';
import { FavoriteButton } from './FavoriteButton';
import characterMap from '../utils/characterMap.json';
import './Character.css';

const { Title, Text } = Typography;

export interface CharacterProps {
    character: CharacterData['person'];
    favorites: string[];
    addToFavorites: (characterId: string) => void;
    removeFromFavorites: (characterId: string) => void;
    isFavorited: (characterId: string) => boolean;
}

export const CharacterDetails: React.FC<CharacterProps> = ({ character, favorites, addToFavorites, removeFromFavorites, isFavorited }) => {

    const typedCharacterMap: { [name: string]: number } = characterMap;

    const characterNumber = typedCharacterMap[character?.name || ''];

    const imageUrl = `https://starwars-visualguide.com/assets/img/characters/${characterNumber}.jpg`;
    return (
        <div className="character-container">
            <Space direction="vertical" style={{ width: '100%' }}>
                <Space direction="horizontal" align="center">
                    <Title level={2} className="character-name">{character?.name}</Title>
                    <FavoriteButton
                        characterId={character?.id}
                        isFavorited={isFavorited}
                        addToFavorites={addToFavorites}
                        removeFromFavorites={removeFromFavorites}
                    />
                </Space>
                <Space direction="vertical">
                    <Text><strong>Homeworld:</strong> {character?.homeworld.name ? capitalizeFirstLetter(character?.homeworld.name) : '-'}</Text>
                    <Text><strong>Species:</strong> {character?.species ? capitalizeFirstLetter(character.species.name) : '-'}</Text>
                    <Text><strong>Gender:</strong> {character?.gender ? capitalizeFirstLetter(character?.gender) : '-'}</Text>
                    <Text><strong>Height (cm):</strong> {character?.height || '-'}</Text>
                    <Text><strong>Mass (kg):</strong> {character?.mass || '-'}</Text>
                    <Text><strong>Eye Color:</strong> {character?.eyeColor ? capitalizeFirstLetter(character?.eyeColor) : '-'}</Text>
                </Space>
                <div>
                    <Title level={3} className="films-title">Character Films</Title>
                    <List
                        bordered
                        dataSource={character?.filmConnection.films}
                        renderItem={(film: any) => (
                            <List.Item>{film.title}</List.Item>
                        )}
                    />
                </div>
            </Space>
            <div className="character-image-container">
                <img src={imageUrl} alt={character?.name} className="fixed-width" />
            </div>
        </div>
    );

};

