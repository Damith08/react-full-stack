import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function CreatePost() {
  return (
    <div className="createPostPage">
      <Formik>
        <Form className="formContainer">
          <label>Title:</label>
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Posts:</label>
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postsText"
            placeholder="(Ex. Post...)"
          />
          <label>Username:</label>
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John123)"
          />

          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}
