import React, {  useState, useEffect } from 'react';
import {  
    Card, 
    CardImg, 
    CardBody, 
    CardTitle, 
    Container, 
    Row, 
    Col, 
    Button } from 'reactstrap';
import { useHistory } from 'react-router-dom'
import './index.css'
import {AiFillInfoCircle} from 'react-icons/ai'
import Loading from '../../components/Loading';

function Home()  {
    const history = useHistory()
    const [ users, setUsers ] = new useState([])
    const [ loading, setLoading ] = new useState(true)

    function goTo(value){
        history.push('/profile',{value})
    }

    async function getUsers() {
        try {
            setLoading(true)
            let _users =  await fetch('https://api.github.com/users?per_page=6')
            _users = await _users.json()
            setUsers(_users)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }
    useEffect(() =>{
        getUsers()
    },[])

    return(
        <Container>
            {
                loading 
                ?
                <Loading/>
                :
                    <Row >
                        {
                        users.map((u, index) =>
                            <Col key={index.toString()} xs={12}  md={6} xl={4} >
                                <Card  className={'shadow-sm p-3 mb-5 bg-white rounded'} style={{ margin:10}}  >
                                    <CardImg top width="100%"  src={u.avatar_url} alt="Card image cap" />
                                    <CardBody>
                                    <CardTitle className='card-title' > {u.login}</CardTitle>
                                    <Button className='button' onClick={() => goTo(u)} color={'primary'}>
                                        Profile
                                        <AiFillInfoCircle size={20} style={{marginLeft:5}}/>
                                    </Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                        }
                    </Row>
     
            }

        </Container>
   );
}
export default Home;