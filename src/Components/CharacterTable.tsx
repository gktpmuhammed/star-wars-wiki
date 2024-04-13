import React from 'react';
import { Button, Space, Table } from 'antd';
import { capitalizeFirstLetter } from '../utils/helpers';
import { FavoriteButton } from './FavoriteButton';
import { AllPeopleResponse } from '../graphql/query';

export interface CharacterTableProps {
    characters: AllPeopleResponse[];
    favorites: string[];
    addToFavorites: (characterId: string) => void;
    removeFromFavorites: (characterId: string) => void;
    isFavorited: (characterId: string) => boolean;
    handleShowModal: (characterId: string) => void;
}

const CharacterTable: React.FC<CharacterTableProps> = ({ characters, favorites, addToFavorites, removeFromFavorites, isFavorited, handleShowModal }) => {

    const eyeColorFilters = Array.from(new Set(characters.map((character: any) => character.eyeColor)))
        .map((eyeColor: any) => ({
            text: capitalizeFirstLetter(eyeColor),
            value: eyeColor,
        }));

    const speciesFilters = Array.from(new Set(characters.map((character: any) => character.species?.name)))
        .map((species: any) => ({
            text: species ? capitalizeFirstLetter(species) : '-',
            value: species || '-',
        }));

    const genderFilters = Array.from(new Set(characters.map((character: any) => character.gender)))
        .map((gender: any) => ({
            text: capitalizeFirstLetter(gender),
            value: gender,
        }));

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: any, b: any) => a.name.localeCompare(b.name),
            render: (text: string, record: any) => (text || '-'),
        },
        {
            title: 'Homeworld',
            dataIndex: 'homeworld',
            key: 'homeworld',
            sorter: (a: any, b: any) => a.homeworld.name.localeCompare(b.homeworld.name),
            render: (homeworld: any) => capitalizeFirstLetter(homeworld.name) || '-',
        },
        {
            title: 'Species',
            dataIndex: 'species',
            key: 'species',
            filters: speciesFilters,
            onFilter: (value: any, record: any) => record.species?.name === value,
            render: (species: any) => species ? capitalizeFirstLetter(species.name) : '-',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            filters: genderFilters,
            onFilter: (value: any, record: any) => record.gender === value,
            render: (text: string) => capitalizeFirstLetter(text) || '-',
        },
        {
            title: 'Height (cm)',
            dataIndex: 'height',
            key: 'height',
            sorter: (a: any, b: any) => a.height - b.height,
            render: (text: number) => text || '-',
        },
        {
            title: 'Mass (kg)',
            dataIndex: 'mass',
            key: 'mass',
            sorter: (a: any, b: any) => a.mass - b.mass,
            render: (text: number) => text || '-',
        },
        {
            title: 'Eye Color',
            dataIndex: 'eyeColor',
            key: 'eyeColor',
            filters: eyeColorFilters,
            onFilter: (value: any, record: any) => record.eyeColor === value,
            render: (text: string) => capitalizeFirstLetter(text) || '-',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text: string, record: any) => (

                <Space direction="horizontal" align="center">
                    <Button type="primary" onClick={() => handleShowModal(record.id)}>View Details</Button>
                    <FavoriteButton
                        characterId={record?.id}
                        isFavorited={isFavorited}
                        addToFavorites={addToFavorites}
                        removeFromFavorites={removeFromFavorites}
                    />
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={characters.map((character: any) => ({
                ...character,
                key: character.id,
            }))}
            showSorterTooltip={{
                target: 'sorter-icon',
            }}
            pagination={false}
        />
    );
};

export default CharacterTable;