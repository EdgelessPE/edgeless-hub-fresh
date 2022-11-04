import {TabProps} from "@/components/organisms/StateMachineTabs/type";

type State =
  | "Start"
  | "Downloading"
  | "Unzipping"
  | "WaitingForVentoy"
  | "WaitingForSelect"
  | "Writing"
  | "Validating"
  | "Finish"
  | "Thrown";

interface StateInfo {
  state: State;
  step: number;
  isBranch?: boolean;
}

type BurnTabProps = TabProps<State>;

export type { State, StateInfo, BurnTabProps };
