import React, { useState } from "react";
import Table from "../components/Table.jsx";
import Modal from "../components/Modal.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const dummyData = [
  { _id: 1, name: "Item One", status: "Active" },
  { _id: 2, name: "Item Two", status: "Pending" },
];

const Home = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="container">
      <h2>Welcome{user ? `, ${user.name}` : ""}</h2>
      <p>Replace this with your actual hackathon feature. This page just demos Table + Modal wiring.</p>

      <div style={{ marginTop: 20 }}>
        <Table
          columns={[
            { key: "name", label: "Name" },
            { key: "status", label: "Status" },
          ]}
          data={dummyData}
          onRowClick={(row) => {
            setSelected(row);
            setShowModal(true);
          }}
        />
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Details">
        {selected && (
          <div>
            <p>Name: {selected.name}</p>
            <p>Status: {selected.status}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Home;
