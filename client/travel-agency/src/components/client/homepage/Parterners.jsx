import React from "react";
import p1 from "../../../assets/img/partner/1.png";
import p2 from "../../../assets/img/partner/2.png";
import p3 from "../../../assets/img/partner/3.png";
import p4 from "../../../assets/img/partner/4.png";
import p5 from "../../../assets/img/partner/5.png";
import p6 from "../../../assets/img/partner/6.png";
import p7 from "../../../assets/img/partner/7.png";
import p8 from "../../../assets/img/partner/8.png";

const Parterners = () =>{
    return(
<section id="our_partners" className="section_padding">
        <div className="container">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="section_heading_center">
                        <h2>Our partners</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="partner_slider_area owl-theme owl-carousel">
                        <div className="partner_logo">
                            <a href="#!"><img src={p1} alt="logo"/></a>
                        </div>
                        <div className="partner_logo">
                            <a href="#!"><img src={p2} alt="logo"/></a>
                        </div>
                        <div className="partner_logo">
                            <a href="#!"><img src={p3} alt="logo"/></a>
                        </div>
                        <div className="partner_logo">
                            <a href="#!"><img src={p4} alt="logo"/></a>
                        </div>
                        <div className="partner_logo">
                            <a href="#!"><img src={p5} alt="logo"/></a>
                        </div>
                        <div className="partner_logo">
                            <a href="#!"><img src={p6} alt="logo"/></a>
                        </div>
                        <div className="partner_logo">
                            <a href="#!"><img src={p7} alt="logo"/></a>
                        </div>
                        <div className="partner_logo">
                            <a href="#!"><img src={p8} alt="logo"/></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Parterners;