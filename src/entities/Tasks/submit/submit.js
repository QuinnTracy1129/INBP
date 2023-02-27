module.exports = ({}) =>
  async function (form) {
    const { end } = form;

    let isEarly = false;

    const today = new Date(),
      todayTime = today.getTime(),
      endTime = new Date(end).getTime();

    if (todayTime < endTime) {
      isEarly = true;
    }

    return {
      isEarly,
      submittedAt: today.toLocaleString(),
      isCompleted: true,
    };
  };
