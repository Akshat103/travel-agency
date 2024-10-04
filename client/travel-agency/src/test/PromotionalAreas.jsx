import React from "react";
import h1 from "/img/tab-img/hotel1.png";
import h2 from "/img/tab-img/hotel2.png";
import h3 from "/img/tab-img/hotel3.png";
import h4 from "/img/tab-img/hotel4.png";
import h5 from "/img/tab-img/hotel5.png";
import h6 from "/img/tab-img/hotel6.png";

const PromotionalAreas = () =>{
    return (
        <section id="promotional_tours" className="section_padding_top">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="section_heading_center">
                        <h2>Our best promotional tours</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="promotional_tour_slider owl-theme owl-carousel dot_style">
                        <div className="theme_common_box_two img_hover">
                            <div className="theme_two_box_img">
                                <a href="hotel-details.html"><img src={h1}alt="img"/></a>
                                <p><i className="fas fa-map-marker-alt"></i>New beach, Thailand</p>
                            </div>
                            <div className="theme_two_box_content">
                                <h4><a href="hotel-details.html">Kantua hotel, Thailand</a></h4>
                                <p><span className="review_rating">4.8/5 Excellent</span> <span className="review_count">(1214
                                        reviewes)</span></p>
                                <h3>$99.00 <span>Price starts from</span></h3>
                            </div>
                        </div>
                        <div className="theme_common_box_two img_hover">
                            <div className="theme_two_box_img">
                                <a href="hotel-details.html"><img src={h2} alt="img"/></a>
                                <p><i className="fas fa-map-marker-alt"></i>Indonesia</p>
                                <div className="discount_tab">
                                    <span>50%</span>
                                </div>
                            </div>
                            <div className="theme_two_box_content">
                                <h4><a href="hotel-details.html">Hotel paradise international</a></h4>
                                <p><span className="review_rating">4.8/5 Excellent</span> <span className="review_count">(1214
                                        reviewes)</span></p>
                                <h3>$99.00 <span>Price starts from</span></h3>
                            </div>
                        </div>
                        <div className="theme_common_box_two img_hover">
                            <div className="theme_two_box_img">
                                <a href="hotel-details.html"><img src={h3} alt="img"/></a>
                                <p><i className="fas fa-map-marker-alt"></i>Kualalampur</p>
                            </div>
                            <div className="theme_two_box_content">
                                <h4><a href="hotel-details.html">Hotel kualalampur</a></h4>
                                <p><span className="review_rating">4.8/5 Excellent</span> <span className="review_count">(1214
                                        reviewes)</span></p>
                                <h3>$99.00 <span>Price starts from</span></h3>
                            </div>
                        </div>
                        <div className="theme_common_box_two img_hover">
                            <div className="theme_two_box_img">
                                <a href="hotel-details.html"><img src={h4} alt="img"/></a>
                                <p><i className="fas fa-map-marker-alt"></i>Mariana island</p>
                                <div className="discount_tab">
                                    <span>50%</span>
                                </div>
                            </div>
                            <div className="theme_two_box_content">
                                <h4><a href="hotel-details.html">Hotel deluxe</a></h4>
                                <p><span className="review_rating">4.8/5 Excellent</span> <span className="review_count">(1214
                                        reviewes)</span></p>
                                <h3>$99.00 <span>Price starts from</span></h3>
                            </div>
                        </div>
                        <div className="theme_common_box_two img_hover">
                            <div className="theme_two_box_img">
                                <a href="hotel-details.html"><img src={h5} alt="img"/></a>
                                <p><i className="fas fa-map-marker-alt"></i>Beach view</p>
                            </div>
                            <div className="theme_two_box_content">
                                <h4><a href="hotel-details.html">Thailand grand suit</a></h4>
                                <p><span className="review_rating">4.8/5 Excellent</span> <span className="review_count">(1214
                                        reviewes)</span></p>
                                <h3>$99.00 <span>Price starts from</span></h3>
                            </div>
                        </div>
                        <div className="theme_common_box_two img_hover">
                            <div className="theme_two_box_img">
                                <a href="hotel-details.html"><img src={h6} alt="img"/></a>
                                <p><i className="fas fa-map-marker-alt"></i>Long island</p>
                            </div>
                            <div className="theme_two_box_content">
                                <h4><a href="hotel-details.html">Zefi resort and spa</a></h4>
                                <p><span className="review_rating">4.8/5 Excellent</span> <span className="review_count">(1214
                                        reviewes)</span></p>
                                <h3>$99.00 <span>Price starts from</span></h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default PromotionalAreas;