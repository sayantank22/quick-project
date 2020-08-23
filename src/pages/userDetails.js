import React, { Component } from 'react';
import EditorImageUpload from '../components/EditorImageUpload';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
    };
  }
  componentDidMount() {
    console.log(this.props.match.params.userId);
    axios
      .get(
        `https://us-central1-testproject-257115.cloudfunctions.net/api/user/${this.props.match.params.userId}`
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          userData: {
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            displayPicture: res.data.displayPicture,
          },
        });
      })
      .catch((err) => console.log(err));

    console.log(this.state.userData);
  }
  render() {
    return (
      <div>
        <h2>User Details Page</h2>
        <br />
        <br />
        <a
          href={this.state.userData.displayPicture}
          target='_blank'
          rel='noopener noreferrer'
          download>
          <button>
            <i className='fas fa-download' />
            Download Image
          </button>
        </a>

        <div className='container mt-4'>
          <h4 className='display-4 text-center mb-4'>
            <i className='fab fa-react' /> React Image Upload
          </h4>

          <EditorImageUpload userId={this.props.match.params.userId} />
        </div>
      </div>
    );
  }
}

export default withRouter(UserDetails);
