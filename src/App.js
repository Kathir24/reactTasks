import React from "react";
import { connect } from 'react-redux';
import { Button } from "react-bootstrap";
import Table from './Table'
import Popup from "./PopUp";

class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      show: false,
      popupShow: false,
      userId: '',
      body: '',
      title: '',
      store: [],
      error: {
        userId: '',
        body: '',
        title: ''
      }
    }
  }
  x;
  componentDidMount() {
    console.log(this.props.totalState);
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

  ShowInputBox = () => {
    this.setState({
      show: true,
    })
  }
  showTable = () => {
    this.props.dispatchFun()
    this.setState({
      ...this.state,
      store: this.props.totalState.details
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
  render() {
    return (
      <div>
        <div className="text-center m-5">
          <Button variant="primary" onClick={this.showTable}>clicke here to fetch data</Button>
        </div>

        {this.props.totalState.isFetching ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <h2>fetching...</h2>
          </div>
        ) : (
          <>
            <Table
              data={this.props.totalState.details}
              columns={this.columns}
              store={this.state.store}
            />
            <Popup
              handleChange={this.handleChange}
              ShowInputBox={this.ShowInputBox}
              handleSubmit={this.handleSubmit}
              state={this.state}
            />
          </>
        )}
      </div>
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
