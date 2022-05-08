
// TODO: Add user links
import {timeFormatWithTimeZone} from "./helpers";

export const getLongMessage = (notification) => {
  const subject = getSubject(notification.notification_type);
  var message = constructLongMessage(notification);
  return {subject:subject,message:message}
}

export const getShortMessage = (notification) => {
  const subject = getSubject(notification.notification_type);
  let message = titleCase(getMessagePreview(notification.notification_type));

  return {subject:subject,message:message}
}

export const titleCase = (str) => {
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

const getSubject = (notification_type) => {
  if (notification_type === 'bid_accepted'){
    return 'BID ACCEPTED'
  } else if (notification_type === 'bid_rejected'){
    return 'BID REJECTED'
  } else if (notification_type === 'post_accepted_bid'){
    return 'POST CLOSED'
  } else {
    return 'JUST FYI'
  }
}

const getMessagePreview = (notification_type) => {
  if (notification_type === 'bid_accepted'){
    return 'YOUR BID HAS BEEN ACCEPTED'
  } else if (notification_type === 'bid_rejected'){
    return 'YOUR BID HAS BEEN  REJECTED'
  } else if (notification_type === 'post_accepted_bid'){
    return 'BID ACCEPTED AND YOUR POST IS NOW CLOSED'
  } else {
    return 'JUST FYI'
  }
}

const constructLongMessage = (notification) => {
  let formatted_time = timeFormatWithTimeZone(notification.data.time)
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
