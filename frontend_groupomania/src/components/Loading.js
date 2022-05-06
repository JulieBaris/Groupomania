import React, { Component } from 'react'

export default class Loading extends Component {
  render() {
    return (
      <div>
           <section className="spinner">
               <div className="loading">
               <i className="fas fa-fan"></i>
               </div>
          </section>
      </div>
    )
  }
}