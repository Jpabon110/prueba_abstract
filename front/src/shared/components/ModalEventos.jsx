/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import {
  Button, ButtonToolbar, Label, Input, FormGroup,
  Modal, ModalBody,
} from 'reactstrap';
import DatePicker, { registerLocale } from 'react-datepicker';
import Select from 'react-select';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
// import RegionesComunas from './Json_Regiones_y_Comunas';

registerLocale('es', es);

class ModalComponent extends Component {
  static defaultProps = {
    title: '',
    message: '',
    colored: false,
    header: false,
    selectedOption: null,
  };

  constructor() {
    super();
    this.state = {

    };
  }


  componentDidMount() {

  }

  render() {
    const {
      onChangeInput, isOpen, nameEvent, datePlay, Json_RecintosOptions, typeGamesOptions, typeGame,
      enclosure, title
    } = this.props;

    return (
      <div>
        <Modal
          isOpen={isOpen}
          toggle={this.props.toggle}
          className="modal-dialog modal-dialog--header"
          scrollable="true"
        >
          <div className="modal__header">
            <button className="lnr lnr-cross modal__close-btn" type="button" onClick={this.props.toggle(false)} />
    <h2 className="bold-text label_autofin  modal__title" style={{ fontWeight: 'bold', color: '#343a40' }}> <strong>{ title }</strong></h2>
          </div>
            <ModalBody>
              <FormGroup className="columend_date">
                <Label className="label_autofin" for="datePlay">*Fecha Partido:</Label>
                <br />
                <DatePicker
                  className="form-control"
                  locale="es"
                  dateFormat="dd/MM/yyyy HH:mm"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={1}
                  timeCaption="time"
                  selected={datePlay ? datePlay : null}
                  onChange={onChangeInput('datePlay')}
                />
              </FormGroup>
                  <FormGroup>
                    <Label className="label_autofin" for="names">*Nombre Partido:</Label>
                    <Input
                      type="text"
                      name="nameEvent"
                      id="nameEvent"
                      maxLength="20"
                      value={nameEvent ? nameEvent : ''}
                      onChange={onChangeInput('nameEvent')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="label_autofin" for="enclosure">*Recinto:</Label>
                    <Select
                      options={Json_RecintosOptions}
                      type="text"
                      name="typeGame"
                      placeholder="seleccione tipo de partido"
                      value={enclosure ? enclosure : {}}
                      onChange={onChangeInput('enclosure')}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="label_autofin" for="typeGame">*Tipo Partido</Label>
                    <Select
                      options={typeGamesOptions}
                      type="text"
                      name="typeGame"
                      placeholder="seleccione tipo de partido"
                      value={typeGame ? typeGame : {}}
                      onChange={onChangeInput('typeGame')}
                      required
                    />
                  </FormGroup>
            </ModalBody>
            <ButtonToolbar className="modal__footer">
              <Button className="asignar" onClick={this.props.toggle(false)}>Cancel</Button>{' '}
              <Button
                className="asignar just_this"
                onClick={this.props.toggle(true)}
              >Guardar
              </Button>
            </ButtonToolbar>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent

// export default ModalComponent;
