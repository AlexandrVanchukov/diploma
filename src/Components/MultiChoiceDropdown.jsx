import {useState} from "react";

const MultiChoiceDropdown = ({ options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        onSelect(option);
    };

    return (
        <div className="multi-choice-dropdown">
            <select value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
                <option value="" disabled>Select an option</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};
export default MultiChoiceDropdown;