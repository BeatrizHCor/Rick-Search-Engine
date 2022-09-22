import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import CharactersList from './components/Character/CharacterList/CharactersList';
import LocationList from './components/Locations/LocationList/LocationList';
import Sheet from './components/Character/Sheets/Sheet';
import LocationSheet from './components/Locations/LocationsSheet/LocationsSheet';
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<CharactersList></CharactersList>}></Route>
                    <Route path="/Locations" element={<LocationList></LocationList>}></Route>
                    <Route path="/CharacterSheet" element={<Sheet></Sheet>}></Route>
                    <Route path="/LocationSheet" element={<LocationSheet></LocationSheet>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
