module.exports = ({}) =>
  async function (form) {
    const { name, start, end } = form;

    const startTime = new Date(start).getTime(),
      endTime = new Date(end).getTime();

    if (typeof name !== "string") {
      throw new Error("Invalid data type for Name!");
    }

    if (typeof end === "string") {
      if (isNaN(endTime)) {
        throw new Error("Invalid date for End!");
      }
    } else {
      throw new Error("Invalid data type for End!");
    }

    if (typeof start === "string") {
      if (isNaN(startTime)) {
        throw new Error("Invalid date for Start!");
      }

      if (startTime >= endTime) {
        throw new Error("Invalid End and Start declaration!");
      }
    } else {
      throw new Error("Invalid data type for Start!");
    }

    return form;
  };
