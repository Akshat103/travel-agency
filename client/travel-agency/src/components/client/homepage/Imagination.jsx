import React from "react";
import img1 from "../../../assets/img/imagination/imagination1.png"
import img2 from "../../../assets/img/imagination/imagination2.png"
import img3 from "../../../assets/img/imagination/imagination3.png"

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
                        <a href="top-destinations.html">
                            <img src={img1} alt="img"/>
                        </a>
                        <h3><a href="top-destinations.html">7% Discount for all <span>Airlines</span></a></h3>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                    <div class="imagination_boxed">
                        <a href="top-destinations.html">
                            <img src={img2} alt="img"/>
                        </a>
                        <h3><a href="#!">Travel around<span>the world</span></a></h3>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                    <div class="imagination_boxed">
                        <a href="top-destinations.html">
                            <img src={img3} alt="img"/>
                        </a>
                        <h3><a href="top-destinations.html">Luxury resorts<span>top deals</span></a></h3>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Imagination;