import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../config/AxiosInstance';
import character from '../../../interfaces/Character';
import Location from '../../../interfaces/Location';
import './LocationsSheet.css';

const INITIAL_STATE_CHARACTER: character = {
    id: 0,
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

function LocationSheet() {
    const state = useLocation().state as {
        locaget: Location;
    };
    const loca = state.locaget;
    const [residentsIds, setResidentsIds] = useState<string[]>([]);
    const [characterArray, setCharacterArray] = useState<character[]>([INITIAL_STATE_CHARACTER]);
    const navigate = useNavigate();

    const separeId = useCallback(() => {
        const originalArray = loca.residents;
        if (originalArray.length > 0) {
            const results = originalArray.map((e) => {
                return e.replace('https://rickandmortyapi.com/api/character/', '');
            });
            setResidentsIds(results);
        } else {
            setResidentsIds([]);
        }
    }, [setResidentsIds]);

    useEffect(separeId, []);

    const fetchNames = useCallback(() => {
        if (residentsIds.length > 0) {
            axiosInstance.get(`character/[${residentsIds}]`).then((response) => {
                const { data } = response;
                setCharacterArray(data);
            });
        } else {
            setCharacterArray([INITIAL_STATE_CHARACTER]);
        }
    }, [residentsIds]);

    useEffect(fetchNames, [residentsIds]);

    const loadAndChangeSheet = useCallback(
        (charget: character) => {
            navigate('/CharacterSheet', { state: charget, replace: true });
        },
        [navigate]
    );

    return (
        <div>
            <div className="SheetBody">
                <div>
                    <div className="iconposition">
                        <button
                            className="icon"
                            type="button"
                            onClick={() => navigate('/Locations')}>
                            <FontAwesomeIcon icon={faArrowAltCircleLeft} size={'5x'} />
                        </button>
                    </div>
                    <div className="topSide">
                        <h2>Name: {loca.name}</h2>
                        <h2>Type: {loca.type}</h2>
                        <h2>Dimension: {loca.dimension}</h2>
                    </div>
                    <h1 className="ResidentsTitle">Residents:</h1>
                    <div className="residentsGrid">
                        {characterArray.map((resident) => (
                            <p
                                className="locaName"
                                key={resident.id}
                                onClick={() => loadAndChangeSheet(resident)}>
                                {resident.name}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LocationSheet;
