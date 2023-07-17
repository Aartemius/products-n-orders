import { FC, FormEvent } from "react";

const AddOrderForm: FC = () => {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
  }

  return (
    <div className="modal show" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form action="/submit" method="post" onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" required /><br />

            <label htmlFor="description">Title:</label>
            <input type="textarea" id="description" name="description" required /><br />
          </form>
        </div>
      </div>
    </div>
  );
}