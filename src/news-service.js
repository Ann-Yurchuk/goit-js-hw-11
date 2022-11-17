import axios from "axios";

export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.API_KEY = "31258232-e3c8f840f0c2c0981cedb6e2e";
    this.SITE = 'https://pixabay.com/api';
    this.PER_PAGE = 40;
  };
    
  async myApi() {
    
    const url = await axios.get(`${this.SITE}?key=${this.API_KEY}&q=${this.searchQuery}&lang=en&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.PER_PAGE}&page=${this.page}`);
    const result = await url.data;
    return result;
  
      }
  
  incrimentPage() {
    this.page += 1;
  }
  
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
}

  set query(newQuery) {
    
    this.searchQuery = newQuery;
}
}