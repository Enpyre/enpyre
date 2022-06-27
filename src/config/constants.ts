const constants = {
  enpyrePyURL:
    process.env.NODE_ENV === 'production'
      ? 'enpyre==0.0.6'
      : 'http://localhost:8080/enpyre-0.0.6-py3-none-any.whl',
};

export default constants;
