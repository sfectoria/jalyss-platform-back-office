import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { ip } from '../../../constants/ip';
import EditIcon from '@mui/icons-material/Edit';
import UpdateFournisseur from './UpdateFournisseur';
import Tooltip from "@mui/material/Tooltip";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useNavigate } from 'react-router-dom';
import { TbArrowBackUp } from "react-icons/tb";

export default function FournisseurInfo() {
  const [oneFournisseur, setFournisseur] = useState(null);
  const [isEditing, setIsEditing] = useState(false);  
  const { id } = useParams();
const naviagte =useNavigate()
  const fetchData = async () => {
    try {
      const res = await axios.get(`${ip}/provider/${id}`);
      setFournisseur(res.data);
      console.log("Data fetched:", res.data);
    } catch (error) {
      console.error("Error fetching fournisseur data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);  
  };
const Retour =() =>{
  naviagte('/fournisseurs')
}
  return (
    <Box sx={{ paddingTop: '3cm', display: 'flex', justifyContent: 'center', gap: '30px' }}>
      {isEditing ? (
        <UpdateFournisseur oneFournisseur={oneFournisseur} />
      ) : (
        <>
          <Box sx={{
            width: '450px',
            height: '450px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
          }}>
            {oneFournisseur ? (
              <>
                <Avatar
                  sx={{
                    bgcolor: "#e6c440",
                    width: 250,
                    height: 250,
                    fontSize: 60,
                  }}
                  src={oneFournisseur.Media ? oneFournisseur.Media.path : null}
                >
                  {!oneFournisseur.Media &&
                    (oneFournisseur.nameProvider
                      ? oneFournisseur.nameProvider
                          .split(" ")
                          .map((namePart) => namePart[0])
                          .join("")
                      : "?")}
                </Avatar>
                <p style={{ marginTop: '60px', fontSize: '20px', fontWeight: 'bold', color: '#333' }}>
                  {oneFournisseur.nameProvider}
                </p>
              </>
            ) : (
              <p style={{ color: '#888' }}>Loading...</p>
            )}
          </Box>
          <Box
  sx={{
    width: '460px',
    padding: '30px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#333',
    position: 'relative'
  }}
>
<Box
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px', 
  }}
>
  <Tooltip title="Go Back" placement="top">
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={Retour}
    >
      <TbArrowBackUp size={32} />
    </Box>
  </Tooltip>
  <Tooltip title="Edit Profile" placement="top">
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={handleEdit}
    >
      <EditIcon 
        sx={{ 
          fontSize: 32, 
          color: '#48184C' 
        }} 
      />
    </Box>
  </Tooltip>
</Box>

  <Box>
    <h2 style={{ marginBottom: '10px', color: '#48184C' }}>Fournisseur Information</h2>
  </Box>
  <Box style={{ paddingTop: "2cm" }}>
    {oneFournisseur ? (
      <>
        <p><strong>Name:</strong> {oneFournisseur.nameProvider}</p>
        <p><strong>Address:</strong> {oneFournisseur.adresse}</p>
        <p><strong>Phone Number:</strong> {oneFournisseur.phoneNumber}</p>
        <p><strong>Email:</strong> {oneFournisseur.email}</p>
        <p><strong>Registration Number:</strong> {oneFournisseur.registrationNumber}</p>
      </>
    ) : (
      <p>Loading...</p>
    )}
  </Box>
</Box>

        </>
      )}
    </Box>
  );
}
