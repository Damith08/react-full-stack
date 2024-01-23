import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function CreatePost() {
  return (
    <div className="createPostPage">
      <Formik>
        <Form>
          <label>Title:</label>
          <Field
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Posts:</label>
          <Field
            id="inputCreatePost"
            name="postsText"
            placeholder="(Ex. Post...)"
          />
          <label>Username:</label>
          <Field
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
