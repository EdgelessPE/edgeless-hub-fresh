import { TabProps } from "@/components/organisms/StateMachineTabs/class";
import { KernelLocal, KernelOnline } from "@/classes";

type State =
  | "Input"
  | "Empty"
  | "Latest"
  | "Start"
  | "Downloading"
  | "Unzipping"
  | "Writing"
  | "Validating"
  | "Finish"
  | "Thrown";

type AlphaTabProps = TabProps<State>;

interface UpdateAlpha {
  local: KernelLocal;
  online: KernelOnline;
}

export { State, AlphaTabProps, UpdateAlpha };
