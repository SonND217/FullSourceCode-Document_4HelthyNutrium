const AlertDiv = ({ info }) => {
  return info === null ? null : (
    <div style={{ color: "red" }}>{info.message}</div>
  );
};

export default AlertDiv;
