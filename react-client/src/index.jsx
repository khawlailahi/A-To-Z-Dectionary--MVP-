import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import ListItem from './components/ListItem.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history : [],
      word: 'Knowledge',
      definition :{type: "noun", definition:"A body of facts learned by study or experience", syns :"wisdom , education , learning ", ant:"ignorance , illiteracy " }
    }
  }


  onChange(e){
    this.setState({
      word : e.target.value, definition:{}
    });
  }
  onHistory(){
    var context = this;
    $.ajax({
      method:"GET",
      url: '/history',
      success: (data) => {
        if(data == "NOT Found"){
          console.log("data")
          context.setState({word: "Can Not Find This Word Please Try Another One "})
        }else{
        context.setState({history:  data})
        console.log(context.state.history)
        }
      },
      error: (err) => {
        console.log('err in get ', err);
        context.setState({word: "Can Not Find This Word Please Try Another One "})

      }
    });
  }

   getRequest(){
    var word = this.state.word;
    var context = this;
    $.ajax({
      method:"GET",
      url: '/search',
      data:JSON.stringify({word:word}),
      contentType:"application/json",
      success: (data) => {
        context.setState({definition:  data})
      },
      error: (err) => {
        console.log('err in get ', err);
        context.setState({word: "Can Not Find This Word Please Try Another One "})

      }
    });
   }
   postRequest(){
    var word = this.state.word;

    $.ajax({
      method:"POST",
      url: '/search',
      data: JSON.stringify({word}),
      contentType: 'application/json',
      success: (data) => {
        console.log("post sent", data )
      },
      error: (err) => {
        console.log('err', err);
      }
    });
   }
   onClick(){
    var context=this
    const onClick = async () => {
      const post = await context.postRequest();
       const get = await context.getRequest();

    };
    onClick();
  }



  componentDidMount() {

  //   $.ajax({
  //     url: '/items',
  //     success: (data) => {
  //       this.setState({
  //         items: data
  //       })
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  }

  render () {
    return (<div style ={{color : "white", fontSize:"20px", backgroundColor: '#3a4d74', width : '600px',  textAlign: 'center', fontFamily: 'sans-serif'}}>
      <h1 style ={{color : "hotPink",  textAlign: 'center'}}>A To Z Explained</h1>
      <h4 style ={{color : "lightGray",  textAlign: 'center'}}>You Are One Click Away
        from Knowlegde</h4>
        <input type="text" style ={{maxWidth: '400px', border:"black solid 3px"}}  placeholder = "Enter Any Word" onChange={this.onChange.bind(this)} />

        <button style={{fontWeight: "bold", backgroundColor : "lightslategray", color:"white"}} onClick ={this.onClick.bind(this)}>Search</button>
        <button style={{fontWeight: "bold", backgroundColor : "lightslategray", color:"white"}} onClick ={this.onHistory.bind(this)}>Recently Search</button>
    <h2 style={{fontWeight: "bold", backgroundColor : "lightslategray", color:"white"}}>{this.state.word}</h2>
      <List items={this.state.definition}  syns={this.state.definition.syns}/>
      <ListItem history={this.state.history}/>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));