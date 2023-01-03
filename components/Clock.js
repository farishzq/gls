import React, { Component } from 'react';
import '@/styles/clock.module.css';

/*
const styles = {
    clock: {
        textAlign: 'center',
        fontSize: 25,
        paddingTop: 5,
    },
};
*/

function getDayFromInt(dy){
    if(dy === 1){
        return 'Monday';
    }
    else if(dy === 2){
        return 'Tuesday';
    }
    else if(dy === 3){
        return 'Wednesday';
    }
    else if(dy === 4){
        return 'Thursday';
    }
    else if(dy === 5){
        return 'Friday';
    }
    else if(dy === 6){
        return 'Saturday';
    }
    else if(dy === 7){
        return 'Sunday';
    }
}

class ReactClock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }
    //Lifecycle hooks
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
            date: new Date()
        });
    }
    render() {
        return (
            <div className="clockdiv text-center">{getDayFromInt(this.state.date.getDay())} {this.state.date.toLocaleDateString("id-ID")}  {this.state.date.toLocaleTimeString()}</div>
        );
    }
}

export default ReactClock;