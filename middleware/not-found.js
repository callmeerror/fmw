const notFoundMiddleWare = (req, res) => {
  res.status(404).json({ msg: 'うるさい！' });
};

export default notFoundMiddleWare;
