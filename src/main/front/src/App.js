import React from 'react';
import Login from "./user/login";
import Signup from './user/signup';
import MainPage from "./mainPage/mainPage";
import StoreSignup from "./user/storeSignup";
import ShoppingHome from "./mainPage/shoppingHome";

function App() {
    /*const [data, setData] = useState('');

    useEffect(() => {
        fetch('http://localhost:80/test')
            .then(res => {
                if (!res.ok) {
                    throw new Error('response error');
                }
                return res.json();
            })
            .then(data => setData(data.message))
            .catch(err => {
                console.error('Fetch error:', err);
                setData('Error fetching data');
            });
    }, []);

    return (
        <div>
            값 : {data}
        </div>
    );*/
    return (
        <div>
            <Signup />
            <StoreSignup />
            <MainPage />
            <ShoppingHome />
        </div>
    )
}

export default App;
