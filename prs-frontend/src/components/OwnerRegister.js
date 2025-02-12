import React from 'react';
import '../register.css';
import {Link ,useHistory} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { Form } from "react-bootstrap";
import Logo from '../assets/img/Logo.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default class OwnerRegister extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            fname:"",
            lname:"",
            email:"",
            address:"",
            contactno:"",
            password:"" , 
            repassword:"",
            error:{
                fnameerr:"",
                emailerr:"",
                pwassworderr:"" , 
                repassworderr:"",
                lnameerr:"",
                address:"",
                conatctno:""
            }
        }

    }
    handleChange = (a) =>{
        const input = a.target;
        const nm = input.name;  
        const patternemail=/^[A-za-z0-9.]{5,}@[a-z0-9]{3,}\.[a-z]{3,}$/;
        const patternpwd=/^[A-Za-z@!#$%*.]{1,}[A-Za-z@!#$%*.]{2,}[A-Za-z@!#$%*.]{3,}$/;
        let val; 
        let error = this.state.error;
        if(nm==="fname")
        {
            val=input.value;
            if(val.length<5)
            {
                error.fnameerr="Too short first Name";
            }
            else
            {
                error.fnameerr="";
            }
        }
        else
        {
            if(nm==="lname")
            {
                val=input.value;
                if(val.length<5)
                {
                    error.lnameerr="Too short last Name";
                }
                else{
                    error.lnameerr="";
                }
            }
            else
            {
                if(nm==="email")
                {
                    val=input.value;
                    if(!(patternemail.test(val)))
                    {
                        error.emailerr="Invalid Email";              
                    }
                    else
                    {
                        error.emailerr ="";
                    }   
                }
                else
                {
                    if(nm==="password")
                    {
                        val=input.value;
                        if(!(patternpwd.test(val)))
                        {
                            error.passworderr="Invalid Password";
                        }
                        else
                        {  
                            error.passworderr ="";
                        }   
                    }
                    else
                    {
                        if(nm==="repassword")
                        {
                            val=input.value;
                            if(this.state.password!==val)
                            {
                                error.repassworderr="Password Not Equal";
                            }
                            else
                            {
                                error.repassworderr ="";
                            }
                        }
                        else
                        {
                            if(nm==="address")
                            {
                                val=input.value;
                                if(val.length<10)
                                {
                                    error.addresserr="Too short address";
                                }
                                else
                                {
                                    error.addresserr="";
                                }
                            }
                            else{
                                if(nm==="contactno")
                                {
                                    val=input.value;
                                    if(val.length<10)
                                    {
                                        error.contactnoerr="Invalid Number";
                                    }
                                    else
                                    {
                                        error.contactnoerr="";
                                    }
                                }
                                else{
                                    if(nm==="uniqueid")
                                    {
                                        val=input.value;
                                        if(val<100)
                                        {
                                            error.contactnoerr="Invalid UniqueIdNumber";
                                        }
                                        else
                                        {
                                            error.contactnoerr="";
                                        }       
                                    }
                                }
                            }
                        }
                    }
                }
            } 
        }
        this.setState({error,[nm]: val})

    }
   submitForm = async (e)=>{
    e.preventDefault();
    //console.log(this.state);
    const reqData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: this.state.fname,
            phone: this.state.contactno,
            address: this.state.address,
            email: this.state.email,
            password : this.state.password,
        })
    };

    await fetch(process.env.REACT_APP_BASE_URL+"/owner",reqData)
    .then(resp => resp.json())
    .then(data => this.setState({st: data, success: true}));
    window.location.href="/ownerlogin";
       
    }
    render(){

    return (
        <div className='register'>
             <Link to="/">
            {/* <HomeIcon className='register_homeIcon'/> */}
            <img className='login_img' src={Logo} alt='logo' />
            </Link>
            <div className='register_container'>
                <h1>Owner Sign-up</h1>
                {/* <form >
                    <h5>First Name</h5><input type='text' name="fname" value={this.state.fname} onChange={this.handleChange}/><br/>
                    <h5>Email</h5><input type='text' name="email" value={this.state.email} onChange={this.handleChange}/><br/>
                    <h5>Address</h5><input type='text' name="address" value={this.state.address} onChange={this.handleChange}/><br/>
                    <h5>Contact Number</h5><input type='number'name="contactno" value={this.state.contactno} onChange={this.handleChange}/><br/>
                    <h5>Password</h5><input type='password' name="password" value={this.state.password} onChange={this.handleChange}/><br/>
                    <h5>Retype-Password</h5><input type='password' name="repassword" value={this.state.repassword} onChange={this.handleChange}/><br/>
                    <Link to="/ownerlogin" > <button className='innerbutton' type="submit" value="Submit" onClick={this.submitForm}>Sign Up</button></Link><br/>
                </form> */}
                <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" name="fname" value={this.state.fname} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter Email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter Address" name="address" value={this.state.address} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter ontact Number" name="contactno" value={this.state.contactno} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Form.Label>Retype-Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Retype-Password" name="repassword" value={this.state.repassword} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Link to="/register" ><button className='innerbutton' type="submit" onClick={this.submitForm}>Sign Up</button></Link><br />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="formBasicEmail">
                        <Link to="/ownerlogin" ><button className='innerbutton'><ArrowBackIcon/>Back</button></Link><br />
                    </Form.Group>
                <span>{this.state.error.emailerr}{this.state.error.fnameerr}{this.state.error.lnameerr}{this.state.error.addresserr}<br/>
                {this.state.error.pwderr}{this.state.error.contactnoerr}</span>
            </div>
        </div>
        
    )
}
}