import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchCustomers, fetchUsers } from "../redux";
import { Pie } from "react-chartjs-2";

const styles = {
  flexContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  divChart: {
    width: "80%",

  },
  title: {
    // border:"1px solid red"
  },
};

function DashboardContent({ customerData,userData, fetchCustomers, fetchUsers }) {
  // const count = 
  useEffect(() => {
    fetchCustomers();
    fetchUsers();
  }, []);

  return customerData.loading && userData.loading ? (
    <h2>Loading...</h2>
  ) : customerData.error ? (
    <h2>{customerData.error}</h2>
  ) : (
    <div style={styles.flexContainer}>
      <h2 style={styles.title}>Dashboard</h2>
      <div style={styles.divChart}>
        {
          customerData && userData && customerData.customers && userData.users && <Pie
          data={{
            labels: ["Customers", "Users"],
            datasets: [
              {
                label: "Percentage",
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                ],
                hoverBackgroundColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                ],
                data: [customerData.customers.length, userData.users.length],
              },
            ],
          }}
          options={{
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
        }
      </div>
      <h2>{customerData.customers.length}</h2>
      <h2>{userData.users.length}</h2>
    </div>
  );
}

const mapStateToProps = (state) => ({
    customerData: state.customer,
    userData: state.user
  }
);

const mapDispatchToProps = (dispatch) => ({
    fetchCustomers: () => dispatch(fetchCustomers()),
    fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContent);
