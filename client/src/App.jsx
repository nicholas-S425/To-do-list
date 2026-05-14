import {useState, useEffect} from 'react';

function App() {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#9e9e9eff");
  const [list, setList] = useState([]);

const handleAdd = async () => {
  if (!text.trim()) return;

  console.log(text)

  await fetch('http://localhost:5000/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({item:text})
  });

  setList([...list, text]);
  setText("");
};
useEffect(() => {
  fetch('http://localhost:5000/api/items')
    .then(res => res.json())
    .then(data => setList(data.map(entry => entry.name)));
}, []);
const handleDelete = async (indexToRemove) => {
  await fetch(`http://localhost:5000/api/items/${indexToRemove}`, { method: 'DELETE' });
  setList(list.filter((_, index) => index !== indexToRemove));
};
const handleDeleteAll = async () => {
  await fetch('http://localhost:5000/api/items-all', { method: 'DELETE' });
  setList([]);
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
        <button onClick={handleDeleteAll}>Delete All</button>
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
