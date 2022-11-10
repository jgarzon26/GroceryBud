import { useEffect, useState } from 'react'
import Item from './Item'

var listID = 0;

function App() {

  const [notification, notifyUser] = useState("");
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState([]);

  const [submitButton, changeSubmitButton] = useState("Submit");
  const [handler, changeHandler] = useState(handleSubmit);

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
    //change item of selected element

    changeSubmitButton("Submit");
    changeHandler(handleSubmit);
    notifyUser(`Item Changed To '${item}'`);
    setItem("");
  }

  const editItem = ({item}) => {
    alert(item);
    setItem(item);
    changeSubmitButton("Edit");
    changeHandler(handleEdit);
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
