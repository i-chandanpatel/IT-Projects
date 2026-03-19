import { useForm } from "react-hook-form"; // Hook used to manage form state, validation, and submission in React
import { z } from "zod"; // Zod is a schema validation library used to validate data structures
import { zodResolver } from "@hookform/resolvers/zod"; // Connects Zod schema with react-hook-form validation system

// Basic schema (not used currently)
const formSchema = z.object({
  name: z.string().min(3, "Minlen should be 3").max(20, "Max len is 20"), 
  // z.string() ensures value is string
  // min()/max() ensures minimum/maximum length
  // Use case: username, full name validation

  age: z.number().min(10, "Min age 10").max(80, "Max age 80").refine(val => !isNaN(val), {
    message: "Age is required",
  }),
  // z.number() ensures the value must be a number
  // refine() adds custom validation logic
  // here it checks that age is not NaN
  // Use case: custom validations like password strength, custom conditions, etc.

  // age: z.coerce.number().min(10).max(80)
  // coerce converts string → number automatically
  // useful when inputs send string values

  password: z.string().min(10, "Min len of pass 10").max(20, "Max len of pass 20"),
  // Used to validate password length
});


// Schema with confirm password validation
const formSchema1 = z.object({
  name: z.string().min(3, "Minlen should be 3").max(20, "Max len is 20"),

  age: z.number().min(10, "Min age 10").max(80, "max age 80"),

  password: z.string().min(10, "Min len of pass 10").max(20, "Max len of pass 20"),

  confirm: z.string(), 
  // confirm password field
})
.refine((data)=>data.password===data.confirm,{
    message:"Password didn't match",
    path:["confirm"],
});
// refine at object level allows validation using multiple fields
// here it compares password and confirm
// path:["confirm"] means the error will be attached to confirm field
// Use case: confirm password, date comparisons, cross-field validation


export function ZodForm() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema1), 
  });

  function submitForm(data) {
    console.log(data); 
    // handleSubmit only calls this function if validation passes
    // data contains validated form values
    // Use case: send form data to API, database, etc.
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      {/* handleSubmit validates form before calling submitForm */}

      <label>Name</label>
      <input {...register("name")} />
      {/* register connects input to react-hook-form state */}

      {errors.name && <span>{errors.name.message}</span>}
      {/* errors object contains validation errors from Zod */}

      <br />

      <label>Age</label>
      <input type="number" {...register("age", { valueAsNumber: true })} />
      {/* valueAsNumber converts input value from string → number
         required because z.number() expects a number */}

      {errors.age && <span>{errors.age.message}</span>}

      <br />

      <label>Password</label>
      <input type="password" {...register("password")} />

      {errors.password && <span>{errors.password?.message}</span>}


      <br />

      <label>Confirm Password</label>
      <input type="password" {...register("confirm")} />

      {errors.confirm && <span>{errors.confirm?.message}</span>}
      
      <br />

      <button type="submit">Submit</button>
    </form>
  );
}
