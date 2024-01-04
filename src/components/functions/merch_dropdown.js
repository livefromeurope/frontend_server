import {useState, useEffect} from 'react';

const MerchDropdown = (props) => {
  const options = [
    {value: 'lázadás', text: 'Lázadás/Riot', url:'../merch/lazadas.jpg'},
    {value: 'diversity', text: 'Diversity', url:'../merch/diversity.jpg'},
    {value: 'green_deal', text: 'Green Deal', url:'../merch/green_deal_shirt.jpg'},
    {value: 'fight_rights', text: 'Fight for your Rights', url:'../merch/fight_for_your_rights_shirt.jpg'},
    {value: 'Stickers', text: '20xStickers', url:'../merch/lfe_stickers.jpg'},
  
  ];
  

  const [selected, setSelected] = useState(options[0]);

  
  useEffect(()=>{
    setSelected('../merch/lazadas.jpg');
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
