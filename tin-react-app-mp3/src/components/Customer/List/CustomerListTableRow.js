import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../../../helper/authHelper";
import { getCurrentUser } from "../../../helper/authHelper";

export default function CustomerListTableRow(props) {
  const customer = props.cusData;
  const navigate = useNavigate();

  const deleteCustomer = (customerId) => {
    const user = getCurrentUser();
    let token
    if (user && user.token) {
        token = user.token
    }

    fetch(`http://localhost:3000/api/customers/${customerId}`, {
      method: "DELETE",
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(res => {
      console.log(res);
      navigate(`/customers`);
      window.location.reload();
    })
    .catch(error => {
      console.log(error);
      navigate('/customers');
      window.location.reload();
    });
  }

  return (
    <tr>
      <td>{customer.name}</td>
      <td>{customer.lastName}</td>
      <td>{customer.phoneNumber}</td>
      <td>{customer.email}</td>
      {isAuthenticated && 
      <td>
        <Link className="button view" to={`/customers/details/${customer._Id}`}>
          View
        </Link>
        <Link className="button edit" to={`/customers/edit/${customer._Id}`}>
          Edit
        </Link>
        <a className="button del" onClick={() => deleteCustomer(customer._Id)}>
          Delete
        </a>
      </td>}
    </tr>
  );
}
