import React from 'react'
import Base from '../components/Base.js'
import kon3 from '../resources/kon3.webp'
import kon2 from '../resources/kon2.webp'
import kon1 from '../resources/kon1.webp'
import kon0 from '../resources/kon0.webp'
import kmi from '../resources/kmi-logo.png'

import {Col, Row} from 'react-bootstrap'

import "../App.css"

function Home() {
    return (
        <Base bgs={[kon0, kon1, kon2, kon3]}>
            <Row>
            <Col>
                <h1>Welcome to</h1> 
                <img src={kmi} height={100}/>
                <h1>website !</h1>
                <p>Enjoy your stay</p>
            </Col>
            </Row>
        </Base>
    )
}

export default Home