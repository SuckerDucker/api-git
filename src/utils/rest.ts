/* eslint-disable @typescript-eslint/no-explicit-any */
const getParams = (params: any) => {
  const {
    matricula = 0,
    email = '',
    careerId = 0,
    period = 0,
    status = 0,
    showMore = 0,
    surveyId = 0,
    ...rest
  } = params;

  const filter = {
    matricula: parseInt(matricula).toString().length === 9 ? matricula : 0,
    careerId: parseInt(careerId),
    email: email.toLowerCase(),
    showMore: parseInt(showMore) === 1,
    period: parseInt(period),
    status: parseInt(status),
    surveyId: parseInt(surveyId),
  };

  return { ...filter, ...rest };
};

export default getParams;
