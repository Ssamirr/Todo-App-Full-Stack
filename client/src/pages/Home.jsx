import { Modal } from '@mui/material';
import React, { useState } from 'react'
import { BASE_URL, network } from '../network/axiosInstance';
import { useQuery } from "react-query";
import Loading from '../components/Loading';
import { toast } from 'react-toastify';



function Home() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [values, setValues] = useState({ text: "" });
    const [forModal, setForModal] = useState("");

    const { data, isLoading, refetch } = useQuery(
        "todos",
        async () => {
            return network.getAll(BASE_URL)
                .then(res => {
                    return res
                })
        },
    );

    const deleteItem = (id) => {
        network.deleteItem(BASE_URL, id)
            .then(() => refetch())
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const submitForm = (event, id) => {
        event.preventDefault();
        const { text } = values;
        if (text.trim().length === 0) {
            toast.warn("Please fill in all the inputs")
        } else {
            if (forModal === "Add") {
                network.addItem(BASE_URL, values)
                    .then(() => refetch())
            } else {
                network.updateItem(BASE_URL, id, values)
                    .then(() => refetch())
            }

            setValues({ text: "" })
            toast.success("Todo is ready")
            handleClose();
        }

    }

    const completeItem = (id,value) => {
        network.updateItem(BASE_URL, id, { isCompleted: value })
            .then(() => refetch())
    }


    return (
        <>
            {isLoading ?
                <Loading />
                :

                data ? (
                    <>
                        <div className='header-page'>
                            <h1 className='all-data-list'>ToDos</h1>
                            <button className='add-item' onClick={() => {
                                handleOpen()
                                setForModal("Add")
                                setValues({ text: "" })
                            }}>
                                Add Product
                            </button>
                        </div>

                        <table className="w3-table-all w3-centered">
                            <tbody>
                                {React.Children.toArray(
                                    data.map((item, index) => (
                                        <>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.text}</td>
                                                <td>{item.date}</td>
                                                <td>{item.isCompleted ? "Completed" : "Not Completed"}</td>

                                                <td>
                                                    <button
                                                        onClick={() =>
                                                            completeItem(item._id, item.isCompleted ? false : true)}>
                                                        {item.isCompleted ? "Incomplete" : "Complete"}
                                                    </button>
                                                </td>
                                                <td>
                                                    <button onClick={() => {
                                                        handleOpen();
                                                        setForModal("Update");
                                                        setValues({ text: item.text, _id: item._id })
                                                    }}>
                                                        Change
                                                    </button>
                                                </td>
                                                <td>
                                                    <button onClick={() => deleteItem(item._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))
                                )}

                            </tbody>
                        </table>
                    </>
                ) :
                    <h1 className='not-list'>Todo list is empty</h1>
            }

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='box-modal'>
                    <form onSubmit={(event) => submitForm(event, values._id)}>
                        <input name="text" required value={values.text} onChange={(e) => handleChange(e)} placeholder="Name" />
                        <button> {forModal === "Add" ? "Add" : "Update"}</button>
                    </form>
                </div>
            </Modal>

        </>
    )
}

export default Home