import React from 'react'
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import './Layout.css';
class Layout extends React.Component {
    render = (props) =>  {
        return (
           <div className="container">
               <div className="header">
                    <HeaderComponent 
                            appProps = {this.props.appProps}
                            handlers = {this.props.handlers}/>
               </div>
                <div className="content">
                    {this.props.children}
                </div>
                <div className="footer" >
                    <FooterComponent />
                </div>
           
           </div>
        );
    }
}

export default Layout