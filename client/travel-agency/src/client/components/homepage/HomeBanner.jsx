import React from "react";

const HomeBanner = () => {
    return (
        <section id="home_one_banner">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        <div className="banner_one_text">
                            <div className="text-center p-5 position-relative">
                                <div className="position-relative" style={{ zIndex: 1 }}>
                                    <p className="display-3 fw-bold text-light mb-2"
                                        style={{
                                            fontFamily: "'Playfair Display', serif",
                                            letterSpacing: '2px',
                                            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7), -1px -1px 3px rgba(255, 255, 255, 0.4)',
                                            WebkitBackgroundClip: 'text',
                                            color: 'transparent',
                                            padding: '10px 20px',
                                            borderRadius: '10px'
                                        }}
                                    >
                                        Yara Holidays
                                    </p>

                                    <h2 className="h4 text-light mb-4" style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, letterSpacing: '0.5px', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)' }}>
                                        Your Travel Planner
                                    </h2>

                                    <p className="lead text-light mx-auto" style={{ maxWidth: '600px', fontFamily: "'Open Sans', sans-serif", fontWeight: 300, lineHeight: '1.8', textShadow: '1px 1px 3px rgba(0, 0, 0, 0.6)' }}>
                                        Discover amazing destinations and create unforgettable memories with our personalized travel experiences.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeBanner;