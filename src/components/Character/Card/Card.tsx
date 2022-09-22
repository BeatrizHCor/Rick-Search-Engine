import React from 'react';
import character from '../../../interfaces/Character';
import './Card.css';

interface IProps {
    char: character;
    openSheet: () => void;
}

const Card = (props: IProps) => {
    const { char, openSheet } = props;

    return (
        <div>
            <button className="Cardchar" type="button" onClick={() => openSheet()}>
                <img className="CardImage" alt="" src={char.image} />
                <p className="text">{char.name}</p>
            </button>
        </div>
    );
};
export default React.memo(Card);
