import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import Article from './Article';
import EditForm from './EditForm';
import axiosWithAuth from './../utils/axiosWithAuth';
import axios from 'axios';

const View = (props) => {
    const [articles, setArticles] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState();

    

useEffect(() => {
      axiosWithAuth()
      .get('/articles')
      .then(res=>{
          setArticles(res.data); //lives on 'res.data' !
      }).catch(err=>{
          console.error(err);
      })
},[]); //'on first mount, do this'

    const handleDelete = (id) => {
        axiosWithAuth().delete(`/articles/${id}`)
        .then(res=>{

         // you DON'T NEED TO CALL ANOTHER FUNCTION, FUTURE CLAIRE.

       setArticles(res.data);
        }).catch(err=>{
            console.log('error on handleDelete call ',err);
        })
    }
  
    const handleEdit = (article) => {
        axiosWithAuth().put(`/articles/${editId}`,article) //just making request here...
        .then(res=>{
            setArticles(res.data)
        }).catch(err=>{
            console.error(err);
        })
        
    }

    const handleEditSelect = (id)=> {
        setEditing(true);
        setEditId(id);
    }

    const handleEditToggle = ()=>{
        setEditing(false);
    }

    return(<ComponentContainer>
        <HeaderContainer>View Articles</HeaderContainer>
        <ContentContainer flexDirection="row">
            <ArticleContainer>
                {
                    articles.map(article => {
                        return <ArticleDivider key={article.id}>
                            <Article key={article.id} article={article} handleDelete={handleDelete} handleEditSelect={handleEditSelect}/>
                        </ArticleDivider>
                    })
                }
            </ArticleContainer>
            
            {
                editing && <EditForm editId={editId} handleEdit={handleEdit} handleEditToggle={handleEditToggle}/>
            }
        </ContentContainer>
    </ComponentContainer>);
}

export default View;

//Task List:
//1. Build and import axiosWithAuth module in the utils. X
//2. When the component mounts, make an http request that adds all articles to state. X
//3. Complete handleDelete method. It should make a request that delete the article with the included id. X
//4. Complete handleEdit method. It should make a request that updates the article that matches the included article param. X


const Container = styled.div`
    padding: 0.5em;
`
const HeaderContainer = styled.h1`
    border-bottom: solid black 2px;
    padding: 1em;
    margin:0;
    font-size: 1.5em;
    background: black;
    color: white;
`

const ArticleDivider = styled.div`
    border-bottom: 1px solid black;
    padding: 1em;
`

const ComponentContainer = styled.div`
    display:flex;
    width: 80%;
    flex-direction: column;
    justify-content: center;
    
`

const ContentContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.flexDirection};
`

const ArticleContainer = styled.div`
    background: grey;
`;