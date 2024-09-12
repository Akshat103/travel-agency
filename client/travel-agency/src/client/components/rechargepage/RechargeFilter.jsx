import React from 'react';

const RechargeFilter = ({ types, onFilterChange }) => {
    return (
        <div className="mb-4">
                <p className="text-lg font-bold">Filter by Plan Type</p>
            <select className="form-select" onChange={(e) => onFilterChange(e.target.value)}>
                <option value="">All</option>
                {types.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default RechargeFilter;
