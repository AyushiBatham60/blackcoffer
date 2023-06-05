import axios from "axios";
import { useState,useEffect } from "react";
import './home.css';
import 'bootstrap/dist/css/bootstrap.css';



function Home(){
    const [seach,setSearch]=useState('');
    const [by,setBy]=useState('');
   
    const [dataArray,setDataArray]=useState('');

    useEffect(() => {
        allpost();
      }, []);
     
    async function apiCall(event){
        event.preventDefault(); 
        let keywordName=seach.charAt(0).toUpperCase()+seach.substring(1);
        console.log(keywordName);
        const url="http://192.168.0.102:3001/by"+keywordName+"/"+by;

        
        await fetch(url, {
            method: "GET",
            
          })
        .then((res) => {
            if(res.status==400){
                return "not";
            }
            else{
                return res.json();
            }
        //    console.log("status"+res.status);
        //    console.log("data"+res.json());
        }).then(function(data) {
            if(data=="not"){
                setDataArray([]);
                console.log("error found");
            }
            else
            {setDataArray(data);
             console.log(dataArray);}
        })
        
    }

    async function allpost(){
        const url="http://192.168.0.102:3001/allData";

        await fetch(url, {
            method: "GET",
            
          })
        .then((res) => {
            if(res.status==400){
                return "not";
            }
            else{
                return res.json();
            }
        }).then(function(data) {
            if(data=="not"){
                setDataArray([]);
                console.log("error found");
            }
            else
            {setDataArray(data);
             console.log(dataArray);}
        })
    }

    return <>
       <div className="homePage">
        <div className="header">
            <h2 className="heading">Dashboard</h2>
            <form onSubmit={apiCall}>
                <input type="text" placeholder="Search by " name="searchItem" value={seach} className="form-control" onChange={e => setSearch(e.target.value)}></input>
                <input type="text" placeholder="Search" name="searchBy" value={by} className="form-control" onChange={e => setBy(e.target.value)}></input>
                <input type="Submit" value="Submit" class="btn btn-outline-info"></input>
            </form>
        </div>
        <div className="bodyy">
          {dataArray.length==0?(
            <h3 className="nopost">no post found</h3>
          ):(
            <div class="bottom">
          {dataArray.map((book, index) => (
            <div className="postlst" key={index}>
                <h2><b>Topic - </b>{book.topic}</h2>
                <h5><b>Title - </b>{book.title}</h5>
                <h6><b>Country - </b>{book.country} </h6>
                <h6><b>Region - </b>{book.region}</h6>
                <h6><b>Relevance - </b>{book.relevance}</h6>
                <h6><b>Likelihood - </b>{book.likelihood}</h6>
                <h6><b>Sources - </b>{book.source}</h6>
                <h4><b>Published : </b>{book.published}</h4>
              
            </div>
          ))}
        </div>
          )}
        </div>
        </div>
    </>
}

export default Home;