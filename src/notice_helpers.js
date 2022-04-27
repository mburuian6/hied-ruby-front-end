
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

const titleCase = (str) => {
  let upper = true;
  let newStr = "";
  for (let i = 0, l = str.length; i < l; i++) {
    if (str[i] == " ") {
      upper = true;
      newStr += " ";
      continue;
    }
    newStr += upper ? str[i].toUpperCase() : str[i].toLowerCase();
    upper = false;
  }
  return newStr;
}

const getSubject = (type) => {
  if (type === 'bid_accepted'){
    return 'BID ACCEPTED'
  } else if (type === 'bid_rejected'){
    return 'BID REJECTED'
  } else if (type === 'post_accepted_bid'){
    return 'POST - BID ACCEPTED'
  } else {
    return 'JUST FYI'
  }
}
