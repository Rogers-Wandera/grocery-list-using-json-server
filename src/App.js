import React,{useEffect, useState} from 'react'
import GroceryList from './components/GroceryList'
import Layout from './Layout/layout'

import AddItem from './components/AddItem';
import Modal from './components/modal';
import Search from './components/search';
import apiRequest from './components/apiRequest';

const api_url = "http://localhost:3500/items";

function App() {
  const [item,setItem] = useState([]);
  const [modal,setModal] = useState(false);
  const [itemName,setItemName] = useState("");
  const [search,setSearch] = useState("");
  const [error,setError] = useState("");
  const [isloading,setIsLoading] = useState(true)

  const SetAndSave = (newItems) => {
    setItem(newItems)
    localStorage.setItem("shopping",JSON.stringify(newItems))
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api_url);
        if(!response.ok) throw Error("Didnt get the expected data");
        const data = await response.json();
        setItem(data)
        setError(null);
        setIsLoading(false)
      } catch (err) {
        setError(err.message)
      }
    }

    setTimeout(() => {
      (async () => await fetchData())();
    },3000)
  },[])

    const handleChange = async (id) => {
        const itemChecked = item.map((it) => it.id === id ? 
        {...it,checked:!it.checked}: it)
        SetAndSave(itemChecked)

        const filterItem = itemChecked.filter((it) => it.id === id);

        const updateOptions = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({checked: filterItem[0].checked})
        }

        const url = `${api_url}/${id}`;
        const results = await apiRequest(url,updateOptions);
        if(results) setError(results);
    }

    const handleDelete = async (id) => {
        const itemList = item.filter((it) => it.id !== id)
        SetAndSave(itemList)

        const deleteOptions = { method: "DELETE" };

        const url = `${api_url}/${id}`;
        const results = await apiRequest(url,deleteOptions);
        if(results) setError(results);

    }

    const handleChangeModal = () => {
      setModal(!modal)
    }

    const handleChangeName = (e) => {
      setItemName(e.target.value)
    }

    const AddNewItem = async (e) => {
      e.preventDefault();
      let obj ={};
      if(itemName){
        obj={
          id : new Date().getTime().toString(),
          checked : false,
          item : itemName
        }
        item.push(obj)
        setItemName("");
        SetAndSave(item)

        const postRequest = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(obj)
        }

        const results = apiRequest(api_url, postRequest);
        if(results) setError(results)
      }
    }

  return (
    <div className='App'>
      <Layout heading="Grocery List" itemCount={item}>
        <Search value={search} onchange={setSearch}/>
      <div>
        {
          error && <p style={{color:'red'}}>{`Error: ${error}`}</p>
        }
      <GroceryList 
        item={item.filter(grocery =>( (grocery.item).toLowerCase()).includes(search.toLowerCase()))} 
        handleChange={handleChange} 
        handleDelete={handleDelete}
        loading={isloading}
      />
      </div>
      {
        modal ? <Modal 
        value={itemName}
        onchange={handleChangeName}
        addItem={AddItem}
        add={AddNewItem}
        /> : null
      }
      <AddItem handleChangeModal={handleChangeModal} modal={modal}/>
      </Layout>
    </div>
  )
}

export default App
