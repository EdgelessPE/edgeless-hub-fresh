export default {
  "*.{ts,tsx}": ["eslint --fix",()=>"tsc --noEmit --jsx react-jsx"]
}
