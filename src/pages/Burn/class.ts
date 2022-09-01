type State="Start"| "Downloading"|"Unzipping" | "WaitingForVentoy"|"WaitingForSelect" | "Writing"|"Verifying" |"Finish"|"Thrown"

interface StateInfo {
  state:State,
  step:number,
  branch?:boolean
}

interface TabProps {
  next:(state?:State)=>void
}

export type {
  State,
  StateInfo,
  TabProps,
}
