import React, { useState } from "react";
import './multipartForm.css';

export default function MultipartForm() {

    const [currentStep, setCurrentStep] = useState(1);
    const [fullname, setFullname] = useState('');
    const [displayname, setDisplayname] = useState('');
    const [workspace, setWorkspace] = useState('');
    const [url, setUrl] = useState('');
    const [profileType, setProfileType] = useState(1);

    const handleChange = event => {
        const {name, value} = event.target;
        if (name === 'fullname') {
            setFullname(value);
        }
        else if (name === 'displayname') {
            setDisplayname(value);
        }
        else if (name === 'workspace') {
            setWorkspace(value);
        }
        else if (name === 'url') {
            setUrl(value);
        }
    }

    const handleSubmit = event => {
        event.preventDefault();
    }

    const nextStep = () => {
        switch(currentStep) {
            case 1 : if(fullname === '' || displayname === '') {
                      alert("Please Enter Full Name and Display Name");
                      return;
                     }
                     break;
            case 2 : if(workspace === '') {
                     alert("Please Enter Workspace");
                     return;
                     }
                     break;
            
            default : return;
            
        }
        setCurrentStep(currentStep >= 3 ? 4 : currentStep + 1);
    }

    const progressButton = () => {
        if(currentStep <= 4) {
            return(
                <button
                type="button" onClick={nextStep} className="form-button">
                    {currentStep === 4 ? 'Launch Eden' : 'Create Workspace'}
                </button>
            )
        }
    }

    const changeProfile = choice => {
        setProfileType(choice);
    }

    return(
        <React.Fragment>
            <div>
              <img
                src="/logo.png"
                alt="img"
                style={{ width: "auto", height: "auto" }}
              />
              <label htmlFor="heading" className="form-heading">Eden</label>
            </div>
            <div className="progressbar">
              <div className={currentStep >= 1 ? "progress-step active" : "progress-step"}/>
              <div className={currentStep >= 2 ? "progress-step active" : "progress-step"}/>
              <div className={currentStep >= 3 ? "progress-step active" : "progress-step"}/>
              <div className={currentStep >= 4 ? "progress-step active" : "progress-step"}/>
            </div>
            <form className="root-form" onSubmit={handleSubmit}>
                <Step1
                    currentStep={currentStep}
                    handleChange={handleChange}
                    fullname={fullname}
                    displayname={displayname}
                />
                <Step2
                    currentStep={currentStep}
                    handleChange={handleChange}
                    workspace={workspace}
                    url={url}
                />
                <Step3
                    currentStep={currentStep}
                    changeProfile={changeProfile}
                    profileType={profileType}
                />
                <Step4
                    currentStep={currentStep}
                    displayname={displayname}
                    handleChange={handleChange}
                />
            </form>
                {progressButton()}
        </React.Fragment>
    );
}

function Step1(props) {
    if (props.currentStep !== 1) {
      return null
    } 
    return(
      <>
      <div className="form-heading">
        Welcome! First things first...
      </div>
      <div className="form-desc">
        You can always change them later.
      </div>
      <div className="form-group">
        <div className="name-title">Full Name</div>
        <input
          className="name-input"
          id="fullname"
          name="fullname"
          type="text"
          placeholder="Steve Jobs"
          value={props.fullname}
          onChange={props.handleChange}
          />
        <div className="name-title">Display Name</div>
        <input
          className="name-input"
          id="displayname"
          name="displayname"
          type="text"
          placeholder="Steve"
          value={props.displayname}
          onChange={props.handleChange}
          />
      </div>
      </>
    );
  }

  function Step2(props) {
    if (props.currentStep !== 2) {
      return null
    } 
    return(
      <>
      <div className="form-heading">
        Let's setup a home for all your work
      </div>
      <div className="form-desc">
        You can always create another workspace later.
      </div>
      <div className="form-group">
        <div  className="name-title">Workspace Name</div>
        <input
          className="name-input"
          id="workspace"
          name="workspace"
          type="text"
          placeholder="Eden"
          value={props.workspace}
          onChange={props.handleChange}
          />
        <div className="name-title">
          Workspace URL<span style={{ color: '#9BA0AB' }}>(optional)</span>
        </div>
        <div>
        <button
          className="input-example" 
          disabled>www.eden.com/
        </button>
        <input
          className="optional-input"
          id="url"
          name="url"
          type="text"
          placeholder="Example"
          value={props.url}
          onChange={props.handleChange}
          />
          </div>
      </div>
      </>
    );
  }

  function Step3(props) {
    if (props.currentStep !== 3) {
      return null
    } 
    return(
      <>
      <div className="form-heading">
        How are you planning to use Eden?
      </div>
      <div className="form-desc">
        We'll streamline your setup experience accordingly.
      </div>
      <div style={{ maxWidth : "80%" }}>
      <div className="form-group-profile">
        <div
        className={props.profileType === 1 ? "profile-button-active" : "profile-button"}
        onClick={() => props.changeProfile(1)}>
          <i className="fas fa-user" style={{ color: props.profileType === 1 ? '#5a4ad1' : '#40434a' }} />
          <div className="name-title">For myself</div>
          <div style={{ color: '#9BA0AB' }}>Write better. Think more cleary. Stay organized.</div>
        </div>
        <div
        className={props.profileType === 2 ? "profile-button-active" : "profile-button"}
        onClick={() => props.changeProfile(2)}>
          <i className="fas fa-users" style={{ color: props.profileType === 2 ? '#5a4ad1' : '#40434a' }} />
          <div className="name-title">With my team</div>
          <div style={{ color: '#9BA0AB' }}>Wikis, docs, tasks & projects, all in one place.</div>
        </div>
      </div>
      </div>
      </>
    );
  }

  function Step4(props) {
    if (props.currentStep !== 4) {
      return null
    } 
    return(
      <div>
        <i className="fas fa-check-circle" style={{ fontSize: '100px', color: '#5a4ad1', margin: "7%" }} />
        <div className="form-heading">Congratulations, {props.displayname}!</div>
        <div className="form-desc">You have completed on boarding, you can start using Eden!</div>
      </div>
    );
  }