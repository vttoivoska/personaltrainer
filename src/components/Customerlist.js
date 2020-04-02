import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddTraining from './AddTraining'

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


export default function Customerlist() {
    const [customers, setCustomer] = useState([]);

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
      };

    useEffect(() => fetchData() ,[]);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomer(data.content))
    }

    const deleteCustomer = props => {
        fetch(props.links[0].href, { method: "DELETE" }).then(res => {
          }
        );
      };

      const updateCustomer = props => {
        fetch(props.links[0].href, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(props)
        })
          .then(res => {
            fetchData();
          })
          .catch(err => {
            console.error(err);
          });
      };

        const addCustomer = customer => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(customer)
    })
      .then(res => {
        fetchData();
      })
      .catch(err => {
        console.error(err);
      });
  };

  const addTraining = training => {
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(training)
    })
      .then(res => {
        fetchData();
      })
      .catch(err => {
        console.error(err);
      });
  };

    const columns = [
        {
            title: "",
            field: "",
            render: rowData => (
              <AddTraining addTraining={addTraining} customer={rowData} />
            )
          },
        {
            title: 'Firstname',
            field: 'firstname'
        },
        {
            title: 'Lastname',
            field: 'lastname'
        }, 
        {
            title: 'Streetaddress',
            field: 'streetaddress'
        }, 
        {
            title: 'Postcode',
            field: 'postcode'
        }, 
        {
            title: 'Email',
            field: 'email'
        }, 
        {
            title: 'Phone',
            field: 'phone'
        }, 
    ]

    return (
        <div>
            <MaterialTable title="Customers" filterable={true} data={customers} columns={columns} icons={tableIcons} options={{pageSize: 10}} 
                    editable={{
                        onRowAdd: customer =>
                          new Promise(resolve => {
                            addCustomer(customer);
                            resolve();
                          }),
              
                        onRowUpdate: newData =>
                          new Promise(resolve => {
                            updateCustomer(newData);
                            resolve();
                            fetchData();
                          }),
              
                        onRowDelete: props =>
                          new Promise(resolve => {
                            deleteCustomer(props);
                            fetchData();
                            resolve();
                          })
                      }} />
        </div>
    )
}