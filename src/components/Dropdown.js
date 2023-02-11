import React, {useRef} from "react";
import Multiselect from 'multiselect-react-dropdown';


export default function MultiDropdown(setDropDownList){

    var options = [{"country":'europe',"id":1},{"country":'austria',"id":1},
    {"country":'belgium',"id":1},{"country":'bulgaria',"id":1},{"country":'croatia',"id":1},{"country":'cyprus',"id":1},{"country":'czechia',"id":1},
    {"country":'denmark',"id":1},{"country":'estonia',"id":1},{"country":'finland',"id":1},{"country":'france',"id":1},{"country":'germany',"id":1},
    {"country":'greece',"id":1},{"country":'hungary',"id":1},{"country":'ireland',"id":1},{"country":'italia',"id":1},{"country":'latvia',"id":1},
    {"country":'lithuania',"id":1},{"country":'liechtenstein',"id":1},{"country":'luxembourg',"id":1},{"country":'malta',"id":1},{"country":'netherlands',"id":1},
    {"country":'norway',"id":1},{"country":'poland',"id":1},{"country":'portugal',"id":1},{"country":'romania',"id":1},{"country":'russia',"id":1},
    {"country":'scotland',"id":1},{"country":'slovakia',"id":1},{"country":'slovenia',"id":1},{"country":'spain',"id":1},{"country":'switzerland',"id":1},
    {"country":'sweden',"id":1},{"country":'turkey',"id":1},{"country":'unitedkingdom',"id":1},{"country":'ukraine',"id":1}];
        
        

        const [value_dd, setValue] = React.useState({});
        const Populate = useRef();
        console.log(value_dd.country)

        function onSelect(selectedList, selectedItem){
            console.log(selectedList)
        };
        
        function onRemove(selectedList, removedItem){
            console.log(selectedList)
        };


        return (
            <div>
                <Multiselect
                    //customCloseIcon={<>🇪🇺</>}
                    classname="countryselect"
                    name="countries"
                    id = "Populate"
                    options={options}
                    onSelect={onSelect}
                    onRemove={onRemove}
                    value={value_dd}
                    displayValue="country"
                    placeholder = "select country"
                        selectionLimit={1}
                        selectedValues={[]}
                        closeOnSelect
                        //selectedValues={[{"country":"europe","id":1}]}
                        getOptionLabel={(option) => option.country}
                        getOptionValue={(option) => option.id}
                        style={
                                {
                                    multiselectContainer:{
                                    color:"white",
                                    "border-radius":"5px"
                                    },
                                    searchBox: {
                                    'border-radius': '0px',
                                    height:"40px",
                                    padding:"1px",
                                    background: "white",
                                    "border-radius":"5px"
                                    },chips: { // To change css chips(Selected options)
                                    background: "#004494",
                                    color:"white",
                                    "font-size":"12px"
                                    },option: { // To change css for dropdown options
                                        color: "#004494",
                                        background:"white",
                                        "font-size":"12px"
                                    }
                                }
                        }
                />
            </div>
    );
};
