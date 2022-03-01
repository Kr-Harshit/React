import React,{Component} from 'react';

import Aux from '../../../hoc/Auxillary/Auxillary';
import classes from "./OrderSummary.module.css";
import Button from "../../UI/Button/Button"


class OrderSummary extends Component{

    // componentDidUpdate(){
    //     console.log('[Order Summary] update')
    // }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return <tr key={igKey}>
                <td><span style={{textTransform:'capitalize'}}>{igKey}</span></td>
                <td>{this.props.ingredients[igKey]}</td>
                <td>{this.props.price[igKey] * this.props.ingredients[igKey]}</td>
            </tr>

        })

        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <table className={classes.SummaryTable}>
                <thead>
                        <tr>
                            <th>Item</th>
                            <th>Amount</th>
                            <th>Price</th>
                        </tr>
                </thead>
                <tbody>
                    {ingredientSummary}
                </tbody>
                </table>
                <h3 style={{textAlign:'center'}}>Total Price: <strong>{this.props.totalPrice.toFixed(2)}</strong></h3>
                <p>Do you proceed to check out ?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        )
    }
};

export default OrderSummary;