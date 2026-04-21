function Sidebar() {
  return (
    <div style={sidebar}>
      <h2 style={{ color: "#c9a227" }}>💰 The Vault</h2>

      <div style={menu}>
        <p>Dashboard</p>
        <p>Assets</p>
        <p>Analytics</p>
        <p>Vault</p>
      </div>

      <button style={btn}>+ Add Asset</button>
    </div>
  );
}

const sidebar = {
  width: "220px",
  background: "#111",
  color: "#fff",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const menu = {
  marginTop: "40px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const btn = {
  background: "#c9a227",
  border: "none",
  padding: "10px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Sidebar;