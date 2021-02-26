import React, { useState } from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`




export default function Home() {
  const [name, setName] = useState("");
  const [nameList, setNameList] = useState([])

  function getNames() {
    return fetch('http://localhost:3000', {
      headers: {
        //I had aplication/json rather than application/json
        "Content-type": "application/json",
      }
    }).then(res => {
        res.json().then(res => setNameList(res.names))
    })
  }


  function addAName() {
    return fetch('http://localhost:3000', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({name: name}),
    }).then(res => {
      console.log(res)
      console.log(name)
      return 0;

    })
  }



  return <>
    <p>All names:</p>
    <button onClick={getNames}>refresh</button>
    <p>add a name</p>
    <input type="text" placeholder="J" value={name} onChange={val => setName(val.target.value)}></input>
    <button onClick={addAName}>Sumbit</button>

    {
      nameList.map((n, i) => <p key={i}>{n}</p>)
    }



  </>
}
