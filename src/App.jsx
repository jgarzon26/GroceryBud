import { useEffect, useState } from 'react'
import Item from './Item'

let listID = 0;
let selectedIndexForEdit = 0;
const countDownTimerForNotify = 3;
let timer = null;

function App() {
  const [counter, setCounter] = useState(0);

  const [notification, notifyUser] = useState("");
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState([]);

  const [submitButton, changeSubmitButton] = useState("Submit");
  const [button, switchButton] = useState(0); // 0 - submit | 1 - edit

  const handleSubmit = event => {
      event.preventDefault();// prevent page refresh
      let checkInput = item.length > 0 ? true : false
      if(checkInput){
        checkTimerIsRunning();
        setItemList([...itemList, {id: listID++, item: item}]);
        notifyUser(`'${item}' Added To The Basket`);
        setItem("");
      }
      else
        notifyUser("Please Enter Items To Add To Basket");
  }

  const handleEdit = event => {
    event.preventDefault();
    checkTimerIsRunning();
    itemList[selectedIndexForEdit].item = item;
    localStorage.setItem("itemlist", JSON.stringify(itemList));  
    changeSubmitButton("Submit");
    switchButton(0);
    notifyUser(`Item Changed To '${item}'`);
    setItem("");
  }

  const checkTimerIsRunning = () => {
    if(timer != null)
    {
      clearTimeout(timer);
      timer = null;
    }
  }

  let handler = button == 0 ? handleSubmit : handleEdit;

  const editItem = (props) => {
    getCurrentIndexOfItem(props);
    setItem(props.item);
    changeSubmitButton("Edit");
    switchButton(1);
  }

  const deleteItem = (props) => {
    checkTimerIsRunning();
    getCurrentIndexOfItem(props);
    itemList.splice(selectedIndexForEdit, 1);
    localStorage.setItem("itemlist", JSON.stringify(itemList));  
    notifyUser(`'${props.item}' Removed From The Basket`);
  }

  const clearAll = () => {
    setItemList([]);
    notifyUser("Basket Is Empty");
  }

  const getCurrentIndexOfItem = (props) => {
    for(let i = 0; i < itemList.length; i++){
      if(itemList[i].id == props.id){
        selectedIndexForEdit = i;
        break;
      }
    }
  }

  useEffect(() => {
    if(notification.length > 0){
      timer = setTimeout(() => setCounter(counter => counter + 1), 1000 * countDownTimerForNotify);
      if(counter == countDownTimerForNotify)
      {
        notifyUser("");
        setCounter(0);
      }
    }
  }, [notification, counter])

  useEffect(() => {
    const itemlist = JSON.parse(localStorage.getItem("itemlist"));
    itemlist.length > 0 && setItemList(itemlist);
  },[])

  useEffect(() => {
    localStorage.setItem("itemlist", JSON.stringify(itemList));    
  }, [itemList])
    
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
            <Item id = {item.id} item = {item.item} changeItemFunc = {editItem} deleteItemFunc = {deleteItem} />
          )
        )}
      </ul>
      <button onClick = {clearAll} >Clear Items</button>
    </section>
  );
}

export default App
