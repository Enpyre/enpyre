const constants = {
  enpyrePyURL:
    process.env.NODE_ENV === 'production'
      ? 'enpyre==0.0.1'
      : 'http://localhost:8080/enpyre-0.0.1-py3-none-any.whl',
};

export default constants;
