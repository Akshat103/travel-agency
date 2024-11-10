import React from "react";
import img1 from "../../../assets/img/imagination/imagination1.webp"
import img2 from "../../../assets/img/imagination/imagination2.webp"
import img3 from "../../../assets/img/imagination/imagination3.webp"

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
                            <img src={img1} alt="img" loading='lazy'/>
                        <h3 className="text-white" style={{fontWeight:"700"}}>Discount for all Airlines</h3>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                    <div class="imagination_boxed">
                            <img src={img2} alt="img" loading='lazy'/>
                        <h3 className="text-white" style={{fontWeight:"700"}}>Travel around<span>the world</span></h3>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 col-12">
                    <div class="imagination_boxed">
                            <img src={img3} alt="img" loading='lazy'/>
                        <h3 className="text-white" style={{fontWeight:"700"}}>Luxury resorts<span>top deals</span></h3>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Imagination;