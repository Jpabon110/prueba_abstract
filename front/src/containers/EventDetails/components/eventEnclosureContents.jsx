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
import React, { Component } from 'react';
import {
    FormGroup, Label, Col,
  } from 'reactstrap';
//   import map from 'lodash/map';

import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

  const mapStyles = {
    width: '50%',
    height: '50%',
  };  

class EventEnclosure extends Component {
    state = {
      };

  render() {
      const { infoEvent } = this.props;
      
    return (
        <div className="dashboard container" style={{ border: '1px solid rgba(0,0,0,.125)', borderRadius: '4px' }}>
            <label>Información del Recinto deportivo</label>
            <div className="col-md-6">
                <FormGroup>
                    <Label className="label_autofin" for="type">Nombre del Recinto: { infoEvent.nombre }</Label>
                </FormGroup>
            </div>
            <div className="col-md-6">
                <FormGroup>
                    <Label className="label_autofin" for="subtype">Teléfono: { infoEvent.telefono }</Label>
                </FormGroup>
            </div>
            <div className="col-md-6">
                <FormGroup>
                    <Label className="label_autofin" for="subtype">Calle: { infoEvent.calle }</Label>
                </FormGroup>
            </div>
            <div className="col-md-6">
                <FormGroup>
                    <Label className="label_autofin" for="subtype">Comuna: { infoEvent.comuna }</Label>
                </FormGroup>
            </div>
            {
                ((infoEvent.latitud) && (infoEvent.longitud)) && (
                <Col className="concessionaires-map" sm="12">
                    <Map
                        google={this.props.google}
                        zoom={15}
                        style={mapStyles}
                        initialCenter={{ lat: infoEvent.latitud, lng: infoEvent.longitud }}
                    >
                        <Marker position={{ lat: infoEvent.latitud, lng: infoEvent.longitud }} />
                    </Map>
                </Col>
                )
            }
        </div>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY
  })(EventEnclosure);
