import React, { useState } from 'react';
import CharacterList from '../Character/CharacterList/CharactersList';
import LocationList from '../Locations/LocationList/LocationList';
import '../../Fonts/get_schwifty.ttf';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="All">
                <div className="Header">
                    <div className="Title">
                        <h1>The Rick Search Engine</h1>
                    </div>
                    <div className="Options">
                        <button className="Optionsbtn" onClick={() => navigate('../')}>
                            Characters
                        </button>
                        <button className="Optionsbtn" onClick={() => navigate('/Locations')}>
                            Locations
                        </button>
                    </div>
                </div>{' '}
            </div>
        </div>
    );
};

export default Header;
