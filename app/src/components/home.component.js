import React, { Component  } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Pagination from "../model/pagination";
import { TiThMenu } from "react-icons/ti";
import QuestionsDataService from "../services/questions.service";
import translate from "../i18n/translate";

class Home extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveQuestions = this.retrieveQuestions.bind(this);
    this.setActiveQuestion = this.setActiveQuestion.bind(this);
    this.onChangePage = this.onChangePage.bind(this);

    this.state = {
      questions: [],
      currentQuestion: null,
      currentIndex: -1,
      searchName: "",
      pageOfQuestions: [],
      show: false,
      startDate: new Date(),
      searchNoName: false,
      main: false
    };
    
  }

 // Modal window
  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  // 
  componentDidMount() {
    this.retrieveQuestions();
  } 

  // Param searchName
  onChangeSearchName(e) {
    const searchName = e.target.value;
    this.setState({
      searchName: searchName
    });
  }

  getRequestParams(searchName) {
    let params = {};
    if (searchName) {
      params["name"] = searchName;
    }
    return params;
  }  

  // Get questions 
  retrieveQuestions() {
    const { searchName } = this.state;
    const params = this.getRequestParams(searchName);

    this.setState({ main: false });

    QuestionsDataService.getAll(params)
      .then((response) => {
        this.setState({
          questions: response.data
         
        });
        if (this.state.questions.length === 0) {
        this.setState({
          searchNoName: true
        });
      }  
      })
      .catch((e) => {
        console.log(e);
      });      
  }

  setActiveQuestion(question, index) {
    this.setState({
      currentQuestion: question,
      currentIndex: index,
    });
    this.setState({ show: true });
  }

  // Pagination
  onChangePage(pageOfQuestions) {
    this.setState({ pageOfQuestions: pageOfQuestions }); 
  }

  render() {
    const { searchName, currentQuestion} = this.state;

    return  (
    
      <div> {/* Div 1 - Lista */}

        <div className="form-wrapper-list">
              <h2> {translate('titleList')} </h2>
              {/* Search */}
              <div className="col-md-12">

                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    /* placeholder={translate('buttonSearch')} */
                    value={searchName}
                    onChange={this.onChangeSearchName}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-dark"
                      type="button"
                      onClick={this.retrieveQuestions}
                    >
                      {translate('buttonSearch')}
                    </button>
                  </div>
                  
                </div>
        
                {/* List */}
                <Table striped hover size="sm">
                  <thead>
                    <tr> 
                      <th> <h5> {translate('tableName')} </h5> </th>
                      <th> <h5> {translate('tableEmail')} </h5> </th>
                      <th> <h5> {translate('tableDate')} </h5> </th> 
                    </tr> 
                  </thead>
                  <tbody>
                  
                    {this.state.pageOfQuestions.map((item)  =>
                      <tr key={item.id}> 
                          <td> <h6> {item.name}  </h6> </td>   
                          <td> <h6> {item.email} </h6> </td> 
                          <td> <h6> {item.date} </h6> </td> 
                          <td onClick={() => this.setActiveQuestion(item) } >  <h6> <TiThMenu /> </h6> </td> 
                      </tr> 
                    )}

                  </tbody>
                </Table>

                  {this.state.searchNoName ? (
                      <p> <Link to={"/questions/"} className=" btn-danger" > 
                        {translate('messageNoResults')} </Link>
                    </p>  
                    ) : (  
                      <div/>
                    )} 

                {/* Pagination */}
                <div className="form-control border-0">
                  <Pagination items={this.state.questions} onChangePage={this.onChangePage} />
                </div>
              </div>

              {/* Modal window */}
              <Modal show={this.state.show} onHide={this.handleClose} animation={false} >
                <Modal.Header closeButton>
                  <Modal.Title> {translate('titleData')} </Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                  <div className="col-md-12">
                      {currentQuestion ? (
                        <div>
                          <div>
                            <label>
                              <strong> {translate('tableName')} </strong>
                            </label>{" "}
                            {currentQuestion.name}
                          </div>
                          <div>
                            <label>
                              <strong> {translate('tableEmail')} </strong>
                            </label>{" "}
                            {currentQuestion.email}
                          </div>
                          <div>
                            <label>
                              <strong> {translate('tableObs')} </strong>
                            </label>{" "}
                            {currentQuestion.obs}
                          </div>
                          <div>
                            <label>
                              <strong> {translate('tableDate')} </strong>
                            </label>{" "}
                            {currentQuestion.date}
                          </div>

                          <Link to={"/questions/id=" + currentQuestion.id} className="btn btn-secondary pagination">
                            {translate('buttonEdit')}
                          </Link>
                        
                        </div>
                      ) : (
                        <div/>
                      )}
                  </div>  
                </Modal.Body>
                <Modal.Footer/> 
              </Modal>
          </div>
        </div> /* Div 1 */
      );
  }
}

export default Home;