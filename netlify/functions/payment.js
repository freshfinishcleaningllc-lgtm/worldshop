exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { amount, email, name, phone, currency, orderId } = JSON.parse(event.body);

    const response = await fetch('https://api.flutterwave.com/v3/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`
      },
      body: JSON.stringify({
        tx_ref: orderId || `WS-${Date.now()}`,
        amount: amount,
        currency: currency || 'USD',
        redirect_url: `${process.env.SITE_URL || 'https://worldshop-africa.netlify.app'}/payment-success`,
        customer: { email, name, phonenumber: phone },
        customizations: {
          title: 'WorldShop Africa',
          description: 'Payment for WorldShop order',
          logo: `${process.env.SITE_URL || 'https://worldshop-africa.netlify.app'}/icon.svg`
        },
        payment_options: 'card,mobilemoneyghana,mobilemoneyrwanda,mpesa,ussd,banktransfer'
      })
    });

    const data = await response.json();

    if (data.status === 'success') {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentLink: data.data.link, txRef: data.data.tx_ref })
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: data.message })
      };
    }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
