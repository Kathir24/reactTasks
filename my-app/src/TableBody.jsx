const TableBody = ({details})=>{
    console.log(details);
    return(
        <tbody>
            {details.map((values)=>(
                <tr>
                    <td>{values.userId}</td>
                    <td>{values.id}</td>
                    <td>{values.title}</td>
                </tr>
            ))}
        </tbody>
    )
}
export default TableBody;