import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxillary/Auxillary';

const withErrorHandler = ( WrappedComponent, axios ) =>{
    return class extends Component {

        state = {
            error: null
        }

        componentDidMount(){
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            });
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            });
        }

        componentWillUnmount() {
            console.lof('unmount interceptors');
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }
    
    
        errorConfirmHandler = () =>{
            this.setState({error: null});
        }

        render(){
            return (
                <Aux>
                    <Modal show={this.state.error}
                        modalClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
};

export default withErrorHandler