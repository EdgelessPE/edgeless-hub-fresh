function getRouterPath(): string[] {
  const { hash } = window.location;
  let pureHash = decodeURI(hash.slice(2));
  if (pureHash == "") pureHash = "home";
  return pureHash.split("/");
}

export { getRouterPath };
