import React from 'react';
import '../styles/TickerListRow.css';

class TickerListRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            shares: 0
        }
    }

    componentDidMount() {
        this.setState({
            // ticker: 'FB',
            // shares: 12
            ticker: this.props.ticker,
            shares: this.props.shares
        });
        console.log(this.props);
        console.log(this.state);
    }
    
    handleOnClick() {
        console.log('Click');
    }
    
    render() {
        return (
            <tr className="table-row">
                <td className="table-item">
                    {this.state.ticker}
                </td>
                
                <td className="table-item">
                    {this.state.shares}
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
