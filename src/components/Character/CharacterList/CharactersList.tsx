import React, { useCallback, useState } from 'react';
import character from '../../../interfaces/Character';
import Card from '../Card/Card';
import './CharactersList.css';
import CharacterFilters from '../../../interfaces/CharacterFilters';
import FilterModal from '../Filters/Filters';
import usePaginatedResult from '../../Hooks/usePaginatedResults';
import { useNavigate } from 'react-router-dom';

export const INITIAL_STATE_CHARACTER: character = {
    id: -1,
    name: 'There is no One here',
    status: '',
    species: '',
    type: '',
    gender: '',
    origin: {
        name: '',
        url: '',
    },
    location: {
        name: '',
        url: '',
    },
    image: '',
    episode: [],
};

const CharacterList = () => {
    const navigate = useNavigate();

    const {
        setSearch,
        nextPage,
        previousPage,
        results,
        verifyNextPage,
        verifyPrevPage,
        search,
        resultsDisplay,
    } = usePaginatedResult<character, CharacterFilters>('character');

    const loadAndChangeSheet = useCallback(
        (charget: character) => {
            navigate('/CharacterSheet', { state: charget, replace: true });
        },
        [navigate]
    );

    const searchFilters = useCallback(
        (stateFilters: CharacterFilters) => {
            setSearch(stateFilters);
        },
        [setSearch]
    );

    return (
        <div className="Body">
            <div className="FilterModal">
                <FilterModal stateFilters={search} setSearchFilter={searchFilters} />
            </div>{' '}
            <div className="buttons">
                <button
                    className="btn"
                    type="button"
                    disabled={verifyPrevPage}
                    onClick={previousPage}>
                    Previous page
                </button>
                {resultsDisplay}
                <button type="button" className="btn" disabled={verifyNextPage} onClick={nextPage}>
                    Next Page
                </button>
            </div>
            <div className="card-grid">
                {results.map((char) => (
                    <div key={char.id}>
                        <Card char={char} openSheet={() => loadAndChangeSheet(char)} />
                    </div>
                ))}
            </div>
            <div className="SheetModal"></div>
        </div>
    );
};

export default React.memo(CharacterList);
