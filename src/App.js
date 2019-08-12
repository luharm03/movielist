import React from 'react';
import './App.css';

import { connect } from 'react-redux';
import { getMovieList, setMovieDetail,rmMovie } from './actions/index';

import { MDCDialog } from '@material/dialog';



class List extends React.Component {
  //
  delete = (index) =>{
    this.props.rmMovie(index);
  }
  showMore = (movie) => {

    let obj = {};
    obj.title = movie.name;
    obj.content = [];
    obj.content.push(
      <ul class="mdc-list mdc-list--two-line">
       <li class="mdc-list-item" >
          <span class="mdc-list-item__text">
            <img src={movie.image}/>
          </span>
        </li>
        <li class="mdc-list-item">
          <span class="mdc-list-item__text">
            <span class="mdc-list-item__primary-text">Name</span>
            <span class="mdc-list-item__secondary-text">{movie.name}</span>
          </span>
        </li>
        <li class="mdc-list-item" >
          <span class="mdc-list-item__text">
            <span class="mdc-list-item__primary-text">Description</span>
            <span class="mdc-list-item__secondary-text">{movie.description}</span>
          </span>
        </li>
        <li class="mdc-list-item">
          <span class="mdc-list-item__text">
            <span class="mdc-list-item__primary-text">Cast</span>
            <span class="mdc-list-item__secondary-text">{movie.cast.join(', ')}</span>
          </span>
        </li>
        <li class="mdc-list-item">
          <span class="mdc-list-item__text">
            <span class="mdc-list-item__primary-text">Release Year</span>
            <span class="mdc-list-item__secondary-text">{movie.releaseYear}</span>
          </span>
        </li>
        <li class="mdc-list-item">
          <span class="mdc-list-item__text">
            <span class="mdc-list-item__primary-text">Genre</span>
            <span class="mdc-list-item__secondary-text">{movie.genre.join(', ')}</span>
          </span>
        </li>
      </ul>
    );
    this.props.setMovieDetail(obj);
    let dialog = new MDCDialog(document.querySelector('.mdc-dialog'));

    dialog.open();



  }

  render() {

    let cards = [];
    if(this.props.data.length > 0){
    this.props.data.map((movie, i) => {
      cards.push(
        <div class="mdc-card my-card demo-card demo-basic-with-header">
          <div class="demo-card__primary">
            <h2 class="demo-card__title mdc-typography mdc-typography--headline6"> {movie.name}</h2>
            <h3 class="demo-card__subtitle mdc-typography mdc-typography--subtitle2">year: {movie.releaseYear}</h3>
          </div>
          <div class="mdc-card__primary-action demo-card__primary-action" tabindex={i}>
            <div class="mdc-card__media mdc-card__media--16-9 demo-card__media" style={{ "background-image": 'url(' + movie.image + ')' }} ></div>

          </div>
          <div class="mdc-card__actions">
            <div class="mdc-card__action-buttons">
              <button class="mdc-button mdc-card__action mdc-card__action--button" onClick={()=>{this.showMore(movie);}}>SHOW MORE</button>
              <button class="mdc-button mdc-card__action mdc-card__action--button" onClick={()=>{this.delete(i);}}>DELETE</button>
            </div>
          </div>
        </div>

      );
    });
  } else {
    cards.push(
      <div> No data found</div>
    );
  }
    return (
      <div class="demo-card-collection">
        {cards}
      </div>);
  }
}
class Modal extends React.Component {
  render() {
    let movieDetail = {title:"sada",content:"asddas"};
    if(this.props.data && this.props.data.movie){
      movieDetail = this.props.data.movie;
    }
    
      

      return (
        <div className="mdc-dialog"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="my-dialog-title"
          aria-describedby="my-dialog-content">
          <div className="mdc-dialog__container">
            <div className="mdc-dialog__surface">
              <h2 className="mdc-dialog__title" id="my-dialog-title">{movieDetail.title}</h2>
              <div className="mdc-dialog__content" id="my-dialog-content">
                {movieDetail.content}
              </div>
              <footer className="mdc-dialog__actions">
                {/* <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="no">
                  <span className="mdc-button__label">No</span>
                </button> */}
                <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes">
                  <span className="mdc-button__label">Close</span>
                </button>
              </footer>
            </div>
          </div>
          <div className="mdc-dialog__scrim"></div>
        </div>);
    
    
  
  }
}
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      list :[]
    };
  }

  componentDidMount() {
    this.props.getMovieList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.list !== this.props.list) {
       this.setState({list:this.props.list});
    }
  }

  onChange = (e) =>{ 
    let list = [...this.props.list];
    if(e.target.value && e.target.value != 'all'){
      list =  list.filter(a=>{return (a.releaseYear == e.target.value || a.genre.indexOf(e.target.value) >= 0);});
    }

    this.setState({list:list});
  }
  
  searchText = (e) =>{
    let list = [...this.props.list];
    if(e.target.value != ''){
      let rg = new RegExp(e.target.value, 'gi');
      list =  list.filter(a=>{
        return (a.name.search(rg) >=0);
      });
    
    }

    this.setState({list:list});

  }
  
  render() {
   // console.log(this.props);
   let options = [];
   
   options.push(<option key="Choose" value="all">ALL</option>);
   options.push(<option key="val" value={'2000'}>2000</option>);
   options.push(<option key="val" value={'2010'}>2010</option>);
   options.push(<option key="val" value={'Drama'}>Drama</option>);
   options.push(<option key="val" value={'Action'}>Action</option>);
   options.push(<option key="val" value={'Comedy'}>Comedy</option>);

    return (
      
      <div>
        <Modal data={this.props.detail}/>
        <header className="app-header">
          <span>Movie List</span>
        </header>
        <section className="app-main-container">
          Display movie list here<br />
          Search : <input type="text" onChange={this.searchText} />
          Filter : <select className="form-control" 
                                    name="filter"
                                     onChange={this.onChange}>
                                    {options}
                                </select> 
          <List data={this.state.list} rmMovie={this.props.rmMovie} setMovieDetail={this.props.setMovieDetail}/>
        </section>
      </div>)
  }
};

// const Counter = ...
const mapStateToProps = (state) => {
  return {
    list: state.movies,
    detail: state.app
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMovieList: () => dispatch(getMovieList()),
    setMovieDetail: (data) => dispatch(setMovieDetail(data)),
    rmMovie: (ind) => dispatch(rmMovie(ind)),
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);