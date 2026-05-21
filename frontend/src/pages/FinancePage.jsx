import { useEffect, useState } from 'react';
import { fetchBudget, fetchPayments, formatRupees } from '../api.js';

const demoBudget = {
  plannedBudget: 950000,
  actualCost: 780000,
  variance: 170000,
};

const demoPayments = [
  { id: 1, status: 'pending', amount: 24000 },
  { id: 2, status: 'scheduled', amount: 18500 },
  { id: 3, status: 'approved', amount: 32000 },
];

export default function FinancePage() {
  const [budget, setBudget] = useState(null);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchBudget().then((res) => setBudget(res.data)).catch(() => setBudget(demoBudget));
    fetchPayments().then((res) => setPayments(res.data)).catch(() => setPayments(demoPayments));
  }, []);

  return (
    <div>
      <header className="page-header">
        <div>
          <h1>Finance</h1>
          <p>Watch budgets, variance, and pending payments without clutter.</p>
        </div>
      </header>
      <section className="detail-grid">
        <div className="detail-card">
          <h2>Budget Summary</h2>
          {budget ? (
            <>
              <p>Planned: {formatRupees(budget.plannedBudget)}</p>
              <p>Actual: {formatRupees(budget.actualCost)}</p>
              <p>Variance: {formatRupees(budget.variance)}</p>
            </>
          ) : (
            <p>Loading budget data...</p>
          )}
        </div>
        <div className="detail-card">
          <h2>Pending Payments</h2>
          <ul>
            {payments.map((payment) => (
              <li key={payment.id}>{payment.status} - {formatRupees(payment.amount)}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
