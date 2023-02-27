module.exports = ({}) =>
  async function (form) {
    const { end } = form;

    let isEarly = false;

    const todayTime = new Date().getTime(),
      endTime = new Date(end).getTime();

    if (todayTime < endTime) {
      isEarly = true;
    }

    return {
      isEarly,
      isCompleted: true,
    };
  };
