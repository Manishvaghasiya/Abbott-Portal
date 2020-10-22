export const TEXT_VALIDATION_PATTERN = /^[A-Za-z0-9](?!.*?[^\na-z0-9\sA-Z &(){}_\-:".<>?\/,';\]\[=`~$]).*?[A-Za-z0-9]$/;
export const USERNAME_VALIDATION_PATTERN = /^(?=.{1,20}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$/;
// export const NUMBER_VALIDATION_PATTERN = /[0-9]\d*|0\d+/;
// tslint:disable-next-line: max-line-length
export const EMAIL_VALIDATION_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const VERSION_VALIDATION_PATTERN = /^\d{0,2}\.\d{0,2}\.\d{0,2}$/;
// tslint:disable-next-line: max-line-length
export const IP_VALIDATION_PATTERN = /^(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))$/;
export const MAX_VALIDATION_PATTERN = /^.{0,50}$/;
export const MINUTE_VALIDATION_PATTERN = /^0*([1-9]|[1-5][0-9]|59)$/;
export const HOURLY_VALIDATION_PATTERN = /^0*([1-9]|1[0-9]|2[0-3])$/;
export const WEEKLY_VALIDATION_PATTERN = /^0*([1-9]|[1-4][0-9]|5[01])$/;
export const MONTHLY_VALIDATION_PATTERN = /^0*([1-9]|[12][0-9]|3[01])$/;
export const PASSWORD_VALIDATION_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
// tslint:disable-next-line: max-line-length
export const URL_VALIDATION_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
