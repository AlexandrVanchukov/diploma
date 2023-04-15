import React, {useEffect, useState} from 'react';
import classes from './MultiDropdown.scss';

const MultiDropdown = ({children, add, del, ...props}) => {

    const [filters,setFilters] = useState([]);
    let multiselect_block = document.querySelectorAll(".multiselect_block");
    multiselect_block.forEach(parent => {
        let label = parent.querySelector(".field_multiselect");
        let select = parent.querySelector(".field_select");
        let text = label.innerHTML;

        select.addEventListener("change", function(element) {
            let selectedOptions = this.selectedOptions;
            label.innerHTML = "";
            let arr= [];
            for(let i=0; i < this.selectedOptions.length;i++){
                arr.push(this.selectedOptions[i].value)
                setFilters(arr);
                console.log("arr: " + arr);
                console.log(i +":"+ this.selectedOptions[i].value);
            }
            add(arr);
            for (let option of selectedOptions) {
                let button = document.createElement("button");
                button.type = "button";
                button.className = "btn_multiselect";
                button.textContent = option.id;
                button.onclick = _ => {
                    option.selected = false;
                    arr.splice(arr.indexOf(option.value),1);
                    console.log("Удаляем" + option.value);
                    console.log("arr: " + arr);
                    setFilters(arr);
                    button.remove();
                    if (!select.selectedOptions.length){
                        label.innerHTML = props.name;
                        arr = [];
                        setFilters(arr);
                    }
                };
                label.append(button);

            }
        })
    })
    function addF() {
        add(filters);
    }




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