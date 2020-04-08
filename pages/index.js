import { useState } from 'react';
import Router from 'next/router';

import Layout from '../components/Layout';
import Row from '../components/prebuilt/Row';
import DonutShop from '../components/prebuilt/DonutShop';
import CheckoutForm from '../components/CheckoutForm';
import getDonutPrice from '../utils/get-donut-price';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_live_GOnijvObQhecIgHHLctsreUO004HQ72wSx');

const MainPage = (props) => {
  const [numDonuts, setNumDonuts] = useState(1);

  const addDonut = () => setNumDonuts((num) => Math.min(12, num + 1));
  const remDonut = () => setNumDonuts((num) => Math.max(1, num - 1));

  return (
    <Layout title='Donut Shop'>
      <Row>
        <DonutShop
          onAddDonut={addDonut}
          onRemoveDonut={remDonut}
          numDonuts={numDonuts}
        />
      </Row>
      <CheckoutForm
        price={getDonutPrice(numDonuts)}
        onSuccessfulCheckout={() => Router.push('/success')}
      />
    </Layout>
  );
};

export default MainPage;
