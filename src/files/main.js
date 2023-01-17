import { useState } from "react";
import {FaTrashAlt,FaEdit} from 'react-icons/fa';


const Main = () => {


    const [list,setList]=useState([
        {
            id:1,
            value:"Sample Task 1",
            checked:false,
        },
    ]);


    const [count,setCount]=useState(2);


    function handleSubmit(){
        let val=document.querySelector('#input').value;
        if(val[val.length-1]===','){
            val=val.slice(0,val.length-1);
        }
        if(val===""){
            alert("Enter some tasks first");
        }
        else{
        setList([{id:count , value:(val) , checked:false},...list,]);
        setCount(count+1);
        }
        document.querySelector('#input').value=" ";
    }


    function handleDelete(id){
        console.log(id);
        let newList=list.filter((item)=>(
            item.id!==id
        ))
        setList(newList);
    }


    function handleEdit(id){
        let val=list.map((item)=>{
            if(item.id===id)
            return(item.value)
        })
        console.log(val);
        let newList=list.filter((item)=>(
            item.id!==id
        ))
        if(val[val.length-1]===','){
            val=val.slice(0,val.length-1);
        }
        setList(newList);
        document.querySelector('#input').value=val;
    }


    function handleDone(id){
        const newList=list.map((item)=>(id===item.id)?({...item,checked:!item.checked}):item);
        setList(newList);
    }

    window.addEventListener("keypress",(e)=>{
        if(e==='Enter'){
            console.log("Key Pressed Enter!");
        }
    })



    return (
        <div className="mainContent">
        <div className="content">
            <label name="newTask">
                Enter New task : <input type="text" id="input" name="newTask" style={{height:"2rem",width:"15rem",fontSize:"1rem",border:"solid 2px black"}}/>
            </label>
            <button style={{margin:"1rem",padding:"0.25rem",backgroundColor:"rgb(1, 100,200)",color:"white"}} onClick={handleSubmit}>Add Now</button>
        </div>
        <div className="content add-margin">
            {(list.length)?(
            <ul>
                {
                    list.map(item=>{
                        return(
                            <li className="listItems">
                                <label style={(item.checked)?{textDecoration:"line-through"}:{}}>
                                    <input type="checkbox" onChange={()=>handleDone(item.id)}></input>
                                    {item.value}
                                </label>
                                <div className="sidebox">
                                    <FaTrashAlt role="button" onClick={()=>{
                                        handleDone(item.id)
                                        handleDelete(item.id)
                                    }} tabIndex="0" className="index"/>
                                    <FaEdit role="button" onClick={()=>{
                                        handleEdit(item.id)
                                    }} tabIndex="0" className="index"/>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            ):(
                <h1>Your List is empty !!</h1>
            )}
        </div>
        </div>
     );
}


export default Main;