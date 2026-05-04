import { useState } from 'react';

function App() {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#000000ff");
  const [list, setList] = useState([]);
  
const handleAdd = async () => {
  if (!text.trim()) return;

  await fetch('http://localhost:5000/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item: text })
  });

  setList([...list, text]);
  setText("");
};
  const handleDelete = (indexToRemove) => {
    setList(list.filter((_, index) => index !== indexToRemove));
  };
  return (
    <>
      <h1 style={{color}}>shopping list</h1>
      <div style={{padding:'5px'}}>
        <input
          type="color" 
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
        />
        </div>
      <div style={{padding: '20px'}}>
        <input style={{padding:'2px'}} type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="put item here"
          
        />
        <button id="hover" onClick={handleAdd}>Add</button>
        </div>
        <ol>

        {list.map((item, index) => (
          <div key={index}>
            <li>{item}</li>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
        </ol>
        
    </>
  );
}


export default App;
