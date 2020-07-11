import React, { Component } from "react";
import { Link } from "react-router-dom";
import QuestionsDataService from "../services/questions.service";
import ReactFormValidation from "react-form-input-validation";
import DatePicker from "react-datepicker";
import addDays from 'date-fns/addDays'
import "react-datepicker/dist/react-datepicker.css";
import translate from "../i18n/translate";

class Question extends Component {
  constructor(props) {
    super(props);
    this.submitQuestion = this.submitQuestion.bind(this);
   
    this.state = {
      id: null,
      fields: {
        name: "",
        email: "",
        obs: "",
        date: ""
      },
      submitted: false,
      errorName: false,
      errorEmail: false,
      errorDate: false,
      emailInv: false
    };

    this.form = new ReactFormValidation(this);
    this.form.onformsubmit = (fields) => {
      this.submitQuestion();
    }   
  };


  // Change - DatePicker
  handleChange = date => {
    this.setState({
      date: date
    });
  }; 


/* Submit Question */
  submitQuestion() {
    var data = {
      name: this.state.fields.name,
      email: this.state.fields.email,
      obs: this.state.fields.obs,
      date: this.state.date
    };

    const regExp = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);

    // Validation
     if (data.name === "") {
        this.setState({
          errorName: true
        });
      }  else if (data.email === "" ) {
            this.setState({
              errorEmail: true,
              errorName: false
            });
          }  else if (!regExp.test(data.email)) {
              this.setState({
                emailInv: true,
                errorEmail: false,
                errorName: false
              });
            } else if (data.date === undefined) {
                this.setState({
                  errorDate: true,
                  errorEmail: false,
                  emailInv: false,
                  errorName: false
                });
            } else {        
              QuestionsDataService.create(data)
                .then(response => {
                  this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    obs: response.data.obs,
                    date: response.data.date,
                    submitted: true
                  });
                  console.log(response.data);
                })
                .catch(e => {
                  console.log(e);
                });
            }
    }
      
  render() {

    return (    
      <div className="wrapper">
        <div className="form-wrapper"> 

          {this.state.submitted ? (
            <div>
              <Link to={"/home" } className="btn btn-success">
                  {translate('messageCreate')}
              </Link>

            </div>
          ) : (  
           <form noValidate autoComplete="off" onSubmit={this.form.handleSubmit}>
            <div>

              <h2> {translate('titleCreate')} </h2>

              <div className="form-group">
                <h6> {translate('tableName')} </h6>
                <input
                  type="text"
                  className="shadow form-control" 
                  id="name"
                  name="name"
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.name}
                /> 
                {this.state.errorName ? (
                  <p>  {translate('messageError')} </p> 
                ) : (  
                  <div/>
                )}
              </div>

              <div className="form-group">
                <h6> {translate('tableEmail')} </h6>
                <input
                  type="text"
                  className="shadow form-control"
                  id="email"
                  name="email"
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.email}
                />
                {this.state.errorEmail ? (
                  <p> {translate('messageError')} </p>
                ) : (  
                  <div/>
                )}
                {this.state.emailInv ? (
                  <p> {translate('messageEmailInv')} </p>
                ) : (  
                  <div/>
                )}
              </div>

               <div className="form-group">
                <h6> {translate('tableObs')} </h6>
                <textarea
                  type="text"
                  className="shadow form-control"
                  id="obs"
                  name="obs"
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.obs}
                />
              </div>

              <div className="form-group">
                <h6> {translate('tableDate')} </h6>
                <DatePicker
                  type="date"
                  id="date"
                  dateFormat="yyyy/MM/dd"
                  className="shadow form-control"
                  selected={this.state.date}
                  onChange={this.handleChange}
                  minDate={addDays(new Date(), 2)}
                />
                {this.state.errorDate ? (
                  <p> {translate('messageError')} </p>
                ) : (  
                  <div/>
                )}
              </div>
 
              <button className="btn btn-dark"> {translate('buttonSubmit')} </button>
            </div>
           </form>
          )}
        </div>
      </div>
    );
  }
}

export default Question;
