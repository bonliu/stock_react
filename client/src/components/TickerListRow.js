import React from 'react';
import '../styles/TickerListRow.css';

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
                    <button className="btn btn-remove" onClick={this.handleOnClick}>
                        Sell
                    </button>
                </td>
            </tr>
        );
    }
}

export default TickerListRow;
