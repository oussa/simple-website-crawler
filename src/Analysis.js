import React, { Component } from 'react'

class Analysis extends Component {
  render() {
    return (
      <div className="analysis">
        <h2>Analysis for website <u>{this.props.website}</u></h2>
        <div>HTML version: <b>{this.props.analysis.htmlVersion}</b></div>
        <div>Page title: <b>{this.props.analysis.pageTitle}</b></div>
        { [...Array(6)].map((__, idx) => <div key={`h${idx+1}`}>Found <b>{this.props.analysis.headings[`h${idx+1}`]}</b> {`h${idx+1}`} headings</div>) }
        <div>Found <b>{ this.props.analysis.links.relative }</b> relative links</div>
        <div>Found <b>{this.props.analysis.links.absolute }</b> absolute links</div>
        <div>Found <b>{ this.props.analysis.links.inaccessible }</b> inaccessible links</div>
        <div>The website <b>{ this.props.analysis.containsLoginForm ? 'contains' : 'doesn\'t contain' }</b> a form</div>
      </div>
    );
  }
}

export default Analysis
