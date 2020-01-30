import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import kmiLogo from '../resources/kmi-logo.png';
import discordLogo from '../resources/discord.png';
import minecraftLogo from '../resources/minecraft.svg';

//import {Navbar, Nav, Button} from 'react-bootstrap';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


let SideMenu = (props) => 
            <SideNav
                onSelect={(selected) => {
                    const to = '/' + selected;
                    if (props.routLocation.pathname !== to) {
                        props.routHistory.push(to);
                    }
                }}
                style={{
                    background: "#18191a",
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="">
                        <NavIcon>
                            <img src={kmiLogo} height={"40em"} width={"40em"}/>
                        </NavIcon>
                        <NavText style={{paddingLeft: "5em"}}>
                            Home
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="discord">
                        <NavIcon>
                            <img src={discordLogo} height={"40em"} width={"40em"}/>
                        </NavIcon>
                        <NavText style={{paddingLeft: "5em"}}>
                            Discord
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="minecraft">
                        <NavIcon>
                            <img src={minecraftLogo} height={"40em"} width={"40em"}/>
                        </NavIcon>
                        <NavText style={{paddingLeft: "5em"}}>
                            Minecraft
                        </NavText>
                        <NavItem eventKey="minecraft/stats">
                            <NavText>
                                Stats
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="minecraft/status">
                            <NavText>
                                Server Status
                            </NavText>
                        </NavItem>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>

        /*<Navbar bg="dark" variant="dark" expand="md" fixed='left' collapseOnSelect>
            <Nav.Link className="navbar-brand" href="/">
                <img src={kmiLogo} width={50} height={50}></img>
            </Nav.Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className="nav-link" href="/discord">Discord</Nav.Link>
                    <Nav.Link className="nav-link" href="/minecraft">Minecraft</Nav.Link>
                    <Nav.Link className="nav-link" href="/about">About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>*/
    

export default SideMenu