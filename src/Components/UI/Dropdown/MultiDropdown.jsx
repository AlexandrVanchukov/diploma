import React from 'react';
import classes from './MultiDropdown.scss';

const MultiDropdown = ({children, ...props}) => {

    let multiselect_block = document.querySelectorAll(".multiselect_block");
    multiselect_block.forEach(parent => {
        let label = parent.querySelector(".field_multiselect");
        let select = parent.querySelector(".field_select");
        let text = label.innerHTML;
        let output;
        select.addEventListener("change", function(element) {
            let selectedOptions = this.selectedOptions;
            label.innerHTML = "";
            output = output + option.value + ",";
            for (let option of selectedOptions) {
                let button = document.createElement("button");
                button.type = "button";
                button.className = "btn_multiselect";
                button.textContent = option.id;
                button.onclick = _ => {
                    option.selected = false;
                    button.remove();
                    if (!select.selectedOptions.length) label.innerHTML = text
                };
                label.append(button);
            }
        })
    })

    return (

            <section className="section_top" id="registration">
                        <form className="createAccount" name="" action="">
                            <div className="createAccount_inner">
                                <div className="form_label">
                                    <div className="multiselect_block">
                                        <label htmlFor="select-1" className="field_multiselect">{props.name}</label>
                                        <input id="checkbox-1" className="multiselect_checkbox" type="checkbox"/>
                                            <label htmlFor="checkbox-1" className="multiselect_label"></label>
                                            <select id="select-1" className="field_select" multiple
                                                    style={{height: "calc(4 * 38px)"}}>
                                                {children}
                                            </select>
                                    </div>
                                </div>
                            </div>
                        </form>
            </section>

    );
};

export default MultiDropdown;