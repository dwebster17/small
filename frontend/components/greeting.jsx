import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-modal';

import SessionFormContainer from './session_form_container';

class Greeting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      pagePath: this.props.pagePath
    };
    this.formType = '';

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(formType) {
    return () => {
      this.formType = formType;
      this.setState({ modalIsOpen: true });
    };
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
    this.props.history.push({pathname: this.state.pagePath});
  }

  render() {
    if (this.props.currentUser) {
      return (
        <div className="greeting">
          <span>Welcome {this.props.currentUser.username}!</span>
          <button onClick={this.props.logout}>Logout</button>
        </div>
      );
    }
    return (
      <div className="login-signup">
        <Link className="link" onClick={this.openModal('/login')} to='/login'>Login</Link>
        &nbsp;
        <Link className="link" onClick={this.openModal('/signup')} to='/signup'>Sign Up</Link>
        <Modal
          className="modal"
          overlayClassName="modal-overlay"
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Login Modal">
          <SessionFormContainer formType={this.formType} />
        </Modal>
      </div>
    );
  }
}

export default Greeting;
