import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import React, { useCallback, useState } from 'react';
import axiosInstance from '../../../config/AxiosInstance';
import character from '../../../interfaces/Character';
import Location from '../../../interfaces/Location';
import './Sheet.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Sheet() {
    const char = useLocation().state as character;
    const navigate = useNavigate();
    const [locationResidentsId, setLocationResidentsId] = useState<string[]>(['']);

    const separeId = (data: Location) => {
        const originalArray = data.residents;
        if (originalArray.length > 0) {
            const results = originalArray.map((e) => {
                return e.replace('https://rickandmortyapi.com/api/character/', '');
            });
            setLocationResidentsId(results);
        } else {
            setLocationResidentsId([]);
        }
    };

    const getLocation = useCallback(
        (url: string) => {
            if (url !== '') {
                axiosInstance.get(url).then((response) => {
                    const { data } = response;
                    separeId(data);
                    const locaget = data;
                    navigate('/LocationSheet', { state: { locaget } });
                });
            }
        },
        [char]
    );

    return (
        <div>
            <div className="SheetBody">
                <button className="icon" type="button" onClick={() => navigate('/')}>
                    <FontAwesomeIcon icon={faArrowAltCircleLeft} size={'5x'} />
                </button>
                <div className="top-side">
                    <div className="imageBorder">
                        <img className="SheetImage" alt="" src={char.image} />
                    </div>
                </div>

                <div className="Info">
                    <p>Name: {char.name}</p>
                    <p>Status: {char.status}</p>
                    <p>Gender: {char.gender}</p>
                    <p>Species: {char.species}</p>
                    {char.type ? <p>Type: {char.type}</p> : null}
                    <div className="LocaButton">
                        <p>Location:</p>
                        <p>
                            {' '}
                            {char.location.name}
                            {char.location.name !== 'unknown' ? (
                                <>
                                    <button
                                        className="icon2"
                                        type="button"
                                        onClick={() => getLocation(char.location.url)}>
                                        <FontAwesomeIcon icon={faArrowAltCircleRight} size={'2x'} />
                                    </button>
                                </>
                            ) : null}
                        </p>
                    </div>{' '}
                    <div className="LocaButton">
                        <p>Origin:</p>{' '}
                        <p>
                            {char.origin.name}{' '}
                            {char.origin.name !== 'unknown' ? (
                                <>
                                    <button
                                        className="icon2"
                                        type="button"
                                        onClick={() => getLocation(char.origin.url)}>
                                        <FontAwesomeIcon icon={faArrowAltCircleRight} size={'2x'} />
                                    </button>
                                </>
                            ) : null}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Sheet;
