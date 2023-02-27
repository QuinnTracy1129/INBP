module.exports = ({}) =>
  async function (form, oldEnd) {
    const { name, start, end, isCompleted, isEarly } = form;

    if (isCompleted) {
      throw new Error("Cannot submit completion here!");
    }

    if (isEarly) {
      throw new Error("Cannot update status here!");
    }

    const startTime = new Date(start).getTime(),
      endTime = new Date(end).getTime(),
      oldEndTime = new Date(oldEnd).getTime();

    if (name) {
      if (typeof name !== "string") {
        throw new Error("Invalid data type for Name!");
      }
    }

    if (end) {
      if (typeof end === "string") {
        if (isNaN(endTime)) {
          throw new Error("Invalid date for End!");
        }
      } else {
        throw new Error("Invalid data type for End!");
      }
    }

    if (start) {
      if (typeof start === "string") {
        if (isNaN(startTime)) {
          throw new Error("Invalid date for Start!");
        }

        const validEnd = end ? endTime : oldEndTime;

        if (startTime >= validEnd) {
          throw new Error("Invalid End and Start declaration!");
        }
      } else {
        throw new Error("Invalid data type for Start!");
      }
    }

    return {
      name,
      start,
      end,
    };
  };
