import React from 'react';
import ContestApply from "./contest/contestApply";
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
        <ContestApply />
    )
}

export default App;
