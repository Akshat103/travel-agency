import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';

const RechargeFilter = ({ types, onFilterChange }) => {
    const [convenienceFeePerct, setConvenienceFeePerct] = useState(0);

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const { data } = await axios.get('/api/services/Recharge');
                setConvenienceFeePerct(data.charge);
            } catch (error) {
                console.error("Error fetching service data:", error);
            }
        };

        fetchServiceData();
    }, []);

    return (
        <>
            <div className="mb-4 col-lg-8">
                <select className="form-select flight_Search_boxed" onChange={(e) => onFilterChange(e.target.value)}>
                    <option value="">All</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            <Badge bg="secondary">Convenience Fee: {convenienceFeePerct} %</Badge>
            </div>
        </>
    );
};

export default RechargeFilter;
