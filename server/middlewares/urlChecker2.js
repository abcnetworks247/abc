const checkUrl = (expectedUrl) => {

  
  let a = "/api/v1/admin/commerce/stripe/purchase/webhook";
  let b = "/api/v1/admin/donation/stripe/donate/webhook";

  return (req, res, next) => {
    const incomingUrl = req.originalUrl;

    // Check if the incoming URL matches the expected URL

    if (incomingUrl === b) {
      // If the URLs match, proceed to the next middleware or route handler

      console.log('incoming', incomingUrl);

      next();
    } 
    
    else {
      // If the URLs don't match, return a 404 Not Found response
      res.status(404).json({ error: 'Route not found' });
    }
  };
};

module.exports = { checkUrl };
