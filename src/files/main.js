// import of modules into file

import { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';
import API from './APIhandling';

/* Important button Names and their corresponding class or ids according to their functionality
        1-> #search for search box and handleSearch() onChange triggered
        2-> #input for input field 
        3-> .add-on-btn for submit button for adding task and onClick triggered handleSubmit()
        4-> .checkbox for checkbox and handleDone(item.id) onChange triggered
        5-> .FaEdit for Edit box and triggers handleEdit(item.id) onClick 
        6-> .FaTrashAlt for delete box and triggers { handleDone(item.id) and handleDelete(item.id) } onClick
*/

//global variables
const url = "https://json-server-api-fomg.onrender.com/items";
const Main = () => {
    // useState Hooks declarations
    const [list, setList] = useState([]);
    const [searchItem, setSearch] = useState('');
    const [count,setCount]=useState(list.length+1);

    // data dealing with json-server

    //GET requests from server
    async function GET(){
        let response = await fetch(url);
        let jsondata=await response.json();
        setList(jsondata);
        setCount(jsondata.length+1);
        console.log("GET List-",list);
        
    }
    useEffect(()=>{
        GET();
        console.log("Initial count-",count);
    },[]);
    
    


    //POST requests to server
    let PostSettings;
    function Postsettings(newObj){
        PostSettings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newObj)
        };
    }
    async function POST(newObj){
        Postsettings(newObj);
        console.log("Going to post-",PostSettings)
        let result=await API(url,PostSettings);
        if(result){
            console.log("Error in POST-",result);
        }
    }



    //DELETE requests to server
    let deleteSettings={
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null
    };
    async function DELETE(id){
        let path=`${url}/${id}`;
        console.log("deletion Path-",path);
        let result=await API(path,deleteSettings);
        if(result){
            console.log("Error in DELETE-",result);
        }
    }

    //Functionalities of buttons and Displaying results
    
    // to add new task or submit button handling
    function checkIfUsed(){
        let checkList=list;
        let c=count;
        console.log("count changed from -",c);
        console.log("count changed from -",count);
        for(let i=0;i<checkList.length;i++){
            if(checkList[i].id === c){
                c++;
            }
        }
        console.log("count changed to -",c+1);
        setCount(c+1);
        console.log("count changed to -",count);
        return(c);
    }
    function handleSubmit() {
        let val = document.querySelector('#input').value;
        document.querySelector('#input').value = "";
        if (val[val.length - 1] === ',') {
            val = val.slice(0, val.length - 1);
        }
        if (val === "") {
            alert("Enter some tasks first");
        }
        else {
            let newcount=checkIfUsed();
            setCount(newcount);
            setList([{id:count, value: (val), checked: false }, ...list,]);
            POST({id:count, value: (val), checked: false });
            setCount(count+1);
        }
        
    }


    // to delete a task with selected id
    function handleDelete(id) {
        console.log("trying to delete ID-",id);
        let newList = list.filter((item) => (
            item.id !== id
        ))
        setList(newList);
        DELETE(id);
    }


    // to edit task from the list with given id
    function handleEdit(id) {
        let val;
        for(let i=0;i<list.length;i++){
            if(list[i].id===id){
                val=list[i].value;
                break;
            }
        }
        let newList = list.filter((item) => (
            item.id !== id
        ))
        console.log("Trying to edit ID-",id);
        DELETE(id);
        setList(newList);
        document.querySelector('#input').value = val;
    }



    // to mark done a list item when checked with given id
    function handleDone(id) {
        // let newList=list;
        // console.log(newList);
        // for(let i=0;i<newList.length;i++){
        //     if(newList[i].id===id){
        //         newList[i].checked=true;
        //         console.log("toggled");
        //     }
        // }
        // console.log(newList);
        let checkStat;
        const newList = list.map((item) =>{
            if(id === item.id){
                checkStat=!item.checked;
                return({ ...item, checked: !item.checked })
            }
            else{
                return item
            }
        });
        setList(newList);
        let path=`${url}/${id}`
        let PatchSettings;
        function Patchsettings(newObj){
            PatchSettings = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                checked:checkStat
            })
            };
        }
        async function PATCH(){
        console.log("Trying to PATCH-",path);
        Patchsettings();
        let result=await API(path,PatchSettings);
        if(result){
            console.log(result);
            }
        }
        PATCH();
    }



    //to enable searching of tasks on basis on given task value
    function handleSearch() {
        let val = document.getElementById("search").value;
        console.log(val);
        console.log(searchItem);
        setSearch(val);
        let newlist = list.filter((item) => (
            item.value.includes(val) ? item : null
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
                    <FaPlus className="add-on-btn" role="button" onClick={handleSubmit} />
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
                                        <label className="tickBox">
                                            <input type="checkbox" className="checkbox" checked={(item.checked)} onChange={() => handleDone(item.id)}></input>
                                            <span className="listItem-value" style={(item.checked) ? { textDecoration: "line-through" } : {}}>{item.value}</span>
                                        </label>
                                        <div className="sidebox">
                                            <FaEdit role="button" onClick={() => {
                                                handleEdit(item.id)
                                            }} tabIndex="0" className="index FaEdit" />
                                            <FaTrashAlt role="button" onClick={() => {
                                                // handleDone(item.id)
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