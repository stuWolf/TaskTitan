return (
  <div className="App">
     <Header/>
     <div className="login-form">
      {/* swap to new input fields: id = type; label= placeholder;setValue= value isSubmitted = {isFormSubmitted}; setFunction(value) */}
     <input type="FirstName" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
     <input type="LastName" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
        
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleCancel}>Cancel</button>
        {errorMessage && <p>{errorMessage}</p>}
        <input type="checkbox" checked={termsAgreed} onChange={e => setTermsAgreed(e.target.checked)} /> I agree with the terms and conditions
        <Link to="/login">Already registered? Login here</Link>
    </div>
    {/* use the side bar here to track registration, but don't show */}
    <div style={{ position: 'absolute', left: '-9999px' }}>
    <Side userMessage={userMessage} />
  </div>
    <Footer/>
  </div> 
  
);
};
i need to have all input fields replaced with the following:
<InputBox 
              id="nameInput"   // type= ..
              label="Name"     // placeholder
              setValue={name}  //value= ...
              isDisabled={false}  // disabled=...  string
              isSubmitted = {isFormSubmitted} // submit button pushed, triggers the check if all values present
              onChange={(value) => { setName(value); }}  // output for manual entry
swap to new input fields: id = type; label= placeholder;   setValue= value isSubmitted = {isFormSubmitted}; setFunction(value) ; isDisabled={disabled=... }  


the textarea in the same manner with:

<TextField 
id="reviewInput" 
label="Review" 
setValue={review}
isDisabled={false}  // This will make the input box non-editable
isSubmitted = {isFormSubmitted}
onChange={(value) => { setReview(value); }}
/>