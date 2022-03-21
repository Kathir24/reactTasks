import { Button } from "react-bootstrap";
import Table from './Table'
import Popup from "./PopUp";

const TablePage = ({
    totalState,
    columns,
    state,
    handleChange,
    handleSubmit,
    ShowInputBox,
    auth,
}) => {
    return (
        <>
            {/* <h2 className="text-center mt-3 mb-3" >welcome {state.loginUserName}</h2> */}
            {totalState.isFetching ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                    <h2>fetching...</h2>
                </div>
            ) : (
                <>
                    <Table
                        data={totalState.details}
                        columns={columns}
                        store={state.store}
                    />
                    <Popup
                        handleChange={handleChange}
                        ShowInputBox={ShowInputBox}
                        handleSubmit={handleSubmit}
                        state={state}
                        auth={auth}
                    />
                </>
            )}</>
    );
}
export default TablePage;