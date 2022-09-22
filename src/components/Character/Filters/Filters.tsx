/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import CharacterFilters from '../../../interfaces/CharacterFilters';
import useDebounce from '../../Hooks/debouncedSearch';
import './Filters.css';

export const INITIAL_STATE_FILTERS: CharacterFilters = {
    name: '',
    status: '',
    gender: '',
    species: '',
};

interface IProps {
    setSearchFilter: (stateFilters: CharacterFilters) => void;
    stateFilters: CharacterFilters;
}

const FilterModal = (props: IProps) => {
    const { setSearchFilter, stateFilters } = props;

    const changeFilterHandler = useCallback(
        (
            e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
            inputType: keyof CharacterFilters
        ) => {
            setSearchFilter({ ...stateFilters, [inputType]: e.target.value });
        },
        [stateFilters]
    );

    return (
        <div className="Filters">
            <div>
                <label className="Label" htmlFor="name">
                    Name:{' '}
                </label>
                <input
                    id="name"
                    className="Input"
                    type="Text"
                    onChange={(e) => changeFilterHandler(e, 'name')}
                />
            </div>{' '}
            <div>
                <label className="Label" htmlFor="GenderSelect">
                    Gender:{' '}
                </label>
                <select
                    className="Input"
                    name="Gender"
                    id="GenderSelect"
                    onChange={(e) => changeFilterHandler(e, 'gender')}>
                    <option value=""></option>
                    <option value={'Male'}>Male</option>
                    <option value="Female">Female</option>
                    <option value="Genderless">Genderless</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>{' '}
            <div>
                {' '}
                <label className="Label" htmlFor="StatusSelect">
                    Status:{' '}
                </label>
                <select
                    className="Input"
                    name="Status"
                    id="StatusSelect"
                    onChange={(e) => changeFilterHandler(e, 'status')}>
                    <option value=""></option>
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </select>
            </div>{' '}
            <div>
                <label className="Label" htmlFor="SpeciesSelect">
                    Species:{' '}
                </label>
                <select
                    className="Input"
                    name="Species"
                    id="SpeciesSelect"
                    onChange={(e) => changeFilterHandler(e, 'species')}>
                    <option value=""></option>
                    <option value="Human">Human</option>
                    <option value="Humanoid">Humanoid(but not human)</option>
                    <option value="Alien">Alien</option>
                    <option value="Mythological Creature">Mythological Creature</option>
                    <option value="Poopybutthole">Poopybutthole</option>
                    <option value="Robot">Robot</option>
                    <option value="Unknown">Unknown</option>
                </select>
            </div>
        </div>
    );
};

export default React.memo(FilterModal);
