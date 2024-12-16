import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ip } from '../../../constants/ip';

function  Stats() {
  const [bncmmde, setBncmmde] = useState([]);
  const [bnVente, setVente] = useState([]);
  const [article, setArticles] = useState([]);
  const [bntransfert,setTransfert] =useState([])
 

//   const data = [
//     { name: 'Page A', uv: Employe.length, pv:clients.length, amt: channels.length },
//     { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
//     { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
//     { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
//     { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
//     { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
//     { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
//   ];

 
  useEffect(() => {
    const fetBn = async () => {
      try {
        const res = await fetch(`${ip}/receiptNote/all_rn`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setBncmmde(data); 
        console.log("here",data.data.length);
        
      } catch (error) {
        console.error('Error fetching customer data:', error);
        setBncmmde([]); 
      }
    };

    fetBn();
  }, []);


  useEffect(() => {
    const fetchVente = async () => {
      try {
        const res = await fetch(`${ip}/exitNote/all_en`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setVente(data); 
      } catch (error) {
        console.error('Error fetching abonnement data:', error);
        setVente([]);
      }
    };

    fetchVente();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${ip}/articles/getAll`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setArticles(data.data);
        console.log("here",data.data);
         
      } catch (error) {
        console.error('Error fetching abonnement data:', error);
        setArticles([]);
      }
    };

    fetchArticles();
  }, []);


  useEffect(() => {
    const fetchbnTransfert = async () => {
      try {
        const res = await fetch(`${ip}/transfer-note/getAll`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setTransfert(data);
        console.log("her",data.length);
         
      } catch (error) {
        console.error('Error fetching abonnement data:', error);
        setTransfert([]);
      }
    };

    fetchbnTransfert();
  }, []);





  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
         <div className='card'>
          <div className='card-inner'>
            <h3>Articles</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{article.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Bon de Commande</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{bncmmde?.data ? bncmmde.data.length : "No Data"}</h1>

        </div>
         <div className='card'>
          <div className='card-inner'>
            <h3>Bon de Sortie</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{bnVente?.data ? bnVente.data.length : "No Data"}</h1>
        </div>
         <div className='card'>
          <div className='card-inner'>
            <h3>Bon de Transfert</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{bntransfert.length}</h1>
        </div>
        </div>
      {/* <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div> */}
    </main>
  );
}

export default Stats;
