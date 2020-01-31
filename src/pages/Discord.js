import React from 'react'
import Base from '../components/Base.js'
import kon4 from '../resources/kon4.webp'
import kmi from '../resources/kmi-logo.png'

import {Col, Row} from 'react-bootstrap'

import Iframe from 'react-iframe'

import "../App.css"

function Discord() {
    return (
        <Base bgs={[kon4]}>
            <Row style={{height:"50%"}}>
                <Col style={{textAlign: "right"}}>
                    <h1>Join our Discord !</h1>
                    <p>We won't bite you :3</p>
                </Col>
                
                <Iframe url="https://discordapp.com/widget?id=226399043402727424&theme=dark"
                    width="40%"
                    height="100%"
                    display="initial"
                    position="relative"
                    frameBorder="0"
                />
                
            </Row>
        </Base>
    )
}

export default Discord