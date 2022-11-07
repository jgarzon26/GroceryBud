import { useState } from "react";


export default function InputField(hasInput){

    const [item, setItem] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        hasInput = item.length > 0 ? true : false;
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <input type = "text" value = {item} onChange = {input => setItem(input.target.value) } placeholder = "e.g. eggs" />
            </label>
            <button type = "submit">Submit</button>
        </form>
    );
}