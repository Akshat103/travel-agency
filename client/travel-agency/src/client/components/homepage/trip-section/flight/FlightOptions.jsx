import React from 'react'

const FlightOptions = () => {
    return (
        <div class="row">
            <div class="col-lg-12">
                <div class="flight_categories_search">
                    <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="oneway-tab" data-bs-toggle="tab" data-bs-target="#oneway_flight" type="button" role="tab" aria-controls="oneway_flight" aria-selected="true">One
                                Way</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="roundtrip-tab" data-bs-toggle="tab" data-bs-target="#roundtrip" type="button" role="tab" aria-controls="roundtrip" aria-selected="false">Roundtrip</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="multi_city-tab" data-bs-toggle="tab" data-bs-target="#multi_city" type="button" role="tab" aria-controls="multi_city" aria-selected="false">Multi
                                city</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default FlightOptions
