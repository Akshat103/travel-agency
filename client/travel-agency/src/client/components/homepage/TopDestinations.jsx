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

const TopDestinations = () =>{
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
                        <img src={bigimg} alt="img"/>
                        <div class="destinations_content_inner">
                            <h2>Up to</h2>
                            <div class="destinations_big_offer">
                                <h1>50</h1>
                                <h6><span>%</span> <span>Off</span></h6>
                            </div>
                            <h2>Holiday packages</h2>
                            <a href="top-destinations.html" class="btn btn_theme btn_md">Book now</a>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-12 col-12">
                            <div class="destinations_content_box img_animation">
                                <a href="top-destinations.html">
                                    <img src={dest1} alt="img"/>
                                </a>
                                <div class="destinations_content_inner">
                                    <h3><a href="top-destinations.html">China</a></h3>
                                </div>
                            </div>
                            <div class="destinations_content_box img_animation">
                                <a href="top-destinations.html">
                                    <img src={dest2} alt="img"/>
                                </a>
                                <div class="destinations_content_inner">
                                    <h3><a href="top-destinations.html">Darjeeling</a></h3>
                                </div>
                            </div>
                            <div class="destinations_content_box img_animation">
                                <a href="top-destinations.html">
                                    <img src={dest3} alt="img"/>
                                </a>
                                <div class="destinations_content_inner">
                                    <h3><a href="top-destinations.html">Malaysia</a></h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 col-12">
                            <div class="destinations_content_box img_animation">
                                <a href="top-destinations.html">
                                    <img src={dest4} alt="img"/>
                                </a>
                                <div class="destinations_content_inner">
                                    <h3><a href="top-destinations.html">Gangtok</a></h3>
                                </div>
                            </div>
                            <div class="destinations_content_box img_animation">
                                <a href="top-destinations.html">
                                    <img src={dest5} alt="img"/>
                                </a>
                                <div class="destinations_content_inner">
                                    <h3><a href="top-destinations.html">Thailand</a></h3>
                                </div>
                            </div>
                            <div class="destinations_content_box img_animation">
                                <a href="top-destinations.html">
                                    <img src={dest6} alt="img"/>
                                </a>
                                <div class="destinations_content_inner">
                                    <h3><a href="top-destinations.html">Australia</a></h3>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-12 col-12">
                            <div class="destinations_content_box img_animation">
                                <a href="top-destinations.html">
                                    <img src={dest7} alt="img"/>
                                </a>
                                <div class="destinations_content_inner">
                                    <h3><a href="top-destinations.html">London</a></h3>
                                </div>
                            </div>
                            <div class="destinations_content_box img_animation">
                                <a href="top-destinations.html">
                                    <img src={dest8} alt="img"/>
                                </a>
                                <div class="destinations_content_inner">
                                    <h3><a href="top-destinations.html">USA</a></h3>
                                </div>
                            </div>
                            <div class="destinations_content_box">
                                <a href="top-destinations.html" class="btn btn_theme btn_md w-100">View all</a>
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