import React, { useState } from 'react';
import { AiOutlineLoading3Quarters, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { IoIosArrowDropdownCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { RxUpdate } from 'react-icons/rx';
import './Modal.css';
import { callAlert } from '../../Functions/Functions'
import { AppState } from '../../context/Provider';
import { RxCross2 } from 'react-icons/rx';

const workDefaultValue = { name:'', desc:'', startDate:'', endDate:''}
const schoolDefaultValue = { name:'', desc:'', startDate:'', endDate:''}
const collegeDefaultValue = { name:'', desc:'', startDate:'', endDate:''}
const socialDefaultValue = { socialName:'', url:''}

const InfoModal = ({myFunction, loading, useStateVariables}) => {

    const {workFormValue, setWorkFormValue, schoolFormValue, setSchoolFormValue, collegeFormValue, setCollegeFormValue, personalFormValue, setPersonalFormValue, socialFormValue, setSocialFormValue} = useStateVariables;

    const {setAlert, setShowAlert} = AppState();

    //Form - 1 Work Form
    const [workForm, setWorkForm] = useState(true);
    const [workIndex, setWorkIndex] = useState(-1);
    const [workData, setWorkData] = useState(workDefaultValue);


    //Form - 2 School Form
    const [schoolForm, setschoolForm] = useState(false);
    const [schoolIndex, setSchoolIndex] = useState(-1);
    const [schoolData, setSchoolData] = useState(schoolDefaultValue);
    

    //Form - 3 College Form
    const [collegeForm, setCollegeForm] = useState(false);
    const [collegeIndex, setCollegeIndex] = useState(-1);
    const [collegeData, setCollegeData] = useState(collegeDefaultValue);


    //Form - 4 Personal Form
    const [personalForm, setpersonalForm] = useState(false);

    //Form - 5 Social Form
    const [socialForm, setSocialForm] = useState(false);
    const [socialIndex, setSocialIndex] = useState(-1);
    const [socialData, setSocialData] = useState(socialDefaultValue);



    const handleFormShow = (formType) =>{
        if(formType==='work'){
            setWorkForm(true);
            setschoolForm(false);
            setCollegeForm(false);
            setpersonalForm(false);
            setSocialForm(false);
        }
        if(formType==='college'){
            setCollegeForm(true);
            setWorkForm(false);
            setschoolForm(false);
            setpersonalForm(false);
            setSocialForm(false);

        }
        if(formType==='school'){
            setWorkForm(false);
            setschoolForm(true);
            setCollegeForm(false);
            setpersonalForm(false);
            setSocialForm(false);

        }
        if(formType==='pInfo'){
            setWorkForm(false);
            setschoolForm(false);
            setCollegeForm(false);
            setpersonalForm(true);
            setSocialForm(false);

        }

        if(formType==='socialLinks'){
            setWorkForm(false);
            setschoolForm(false);
            setCollegeForm(false);
            setpersonalForm(false);
            setSocialForm(true);
        }
    }

    const changeInputValues = (formName, e) =>{

        if(formName === 'work'){

            setWorkData({...workData,[e.target.name]: e.target.value});
           
        }

        if(formName === 'school'){

            setSchoolData({...schoolData,[e.target.name]: e.target.value});
           
        }

        if(formName === 'college'){

            setCollegeData({...collegeData,[e.target.name]: e.target.value});
           
        }

        if(formName === 'personal'){

            setPersonalFormValue({...personalFormValue,[e.target.name]: e.target.value});
           
        }

        if(formName === 'social'){

            setSocialData({...socialData,[e.target.name]: e.target.value});
           
        }
        
    }

    const addMore = (formType)=>{

        if(formType === 'work'){

                if(workData.name && workData.desc && workData.startDate){

                    const addValue = [...workFormValue, workData];
                    setWorkFormValue(addValue);
                    setWorkData(workDefaultValue)

                }else{
                    callAlert(setAlert, setShowAlert, 'error', 'Please fill all the field to add more work experience!')
                }
        }

        if(formType === 'school'){

                if(schoolData.name && schoolData.desc && schoolData.startDate){

                    const addValue = [...schoolFormValue, schoolData];
                    setSchoolFormValue(addValue);
                    setSchoolData(schoolDefaultValue)

                }else{
                    callAlert(setAlert, setShowAlert, 'error', 'Please fill all the field to add more Schools!')
                }
        }

        if(formType === 'college'){

                if(collegeData.name && collegeData.desc && collegeData.startDate){

                    const addValue = [...collegeFormValue, collegeData];
                    setCollegeFormValue(addValue);
                    setCollegeData(collegeDefaultValue)

                }else{
                    callAlert(setAlert, setShowAlert, 'error', 'Please fill all the field to add more College and Universities!')
                }
        }

        if(formType === 'social'){

                if(socialData.socialName && socialData.url){

                    const addValue = [...socialFormValue, socialData];
                    setSocialFormValue(addValue);
                    setSocialData(socialDefaultValue)

                }else{
                    callAlert(setAlert, setShowAlert, 'error', 'Please fill all the field to add more social links!')
                }
        }
    }

    const chooseFormData = (formType, v, i) =>{
        
        if(formType==='work'){
            setWorkData(v);
            console.log(v);
            setWorkIndex(i);
        }

        if(formType==='school'){
            setSchoolData(v);
            setSchoolIndex(i);
        }

        if(formType==='college'){
            setCollegeData(v);
            setCollegeIndex(i);
        }

        if(formType==='social'){
            setSocialData(v);
            setSocialIndex(i);
        }
    }

    const removeFormData = (formType, i, e) =>{

        e.stopPropagation();
        
        if(formType==='work'){
            console.log('remove');
            workFormValue.splice(i, 1);
            setWorkFormValue(workFormValue);
            setWorkData(workDefaultValue);
            setWorkIndex(-1);
        }

        if(formType==='school'){
            schoolFormValue.splice(i, 1);
            setSchoolFormValue(schoolFormValue);
            setSchoolData(schoolDefaultValue);
            setSchoolIndex(-1);
        }

        if(formType==='college'){
            collegeFormValue.splice(i, 1);
            setCollegeFormValue(collegeFormValue);
            setCollegeData(collegeDefaultValue);
            setCollegeIndex(-1);
        }

        if(formType==='social'){
            socialFormValue.splice(i, 1);
            setSocialFormValue(socialFormValue);
            setSocialData(socialDefaultValue);
            setSocialIndex(-1);
        }
    }

    const updateFormData = (formType) =>{

        if(formType === 'work'){
            workFormValue[workIndex] = workData;
            setWorkFormValue(workFormValue);
            setWorkIndex(-1)
            setWorkData(workDefaultValue)
        }

        if(formType === 'school'){
            schoolFormValue[schoolIndex] = schoolData;
            setSchoolFormValue(schoolFormValue);
            setSchoolIndex(-1)
            setSchoolData(schoolDefaultValue)
        }

        if(formType === 'college'){
            collegeFormValue[collegeIndex] = collegeData;
            setCollegeFormValue(collegeFormValue);
            setCollegeIndex(-1)
            setCollegeData(collegeDefaultValue)
        }

        if(formType === 'social'){
            socialFormValue[socialIndex] = socialData;
            setSocialFormValue(socialFormValue);
            setSocialIndex(-1)
            setSocialData(socialDefaultValue)
        }
    }
    
  return (
    <div className="modalContainer">
      <div className="modalBox">
        
        <div className={`formBoxHead ${workForm && 'activeForm'}`} onClick={()=>handleFormShow('work')}>
            <span>
                Add Works
            </span>
            {workForm ? <IoIosArrowDropdownCircle className='formHeadIcon'/>:
            <IoIosArrowDroprightCircle className='formHeadIcon'/>}
        </div>
        {workForm && <div className="formBox">
            <div className="pagination">
                {workFormValue.map((v, i)=><div key={i} className="number" onClick={()=>chooseFormData('work', v, i)} >
                    {i+1}
                    <RxCross2 className='removeIcon' onClick={(e)=>removeFormData('work', i, e)}/>
                </div>)}
            </div>

            <input type="text" className='infoInput' name='name' placeholder='Add Organization Name' value={workData.name} onChange={(e)=>changeInputValues('work', e)}/>

            <input type="text" className='infoInput' placeholder='Describe your position' name='desc'  value={workData.desc} onChange={(e)=>changeInputValues('work', e)}/>

            <label className='label'>Start Date - </label>
            <input type="date" className='infoInput' min='1970-01-01' name='startDate' value={workData.startDate.slice(0, 10)} onChange={(e)=>changeInputValues('work', e)}/>

            <label htmlFor="" className='label'>End Date - </label>
            <input type="date" className='infoInput'  name='endDate' min='1970-01-01' value={workData.endDate && workData.endDate.slice(0, 10)} onChange={(e)=>changeInputValues('work', e)}/>

            <div className="btns">

            {workIndex === - 1 && <button className='btn' onClick={()=> addMore('work')}>
                Add
            <AiOutlineAppstoreAdd className='btnIcon'/>
            </button>}

            {workIndex !=-1 && <button className='btn' onClick={()=> updateFormData('work')}>
                update
                <RxUpdate className='btnIcon'/>
            </button>}

            </div>
        </div>}

        <div className={`formBoxHead ${schoolForm && 'activeForm'}`} onClick={()=>handleFormShow('school')}>
            <span>
                Add School
            </span>
            {schoolForm ? <IoIosArrowDropdownCircle className='formHeadIcon'/>:
            <IoIosArrowDroprightCircle className='formHeadIcon'/>}
        </div>
        {schoolForm && <div className="formBox">
            <div className="pagination">
                {schoolFormValue.map((v, i)=><div key={i} className="number" onClick={()=>chooseFormData('school', v, i)} >
                    {i+1}
                    <RxCross2 className='removeIcon' onClick={(e)=>removeFormData('school', i, e)}/>
                </div>)}
            </div>

            <input type="text" className='infoInput' name='name' placeholder='School Name' value={schoolData.name} onChange={(e)=>changeInputValues('school', e)}/>

            <input type="text" className='infoInput' placeholder='Description' name='desc'  value={schoolData.desc} onChange={(e)=>changeInputValues('school', e)}/>

            <label className='label'>Start Date - </label>
            <input type="date" className='infoInput' min='1970-01-01' max={Date.now()} name='startDate' value={schoolData.startDate.slice(0, 10)} onChange={(e)=>changeInputValues('school', e)}/>

            <label htmlFor="" className='label'>End Date - </label>
            <input type="date" className='infoInput'  name='endDate' value={schoolData.endDate && schoolData.endDate.slice(0, 10)} onChange={(e)=>changeInputValues('school', e)}/>

            <div className="btns">

            {schoolIndex === - 1 && <button className='btn' onClick={()=> addMore('school')}>
                Add
            <AiOutlineAppstoreAdd className='btnIcon'/>
            </button>}

            {schoolIndex !=-1 && <button className='btn' onClick={()=> updateFormData('school')}>
                update
                <RxUpdate className='btnIcon'/>
            </button>}

            </div>
        </div>}

        <div className={`formBoxHead ${collegeForm && 'activeForm'}`} onClick={()=>handleFormShow('college')}>
            <span>
                Add College
            </span>
            {collegeForm ? <IoIosArrowDropdownCircle className='formHeadIcon'/>:
            <IoIosArrowDroprightCircle className='formHeadIcon'/>}
        </div>
        {collegeForm && <div className="formBox">
            <div className="pagination">
                {collegeFormValue.map((v, i)=><div key={i} className="number" onClick={()=>chooseFormData('college', v, i)} >
                    {i+1}
                    <RxCross2 className='removeIcon' onClick={(e)=>removeFormData('college', i, e)}/>
                </div>)}
            </div>

            <input type="text" className='infoInput' name='name' placeholder='College or University Name' value={collegeData.name} onChange={(e)=>changeInputValues('college', e)}/>

            <input type="text" className='infoInput' placeholder='Description' name='desc'  value={collegeData.desc} onChange={(e)=>changeInputValues('college', e)}/>

            <label className='label'>Start Date - </label>
            <input type="date" className='infoInput' min='1970-01-01' max={Date.now()} name='startDate' value={collegeData.startDate.slice(0, 10)} onChange={(e)=>changeInputValues('college', e)}/>

            <label htmlFor="" className='label'>End Date - </label>
            <input type="date" className='infoInput'  name='endDate' value={collegeData.endDate && collegeData.endDate.slice(0, 10)} onChange={(e)=>changeInputValues('college', e)}/>

            <div className="btns">

            {collegeIndex === - 1 && <button className='btn' onClick={()=> addMore('college')}>
                Add
            <AiOutlineAppstoreAdd className='btnIcon'/>
            </button>}

            {collegeIndex !=-1 && <button className='btn' onClick={()=> updateFormData('college')}>
                update
                <RxUpdate className='btnIcon'/>
            </button>}

            </div>
        </div>}

        <div className={`formBoxHead ${personalForm && 'activeForm'}`} onClick={()=>handleFormShow('pInfo')}>
            <span>
                Add personal info
            </span>
            {personalForm ? <IoIosArrowDropdownCircle className='formHeadIcon'/>:
            <IoIosArrowDroprightCircle className='formHeadIcon'/>}
        </div>
        {personalForm && <div className="formBox">
            <input type="text" className='infoInput' value={personalFormValue.currentCity} name='currentCity' placeholder='Current City'  onChange={(e)=>changeInputValues('personal', e)}/>
            <input type="text" className='infoInput' value={personalFormValue.homeTown} name='homeTown' placeholder='Home Town' onChange={(e)=>changeInputValues('personal', e)}/>

            <select className='infoInput select' value={personalFormValue.relationship} name='relationship' onChange={(e)=>changeInputValues('personal', e)}>
                <option value="Single">Single</option>
                <option value="Relationship">In a Relationship</option>
                <option value="Divorced">Divorced</option>
                <option value="Complicated">Complicated</option>
            </select>
        </div>}
        <div className={`formBoxHead ${socialForm && 'activeForm'}`} onClick={()=>handleFormShow('socialLinks')}>
            <span>
                Add Social Links
            </span>
            {socialForm ? <IoIosArrowDropdownCircle className='formHeadIcon'/>:
            <IoIosArrowDroprightCircle className='formHeadIcon'/>}
        </div>
        {socialForm && <div className="formBox">
            <div className="pagination">
                {socialFormValue.map((v, i)=><div key={i} className="number" onClick={()=>chooseFormData('social', v, i)} >
                    {i+1}
                    <RxCross2 className='removeIcon' onClick={(e)=>removeFormData('social', i, e)}/>
                </div>)}
            </div>

            <select className='infoInput select' name='socialName' onChange={(e)=>changeInputValues('social', e)}>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Github">Github</option>
                <option value="Twitter">Twitter</option>
                <option value="Other">Other</option>
            </select>

            <input type="text" className='infoInput' placeholder="Profile's Url" name='url'  value={socialData.url} onChange={(e)=>changeInputValues('social', e)}/>

            <div className="btns">

            {socialIndex === - 1 && <button className='btn' onClick={()=> addMore('social')}>
                Add
            <AiOutlineAppstoreAdd className='btnIcon'/>
            </button>}

            {socialIndex !=-1 && <button className='btn' onClick={()=> updateFormData('social')}>
                update
                <RxUpdate className='btnIcon'/>
            </button>}

            </div>
        </div>}
        <div className="btns">
          <button className="btn" onClick={()=>myFunction('submit')}> 
          {loading && <AiOutlineLoading3Quarters className='loading'/>}
          Add Info
          </button>
          <button className="btn" onClick={()=>myFunction('cancel')}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default InfoModal
