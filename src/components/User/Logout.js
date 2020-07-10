import React from 'react'
import {logout} from '../../actions/auth'
import {connect} from 'react-redux'
import { ActivityIndicator } from 'react-native'
class Logout extends React.Component{
    constructor(props){
        super(props)

    }

    componentDidMount(){
        this.props.logout()
    }

    render(){
        {
            !this.props.isAuthenticated ? this.props.navigation.navigate('Login') : null
        }
        return(
            <ActivityIndicator/>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})

export default connect(mapStateToProps, {logout})(Logout)


