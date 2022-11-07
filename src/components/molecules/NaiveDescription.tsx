import React, { useEffect, useState } from "react";

interface Prop {
  kvMap: Record<string, string | React.ReactNode>;
  keyWidth: string;
  rowHeight: string;
  addColon?: boolean;
  style?: React.CSSProperties;
}

export const NaiveDescription = ({
  kvMap,
  keyWidth,
  rowHeight,
  addColon,
  style,
}: Prop) => {
  const [reactiveItems, setReactiveItems] = useState<React.ReactNode[]>([]);
  useEffect(() => {
    const elements: React.ReactNode[] = [];
    let tdCount = 0;
    for (const key in kvMap) {
      const content = kvMap[key];
      elements.push(
        <tr key={key}>
          <td width={keyWidth} height={rowHeight} key={key}>
            {key}
            {addColon && "："}
          </td>
          <td key={tdCount++}>{content}</td>
        </tr>
      );
    }
    setReactiveItems(elements);
  }, [kvMap]);
  return (
    <table style={style}>
      <tbody>{reactiveItems}</tbody>
    </table>
  );
};
