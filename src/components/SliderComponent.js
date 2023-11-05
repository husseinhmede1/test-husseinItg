import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getStatusText } from "../services/Utils";

const SliderComponent = (props) => {
    const selectedOption = props.selectedOption;
    const setSelectedOption = props.setSelectedOption;

    // Function to handle slider value change
    const handleSliderChange = (value) => {
        setSelectedOption(value);
    };

    return (
        <div className="slider-container">

            {/* Slider component with specified properties */}
            <Slider
                min={0}
                max={2}
                step={1}
                value={selectedOption}
                onChange={handleSliderChange}
            />

            {/* Labels for the slider options */}
            <div className="labels">
                <span>Edit</span>
                <span>Delete</span>
                <span>Status</span>
            </div>

            {/* Displaying the status text based on selectedOption */}
            <div className="status"
                style={{ color: selectedOption === 1 ? '#b33c3c' : '' }}
            >{getStatusText(selectedOption)}</div>
        </div>
    );
};

export default SliderComponent;
