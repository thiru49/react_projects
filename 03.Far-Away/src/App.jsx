import { useState } from "react";
import "./App.css";
import { Form } from "./components/Form";
import { List } from "./components/List";
import Footer from "./components/Footer";

function App() {
  const [items, setItems] = useState([]);

  const onAddItems = (newitem) => {
    setItems((items) => [...items, newitem]);
  };
  const onDeleteItems = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };
  const onUpdateItems = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id == id ? { ...item, packed: !item.packed } : item
      )
    );
  };
  const clearList = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items"
    );

    if (confirmed) setItems([]);
  };

  return (
    <div className="w-full h-full grid grid-rows-7">
      <h1 className="bg-amber-400 h-20 text-6xl text-center font-extrabold font-monoton uppercase tracking-tighter">
        Far Away
      </h1>
      <Form onAddItems={onAddItems} />
      <List
        items={items}
        onDeleteItems={onDeleteItems}
        onToggle={onUpdateItems}
        clearList={clearList}
      />
      <Footer Items={items} />
    </div>
  );
}

export default App;
