import { useState } from 'react';

function App() {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#fafafaff");
  const [list, setList] = useState([]);
  
  const handleAdd = () => {
    if (!text.trim()) {
      return
    }
    setList([...list, text]);
    setText("")
  };
  const handleDelete = (indexToRemove) => {
    setList(list.filter((_, index) => index !== indexToRemove));
  };
  return (
    <>
      <h1>shopping list</h1>
        <input type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="put item here"
        />
        <input
          type="color" 
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
        />
        <button onClick={handleAdd}>Add</button>
        <ol>
        {list.map((item, index) => (
          <div key={index}>
            <li>{item}</li>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
        <div style={{ backgroundColor: color, height: '100vh'}}></div>
        </ol>
    </>
  );
}


export default App;
