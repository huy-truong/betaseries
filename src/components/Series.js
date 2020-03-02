import React from 'react'
import Show from './Show'

import './Series.css'

class Series extends React.Component {
    
    state = {
        shows: []
    }

    getAllSeries  = () => {
        var myHeaders = new Headers();
        myHeaders.append("X-BetaSeries-Key", this.props.appProps.client_id);
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("https://api.betaseries.com/shows/list?v=3.0", requestOptions)
          .then(response => response.json())
          .then(result => this.setState({shows:result.shows}))
          .catch(error => console.log('error', error));
      }

    
    componentDidMount = () => {
        this.getAllSeries();
        
    }

    render = () =>  {
        return (
            <div>
                <div className="cards">
                    {this.state.shows.map((show, index) => (
                        <Show key={index} item={show} />
                    ))}
                </div>
            </div>
            
         
        );
    }
}

export default Series