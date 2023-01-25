import styles from "./Table.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";

const Table = ({ id, title, to, value, onError }) => {
  const [modalVisible, setmodalVisible] = useState(false);

  const handleModalConfirmFn = async () => {
    try {
      const response = await fetch(
        `https://api-thoughts.onrender.com/thoughts/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      window.location.reload()
    } catch (err) {
      onError(err.message);
    } finally {
      setmodalVisible(false);
    }
  };

  return (
    <div className={styles.table_container}>
      <div className={styles.table}>
        <p className={styles.idTable}>ID: {id}</p>
        <h3 className={styles.titleTable} name="title">
          {title}
        </h3>
        <button className={styles.deleteTable}>
          <Link className={styles.editTable} to={to}>
            Edit
          </Link>
        </button>
        <button
          className={styles.deleteTable}
          onClick={() => setmodalVisible(true)}
        >
          {value}
        </button>
      </div>
      {modalVisible && (
        <Modal
          id={id}
          message={'Are you sure you want to delete?'}
          onClose={() => setmodalVisible(false)}
          value="Delete"
          onSubmit={handleModalConfirmFn}
        />
      )}
    </div>
  );
};

export default Table;
