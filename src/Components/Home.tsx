import React, { useState } from 'react';
import { Button, Row, Col, Modal } from 'antd';
import { AllPeopleResponse, useAllPeople } from '../graphql/query';
import LoadingAnimation from './LoadingAnimation';
import FavoritesToggle from './FavoritesToggle';
import FilmSelect from './FilmSelect';
import CharacterTable from './CharacterTable';
import { Character } from './Character';

const Home: React.FC = () => {

    const { loading, error, data, fetchMore } = useAllPeople();
    const [favoritesOnly, setFavoritesOnly] = useState(false);
    const [cursor, setCursor] = useState<string | null>(null);
    const [selectedFilms, setSelectedFilms] = useState<string[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);

    const [favorites, setFavorites] = useState<string[]>(() => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });

    const addToFavorites = (characterId: string) => {
        setFavorites(prevFavorites => {
            const newFavorites = [...prevFavorites, characterId];
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    // Function to remove a character from favorites
    const removeFromFavorites = (characterId: string) => {
        setFavorites(prevFavorites => {
            const newFavorites = prevFavorites.filter(id => id !== characterId);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    // Function to check if a character is favorited
    const isFavorited = (characterId: string) => favorites.includes(characterId);


    const handleFavoritesOnlyToggle = (checked: boolean) => {
        setFavoritesOnly(checked);
    };

    const handleSelectFilmsChange = (value: string[]) => {
        setSelectedFilms(value);
    };

    const handleShowModal = (characterId: string) => {
        setSelectedCharacterId(characterId);
        setIsModalVisible(true);
    };

    const handleHideModal = () => {
        setSelectedCharacterId(null);
        setIsModalVisible(false);
    };

    if (loading) return <p><LoadingAnimation /></p>;
    if (error) return <p>Error</p>;

    const loadMore = () => {
        if (!loading && data?.allPeople?.pageInfo.hasNextPage) {
            fetchMore({
                variables: {
                    cursor: data.allPeople.pageInfo.endCursor
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return {
                        ...prev,
                        allPeople: {
                            ...fetchMoreResult.allPeople,
                            people: [...prev.allPeople.people, ...fetchMoreResult.allPeople.people]
                        }
                    };
                }
            });
        }
    };

    const filmNames: string[] = Array.from(new Set(data?.allFilms?.films.map((films: any) => films.title)));

    let filteredCharacters = data?.allPeople?.people ?? [];

    if (selectedFilms.length > 0) {
        filteredCharacters = filteredCharacters.filter((character: any) => {
            return selectedFilms.some(selectedFilm =>
                character.filmConnection.films.some((film: any) => film.title === selectedFilm)
            );
        });
    }

    if (favoritesOnly) {
        filteredCharacters = filteredCharacters.filter((character: any) => isFavorited(character.id));
    }

    const logoColStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center'
    };


    return (
        <div className="home-container">
            <Row justify="start" align="middle">
                <Col span={6} style={logoColStyle}>
                    <img src="logoHomePage.png" alt="Star Wars Logo" style={{ width: '100px', height: 'auto' }} />
                </Col>
                <Col span={12}>
                    <h1 style={{ textAlign: 'center' }}>Star Wars Wiki</h1>
                </Col>
            </Row>
            <Row justify="space-between" style={{ marginBottom: '1rem' }}>
                <Col>
                    <FavoritesToggle checked={favoritesOnly} onChange={handleFavoritesOnlyToggle} />
                </Col>
                <Col>
                    <FilmSelect films={filmNames} selectedFilms={selectedFilms} onChange={handleSelectFilmsChange} />
                </Col>
            </Row>
            <CharacterTable
                characters={filteredCharacters as unknown as AllPeopleResponse[]}
                favorites={favorites}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                isFavorited={isFavorited}
                handleShowModal={handleShowModal} />
            {data?.allPeople?.pageInfo?.hasNextPage && (
                <Button type="primary" onClick={loadMore} style={{ marginTop: '1rem' }}>Load More</Button>
            )}
            <Modal
                title={'Character Details'}
                open={isModalVisible}
                onCancel={handleHideModal}
                footer={null}
            >
                {selectedCharacterId && (
                    <Character
                        id={selectedCharacterId}
                        favorites={favorites}
                        addToFavorites={addToFavorites}
                        removeFromFavorites={removeFromFavorites}
                        isFavorited={isFavorited} />
                )}

            </Modal>

        </div>
    );
}

export default Home;