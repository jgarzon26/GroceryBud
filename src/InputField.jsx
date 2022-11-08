import { useState } from "react";


export default function InputField(props){

    const [item, setItem] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        let checkInput = item.length > 0 ? true : false
        !checkInput && props.notify("Please Enter Items To Add To Basket");
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