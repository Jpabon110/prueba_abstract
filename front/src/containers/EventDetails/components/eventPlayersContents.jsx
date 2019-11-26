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
import TableContent from '../../Table/components/tableContents'
import AskModal from '../../../shared/components/DeleteModal';
import map from 'lodash/map';
import { 
  withRouter,
  } from "react-router-dom";
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DModal from '../../../shared/components/DeleteModal';
import {
  createPlayer,
  deletePlayer,
} from '../../../redux/actions/playerActions';
import {
  getAllPlayersByIdEvent
} from '../../../redux/actions/eventActions';
import {
    FormGroup, Button, Input,
  } from 'reactstrap';

  const headers = [
    {
      id: 'email', disablePadding: false, label: 'Email',
    },
    {
      id: 'status', disablePadding: true, label: 'Estado',
    },
    {
      id: 'remove', disablePadding: true, label: 'Eliminar',
    }
  ];

class UsersList extends Component {

  constructor() {
    super();
    this.state = {
      isOpenAskModal: false,
      inputEmail: null,
      inputName: null,
      thePlayers: [],
      infoPlayers: [],
      justOne: true,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
      this.props.getAllPlayersByIdEvent(id, body2 =>{
        this.setState({infoPlayers:  body2});
      });
  }

  componentWillUpdate(){
    const { infoPlayers } = this.props;
      if(infoPlayers && this.state.justOne){
        this.setState({ thePlayers: infoPlayers, justOne: false });
      }
      
  }

  onClickAction = (action, record) => () => {
    switch (action) {
      case 'send':
        this.sendPlayer();
        break;
      case 'delete':
        this.deletePlayer(record);
        break;
      default:
        break;
    }
  }

  sendPlayer = () => {
    this.setState({
      isOpenAskModal: true,
    });
  }

  toggleSendEmailPlayer = isOk => () => {
    if (isOk) {
      this.onSendEmail();
    } else {
      this.setState({ isOpenAskModal: false });
    }
  }

  onSendEmail = (e) => {
    if (e){
      e.preventDefault();
    }

    const { id } = this.props.match.params;
    const { quantity } = this.props;

    const {
      inputName,
      inputEmail,
      infoPlayers,
    } = this.state;    

    if((quantity - infoPlayers.length) === 0){
      alert('Error, todos los cupos llenos para el evento.');
      return;
    }

    if(inputName === null){
      alert('Porfavor debe ingresar un nombre.');
      return;
    }

    if(inputEmail === null){
      alert('Porfavor debe ingresar un correo.');
      return;
    }
    

    const data = {

        status_email: "pendiente",
        event_id: id,
        email: inputEmail,
        name: inputName,
      
    };
  
      this.props.createPlayer(data, () => {
        this.props.getAllPlayersByIdEvent(id,(body) => {
            this.setState({
              isOpenAskModal: false,
              inputEmail: '',
              infoPlayers: body,
              inputName: '',
            });
        });
      });
  }

  onChangeInput = key => (e) => {
    if ((key === 'inputEmail') || (key === 'inputName')) {
      this.setState({ [key]: e.target.value });
    }
  }

  deletePlayer = (record) => {
    this.setState({
      isOpenDModal: true,
      id: record.id,
    });
  }

  toggleDeletePlayer = isOk => () => {
    if (isOk) {
      this.onDelete();
    } else {
      this.setState({ isOpenDModal: false });
    }
  }

  onDelete = () => {
    const { id } = this.props.match.params;
    this.props.deletePlayer(this.state.id, () => {
      this.props.getAllPlayersByIdEvent(id, (body) =>{
        this.setState({
          isOpenDModal: false,
          id: null,
          infoPlayers: body,
        });
      });
    });
  }
  
  render() {

    const { quantity } = this.props;
    const { infoPlayers } = this.state;
    
    const data = map(infoPlayers, (d) => ({
      id: d.id,
      cells: (
        <TableRow
          className="material-table__row"
          role="checkbox"
          key={d.id}
        >
          <TableCell className="material-table__cell" padding="checkbox">
          </TableCell>
          <TableCell className="material-table__cell" align="left">{d.email}</TableCell>
          <TableCell className="material-table__cell" align="left">{d.status_email}</TableCell>
          <TableCell
            className="material-table__cell"
            align="left"
          >
            <a onClick={this.onClickAction('delete', d)} style={{ marginLeft: '15%' }}>
              <span
                className="lnr lnr-lnr lnr-trash"
                style={{
                  fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', color: '#000',
                }}
              />
            </a>
          </TableCell>
        </TableRow>
      ),
    }
    ));
    
    return (
      <Fragment>
        <AskModal
          title="Atención"
          color="primary"
          message="¿Estas seguro que deseas invitar a esa persona?"
          isOpen={this.state.isOpenAskModal}
          toggle={this.toggleSendEmailPlayer}
        />
        <DModal
          title="Atención"
          color="warning"
          message="¿Esta seguro que desea borrar este registro?"
          isOpen={this.state.isOpenDModal}
          toggle={this.toggleDeletePlayer}
        />
        <div className="dashboard container" style={{ border: '1px solid rgba(0,0,0,.125)', borderRadius: '4px' }}>
          <br />
            <div>
                <FormGroup>
                    <div style={{ display: 'flex' }}>
                       <Input
                        type="text"
                        maxLength="25"
                        onChange={this.onChangeInput('inputName')}
                        placeholder="ingresa un nombre"
                        value={this.state.inputName}
                        style={{ width: '58%', marginRight: '10%' }}
                        />
                        <Input
                        type="text"
                        maxLength="25"
                        onChange={this.onChangeInput('inputEmail')}
                        placeholder="ingresa un correo"
                        value={this.state.inputEmail}
                        style={{ width: '58%', marginRight: '10%' }}
                        />
                        <Button className="asignar" color="info" onClick={this.onClickAction('send')}>Invitar Jugadores</Button>{' '}
                    </div>
                </FormGroup>
            </div>
            <div>
            <strong>Faltan { quantity - infoPlayers.length } de { quantity } jugadores</strong>
                <FormGroup>
                <TableContent 
                    data={data}
                    headers={headers}
                />
                </FormGroup>
            </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ event }) => ({
  player: event.players,
});


const mapDispatchToProps = {
  createPlayer,
  getAllPlayersByIdEvent,
  deletePlayer,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(withRouter(UsersList));
