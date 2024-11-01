import React from "react";
import Recharge from "./trip-section/Recharge";
import Flight from "./trip-section/Flight";
import Hotel from "./trip-section/Hotel";
import Train from "./trip-section/Train";
import Bus from "./trip-section/Bus";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { FaTrainSubway } from "react-icons/fa6";

const Form = () => {
    return (
        <section id="theme_search_form">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="theme_search_form_area">

                            <div className="theme_search_form_tabbtn">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="flights-tab" data-bs-toggle="tab" data-bs-target="#flights" type="button" role="tab" aria-controls="flights" aria-selected="true"><i className="fas fa-plane-departure"></i>Flights</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="recharge-tab" data-bs-toggle="tab" data-bs-target="#reacharge" type="button" role="tab" aria-controls="reacharge" aria-selected="false"><HiMiniDevicePhoneMobile />Recharge</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="hotels-tab" data-bs-toggle="tab" data-bs-target="#hotels" type="button" role="tab" aria-controls="hotels" aria-selected="false"><i className="fas fa-hotel"></i>Hotels</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="bus-tab" data-bs-toggle="tab" data-bs-target="#bus" type="button" role="tab" aria-controls="bus" aria-selected="false"><i className="fas fa-bus"></i> Bus</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="train-tab" data-bs-toggle="tab" data-bs-target="#train" type="button" role="tab" aria-controls="train" aria-selected="false">
                                            <FaTrainSubway /> Train</button>
                                    </li>

                                </ul>
                            </div>

                            <div class="tab-content" id="myTabContent">
                                <Flight />
                                <Recharge context={"home"} />
                                <Hotel />
                                <Bus />
                                <Train />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Form;