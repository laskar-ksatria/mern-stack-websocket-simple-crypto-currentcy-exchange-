import React from 'react';
import { store } from 'react-notifications-component';
import { updateGainLoss } from './function'

function TableOrder(props) {


    const listOrder = props.myOrder.map((item, index) => {
        let pair = item.pair;
        let marketPrice = ""
        if (pair === 'BTC') {
            marketPrice = Number(props.marketPrice.BTC)
        }else if (pair === 'ETH') {
            marketPrice = Number(props.marketPrice.ETH)
        }else if (pair === 'LTC') {
            marketPrice = Number(props.marketPrice.LTC)
        }else if (pair === 'BCH') {
            marketPrice = Number(props.marketPrice.BCH)
        }

        let cssColor = {background: "white", color: "black"};
        let gainLoss = (marketPrice - item.price).toFixed(2);
        if (marketPrice) {
            if (gainLoss < 0) {
                cssColor = {background: '#c40b13', color: 'yellow'}
            }else if (gainLoss > 0) {
                cssColor = {background: '#85ef47', color: 'black'}
            }else {
                cssColor = {background: 'whitesmoke', color: 'black'}
            }
        };

        const closePosition = (gainLoss, id) => {
            updateGainLoss(gainLoss, id)
                .then(data => {
                    store.addNotification({
                        title: "Wonderful!",
                        message: data.message,
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                          duration: 2000,
                        }
                      });
                      props.getListMyOrder();
                      props.getMyData();
                })
                .catch(err => {
                    console.log(err);
                })
        };
        

        return (
            <tr key={item._id}>
        <th scope="row">{index + 1}</th>
        <td>{item.pair}/USDT</td>
        <td>{item.order_type}/USDT</td>
        <td>{item.amount}</td>
        <td>{item.price}</td>
        <td style={{width: '180px', color: cssColor.color, backgroundColor: cssColor.background, fontWeight: '600'}}>{gainLoss}</td>
                    <td>
                        <div onClick={() => closePosition(gainLoss, item._id)} style={{ display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <span style={{cursor: 'pointer', color: 'blue', fontSize: '17px'}}>Close</span>
                        </div>
                    </td>
            </tr>
        )
    })

    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
            <div style={{width: '91%'}}>
            <p style={{fontWeight: '600', fontSize: '16'}}>Demo Balance: {props.userData.demo_balance}</p>
            <table className="table table-bordered" style={{border: '1px solid #5d5d5d'}}>
                <thead>
                    <tr style={{backgroundColor: '#303960', color: 'white'}}>
                    <th scope="col">No.</th>
                    <th scope="col">Pair</th>
                    <th scope="col">Type</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Price</th>
                    <th scope="col" style={{textAlign: 'center'}}>Gain/Loss ($)</th>
                    <th scope="col" style={{textAlign: 'center'}}>Action</th>
                    </tr>
                </thead>
                <tbody style={{backgroundColor: 'white'}}>
                    {listOrder}
                </tbody>
                </table>
            </div>
        </div>
    )

};

export default TableOrder;