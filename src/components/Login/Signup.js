import React, { useEffect, useState } from 'react';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../../services/api.js';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';

function Signup({ user, setUser }) {
  const [loginn, setLoginn] = useState({//form
    email: '',
    password: ''
  }
  );
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);
  const handleChangeLogin = (e) => {//handlechange
    setLoginn({
      ...loginn,
      [e.target.name]: e.target.value
    });
  };
  //login
  const handleSubmit = async (e) => {//handlesubmit
    e.preventDefault();
    const result = await login(loginn);

    console.log("form", result);
    setErrors(null);
    if (result.status === 200) {
      if (result.data.status === 200) {
        localStorage.setItem('user', JSON.stringify(result.data.data));
        toast.success("Welcome Back");
        setTimeout(() => {
          navigate('/createtodo/notes');
        }, 6000);

        return;
      }
      if (result.data.status === 201) {
        setErrors(result.data.data);
        toast.error(result.data.message);
        return;
      }
      if (result.data.status === 202) {
        toast.error(result.data.message);
        return;
      }
    }
  };

  //SIGNUP
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorsignup, setErrorSignup] = useState(null);

  const handleInputChange = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    const result = await signup(register);
    if (result.status === 200) {
      if (result.data.status === 201) {
        setErrorSignup(result.data.data);
        toast.error(result.data.message);
        return;
      }
      if (result.data.status === 200) {
        localStorage.setItem('user', JSON.stringify(result.data.data));
        toast.success("User Created Successfully");
        setTimeout(() => {
          navigate('/login');
        }, 6000);

        return;
      }
      if (result.data.status === 202) {
        toast.error(result.data.message);
        return;
      }
    }
    else {
      toast.error("Something went wrong,please try again later");
      return;
    }
  };



  const [isSignUp, setIsSignUp] = useState(true);
  const [password, setPassword] = useState("");
  const[email,setEmail]=useState("");//login
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  }

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };
  const navigateToSignup = () => {
    navigate('/signup');
  };
  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className='kk1'>
      <ToastContainer toastStyle={{ backgroundColor: "#121212", color: "wheat" }} />
      <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
        <div className="form-container sign-up-container">
          <form action="#">
            <h1 className='h1'>Create Account</h1>
            <input type="text" placeholder="Name" name='name' onChange={handleInputChange} />
            {
              errorsignup?.name && <small>{errorsignup.name.msg}</small>
            }
            <input type="email" placeholder="Email" name='email'               onChange={(e) => { handleInputChange(e); setEmail(e.target.value); }}
/>
            {
              errorsignup?.email && <small>{errorsignup.email.msg}</small>
            }
            <input
              type={type}
              name="password"
              placeholder="Password"
              onChange={(e) => { handleInputChange(e); setPassword(e.target.value); }}
              autoComplete="current-password"
            />
            {
              errorsignup?.password && <small>{errorsignup.password.msg}</small>
            }
            <span className='icon' onClick={handleToggle}>
              <Icon icon={icon} size={25} />
            </span>
            <button className='btnn' onClick={handleSubmitSignup}><span>Sign Up</span></button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form>
            <h1 className='h1'>Sign in</h1>
            <input type="email" onChange={handleChangeLogin} name='email' placeholder="Email" required />
            {
              errors?.email && <small>{errors.email.msg}</small>
            }
            <input
              type={type}
              name="password"
              placeholder="Password"
              onChange={(e) => {
                handleChangeLogin(e);
                setPassword(e.target.value);
              }}
            />
            <span className='icon' onClick={handleToggle}>
              <Icon icon={icon} size={25} />
            </span>
            {
              errors?.password && <span>{errors.password.msg}</span>
            }
            <button className='btnn' onClick={handleSubmit}><span>Sign In</span></button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className={`overlay-panel overlay-left ${isSignUp ? '' : 'overlay-active'}`}>
              <h1 className='h1'>Welcome Back!</h1>
              <p>To keep connected with us, please login with your personal info</p>
              <button className="ghost" onClick={() => { toggleForm(); navigateToLogin(); }}>Sign In</button>
            </div>
            <div className={`overlay-panel overlay-right ${isSignUp ? 'overlay-active' : ''}`}>
              <h1 className='h1'>Hello, Friend!</h1>
              <p>Enter your personal details and start the journey with us</p>
              <button className="ghost" onClick={() => { toggleForm(); navigateToSignup(); }}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;