import React from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Tables() {
  const { role } = useAuth();
  if (role !== 'admin') {
    return <p>You do not have access to this section.</p>;
  }
  return <h1 className="text-2xl font-bold">Admin Tables</h1>;
}
