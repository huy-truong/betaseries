import React from 'react'

import NavComponent from './NavComponent'

class HeaderComponent extends React.Component {
    render = (props) =>  {
        return (
            <>
                <NavComponent
                    appProps = {this.props.appProps}
                    handlers = {this.props.handlers}/>
            </>
           
        );
    }
}

export default HeaderComponent