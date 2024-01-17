import { Injectable } from '@nestjs/common';
import  axios  from 'axios'

@Injectable()
export class SnykService {

  
  async findAll() {
    const response = await this.snykRequest();
    const projects = []
    for (const element of response.results) {
      const project = element.projects[0]
      if (!projects.some(e => e.id === project.id)) {
        projects.push(project)
      }
    }
    return projects
  }

  async findOne(id: string) {
    const responseSnyk = await this.snykRequest();
    const response = responseSnyk.results.filter( data => data.projects[0].id === id)
    return response
  }

  private async snykRequest() {
    const url = 'https://api.snyk.io/v1/org/3fa3fb1e-7dd1-47f4-a277-2c39b3ad6895/dependencies?sortBy=dependency&order=asc&page=1&perPage=50'
    const headers = {
      'Authorization': 'token fe91d6eb-e8f8-4e50-8529-bdf1f0967a5b',
      'Content-Type': 'application/vnd.api+json'
    }
    const data = {}
    try {
      const response = await axios.post(url, data, {headers})
      return response.data
    } catch(error) {
      console.error(error.message);
      throw new Error('Algo salió mal en la petición');
    }
    
  }

}
