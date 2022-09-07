type State =
  "Start"
  | "Downloading"
  | "Unzipping"
  | "WaitingForVentoy"
  | "WaitingForSelect"
  | "Writing"
  | "Validating"
  | "Finish"
  | "Thrown"

interface StateInfo {
  state:State,
  step:number,
  isBranch?: boolean
}

interface TabProps {
  next:(state?:State)=>void
}

export type {
  State,
  StateInfo,
  TabProps,
}
