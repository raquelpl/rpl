import http from "../http"; 

class QuestionsDataService {

  create(data) {
    return http.post("/questions", data);
  }
  
  getAll(params) {
    return http.get("/questions", { params });
  }

  get(id) {
    return http.get(`/questions/${id}`);
  }

  update(id, data) {
    return http.put(`/questions/${id}`, data);
  }

  delete(id) {
    return http.delete(`/questions/${id}`);
  }

}

export default new QuestionsDataService();
