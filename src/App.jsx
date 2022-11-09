import { useEffect, useState } from 'react'
import Item from './Item'

var listID = 0;

function App() {

  const [notification, notifyUser] = useState("");
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState([]);
  const [submitButton, changeSubmitButton] = useState("Submit");

  const handleSubmit = (event) => {
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

  const editItem = currentItem => {
    setItem(currentItem);
    changeSubmitButton("Edit");
  }
    
  return (
    <section>
      <h3>{notification}</h3>
      <h1>Grocery Bud</h1>
      <form onSubmit={handleSubmit}>
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
