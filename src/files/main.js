import { useState } from "react";
import { FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';

const Main = () => {
    const [list, setList] = useState([
        {
            id: 1,
            value: "Sample Task 1",
            checked: false,
        },
    ]);

    const [count, setCount] = useState(2);
    function handleSubmit() {
        let val = document.querySelector('#input').value;
        if (val[val.length - 1] === ',') {
            val = val.slice(0, val.length - 1);
        }
        if (val === "") {
            alert("Enter some tasks first");
        }
        else {
            setList([{ id: count, value: (val), checked: false }, ...list,]);
            setCount(count + 1);
        }
        document.querySelector('#input').value = " ";
    }
    function handleDelete(id) {
        console.log(id);
        let newList = list.filter((item) => (
            item.id !== id
        ))
        setList(newList);
    }
    function handleEdit(id) {
        let val = list.map((item) => {
            if (item.id === id)
                return (item.value)
            else return ""
        })
        console.log(val);
        let newList = list.filter((item) => (
            item.id !== id
        ))
        if (val[val.length - 1] === ',') {
            val = val.slice(0, val.length - 1);
        }
        setList(newList);
        document.querySelector('#input').value = val;
    }
    function handleDone(id) {
        const newList = list.map((item) => (id === item.id) ? ({ ...item, checked: !item.checked }) : item);
        setList(newList);
    }
    const [searchItem, setSearch] = useState('');
    function handleSearch() {
        let val = document.getElementById("search").value;
        console.log(val);
        console.log(searchItem);
        setSearch(val);
        let newlist=list.filter((item)=>(
            !item.value.includes(val)?item:null
        ))
        setList(newlist);
    }


    return (
        <div className="mainContent">
            <div className="content">
                <label name="Search" className="SearchBar">
                    <input type="text" id="search" placeholder="Search Tasks" name="Search" onChange={() => { handleSearch() }} />
                </label>
                <br></br>
                <div className="inputTask">
                    <label name="newTask" className="TaskBar">
                        <input type="text" id="input" placeholder="Enter New Task" name="newTask" />
                    </label>
                    <FaPlus className="add-on-btn" role="button" onClick={handleSubmit}/>
                </div>
            </div>
            
            <div className="listContent">
                {(list.length) ? (
                    
                    <ol className="olList">
                        <p className="heading"> - List of tasks - </p>
                        {
                            list.map(item => {
                                return (
                                    <li className="listItems">
                                        <label className="tickBox" style={(item.checked) ? { textDecoration: "line-through" } : {}}>
                                            <input type="checkbox" className="checkbox" onChange={() => handleDone(item.id)}></input>
                                            <span className="listItem-value">{item.value}</span>
                                        </label>
                                        <div className="sidebox">
                                        <FaEdit role="button" onClick={() => {
                                            handleEdit(item.id)
                                        }} tabIndex="0" className="index FaEdit" />
                                        <FaTrashAlt role="button" onClick={() => {
                                            handleDone(item.id)
                                            handleDelete(item.id)
                                        }} tabIndex="0" className="index FaTrashAlt" />
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ol>
                ) : (
                    <h1 className="header">Your List is empty !!</h1>
                )}
            </div>
        </div>
    );
}


export default Main;