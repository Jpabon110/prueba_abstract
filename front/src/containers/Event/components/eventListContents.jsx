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
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import moment from 'moment';
import TableRow from '@material-ui/core/TableRow';
import map from 'lodash/map';
import DModal from '../../../shared/components/DeleteModal';
import ModalEventos from '../../../shared/components/ModalEventos';
import BasicNotification from '../../../shared/components/Notifications/BasicNotification';
import TableContent from '../../Table/components/tableContents'
import { 
withRouter,
} from "react-router-dom";
import { Button } from 'reactstrap';
import Json_Recintos from '../../Table/components/Json_Recintos';
import {
    createEvent,
    updateEvent,
    getAllEvents,
    getEventById,
    deleteEvent,
  } from '../../../redux/actions/eventActions';
  import {
    getTypesGames,
  } from '../../../redux/actions/resourceActions';

  const headers = [
    {
      id: 'fecha', disablePadding: false, label: 'Fecha partido',
    },
    {
      id: 'nameEvent', disablePadding: true, label: 'Nombre partido',
    },
    {
      id: 'enclosure', disablePadding: true, label: 'Recinto',
    },
    {
      id: 'typeGame', disablePadding: true, label: 'Tipo de partido',
    },
    {
      id: 'actions', disablePadding: true, label: 'Acciones',
    },
  ];

class Events extends Component {
  constructor() {
    super();
    this.state = {
        users: [],
        isOpenDModal: false,
        isOpenModalEvents: false,
        nameEvent: null,
        datePlay: null,
        enclosure: {},
        typeGame: {},
        title: '',
    };
  }


  componentDidMount() {
    this.props.getTypesGames();
  }

  onClickAction = (action, record) => () => {
    switch (action) {
      case 'delete':
        this.deleteEvent(record);
        break;
      case 'update':
        this.uploadEvent(record);
        break;
      case 'create':
        this.createEvent();
        break;
      default:
        break;
    }
  }

  createEvent = () => {
    this.setState({
      isOpenModalEvents: true,
      id: null,
      nameEvent: null,
      datePlay: null,
      enclosure: null,
      typeGame: {},
      title: 'Nuevo evento'
    });
  }

  onClickEventView = e => () => {
    this.props.history.push(`/event/${e}`);
  }

  uploadEvent = (record) => {
    this.setState({
      isOpenModalEvents: true,
      titleModal: 'Editar Usuario',
      id: record.id,
      nameEvent: record.name,
      datePlay: moment(record.date_play).toDate(),
      typeGame: { value: record.types_game.id, label: record.types_game.name },
      enclosure: this.findInfo(record.enclosure),
      title: 'Editar evento'
    });
  }

  deleteEvent = (record) => {
    this.setState({
      isOpenDModal: true,
      id: record.id,
    });
  }

  toggleModalEvent = isOk => () => {
    if (isOk) {
      this.onSubmitEvent();
    } else {
      this.setState({ isOpenModalEvents: false });
    }
  }
  
  onSubmitEvent = (e) => {
    if (e){
      e.preventDefault();
    }


    const {
      id,
      nameEvent,
      datePlay,
      enclosure,
      typeGame,
    } = this.state;

    if(!nameEvent){
      BasicNotification.error('Porfavor debe ingresar el nombre del evento');
      return;
    }

    if(!datePlay){
      BasicNotification.error('Porfavor debe ingresar la fecha del evento');
      return;
    }

    if(!enclosure){
      BasicNotification.error('Porfavor debe ingresar el recinto del evento');
      return;
    }

    if(!typeGame){
      BasicNotification.error('Porfavor debe seleccionar un tipo de partido');
      return;
    }

    const data = {
      id,
      name: nameEvent,
      date_play: datePlay,
      enclosure: enclosure.value,
      types_game_id: typeGame.value,
    };
    

    if (id){
      this.props.updateEvent(id, data, (body) => {
        this.props.getAllEvents();
        this.setState({
          isOpenModalEvents: false,
          id: null,
          nameEvent: null,
          datePlay: null,
          enclosure: null,
          typeGameId: null,
        });
      });
    } else {
      delete data.id;
      this.props.createEvent(data,(body) => {
        this.props.getAllEvents();
        this.setState({
          isOpenModalEvents: false,
          id: null,
          nameEvent: null,
          datePlay: null,
          enclosure: null,
          typeGameId: null,
        });
      });
    }

  }
  
  
  onClickModalD = () => {
    this.setState({
      isOpenDModal: true,
    });
  }
  
