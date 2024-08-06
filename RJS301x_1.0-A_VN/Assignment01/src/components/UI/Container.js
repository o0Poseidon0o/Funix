import "./Container.css";

// Component căn chỉnh width và căn giữa
const Container = (props) => {
  const classes = "container " + props.className;
  return <div className={classes}>{props.children}</div>;
};
export default Container;
