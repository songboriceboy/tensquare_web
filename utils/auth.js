import Cookies from 'js-cookie'

const TokenKey = 'User-Token'
const NameKey = 'User-Name'
const AvatarKey = 'User-Avatar'

export function setUser(token, name, avater) {
  Cookies.set(NameKey, name)
  Cookies.set(AvatarKey, avater)
  Cookies.set(TokenKey, token)
}

export function getUser() {
  return {
    token: Cookies.get(TokenKey),
    name: Cookies.get(NameKey),
    avater: Cookies.get(AvatarKey)
  }
}
