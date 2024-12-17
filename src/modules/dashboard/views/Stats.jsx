import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ip } from '../../../constants/ip';
import axios from 'axios';

function Stats() {
  const [bncmmde, setBncmmde] = useState([]);
  const [bnVente, setVente] = useState([]);
  const [article, setArticles] = useState([]);
  const [bn, setcbn] = useState([]);
  const [bnCommande, setCommande] = useState([]);
  const [topArticles, setTopArticles] = useState([]);


  useEffect(() => {
    const fetchBn = async () => {
      try {
        const res = await fetch(`${ip}/receiptNote/all_rn`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await res.json();
        setBncmmde(result.data);
        setcbn(result.data);
        console.log("hna1",result.data);
        
      } catch (error) {
        console.error("Error fetching receipt notes:", error);
        setBncmmde([]); 
      }
    };

    fetchBn();
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
        console.error('Error fetching vente data:', error);
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
      } catch (error) {
        console.error('Error fetching article data:', error);
        setArticles([]);
      }
    };

    fetchArticles();
  }, []);

  // useEffect(() => {
  //   const fetchbnCommande = async () => {
  //     try {
  //       const res = await fetch(`${ip}/purchaseOrder/getAll`);
  //       if (!res.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await res.json();
  //       setCommande(data.data);
  //       console.log("hna bn commande",data.data);
        
  //     } catch (error) {
  //       console.error('Error fetching bnCommande data:', error);
  //       setCommande([]);
  //     }
  //   };

  //   fetchbnCommande();
  // }, []);

  const typeRetour = bncmmde.filter((e) => e.typeReceipt=== "retour");
  const sommederetour = typeRetour.length
// console.log("hna retour",typeRetour);

  const typeTransfer = bncmmde.filter((e) => e.typeReceipt=== "transfer");
  const sommedetransfer = typeTransfer.length
  
  const typeAchat = bncmmde.filter((e) => e.typeReceipt=== "achat");  
  const sommedeachat = typeAchat.length
// console.log("hna",typeAchat);

useEffect(() => {
  const fetchTopArticles = async () => {
    try {
      const allReceiptNotes = [];
      typeAchat.forEach((i) => allReceiptNotes.push(...i.receiptNoteLine));
      console.log("All Receipt Notes:", allReceiptNotes);
      const orderedByQuantity = [...allReceiptNotes].sort((a, b) => (b.quantity || 0) - (a.quantity || 0));
      const uniqueById = [];
      const idsSet = new Set();
      
      orderedByQuantity.forEach((item) => {
        if (!idsSet.has(item.idArticle)) {
          uniqueById.push(item);
          idsSet.add(item.idArticle);
        }
      });    
      const ordered = [...uniqueById].sort((a, b) => (b.quantity || 0) - (a.quantity || 0));
      const top3Ids = ordered.slice(0, 3).map(item => item.idArticle);
      console.log("Top 3 Article IDs:", top3Ids);
      const articleRequests = top3Ids.map(id =>
        axios.get(`http://localhost:3000/articles/${id}`)
      );
      const articleResponses = await Promise.all(articleRequests);
      const articles = articleResponses.map(res => res.data);
      const articlesWithQuantity = top3Ids.map(id => {
        const article = articles.find(art => art.id === id);
        const quantity = orderedByQuantity.find(item => item.idArticle === id)?.quantity || 0;
        return { ...article, quantity };
      });

      setTopArticles(articlesWithQuantity);
    } catch (error) {
      console.error("Error fetching top articles:", error);
      setTopArticles([]);
    }
  };

  fetchTopArticles();
}, [bn]);


  return (
    <main className="main-container">
      <h1 style={{ color: 'black', paddingTop:"1cm",paddingLeft:"1cm",fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
        Top 3 Selling Articles for Stocks
      </h1>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
          {topArticles?.map((art) => (
            <li
              key={art.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgb(219, 234, 254)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgb(239, 246, 255)';
              }}
            >
              <span style={{ color: 'rgb(55, 65, 81)', fontWeight: '700', fontSize: '1.25rem' }}>
                {art.title}
              </span>
              <span style={{ color: 'rgb(107, 114, 128)', fontSize: '1rem' }}>
                 {art.quantity} Quantity
              </span>
            </li>
          ))}
        </ul>
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
            <h3>Bon de Retour</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{sommederetour}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Bon de Transfert</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{sommedetransfer}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Bon de Achat</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{sommedeachat}</h1>
        </div>
         <div className='card'>
          <div className='card-inner'>
            <h3>Bon de Sortie</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{bnVente?.data ? bnVente.data.length : "No Data"}</h1>
        </div>
        </div>

 
    </main>
  );
}

export default Stats;
