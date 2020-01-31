import React from 'react'
import {Container, Row} from 'react-bootstrap';

import '../App.css';

class Base extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentBG: 0
        }
    }

    tick() {
        this.setState(prevState => ({
            currentBG: ((prevState.currentBG + 1) % this.props.bgs.length)
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {return (
        <Container>
            <Row className="Base">
                {this.props.bgs.map((bgImg, index) =>
                    <div className="BG" style={{
                                background: "linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url( " + bgImg + ") no-repeat center",
                                backgroundSize: "cover",
                                height: (this.state.currentBG == index ? "100%" : "0%")
                    }}>
                    </div>
                )}
                <div className="BG">
                    {this.props.children}
                </div>
            </Row>
        </Container>
    )}
}

export default Base