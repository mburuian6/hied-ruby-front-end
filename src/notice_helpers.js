
// TODO: Add user links

export const getLongMessage = (notification) => {
  const subject = getSubject(notification.notification_type);
  var message = constructLongMessage(notification);
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

const constructLongMessage = (notification) => {
  let formatted_time = timeFormat(notification.data.time)
  if(notification.notification_type === 'bid_accepted'){
    return `Dear ${notification.username}, your bid for post ${notification.data.post} 
      (${notification.data.post_link}) has been accepted at ${formatted_time}. Please contact the 
      user[USER-LINK] for more details`
  } else if(notification.notification_type === 'bid_rejected'){
    return `Dear ${notification.username}, your bid for post ${notification.data.post} 
      (${notification.data.post_link}) has been rejected at ${formatted_time}. Good luck next time!`
  } else if(notification.notification_type === 'post_accepted_bid'){
    return `Dear ${notification.username}, you have accepted the bid ${notification.data.bid}: 
      Kes ${notification.data.bid_pay} for post ${notification.data.post}(${notification.data.post_link}) from 
      ${notification.data.bid_user}[USER-LINK] at ${formatted_time}. 
      Please contact the user for more details`
  }
  return `Dear ${notification.username} please note this message.`
}
