export const mount = (componentRef: React.MutableRefObject<boolean>) => {
  componentRef.current = true
}

export const dismount = (componentRef: React.MutableRefObject<boolean>) => {
  componentRef.current = false
}

export const isMount = (componentRef: React.MutableRefObject<boolean>) => {
  return componentRef.current
}