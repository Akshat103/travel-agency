import React from "react";
import { Link } from "react-router-dom";
import h1 from "/img/tab-img/hotel1.png";
import h2 from "/img/tab-img/hotel2.png";
import h3 from "/img/tab-img/hotel3.png";
import h4 from "/img/tab-img/hotel4.png";
import h5 from "/img/tab-img/hotel5.png";
import h6 from "/img/tab-img/hotel6.png";
import h7 from "/img/tab-img/hotel7.png";
import h8 from "/img/tab-img/hotel8.png";

const Explore = ()  =>{
    return (
        <section id="explore_area" class="section_padding_top">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div class="section_heading_center">
                        <h2>Explore our hot deals</h2>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 offset-lg-3">
                    <div class="theme_nav_tab">
                        <nav class="theme_nav_tab_item">
                            <div class="nav nav-tabs" id="nav-tab1" role="tablist">
                                <button class="nav-link active" id="nav-hotels-tab" data-bs-toggle="tab" data-bs-target="#nav-hotels" type="button" role="tab" aria-controls="nav-hotels" aria-selected="true">Hotels</button>
                                <button class="nav-link" id="nav-tours-tab" data-bs-toggle="tab" data-bs-target="#nav-tours" type="button" role="tab" aria-controls="nav-tours" aria-selected="false">Tours</button>
                                <button class="nav-link" id="nav-space-tab" data-bs-toggle="tab" data-bs-target="#nav-space" type="button" role="tab" aria-controls="nav-space" aria-selected="false">Space</button>
                                <button class="nav-link" id="nav-events-tab" data-bs-toggle="tab" data-bs-target="#nav-events" type="button" role="tab" aria-controls="nav-events" aria-selected="false">Events</button>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-hotels" role="tabpanel" aria-labelledby="nav-hotels-tab">
                            <div class="row">
                                <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div class="theme_common_box_two img_hover">
                                        <div class="theme_two_box_img">
                                            <Link to="hotel-details.html">
                                                <img src={h1} alt="img"/>
                                            </Link>
                                            <p><i class="fas fa-map-marker-alt"></i>New beach, Thailand</p>
                                        </div>
                                        <div class="theme_two_box_content">
                                            <h4><Link to="hotel-details.html">Kantua hotel, Thailand</Link></h4>
                                            <p><span class="review_rating">4.8/5 Excellent</span> <span class="review_count">(1214
                                                    reviewes)</span></p>
                                            <h3>$99.00 <span>Price starts from</span></h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div class="theme_common_box_two img_hover">
                                        <div class="theme_two_box_img">
                                            <Link to="hotel-details.html">
                                                <img src={h2} alt="img"/>
                                            </Link>
                                            <p><i class="fas fa-map-marker-alt"></i>Indonesia</p>
                                            <div class="discount_tab">
                                                <span>50%</span>
                                            </div>

                                        </div>
                                        <div class="theme_two_box_content">
                                            <h4><Link to="hotel-details.html">Hotel paradise international</Link></h4>
                                            <p><span class="review_rating">4.8/5 Excellent</span> <span class="review_count">(1214
                                                    reviewes)</span></p>
                                            <h3>$99.00 <span>Price starts from</span></h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div class="theme_common_box_two img_hover">
                                        <div class="theme_two_box_img">
                                            <Link to="hotel-details.html">
                                                <img src={h3} alt="img"/>
                                            </Link>
                                            <p><i class="fas fa-map-marker-alt"></i>Kualalampur</p>
                                        </div>
                                        <div class="theme_two_box_content">
                                            <h4><Link to="hotel-details.html">Hotel kualalampur</Link></h4>
                                            <p><span class="review_rating">4.8/5 Excellent</span> <span class="review_count">(1214
                                                    reviewes)</span></p>
                                            <h3>$99.00 <span>Price starts from</span></h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div class="theme_common_box_two img_hover">
                                        <div class="theme_two_box_img">
                                            <Link to="hotel-details.html">
                                                <img src={h4} alt="img"/>
                                            </Link>
                                            <p><i class="fas fa-map-marker-alt"></i>Mariana island</p>
                                            <div class="discount_tab">
                                                <span>50%</span>
                                            </div>
                                        </div>
                                        <div class="theme_two_box_content">
                                            <h4><Link to="hotel-details.html">Hotel deluxe</Link></h4>
                                            <p><span class="review_rating">4.8/5 Excellent</span> <span class="review_count">(1214
                                                    reviewes)</span></p>
                                            <h3>$99.00 <span>Price starts from</span></h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div class="theme_common_box_two img_hover">
                                        <div class="theme_two_box_img">
                                            <Link to="hotel-details.html">
                                                <img src={h5} alt="img"/>
                                            </Link>
                                            <p><i class="fas fa-map-marker-alt"></i>Kathmundu, Nepal</p>
                                        </div>
                                        <div class="theme_two_box_content">
                                            <h4><Link to="hotel-details.html">Hotel rajavumi</Link></h4>
                                            <p><span class="review_rating">4.8/5 Excellent</span> <span class="review_count">(1214
                                                    reviewes)</span></p>
                                            <h3>$99.00 <span>Price starts from</span></h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div class="theme_common_box_two img_hover">
                                        <div class="theme_two_box_img">
                                            <Link to="hotel-details.html">
                                                <img src={h6} alt="img"/>
                                            </Link>
                                            <p><i class="fas fa-map-marker-alt"></i>Beach view</p>
                                        </div>
                                        <div class="theme_two_box_content">
                                            <h4><Link to="hotel-details.html">Thailand grand suit</Link></h4>
                                            <p><span class="review_rating">4.8/5 Excellent</span> <span class="review_count">(1214
                                                    reviewes)</span></p>
                                            <h3>$99.00 <span>Price starts from</span></h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div class="theme_common_box_two img_hover">
                                        <div class="theme_two_box_img">
                                            <Link to="hotel-details.html">
                                                <img src={h7} alt="img"/>
                                            </Link>
                                            <p><i class="fas fa-map-marker-alt"></i>Long island</p>
                                        </div>
                                        <div class="theme_two_box_content">
                                            <h4><Link to="hotel-details.html">Zefi resort and spa</Link></h4>
                                            <p><span class="review_rating">4.8/5 Excellent</span> <span class="review_count">(1214
                                                    reviewes)</span></p>
                                            <h3>$99.00 <span>Price starts from</span></h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                                    <div class="theme_common_box_two img_hover">
                                        <div class="theme_two_box_img">
                                            <Link to="hotel-details.html">
                                                <img src={h8} alt="img"/>
                                            </Link>
                                            <p><i class="fas fa-map-marker-alt"></i>Philippine</p>
                                        </div>
                                        <div class="theme_two_box_content">
                                            <h4><Link to="hotel-details.html">Manila international resort</Link></h4>
                                            <p><span class="review_rating">4.8/5 Excellent</span> <span class="review_count">(1214
                                                    reviewes)</span></p>
                                            <h3>$99.00 <span>Price starts from</span></h3>
                                        </div>
                                    </div>
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

export default Explore;