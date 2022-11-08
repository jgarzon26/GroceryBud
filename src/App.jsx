import { useState } from 'react'
import InputField from './InputField';

function App() {

  const [notification, notifyUser] = useState("");
  
  return (
    <section>
      <h3>{notification}</h3>
      <h1>Grocery Bud</h1>
      <InputField notify = {notify => notifyUser(notify)} />
    </section>
  );
}

export default App
