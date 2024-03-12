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


{
  "api_version": "2023-10-16",
  "created": 1709135496,
  "data": {
    "object": {
      "amount": 5500,
      "amount_captured": 5500,
      "amount_refunded": 0,
      "application": null,
      "application_fee": null,
      "application_fee_amount": null,
      "balance_transaction": "txn_3OopPvLEvvTkpvAd0Ci9fQnd",
      "billing_details": {
        "address": {
          "city": null,
          "country": "NG",
          "line1": null,
          "line2": null,
          "postal_code": null,
          "state": null
        },
        "email": "templeajuzie@gmail.com",
        "name": "test temple",
        "phone": null
      },
      "calculated_statement_descriptor": "ABCAMBATV.COM",
      "captured": true,
      "created": 1709135496,
      "currency": "usd",
      "customer": "cus_Pe7fHAMy9ckEAO",
      "description": "Subscription creation",
      "destination": null,
      "dispute": null,
      "disputed": false,
      "failure_balance_transaction": null,
      "failure_code": null,
      "failure_message": null,
      "fraud_details": {},
      "invoice": "in_1OopPvLEvvTkpvAdT7be0eDg",
      "livemode": false,
      "metadata": {},
      "on_behalf_of": null,
      "order": null,
      "outcome": {
        "network_status": "approved_by_network",
        "reason": null,
        "risk_level": "normal",
        "risk_score": 40,
        "seller_message": "Payment complete.",
        "type": "authorized"
      },
      "paid": true,
      "payment_intent": "pi_3OopPvLEvvTkpvAd02luRtMu",
      "payment_method": "pm_1OopPtLEvvTkpvAdPmnY14go",
      "payment_method_details": {
        "card": {
          "amount_authorized": 5500,
          "brand": "visa",
          "checks": {
            "address_line1_check": null,
            "address_postal_code_check": null,
            "cvc_check": "pass"
          },
          "country": "US",
          "exp_month": 4,
          "exp_year": 2056,
          "extended_authorization": {
            "status": "disabled"
          },
          "fingerprint": "yrOkd7dpEUkk8uJT",
          "funding": "credit",
          "incremental_authorization": {
            "status": "unavailable"
          },
          "installments": null,
          "last4": "4242",
          "mandate": null,
          "multicapture": {
            "status": "unavailable"
          },
          "network": "visa",
          "network_token": {
            "used": false
          },
          "overcapture": {
            "maximum_amount_capturable": 5500,
            "status": "unavailable"
          },
          "three_d_secure": null,
          "wallet": null
        },
        "type": "card"
      },
      "radar_options": {},
      "receipt_email": null,
      "receipt_number": null,
      "receipt_url": "https://pay.stripe.com/receipts/invoices/CAcaFwoVYWNjdF8xT1NrQUFMRXZ2VGtwdkFkKImt_a4GMgY0KWgPZWA6LBYDLPCD0nNHKXcZKglpF9uzlObNvzk51UsfImJBUtDntxDxKWrwNpmZmQPc?s=ap",
      "refunded": false,
      "review": null,
      "shipping": null,
      "source": null,
      "source_transfer": null,
      "statement_descriptor": null,
      "statement_descriptor_suffix": null,
      "status": "succeeded",
      "transfer_data": null,
      "transfer_group": null
    }
  },
  "id": "evt_3OopPvLEvvTkpvAd0irtMjWo",
  "livemode": false,
  "object": "event",
  "pending_webhooks": 2,
  "request": {
    "id": "req_pclMuBQLdERS8m",
    "idempotency_key": "90dae574-b36d-4a7c-a22a-3a97839c0ccb"
  },
  "type": "charge.succeeded"
}
