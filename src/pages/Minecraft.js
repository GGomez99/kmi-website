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

            objectives.sort(function(a, b){
                if(a.label < b.label) { return -1; }
                if(a.label > b.label) { return 1; }
                return 0;
            })

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
                        dataByPlayers[dataUnit.Name].push({date: day.date, value: dataUnit.Score})
                    } else {
                        dataByPlayers[dataUnit.Name] = [{date: day.date, value: dataUnit.Score}]
                    }
                }
            })
        })

        let newData = [];

        for (let [name, values] of Object.entries(dataByPlayers)) {
            let newDataPoints = [];
            for (let i = 0; i < values.length; i++) {
                newDataPoints.push({x: new Date(values[i].date), y: values[i].value})
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
                shared: this.state.doShare,
                contentFormatter: null
            },
            title:{
                text: objDispName
            },
            axisY: {
                title: objDispName,
                includeZero: false,
                titleFontSize: 20,
                labelFontSize: 15,
            },
            axisX: {
                title: "Past days",
                titleFontSize: 20,
                labelFontSize: 15,
            },
            data: newData
        }

        this.setState({
            options: newOptions
        })

    }

    onKeyPressed = (event) => {
        if(event.key === 'Shift'){
            this.setState({
                options: {
                    animationEnabled: true,
                    theme: "dark2",
                    toolTip: {
                        content: this.state.options.toolTip.shared ? "{name} : {y}" : null,
                        shared: !this.state.options.toolTip.shared,
                        contentFormatter: this.state.options.toolTip.shared ? null : function(e){
                            const datePoint = e.entries[0].dataPoint.x;
                            let str = datePoint.toLocaleDateString('en-GB') + "<br/>"

                            let values = e.entries.slice();
                            values.sort((a, b) => {
                                if(a.dataPoint.y > b.dataPoint.y) { return -1; }
                                if(a.dataPoint.y < b.dataPoint.y) { return 1; }
                                return 0;
                            })

                            for (let i = 0; i < e.entries.length; i++){
                                let  temp = "<font style='color:" + values[i].dataSeries._colorSet[0] + "'>" + values[i].dataSeries.name + ": </font> "+  values[i].dataPoint.y + "<br/>" ; 
                                str = str.concat(temp);
                            }
                            return (str);
                          }
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
                <div style={{width: "70%", height: "70%"}}>
                <Row>
                    <Col>
                    <h1 style={{marginBottom: "100xp"}}>Stats from K-MI! Minecraft Server</h1>                
                    </Col>
                </Row>
                <Row style={{height:"90%"}}>
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
                        <CanvasJSChart options = {this.state.options} />
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