import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Grant prompt credits
    localStorage.setItem('promptCount', 0);
    localStorage.setItem('promptCredits', 20);

    // Redirect after 4 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 4000);

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', padding: '60px', color: 'white', fontSize: '1.5rem' }}>
      <h2>Thank you for your purchase!</h2>
      <p>You now have 20 new AI prompt credits.</p>
      <p style={{ fontSize: '1rem', marginTop: '20px' }}>
        Redirecting back to the generator...
      </p>
    </div>
  );
}

export default PaymentSuccess;