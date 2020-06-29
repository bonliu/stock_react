import React from 'react';
import Popup from 'reactjs-popup';
import '../styles/TickerListRow.css';
import SellForm from './SellForm';

class TickerListRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            shares: 0,
            price: 0
        }
    }

    componentDidMount() {
        console.log(this.props);
        this.setState({
            ticker: this.props.ticker,
            shares: this.props.shares,
            price: this.props.price
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.shares !== prevProps.shares) {
            this.setState({ shares: this.props.shares });
        }
    }
    
    handleOnClick() {
        console.log('Click');
    }
    
    render() {
        return (
            <tr id={this.props.ticker} className="table-row">
                <td className="table-item">
                    {this.state.ticker}
                </td>
                
                <td id="shares" className="table-item">
                    {this.state.shares}
                </td>

                <td id="price" className="table-item">
                    {this.state.price}
                </td>

                <td className="table-item">
                    <Popup trigger={<button>Sell</button>} position="right center">
                        {close => (
                            <div>
                                <SellForm ticker={this.state.ticker} maxShare={this.state.shares} />
                                <button onClick={close}>Cancel</button>
                            </div>
                        )}
                    </Popup>
                    {/* <button className="btn btn-remove" onClick={this.handleOnClick}>
                        Sell
                    </button> */}
                </td>
            </tr>
        );
    }
}

export default TickerListRow;
