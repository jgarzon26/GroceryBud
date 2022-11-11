import {FaEdit} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';

export default function Item(props){

    return(
        <li key = {props.id}>
            <h5>{props.item}</h5>
            <button onClick = {() => props.changeItemFunc(props)} ><FaEdit/></button>
            <button onClick = {() => props.deleteItemFunc(props)} ><MdDelete/></button>
        </li>
    );
}