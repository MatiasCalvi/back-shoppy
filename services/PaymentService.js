const axios = require("axios");

class PaymentService {
  async createPayment(req,res) {

    /* console.log(res) */

    const url = "https://api.mercadopago.com/checkout/preferences";

     /* const body = {
     
      items: [
        {
          title: "Dummy Title",
          description: "Dummy description",
          picture_url: "http://www.myapp.com/myimage.jpg",
          category_id: "category123",
          quantity: 1,
          unit_price: 10
        }
      ],
      back_urls: {
        failure: "/failure",
        pending: "/pending",
        success: "/success"
      }
    }; */

    const payment = await axios.post(url, req.body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return payment.data;
  }

}

module.exports = PaymentService;