import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Train = () => {
    const navigate = useNavigate();
    const irctcStatus = localStorage.getItem('irctc');

    const handleOnboardNavigation = () => {
        if (irctcStatus === null) {
            navigate('/login')
        } else {
            navigate('/irctc/onboard');
        }
    };

    const handleIrctcNavigation = () => {
        if (irctcStatus === null) {
            navigate('/login')
        } else {
            navigate('/irctc');
        }
    };
    
    return (
        <div className="tab-pane fade" id="train" role="tabpanel" aria-labelledby="train-tab">
            <div className="row">
                <div className="col-lg-12">
                    <div className="tour_search_form">
                        <div className="text-center">
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
                                        variant="primary"
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
