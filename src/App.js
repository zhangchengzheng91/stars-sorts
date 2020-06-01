import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Button} from 'antd'
import Card from './Components/Card'
import { getStarsApi } from './apis'
import './App.css';

function App() {
  const [ data, setData ] = useState([])

  useEffect(() => {
    getData()
  }, [])


  const getData = () => {
    getStarsApi().then(res => {
      const { data, ...restRes } = res
      setData(data)
    })
  }
  return (
    <div className="App">
      <div>REPOSITORIES</div>
      {
        data.map(item => {
            return <Card {...item} key={item.id}/>
          }
        )
      }
    </div>
  );
}

export default App;
