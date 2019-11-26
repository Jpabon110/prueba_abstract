import React, { Component } from 'react';
import {
  Card, CardBody,
  // Col, Badge, Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import EventListContents from './components/eventListContents';
import {
  createEvent,
  getAllEvents,
} from '../../redux/actions/eventActions';

class Index extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pass: '',
      showErrorEmail: true,
      showErrorPass: true,
      users: [],
    };
  }

  componentDidMount() {
    this.props.getAllEvents({}, body => {
      this.setState({ users: body })
    });
  }

  onChangeInput = key => (e) => {
    if ((key === 'email') || (key === 'pass')) {
        this.setState({ [key]: e.target.value.trim() });
      }
  }

  onSubmitNewInfo = (e) => {
    if (e) {
      e.preventDefault();
    }

    const {
        email,
        pass,
    } = this.state;

    this.setState({showErrorEmail: true, showErrorPass: true});

    if(email === ''){
        this.setState({showErrorEmail: false});
        return;
    }

    if(pass === ''){
        this.setState({showErrorPass: false});
        return;
    }

    this.props.createEvent({ email, password: pass }, user => {
      this.props.getAllEvents({}, body => {
        this.setState({ users: body, email: '', pass: '' })
      });
    });

}

  render() {
    return (
        <Card style={{ paddingBottom: '10px' }}>
          <CardBody className="card_body_flex" style={{ padding: '5px 10px' }}>
            <div className="col-md-12">
                <EventListContents
                  users={this.state.users}
                  props={this.props}
                />
            </div>
          </CardBody>
        </Card>
    );
  }

}

const mapStateToProps = ({ event }) => ({
  events: event.events,
});


const mapDispatchToProps = {
  createEvent,
  getAllEvents,
};
export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Index);
