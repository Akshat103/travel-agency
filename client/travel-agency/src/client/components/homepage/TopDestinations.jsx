import React from "react";
import dest1 from "/img/destination/destination1.png";
import dest2 from "/img/destination/destination2.png";
import dest3 from "/img/destination/destination3.png";
import dest4 from "/img/destination/destination4.png";
import dest5 from "/img/destination/destination5.png";
import dest6 from "/img/destination/destination6.png";
import dest7 from "/img/destination/destination7.png";
import dest8 from "/img/destination/destination8.png";
import bigimg from "/img/destination/big-img.png";

const TopDestinations = () => {
    return (
        <section id="top_destinations" class="section_padding_top">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="section_heading_center">
                            <h2>Top destinations</h2>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                        <div class="destinations_content_box img_animation">
                            <img src={bigimg} alt="img" />
                            <div class="destinations_content_inner">
                                <h2>Up to</h2>
                                <div class="destinations_big_offer">
                                    <h1>50</h1>
                                    <h6><span>%</span> <span>Off</span></h6>
                                </div>
                                <h2>Holiday packages</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                        <div class="row">
                            <div class="col-lg-4 col-md-4 col-sm-12 col-12">
                                <div class="destinations_content_box img_animation">
                                    <img src={dest1} alt="img" />
                                    <div class="destinations_content_inner">
                                        <h3 className="text-white">China</h3>
                                    </div>
                                </div>
                                <div class="destinations_content_box img_animation">
                                    <img src={dest2} alt="img" />
                                    <div class="destinations_content_inner">
                                        <h3 className="text-white">Darjeeling</h3>
                                    </div>
                                </div>
                                <div class="destinations_content_box img_animation">
                                    <img src={dest3} alt="img" />
                                    <div class="destinations_content_inner">
                                        <h3 className="text-white">Malaysia</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12 col-12">
                                <div class="destinations_content_box img_animation">
                                    <img src={dest4} alt="img" />
                                    <div class="destinations_content_inner">
                                        <h3 className="text-white">Gangtok</h3>
                                    </div>
                                </div>
                                <div class="destinations_content_box img_animation">
                                        <img src={dest5} alt="img" />
                                    <div class="destinations_content_inner">
                                        <h3 className="text-white">Thailand</h3>
                                    </div>
                                </div>
                                <div class="destinations_content_box img_animation">
                                        <img src={dest6} alt="img" />
                                    <div class="destinations_content_inner">
                                        <h3 className="text-white">Australia</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12 col-12">
                                <div class="destinations_content_box img_animation">
                                        <img src={dest7} alt="img" />
                                    <div class="destinations_content_inner">
                                        <h3 className="text-white">London</h3>
                                    </div>
                                </div>
                                <div class="destinations_content_box img_animation">
                                        <img src={dest8} alt="img" />
                                    <div class="destinations_content_inner">
                                        <h3 className="text-white">USA</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TopDestinations;