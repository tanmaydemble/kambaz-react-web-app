import { useState } from "react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { FaTrash } from "react-icons/fa6";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";

export default function AssignmentControlButtons({
    assignmentId,
    onDelete,
}: {
    assignmentId: string;
    onDelete: (id: string) => void;
}) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent parent click handler
        setShowDeleteDialog(true);
    };
    return (
        <>
            <div className="float-end">
                <FaTrash
                    className="text-danger me-2 mb-1"
                    onClick={handleDeleteClick}
                    style={{ cursor: "pointer" }}
                />
                <GreenCheckmark />
                <IoEllipsisVertical className="fs-4" />
            </div>

            <DeleteConfirmationDialog
                show={showDeleteDialog}
                onConfirm={() => {
                    onDelete(assignmentId);
                    setShowDeleteDialog(false);
                }}
                onCancel={() => setShowDeleteDialog(false)}
            />
        </>
    );
}
