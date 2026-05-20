import { useEffect, useState } from 'react';
import { fetchBudget, fetchPayments } from '../api.js';

export default function FinancePage() {
  const [budget, setBudget] = useState(null);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchBudget().then((res) => setBudget(res.data)).catch(console.error);
    fetchPayments().then((res) => setPayments(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <header className="page-header"><h1>Finance</h1></header>
      <section className="detail-grid">
        <div className="detail-card">
          <h2>Budget Summary</h2>
          {budget ? (
            <>
              <p>Planned: ${budget.plannedBudget}</p>
              <p>Actual: ${budget.actualCost}</p>
              <p>Variance: ${budget.variance}</p>
            </>
          ) : (
            <p>Loading budget data...</p>
          )}
        </div>
        <div className="detail-card">
          <h2>Pending Payments</h2>
          <ul>
            {payments.map((payment) => (
              <li key={payment.id}>{payment.status} · ${payment.amount}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
