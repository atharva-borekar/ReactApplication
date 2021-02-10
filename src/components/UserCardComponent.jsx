import {
    Card, CardText, CardBody,
    CardTitle,Button, CardImg, CardHeader
  } from 'reactstrap';

const UserCardComponent = (props) =>{
    const {id,name,email,avatar} = props;
    console.log(id,name,email,avatar)
    return (
        <Card body inverse style={{ backgroundColor: '#333', borderColor: '#333', margin:"5%"}}>
            <CardHeader>
                <CardTitle ><b>{id}</b></CardTitle>
                <CardImg top style={{width:"40%", height:"40%"}} src={avatar}/>
            </CardHeader>
            
            <CardBody style={{backgroundColor:"#555"}}>
                
                <CardText><h3><b>Name: </b>{name}</h3></CardText>
                <CardText><b>Email: </b>{email}</CardText>
            </CardBody>
        </Card>
        );
}
export default UserCardComponent;