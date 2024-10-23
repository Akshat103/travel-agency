import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Train = () => {
    const navigate = useNavigate();
    const irctcStatus = localStorage.getItem('irctc');

    const handleOnboardNavigation = () => {
        navigate('/irctc/onboard');
    };

    const handleIrctcNavigation = () => {
        navigate('/irctc');
    };
    return (
        <div class="tab-pane fade" id="train" role="tabpanel" aria-labelledby="train-tab">
            <div class="row">
                <div class="col-lg-12">
                    <div class="tour_search_form">
                        <div className="text-center">
                            <h3 className="mb-4">IRCTC Services</h3>
                            <div className="tour_search_form p-4">
                                {irctcStatus === '0' ? (
                                    <Button
                                        variant="primary"
                                        onClick={handleOnboardNavigation}
                                        className="px-4 py-2"
                                    >
                                        Complete Onboarding
                                    </Button>
                                ) : (
                                    <Button
                                        variant="success"
                                        onClick={handleIrctcNavigation}
                                        className="px-4 py-2"
                                    >
                                        Proceed to IRCTC Services
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Train
