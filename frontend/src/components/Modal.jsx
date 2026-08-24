import React from "react";

/**
 * Usage:
 * <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Confirm">
 *   <p>Are you sure?</p>
 * </Modal>
 */
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.box} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h3>{title}</h3>
          <button style={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  box: {
    background: "#fff",
    borderRadius: 10,
    padding: 20,
    minWidth: 320,
    maxWidth: "90%",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  closeBtn: { background: "transparent", color: "#333", fontSize: 16 },
};

export default Modal;
