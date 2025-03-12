export default function DeleteConfirmationDialog({
    show,
    onConfirm,
    onCancel,
}: {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}) {
    return (
        <div
            id="wd-delete-confirmation-dialog"
            className={`modal fade ${show ? 'show' : ''}`}
            style={{ display: show ? 'block' : 'none' }}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            Delete Assignment
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onCancel}
                        ></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete this assignment? This action cannot be undone.
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={onConfirm}
                        >
                            Confirm Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
