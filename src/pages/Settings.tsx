import {Button} from "@arco-design/web-react";

function toggleTheme(light: boolean) {
  if (light) {
    document.body.removeAttribute('arco-theme')
  } else {
    document.body.setAttribute('arco-theme', 'dark')
  }
}

export const Settings = () => {
  return (
    <div>
      <h1>Hello Settings</h1>
      <Button onClick={() => toggleTheme(true)}>亮色</Button>
      <Button onClick={() => toggleTheme(false)}>暗色</Button>
    </div>
  );
};
