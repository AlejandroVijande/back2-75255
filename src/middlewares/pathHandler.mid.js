const pathHandler = (req, res, next) => {
  const error = "Not found URL";
  const { method, originalUrl: url } = req;
  res.status(404).json({ error, method, url });
};

<<<<<<< HEAD
export default pathHandler;
=======
export default pathHandler;
>>>>>>> 31a5cfb70adc53089247ebaa7d4b467850382e34
