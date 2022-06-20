const constants = {
  enpyrePyURL:
    process.env.NODE_ENV === 'production'
      ? 'enpyre==0.0.4'
      : 'http://localhost:8080/enpyre-0.0.4-py3-none-any.whl',
};

export default constants;
