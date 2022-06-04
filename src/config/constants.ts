const constants = {
  enpyrePyURL:
    process.env.NODE_ENV === 'production'
      ? 'https://raw.githubusercontent.com/Enpyre/engine/main/dist/enpyre-0.0.1-py3-none-any.whl'
      : 'http://localhost:8080/enpyre-0.0.1-py3-none-any.whl',
};

export default constants;
