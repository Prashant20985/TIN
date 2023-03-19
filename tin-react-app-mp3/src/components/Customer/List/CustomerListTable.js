import CustomerListTableRow from "./CustomerListTableRow";

export default function CustomerListTable(props) {
    const {customers} = props;

    return(
    <table class="list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
            {customers.map(cus => 
                <CustomerListTableRow cusData={cus} key={cus._Id}/>
                )}
        </tbody>
      </table>
    )
}
