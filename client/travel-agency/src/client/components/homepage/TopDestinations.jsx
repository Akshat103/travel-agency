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
                        <div className="destinations_content_box img_animation">
                            <img src={bigimg} alt="img" loading="lazy" />
                            <div className="destinations_content_inner">
                                <h2>Explore</h2>
                                <div style={{color:'white'}}>
                                    <h1>Unforgettable</h1>
                                    <h6><span>Journeys</span> <span>with Us</span></h6>
                                </div>
                                <h2>Holiday Packages</h2>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                                <div className="destinations_content_box img_animation">
                                    <img src={dest1} alt="img" loading="lazy" className="responsive-img" />
                                    <div className="destinations_content_inner">
                                        <h3 className="text-white" style={{fontWeight:"700"}}>Rajasthan</h3>
                                    </div>
                                </div>
                                <div className="destinations_content_box img_animation">
                                    <img src={dest2} alt="img" loading="lazy" className="responsive-img" />
                                    <div className="destinations_content_inner">
                                        <h3 className="text-white" style={{fontWeight:"700"}}>Gujarat</h3>
                                    </div>
                                </div>
                                <div className="destinations_content_box img_animation">
                                    <img src={dest6} alt="img" loading="lazy" className="responsive-img" />
                                    <div className="destinations_content_inner">
                                        <h3 className="text-white" style={{fontWeight:"700"}}>Odisha</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                                <div className="destinations_content_box img_animation">
                                    <img src={dest4} alt="img" loading="lazy" className="responsive-img" />
                                    <div className="destinations_content_inner">
                                        <h3 className="text-white" style={{fontWeight:"700"}}>Kerala</h3>
                                    </div>
                                </div>
                                <div className="destinations_content_box img_animation">
                                    <img src={dest5} alt="img" loading="lazy" className="responsive-img" />
                                    <div className="destinations_content_inner">
                                        <h3 className="text-white" style={{fontWeight:"700"}}>Uttar Pradesh</h3>
                                    </div>
                                </div>
                                <div className="destinations_content_box img_animation">
                                    <img src={dest3} alt="img" loading="lazy" className="responsive-img" />
                                    <div className="destinations_content_inner">
                                        <h3 className="text-white" style={{fontWeight:"700"}}>Tamil Nadu</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                                <div className="destinations_content_box img_animation">
                                    <img src={dest7} alt="img" loading="lazy" className="responsive-img" />
                                    <div className="destinations_content_inner">
                                        <h3 className="text-white" style={{fontWeight:"700"}}>Madhya Pradesh</h3>
                                    </div>
                                </div>
                                <div className="destinations_content_box img_animation">
                                    <img src={dest8} alt="img" loading="lazy" className="responsive-img" />
                                    <div className="destinations_content_inner">
                                        <h3 className="text-white" style={{fontWeight:"700"}}>Karnataka</h3>
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