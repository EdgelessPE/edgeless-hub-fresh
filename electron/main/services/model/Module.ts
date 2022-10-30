class Module {
  async run(payload): Promise<any> {

  }

  listen(listener: (event: StateMachineChangeEvent) => void) {

  }
}

interface StateMachineChangeEvent {
  type: string
  payload: any
}

export {
  Module,
  StateMachineChangeEvent
}
