import React from 'react';
import './style.css'
const LoaderComponent = ({ loader }) => {

    return (
        <>
            {
                loader && <div className="loader-container">
                    <div className="loader"></div>
                </div>
            }
        </>
    );
};

export default LoaderComponent;
