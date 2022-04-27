
// TODO: Add user links
export const getLongMessage = (notification) => {
  const subject = getSubject(notification.type);
  let message = '';
  if (notification.type === 'bid_accepted'){
    message = `Dear ${notification.username}, your bid for post ${notification.data.post} ` /
      `(${notification.data.post_link}) has been accepted at ${notification.data.time}. Please contact the ` /
      `user[USER-LINK] for more details`
  } else if (notification.type === 'bid_rejected'){
    message = `Dear ${notification.username}, your bid for post ${notification.data.post} ` /
      `(${notification.data.post_link}) has been rejected at ${notification.data.time}. Good luck next time!`
  } else if (notification.type === 'post_accepted_bid'){
    message = `Dear ${notification.username}, you have accepted the bid ${notification.data.bid}: ` /
      `Kes ${notification.data.bid_pay} for post ${notification.data.post}(${notification.data.post_link}) from ` /
      `${notification.data.bid_user}[USER-LINK] at ${notification.data.time}. Please contact the user for more details`
  } else {
    message = `Dear ${notification.username} please note this message.`
  }

  return {subject:subject,message:message}
}


export const getShortMessage = (notification) => {
  const subject = getSubject(notification.type);
  let message = titleCase(getSubject(notification.type));

  return {subject:subject,message:message}
}

