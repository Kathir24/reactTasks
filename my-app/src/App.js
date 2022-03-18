import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import { connect } from 'react-redux';
// import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
// import { Button } from "react-bootstrap";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

const { SearchBar } = Search;

class Table extends React.Component {
  constructor(props) {
    super()
    this.state = {
      show: false,
      // formData:{
      userId: 'userId',
      body: 'Body',
      title: 'title',
      // }
    }
  }

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
  ShowInputBox() {
    this.setState({
      show: true,
    })
    console.log(this.state.show)
  }
  handleChange = (e) => {
    this.setState({
      // formData.[e.target.name]:
      [e.target.name]: e.target.value,
    })
  }
  handleSubmit() {
    // console.log(this.state.body)
    // console.log(this.state.userId)
    // console.log(this.state.title)
    const sendData = {
      body: this.state.body,
      userId: this.state.userId,
      title: this.state.title
    }
    // console.log(sendData);
    this.props.dispatchFun2(sendData);
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body,
        userId: this.state.userId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    this.setState({
      show: false,
    })
  }
  render() {
    return (
      <div>
        <button onClick={this.props.dispatchFun}>display</button>
        <h1>Clear search bar and filter</h1>

        {this.props.totalState.isFetching ? 'fetching...' : (
          <>
            <ToolkitProvider
              bootstrap4
              keyField="name"
              data={this.props.totalState.details}
              columns={this.columns}
              search
            >
              {props => (
                <div>
                  <SearchBar
                    {...props.searchProps}
                    style={{ width: "400px", height: "40px" }}
                  />
                  <BootstrapTable
                    {...props.baseProps}
                    filter={filterFactory()}
                    noDataIndication="There is no solution"
                    striped
                    hover
                    condensed
                  />
                </div>
              )}
            </ToolkitProvider>
            <button onClick={() => this.ShowInputBox()}>add row</button>
            {this.state.show && (
              <>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input placeholder="userId" name="userId" onChange={this.handleChange} value={this.state.userId} />
                  <input placeholder="body" name="body" onChange={this.handleChange} value={this.state.body} />
                  <input placeholder="title" name="title" onChange={this.handleChange} value={this.state.title} />
                  <button type="button" onClick={() => this.handleSubmit()}>send data</button>
                </form>
              </>
            )}
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
export default connect(mapStateToProps, mapDispatchToProps)(Table);
