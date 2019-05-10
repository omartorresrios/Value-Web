import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Nav } from "./styled-components";
import axios from 'axios';
import '../styles/AdminDashboard.css';

import { Pie } from 'react-chartjs-2';

import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import Item from './Item';

Charts(FusionCharts)
FusionTheme(FusionCharts)

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

class AdminDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      totalReviews: null,
      dptsThatMostRecognizeData: [],
      dptsMostRecognizeData: [],
      emplWhoMostRecognizeData: [],
      emplMostRecognizeData: [],
      numberOfReviewsByValueData: [],
      numberOfReviews: null
    };

    this.logout = this.logout.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
  }

  componentWillMount() {
    if (sessionStorage.getItem("adminData")) {
      this.retrieveData();
    }
  }

  retrieveData() {
    let data = JSON.parse(sessionStorage.getItem("adminData"));
    let companyId = data.data.company.id
    let auth_token = data.data.authentication_token
    const userToken = 'Token token='.concat(auth_token);

    axios.get('http://localhost:3000/api/' + companyId + '/departments_that_most_recognize', { headers: { Authorization: userToken } }).then(response => {
      this.setState({ dptsThatMostRecognizeData: response.data });
    })
    .catch((error) => {
      console.log('Cannot get the data: ' + error);
    });

    axios.get('http://localhost:3000/api/' + companyId + '/departments_most_recognize', { headers: { Authorization: userToken } }).then(response => {
      this.setState({ dptsMostRecognizeData: response.data });
    })
    .catch((error) => {
      console.log('Cannot get the data: ' + error);
    });

    axios.get('http://localhost:3000/api/' + companyId + '/employees_who_most_recognize', { headers: { Authorization: userToken } }).then(response => {
      this.setState({ emplWhoMostRecognizeData: response.data });
    })
    .catch((error) => {
      console.log('Cannot get the data: ' + error);
    });

    axios.get('http://localhost:3000/api/' + companyId + '/employees_most_recognize', { headers: { Authorization: userToken } }).then(response => {
      this.setState({ emplMostRecognizeData: response.data });
    })
    .catch((error) => {
      console.log('Cannot get the data: ' + error);
    });

    axios.get('http://localhost:3000/api/' + companyId + '/number_of_reviews_by_value', { headers: { Authorization: userToken } }).then(response => {
      this.setState({ numberOfReviewsByValueData: response.data });
    })
    .catch((error) => {
      console.log('Cannot get the data: ' + error);
    });

    axios.get('http://localhost:3000/api/' + companyId + '/number_of_reviews', { headers: { Authorization: userToken } }).then(response => {
      this.setState({ numberOfReviews: response.data });
    })
    .catch((error) => {
      console.log('Cannot get the data: ' + error);
    });

  }

  logout() {
    sessionStorage.setItem("adminData", "");
    sessionStorage.clear();
    this.setState({redirect: true});
  }

  render() {

    const dptsThatMostRecognizeData = {
      chart: {
        caption: "Los que más reconocen",
        plottooltext: "<b>$percentValue</b> of web servers run on $label servers",
        showlegend: "1",
        showpercentvalues: "1", // THIS VALUE CAN CHANGE, TO 0 FOR SHOW NUMBERS
        showPercentInTooltip: "0",
        legendposition: "bottom",
        usedataplotcolorforlabels: "1",
        theme: "fusion"
      },
      data: this.state.dptsThatMostRecognizeData
    };

    const dptsMostRecognizeData = {
      chart: {
        caption: "Los que más son reconocidos",
        plottooltext: "<b>$percentValue</b> of web servers run on $label servers",
        showlegend: "1",
        showpercentvalues: "1", // THIS VALUE CAN CHANGE, TO 0 FOR SHOW NUMBERS
        showPercentInTooltip: "0",
        legendposition: "bottom",
        usedataplotcolorforlabels: "1",
        theme: "fusion"
      },
      data: this.state.dptsMostRecognizeData
    };

    var emplWhoMostRecognizeDataTable = this.state.emplWhoMostRecognizeData.map((item, key) => {
        return (
          <div>
            <td key={item.id}>{item.empleado}</td>
            <td key={item.id}>{item.departamento}</td>
            <td key={item.id}>{item.reviews}</td>
          </div>
        )
    });

    var emplMostRecognizeDataTable = this.state.emplMostRecognizeData.map((item, key) => {
        return (
          <div>
            <td key={item.id}>{item.empleado}</td>
            <td key={item.id}>{item.departamento}</td>
            <td key={item.id}>{item.reviews}</td>
          </div>
        )
    });

    const numberOfReviewsByValueData = {
      chart: {
        caption: "Número de reseñas por valor",
        subCaption: "Last month",
        yAxisName: "Cantidad de reseñas",
        numberPrefix: "",
        theme: "fusion"
      },
      data: this.state.numberOfReviewsByValueData
    };

    const numberOfReviews = this.state.numberOfReviews

    if (this.state.redirect) {
      return (<Redirect to={'/admin_signin'}/>)
    }

    return (
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-sm-2 px-1 bg-dark fixed-top aside">
            <div className="py-2 sticky-top flex-grow-1">
              <div className="nav flex-sm-column">
                  <a href="" className="nav-link d-none d-sm-inline">Sidebar</a>
                  <a href="" className="nav-link">Link</a>
                  <a href="" className="nav-link">Link</a>
                  <a href="" className="nav-link">Link</a>
                  <a href="" className="nav-link">Link</a>
                  <a href="" className="nav-link">Link</a>
              </div>
            </div>
          </div>

          <div className="col-sm-10 px-1 dashboard_background">
            <div className="container-fluid pr-5 pl-5 pt-5 pb-5">
              <div className="row">
                <div className="cols-sm col-md-4 is-light-text mb-4">
                  <div className="card grid-card is-card-dark">
                    <div className="card-heading">
                      <div className="is-dark-text-light letter-spacing text-small">
                        Cantidad de reseñas
                      </div>
                      <div className="card-heading-brand">
                        <i className="fab fa-amazon text-large" />
                      </div>
                    </div>

                    <div className="card-value pt-4 text-x-large">
                      {this.state.numberOfReviews}
                    </div>
                  </div>
                </div>

                <div className="cols-sm col-md-4 is-light-text mb-4">
                  <div className="card grid-card is-card-dark">
                    <div className="card-heading">
                      <div className="is-dark-text-light letter-spacing text-small">
                        Revenue from Ebay
                      </div>
                      <div className="card-heading-brand">
                        <i className="fab fa-ebay text-x-large logo-adjust" />
                      </div>
                    </div>

                    <div className="card-value pt-4 text-x-large">
                      <span className="text-large pr-1">$</span>
                      Content
                    </div>
                  </div>
                </div>

                <div className="cols-sm col-md-4 is-light-text mb-4">
                  <div className="card grid-card is-card-dark">
                    <div className="card-heading">
                      <div className="is-dark-text-light letter-spacing text-small">
                        Revenue from Etsy
                      </div>
                      <div className="card-heading-brand">
                        <i className="fab fa-etsy text-medium" />
                      </div>
                    </div>

                    <div className="card-value pt-4 text-x-large">
                      <span className="text-large pr-1">$</span>
                      Content
                    </div>
                  </div>
                </div>
              </div>

              <div className="row" style={{ minHeight: "400px" }}>
                <div className="col-md-6 mb-4">
                  <div className="card is-card-dark chart-card">
                    <div className="chart-container large full-height">
                    <ReactFC
                      type="pie2d"
                      width="100%"
                      height="100%"
                      dataFormat="JSON"
                      dataSource={dptsThatMostRecognizeData}
                    />
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="card is-card-dark chart-card">
                    <div className="chart-container large full-height">
                    <ReactFC
                      type="pie2d"
                      width="100%"
                      height="100%"
                      dataFormat="JSON"
                      dataSource={dptsMostRecognizeData}
                    />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row" style={{ minHeight: "400px" }}>
                <div className="col-md-6 mb-4">
                  <div className="card is-card-dark chart-card">
                    <div className="chart-container large full-height">
                      <table>
                        <tr>
                          <th>Empleado</th>
                          <th>Departamento</th>
                          <th>Reviews</th>
                        </tr>
                        <tr>
                          {emplWhoMostRecognizeDataTable}
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="card is-card-dark chart-card">
                    <div className="chart-container large full-height">
                    <table>
                      <tr>
                        <th>Empleado</th>
                        <th>Departamento</th>
                        <th>Reviews</th>
                      </tr>
                      <tr>
                        {emplMostRecognizeDataTable}
                      </tr>
                    </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row" style={{ minHeight: "400px" }}>
                <div className="col-md-6 mb-4">
                  <div className="card is-card-dark chart-card">
                    <div className="chart-container large full-height">
                      <ReactFC
                        type="bar2D"
                        width="100%"
                        height="100%"
                        dataFormat="JSON"
                        dataSource={numberOfReviewsByValueData}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="card is-card-dark chart-card">
                    <div className="chart-container large full-height">

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <button type='button' onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default AdminDashboard;
