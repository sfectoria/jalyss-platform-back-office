import React, { useEffect, useState } from "react";
import axios from "axios";
import { ip } from "../constants/ip";

function PersonPresent({
  person,
  type,
  reff,
  setName,
  setEmail,
  setPhone,
  setAddress,
  setId,
}) {
  const [pName, setPName] = useState("");
  const [pEmail, setPEmail] = useState("");
  const [pPhone, setPPhone] = useState("");
  const [pAddress, setPAddress] = useState("");
  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      if (type === "BR") {
        if (reff === "resv") {
          const response = await axios.get(`${ip}/stocks/${person}`);
          console.log(person, response.data, "hello");
          const { id, name, location } = response.data.data;
          setId(id);
          setName(name);
          setPName(name);
          setEmail("jalyss@gmail.com");
          setPEmail("jalyss@gmail.com");
          setAddress(location);
          setPAddress(location);
        }
        if (reff === "sndr") {
          const response = await axios.get(`${ip}/forniseurs/${person}`);
          const { id, name, location } = response.data;
          setId(id);
          setName(name);
          setPName(name);
          setEmail("jalyss@gmail.com");
          setPEmail("jalyss@gmail.com");
          setAddress(location);
          setPAddress(location);
        }
      }
      if (type === "BT") {
        if (reff === "resv") {
          const response = await axios.get(`${ip}/stocks/${person}`);
          console.log(person, response.data, "hello");
          const { id, name, location } = response.data.data;
          setId(id);
          setName(name);
          setPName(name);
          setEmail("jalyss@gmail.com");
          setPEmail("jalyss@gmail.com");
          setAddress(location);
          setPAddress(location);
        }
        if (reff === "sndr") {
          const response = await axios.get(`${ip}/stocks/${person}`);
          const { id, name, location } = response.data.data;
          setId(id);
          setName(name);
          setPName(name);
          setEmail("jalyss@gmail.com");
          setPEmail("jalyss@gmail.com");
          setAddress(location);
          setPAddress(location);
        }
      }

      if (type === "BS") {
        if (reff === "resv") {
          const response = await axios.get(`${ip}/forniseurs/${person}`);
          console.log(person, response.data, "hello");
          const { id, name, location } = response.data;
          setId(id);
          setName(name);
          setPName(name);
          setEmail("jalyss@gmail.com");
          setPEmail("jalyss@gmail.com");
          setAddress(location);
          setPAddress(location);
        }
        if (reff === "sndr") {
          const response = await axios.get(`${ip}/stocks/${person}`);
          const { id, name, location } = response.data.data;
          setId(id);
          setName(name);
          setPName(name);
          setEmail("jalyss@gmail.com");
          setPEmail("jalyss@gmail.com");
          setAddress(location);
          setPAddress(location);
        }
      }

      if (
        type === "BL" ||
        type === "BLF" ||
        type === "F" ||
        type === "Ticket" ||
        type === "Devis" ||
        type === "BC"
      ) {
        if (reff === "resv") {
          const response = await axios.get(`${ip}/clients/${person}`);
          console.log(person, response.data, "hello");
          const { id, fullName, address,email } = response.data;
          setId(id);
          setName(fullName);
          setPName(fullName);
          setEmail(email);
          setPEmail(email);
          setAddress(address);
          setPAddress(address);
        }
        if (reff === "sndr") {
          const response = await axios.get(`${ip}/selling/${person}`);
          const { id, name, region } = response.data;
          console.log(person, id, "hello");
          setId(id);
          setName(name);
          setPName(name);
          setEmail("jalyss@gmail.com");
          setPEmail("jalyss@gmail.com");
          setAddress(region);
          setPAddress(region);
        }
      }

      if (type === "BRe") {
        if (reff === "sndr") {
          const response = await axios.get(`${ip}/clients/${person}`);
          console.log(person, response.data, "hello");
          const { id, name, location } = response.data;
          setId(id);
          setName(name);
          setPName(name);
          setEmail("jalyss@gmail.com");
          setPEmail("jalyss@gmail.com");
          setAddress(location);
          setPAddress(location);
        }
        if (reff === "resv") {
          const response = await axios.get(`${ip}/selling/${person}`);
          const { id, name, region } = response.data;
          console.log(person, id, "hello");
          setId(id);
          setName(name);
          setPName(name);
          setEmail("jalyss@gmail.com");
          setPEmail("jalyss@gmail.com");
          setAddress(region);
          setPAddress(region);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="mt-4">
        <span>{pName}</span>
      </div>
      <div className="mt-4">
        <span>{pEmail}</span>
      </div>
      <div className="mt-4">
        <span>{pPhone}</span>
      </div>
      <div className="mt-4">
        <span>{pAddress}</span>
      </div>
    </div>
  );
}

export default PersonPresent;
