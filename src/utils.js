export const catchMessages = (error, setErrorMessage) => {
    if (error.response && error.response.status) {
      if (error.response.status === 500) {
        setErrorMessage("Cерверная ошибка");
      } else if (error.response.status === 404) {
        setErrorMessage("Cущность не найдена в системе");
      } else if (error.response.status === 400) {
        setErrorMessage("Неверный запрос");
      } else if (error.response.status === 200) {
        setErrorMessage("Верный запрос");
      }
    } else setErrorMessage(error.message);
  };
