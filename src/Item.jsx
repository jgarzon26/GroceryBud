import {FaEdit} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';

export default function Item(props){

    return(
        <li className='list-group-item d-flex justify-content-between' key = {props.id}>
            <h5 className='w-75 text-uppercase'>{props.item}</h5>
            <div>
                <button className='btn btn-outline-primary mx-1 px-3' onClick = {() => props.changeItemFunc(props)} ><FaEdit/></button>
                <button className='btn btn-outline-danger mx-1 px-3' onClick = {() => props.deleteItemFunc(props)} ><MdDelete/></button>
            </div>
        </li>
    );
}