```js

<div className="job-form">
    <h2>Job Profile</h2>
    <p>User status: {status}</p>
    {jobStatus === "Draft" &&
    <div>
        <div className="form-row">
         <p>Customer Details:</p> 
          <button disabled={jobStatus !== "Draft"} onClick={handleProfile}>Copy from profile</button>
            <input type="FirstName" value={FirstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" disabled={jobStatus !== "Draft"} />
            <input type="LastName" value={LastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" disabled={jobStatus !== "Draft"} />
        </div>
        <div className="form-row">
            <input type="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" disabled={jobStatus !== "Draft"} />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" disabled={jobStatus !== "Draft"} />
        </div>
        <div className="form-row">
            <input type="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" disabled={jobStatus !== "Draft"} />
            <p>Installation Address:</p>
          <button disabled={jobStatus !== "Draft"} onClick={handleCustomerData}>Copy from Customer</button>
            <input type="installationAddress" value={installationAddress} onChange={e => setInstallationAddress(e.target.value)} placeholder="InstallationAddress" disabled={jobStatus !== "Draft"} />
        </div>
        <div className="form-row">
        <p>Scope of Work:</p> 
            <textarea value={jobdescription} onChange={e => setJobdescription(e.target.value)} placeholder="Scope of Work" disabled={jobStatus !== "Draft"} />
        </div>
        <div className="form-row">
            <input type="date" value={completion} onChange={e => setCompletion(e.target.value)} placeholder="Prefered Completion Date" disabled={jobStatus !== "Draft"} />
        </div>
    </div>
    }
</div>





```