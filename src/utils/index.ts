export function renderId(id: string) {
  if (!id) return ''
  if (id.length === 1) return `00${id}`
  if (id.length === 2) return `0${id}`
  return id
}

export function renderAbilityName(name: string) {
  if (!name) return ''
  const sanitized = name.toString().replace(/-/g, ' ')
  const arr = sanitized.split(' ')
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }
  return arr.join(' ')
}

export function renderStatName(name: string) {
  if (!name) return ''
  const splittedName = name.toString().split('-')
  if (splittedName.length > 1)
    return `${splittedName[0].charAt(0)}${splittedName[1].slice(0, 3)}`
  return name.toString().slice(0, 3)
}
