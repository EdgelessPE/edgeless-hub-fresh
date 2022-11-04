import {Observable} from "rxjs";
import {Result} from "ts-results";

abstract class Sequence {
  protected seq: SeqNode[];

  protected constructor(seq: SeqNode[]) {
    this.seq = seq;
  }

  abstract command(cmd: string, payload: any): Promise<Result<any, string>>;

  abstract getAllowedCommandsObservable(): Observable<string[]>;

  abstract getCurrentObservable(): Observable<Current>;
}

interface SeqNode {
  name: string;
  inputAdapter: (userInput: any, prevReturned: any) => any;
  moduleConstructor: any;
}

interface Current {
  name: string;
  state: State;
}

interface State {
  type: string;
  payload: any;
}