  toggleDeleteEvent = isOk => () => {
    if (isOk) {
      this.onDelete();
    } else {
      this.setState({ isOpenDModal: false });
    }
  }

  
  onDelete = () => {
    const { id } = this.state;
    this.props.deleteEvent(id, () => {
      this.props.getAllEvents({}, () =>{
        this.setState({
          isOpenDModal: false,
          id: null,
        });
      });
    });
  }
  onChangeInput = key => (e) => {
    if ((key === 'nameEvent')) {
      this.setState({ [key]: e.target.value });
    } else if ((key === 'datePlay') || (key === 'typeGame') || (key === 'enclosure')) {
      this.setState({ [key]: e });
    }
  }

  findInfo = value => {
    let infoSelect = {};
    map(Json_Recintos, d => {
      if(value === parseInt(d.id)){
        infoSelect = { value: d.id, label: d.nombre }
      }
    });
    return infoSelect;
  }

  render() {
    const { events, typeGames } = this.props;
    
    const typeGamesOptions = map(typeGames, d => ({ value: d.id, label: d.name }));
    const Json_RecintosOptions = map(Json_Recintos, d => ({ value: d.id, label: d.nombre }));    

    const data = map(events, d => ({
      id: d.id,
      cells: (
        <TableRow
          className="material-table__row"
          role="checkbox"
          key={d.id}
        >
          <TableCell className="material-table__cell" padding="checkbox">
          </TableCell>
          <TableCell className="material-table__cell" align="left">{moment(d.date_play).format('DD/MM/YYYY HH:mm')}</TableCell>
          <TableCell className="material-table__cell" align="left">{d.name}</TableCell>
          <TableCell className="material-table__cell" align="left">{this.findInfo(d.enclosure).label}</TableCell>
          <TableCell className="material-table__cell" align="left">{d.types_game.name}</TableCell>
          <TableCell
            className="material-table__cell"
            align="left"
          >
            <a onClick={this.onClickAction('update', d)}>
              <span
                className="lnr lnr-lnr lnr-pencil"
                style={{
                  fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', color: '#000',
                }}
              />
            </a>
            <a onClick={this.onClickAction('delete', d)} style={{ marginLeft: '15%' }}>
              <span
                className="lnr lnr-lnr lnr-trash"
                style={{
                  fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', color: '#000',
                }}
              />
            </a>
            <a onClick={this.onClickEventView(d.id)} style={{ marginLeft: '15%' }}>
              <span
                className="lnr lnr-eye"
                style={{
                  fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', color: '#000',
                }}
              />
            </a>
          </TableCell>

        </TableRow>
      )
    }));

    return (
      <Fragment>
          <DModal
            title="Atención"
            color="warning"
            message="¿Esta seguro que desea borrar este registro?"
            isOpen={this.state.isOpenDModal}
            toggle={this.toggleDeleteEvent}
          />
        <ModalEventos
          isOpen={this.state.isOpenModalEvents}
          toggle={this.toggleModalEvent}
          nameEvent={this.state.nameEvent}
          datePlay={this.state.datePlay}
          enclosure={this.state.enclosure}
          typeGame={this.state.typeGame}
          onChangeInput={this.onChangeInput}
          typeGamesOptions={typeGamesOptions}
          Json_RecintosOptions={Json_RecintosOptions}
          title={this.state.title}
        />
        <div className="material-table__wrap">
          <br />
          <div className="separetly">
            <h3>Lista de eventos</h3>
            <Button color="info" onClick={this.onClickAction('create', {})}>+ Nuevo evento</Button>
          </div>
          <br />
            <TableContent 
              data={data}
              headers={headers}
            />
          <br />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ event, resource }) => ({
  events: event.events,
  typeGames: resource.typesGames,
});


const mapDispatchToProps = {
  createEvent,
  getAllEvents,
  updateEvent,
  getEventById,
  deleteEvent,
  getTypesGames,
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(withRouter(Events));
