import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import Input from '../Components/Input'


const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

const NameTitle = styled.h1`
  color: red;
`

const Button = styled.button`
  border-radius: 4px;
  background: #407294;
  white-space: nowrap;
  padding: 10px 20px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  box-shadow: 2px 5px 5px 0px #40729450;
  margin-right: 10px;


  &:hover {
    transition: all .1s ease-in-out;
    box-shadow: 4px 10px 10px 0px #40729480;
  }
`

const Card = styled.div`
  border-radius: 10px;
  background: #fff;
  box-shadow: 2px 5px 5px 0px #40729450;
  width: 500px;
  height: 400px;
  padding: 20px;
  margin: auto;
  margin-top: 200px;
`

const NameCard = styled.div`
  border-radius: 10px;
  background: #fff;
  box-shadow: 2px 5px 5px 0px #40729450;
  padding: 20px;
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
    <Card>
    <NameTitle>Names</NameTitle>
      <Input
        type="text"
        label="enter a name"
        value={name}
        onChange={val => setName(val)}
      />
      <p>add a name</p>
        <Button onClick={addAName}>Sumbit</Button>
        <Button onClick={getNames}>refresh</Button>
    </Card>
      

      {
        nameList.map((n, i) => <NameCard key={i}>{n}</NameCard>)
      }



  </>
}
