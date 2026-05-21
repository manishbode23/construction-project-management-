import { useEffect, useState } from 'react';
import { fetchProcurement, formatRupees } from '../api.js';

const demoOrders = [
  { id: 1, vendor: 'Apex Cement Supply', status: 'requested', total_cost: 18500 },
  { id: 2, vendor: 'Brightline Electricals', status: 'approved', total_cost: 9200 },
  { id: 3, vendor: 'Harbor Steel Works', status: 'delivered', total_cost: 31200 },
];

export default function ProcurementPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchProcurement().then((res) => setOrders(res.data)).catch(() => setOrders(demoOrders));
  }, []);

  return (
    <div>
      <header className="page-header">
        <div>
          <h1>Procurement</h1>
          <p>Follow material orders from request to delivery.</p>
        </div>
      </header>
      <ul className="list-card">
        {orders.map((order) => (
          <li key={order.id}>
            <strong>{order.vendor}</strong> - {order.status} - {formatRupees(order.total_cost)}
          </li>
        ))}
      </ul>
    </div>
  );
}
