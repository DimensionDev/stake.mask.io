export function convertTwitterAvatar(url: string) {
  return url.replace(/_normal.(jpe?g|png|gif|bmp)/, '_400x400.$1')
}
