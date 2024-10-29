import React from "react";
import dest1 from "../../../assets/img/TopDestinations/destination1.jpg";
import dest2 from "../../../assets/img/TopDestinations/destination2.jpg";
import dest3 from "../../../assets/img/TopDestinations/destination3.jpg";
import dest4 from "../../../assets/img/TopDestinations/destination4.jpg";
import dest5 from "../../../assets/img/TopDestinations/destination5.jpg";
import dest6 from "../../../assets/img/TopDestinations/destination6.jpg";
import dest7 from "../../../assets/img/TopDestinations/destination7.jpg";
import dest8 from "../../../assets/img/TopDestinations/destination8.jpg";
import bigimg from "../../../assets/img/TopDestinations/big-img.jpg";

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
                            <img src={bigimg} alt="img" loading='lazy' />
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
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                                <div className="destinations_content_box img_animation">
                                    <img src={dest1} alt="img" loading="lazy" className="responsive-img" />
                                    <div className="destinations_content_inner">
                                        <h3 className="text-white">Rajasthan</h3>
                                    </div>
                                </div>
                                <div className="destinations_content_box img_animation">
                                    <img src={dest2} alt="img" loading="lazy" className="responsive-img" />
                                    <div className="destinations_content_inner">
                                        <h3 className="text-white">Gujarat</h3>
                                    </div>
                                </div>
                                <div className="destinations_content_box img_animation">
                                    <img src={dest6} alt="img" loading="lazy" className="responsive-img" />
                                    <div className="destinations_content_inner">
                                        <h3 className="text-white">Nagaland</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                                <div className="destinations_content_box img_animation">
                                    <img src={dest4} alt="img" loading="lazy" className="responsive-img" />
                                    <div className="destinations_content_inner">
                                        <h3 className="text-white">Kerala</h3>
                                    </div>
                                </div>
                                <div className="destinations_content_box img_animation">
                                    <img src={dest5} alt="img" loading="lazy" className="responsive-img" />
                                    <div className="destinations_content_inner">
                                        <h3 className="text-white">Uttar Pradesh</h3>
                                    </div>
                                </div>
                                <div className="destinations_content_box img_animation">
                                    <img src={dest3} alt="img" loading="lazy" className="responsive-img" />
                                    <div className="destinations_content_inner">
                                        <h3 className="text-white">Tamil Nadu</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                                <div className="destinations_content_box img_animation">
                                    <img src={dest7} alt="img" loading="lazy" className="responsive-img" />
                                    <div className="destinations_content_inner">
                                        <h3 className="text-white">Madhya Pradesh</h3>
                                    </div>
                                </div>
                                <div className="destinations_content_box img_animation">
                                    <img src={dest8} alt="img" loading="lazy" className="responsive-img" />
                                    <div className="destinations_content_inner">
                                        <h3 className="text-white">Karnataka</h3>
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