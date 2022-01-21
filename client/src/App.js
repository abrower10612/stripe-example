import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './components/CheckoutForm';

const stripePromise = loadStripe('pk_test_51KJiBBFsgJ0zVjSxHrP6Ac9LoaQ3bqble5Z8dhnXnzDb10Z7PtxoFsOJPtuuhTKZqOyWTsC9RGk1yvAONkigCrPx00K3YOL2HZ');

function App() {

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default App;
