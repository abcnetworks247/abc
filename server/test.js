const data = {
  email: olduser.email,
  name: olduser.fullname,
  stripe_customer_id: customer.id,
  amount: checkoutSessionCompleted.amount_total / 100,
  currency: checkoutSessionCompleted.currency,
  payment_status: checkoutSessionCompleted.payment_status,
  payment_method_types: checkoutSessionCompleted.payment_method_types[0],
  transaction_Id: checkoutSessionCompleted.id,
  subscription_id: "sub_1OlqyNLEvvTkpvAd6zQxkEgL",
  subscription_billing_cycle_anchor: 1708426491,
  subscription_currency: "usd",
  subscription_current_period_end: 1710932091,
  subscription_current_period_start: 1708426491,
  subscription_customer: "cus_Pb34IHKOqPE5zn",
  subscription_default_payment_method: "pm_1OlqyMLEvvTkpvAd3BtblQ1b",
  subscription_plan_id: "price_1Olqx6LEvvTkpvAdAj1IDVyN",
  subscription_plan_amount: 5500 / 100,
  subscription_plan_currency: "usd",
  subscription_plan_interval: "month",
  subscription_plan_interval_count: 1,
  subscription_quantity: 1,
  subscription_start_date: 1708426491,
  subscription_status: "active",
  subscription_items: checkoutSessionCompleted.items.data,
};





// "card": {
//       "amount_authorized": 100,
//       "brand": "visa",
//       "checks": {
//         "address_line1_check": null,
//         "address_postal_code_check": null,
//         "cvc_check": "pass"
//       },
//       "country": "US",
//       "exp_month": 2,
//       "exp_year": 2026,
//       "extended_authorization": {
//         "status": "disabled"
//       },
//       "fingerprint": "yrOkd7dpEUkk8uJT",
//       "funding": "credit",
//       "incremental_authorization": {
//         "status": "unavailable"
//       },
//       "installments": null,
//       "last4": "4242",
//       "mandate": null,
//       "multicapture": {
//         "status": "unavailable"
//       },
//       "network": "visa",
//       "network_token": {
//         "used": false
//       },
//       "overcapture": {
//         "maximum_amount_capturable": 100,
//         "status": "unavailable"
//       },
//       "three_d_secure": null,
//       "wallet": null
//     },
//     "type": "card"
//   },