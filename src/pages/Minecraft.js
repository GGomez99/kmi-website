import React from 'react'
import Base from '../components/Base.js'

import minecraftBG from '../resources/minecraftBG.webp'

import "../App.css"

import Select from 'react-select'

import {Col, Row, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import CanvasJSReact from '../canvasJs/canvasjs.react.js'
var CanvasJSChart = CanvasJSReact.CanvasJSChart

const dateBegin = new Date(2020, 0, 30);


class Minecraft extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            minecraftObjectives: [],
            minecraftData: [],
            doShare: false,
            options: {
                animationEnabled: true,
                theme: "dark2",
                toolTip: {
                    content: "{name} : {y}",
                    shared: false,
                },
                title:{
                    text: "No selected data"
                },
                axisY: {
                    title: "No data",
                    includeZero: false,
                },
                axisX: {
                    title: "Past days",
                    prefix: "D",
                    interval: 2
                },
                data: []
            }
        }
    }

    async getMinecraftData() {
        try {
            let response = await fetch('http://uc.kyrandia.org/minecraftData.json');
            let responseJson = await response.json();
            let objectives = [];

            responseJson[0].data.Objectives.forEach(objective =>
                objectives.push({
                    value: objective.Name,
                    label: objective.DisplayName.slice(9, -2),
                })

            )

            this.setState({
                minecraftObjectives: objectives,
                minecraftData: responseJson
            })

        } catch(error) {
            console.log(error)
        }   
    }

    componentWillMount() {
        this.getMinecraftData()
    }

    updateGraph(item) {
        const objName = item.value
        let objDispName = item.label

        let dataByPlayers = {}
        this.state.minecraftData.forEach((day) => {
            day.data.PlayerScores.forEach((dataUnit) => {
                
                if (dataUnit.Objective == objName) {
                    if (dataUnit.Name in dataByPlayers) {
                        dataByPlayers[dataUnit.Name].push(dataUnit.Score)
                    } else {
                        dataByPlayers[dataUnit.Name] = [dataUnit.Score]
                    }
                }
            })
        })

        let newData = [];

        for (let [name, values] of Object.entries(dataByPlayers)) {
            let newDataPoints = [];
            for (let i = 0; i < values.length; i++) {
                newDataPoints.push({x: new Date(dateBegin.valueOf() + 1000*3600*24*i), y: values[i]})
            }
            newData.push({
                name: name,
                type: "line",
                yValueFormatString: "#0.## ",
                xValueFormatString: "MM/DD/YY",
                showInLegend: true,
                dataPoints: newDataPoints
            })
        }

        let newOptions = {
            animationEnabled: true,
            theme: "dark2",
            toolTip: {
                content: "{name} : {y}",
                shared: this.state.doShare
            },
            title:{
                text: objDispName
            },
            axisY: {
                title: objDispName,
                includeZero: false,
            },
            axisX: {
                title: "Past days",
            },
            data: newData
        }

        this.setState({
            options: newOptions
        })

    }

    onKeyPressed = (event) => {
        console.log(event.key)
        if(event.key === 'Shift'){
            this.setState({
                options: {
                    animationEnabled: true,
                    theme: "dark2",
                    toolTip: {
                        content: this.state.options.toolTip.shared ? "{name} : {y}" : null,
                        shared: !this.state.options.toolTip.shared
                    },
                    title:{
                        text: this.state.options.axisY.title
                    },
                    axisY: {
                        title: this.state.options.axisY.title,
                        includeZero: false,
                    },
                    axisX: {
                        title: "Past days",
                    },
                    data: this.state.options.data
            }
        })
        }
      }

    render() { 

        return (
            <div
                onKeyDown={this.onKeyPressed}
                tabIndex="0"
            >
            <Base bgs={[minecraftBG]} onKeyPress={this.handleKeyPress}>
                <div style={{width: "70%"}}>
                <Row>
                    <Col>
                    <h1 style={{marginBottom: "100xp"}}>Stats from K-MI! Minecraft Server</h1>                
                    </Col>
                </Row>
                <Row>
                    <Col xs={2} style={{color: "black"}}>
                        <h5 style={{color: "white"}}>Select a stat</h5>
                        <Select
                            value={null}
                            onChange={(value) => this.updateGraph(value)}
                            isSearchable={true}
                            options={this.state.minecraftObjectives}
                        />
                        <p style={{color: "lightGrey", marginTop: "1em"}}>Press shift to change the tooltip</p>
                    </Col>
                    <Col>
                        <CanvasJSChart options = {this.state.options}/>
                    </Col>
                    
                    
                </Row>
                </div>
            </Base>
            </div>
        )
    }
}

export default Minecraft

/*

<Form.Group>
                            <Form.Label>Select a stat</Form.Label>
                            <Form.Control
                                ref="objectiveSelect"   
                                as="select"
                                onChange={() => this.updateGraph()}
                            >
                                {this.state.minecraftObjectives.map((objective) => 
                                    <option value={objective.Name}>{objective.DisplayName}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
*/