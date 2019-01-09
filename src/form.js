import React from 'react';
import './form.css';
const data = require ('./country.json');

class MarsForm extends React.Component{
  constructor(){
    super();
    this.state = {
      firstname: '',
      lastname: '',
      dob: '',
      countries: data, 
      country: '',
      dietary: '',
      reason: '',
      formCompleted: false,
      formSubmitted: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleComplete = (event) => {
    event.preventDefault();
    this.setState({
      formCompleted: true
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      formSubmitted: true
    })
  }
    
  render() {
    console.log(this.state);

    const {firstname, lastname, dob, countries, country, dietary, reason, formCompleted, formSubmitted} = this.state;
    
    let options = countries.map(country => {
        return <option>{country.name}</option>
    });
      
    if(!formCompleted) {

      return(
        <React.Fragment>
          <div id='beforeComplete'>
          
            <h1 id='header'>Mission to Mars Registration Form</h1><br/>

            <form onChange={this.handleChange}>

              <label htmlFor='firstname'>First Name</label><br/>
              <input type='text' name='firstname' value={firstname} placeholder='First Name' /><br/><br/>

              <label htmlFor='lastname'>Last Name</label><br/>
              <input type='text' name='lastname' value={lastname} placeholder='Last Name'/><br/><br/>
              
              <label htmlFor='dob'>Date of Birth</label><br/>
              <input type='date' id='start' name='dob' value={dob} min='1900-01-01' max='2019-01-07'/><br/><br/>

              <select name='country' value={country}>
                <option>--Please choose your country of origin--</option>
                {options}
              </select><br/><br/>

              <select name='dietary' value={dietary}>
                <option>--Please choose your dietary preference--</option>
                <option>omnivore</option>
                <option>vegetarian</option>
                <option>vegan</option>
              </select><br/><br/>

              <label htmlFor='reason'>Why do you want to be a Mars explorer?</label>
              <br/>
              <textarea id='why' type='text' name='reason' value={reason}></textarea>
              <br/>

            </form><br/>

            <button className='submit'
              disabled={!(firstname && lastname && dob && country && dietary && reason)}
              onClick={this.handleComplete}>Submit
            </button>
          </div>
        </React.Fragment>
      )

    } else if (!formSubmitted) {
        return(
          <React.Fragment>
            <div id='afterComplete'>
              <p> Here is your application details:<br/><br/>
                <li>First Name:  {firstname}</li>
                <li>Last Name:  {lastname}</li>
                <li>Date of Birth:  {dob}</li>
                <li>Country of Origin:  {country}</li>
                <li>Dietary Preference:  {dietary}</li>
                <li>Reason to apply:  {reason}</li>
              </p><br/>
              
              <p>Please check if all information are correct!</p><br/>

              <button className='confirm' onClick={this.handleSubmit}>Confirm</button>
            </div>
          </React.Fragment>
        )
    } else {
        return(<p id='afterSubmit'>Thank you for your application!</p>)
    }
  }
}

export default MarsForm;