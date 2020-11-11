import React,  { useEffect } from 'react'
import { connect } from "react-redux";
import { fetchCustomers } from "../redux";

function DashboardContent({ customerData, fetchCustomers }) {
    console.table(customerData)
    useEffect(() => {
        fetchCustomers();
      }, []);
    
      return customerData.loading ? (
        <h2>Loading...</h2>
      ) : customerData.error ? (
        <h2>{customerData.error}</h2>
      ) : (
        <div>
          <h2>Lista de usuarios</h2>
          <div>
        {customerData &&
          customerData.customers &&
          customerData.customers.map((user) => <p key={user.id}>{user.name}</p>)}
      </div>
        </div>
      );
}

const mapStateToProps = (state) => {
    return {
      //   usa el nombre que se asigno en combine reducer para 
      //    acceder a la funcion reductora para usuarios
      //     cake: cakeReducer,
      //   iceCream: iceCreamReducer,
      //   user: userReducer
      customerData: state.customer
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchCustomers: () => dispatch(fetchCustomers()),
    };
  };
  

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContent);
