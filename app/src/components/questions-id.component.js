import React, { Component } from "react";
import QuestionsDataService from "../services/questions.service";
import translate from "../i18n/translate";

class QuestionsId extends Component {
  constructor(props) {
    super(props);
    this.getQuestion = this.getQuestion.bind(this);
    this.onChangeName = this.onChangeName.bind(this); 
    this.onChangeEmail = this.onChangeEmail.bind(this); 
    this.onChangeObs = this.onChangeObs.bind(this); 
    this.updateQuestion = this.updateQuestion.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);

    this.state = {
      currentQuestion: {
        id: null,
        name: "",
        email: "",
        obs: "",
        date: ""
      },
      updated: false,
      deleted: false,
      errorName: false,
      errorEmail: false,
      errorDate: false,
      emailInv: false,
    };
  }

  //
  componentDidMount() {
    this.getQuestion(this.props.match.params.id);
  }

  // Get question
  getQuestion(id) {
    QuestionsDataService.get(id)
      .then(response => {
        this.setState({
          currentQuestion: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  // Change
  onChangeName(e) {
    const name = e.target.value;
    this.setState(prevState => ({
      currentQuestion: {
        ...prevState.currentQuestion,
        name: name
      }
    }));
  }  

  onChangeEmail(e) {
    const email = e.target.value;
    this.setState(prevState => ({
      currentQuestion: {
        ...prevState.currentQuestion,
        email: email
      }
    }));
  }  

  onChangeObs(e) {
    const obs = e.target.value;
    this.setState(prevState => ({
      currentQuestion: {
        ...prevState.currentQuestion,
        obs: obs
      }
    }));
  }  

  // Update question
  updateQuestion() {
    const regExp = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);

    // Validation 
      if (this.state.currentQuestion.name === "") {
        this.setState({
          errorName: true,
          updated: false
        });
      }  else if (this.state.currentQuestion.email === "" ) {
            this.setState({
              errorEmail: true,
              errorName: false,
              updated: false
            });
          }  else if (!regExp.test(this.state.currentQuestion.email)) {
              this.setState({
                emailInv: true,
                errorEmail: false,
                errorName: false,
                updated: false
              });
            } else {    
                QuestionsDataService.update(
                  this.state.currentQuestion.id,
                  this.state.currentQuestion
                )
                  .then(response => {
                    this.setState({
                      updated: true,
                      errorName: false,
                      errorEmail: false,
                      emailInv: false
                    });
                  })
                  .catch(e => {
                    console.log(e);
                  });
              } 
  }


  // Delete question
  deleteQuestion() {    
    QuestionsDataService.delete(this.state.currentQuestion.id)
      .then(response => {
        this.setState({
          deleted: true,
          updated: false,
          emailInv: false,
          errorName: false
        });
      })
      .catch(e => {
        console.log(e);
      });
  } 


  render() {
    const { currentQuestion} = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper"> 
          {currentQuestion ? (
            <div >
              <form>
                <div>
                  <h2> {translate('titleUpdate')} </h2>
                  <div className="form-group">
                    <input
                      type="text"
                      className="shadow form-control"
                      id="name"
                      onChange={this.onChangeName}
                      value={currentQuestion.name}
                    />
                     {this.state.errorName ? (
                        <p> {translate('messageError')} </p>
                      ) : (  
                        <div/>
                      )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="shadow form-control"
                      id="email"
                      onChange={this.onChangeEmail}
                      value={currentQuestion.email}
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
                    <textarea
                      type="text"
                      className="shadow form-control"
                      id="obs"
                      value={currentQuestion.obs}
                      onChange={this.onChangeObs}
                    />
                  </div>
                  <div className="form-group">
                    <input
                        type="date"
                        className="shadow form-control"
                        id="date"
                        value={currentQuestion.date}
                        disabled={true}
                      />
                  </div>

                  {this.state.updated ? (
                        <h6> {translate('messageUpdate')} </h6>
                      ) : (  
                        <div/>
                      )}
                </div>
              </form>

              {this.state.deleted ? (
                <p> {translate('messageDelete')} </p>
              ) : (  
                <div>
                  <button type="submit" className="btn btn-dark" onClick={this.updateQuestion}>
                    {translate('buttonUpdate')}
                  </button>
                  &nbsp;
                  <button className="btn btn-danger mr-2" onClick={this.deleteQuestion}>
                    {translate('buttonDelete')}
                  </button>
              </div>
              )} 
          </div>
          ) : (
            <div/>
           )}
        </div>
      </div>
    );
  }
}

export default QuestionsId;
