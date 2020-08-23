import React from 'react';
import { auth } from '../firebase/firebase.utils';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  componentDidMount() {
    if (auth.currentUser) {
      console.log(auth.currentUser);
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });

      if (email === 'admin@gmail.com') {
        this.props.history.push('/admin');
      } else if (email === 'hanan@gmail.com') {
        this.props.history.push('/hanan');
      } else {
        this.props.history.push('/users');
      }

      // this.props.history.push('/users');
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <form style={{ textAlign: 'center' }} onSubmit={this.handleSubmit}>
        <p>
          <label htmlFor='email'>Email: </label>
          <input onChange={this.handleChange} name='email' type='email' />
        </p>

        <p>
          <label htmlFor='password'>Password: </label>
          <input onChange={this.handleChange} name='password' type='password' />
        </p>
        <input type='submit' value='Login' />
      </form>
    );
  }
}

export default LoginPage;
