import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelcomeModal = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const userType = localStorage.getItem("userType");

    useEffect(() => {
        const hasVisited = localStorage.getItem("hasVisitedHomePage");
        if (!hasVisited) {
            setShow(true);
            localStorage.setItem("hasVisitedHomePage", "true");
        }

        const handleTabClose = () => localStorage.removeItem("hasVisitedHomePage");
        window.addEventListener("beforeunload", handleTabClose);

        return () => window.removeEventListener("beforeunload", handleTabClose);
    }, []);

    const handleClose = () => setShow(false);
    const handleGoToLogin = () => {
        setShow(false);
        navigate("/login");
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains("modal-overlay")) {
            handleClose();
        }
    };

    if (!show) return null;

    return (
        <div
            className="modal-overlay"
            onClick={handleOutsideClick}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1050,
            }}
        >
            <div
                className="modal-dialog"
                role="document"
                style={{
                    maxWidth: "500px",
                    width: "90%",
                    transform: "translate(-50%, -50%)",
                    position: "fixed", 
                    top: "50%",
                    left: "50%",
                }}
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Welcome to Yara Holidays</h5>
                        <button
                            type="button"
                            className="close"
                            aria-label="Close"
                            onClick={handleClose}
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                fontSize: "1.5rem",
                                color: "#000",
                            }}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>
                            Discover the world with Yara Holidays! We use cookies to enhance
                            your experience and provide you with seamless booking services.
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleClose}
                        >
                            Accept
                        </button>
                        {!userType && (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleGoToLogin}
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeModal;
