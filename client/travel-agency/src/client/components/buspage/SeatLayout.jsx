import React, { useState } from 'react';

const SeatLayout = ({ id }) => {
    const [showSeats, setShowSeats] = useState(false);
    console.log(id)
    return (
        <div>
            <button
                className="btn btn-outline-primary mb-3"
                onClick={() => setShowSeats(!showSeats)}
            >
                {showSeats ? 'Hide Seat Layout' : 'Show Seat Layout'}
            </button>
            {showSeats && (
                <div className="seat-layout grid grid-cols-3 gap-4">
                    {seatData.map((seat) => (
                        <div
                            key={`${seat.row}-${seat.column}`}
                            className={`seat border rounded p-2 ${seat.available === "True" ? 'available' : 'unavailable'}`}
                        >
                            <strong>Seat {seat.name}</strong>
                            <p>Fare: ₹{seat.fare}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SeatLayout;
