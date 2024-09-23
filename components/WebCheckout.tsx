import React, { useEffect, useState } from "react";

interface WebCheckoutProps {
  amount: number;
  description: string;
  buyerEmail: string;
}

const WebCheckout: React.FC<WebCheckoutProps> = ({
  amount,
  description,
  buyerEmail,
}) => {
  const [signature, setSignature] = useState<string | null>(null);
  const [formReady, setFormReady] = useState(false);

  // Merchant and account IDs from the environment variables
  const merchantId = process.env.NEXT_PUBLIC_PAYU_MERCHANT_ID;
  const accountId = process.env.NEXT_PUBLIC_PAYU_ACCOUNT_ID;

  // Fixed values for the test
  const referenceCode = "TestPayU"; // This should ideally be unique for every transaction
  const currency = "COP";
  const tax = Math.round(amount * 0.19); // Calculate 19% tax
  const taxReturnBase = amount - tax;
  const responseUrl = "http://www.test.com/response"; // Customize for your site
  const confirmationUrl = "http://www.test.com/confirmation"; // Customize for your site
  const shippingAddress = "calle 93 n 47 - 65";
  const shippingCity = "Bogotá";
  const shippingCountry = "CO";

  // Signature generation
  useEffect(() => {
    const generateSignature = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_PAYU_API_KEY; // From .env file
        console.log(apiKey)
        console.log(merchantId)
        console.log(referenceCode)
        console.log(amount)
        console.log(currency)
        if (!apiKey || !merchantId || !referenceCode || !amount || !currency) {
          throw new Error("Missing required fields for signature generation.");
        }

        // Create the signature string according to PayU format
        const signatureString = `${apiKey}~${merchantId}~${referenceCode}~${amount}~${currency}`;
        const signatureHash = await cryptoSignature(signatureString); // Custom function to create hash
        console.log(signatureHash)
        setSignature(signatureHash);
        setFormReady(true);
      } catch (error) {
        console.error("Error generating signature:", error);
      }
    };

    generateSignature();
  }, [amount, merchantId, referenceCode, currency]);

  // Utility function to create MD5 signature (or any hash algorithm)
  const cryptoSignature = async (signatureString: string): Promise<string> => {
    const md5 = (await import("crypto-js/md5")).default; // Access the default property of the imported module
    return md5(signatureString).toString();
  };

  if (!formReady) {
    return <p>Loading payment information...</p>;
  }

  return (
    <form
      method="post"
      action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/"
    >
      <input name="merchantId" type="hidden" value={merchantId || ""} />
      <input name="accountId" type="hidden" value={accountId || ""} />
      <input name="description" type="hidden" value={description} />
      <input name="referenceCode" type="hidden" value={referenceCode} />
      <input name="amount" type="hidden" value={amount.toString()} />
      <input name="tax" type="hidden" value={tax.toString()} />
      <input
        name="taxReturnBase"
        type="hidden"
        value={taxReturnBase.toString()}
      />
      <input name="currency" type="hidden" value={currency} />
      <input name="signature" type="hidden" value={signature || ""} />
      <input name="test" type="hidden" value="1" />{" "}
      {/* Set to 1 for sandbox mode */}
      <input name="buyerEmail" type="hidden" value={buyerEmail} />
      <input name="responseUrl" type="hidden" value={responseUrl} />
      <input name="confirmationUrl" type="hidden" value={confirmationUrl} />
      {/* Shipping information */}
      <input name="shippingAddress" type="hidden" value={shippingAddress} />
      <input name="shippingCity" type="hidden" value={shippingCity} />
      <input name="shippingCountry" type="hidden" value={shippingCountry} />
      <button type="submit">Pay Now</button>
    </form>
  );
};

export default WebCheckout;
