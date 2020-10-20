import React, {  useState, useEffect } from 'react';
import {
    Card, 
    CardImg, 
    CardText, 
    CardBody,
    CardTitle, 
    Container, 
    Row, 
    Col
  } from 'reactstrap';
import Loading from '../../components/Loading'
import { RiGitRepositoryLine } from 'react-icons/ri'
import { DiGitCommit } from 'react-icons/di'
import './index.css'

function Profile(props) {
    const [ repoList, setRepoList ] = useState([])
    const [ loading, setLoading] = useState(true)

    async function getRepo(){
        try {
            setLoading(true)
            let { repos_url} = props.location.state.value
            repos_url = await fetch(repos_url)
            repos_url = await repos_url.json()
            repos_url = await Promise.all( repos_url.map(async rep =>{
                let url =  rep.commits_url.split('{')[0]
                let commits = await fetch(url)
                commits =  await commits.json()
                commits = commits.length
                 return {
                     commits,
                     repoName:rep.name
                }
            }) )
            setRepoList(repos_url)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    useEffect(() =>{
        getRepo()
    },[])

    return(
           <Container>
                <Row>
                   <Col xl={12} md={12} >
                        <Card  className="shadow p-3 mb-5 bg-white rounded card-style" >
                            <Row  >
                            <Col xl={6} md={12} >
                                <CardImg top width='100%' src={ props.location.state.value.avatar_url} alt="Card image cap" />
                            </Col>
                            <Col xl={6} md={12} >
                            <CardBody className='card-body-style'>
                                <div className='card-body-div-scroll' >
                                        <div className='card-body-itens'>
                                            <RiGitRepositoryLine size={20}/>
                                            <div className={'card-body-space'}>
                                                <span className='card-span'>Commits</span>
                                                <DiGitCommit/>                                                
                                            </div>
                                        </div>
                                    {
                                           loading ?
                                            <Loading/>
                                            :
                                            repoList.map((rep,index) =>{
                                                return(
                                                    <div key={index.toString()} className={'item'}>
                                                        <CardTitle className='title' >{rep.repoName}</CardTitle>  
                                                        <CardText>{rep.commits}</CardText>
                                                    </div>
                                                    )
                                                })
                                    }
                                </div>
                            </CardBody>
                            </Col>
                            </Row>
                        </Card>

                   </Col>
               </Row>
           </Container>
    );
}


export default Profile;


