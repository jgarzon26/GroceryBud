import { useState } from 'react'
import InputField from './InputField';

function App() {

  const [hasInput, hasUserInput] = useState(false);
  
  return (
    <section>
      <h1>Grocery Bud</h1>
      <InputField hasInput = {hasUserInput} />
    </section>
  );
}

export default App
