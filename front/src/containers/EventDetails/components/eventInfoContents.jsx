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
import moment from 'moment';
import {
    FormGroup, Label,
  } from 'reactstrap';

class UsersList extends Component {
  
  render() {
      const {
        datePlay,
        typeGameInfo,
      } = this.props;
    return (
        <div className="dashboard container" style={{ border: '1px solid rgba(0,0,0,.125)', borderRadius: '4px' }}>
            <label> <strong>Información del partido</strong></label>
            <div className="col-md-6">
                <FormGroup>
                    <Label className="label_autofin" for="type">Fecha y hora: { moment(datePlay).format('DD/MM/YYYY HH:mm') }</Label>
                </FormGroup>
            </div>
            <div className="col-md-6">
                <FormGroup>
                    <Label className="label_autofin" for="subtype">Tipo: { typeGameInfo }</Label>
                </FormGroup>
            </div>
        </div>
    );
  }
}

export default UsersList;
