import React from 'react';

const ClassSelection = ({ selectedClass, onClassChange }) => {
    const handleClassChange = (newClass) => {
        onClassChange(newClass);
    };

    return (
        <div className="cabin-selection">
            <h6>Cabin Class</h6>
            <div className="cabin-list">
                <CabinClassButton label="Economy" isActive={selectedClass === 'Economy'} onClick={() => handleClassChange('Economy')} />
                <CabinClassButton label="Business" isActive={selectedClass === 'Business'} onClick={() => handleClassChange('Business')} />
                <CabinClassButton label="First Class" isActive={selectedClass === 'First Class'} onClick={() => handleClassChange('First Class')} />
            </div>
        </div>
    );
};

const CabinClassButton = ({ label, isActive, onClick }) => {
    return (
        <button type="button" className={`label-select-btn ${isActive ? 'active' : ''}`} onClick={onClick}>
            <span className="muiButton-label">{label}</span>
        </button>
    );
};

export default ClassSelection;
