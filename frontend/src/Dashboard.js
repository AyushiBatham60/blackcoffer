import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";


 function Dashboard(){

    return(
        <>
        
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                </Routes>
            </Router>
        </>
    )
 }
 export default Dashboard;