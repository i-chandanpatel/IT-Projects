import { useState } from 'react'
import { useForm } from 'react-hook-form'

/*
  ===============================
  COMPONENT 1 : Controlled Form
  ===============================

  This component uses React's useState to control form inputs.
  Every time the user types something, the state updates and
  React re-renders the component.

  This approach is called a "Controlled Component".
*/

export default function App() {

  // State variables to store input values
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  /*
    handleSubmit runs when the form is submitted.

    e.preventDefault() prevents the default browser behavior
    (which reloads the page on form submission).

    After that we access the values stored in state and log them.
  */
  function handleSubmit(e) {
    e.preventDefault();
    console.log(name);
    console.log(age);
  }

  /*
    This console log helps us observe re-renders.

    In controlled components, every keystroke updates state,
    which triggers a re-render.
  */
  console.log("Render");

  return (
    <>
      <form onSubmit={handleSubmit}>

        {/* 
          Controlled input for Name

          value={name} → value comes from React state
          onChange → updates state when user types
        */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* 
          Controlled input for Age

          Same logic as above.
          The input value is always synchronized with state.
        */}
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        {/* Button to submit the form */}
        <button>Submit</button>

      </form>
    </>
  )
}


/*
  ======================================
  COMPONENT 2 : React Hook Form Version
  ======================================

  This component uses React Hook Form (RHF) to manage form state.

  RHF uses "uncontrolled inputs" and refs internally,
  so the component does NOT re-render on every keystroke.

  This makes forms much faster and scalable.
*/

export function App1() {

  /*
    useForm() initializes React Hook Form.

    register → connects inputs to RHF
    handleSubmit → validates form before submission
    errors → contains validation error messages
  */
  const { register, handleSubmit, formState: { errors } } = useForm();

  /*
    submitForm runs only when validation passes.

    RHF collects all input values and provides them
    as a single "data" object.
  */
  function submitForm(data) {
    console.log(data);
  }

  /*
    You will notice "Render" appears fewer times here
    compared to the controlled component.
  */
  console.log("Render");

  return (
    <>
      {/* handleSubmit runs validation before calling submitForm */}
      <form onSubmit={handleSubmit(submitForm)}>

        {/* ================= NAME FIELD ================= */}

        <label htmlFor="first">Name</label>

        <input
          id='first'
          type="text"

          /*
            register() connects the input to React Hook Form.

            Validation rule:
            required → the field cannot be empty
          */
          {...register('name', {
            required: "Name is necessory"
          })}
        />

        {/* 
          If validation fails, errors.name will exist.
          We display the error message here.
        */}
        {errors.name && <span>{errors.name.message}</span>}

        <br />


        {/* ================= AGE FIELD ================= */}

        <label htmlFor="second">Age</label>

        <input
          id='second'
          type="number"

          /*
            Validation rules:

            min → minimum allowed value
            max → maximum allowed value
          */
          {...register('age',
            {
              min: {
                value: 10,
                message: "Age should be greator than 10"
              },
              max: {
                value: 80,
                message: "Age should be less than 80"
              }
            })}
        />

        {/* Show validation error if age is invalid */}
        {errors.age && <span>{errors.age.message}</span>}

        <br />


        {/* ================= PASSWORD FIELD ================= */}

        <label htmlFor="password">Password</label>

        <input
          id='password'
          type="password"

          /*
            Password validation rules:

            minLength → minimum characters required
            maxLength → maximum characters allowed
          */
          {...register('pass',
            {
              minLength: {
                value: 10,
                message: "Length of pass should be greator than 10"
              },
              maxLength: {
                value: 20,
                message: "Length of pass should be less than 20"
              }
            })}
        />

        {/* Display password validation error */}
        {errors.pass && <span>{errors.pass.message}</span>}

        <button type="submit">Submit</button>

      </form>
    </>
  )
}


/*
  ===================================================
  SUMMARY
  ===================================================

  App (Controlled Form)
  ---------------------
  Uses useState
  Input values stored in React state
  Causes many re-renders

  Flow:
  Input → setState → Re-render


  App1 (React Hook Form)
  ----------------------
  Uses uncontrolled inputs
  Better performance
  Built-in validation
  Fewer re-renders

  Flow:
  Input → register → React Hook Form → Validation


  ===================================================
  FUTURE IMPROVEMENT
  ===================================================

  Right now validation rules are written inside register().

  For large applications this becomes messy.

  A better approach is using schema validation libraries
  like Zod.

  With Zod:
  - validation rules stay in one schema
  - easier to maintain
  - reusable
  - cleaner code

  Next step: Integrate Zod with React Hook Form
  using zodResolver().
*/
