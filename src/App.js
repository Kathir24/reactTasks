import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginPage from "./LoginPage";
import TablePage from "./TablePage";

class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      user: null,
      show: false,
      popupShow: false,
      userId: '',
      body: '',
      title: '',
      loginUserName: '',
      password: '',
      store: [],
      error: {
        userId: '',
        body: '',
        title: ''
      }
    }
  }

  componentDidMount() {
    console.log(this.state.user);
    console.log(this.state.loginUserName);
    const fromLSUser = localStorage.getItem("user");
    const fromLSName = localStorage.getItem("loginUserName");
    this.props.dispatchFun()
    this.setState({
      ...this.state,
      store: this.props.totalState.details,
      loginUserName:fromLSName
    })
    fromLSUser && JSON.parse(fromLSUser) ? this.setState({
      user: true,
      loginUserName: fromLSName,
    }) : this.setState({
      user: false
    });
    console.log(fromLSName);
    console.log(fromLSUser);
  }

  componentDidUpdate() {
    console.log(this.state.user);
    console.log(this.state.loginUserName);
    localStorage.setItem('user', this.state.user)
    localStorage.setItem('loginUserName', this.state.loginUserName);
  }

  columns = [
    {
      dataField: "userId",
      text: "USERID",
      sort: true,
    },
    {
      dataField: "id",
      text: "ID",
      sort: true,
    },
    {
      dataField: "body",
      text: "BODY",
      sort: true,
    },
    {
      dataField: "title",
      text: "TITLE",
      sort: true,
    }
  ];

  showInputBox = () => {
    this.setState({
      show: true,
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit = () => {
    if (!this.state.userId) {
      this.setState({
        error: {
          userId: 'userId requried'
        }
      })
    } else if (!this.state.body) {
      this.setState({
        error: {
          body: 'body requried'
        }
      })
    } else if (!this.state.title) {
      this.setState({
        error: {
          title: 'title requried'
        }
      })
    } else {
      const sendData = {
        body: this.state.body,
        userId: this.state.userId,
        title: this.state.title
      }
      const x = this.props.totalState.details
      x.push(sendData);
      console.log(x);
      this.props.dispatchFun2(sendData);
      this.setState({
        show: false,
        userId: '',
        body: '',
        title: '',
        store: x,
        error: {},
      })
    }
  }

  auth = (data) => {
    this.setState({
      user: data,
      loginUserName: '',
      password: '',
    })
  }

  render() {
    return (
      <Routes>
        {!this.state.user &&
          <Route path="/" element={
            <LoginPage
              handleChange={this.handleChange}
              state={this.state}
              auth={this.auth}
              showTable={this.showTable}
            />
          } />
        }

        {this.state.user &&
          <Route path="/table" element={
            <TablePage
              showTable={this.showTable}
              showInputBox={this.showInputBox}
              totalState={this.props.totalState}
              columns={this.columns}
              state={this.state}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              auth={this.auth}
            />
          } />
        }
        <Route path='*' element={<Navigate to={this.state.user ? "/table" : "/"} />} />
      </Routes>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    totalState: state,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFun: () => {
      dispatch({ type: 'fetching' })
    },
    dispatchFun2: (sendData) => {
      dispatch({ type: 'postData', value: sendData })
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
