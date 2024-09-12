import React from 'react';

const ClassSelection = ({ selectedClass, onClassChange, travelClassNames }) => {
    const handleClassChange = (newClass) => {
        onClassChange(newClass);
    };

    return (
        <div className="cabin-selection">
            <h6>Cabin Class</h6>
            <div className="cabin-list">
                {Object.entries(travelClassNames).map(([value, label]) => (
                    <CabinClassButton
                        key={value}
                        label={label}
                        isActive={selectedClass === Number(value)}
                        onClick={() => handleClassChange(Number(value))}
                    />
                ))}
            </div>
        </div>
    );
};

const CabinClassButton = ({ label, isActive, onClick }) => {
    return (
        <button
            type="button"
            className={`label-select-btn ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            <span className="muiButton-label">{label}</span>
        </button>
    );
};

export default ClassSelection;
