/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react';
import map from 'lodash/map';
import Json_Recintos from '../../../containers/Table/components/Json_Recintos';
import { connect } from 'react-redux';
import moment from 'moment';
import { 
  withRouter,
  } from "react-router-dom";
  import {
    getEventById,
    getAllPlayersByIdEvent
  } from '../../../redux/actions/eventActions';

  import {
    getPlayerById,
    updatePlayer,
  } from '../../../redux/actions/playerActions';

import {
    FormGroup, Label, Button,
  } from 'reactstrap'; 

class EventEnclosure extends Component {
    state = {
      infoEvent: {},
      infoPlayer: {},
      };

      componentDidMount() {
        const { id, playerId } = this.props.match.params;

        this.setState({ playerId, id });
        
        this.props.getEventById(id, body =>{
          this.setState({infoEvent:  body});
        });
        this.props.getPlayerById(playerId, body => {
          this.setState({infoPlayer:  body});
        });
      }

      onClickAction = (action) => () => {
        const { id, playerId } = this.state;
        let data = { status_email: '' };
        switch (action) {
          case 'aceptar':
            data.status_email = 'Acepto';
            this.props.updatePlayer(playerId, data, () => {
              this.props.getEventById(id, body => {
                this.setState({ infoEvent: body });
              });
              this.props.getPlayerById(playerId, body => {
                this.setState({ infoPlayer: body });
              });
            });
            break;
          case 'rechazar':
            data.status_email = 'Rechazar';
            this.props.updatePlayer(playerId, data, () => {
              this.props.getEventById(id, body => {
                this.setState({ infoEvent: body });
              });
              this.props.getPlayerById(playerId, body => {
                this.setState({ infoPlayer: body });
              });
            });
            break;
          default:
            break;
        }
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
            }
          }
        });
        
        return infoSelect;
      }

  render() {
      const { infoEvent, infoPlayer } = this.state;
    return (
      <Fragment>
        {
          ( (infoPlayer) && (infoPlayer.status_email === "pendiente")) && (
            <Fragment>
            <h2>Has sido invitado a un partido</h2>
            <br />
            <div className="dashboard container" style={{ border: '1px solid rgba(0,0,0,.125)', borderRadius: '4px' }}>
              <strong>Información del partido</strong>
              <br />
              <br />
              <div className="col-md-6">
                <FormGroup>
                  <Label className="label_autofin" for="type"> <strong>Fecha y hora:</strong> {moment(infoEvent.date_play).format('DD/MM/YYYY HH:mm')}</Label>
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="label_autofin" for="subtype"> <strong>Tipo:</strong> {infoEvent.types_game ? infoEvent.types_game.name : ''}</Label>
                </FormGroup>
              </div>
            </div>
            <br />
            <br />
            <div className="dashboard container" style={{ border: '1px solid rgba(0,0,0,.125)', borderRadius: '4px' }}>
              <br />
              <strong>Información del Recinto deportivo</strong>
              <br />
              <br />
              <div className="col-md-6">
                <FormGroup>
                  <Label className="label_autofin" for="type"> <strong>Nombre del Recinto:</strong> {this.findInfo(infoEvent.enclosure).nombre}</Label>
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="label_autofin" for="subtype"> <strong>Teléfono:</strong> {this.findInfo(infoEvent.enclosure).telefono}</Label>
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="label_autofin" for="subtype"> <strong>Calle:</strong> {this.findInfo(infoEvent.enclosure).calle}</Label>
                </FormGroup>
              </div>
              <div className="col-md-6">
                <FormGroup>
                  <Label className="label_autofin" for="subtype"> <strong>Comuna:</strong> {this.findInfo(infoEvent.enclosure).comuna}</Label>
                </FormGroup>
              </div>
              <div className="col-md-12">
                <FormGroup style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <Button color="info" onClick={this.onClickAction('aceptar')}>Aceptar</Button>
                  <Button color="info" onClick={this.onClickAction('rechazar')}>Rechazar</Button>
                </FormGroup>
              </div>
            </div>
          </Fragment>
          )
        }

{
          ( (infoPlayer) && (infoPlayer.status_email !== "pendiente")) && (
            <Fragment>
            <h2>La invitación ha sido respondida</h2>
            <br />
          </Fragment>
          )
        }
      </Fragment>
    );
  }
}

const mapStateToProps = ({ event, player }) => ({
  events: event.events,
  player: player.player
});


const mapDispatchToProps = {
  getEventById,
  getAllPlayersByIdEvent,
  getPlayerById,
  updatePlayer,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(withRouter(EventEnclosure));
