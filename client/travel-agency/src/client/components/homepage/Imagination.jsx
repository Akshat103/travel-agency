import React from "react";
import img1 from "/img/imagination/imagination1.png"
import img2 from "/img/imagination/imagination2.png"
import img3 from "/img/imagination/imagination3.png"
import { Link } from "react-router-dom";

const Imagination = () => {
    return (
        <section id="go_beyond_area" class="section_padding_top">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                    <div class="heading_left_area">
                        <h2>Go beyond your <span>imagination</span></h2>
                        <h5>Discover your ideal experience with us</h5>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                    <div class="imagination_boxed">
                        <Link to="top-destinations.html">
                            <img src={img1} alt="img"/>
                        </Link>
                        <h3><Link to="top-destinations.html">7% Discount for all <span>Airlines</span></Link></h3>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                    <div class="imagination_boxed">
                        <Link to="top-destinations.html">
                            <img src={img2} alt="img"/>
                        </Link>
                        <h3><Link to="#!">Travel around<span>the world</span></Link></h3>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                    <div class="imagination_boxed">
                        <Link to="top-destinations.html">
                            <img src={img3} alt="img"/>
                        </Link>
                        <h3><Link to="top-destinations.html">Luxury resorts<span>top deals</span></Link></h3>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Imagination;