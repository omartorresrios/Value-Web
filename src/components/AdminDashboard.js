import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Nav } from "./styled-components";
import axios from 'axios';
import '../styles/AdminDashboard.css';

import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

Charts(FusionCharts)
FusionTheme(FusionCharts)

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const myDataSource = {
  "chart": {
		"caption": "Countries With Most Oil Reserves [2017-18]",
		"subCaption": "In MMbbl = One Million barrels",
		"xAxisName": "Country",
		"yAxisName": "Reserves (MMbbl)",
		"numberSuffix": "K",
		"theme": "fusion"
	},
	"data": [
		{
			"label": "Venezuela",
			"value": "290"
		},
		{
			"label": "Saudi",
			"value": "260"
		},
		{
			"label": "Canada",
			"value": "180"
		},
		{
			"label": "Iran",
			"value": "140"
		},
		{
			"label": "Russia",
			"value": "115"
		},
		{
			"label": "UAE",
			"value": "100"
		},
		{
			"label": "US",
			"value": "30"
		},
		{
			"label": "China",
			"value": "30"
		}
	]
};

const chartConfigs = {
  	type: 'column2d',
    width: "100%",
    height: "100%",
  	dataFormat: 'json',
  	dataSource: myDataSource,
};

class AdminDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      totalReviews: null
    };

    this.logout = this.logout.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData() {
    if (sessionStorage.getItem("adminData")) {
      let data = JSON.parse(sessionStorage.getItem("adminData"));
      let auth_token = data.data.authentication_token
      const userToken = 'Token token='.concat(auth_token);

      // axios.get("http://localhost:3000/api/" + userId + "/sent_reviews", { headers: { Authorization: userToken } }).then(response => {
      //   completion(response.data)
      // }).catch((error) => {
      //   console.log("Cannot retrieve reviews");
      // });
    }
  }

  logout() {
    console.log("loggint out admin");
    sessionStorage.setItem("adminData", "");
    sessionStorage.clear();
    this.setState({redirect: true});
  }

  render() {

    if (this.state.redirect) {
      return (<Redirect to={'/admin_signin'}/>)
    }

    return (
      <div class="container-fluid h-100">
        <div class="row h-100">
          <div class="col-sm-2 px-1 bg-dark fixed-top aside">
            <div class="py-2 sticky-top flex-grow-1">
              <div class="nav flex-sm-column">
                  <a href="" class="nav-link d-none d-sm-inline">Sidebar</a>
                  <a href="" class="nav-link">Link</a>
                  <a href="" class="nav-link">Link</a>
                  <a href="" class="nav-link">Link</a>
                  <a href="" class="nav-link">Link</a>
                  <a href="" class="nav-link">Link</a>
              </div>
            </div>
          </div>

          <div class="col-sm-10 px-1 dashboard_background">
            <div className="container-fluid pr-5 pl-5 pt-5 pb-5">
              <div className="row">
                <div className="cols-sm col-md-4 is-light-text mb-4">
                  <div className="card grid-card is-card-dark">
                    <div className="card-heading">
                      <div className="is-dark-text-light letter-spacing text-small">
                        Revenue from Amazon
                      </div>
                      <div className="card-heading-brand">
                        <i className="fab fa-amazon text-large" />
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
                      <ReactFC {...chartConfigs} />
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="card is-card-dark chart-card">
                    <div className="chart-container large full-height">
                      ReactFC2
                    </div>
                  </div>
                </div>
              </div>

              <div className="row" style={{ minHeight: "400px" }}>
                <div className="col-md-6 mb-4">
                  <div className="card is-card-dark chart-card">
                    <div className="chart-container large full-height">
                      ReactFC3
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mb-4">
                  <div className="card is-card-dark chart-card">
                    <div className="chart-container large full-height">
                      ReactFC4
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboard;
