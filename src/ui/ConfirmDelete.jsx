/* eslint-disable react/prop-types */
import Button from "./Button";
import Heading from "./Heading";

function ConfirmDelete({ resourceName, onConfirm, disabled }) {
  return (
    <>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button variation="secondary" disabled={disabled}>
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled}>
          Delete
        </Button>
      </div>
    </>
  );
}

export default ConfirmDelete;