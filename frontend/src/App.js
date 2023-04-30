import Login from "./Components/Login/Login.js"
import Home from "./Components/Home/Page.js"
import EventEditor from "./Components/Event/Editor"
import Event from "./Components/Event/Event"
import NetworkError from "./Components/Utils/NetworkError.js"
import { Route,Routes ,Navigate} from 'react-router-dom';


function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        
        <Route exact path="/login" element={<Login/>} />  
        <Route exact path="/event" element={<Event/>} />  
        <Route exact path="/event-editor" element={<EventEditor/>} /> 
        <Route exact path="/network-error" element={<NetworkError/>} />
        <Route path="*" element={<Navigate replace to="/" />} />  
      </Routes>
    </>
  );
}

export default App;
