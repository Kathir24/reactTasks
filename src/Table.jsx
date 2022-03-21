import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";

const Table = ({ data, columns, store }) => {
  const { SearchBar } = Search;
  return (
    <>
      <ToolkitProvider
        bootstrap4
        keyField="id"
        data={store.length >= 101 ? store : data}
        columns={columns}
        search
      >
        {props => (
          <div>
            <div className="text-center m-3">
              <SearchBar
                {...props.searchProps}
                style={{ width: "400px", height: "40px" }}
              />
            </div>
            <BootstrapTable
              {...props.baseProps}
              filter={filterFactory()}
              noDataIndication="There is no solution"
              striped
              hover
              condensed
              responsive
            />
          </div>
        )}
      </ToolkitProvider>
    </>
  )
}

export default Table