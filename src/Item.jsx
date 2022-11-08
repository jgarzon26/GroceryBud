
export default function Item(props){

    return(
        <li>
            <h5>{props.item}</h5>
            <button>Edit</button>
            <button>Delete</button>
        </li>
    );
}