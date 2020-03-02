import React , {useState }from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './components/Layout'
import Router from './components/Router'
import md5 from 'crypto-js'



class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      api_endpoint: "https://www.betaseries.com",
      client_id: "ed61ed2a1758",
      client_secret: "b53d70cc8a34ce1ea1cde6fe8bc11bf1",
      code: "",
      token: "",
      isAuthenticated: this.isAuthenticated(),

      shows: []
    }
  }

  isAuthenticated = () => {
    if (!sessionStorage.getItem("betaseries"))
      return false;
    return true;
  }


  saveSesstion = (token) => {
    sessionStorage.setItem("betaseries", token);
  }

  logout = () => {
    this.setState({ token: '', isAuthenticated:false });
    sessionStorage.removeItem('betaseries');
  }

  authBetaSeriesBasic = (username="Dev001", password="developer") => {
    let url = this.state.api_endpoint;
    url += "/members/auth"
    url +="?v=3.0"
    url += "&login=";
    url += username;
    url += "&password=";
    url += md5.MD5(password);

    var myHeaders = new Headers();
    myHeaders.append("X-BetaSeries-Version", "3.0");
    myHeaders.append("X-BetaSeries-Key", this.state.client_id);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  authBetaSeries = () => {
    let url = this.state.api_endpoint;
    url += "/authorize?v=3.0&client_id=";
    url += this.state.client_id;
    url += "&redirect_uri=http://localhost:3000";

    let beta_auth = window.open(
      url,
      "BetaSeries Auth",
      "resizable,scrollbars,status,location=yes,height=600,width=800"
    )

    var interval = setInterval(() => {
      try {
        if (beta_auth.closed) {
          clearInterval(interval)
        } else {
          let url = JSON.stringify(beta_auth.location.href)
          var regex = /[?#&]([^=#]+)=([^&#]*)/g,
            params = {},
            match;
          while (match = regex.exec(url)) {
            params[match[1]] = match[2];
          }
          if (params.code === undefined) {
            //TODO
          } else {
            this.setState({ code: params.code.substring(0, params.code.length - 1) }, () => {
              let getToken = "https://api.betaseries.com/oauth/access_token";
              getToken += "?v=3.0";
              getToken += "&client_id=" + this.state.client_id;
              getToken += "&client_secret=" + this.state.client_secret;
              getToken += "&redirect_uri=http://localhost:3000";
              getToken += "&code=" + this.state.code;
             
              fetch(getToken, {
                method: "POST"
              }).then(res => res.json()
                .then((data) => {
                  this.saveSesstion(data.access_token);
                  this.setState({ token: data.access_token, isAuthenticated:true }, () => {
                    beta_auth.close();
                  })
                  console.log("This is state");
                  console.log(this.state);
                }))
            })
          }
        }
      } catch {
        //TODO
      }
    }, 1000)
  }


  render= () =>{
    return (
      <Layout
            appProps = {this.state}
            handlers={
                {  
                  handleLogout: this.logout, 
                  handleAuthen: this.authBetaSeries,
                  handleSeries: this.getAllSeries,
                  isAuthenticated: this.isAuthenticated
                }}>
        <Router appProps={this.state}  />
      </Layout>
    );
  }

}

export default App;
