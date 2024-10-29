import React from 'react';

const RechargeFilter = ({ types, onFilterChange }) => {
    return (
        <div className="mb-4 col-lg-8">
            <p className="text-lg font-bold">Plan Type</p>
            <select className="form-select flight_Search_boxed" onChange={(e) => onFilterChange(e.target.value)}>
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
