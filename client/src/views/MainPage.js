import React from 'react';
import CardList from '../components/CardList';
import OrderTable from '../components/TableOrder';
import Header from '../components/Header';
import axios from 'axios';
import { getMyOrder } from '../components/function';

export const baseUrl = 'http://localhost:3020'

function MainPage() {

    const [userData, setUserData] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [myOrder, setMyOrder] = React.useState([]);
    const [marketPrice, setMarketPrice] = React.useState({BTC: 0, ETH: 0, LTC: 0, TRX: 0});
    
    React.useEffect(() => {
        axios({
            url: `${baseUrl}/users/me`,
            method: 'GET',
            headers: {
                cryptotoken: localStorage.getItem('cryptotoken')
            }
        })
        .then(({data}) => {
            setLoading(false);
            setUserData(data);
        })
        .catch(err => {
            setLoading(false);
        })
    },[]);

    React.useEffect(() => {
        axios({
            url: `${baseUrl}/trade/mytrade`,
            method: 'GET',
            headers: {
                cryptotoken: localStorage.getItem('cryptotoken')
            }
        })
        .then(({data}) => {
            setMyOrder(data);
        })
    },[])

    const getListMyOrder = () => {
        getMyOrder()
            .then(data => {
                setMyOrder(data)
            })
            .catch(err => {
            })
    };

    const getMyData = () => {
        axios({
            url: `${baseUrl}/users/me`,
            method: 'GET',
            headers: {
                cryptotoken: localStorage.getItem('cryptotoken')
            }
        })
        .then(({data}) => {
            setUserData(data);
        })
        .catch(err => {
        })
    }

    const getMarketPrice = (type, data) => {
        if (type === 'BTC') {
            setMarketPrice({...marketPrice, BTC: data});
        }else if (type === 'ETH') {
            setMarketPrice({...marketPrice, ETH: data});
        }else if (type === 'LTC') { 
            setMarketPrice({...marketPrice, LTC: data});
        }else {
            setMarketPrice({...marketPrice, TRX: data});
        }
    };

    return(
       <React.Fragment>    
            <React.Fragment>
                <Header />
                <CardList getMyData={getMyData} getMarketPrice={getMarketPrice} getListMyOrder={getListMyOrder} />
                <OrderTable getMyData={getMyData} myOrder={myOrder} userData={userData} marketPrice={marketPrice} getListMyOrder={getListMyOrder} />
            </React.Fragment>   
       </React.Fragment>
    )
}

export default MainPage;