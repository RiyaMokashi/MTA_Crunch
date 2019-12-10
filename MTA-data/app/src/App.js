import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Dropdown, Menu, Icon, Slider, InputNumber, Row, Col} from 'antd';

const stations = [{name: 'Van Cortlandt Park - 242 St',},
{name: '238 St',},
{name: '231 St',},
{name: 'Marble Hill - 225 St',},
{name: '215 St',},
{name: '207 St',},
{name: 'Dyckman St',},
{name: '191 St',},
{name: '181 St',},
{name: '168 St - Washington Hts',},
{name: '157 St',},
{name: '145 St',},
{name: '137 St - City College',},
{name: '125 St',},
{name: '116 St - Columbia University',},
{name: 'Cathedral Pkwy (110 St)',},
{name: '103 St',},
{name: '96 St',},
{name: '86 St',},
{name: '79 St',},
{name: '72 St',},
{name: '66 St - Lincoln Center',},
{name: '59 St - Columbus Circle',},
{name: '50 St',},
{name: 'Times Sq - 42 St',},
{name: '34 St - Penn Station',},
{name: '23 St',},
{name: '18 St',},
{name: '14 St',},
{name: 'Christopher St - Sheridan Sq',},
{name: 'Houston St',},
{name: 'Canal St',},
{name: 'Franklin St',},
{name: 'Chambers St',},
{name: 'WTC Cortlandt',},
{name: 'Rector St',},
{name: 'South Ferry',}];




// const trainLines = [{
//   line: 'R',
// }, {
//   line: '4',
// }, {
//   line: 'C',
// }];


class App extends React.Component {
  state = {
    selectedDepartureStation: null,
    selectedArrivalStation: null,
    data: null,
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    const {selectedDepartureStation, selectedArrivalStation} = this.state;

    // const diff = selectedDepartureStation.arrivalTime - selectedArrivalStation.arrivalTime;

    return (

      <div className="App" style={{backgroundColor: "#f5f5f5"}}>

      <Row>
        <Col span={12} offset={6}>
          <br /><br /><br /><br /><br />

        </Col>
      </Row>

      <Row>
        <Col span={12} offset={6}>
          <h1 style={{fontFamily:'Helvetica', fontWeight:'normal', backgroundColor: "#f5f5f5"}}> {<img src="/mta.png" width="2.5%" height='2.5%'/>}Crunch </h1>
          <br /><br /><br />
        </Col>
      </Row>

          <a className="ant-dropdown-link" href="App.css">
          Select a train <Icon type="down" /><img src="/1.png" alt="1" width="3%" height="3%" />
            <Icon type="circle" /><img src="/2.png" alt="2" width="3%" height="3%" />
            <Icon type="circle" /><img src="/3.png" alt="3" width="3%" height="3%" />
            <Icon type="circle" /><img src="/4.png" alt="4" width="3%" height="3%" />
            <Icon type="circle" /><img src="/5.png" alt="5" width="3%" height="3%" />
            <Icon type="circle" /><img src="/6.png" alt="6" width="3%" height="3%" />
            <Icon type="circle" /><img src="/7.png" alt="7" width="3%" height="3%" />
            <Icon type="circle" /><img src="/a.png" alt="a" width="2.3%" height="2.3%" />
            <Icon type="circle" /><img src="/c.png" alt="c" width="3%" height="3%" />
            <Icon type="circle" /><img src="/e.png" alt="e" width="3%" height="3%" />
            <Icon type="circle" /><img src="/b.png" alt="b" width="3%" height="3%" />
            <Icon type="circle" /><img src="/d.png" alt="d" width="3%" height="3%" />
            <Icon type="circle" /><img src="/f.png" alt="f" width="3%" height="3%" />
            <Icon type="circle" /><img src="/m.png" alt="m" width="3%" height="3%" />
            <Icon type="circle" /><img src="/g.png" alt="g" width="3%" height="3%" />
            <Icon type="circle" /><img src="/j.png" alt="j" width="3%" height="3%" />
            <Icon type="circle" /><img src="/z.png" alt="z" width="2.3%" height="2.3%" />
            <Icon type="circle" /><img src="/l.png" alt="l" width="3%" height="3%" />
            <Icon type="circle" /><img src="/n.png" alt="n" width="3%" height="3%" />
            <Icon type="circle" /><img src="/q.png" alt="q" width="2.3%" height="2.3%" />
            <Icon type="circle" /><img src="/r.png" alt="r" width="3%" height="3%" />
            <Icon type="circle" /><img src="/w.png" alt="w" width="2.3%" height="2.3%" />
            <Icon type="circle" /><img src="/s.png" alt="s" width="2.8%" height="2.8%" />
          </a>
        <br /><br /><br /><br /><br />

      <Row>
        <Col span={12}>
          <h3> Starting from: {selectedDepartureStation && selectedDepartureStation.name}</h3>
          <Dropdown overlay={(
            <Menu>
              {stations.map(station => (
                <Menu.Item key={station.name}>
                  <a href="#" onClick={() => this.setState({selectedDepartureStation: station})}>
                    {station.name}
                  </a>
                </Menu.Item>
              ))}
            </Menu>
          )}>
            <a className="ant-dropdown-link" href="App.css">
              Departure Station<Icon type="down" />
            </a>
          </Dropdown>
        </Col>
        <Col span={12}>
        <h3>Arriving to:{selectedArrivalStation && selectedArrivalStation.name}</h3>

        <Dropdown overlay={(
          <Menu>
            {stations.map(station => (
              <Menu.Item key={station.name}>
                <a href="#" onClick={() => this.setState({selectedArrivalStation: station})}>
                  {station.name}
                </a>
              </Menu.Item>
            ))}
          </Menu>
        )}>
          <a className="ant-dropdown-link" href="App.css">
            Arrival Station<Icon type="down" />
          </a>
        </Dropdown>
        </Col>
      </Row>
          <br /><br /><br /><br /><br />
      <Row>
        <Col span={8} offset={8}>
          <Slider defaultValue={80} min={60} max={100}/>
        </Col>
      </Row>
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <Row><p className="App-intro">{this.state.data}</p></Row>
      </div>

    );
  }
}

export default App;
