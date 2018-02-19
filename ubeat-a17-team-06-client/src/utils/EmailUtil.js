const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

export function isEmail (email) {
  return EMAIL_REGEX.test(email)
}
