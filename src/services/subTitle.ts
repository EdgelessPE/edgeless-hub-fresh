type Listener = (subTitle: string | null) => void;
const listeners: Listener[] = [];

function listenSubTitleChange(listener: Listener) {
  listeners.push(listener);
}

function updateSubTitle(subTitle: string | null) {
  listeners.forEach((listeners) => listeners(subTitle));
}

export { listenSubTitleChange, updateSubTitle };
