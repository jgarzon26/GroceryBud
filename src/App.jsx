import { useEffect, useState } from 'react'
import Item from './Item'

let listID = 0;
let selectedIndexForEdit = 0;
const countDownTimerForNotify = 3;
let timer = null;
let alertStyle = "";


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
        alertStyle = "alert alert-success";
        notifyUser(`'${item}' Added To The Basket`);
        setItem("");
      }
      else
      {
        notifyUser("Please Enter Items To Add To Basket");
        alertStyle = "alert alert-danger";
      }
  }

  const handleEdit = event => {
    event.preventDefault();
    checkTimerIsRunning();
    alertStyle = "alert alert-success";
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
    alertStyle = "alert alert-success";
    notifyUser(`'${props.item}' Removed From The Basket`);
  }

  const clearAll = () => {
    setItemList([]);
    alertStyle = "alert alert-success";
    notifyUser("Basket Is Empty");
    alertStyle = "alert alert-success";
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
        alertStyle = "";
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
    <div className = "d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <section className='p-5 card border border-info border-1 shadow-lg'>
        <h3 className = {`${alertStyle}`}>{notification}</h3>
        <h1 className ='card-header card-title text-center'>Grocery Bud</h1>
        <div className='card-body'>
          <form onSubmit={handler} className="flex flex-column flex-wrap">
              <label>
              <input 
                className='form-control form-control-lg input'
                type = "text" 
                value = {item} 
                onChange = {input => setItem(input.target.value) } 
                placeholder = "e.g. eggs" 
              />
              </label>
              <button type = "submit" className='btn btn-outline-success me-4 px-4'>{submitButton}</button>
          </form>
          <ul className='list-group'>
            {itemList.map(
              item => (
                <Item id = {item.id} item = {item.item} changeItemFunc = {editItem} deleteItemFunc = {deleteItem} />
              )
            )}
          </ul>
        </div>
        <button onClick = {clearAll} className = "btn btn-outline-danger" >Clear Items</button>
      </section>
    </div>
  );
}

export default App
