import React, { useState } from 'react';
import { connect } from "react-redux";
import { actionCreators } from "../store";
import Todo from "../components/Todo";

const Home = ({ state, addTodo }) => {

  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    setText("");
    addTodo(text);
  }
  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {
          state.map((todo) => <Todo key={todo.id} {...todo}  />)
        }
      </ul>
    </>
  )
}

function mapStateToProps(state, ownProps) {
  return { state }
}

function mapDispatchToProps(dispatch, ownProps) {
  return { 
    addTodo: (text) => dispatch(actionCreators.addTodo(text)),

   };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);