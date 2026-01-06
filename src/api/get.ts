import http from './http'

const url = import.meta.env.VITE_PROXY_PREFIX

export const getSideBarList = async () => {
  const res = await http.get(url, {
    params: { ac: 'list' },
  })
  return res.data
}

export const getKeyWordsList = async (wd: string) => {
  const res = await http.get(url, {
    params: { ac: 'detail', wd },
  })
  return res.data
}

export const getCategoryList = async (t: string) => {
  const res = await http.get(url, {
    params: { ac: 'detail', t },
  })
  return res.data
}

export const getDetail = async () => {
  const res = await http.get(url, {
    params: { ac: 'detail' },
  })
  return res.data
}

export const getVideoDetail = async (ids: string) => {
  const res = await http.get(url, {
    params: { ac: 'detail', ids },
  })
  return res.data
}
