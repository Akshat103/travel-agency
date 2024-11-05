import React from "react";

const Search = () => {
    return (
        <>
            <div className="search-overlay">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="search-overlay-layer"></div>
                        <div className="search-overlay-layer"></div>
                        <div className="search-overlay-layer"></div>
                        <div className="search-overlay-close">
                            <span className="search-overlay-close-line"></span>
                            <span className="search-overlay-close-line"></span>
                        </div>
                        <div className="search-overlay-form">
                            <form>
                                <input type="text" className="input-search" placeholder="Search here..." />
                                <button type="button"><i className="fas fa-search"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;