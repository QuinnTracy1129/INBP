module.exports = ({}) =>
  async function (form) {
    const { name } = form;

    if (typeof name === "string" && !name) {
      throw new Error("Name is required!");
    }

    return form;
  };
