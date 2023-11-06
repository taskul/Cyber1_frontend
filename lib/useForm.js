import { useEffect, useState } from 'react';

// we'll take in some initial state adn we'll just default that to an empty object, just in case someone doesn't pass in any default state.
export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  // we set this up to avoid infinite loop in useEffect
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // this function runs when the things we are watching change.
    setInputs(initial);
  }, [initialValues]);

  // This will handle the change for our inputs
  // we are setting the entire state to an object, so that way we can work with multiple inputs
  function handleChange(e) {
    // input fields always return strings for values, which will be a problem when we send a string to a GraphQL field that required a number. So here is what we can do:
    // first destructure e.target object and get "type" for type of input field
    let { value, name, type } = e.target;
    // then if type is number, we'll convert the string to a number
    if (type === 'number') {
      value = parseInt(value);
    }

    // if we are dealing with uploading files
    // e.target.files is an array, and what we want is the first value from that array e.target.files[0], and can destructure that array by passing the first item as value in [value] = e.target.files;
    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({
      // copy the existing state,
      ...inputs,
      // this way we can dynamically change name of the input field
      [name]: value,
    });
  }
  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    // here we are clearing all the values but keeping the keys
    // Object.fromEntries helps us to turn the array back into an object
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  return { inputs, handleChange, resetForm, clearForm };
}
