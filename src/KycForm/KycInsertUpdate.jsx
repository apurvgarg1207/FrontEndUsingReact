import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { json, useNavigate, useParams } from 'react-router-dom';
import UploadDisplay from './Img&Dis';

function KYCForm3(props) {
    const { email } = useParams();
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        add: '',
        image: null,
        state: '',
        city: '',
        pincode: '',
        validationErrors: {},
        apiError: '',
        imgfile: '',
    });
    const [imageBytes, setImageBytes] = useState('');

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (props.email) {
    //         // If an email prop is passed, fetch existing data for update
    //         console.log('Fetching data for email:', props.email);
    //         fetchExistingData(props.email);
    //     }
    // }, [props.email]);
    useEffect(() => {

        if (email != null) {
            // Fetch data for the given email and populate the form fields
            console.log('Component mounted with email:', email);
            fetchExistingData(email);
        }
        // Rest of your useEffect code...
    }, [email]);
    useEffect(() => {
        // Set the imageBytes after fetching data
        if (state.image) {
            setImageBytes(state.image);
        }
    }, [state.image]);

    const fetchExistingData = (email) => {
        // Fetch data for the given email and populate the form fields
        axios
            .get(`http://192.168.10.163:10000/getKycByEmail/${email}`)
            .then((response) => {
                // setState({ ...state, ...response.data });
                const { firstName, lastName, email, num, add, image, imageByte, state, city, pincode } = response.data;

                // Create a new state object by spreading the existing state
                // and overwriting specific properties
                setState((prevState) => ({
                    ...prevState,
                    firstName,
                    lastName,
                    email,
                    phoneNumber: num, // Assign num to phoneNumber
                    add,
                    image: imageByte,
                    state,
                    city,
                    pincode,
                }));
                console.log("iamge sjsjs", response.data);
                // console.log("Image Byte:",imageByte);
                setImageBytes(imageByte);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };





    const handleImageFile = (imageFile) => {
        console.log("Image File ", imageFile);
        setState({ ...state, image: imageFile });
    }


    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (!state.firstName) {
            validationErrors.firstName = 'First Name is required';
        }
        if (!state.lastName) {
            validationErrors.lastName = 'Last Name is required';
        }
        if (!state.email) {
            validationErrors.email = 'Email is required';
        }
        if (!state.phoneNumber) {
            validationErrors.phoneNumber = 'Phone Number is required';
        }
        if (state.phoneNumber.length !== 10) {
            validationErrors.phoneNumber = 'Phone Number must be 10 digits';
        }
        if (!state.add) {
            validationErrors.add = 'Address is required';
        }
        if (!state.state) {
            validationErrors.state = 'State is required';
        }
        if (!state.city) {
            validationErrors.city = 'City is required';
        }
        if (!state.pincode) {
            validationErrors.pincode = 'Pincode is required';
        }
        if (state.pincode.length !== 6) {
            validationErrors.pincode = 'Pincode must be 6 digits';
        }
        console.log("Image State", state.image);
        if (!state.image) {
            validationErrors.image = 'Must Select the image';
        }

        if (Object.keys(validationErrors).length > 0) {
            setState({ ...state, validationErrors });
            return;
        }

        const postData = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            num: state.phoneNumber,
            add: state.add,
            state: state.state,
            city: state.city,
            pincode: state.pincode,
            image: "Demo",
            imageFile: state.image,
        };
        console.log("inside ");

        const formData = new FormData();
        formData.append("firstName", state.firstName);
        formData.append("lastName", state.lastName);
        formData.append("email", state.email);
        formData.append("num", state.phoneNumber);
        formData.append("add", state.add);
        formData.append("state", state.state);
        formData.append("city", state.city);
        formData.append("pincode", state.pincode);
        formData.append("image", "Demo");
        let blob = '';
        if (state.image instanceof File) {
            blob = state.image
        } else {
            let base64ToString = 'data:image/jpeg;base64,' + state.image;
            console.log(base64ToString);

            // Create a Blob from the base64 data
            blob = new Blob([Uint8Array.from(atob(state.image), c => c.charCodeAt(0))], { type: 'image/jpeg' });
        }
        formData.append("imageFile", blob); // Append the image data
        console.log("FormData img:", formData.get("imageFile"));

        if (email) {
            // If an email prop is passed, it's an update operation
            axios
                // .put(`http://192.168.10.163:10000/update/${email}`, postData)
                .put(`http://192.168.10.163:10000/update/${email}`, formData, {
                    headers: {
                        // "Accept": "application/json, text/plain,, */* ",
                        "Accept": "application/json, application/*+json",
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log('Update successful', response.data);
                    navigate("/app/ListTable");
                })
                .catch((error) => {
                    console.error('Error updating data:', error);
                    if (error.code === 'ERR_BAD_RESPONSE') {
                        validationErrors.email = 'Email Already Registered';
                        setState({ ...state, validationErrors });
                    } else {
                        setState({ ...state, apiError: 'Error submitting the form. Please try again later.' });
                    }
                });
        } else {
            

            axios
                .post('http://192.168.10.163:10000/kycform', formData, {
                    headers: {
                        // "Accept": "application/json, text/plain,, */* ",
                        "Accept": "application/json, application/*+json",
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    console.log("POST request successful", response.data);
                    navigate("/app/ListTable");
                })
                .catch((error) => {
                    console.error("Error making POST request", error);
                    if (error.response && error.response.status === 400) {
                        // Handle validation errors from the server
                        const serverValidationErrors = error.response.data;
                        const formattedErrors = {};
                        serverValidationErrors.forEach((error) => {
                            formattedErrors[error.field] = error.defaultMessage;
                        });
                        setState({ ...state, validationErrors: formattedErrors });
                    } else {
                        setState({
                            ...state,
                            apiError: "Error submitting the form. Please try again later.",
                        });
                    }
                });
        }
    };

    return (
        <section>
            <div className='container-fluid h-custom'>
                <div className='row d-flex justify-content-center align-items-center h-100 bg-themeBase'>
                    <div className='col-md-2'></div>
                    <div className="col-md-4 container mt-5 card card-body bg-altlight text-altdark">
                        <h2 className='text-md-center'>KYC Form</h2>
                        {state.apiError && (
                            <div className='text-md-center text-danger'>{state.apiError}</div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className='row d-flex justify-content-center align-items-center h-100'>
                                <div className='col-md-9 col-lg-6 col-xl-5'>
                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            name="firstName"
                                            value={state.firstName}
                                            onChange={handleChange}
                                        />
                                        {state.validationErrors.firstName && (
                                            <div className='text-danger'>{state.validationErrors.firstName}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            name="lastName"
                                            value={state.lastName}
                                            onChange={handleChange}
                                        // required
                                        />
                                        {state.validationErrors.lastName && (
                                            <div className='text-danger'>{state.validationErrors.lastName}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={state.email}
                                            onChange={handleChange}
                                        // required
                                        />
                                        {state.validationErrors.email && (
                                            <div className='text-danger'>{state.validationErrors.email}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="state" className="form-label">
                                            State
                                        </label>
                                        <input
                                            type='text'
                                            className="form-control"
                                            id="state"
                                            name="state"
                                            value={state.state}
                                            onChange={handleChange}
                                        // required
                                        />
                                        {state.validationErrors.state && (
                                            <div className='text-danger'>{state.validationErrors.state}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="city" className="form-label">
                                            City
                                        </label>
                                        <input
                                            type='text'
                                            className="form-control"
                                            id="city"
                                            name="city"
                                            value={state.city}
                                            onChange={handleChange}
                                        // required
                                        />
                                        {state.validationErrors.city && (
                                            <div className='text-danger'>{state.validationErrors.city}</div>
                                        )}
                                    </div>
                                    {/* </div> */}
                                    {/* <div className='ol-md-8 col-xl-4 offset-xl-1'> */}
                                    <div className="mb-3">
                                        <label htmlFor="phoneNumber" className="form-label">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={state.phoneNumber}
                                            onChange={handleChange}
                                        // required
                                        />
                                        {state.validationErrors.phoneNumber && (
                                            <div className='text-danger'>{state.validationErrors.phoneNumber}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="add" className="form-label">
                                            Address
                                        </label>
                                        <input
                                            type='text'
                                            className="form-control"
                                            id="add"
                                            name="add"
                                            value={state.add}
                                            onChange={handleChange}
                                        // required
                                        />
                                        {state.validationErrors.add && (
                                            <div className='text-danger'>{state.validationErrors.add}</div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="pincode" className="form-label">
                                            Pincode
                                        </label>
                                        <input
                                            type='text'
                                            className="form-control"
                                            id="pincode"
                                            name="pincode"
                                            value={state.pincode}
                                            onChange={handleChange}
                                        // required
                                        />
                                        {state.validationErrors.pincode && (
                                            <div className='text-danger'>{state.validationErrors.pincode}</div>
                                        )}
                                    </div>

                                    {/* Add other form fields */}
                                </div>
                                <div className='ol-md-8 col-xl-5 offset-xl-1'>
                                    <UploadDisplay onImageUpload={handleImageFile}
                                        // onImageFile={handleImageFile}
                                        imageBytes={imageBytes}
                                    />
                                    {state.validationErrors.image && (
                                        <div className='text-danger'>{state.validationErrors.image}</div>
                                    )}
                                </div>
                            </div>
                            <div className='text-center'>
                                <button type="submit" className="btn btn-altdark text-altlight">
                                    {email ? 'Update' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className='col-md-2'></div>
                </div>
            </div>
        </section>
    );
}

KYCForm3.propTypes = {
    email: PropTypes.string, // Prop to determine if it's an update operation
};

export default KYCForm3;
