import React, { useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import Calendar from '../components/Calendar'


const HomePage = () => {
  // login user data 
  const getUserData = async ()=>{
    try{
      const res = await axios.post('http://localhost:8080/api/v1/user/getUserData',{},
      {
        headers:{
          Authorization:"Bearer "+localStorage.getItem("token"),
        }
      }) 
    }catch(error){
      console.log(error);
    }
  }

    useEffect(()=>{
      getUserData()},[])
    return (
      <>
      <Layout>
          <h1>Homepage</h1>
          <Calendar/>
      </Layout>
      </>
    )
}

export default HomePage
