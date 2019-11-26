import React, { Component, Fragment } from 'react';
import {
  Card, CardBody,
  Row, Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import map from 'lodash/map';
import EventInfoContents from './components/eventInfoContents';
import EventEnclosureContents from './components/eventEnclosureContents';
import EventPlayersContents from './components/eventPlayersContents';
import { 
  withRouter,
  } from "react-router-dom";
import {
  getEventById,
  getAllPlayersByIdEvent,
} from '../../redux/actions/eventActions';
import {
  deletePlayer,
} from '../../redux/actions/playerActions';
import Json_Recintos from '../../containers/Table/components/Json_Recintos';

class Index extends Component {
  constructor() {
    super();
    this.state = {
      infoEvent: {},
      infoPlayers: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getEventById(id, body =>{
      console.log('body', body);
      this.setState({infoEvent:  body});
      this.props.getAllPlayersByIdEvent(id, body2 =>{
        this.setState({infoPlayers:  body2});
      });
    });
  }

  findInfo = value => {
    let infoSelect = {};
    map(Json_Recintos, recinto => {
      if(value === parseInt(recinto.id)){
        infoSelect = { 
          nombre: recinto.nombre,
          telefono: recinto.telefono,
          calle: recinto.calle,
          comuna: recinto.comuna,
          latitud: recinto[ 'LATITUD, LONGITUD' ].split(",")[0],
          longitud: recinto[ 'LATITUD, LONGITUD' ].split(",")[1],
        }
      }
    });
    return infoSelect;
  }

  onClickBackEvents = e => () => {
    this.props.history.push('/');
  }

  render() {
    const { infoEvent } = this.state; 

    console.log('infoEvent', infoEvent);
    
    return (
      <Fragment>
        <Card style={{ paddingBottom: '10px' }}>
          <CardBody className="card_body_flex" style={{ padding: '5px 10px' }}>
            <div className="col-md-12">
              <div className="separetly">
                <h4>Nombre del Partido:  { infoEvent.nameEvent }</h4>
                <Button color="info" onClick={this.onClickBackEvents()}>  Volver a Lista Eventos </Button>
              </div>
                  <br />
                  <Row>
                    <div className="col-md-6" >
                      <EventInfoContents
                        datePlay={infoEvent.datePlay}
                        typeGameInfo={infoEvent.types_game ? infoEvent.types_game.name : ''}
                      />
                      <br />
                      <EventEnclosureContents
                        infoEvent={this.findInfo(infoEvent.enclosure)}
                      />
                    </div>
                    <div className="col-md-6" >
                      <EventPlayersContents
                      quantity={infoEvent.types_game ? infoEvent.types_game.quantity : ''}
                      />
                    </div>
                  </Row>
            </div>
          </CardBody>
          <br />
        </Card>
      </Fragment>
    );
  }

}

const mapStateToProps = ({ event, player }) => ({
  events: event.events,
  players: player.players,
});


const mapDispatchToProps = {
  getEventById,
  getAllPlayersByIdEvent,
  deletePlayer,
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(withRouter(Index));
