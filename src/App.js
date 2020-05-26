import React ,{ Component } from 'react';
import Particles from 'react-particles-js'
import Nav from './components/nav/nav'  
import Logo from './components/logo/logo'
import Imageform from './components/imageform/imageform'
import Sighin from './components/Sighin/sighin' 
import Register from './components/register/register'
import Rank from './components/Rank/rank'   
import Clarifai from 'clarifai';
import Facepicture from './components/facepicture/facepicture';
import './App.css';


const app = new Clarifai.App({
 apiKey: '2c21491a673d4d378ab2fa942b61baeb'
});
const particle={
                particles: {
                  line_linked: {
                    shadow: {
                      enable: true,
                      color: "#3CA9D1",
                      blur: 5
                    }
                  }
                }
 }

 const initialstate={
    input:'',
    regionsArray:[],
    imageUrl:'',
    box: [],
    route:'sighin',
    issighin:false,
    user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
    }
 }


class App extends Component {
  constructor() {
    super();
    this.state = initialstate
  }
  loadUser =(data)=>{
    this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined
    }})
  }

  facelocation = (data) =>{
    // const clariface = data.outputs[0].data.regions[0].region_info.bounding_box
    const clariface = data.outputs[0].data.regions
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const boxes = clariface.map(regions=>{
     const localtion = regions.region_info.bounding_box
      return {
        leftCol:localtion.left_col * width,
        topRow:localtion.top_row * height,
        rightCol:width-(localtion.right_col*width),
        bottomRow:height-(localtion.bottom_row*height)
    }
    })
    return boxes;
  }

  onroutechange = (route) =>{
    if(route === 'sighout'){
      this.setState(initialstate)
    } else if(route === 'home'){
      this.setState({issighin:true})
    }
    this.setState({route:route})
  }

  displaybox = (box) =>{
    this.setState({box:box})
  }
  onInputchange = (event) =>{
     this.setState({input:event.target.value});
  }
  onsubmit = () =>{
      this.setState({imageUrl:this.state.input});
      app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then(response=>{
        if(response){
          fetch('https://vast-savannah-88283.herokuapp.com/image',{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              id:this.state.user.id
            })
          })
            .then(response=>response.json())
            .then(count=>{
              this.setState(Object.assign(this.state.user,{entries:count}))
            })
            .catch(console.log)
        }
        this.displaybox(this.facelocation(response))
        console.log(response)
        })
      .catch(err=>console.log(err))
 }
  render(){
    return (
      <div className="App">
            <Particles className='particles' params={particle} />
            <Nav onroutechange={this.onroutechange} issighin={this.state.issighin}/>
            {  this.state.route==='home'
              ?<div> 
                  <Logo />
                  <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                  <Imageform onInputchange={this.onInputchange} onsubmit={this.onsubmit}/>
                  <Facepicture box={this.state.box} imageUrl={this.state.imageUrl}/>
                </div>  
             :(
                this.state.route ==='sighin'
                ?<Sighin loadUser={ this.loadUser} onroutechange={this.onroutechange}/>
                :<Register loadUser={ this.loadUser} onroutechange={this.onroutechange}/>
              )
            }
      </div>
    );
  }
}

export default App;
