import React from 'react'
import Base from '../components/Base.js'
import kon3 from '../resources/kon3.webp'
import kon2 from '../resources/kon2.webp'
import kon1 from '../resources/kon1.webp'
import kon0 from '../resources/kon0.webp'
import kmi from '../resources/kmi-logo-big.png'

import {Col, Row} from 'react-bootstrap'

import "../App.css"

function Home() {
    return (
        <Base bgs={[kon0, kon1, kon2, kon3]}>
            <Row>
            <Col>
                <h1 style={{fontSize: "4em"}}>Welcome to</h1> 
                <img src={kmi} style={{
                    width: "30%",
                    margin: "-5%"
                }}/>
                <h1 style={{fontSize: "4em"}}>website !</h1>
                <p style={{fontSize: "1.1em"}}>Enjoy your stay</p>
            </Col>
            </Row>
        </Base>
    )
}

export default Home