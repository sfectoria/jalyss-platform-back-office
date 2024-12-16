// // install (please try to align the version of installed @nivo packages)
// // yarn add @nivo/bump
// import { Box } from '@mui/material';
// import { ResponsiveBump } from '@nivo/bump'

// // make sure parent container have a defined height when using
// // responsive component, otherwise height will be 0 and
// // no chart will be rendered.
// // website examples showcase many properties,
// // you'll often use just a few of them.
// const MyResponsiveBump = () => {
//     const data = [
//   {
//     "id": "Serie 1",
//     "data": [
//       {
//         "x": "2000",
//         "y": 2
//       },
//       {
//         "x": "2001",
//         "y": 4
//       },
//       {
//         "x": "2002",
//         "y": 4
//       },
//       {
//         "x": "2003",
//         "y": 1
//       },
//       {
//         "x": "2004",
//         "y": 11
//       }
//     ]
//   },
//   {
//     "id": "Serie 2",
//     "data": [
//       {
//         "x": "2000",
//         "y": 5
//       },
//       {
//         "x": "2001",
//         "y": 10
//       },
//       {
//         "x": "2002",
//         "y": 5
//       },
//       {
//         "x": "2003",
//         "y": 5
//       },
//       {
//         "x": "2004",
//         "y": 1
//       }
//     ]
//   },
//   {
//     "id": "Serie 3",
//     "data": [
//       {
//         "x": "2000",
//         "y": 3
//       },
//       {
//         "x": "2001",
//         "y": 1
//       },
//       {
//         "x": "2002",
//         "y": 12
//       },
//       {
//         "x": "2003",
//         "y": 4
//       },
//       {
//         "x": "2004",
//         "y": 6
//       }
//     ]
//   },
//   {
//     "id": "Serie 4",
//     "data": [
//       {
//         "x": "2000",
//         "y": 4
//       },
//       {
//         "x": "2001",
//         "y": 12
//       },
//       {
//         "x": "2002",
//         "y": 1
//       },
//       {
//         "x": "2003",
//         "y": 8
//       },
//       {
//         "x": "2004",
//         "y": 2
//       }
//     ]
//   },
//   {
//     "id": "Serie 5",
//     "data": [
//       {
//         "x": "2000",
//         "y": 7
//       },
//       {
//         "x": "2001",
//         "y": 11
//       },
//       {
//         "x": "2002",
//         "y": 11
//       },
//       {
//         "x": "2003",
//         "y": 10
//       },
//       {
//         "x": "2004",
//         "y": 9
//       }
//     ]
//   },
//   {
//     "id": "Serie 6",
//     "data": [
//       {
//         "x": "2000",
//         "y": 8
//       },
//       {
//         "x": "2001",
//         "y": 6
//       },
//       {
//         "x": "2002",
//         "y": 6
//       },
//       {
//         "x": "2003",
//         "y": 7
//       },
//       {
//         "x": "2004",
//         "y": 7
//       }
//     ]
//   },
//   {
//     "id": "Serie 7",
//     "data": [
//       {
//         "x": "2000",
//         "y": 11
//       },
//       {
//         "x": "2001",
//         "y": 3
//       },
//       {
//         "x": "2002",
//         "y": 3
//       },
//       {
//         "x": "2003",
//         "y": 9
//       },
//       {
//         "x": "2004",
//         "y": 12
//       }
//     ]
//   },
//   {
//     "id": "Serie 8",
//     "data": [
//       {
//         "x": "2000",
//         "y": 6
//       },
//       {
//         "x": "2001",
//         "y": 8
//       },
//       {
//         "x": "2002",
//         "y": 8
//       },
//       {
//         "x": "2003",
//         "y": 11
//       },
//       {
//         "x": "2004",
//         "y": 4
//       }
//     ]
//   },
//   {
//     "id": "Serie 9",
//     "data": [
//       {
//         "x": "2000",
//         "y": 1
//       },
//       {
//         "x": "2001",
//         "y": 5
//       },
//       {
//         "x": "2002",
//         "y": 7
//       },
//       {
//         "x": "2003",
//         "y": 12
//       },
//       {
//         "x": "2004",
//         "y": 8
//       }
//     ]
//   },
//   {
//     "id": "Serie 10",
//     "data": [
//       {
//         "x": "2000",
//         "y": 10
//       },
//       {
//         "x": "2001",
//         "y": 2
//       },
//       {
//         "x": "2002",
//         "y": 2
//       },
//       {
//         "x": "2003",
//         "y": 6
//       },
//       {
//         "x": "2004",
//         "y": 3
//       }
//     ]
//   },
//   {
//     "id": "Serie 11",
//     "data": [
//       {
//         "x": "2000",
//         "y": 12
//       },
//       {
//         "x": "2001",
//         "y": 9
//       },
//       {
//         "x": "2002",
//         "y": 9
//       },
//       {
//         "x": "2003",
//         "y": 3
//       },
//       {
//         "x": "2004",
//         "y": 10
//       }
//     ]
//   },
//   {
//     "id": "Serie 12",
//     "data": [
//       {
//         "x": "2000",
//         "y": 9
//       },
//       {
//         "x": "2001",
//         "y": 7
//       },
//       {
//         "x": "2002",
//         "y": 10
//       },
//       {
//         "x": "2003",
//         "y": 2
//       },
//       {
//         "x": "2004",
//         "y": 5
//       }
//     ]
//   }
// ]
    
