import React, { Component } from 'react'
import axios from 'axios'
import './Analysis'
import './App.css'
import './form.css'
import Spinner from './Spinner'
import Analysis from './Analysis'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      website: '',
      isAnalysed: false,
      analysis: {
        htmlVersion: '',
        pageTitle: '',
        headings: {
          h1: 0,
          h2: 0,
          h3: 0,
          h4: 0,
          h5: 0,
          h6: 0,
        },
        links: {
          absolute: 0,
          relative: 0,
          inaccessible: 0
        },
        containsLoginForm: false
      },
      error: ''
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetAppState = this.resetAppState.bind(this)
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">Website Crawler and Checker</h1>
        </header>
        <section className="App-content">
          { !this.state.isAnalysed ? (
            <div>
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="website">Enter a website to check</label>
                <div className="form__input-and-button">
                  <input type="text" name="website" ref="website"
                         className="form__input" value={this.state.website}
                         onChange={this.handleChange} placeholder="example: github.com"
                         disabled={this.state.loading} />
                  <button type="submit" className="form__button" disabled={this.state.loading}>Analyse Website</button>
                </div>
              </form>
              <div className="error">{this.state.error}</div>
            </div>
            ) : null }
          { this.state.loading ? <Spinner /> : null }
          { this.state.isAnalysed ? <Analysis analysis={this.state.analysis} website={this.state.website} /> : null }
          { this.state.isAnalysed ? <p><a href="" onClick={this.resetAppState}>Try another website?</a></p> : null }
        </section>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({loading: true})
    this.crawlWebsite(this.state.website)
  }

  handleChange(e) {
    this.setState({website: e.target.value})
  }

  resetAppState(e) {
    e.preventDefault()
    this.setState({isAnalysed: false})
  }

  async crawlWebsite() {
    try {
      const response = await axios.get(`http://localhost:8080/crawl/${this.state.website}`)
      console.log(response.data)
      this.setState({ isAnalysed: true, analysis: response.data, error: '' })
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        this.setState(error.response.data)
      } else if (error.request) {
        console.log(error.request())
      } else {
        console.log(error.message)
      }
    } finally {
      this.setState({loading: false})
    }
  }
}

export default App
