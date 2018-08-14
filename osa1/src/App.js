import React from 'react'
import Kurssi from './components/Kurssi'
import Note from './components/Note'
import Rajaus from './components/Rajaus'
import addInfo from './components/addInfo'
import Axios from 'axios';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [], 
      newNote: '',
      showAll: true

    }
    console.log('constructor')
  }

  componentDidMount() {
    console.log('will mount')
    Axios
    .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ notes: response.data })
      })

  }

  render() {
    console.log('render')
  }
}
  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }
  handleNameFilter = (event) => {
    console.log(event.target.value)
    this.setState({ nameFilter: event.target.value })
 
  }
  handleNmbrChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }

  addNumber = (event) => {
    event.preventDefault()
    const nameObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }
  

  const persons = this.state.persons.concat(nameObject)
  const namereg = this.state.newName
  const numreg = this.state.newNumber
  const seen = new Set();
  
  const hasDuplicates = persons.some(function(currentObject) {
    return seen.size === seen.add(currentObject.name).size;
  })
  if (!namereg.replace(/\s/g, '').length || !numreg.replace(/\s/g, '').length) {

    alert("field cant be empty.");
  }  else if (hasDuplicates){
    alert ("no duplicates!") 
  }  else {
  this.setState({
      persons, 
      newName: '',
      showAll: true
  })
  console.log(persons)
}
  }
  render() {
      const numbersToShow = 
        this.state.nameFilter ? 
        this.state.persons.filter(note => note.name.toLowerCase().includes(this.state.nameFilter.toLowerCase())) :
        this.state.persons


    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <form onSubmit={this.addNumber}>
        <Rajaus nameFilterProp={this.state.nameFilter} nameFilterChange={this.handleNameFilter}/>
        <Addinfo nameProp={this.state.newName} numProp={this.state.newNumber} />
          </form>  
          <h2> Numerot </h2>
            <ul>
            {numbersToShow.map(note => <Note key={note.name} note={note}/>)}
            </ul>
      </div>
    )
  }
}
export default App