import { removeItem } from 'framer-motion';
import { useState } from 'react';


function App() {
 const [text, setText] = useState("");
 const [list, setList] = useState([]);
 
 const handleAdd = () => {
   setList([...list,text]);
 };
   const handleDelete = () => {
    setItems(items.filter(item => item.id !== id));
 };
return (
 <>
   <h1>list tihngy</h1>
   <div style={{padding:'20px'}}>
     <input
       type="text"
       onChange={(e) => setText(e.target.value)}
       placeholder="Type something..."
     />
     <button onClick={handleAdd}>
       Add
     </button>
       {list.map((item) => (
       <>
       <li>{item}</li>
         <button onClick={handleDelete}>
         Delete
         </button>
       </>
       ))}
   </div>
 </>
);
}


export default App;

