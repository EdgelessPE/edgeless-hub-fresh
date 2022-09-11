import {TabProps} from "@/components/organisms/StateMachineTabs/class";
import {KernelLocal, KernelOnline, VentoyLocal, VentoyOnline} from "@/classes";

type State = "Checking"
  | "Empty"
  | "Latest"
  | "Start"
  | "Downloading"
  | "Unzipping"
  | "WaitingForVentoy"
  | "WaitingForSelect"
  | "Writing"
  | "Validating"
  | "Finish"
  | "Thrown"

type UpdateTabProps = TabProps<State>

interface UpdateKernel {
  local: KernelLocal,
  online?: KernelOnline
}

interface UpdateVentoy {
  local: VentoyLocal,
  online?: VentoyOnline
}

export {
  State,
  UpdateTabProps,
  UpdateKernel,
  UpdateVentoy
}
