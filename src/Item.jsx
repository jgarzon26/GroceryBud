
export default function Item(props){

    return(
        <li key = {props.id}>
            <h5>{props.item}</h5>
            <button onClick = {() => props.changeItemFunc(props)} >Edit</button>
            <button>Delete</button>
        </li>
    );
}