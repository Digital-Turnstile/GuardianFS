import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import Input from '../Components/Input'
import { ZoomIn } from 'animate-css-styled-components';


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
  padding: ${({big}) => big ? `10px 20px` : `5px 10px`};
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  box-shadow: 2px 5px 5px 0px #40729450;
  margin-right: 10px;
  float: ${({big}) => big ? 'none' : 'right'};


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
  height: 240px;
  padding: 20px;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 10px;
`

const NameCardContainer = styled.div`
  width: 500px;
  height: 560px;
  padding: 20px;
  margin: auto;
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #407294;
    border-radius: 10px;
  }


`

const NameCard = styled.div`
  border-radius: 10px;
  background: #fff;
  box-shadow: 2px 5px 5px 0px #40729450;
  padding: 10px;
  margin-bottom: 10px;
  height: 25px;
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
        console.log(nameList)
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
      getNames();
      return 0;

    })
  }

  function deleteAName(deleteName){
    return fetch('http://localhost:3000', {
      method: "Delete",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({name: deleteName}),
    }).then(res => {
      console.log(res)
      getNames();
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
        <Button big onClick={addAName}>Sumbit</Button>
        <Button big onClick={getNames}>refresh</Button>
    </Card>
      
    <NameCardContainer>
      {
        nameList.map((n, i) => {
          return<ZoomIn key={i} duration="0.3s" delay={i * .02 + "s"}>
            <NameCard>
              {n}
              <Button onClick={() => deleteAName(n)}>Delete</Button>
            </NameCard>
          </ZoomIn>
      })
      }
    </NameCardContainer>
  </>
}
