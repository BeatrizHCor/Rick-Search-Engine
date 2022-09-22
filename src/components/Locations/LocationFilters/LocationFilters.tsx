import React, { useCallback } from 'react';

import LocationFilters from '../../../interfaces/LocationFilters';
import './LocationFilters.css';

export const INITIAL_STATE_FILTERS: LocationFilters = {
    name: '',
    dimension: '',
    type: '',
};

interface IProps {
    // eslint-disable-next-line no-unused-vars
    setSearchFilter: (stateFilters: LocationFilters) => void;
    stateFilters: LocationFilters;
}

const LocationFilterModal = (props: IProps) => {
    const { setSearchFilter, stateFilters } = props;
    const changeFilterHandler = useCallback(
        (
            e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
            inputType: keyof LocationFilters
        ) => {
            setSearchFilter({ ...stateFilters, [inputType]: e.target.value });
        },
        [stateFilters]
    );

    return (
        <div className="Filters">
            <div>
                {' '}
                <label className="Label" htmlFor="SpeciesSelect">
                    Name:{' '}
                </label>
                <input
                    type="Text"
                    className="Input"
                    onChange={(e) => changeFilterHandler(e, 'name')}
                />
            </div>
            <div>
                {' '}
                <label className="Label" htmlFor="SpeciesSelect">
                    Dimension:{' '}
                </label>
                <input
                    className="Input"
                    type="Text"
                    onChange={(e) => changeFilterHandler(e, 'dimension')}
                />
            </div>
            <div>
                {' '}
                <label className="Label" htmlFor="SpeciesSelect">
                    Type:{' '}
                </label>
                <input
                    className="Input"
                    type="Text"
                    onChange={(e) => changeFilterHandler(e, 'type')}
                />
            </div>
        </div>
    );
};

export default React.memo(LocationFilterModal);
