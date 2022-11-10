import { useEffect, useState } from 'react'
import Item from './Item'

let listID = 0;
let selectedIndexForEdit = 0;

function App() {
  const [notification, notifyUser] = useState("");
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState([]);

  const [submitButton, changeSubmitButton] = useState("Submit");
  const [button, switchButton] = useState(0);

  const handleSubmit = event => {
      event.preventDefault();// prevent page refresh
      let checkInput = item.length > 0 ? true : false
      if(checkInput){
        setItemList([...itemList, {id: listID++, item: item}]);
        notifyUser(`'${item}' Added To The Basket`);
        setItem("");
      }
      else
        notifyUser("Please Enter Items To Add To Basket");
  }

  const handleEdit = event => {
    event.preventDefault();
    itemList[selectedIndexForEdit].item = item;
    changeSubmitButton("Submit");
    switchButton(0);
    notifyUser(`Item Changed To '${item}'`);
    setItem("");
  }

  let handler = button == 0 ? handleSubmit : handleEdit;

  const editItem = (props) => {
    getCurrentIndexOfItem(props);
    setItem(props.item);
    changeSubmitButton("Edit");
    switchButton(1);
  }

  const getCurrentIndexOfItem = (props) => {
    for(let i = 0; i < itemList.length; i++){
      if(itemList[i].id == props.id){
        selectedIndexForEdit = i;
        break;
      }
    }
  }
    
  return (
    <section>
      <h3>{notification}</h3>
      <h1>Grocery Bud</h1>
      <form onSubmit={handler}>
          <label>
          <input 
            type = "text" 
            value = {item} 
            onChange = {input => setItem(input.target.value) } 
            placeholder = "e.g. eggs" 
          />
          </label>
          <button type = "submit">{submitButton}</button>
      </form>
      <ul>
        {itemList.map(
          item => (
            <Item id = {item.id} item = {item.item} changeItemFunc = {editItem} />
          )
        )}
      </ul>
    </section>
  );
}

export default App
