import axios from "axios";
export const reportThreat = (data) => axios.post("http://localhost:5000/report", data);
