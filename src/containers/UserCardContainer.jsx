import {useEffect, useState} from 'react';
import {
    Container, Row, Col
  } from 'reactstrap';

import UserCardComponent  from "../components/UserCardComponent";
const axios = require('axios');

const UserCardContainer = () =>{

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        axios.get('https://reqres.in/api/users?page=2')
  .then(function (response) {
    // handle success
    console.log(response.data.data);
    setUserList(response.data.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
    }, []);

    const cardComponent = userList.map((ele) => {
        const {id, email, first_name, last_name, avatar} = ele;
        return <UserCardComponent 
        key={id}
        id={id}
        email = {email}
        name ={first_name +" "+ last_name} 
        avatar = {avatar}
        />
    });

    return (
        <div>
            <Container>
                <Row>
                    <Col>{cardComponent}</Col>
                </Row>
            </Container>
        </div>
    );
}

export default UserCardContainer;