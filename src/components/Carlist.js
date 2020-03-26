import React, { Component } from 'react';
import {SERVER_URL} from '../constants.js';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCar from './AddCar';
import EditCar from './EditCar';
import {CSVLink} from 'react-csv';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class Carlist extends Component {

    constructor(props) {
        super(props);
        this.state = { cars: [] };
    }

    componentDidMount() {
        this.fetchCars();
    }

    fetchCars = () => {
      fetch(SERVER_URL + 'api/cars')
      .then((response) => response.json())
      .then((responseData) => {
          this.setState({
              cars: responseData._embedded.cars
          })
      })
      .catch(err => console.error(err));
    }

    onDelClick = (link) => {
      if (window.confirm('Are you sure?')) {
        fetch(link, {method: 'DELETE'})
        .then(res => {
          toast.success("Car deleted", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          this.fetchCars();
        })
        .catch(err => {
          toast.error("Error when deleting", {
            position: toast.POSITION.BOTTOM_LEFT
          });
          console.error(err)
        })
      }
    }


    addCar(car) {
      fetch(SERVER_URL + 'api/cars',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
      })
      .then(res => this.fetchCars())
      .catch(err => console.error(err))
    }

    updateCar(car, link) {
      fetch(link, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
      })
      .then(res => {
        toast.success("Changes saved", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        this.fetchCars();
      })
      .catch(err => 
        toast.error("Error when saving", {
          position: toast.POSITION.BOTTOM_LEFT
        })
      )
    }


    render() {
        
        const columns = [{
            Header: 'Brand',
            accessor: 'brand'
          }, {
            Header: 'Model',
            accessor: 'model',
          }, {
            Header: 'Color',
            accessor: 'color',
          }, {
            Header: 'Year',
            accessor: 'year',
          }, {
            Header: 'Price €',
            accessor: 'price',
          }, 
          {
            id: 'editbutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: ({value, row}) => (
              <EditCar car={row} link={value} updateCar={this.updateCar} fetchCars={this.fetchCars} />
            )
          },
          {
            id: 'delbutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: ({value}) => (
              <Button color="secondary" size="small" onClick={ () => {this.onDelClick(value)}}>Delete</Button>
            )
          }];

        return (
            <div className = "Carlist">
              <Grid container>
                <Grid item>
                  <AddCar addCar={this.addCar} fetchCars={this.fetchCars}/>
                </Grid>
                <Grid item style={{padding: 15}}>
                  <CSVLink data={this.state.cars} separator=";">Export CSV</CSVLink>
                </Grid>
              </Grid>
              <ReactTable data={this.state.cars} columns={columns} 
                          filterable={true}/>
              <ToastContainer autoClose={1500}></ToastContainer>
            </div>
        );
    }
}

export default Carlist;
