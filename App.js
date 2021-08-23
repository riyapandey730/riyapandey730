import logo from './logo.svg';
import './App.css';
import Coin from './Coin';
import React, { useEffect ,useState} from 'react';

function App() {
  const[coins,setcoins]=useState([]);
  const [search,setSearch]=useState('');
  const getcoindata=async()=>
  {try{
      const res= await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false');
       const data=await res.json();
       console.log(data);
       setcoins(data);
  }
  catch(err)
  {
     console.log(err);
  }
   
  }
  useEffect(()=>
  {
//getcoindata();
  },[])
  const handleChange = e => {
    setSearch(e.target.value);
  };
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className='coin-app'>
    <div className='coin-search'>
      <h1 className='coin-text'>Search a currency</h1>
      <form>
        <input
          className='coin-input'
          type='text'
          onChange={handleChange}
          placeholder='Search'
        />
      </form>
    </div>
    {filteredCoins.map(coin => {
      return (
        <Coin
          key={coin.id}
          name={coin.name}
          price={coin.current_price}
          symbol={coin.symbol}
          marketcap={coin.total_volume}
          volume={coin.market_cap}
          image={coin.image}
          priceChange={coin.price_change_percentage_24h}
        />
      );
    })}
    </div>
  );
}

export default App;
