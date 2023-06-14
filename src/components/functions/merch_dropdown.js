import {useState, useEffect} from 'react';

const MerchDropdown = (props) => {
  const options = [

    {value: 'green_deal', text: 'Green Deal', url:'../merch/green_deal_shirt.jpg'},
    {value: 'fight_rights', text: 'Fight for your Rights', url:'../merch/fight_for_your_rights_shirt.jpg'},
    {value: 'lázadás', text: 'Lázadás', url:'../merch/lazadas.jpg'},
  
  ];
  

  const [selected, setSelected] = useState(options[0]);

  
  useEffect(()=>{
    setSelected('../merch/green_deal_shirt.jpg');
},[])


  
  const handleChange = event => {
    console.log(event.target.value);
    setSelected(event.target.value);
    props.setShirt(event.target.value);
  };

  return (
    <div>
        <select value={selected} onChange={handleChange}>
        {options.map(option => (
            <option key={option.value} value={option.url}>
            {option.text}
            </option>
            
        ))}
        </select>
        <p>
        <img src={selected}></img>
        </p>
    </div>
  );
};

export default MerchDropdown;
