import moment from 'moment'

export function formatDate(date) {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

export function getDateDiff(dateTimeStamp) {
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const halfamonth = day * 15;
  const month = day * 30;
  const now = new Date().getTime();
  const diffValue = now - dateTimeStamp;
  const monthC = diffValue / month;
  const weekC = diffValue / (7 * day);
  const dayC = diffValue / day;
  const hourC = diffValue / hour;
  const minC = diffValue / minute;
  let result=null
  if (monthC >= 1) {
    result = dateTimeStamp
  }
  else if (weekC >= 1) {
    result = parseInt(weekC) + "周前";
  }
  else if (dayC >= 1) {
    result = parseInt(dayC) + "天前";
  }
  else if (hourC >= 1) {
    result = parseInt(hourC) + "个小时前";
  }
  else if (minC >= 1) {
    result = parseInt(minC) + "分钟前";
  } else {
    result = "刚刚发表";
  }
  return result;
}
