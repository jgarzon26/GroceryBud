import { useEffect, useState } from 'react'
import Item from './Item'


function App() {

  const [notification, notifyUser] = useState("");
  const [item, setItem] = useState("");

  const handleSubmit = (event) => {
      event.preventDefault();
      let checkInput = item.length > 0 ? true : false
      !checkInput && props.notify("Please Enter Items To Add To Basket");
  }
    
  return (
    <section>
      <h3>{notification}</h3>
      <h1>Grocery Bud</h1>
      <form onSubmit={handleSubmit}>
          <label>
              <input type = "text" value = {item} onChange = {input => setItem(input.target.value) } placeholder = "e.g. eggs" />
          </label>
          <button type = "submit">Submit</button>
      </form>
      <ul>
        
      </ul>
    </section>
  );
}

export default App
