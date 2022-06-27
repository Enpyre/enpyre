const constants = {
  enpyrePyURL:
    process.env.NODE_ENV === 'production'
      ? 'enpyre==0.0.5'
      : 'http://localhost:8080/enpyre-0.0.5-py3-none-any.whl',
};

export default constants;
