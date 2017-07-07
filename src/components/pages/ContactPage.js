import React from 'react';

export class ContactPage extends React.Component {
  constructor(props) {
    super(props);

    // initial local state of component
    this.state = {
      email: '',
      message: '',
      type: '',
      response: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value});
  }

  handleFormSubmit(event) {
    event.preventDefault();

    this.setState({
      type: 'info',
      response: 'Sending...'
    }, this.sendFormData);

    console.log(this.state);
  }

  sendFormData() {
    const xmlhttp = new XMLHttpRequest();
    const formData = {
      email: this.state.email,
      message: this.state.message
    };

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === 4) {
        const response = JSON.parse(xmlhttp.responseText);

        if (xmlhttp.status === 200 && response.status === 'OK') {
          this.setState({type: 'success', response: 'Message sended!'});
        } else {
          this.setState({type: 'danger', response: 'Error!'});
        }

        this.setState({
          email: '',
          message: ''
        });
      }
    };

    xmlhttp.open('POST', 'contact', true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(`email=${encodeURIComponent(formData.email)}&message=${encodeURIComponent(formData.message)}`);
  }

  render () {
    let alertMessage = null;

    if (this.state.type && this.state.response) {
      const classString  = 'alert alert-' + this.state.type;
      alertMessage = (
        <div className={classString}>
          {this.state.response}
        </div>
      );
    }

    return (
      <div className="contact">
        <h1>Contact page</h1>
        {alertMessage}
        <form onSubmit={this.handleFormSubmit} method="post" className="form-horizontal">
          <div className="form-group">
            <label htmlFor="email" className="col-sm-2 control-label">Email</label>
            <div className="col-sm-10">
              <input type="email"
                     value={this.state.email}
                     onChange={this.handleEmailChange}
                     className="form-control"
                     id="email"
                     placeholder="Email" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message" className="col-sm-2 control-label">Message</label>
            <div className="col-sm-10">
              <textarea
                name="message"
                value={this.state.message}
                onChange={this.handleMessageChange}
                id="message"
                className="form-control"
                cols="30"
                rows="10"></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary">Send</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactPage;