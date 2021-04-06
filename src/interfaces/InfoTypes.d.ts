/* eslint-disable camelcase */
export interface InfoTypes {
  nie_copy?: string
  census_copy?: string
  generic?: string
}

export interface FileTypes {
  ngo_pass?: string,
  passaport?: string
}

export interface VictimInfo {
  nie_copy: JSX.Element
  census_copy: JSX.Element
  generic: JSX.Element
}