//     return (
//       <Box sx={{height: "500px"}}>
//         <ResponsiveBump
//           data={data}
//           colors={{ scheme: "spectral" }}
//           lineWidth={3}
//           activeLineWidth={6}
//           inactiveLineWidth={3}
//           inactiveOpacity={0.15}
//           pointSize={10}
//           activePointSize={16}
//           inactivePointSize={0}
//           pointColor={{ theme: "background" }}
//           pointBorderWidth={3}
//           activePointBorderWidth={3}
//           pointBorderColor={{ from: "serie.color" }}
//           axisTop={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: "",
//             legendPosition: "middle",
//             legendOffset: -36,
//             truncateTickAt: 0,
//           }}
//           axisBottom={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: "",
//             legendPosition: "middle",
//             legendOffset: 32,
//             truncateTickAt: 0,
//           }}
//           axisLeft={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: "ranking",
//             legendPosition: "middle",
//             legendOffset: -40,
//             truncateTickAt: 0,
//           }}
//           margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
//           axisRight={null}
//         />
//       </Box>
//     );}

// export default MyResponsiveBump

import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

function  MyResponsiveBump() {
  const [Employe, setEmployee] = useState([]);
  const [clients, setClient] = useState([]);
  const [Provider, setProviders] = useState([]); 
  const [channels,SetChannels] = useState([])
  const [publishing,SetPublishing] = useState([])

  const data = [
    { name: 'Page A', uv: Employe.length, pv:clients.length, amt: channels.length },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

 
  useEffect(() => {
    const fetEmployees = async () => {
      try {
        const res = await fetch('http://localhost:3000/employees/all');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setEmployee(data); 
      } catch (error) {
        console.error('Error fetching customer data:', error);
        setEmployee([]); 
      }
    };

    fetEmployees();
  }, []);


  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch('http://localhost:3000/clients');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setClient(data); 
      } catch (error) {
        console.error('Error fetching abonnement data:', error);
        setClient([]);
      }
    };

    fetchClients();
  }, []);


  useEffect(() => {
    fetch(`http://localhost:3000/provider`)
      .then(response => response.json())
      .then(data => setProviders(data))
      .catch(error => console.error("Error fetching tickets:", error));
  }, []);


  useEffect(() => {
    fetch(`http://localhost:3000/selling/getAll`)
      .then(response => response.json())
      .then(data => SetChannels(data))
      .catch(error => console.error("Error fetching tickets:", error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/publishingHouses/all`)
      .then(response => response.json())
      .then(data => SetPublishing(data))
      .catch(error => console.error("Error fetching tickets:", error));
  }, []);


  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>Clients</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{clients.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Fournisseurs</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{Provider.length}</h1> 
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Employees</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{Employe.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Channels</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{channels.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Publishing-House</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{publishing.length}</h1>
        </div>
      </div>

      <div className='charts'>
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
      </div>
    </main>
  );
}

export default MyResponsiveBump;
