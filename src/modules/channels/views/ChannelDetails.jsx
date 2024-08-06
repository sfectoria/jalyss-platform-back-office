import React from 'react';
import { useParams } from "react-router-dom";

export default function ChannelDetails() {
  const { id } = useParams()
  return (
    <div>Channel Details {id}</div>
  );
}
