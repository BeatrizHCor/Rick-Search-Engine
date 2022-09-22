import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Location from '../../../interfaces/Location';
import LocationFilters from '../../../interfaces/LocationFilters';
import usePaginatedResult from '../../Hooks/usePaginatedResults';
import LocationFilterModal from '../LocationFilters/LocationFilters';
import LocationSheet from '../LocationsSheet/LocationsSheet';
import './LocationList.css';

export const INITIAL_STATE_LOCATION: Location = {
    id: -1,
    name: '',
    type: '',
    dimension: '',
    residents: [],
    url: '',
};

export const INITIAL_STATE_FILTERS: LocationFilters = {
    name: '',
    dimension: '',
    type: '',
};

const LocationList = () => {
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
    } = usePaginatedResult<Location, LocationFilters>('location');

    const loadAndChangeSheet = (locaget: Location) => {
        navigate('/LocationSheet', { state: { locaget } });
    };
    const searchFilters = (stateFilters: LocationFilters) => {
        setSearch(stateFilters);
    };

    return (
        <div className="Body">
            <div>
                <LocationFilterModal stateFilters={search} setSearchFilter={searchFilters} />
            </div>
            <div className="buttonslist">
                <button
                    className="btnlist"
                    type="button"
                    disabled={verifyPrevPage}
                    onClick={previousPage}>
                    Previous page
                </button>
                {resultsDisplay}
                <button
                    type="button"
                    className="btnlist"
                    disabled={verifyNextPage}
                    onClick={nextPage}>
                    Next Page
                </button>
            </div>

            <div className="list-grid">
                {results.map((loca) => (
                    <div className="locaName" key={loca.id}>
                        <a onClick={() => loadAndChangeSheet(loca)}>{loca.name}</a>
                    </div>
                ))}
            </div>
            <div className="SheetModal"></div>
        </div>
    );
};

export default React.memo(LocationList);
