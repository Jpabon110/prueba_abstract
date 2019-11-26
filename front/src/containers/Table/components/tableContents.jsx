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
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { 
withRouter,
} from "react-router-dom";
import Head from './Head';
// import Json_Recintos from './Json_Recintos';
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

class Events extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const { headers, data } = this.props;
    return (
        <Table className="material-table border_bot table-hover">
          <Head
            headers={headers}
          />
          <TableBody>
            { 
              data.map((d) => {
                return (
                    d.cells
                );
              })
             }
          </TableBody>
        </Table>
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
