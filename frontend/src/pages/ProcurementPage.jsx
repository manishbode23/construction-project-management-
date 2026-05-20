import { useEffect, useState } from 'react';
import { fetchProcurement } from '../api.js';

export default function ProcurementPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchProcurement().then((res) => setOrders(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <header className="page-header"><h1>Procurement</h1></header>
      <ul className="list-card">
        {orders.map((order) => (
          <li key={order.id}>
            <strong>{order.vendor}</strong> &mdash; {order.status} &mdash; ${order.total_cost}
          </li>
        ))}
      </ul>
    </div>
  );
}
