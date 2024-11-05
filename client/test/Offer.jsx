import React from "react";
import offer1 from "/img/offer/offer1.png";
import offer2 from "/img/offer/offer2.png";
import offer3 from "/img/offer/offer3.png";

const Offer = () => {
    return (
        <section id="offer_area" class="section_padding_top">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                        <div class="offer_area_box d-none-phone img_animation">
                            <img src={offer1} alt="img" />
                            <div class="offer_area_content">
                                <h2>Special Offers</h2>
                                <p>Invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd dolor sit amet. Lorem ipsum dolor sit amet.</p>
                                <a href="#!" class="btn btn_theme btn_md">Holiday deals</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 col-12">
                        <div class="offer_area_box img_animation">
                            <img src={offer2} alt="img" />
                            <div class="offer_area_content">
                                <h2>News letter</h2>
                                <p>Invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et.</p>
                                <a href="#!" class="btn btn_theme btn_md">Subscribe now</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 col-12">
                        <div class="offer_area_box img_animation">
                            <img src={offer3} alt="img" />
                            <div class="offer_area_content">
                                <h2>Travel tips</h2>
                                <p>Invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et.</p>
                                <a href="#!" class="btn btn_theme btn_md">Get tips</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Offer;