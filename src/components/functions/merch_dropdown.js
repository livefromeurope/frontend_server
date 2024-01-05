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
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(()=>{
    setSelected('../merch/lazadas.jpg');
},[])


  
  const handleChange = event => {
    setSelected(event.target.value);
    props.setShirt(event.target.value);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
        <p onClick={toggleModal}>
            <img src={selected} style={{ cursor: 'pointer' }} />
        </p>
        {isModalOpen && (
            <div className="modal" onClick={toggleModal}>
                <div className="modal-content">
                    <span className="close">&times;</span>
                    <img src={selected} className="enlarged-image" />
                </div>
            </div>
        )}
    </div>
);
};

export default MerchDropdown;

