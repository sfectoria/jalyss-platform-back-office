import React, { useEffect, useState } from 'react';
import {
  BsFillGrid3X3GapFill
} from 'react-icons/bs';
import axios from 'axios';
import { ip } from '../../../constants/ip';

function StatForClient() {
  const [article, setArticles] = useState([]);
  const [bnCommande, setCommande] = useState([]);
  const [topClients, setTopClients] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${ip}/articles/getAll`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setArticles(data.data);
      } catch (error) {
        console.error('Error fetching article data:', error);
        setArticles([]);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchbnCommande = async () => {
      try {
        const res = await fetch(`${ip}/purchaseOrder/getAll`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setCommande(data.data);
        console.log("Fetched bnCommande:", data.data);
      } catch (error) {
        console.error('Error fetching bnCommande data:', error);
        setCommande([]);
      }
    };

    fetchbnCommande();
  }, []);

  // Filter Bon de Commande data
  const BndecommdeClientConfirmed = bnCommande.filter((e) => e.status === "Confirmed");
  const sommeBndecommandeClientConfirmed = BndecommdeClientConfirmed.length;
  const BndecommdeClientPending = bnCommande.filter((e) => e.status === "Pending");
  const sommeBndecommandeClientPending = BndecommdeClientPending.length;
  const BndecommdeClientCanceled = bnCommande.filter((e) => e.status === "Cancelled");
  const sommeBndecommandeClientCanceled = BndecommdeClientCanceled.length;

  useEffect(() => {
    const fetchTopClients = async () => {
      const clientOrders = {};

      // Count the orders per client
      BndecommdeClientConfirmed.forEach((order) => {
        clientOrders[order.idClient] = (clientOrders[order.idClient] || 0) + 1;
      });

      // Sort clients by order count
      const sortedClients = Object.entries(clientOrders)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 3);

      // Fetch details for the top clients
      const topClientDetails = await Promise.all(
        sortedClients.map(async ([idClient, orderCount]) => {
          try {
            const res = await axios.get(`${ip}/clients/${idClient}`);
            const clientData = res.data;
            return { ...clientData, orderCount };
          } catch (error) {
            console.error(`Error fetching client data for ID ${idClient}:`, error);
            return { idClient, orderCount, name: "Unknown" };
          }
        })
      );

      setTopClients(topClientDetails);
    };

    fetchTopClients();
  }, [BndecommdeClientConfirmed]);

  return (
    <main className="main-container">
      <h1
        style={{
          color: 'black',
          paddingTop: "1cm",
          paddingLeft: "1cm",
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '1.5rem'
        }}
      >
        Top 3 Clients
      </h1>
      <div
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
          {topClients?.map((client) => (
            <li
              key={client.idClient}
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
              <span
                style={{
                  color: 'rgb(55, 65, 81)',
                  fontWeight: '700',
                  fontSize: '1.25rem'
                }}
              >
                {client.fullName || `NO DATA`}
              </span>
              <span   style={{
                  color: 'rgb(55, 65, 81)',
                  fontWeight: '700',
                  fontSize: '1.25rem'
                }}>Adresse: {client.address}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>Bon de Commande Client</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{bnCommande.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Bon de Commande Confirmed</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{sommeBndecommandeClientConfirmed}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Bon de Commande Pending</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{sommeBndecommandeClientPending}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Bon de Commande Canceled</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{sommeBndecommandeClientCanceled}</h1>
        </div>
      </div>
    </main>
  );
}

export default StatForClient;
